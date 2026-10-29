import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Video,
  FileText,
  Eye,
  Sliders,
  CheckCircle2,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { AnatomicalZone } from '../types';
import { BODY_CONDITIONS_DATA, BodyConditionDetails, KinematicVector5D } from '../data/bodyConditionsData';

interface AllConditions3DViewerProps {
  selectedZone?: AnatomicalZone;
  onSelectZone?: (zone: AnatomicalZone) => void;
  onBookCondition?: (conditionName: string) => void;
}

type ViewMode = '3d_model' | '5d_video' | 'pathology_image' | 'rehab_guide';

export const AllConditions3DViewer: React.FC<AllConditions3DViewerProps> = ({
  selectedZone: initialZone = 'lumbar',
  onSelectZone,
  onBookCondition,
}) => {
  const [activeZone, setActiveZone] = useState<AnatomicalZone>(initialZone);
  const [viewMode, setViewMode] = useState<ViewMode>('3d_model');
  const [isPathologyActive, setIsPathologyActive] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [motionSpeed, setMotionSpeed] = useState<number>(1); // 0.5x, 1x, 2x

  // Video / Motion State
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(true);
  const [motionProgress, setMotionProgress] = useState<number>(35); // 0-100%

  // Rehab Exercise interactive counter
  const [rehabTimer, setRehabTimer] = useState<number>(0);
  const [rehabReps, setRehabReps] = useState<number>(0);
  const [isRehabActive, setIsRehabActive] = useState<boolean>(false);

  // Synchronize when external selectedZone changes
  useEffect(() => {
    if (initialZone && initialZone !== activeZone) {
      setActiveZone(initialZone);
    }
  }, [initialZone]);

  const currentCondition: BodyConditionDetails = BODY_CONDITIONS_DATA[activeZone] || BODY_CONDITIONS_DATA.lumbar;

  // Web Audio Synth for sound feedback
  const playAudioTone = (freq: number, type: OscillatorType = 'sine', duration: number = 0.12) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context policy
    }
  };

  // Video scrubber animation
  useEffect(() => {
    if (!isPlayingMotion) return;
    const interval = setInterval(() => {
      setMotionProgress((prev) => {
        const next = (prev + 1.2 * motionSpeed) % 100;
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlayingMotion, motionSpeed]);

  // Rehab exercise timer
  useEffect(() => {
    if (!isRehabActive) return;
    const timer = setInterval(() => {
      setRehabTimer((t) => {
        if (t >= 5) {
          setRehabReps((r) => r + 1);
          playAudioTone(880, 'sine', 0.15);
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRehabActive, soundEnabled]);

  const handleZoneSwitch = (zone: AnatomicalZone) => {
    setActiveZone(zone);
    if (onSelectZone) onSelectZone(zone);
    playAudioTone(520, 'sine', 0.08);
  };

  // --- THREE.JS 3D CANVAS IMPLEMENTATION ---
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseStateRef = useRef({ isDragging: false, prevX: 0, prevY: 0 });

  // Procedural Canvas Bump Texture for organic bone/cartilage
  const createProceduralBoneTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const r = Math.random() * 2.5 + 0.5;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(203, 213, 225, 0.45)' : 'rgba(148, 163, 184, 0.35)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  };

  useEffect(() => {
    if (viewMode !== '3d_model' || !mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 460;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // 4-Color Midnight Navy

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(...currentCondition.threeModelConfig.cameraPos);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment & Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cool Teal Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0x0d9488, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // Teal Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0x0d9488, 1.8);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    // Soft Contact Shadow Floor
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
    });
    const shadowFloor = new THREE.Mesh(shadowGeo, shadowMat);
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -1.8;
    scene.add(shadowFloor);

    // Bone texture
    const boneTexture = createProceduralBoneTexture();

    // 5. Build Procedural Multi-Part Model Group for the Active Zone
    const rootGroup = new THREE.Group();
    modelGroupRef.current = rootGroup;
    scene.add(rootGroup);

    // Materials
    const boneMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05,
      bumpMap: boneTexture,
      bumpScale: 0.02,
      wireframe: isWireframe,
    });

    const cartilageMat = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
      wireframe: isWireframe,
    });

    const tendonMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      roughness: 0.35,
      metalness: 0.0,
      wireframe: isWireframe,
    });

    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.2,
      emissive: 0xca8a04,
      emissiveIntensity: 0.4,
      wireframe: isWireframe,
    });

    const pathologyStrainMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.3,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.8,
      wireframe: isWireframe,
    });

    // Helper references for animation
    const animatedParts: THREE.Object3D[] = [];

    // PROCEDURAL BUILDER PER ANATOMICAL ZONE:
    if (activeZone === 'lumbar') {
      // 1. Lumbar Spine L4-L5 Model
      const l4 = new THREE.Group();
      const body4 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.25, 0.9, 32), boneMat);
      body4.castShadow = true;
      l4.add(body4);
      // Spinous process
      const spinous4 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 1.2), boneMat);
      spinous4.position.set(0, 0, -1.1);
      l4.add(spinous4);
      l4.position.y = 1.1;
      rootGroup.add(l4);

      // Disc
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.5, 32), cartilageMat);
      disc.position.y = 0.35;
      rootGroup.add(disc);

      // Herniation Bulge (Pathology)
      if (isPathologyActive) {
        const herniation = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), pathologyStrainMat);
        herniation.position.set(0.65, 0.35, -0.9);
        herniation.scale.set(1.4, 0.9, 1.2);
        rootGroup.add(herniation);
        animatedParts.push(herniation);
      }

      // L5 Vertebra
      const l5 = new THREE.Group();
      const body5 = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.3, 0.9, 32), boneMat);
      body5.castShadow = true;
      l5.add(body5);
      const spinous5 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 1.2), boneMat);
      spinous5.position.set(0, 0, -1.1);
      l5.add(spinous5);
      l5.position.y = -0.45;
      rootGroup.add(l5);

      // Nerve Root Sleeve
      const nerveCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.9, -0.6),
        new THREE.Vector3(0.7, 0.35, -0.85),
        new THREE.Vector3(1.3, -0.6, -1.0),
        new THREE.Vector3(1.7, -1.4, -1.1),
      ]);
      const nerveGeo = new THREE.TubeGeometry(nerveCurve, 24, 0.1, 8, false);
      const nerveMesh = new THREE.Mesh(nerveGeo, nerveMat);
      rootGroup.add(nerveMesh);
    } else if (activeZone === 'cervical') {
      // 2. Cervical Spine C4-C7 Model
      for (let i = 0; i < 4; i++) {
        const vert = new THREE.Group();
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.8 - i * 0.03, 0.82 - i * 0.03, 0.45, 24), boneMat);
        cylinder.castShadow = true;
        vert.add(cylinder);

        // Spinous process with bifurcation
        const sp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.7), boneMat);
        sp.position.set(0, -0.05, -0.65);
        vert.add(sp);

        vert.position.set(0, 1.4 - i * 0.75, Math.sin(i * 0.4) * 0.2);
        vert.rotation.x = 0.08 * i;
        rootGroup.add(vert);

        if (i < 3) {
          const disc = new THREE.Mesh(
            new THREE.CylinderGeometry(0.78, 0.78, 0.22, 24),
            i === 1 && isPathologyActive ? pathologyStrainMat : cartilageMat
          );
          disc.position.set(0, 1.05 - i * 0.75, Math.sin(i * 0.4 + 0.2) * 0.2);
          rootGroup.add(disc);
        }
      }
    } else if (activeZone === 'thoracic') {
      // 3. Thoracic Spine & Ribcage Arcs
      for (let i = 0; i < 4; i++) {
        const vert = new THREE.Group();
        const tBody = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.92, 0.55, 24), boneMat);
        vert.add(tBody);

        // Ribs branching out
        const ribLeftCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.6, 0, -0.2),
          new THREE.Vector3(-1.4, -0.2, 0.4),
          new THREE.Vector3(-1.8, -0.4, 1.2),
          new THREE.Vector3(-0.8, -0.6, 1.6),
        ]);
        const ribRightCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.6, 0, -0.2),
          new THREE.Vector3(1.4, -0.2, 0.4),
          new THREE.Vector3(1.8, -0.4, 1.2),
          new THREE.Vector3(0.8, -0.6, 1.6),
        ]);
        const ribL = new THREE.Mesh(new THREE.TubeGeometry(ribLeftCurve, 16, 0.08, 8, false), boneMat);
        const ribR = new THREE.Mesh(new THREE.TubeGeometry(ribRightCurve, 16, 0.08, 8, false), boneMat);
        vert.add(ribL);
        vert.add(ribR);

        vert.position.set(0, 1.3 - i * 0.8, -i * 0.15); // Kyphotic curvature
        vert.rotation.x = -0.1 * i;
        rootGroup.add(vert);

        if (i < 3) {
          const disc = new THREE.Mesh(
            new THREE.CylinderGeometry(0.88, 0.88, 0.22, 24),
            i === 2 && isPathologyActive ? pathologyStrainMat : cartilageMat
          );
          disc.position.set(0, 0.9 - i * 0.8, -i * 0.15);
          rootGroup.add(disc);
        }
      }
    } else if (activeZone === 'shoulder') {
      // 4. Shoulder Glenohumeral Joint & Rotator Cuff Impingement
      const humerus = new THREE.Group();
      const humHead = new THREE.Mesh(new THREE.SphereGeometry(0.95, 32, 32), boneMat);
      humerus.add(humHead);
      const humShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.4, 2.2, 24), boneMat);
      humShaft.position.set(0.1, -1.3, 0);
      humerus.add(humShaft);
      humerus.position.set(0.6, -0.2, 0);
      rootGroup.add(humerus);
      animatedParts.push(humerus);

      // Scapula Glenoid Rim
      const glenoid = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.25, 24), cartilageMat);
      glenoid.rotation.z = Math.PI / 2;
      glenoid.position.set(-0.55, -0.1, 0);
      rootGroup.add(glenoid);

      // Acromion Arch
      const acromion = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 1.2), boneMat);
      acromion.position.set(0.1, 1.05, 0);
      acromion.rotation.z = -0.15;
      rootGroup.add(acromion);

      // Supraspinatus Tendon Passing underneath
      const tendon = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.14, 0.7),
        isPathologyActive ? pathologyStrainMat : tendonMat
      );
      tendon.position.set(0.25, 0.8, 0);
      tendon.rotation.z = -0.15;
      rootGroup.add(tendon);
    } else if (activeZone === 'knee') {
      // 5. Knee Joint Tibiofemoral & Patellofemoral
      const femur = new THREE.Group();
      const fShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 1.8, 24), boneMat);
      fShaft.position.y = 1.1;
      femur.add(fShaft);
      const mCondyle = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), boneMat);
      mCondyle.position.set(-0.5, 0.35, 0);
      mCondyle.scale.set(0.8, 1, 1.2);
      femur.add(mCondyle);
      const lCondyle = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), boneMat);
      lCondyle.position.set(0.5, 0.35, 0);
      lCondyle.scale.set(0.8, 1, 1.2);
      femur.add(lCondyle);
      rootGroup.add(femur);
      animatedParts.push(femur);

      // Menisci C-Wedges
      const medMeniscus = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.12, 12, 24, Math.PI), cartilageMat);
      medMeniscus.rotation.x = Math.PI / 2;
      medMeniscus.position.set(-0.5, -0.05, 0);
      rootGroup.add(medMeniscus);

      const latMeniscus = new THREE.Mesh(
        new THREE.TorusGeometry(0.45, 0.12, 12, 24, Math.PI),
        isPathologyActive ? pathologyStrainMat : cartilageMat
      );
      latMeniscus.rotation.x = Math.PI / 2;
      latMeniscus.position.set(0.5, -0.05, 0);
      rootGroup.add(latMeniscus);

      // Tibia Plateau & Shaft
      const tibia = new THREE.Group();
      const tPlateau = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 0.45, 32), boneMat);
      tPlateau.position.y = -0.3;
      tibia.add(tPlateau);
      const tShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.4, 2.0, 24), boneMat);
      tShaft.position.y = -1.45;
      tibia.add(tShaft);
      rootGroup.add(tibia);

      // ACL Cruciate Ligament
      const aclCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.35, 0.2, 0.1),
        new THREE.Vector3(0.0, 0.05, 0.0),
        new THREE.Vector3(0.35, -0.2, -0.15),
      ]);
      const aclMesh = new THREE.Mesh(
        new THREE.TubeGeometry(aclCurve, 16, 0.08, 8, false),
        isPathologyActive ? pathologyStrainMat : tendonMat
      );
      rootGroup.add(aclMesh);

      // Patella bone anterior
      const patella = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), boneMat);
      patella.scale.set(0.9, 1.1, 0.4);
      patella.position.set(0.15, 0.25, 0.85); // Lateral tilt in pathology
      rootGroup.add(patella);
    } else if (activeZone === 'hip') {
      // 6. Hip Femoroacetabular Joint & Pelvis
      const pelvis = new THREE.Group();
      const iliacWing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 0.25), boneMat);
      iliacWing.position.set(-0.6, 1.2, 0);
      iliacWing.rotation.z = -0.3;
      pelvis.add(iliacWing);

      // Acetabular Socket
      const acetabulum = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI), boneMat);
      acetabulum.rotation.y = Math.PI / 2;
      acetabulum.position.set(-0.2, 0.2, 0);
      pelvis.add(acetabulum);
      rootGroup.add(pelvis);

      // Acetabular Labrum Ring
      const labrum = new THREE.Mesh(
        new THREE.TorusGeometry(0.85, 0.1, 12, 24),
        isPathologyActive ? pathologyStrainMat : cartilageMat
      );
      labrum.rotation.y = Math.PI / 2;
      labrum.position.set(-0.15, 0.2, 0);
      rootGroup.add(labrum);

      // Femoral Head & Neck
      const femur = new THREE.Group();
      const fHead = new THREE.Mesh(new THREE.SphereGeometry(0.82, 32, 32), boneMat);
      fHead.position.set(-0.1, 0.2, 0);
      femur.add(fHead);

      // Cam deformity bump
      if (isPathologyActive) {
        const camBump = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), pathologyStrainMat);
        camBump.position.set(0.35, 0.55, 0.2);
        femur.add(camBump);
      }

      const fNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 1.1, 24), boneMat);
      fNeck.rotation.z = -0.75;
      fNeck.position.set(0.45, -0.15, 0);
      femur.add(fNeck);

      const fShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.48, 2.2, 24), boneMat);
      fShaft.position.set(1.0, -1.3, 0);
      femur.add(fShaft);

      rootGroup.add(femur);
      animatedParts.push(femur);
    } else if (activeZone === 'elbow') {
      // 7. Elbow Humeroradial Joint & ECRB Extensor Origin
      const humerus = new THREE.Group();
      const hShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 2.0, 24), boneMat);
      hShaft.position.y = 1.1;
      humerus.add(hShaft);

      // Epicondyles
      const latEpicondyle = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), boneMat);
      latEpicondyle.position.set(0.65, 0.1, 0);
      humerus.add(latEpicondyle);

      const medEpicondyle = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 24), boneMat);
      medEpicondyle.position.set(-0.65, 0.1, 0);
      humerus.add(medEpicondyle);

      rootGroup.add(humerus);

      // Radius & Ulna
      const forearm = new THREE.Group();
      const radiusHead = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 24), boneMat);
      radiusHead.position.set(0.5, -0.3, 0);
      forearm.add(radiusHead);

      const rShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 1.9, 24), boneMat);
      rShaft.position.set(0.5, -1.35, 0);
      forearm.add(rShaft);

      const ulnaOlecranon = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.6, 0.5), boneMat);
      ulnaOlecranon.position.set(-0.25, -0.2, 0);
      forearm.add(ulnaOlecranon);

      const uShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 1.9, 24), boneMat);
      uShaft.position.set(-0.25, -1.35, 0);
      forearm.add(uShaft);

      rootGroup.add(forearm);
      animatedParts.push(forearm);

      // ECRB Tendon with Strain Point
      const ecrb = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.08, 1.2, 16),
        isPathologyActive ? pathologyStrainMat : tendonMat
      );
      ecrb.position.set(0.68, -0.5, 0.15);
      ecrb.rotation.z = -0.15;
      rootGroup.add(ecrb);
    } else if (activeZone === 'ankle') {
      // 8. Ankle Mortise & Plantar Fascia
      const tibiaFibula = new THREE.Group();
      const tibShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 1.8, 24), boneMat);
      tibShaft.position.set(-0.15, 1.1, 0);
      tibiaFibula.add(tibShaft);

      const medMalleolus = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.4), boneMat);
      medMalleolus.position.set(-0.45, 0.15, 0);
      tibiaFibula.add(medMalleolus);

      const latMalleolus = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.35), boneMat);
      latMalleolus.position.set(0.45, 0.1, 0);
      tibiaFibula.add(latMalleolus);

      rootGroup.add(tibiaFibula);

      // Talus Bone
      const foot = new THREE.Group();
      const talus = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 24), boneMat);
      talus.scale.set(0.9, 0.7, 1.1);
      talus.position.set(0, -0.1, 0.1);
      foot.add(talus);

      // Calcaneus Heel Bone
      const calcaneus = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 1.5), boneMat);
      calcaneus.position.set(0, -0.65, -0.4);
      foot.add(calcaneus);

      // Plantar Fascia Band spanning from calcaneus forward
      const plantarFascia = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.1, 1.6),
        isPathologyActive ? pathologyStrainMat : tendonMat
      );
      plantarFascia.position.set(0, -1.05, 0.2);
      foot.add(plantarFascia);

      // Achilles Tendon insertion posteriorly
      const achilles = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 1.4, 16), tendonMat);
      achilles.position.set(0, 0.2, -0.9);
      foot.add(achilles);

      rootGroup.add(foot);
      animatedParts.push(foot);
    }

    // Explode view positioning if enabled
    if (isExploded) {
      rootGroup.children.forEach((child, idx) => {
        child.position.x += (idx % 2 === 0 ? 0.35 : -0.35);
        child.position.y += idx * 0.15;
      });
    }

    // Scale root group
    rootGroup.scale.setScalar(currentCondition.threeModelConfig.modelScale);

    // Mouse Interaction for 3D Orbiting
    const handleMouseDown = (e: MouseEvent) => {
      mouseStateRef.current = { isDragging: true, prevX: e.clientX, prevY: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseStateRef.current.isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - mouseStateRef.current.prevX;
      const deltaY = e.clientY - mouseStateRef.current.prevY;
      modelGroupRef.current.rotation.y += deltaX * 0.01;
      modelGroupRef.current.rotation.x += deltaY * 0.01;
      mouseStateRef.current.prevX = e.clientX;
      mouseStateRef.current.prevY = e.clientY;
    };
    const handleMouseUp = () => {
      mouseStateRef.current.isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop with damped rotation & kinematic deformation
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle idle rotation when not dragging
      if (!mouseStateRef.current.isDragging && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.005;
      }

      // Dynamic strain / impingement animation
      if (isPathologyActive) {
        animatedParts.forEach((part) => {
          if (currentCondition.threeModelConfig.motionType === 'flexion_compression') {
            part.position.z = Math.sin(elapsedTime * 2.5) * 0.08 - 0.9;
          } else if (currentCondition.threeModelConfig.motionType === 'impingement_abduction') {
            part.position.y = Math.sin(elapsedTime * 2) * 0.12 - 0.1;
          } else if (currentCondition.threeModelConfig.motionType === 'valgus_shear') {
            part.rotation.z = Math.sin(elapsedTime * 2.2) * 0.08;
          } else if (currentCondition.threeModelConfig.motionType === 'torsion_strain') {
            part.rotation.y = Math.sin(elapsedTime * 2) * 0.1;
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      boneTexture.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [activeZone, viewMode, isPathologyActive, isExploded, isWireframe]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Bar: Clinical Title, 4-Color Discipline */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                ICD-10: {currentCondition.icdCode}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-sans text-xs font-medium">
                {currentCondition.clinicalClassification}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-teal-900/60 text-teal-200 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Dr. Heta Doshi Biomechanical Protocol</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{currentCondition.conditionName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {currentCondition.pathomechanism}
            </p>
          </div>

          {/* Quick Action: Book Directly for This Condition */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => soundEnabled && playAudioTone(660, 'sine', 0.1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title={soundEnabled ? 'Mute Audio Cues' : 'Unmute Audio Cues'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-teal-400" onClick={() => setSoundEnabled(false)} />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" onClick={() => setSoundEnabled(true)} />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onBookCondition) {
                  onBookCondition(currentCondition.conditionName);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Dr. Heta for {currentCondition.zoneName}</span>
            </button>
          </div>
        </div>

        {/* 8 Anatomical Zones Pill Selector Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Select Anatomical Condition to Inspect:</span>
            <span className="text-teal-400 font-mono">8 of 8 Body Zones Modeled</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(Object.keys(BODY_CONDITIONS_DATA) as AnatomicalZone[]).map((zone) => {
              const data = BODY_CONDITIONS_DATA[zone];
              const isCurrent = zone === activeZone;
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => handleZoneSwitch(zone)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isCurrent
                      ? 'bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-900/40'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white' : 'bg-teal-400'}`}></span>
                  <span>{data.zoneName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Mode Tabs: 3D Interactive, 5D Kinematic Video, Pathology Cross-Section, Rehab Video Guide */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-200/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('3d_model')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '3d_model'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>3D Interactive Anatomy</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('5d_video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '5d_video'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-teal-600" />
            <span>5D Kinematic Video Feed</span>
            <span className="px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 text-[10px]">5D</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('pathology_image')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'pathology_image'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            <span>Pathology Cross-Section Image</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('rehab_guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'rehab_guide'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Rehab Video & Protocol Guide</span>
          </button>
        </div>

        {/* Conservative Resolution Rate Badge */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Conservative Recovery:</span>
          <span className="text-teal-700 font-mono">{currentCondition.conservativeSuccessRate}</span>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div className="p-6 sm:p-8">
        {/* VIEW 1: 3D INTERACTIVE THREE.JS MODEL */}
        {viewMode === '3d_model' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 3D Viewport */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800 shadow-inner">
                {/* Overlay Controls */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPathologyActive(!isPathologyActive)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md border ${
                      isPathologyActive
                        ? 'bg-rose-950/80 text-rose-300 border-rose-700/60 shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Pathology Strain: {isPathologyActive ? 'ACTIVE' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsExploded(!isExploded)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md border ${
                      isExploded
                        ? 'bg-teal-950/80 text-teal-300 border-teal-700/60'
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-teal-400" />
                    <span>Exploded View: {isExploded ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all backdrop-blur-md border ${
                      isWireframe
                        ? 'bg-teal-950/80 text-teal-300 border-teal-700/60'
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}
                  >
                    Wireframe
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4 z-10 text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-teal-400">● 3D Procedural PBR Canvas:</span> Click & drag to rotate 360°
                </div>

                {/* 3D Canvas Mount Point */}
                <div ref={mountRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />
              </div>

              {/* Right Column: Anatomical Structure Breakdown & Clinical Notes */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Primary Anatomical Structures
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentCondition.primaryStructures.map((struct, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                        <span className="font-medium">{struct}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Pathological Highlight</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {currentCondition.threeModelConfig.pathologyHighlight}
                  </p>
                </div>

                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Diagnostic MRI & Ultrasound Confirmation</span>
                  </div>
                  <p className="text-xs text-teal-950 leading-relaxed">
                    {currentCondition.mriFindings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: 5D KINEMATIC VIDEO FEED & LIVE TELEMETRY VECTORS */}
        {viewMode === '5d_video' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 5D Video Simulation Screen */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl p-4 space-y-4">
                {/* 5D Simulated Video Screen */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {/* Grid overlay simulating motion capture studio */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40"></div>

                  {/* 5D HUD Vector Target Circle */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-28 h-28 rounded-full border-2 border-dashed border-teal-400/80 flex items-center justify-center animate-spin-slow">
                      <div className="w-20 h-20 rounded-full border border-teal-500/40 flex items-center justify-center bg-teal-950/30">
                        <Activity className="w-8 h-8 text-teal-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                        5D KINEMATICS STREAM · {currentCondition.zoneName}
                      </div>
                      <div className="text-base font-extrabold text-white mt-1">
                        Biomechanical Motion Tracking Feed
                      </div>
                      <div className="text-xs text-slate-400 mt-1 max-w-md">
                        Real-time tracking of translational shear, rotational torque, and impulsive rate of force.
                      </div>
                    </div>
                  </div>

                  {/* Live Telemetry Floating HUD Cards */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-left font-mono text-xs space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase">Live 5D Coordinates</div>
                    <div className="text-teal-400 font-bold">X: +{(Math.sin(motionProgress / 10) * 3.8).toFixed(1)} mm</div>
                    <div className="text-amber-400 font-bold">Y (Load): {(400 + Math.cos(motionProgress / 10) * 350).toFixed(0)} N</div>
                    <div className="text-rose-400 font-bold">θ (Torque): {(12 + Math.sin(motionProgress / 8) * 8).toFixed(1)}°</div>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-right font-mono text-xs">
                    <div className="text-[10px] text-slate-400 uppercase">Motion Cadence</div>
                    <div className="text-white font-bold">{motionSpeed}x Realtime</div>
                    <div className="text-teal-400 text-[10px]">Sampling: 120 Hz</div>
                  </div>

                  {/* Bottom Video Progress Scrub Bar */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsPlayingMotion(!isPlayingMotion)}
                      className="p-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
                    >
                      {isPlayingMotion ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <div className="flex-1 relative flex items-center">
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-500 h-full rounded-full transition-all"
                          style={{ width: `${motionProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-300 shrink-0">
                      {(motionProgress * 0.1).toFixed(1)}s / 10.0s
                    </div>

                    <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
                      {[0.5, 1, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setMotionSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                            motionSpeed === spd
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clinical Interpretation Banner */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Dr. Heta Doshi 5D Motion Analysis Note: </span>
                    <span>
                      High rate of force development (dF/dt) combined with uncontrolled rotational shear (θ) is the primary determinant of micro-tissue failure. Eliminating rapid ballistic deceleration during daily activities protects healing collagen fibrils.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: 5D Quantitative Vector Matrix Table */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      5D Kinematic Vector Matrix
                    </h4>
                    <span className="text-[10px] font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold">
                      Calibrated
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentCondition.kinematic5DVectors.map((vec, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="font-mono text-teal-700 font-extrabold">{vec.symbol}</span>
                            <span>{vec.dimension}</span>
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              vec.status === 'Critical Strain'
                                ? 'bg-rose-100 text-rose-800'
                                : vec.status === 'Elevated Load'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}
                          >
                            {vec.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60 font-mono">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Normal Baseline:</span>
                            <span className="text-slate-800 font-bold">{vec.normalValue} {vec.unit}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Measured Strain:</span>
                            <span className="text-rose-700 font-extrabold">{vec.pathologicValue} {vec.unit}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 pt-1 leading-tight">
                          {vec.clinicalMeaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PATHOLOGY CROSS-SECTION IMAGE & DIAGNOSTIC FINDINGS */}
        {viewMode === 'pathology_image' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: High-Definition Clinical Pathology Diagram */}
              <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Anatomical Cross-Section & Pathology Mapping
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standardized medical illustration and tissue morphology for {currentCondition.zoneName}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                    HD Cross-Section
                  </span>
                </div>

                {/* SVG Visual Representation of the Condition Pathology */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden shadow-sm">
                  {/* Visual SVG diagram simulating the pathology */}
                  <svg className="w-full max-w-md h-72" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background grid */}
                    <rect width="400" height="300" fill="#f8fafc" rx="12" />
                    
                    {/* Healthy vs Pathologic Structural comparison */}
                    <g transform="translate(60, 40)">
                      <text x="0" y="20" fill="#0f172a" fontSize="13" fontWeight="bold">Normal Anatomy</text>
                      <circle cx="40" cy="80" r="35" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="40" cy="80" r="18" fill="#67e8f9" opacity="0.6" />
                      <rect x="15" y="130" width="50" height="25" rx="4" fill="#cbd5e1" />
                      <text x="5" y="180" fill="#64748b" fontSize="10">Intact Capsule</text>
                    </g>

                    <g transform="translate(240, 40)">
                      <text x="0" y="20" fill="#b91c1c" fontSize="13" fontWeight="bold">Pathologic State</text>
                      <circle cx="40" cy="80" r="35" fill="#fecdd3" stroke="#f43f5e" strokeWidth="2" />
                      {/* Pathology bulge or tear */}
                      <path d="M55 70 Q 90 75 80 95 Q 65 95 55 90 Z" fill="#ef4444" />
                      {/* Compressed nerve root */}
                      <path d="M78 60 Q 92 85 88 120" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
                      <rect x="15" y="130" width="50" height="25" rx="4" fill="#cbd5e1" />
                      <text x="-15" y="180" fill="#b91c1c" fontSize="10" fontWeight="bold">Tear & Impingement</text>
                    </g>

                    {/* Annotation pointers */}
                    <path d="M140 100 L 220 100" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="180" cy="100" r="3" fill="#0d9488" />
                    <text x="135" y="120" fill="#0f172a" fontSize="10" fontWeight="bold">Biomechanic Comparison</text>

                    {/* Bottom Status bar */}
                    <rect x="20" y="240" width="360" height="40" rx="8" fill="#0f172a" />
                    <text x="40" y="265" fill="#2dd4bf" fontSize="11" fontWeight="bold">
                      Pathologic Focal Point: {currentCondition.threeModelConfig.pathologyHighlight}
                    </text>
                  </svg>

                  <div className="text-center text-xs text-slate-500 mt-4 max-w-lg">
                    Comparative structural morphology demonstrating the focal mechanical failure and tissue impingement during repetitive strain cycles.
                  </div>
                </div>

                {/* Key Clinical Symptoms Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Cardinal Clinical Symptoms & Diagnostic Signs:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCondition.keySymptoms.map((symp, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{symp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Diagnostic & Etiology Summary */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Clinical Epidemiology
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Prevalence:</span>
                      <span className="font-bold text-slate-900">{currentCondition.prevalence}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">ICD-10 Code:</span>
                      <span className="font-mono font-bold text-teal-700">{currentCondition.icdCode}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Surgical Avoidance:</span>
                      <span className="font-bold text-teal-700">{currentCondition.conservativeSuccessRate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>Specialist Consultation Rationale</span>
                  </div>
                  <p className="text-xs text-teal-950 leading-relaxed">
                    Under the clinical guidance of Dr. Heta Doshi (M.P.Th. Musculoskeletal & Sports), diagnostic precision differentiates between primary mechanical derangement and compensatory kinetic dysfunction.
                  </p>
                  <button
                    type="button"
                    onClick={() => onBookCondition && onBookCondition(currentCondition.conditionName)}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Targeted Clinical Intake</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: REHABILITATION VIDEO & PROTOCOL GUIDE */}
        {viewMode === 'rehab_guide' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive Exercise Video Screen with Rep Counter */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-6 space-y-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
                      {currentCondition.rehabilitationProtocol.phase}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                      {currentCondition.rehabilitationProtocol.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRehabActive(!isRehabActive);
                        playAudioTone(isRehabActive ? 400 : 700, 'sine', 0.1);
                      }}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                        isRehabActive
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40'
                          : 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/40'
                      }`}
                    >
                      {isRehabActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Guide</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Start Rep Guide</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRehabReps(0);
                        setRehabTimer(0);
                        setIsRehabActive(false);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Reset Counter"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Guide Canvas / Motion Simulator */}
                <div className="relative aspect-video bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                  {/* Subtle kinetic rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-48 h-48 rounded-full border border-teal-500/20 transition-all duration-1000"
                      style={{
                        transform: `scale(${1 + (rehabTimer / 5) * 0.3})`,
                        opacity: 0.3 + (rehabTimer / 5) * 0.4,
                      }}
                    ></div>
                  </div>

                  {/* Dynamic Rep HUD Display */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-32 h-32 rounded-full bg-slate-900/90 border-2 border-teal-400 flex flex-col items-center justify-center shadow-xl">
                      <span className="text-[11px] font-mono text-teal-400 font-bold uppercase">Repetition</span>
                      <span className="text-4xl font-extrabold text-white font-mono">{rehabReps}</span>
                      <span className="text-[10px] text-slate-400">Hold: {rehabTimer}s / 5s</span>
                    </div>

                    <div className="text-xs text-slate-300 font-medium max-w-sm">
                      {isRehabActive
                        ? 'Sustain muscle contraction through the full hold phase...'
                        : 'Press "Start Rep Guide" to initiate paced cadence and audio cues.'}
                    </div>
                  </div>

                  {/* Exercise Prescription Tag Overlays */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-teal-400 font-bold">Target Muscle: </span>
                    <span>{currentCondition.rehabilitationProtocol.targetMuscle}</span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-teal-400 font-bold">Frequency: </span>
                    <span>{currentCondition.rehabilitationProtocol.frequency}</span>
                  </div>
                </div>

                {/* Key Technique Bullets */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Evidence-Based Execution Technique:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {currentCondition.rehabilitationProtocol.keyTechnique.map((tech, i) => (
                      <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dr. Heta Doshi Clinical Coaching Note */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>Dr. Heta Doshi Clinical Note</span>
                  </div>
                  <blockquote className="text-xs text-teal-950 italic leading-relaxed">
                    "{currentCondition.rehabilitationProtocol.drHetaClinicalTip}"
                  </blockquote>
                  <div className="pt-2 text-[11px] text-teal-800 font-semibold border-t border-teal-200/60">
                    Assistant Professor · M.P.Th. Musculoskeletal & Sports
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Protocol Progression Milestones
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                      <span>Phase 1: Acute Decompression & Pain Down-Regulation (Wk 1-2)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      <span>Phase 2: Progressive Kinetic Chain Loading (Wk 3-6)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      <span>Phase 3: High-Velocity Return to Sport & Work (Wk 7-12)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>PhysioMatch AI Multi-Planar 3D & 5D Biomechanical Atlas · All 8 Body Zones Modeled</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          Dr. Heta Doshi (PT) · Ph.D. Scholar · Vadodara Practice
        </div>
      </div>
    </div>
  );
};
