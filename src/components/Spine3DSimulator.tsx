import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Maximize2, ShieldCheck, Activity, Award } from 'lucide-react';

interface Spine3DSimulatorProps {
  onClose?: () => void;
}

export const Spine3DSimulator: React.FC<Spine3DSimulatorProps> = ({ onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Mode: 'explorer' (3D inspection) | 'game' (Posture Balance Challenge)
  const [mode, setMode] = useState<'explorer' | 'game'>('explorer');
  const [postureAngle, setPostureAngle] = useState<number>(0); // -30 to +30 degrees
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [selectedVertebra, setSelectedVertebra] = useState<string>('L4-L5');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Game State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(30);
  const [discStrain, setDiscStrain] = useState<number>(320); // Newtons
  const [balanceStatus, setBalanceStatus] = useState<'Optimal' | 'Caution' | 'High Strain'>('Optimal');

  // Three.js object refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spineGroupRef = useRef<THREE.Group | null>(null);
  const discsRef = useRef<THREE.Mesh[]>([]);
  const vertebraeRef = useRef<THREE.Group[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Sound Synth via Web Audio API
  const playTone = (freq: number, type: OscillatorType = 'sine', duration: number = 0.15) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // 4-Color Midnight Navy

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 7.5);
    cameraRef.current = camera;

    // 3. Renderer with ACES ToneMapping & sRGB Color
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Procedural Studio Lighting & Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Hemisphere Fill Light
    const hemiLight = new THREE.HemisphereLight(0x0d9488, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // Teal Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0x0d9488, 1.8);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    // Soft Radial Contact Shadow Floor
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.6;
    scene.add(shadowPlane);

    // 5. Construct Procedural 3D Spine (Vertebrae L1 to L5 + Intervertebral Discs + Sacrum)
    const spineGroup = new THREE.Group();
    spineGroupRef.current = spineGroup;
    scene.add(spineGroup);

    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.1,
    });

    const discMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0d9488,
      roughness: 0.2,
      metalness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });

    const nerveMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.4,
      metalness: 0.2,
    });

    const vertebraNames = ['L1 (Upper Lumbar)', 'L2 (Mid Lumbar)', 'L3 (Apex Lumbar)', 'L4 (Lower Lumbar)', 'L5 (Lumbosacral)'];
    discsRef.current = [];
    vertebraeRef.current = [];

    // Build 5 lumbar vertebrae assemblies
    for (let i = 0; i < 5; i++) {
      const vGroup = new THREE.Group();
      vGroup.name = vertebraNames[i];
      const yPos = 1.6 - i * 0.9;
      vGroup.position.set(0, yPos, 0);

      // (1) Primary Vertebral Body (cylindrical kidney shape)
      const bodyGeo = new THREE.CylinderGeometry(0.72 - i * 0.02, 0.78 - i * 0.02, 0.52, 24);
      const bodyMesh = new THREE.Mesh(bodyGeo, boneMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      vGroup.add(bodyMesh);

      // (2) Spinous Process (posterior projection)
      const spinousGeo = new THREE.BoxGeometry(0.18, 0.3, 0.85);
      const spinousMesh = new THREE.Mesh(spinousGeo, boneMaterial);
      spinousMesh.position.set(0, -0.05, -0.75);
      spinousMesh.rotation.x = 0.3;
      vGroup.add(spinousMesh);

      // (3) Transverse Processes (left/right bilateral wings)
      const transGeo = new THREE.BoxGeometry(0.85, 0.15, 0.25);
      const transMeshLeft = new THREE.Mesh(transGeo, boneMaterial);
      transMeshLeft.position.set(-0.75, 0.05, -0.2);
      vGroup.add(transMeshLeft);

      const transMeshRight = new THREE.Mesh(transGeo, boneMaterial);
      transMeshRight.position.set(0.75, 0.05, -0.2);
      vGroup.add(transMeshRight);

      // (4) Neural Arch & Nerve Root exiting laterally
      const nerveGeo = new THREE.TorusGeometry(0.45, 0.04, 8, 16, Math.PI);
      const nerveMesh = new THREE.Mesh(nerveGeo, nerveMaterial);
      nerveMesh.position.set(0, 0, -0.4);
      nerveMesh.rotation.x = Math.PI / 2;
      vGroup.add(nerveMesh);

      spineGroup.add(vGroup);
      vertebraeRef.current.push(vGroup);

      // Intervertebral Disc between vertebrae
      if (i < 4) {
        const discGeo = new THREE.CylinderGeometry(0.68 - i * 0.02, 0.72 - i * 0.02, 0.24, 24);
        const discMesh = new THREE.Mesh(discGeo, discMaterial.clone());
        discMesh.position.set(0, yPos - 0.45, 0);
        discMesh.castShadow = true;
        spineGroup.add(discMesh);
        discsRef.current.push(discMesh);
      }
    }

    // (5) Sacrum Base Platform
    const sacrumGeo = new THREE.ConeGeometry(1.1, 1.2, 5);
    const sacrumMesh = new THREE.Mesh(sacrumGeo, boneMaterial);
    sacrumMesh.position.set(0, -2.5, -0.15);
    sacrumMesh.rotation.x = 0.25;
    spineGroup.add(sacrumMesh);

    // 6. Interactive Mouse Drag for Camera Orbiting
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0;
    let rotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !spineGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotY += deltaX * 0.01;
      rotX = Math.max(-0.6, Math.min(0.6, rotX + deltaY * 0.01));
      spineGroupRef.current.rotation.y = rotY;
      spineGroupRef.current.rotation.x = rotX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. Animation Loop with Smooth Damping
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      // Gentle ambient floating rotation when idle in explorer mode
      if (!isDragging && spineGroupRef.current && mode === 'explorer') {
        spineGroupRef.current.rotation.y += 0.25 * dt;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Handle Posture Angle & Disc Stress updates
  useEffect(() => {
    if (!spineGroupRef.current) return;
    const rad = (postureAngle * Math.PI) / 180;
    spineGroupRef.current.rotation.z = rad * 0.5;

    // Calculate compressive load in Newtons based on ergonomic angle
    const absAngle = Math.abs(postureAngle);
    const newLoad = Math.round(300 + Math.pow(absAngle / 5, 2) * 45);
    setDiscStrain(newLoad);

    // Update disc color based on mechanical strain
    let status: 'Optimal' | 'Caution' | 'High Strain' = 'Optimal';
    let targetColor = 0x0d9488; // Teal (Optimal)

    if (newLoad > 750) {
      status = 'High Strain';
      targetColor = 0xef4444; // Red (Severe compression)
    } else if (newLoad > 450) {
      status = 'Caution';
      targetColor = 0xf59e0b; // Amber (Compensatory load)
    }

    setBalanceStatus(status);

    discsRef.current.forEach((disc) => {
      (disc.material as THREE.MeshPhysicalMaterial).color.setHex(targetColor);
    });
  }, [postureAngle]);

  // Handle Exploded View separation
  useEffect(() => {
    vertebraeRef.current.forEach((v, i) => {
      const baseY = 1.6 - i * 0.9;
      v.position.y = isExploded ? baseY * 1.55 : baseY;
    });
  }, [isExploded]);

  // Game Loop Timer (Posture Balance Challenge)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          playTone(587.33, 'triangle', 0.4); // Victory chime
          return 0;
        }
        return prev - 1;
      });

      // Add score if player stays in optimal balance zone (-8 to +8 degrees)
      if (Math.abs(postureAngle) <= 8) {
        setGameScore((s) => {
          const updated = s + 25;
          setHighScore((h) => Math.max(h, updated));
          return updated;
        });
      } else {
        // Penalty if posture slips into severe slouch
        if (Math.abs(postureAngle) > 20) {
          playTone(220, 'sawtooth', 0.1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, postureAngle]);

  const startChallenge = () => {
    setGameScore(0);
    setGameTime(30);
    setPostureAngle(0);
    setIsPlaying(true);
    setMode('game');
    playTone(440, 'sine', 0.2);
  };

  const resetCamera = () => {
    if (spineGroupRef.current) {
      spineGroupRef.current.rotation.set(0, 0, 0);
      setPostureAngle(0);
      setIsExploded(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
      {/* 3D Simulation Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600/30 border border-teal-500/50 flex items-center justify-center text-teal-400 font-bold">
            3D
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>PhysioKinetic 3D Spine & Biomechanics Simulator</span>
              <span className="text-[10px] bg-teal-900/80 text-teal-300 border border-teal-700 px-1.5 py-0.2 rounded font-mono">
                Three.js PBR
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Interactive Lumbar Biomechanics · Academic Oversight by Dr. Heta Doshi (PT)
            </div>
          </div>
        </div>

        {/* Mode Toggle Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('explorer');
                setIsPlaying(false);
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                mode === 'explorer'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Anatomy Explorer
            </button>
            <button
              type="button"
              onClick={startChallenge}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                mode === 'game'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Posture Balance Game</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Toggle Web Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[460px] bg-slate-900 select-none overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Real-time Biomechanical HUD Overlay */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none space-y-2">
          <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 shadow-xl text-xs space-y-1 w-60">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Biomechanical Stress Readout
            </div>
            <div className="flex justify-between items-center text-sm font-bold font-mono">
              <span className="text-white">Disc Pressure:</span>
              <span
                className={`tabular-nums ${
                  balanceStatus === 'Optimal'
                    ? 'text-teal-400'
                    : balanceStatus === 'Caution'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {discStrain} N
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Kinetic State:</span>
              <span className="font-semibold text-white">{balanceStatus}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  balanceStatus === 'Optimal'
                    ? 'bg-teal-500 w-1/3'
                    : balanceStatus === 'Caution'
                    ? 'bg-amber-500 w-2/3'
                    : 'bg-rose-500 w-full'
                }`}
              />
            </div>
          </div>

          {mode === 'game' && (
            <div className="p-3 bg-teal-950/90 backdrop-blur-md rounded-xl border border-teal-700/80 shadow-xl text-xs space-y-1 w-60">
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center justify-between">
                <span>Posture Challenge</span>
                <span className="text-white font-mono">{gameTime}s left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Kinetic Score:</span>
                <span className="text-base font-extrabold font-mono text-teal-300 tabular-nums">
                  {gameScore} pts
                </span>
              </div>
              <div className="text-[10px] text-slate-300">
                Keep the spine tilt between -8° and +8° to maximize points!
              </div>
            </div>
          )}
        </div>

        {/* Quick 3D Interaction Control Hints */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none text-right">
          <div className="inline-block px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] text-slate-300 shadow-lg">
            <span>Drag mouse to rotate 3D spine · Scroll to zoom</span>
          </div>
        </div>

        {/* Bottom Unobstructed Control Dock (per Three.js skill rules) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-teal-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Posture Angle: {postureAngle}°</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  isExploded
                    ? 'bg-teal-600 text-white border-teal-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isExploded ? 'Collapse Discs' : 'Exploded View'}
              </button>
              <button
                type="button"
                onClick={resetCamera}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                title="Reset Camera & Angle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slider for Posture Angle Tilt */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-mono">-30° Slouch</span>
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              value={postureAngle}
              onChange={(e) => setPostureAngle(parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <span className="text-[11px] text-slate-400 font-mono">+30° Extension</span>
          </div>
        </div>
      </div>

      {/* Educational Clinical Footer with Dr. Heta Doshi's Insights */}
      <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-teal-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Biomechanical Principle:</span>
          <span className="text-slate-300">
            Forward slouching (&gt;15°) triples intradiscal pressure from 300N to over 750N.
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Supervised by Dr. Heta Doshi (PT) · Musculoskeletal Specialist
        </div>
      </div>
    </div>
  );
};
