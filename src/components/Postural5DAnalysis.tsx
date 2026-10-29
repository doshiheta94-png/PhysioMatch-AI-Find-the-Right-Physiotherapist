import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Camera,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Maximize2,
  Dumbbell,
  Clock,
  Layers,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  Activity,
  Sliders,
  Award,
} from 'lucide-react';

interface GuideVideoItem {
  id: string;
  title: string;
  targetDimension: string;
  dimensionCode: '1D (X)' | '2D (Y)' | '3D (Z)' | '4D (θ)' | '5D (t/ΔF)';
  durationSec: number;
  setsReps: string;
  focusMuscles: string;
  description: string;
  steps: string[];
  clinicalCues: string[];
  contraindications: string;
  videoGraphicType: 'chin-tuck' | 'thoracic-ext' | 'scapular-retract' | 'pelvic-bridge';
}

const GUIDE_VIDEOS: GuideVideoItem[] = [
  {
    id: 'gv-1',
    title: 'Cervical Retraction & Deep Neck Flexor Activation',
    targetDimension: 'Sagittal Plane Forward Head Correction (CVA Angle)',
    dimensionCode: '3D (Z)',
    durationSec: 10,
    setsReps: '3 sets × 10 reps (5-sec hold)',
    focusMuscles: 'Longus Colli, Longus Capitis (Inhibits Suboccipitals)',
    description: 'Reverses forward head posture (tech neck) by realigning the cranial center of mass directly over the C7 vertebral body, unloading the suboccipital cervical facets.',
    steps: [
      'Sit or stand upright with shoulders relaxed and eyes looking straight ahead at eye level.',
      'Place index finger gently on chin as a biomechanical motion guide.',
      'Without tilting your head up or down, glide the chin horizontally straight backward as if making a subtle double chin.',
      'Hold the retracted position for 5 seconds, breathing normally. You will feel a gentle elongation stretch at the skull base.',
      'Slowly release back to neutral and repeat for 10 repetitions.',
    ],
    clinicalCues: [
      'Do not tilt your head down (avoid neck flexion); keep gaze level with horizon.',
      'Keep jaw teeth unclasped and tongue resting against roof of mouth.',
      'Discontinue if you feel sharp dizziness or tingling into the fingers.',
    ],
    contraindications: 'Acute cervical radicular disc herniation with severe peripheral arm pain unless supervised.',
    videoGraphicType: 'chin-tuck',
  },
  {
    id: 'gv-2',
    title: 'Thoracic Extension & Foam Roller Decompression',
    targetDimension: 'Vertical Axial Height & Kyphotic Decompression',
    dimensionCode: '2D (Y)',
    durationSec: 15,
    setsReps: '3 sets × 8 gentle mobilization cycles',
    focusMuscles: 'Thoracic Erector Spinae, Rhomboids, Pectoralis Minor stretch',
    description: 'Mobilizes hypomobile T1-T12 thoracic vertebrae to restore natural kyphotic compliance and remove compensatory anterior shoulder tipping.',
    steps: [
      'Position foam roller horizontally beneath your mid-back at the level of the lower shoulder blades.',
      'Interlock fingers behind your head to fully support the cervical spine and neck muscles.',
      'Inhale deeply and gently arch back over the roller within comfortable, painless range.',
      'Exhale and return to starting posture, then shift roller up 2 inches to target the upper thoracic spine.',
      'Maintain continuous core engagement to prevent compensatory lumbar hyperextension.',
    ],
    clinicalCues: [
      'Support the neck weight with hands; never strain cervical muscles.',
      'Do not roll onto the floating ribs or lower lumbar spine.',
      'Breathe smoothly; rib cage expansion aids costovertebral joint mobilization.',
    ],
    contraindications: 'Osteoporosis with documented vertebral compression fractures; active costochondritis.',
    videoGraphicType: 'thoracic-ext',
  },
  {
    id: 'gv-3',
    title: 'Scapular Retraction & Lower Trapezius Setting',
    targetDimension: 'Coronal Plane Shoulder Level Symmetry & Posterior Tipping',
    dimensionCode: '1D (X)',
    durationSec: 12,
    setsReps: '3 sets × 12 reps (3-sec isometric squeeze)',
    focusMuscles: 'Lower Trapezius, Serratus Anterior, Middle Trapezius',
    description: 'Restores scapulohumeral rhythm by retracting and depressing protracted scapulae, expanding the subacromial space for pain-free overhead movement.',
    steps: [
      'Stand with back against a flat wall, elbows bent at 90 degrees with thumbs pointing outward.',
      'Gently draw your shoulder blades down and back toward opposite back pockets.',
      'Press the backs of your hands, wrists, and elbows lightly into the wall without arching your lower back.',
      'Hold isometric contraction for 3 seconds feeling the lower traps activate below shoulder blades.',
      'Slowly release tension with controlled tempo and repeat.',
    ],
    clinicalCues: [
      'Do NOT shrug shoulders toward your ears (suppress upper trapezius dominance).',
      'Keep rib cage pulled in flush with the wall.',
      'Feel muscle contraction in the mid-to-lower back, not in the neck.',
    ],
    contraindications: 'Acute calcific shoulder bursitis in flare-up phase.',
    videoGraphicType: 'scapular-retract',
  },
  {
    id: 'gv-4',
    title: 'Pelvic Neutral Tilt & Kinetic Gluteal Bridge',
    targetDimension: 'Transverse Torsion & Lumbo-Pelvic Rotational Equilibrium',
    dimensionCode: '4D (θ)',
    durationSec: 14,
    setsReps: '3 sets × 10 reps (4-sec bridge hold)',
    focusMuscles: 'Gluteus Maximus, Hamstrings, Transversus Abdominis',
    description: 'Neutralizes pelvic obliquity and anterior tilt, decompressing the L4-L5 and L5-S1 lumbar facet joints through kinetic chain gluteal activation.',
    steps: [
      'Lie supine on a firm clinical mat with knees bent at 90° and feet flat, hip-width apart.',
      'Perform a subtle posterior pelvic tilt by flattening your lower back gently into the mat.',
      'Drive evenly through both heels, contracting your glutes to lift hips into a straight diagonal line.',
      'Hold at the top for 4 seconds, maintaining equal pressure between left and right feet.',
      'Lower down bone-by-bone with controlled lumbar eccentric control.',
    ],
    clinicalCues: [
      'Avoid hyperextending your lumbar spine at the apex; lift with glutes, not lower back.',
      'Keep knees tracking directly over 2nd toes, preventing inward collapse.',
      'Ensure both pelvic anterior superior iliac spines (ASIS) rise at the exact same level.',
    ],
    contraindications: 'Acute unreduced spondylolisthesis grade III/IV.',
    videoGraphicType: 'pelvic-bridge',
  },
];

type PosturePreset = 'ideal' | 'forward_head' | 'upper_crossed' | 'thoracic_kyphosis' | 'swayback';

export const Postural5DAnalysis: React.FC = () => {
  // Mode: Simulated Video kinematic feed vs Live Webcam stream
  const [feedMode, setFeedMode] = useState<'simulated' | 'webcam'>('simulated');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video playback controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Posture Preset & 5D Slider Parameters
  const [activePreset, setActivePreset] = useState<PosturePreset>('forward_head');
  const [cvaAngle, setCvaAngle] = useState(42); // Craniovertebral Angle (Normal: 50-55)
  const [shoulderAsymmetry, setShoulderAsymmetry] = useState(3.2); // Degrees difference (Normal: <1.5)
  const [kyphosisAngle, setKyphosisAngle] = useState(48); // Cobb thoracic (Normal: 25-40)
  const [pelvicTorsion, setPelvicTorsion] = useState(4.5); // Rotation degrees (Normal: <2)
  const [swayVelocity, setSwayVelocity] = useState(6.8); // Center of gravity sway mm/s (Normal: 2-4)

  // Guided Video Player State
  const [selectedGuideVideo, setSelectedGuideVideo] = useState<GuideVideoItem>(GUIDE_VIDEOS[0]);
  const [guidePlaying, setGuidePlaying] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [holdTimer, setHoldTimer] = useState(5);
  const [isHolding, setIsHolding] = useState(false);
  const [addedToHep, setAddedToHep] = useState(false);

  // Overlay HUD Toggles
  const [showPlumbLine, setShowPlumbLine] = useState(true);
  const [showJointVectors, setShowJointVectors] = useState(true);
  const [show5DGrid, setShow5DGrid] = useState(true);

  // Handle Preset Selection
  const applyPreset = (preset: PosturePreset) => {
    setActivePreset(preset);
    switch (preset) {
      case 'ideal':
        setCvaAngle(53);
        setShoulderAsymmetry(0.8);
        setKyphosisAngle(32);
        setPelvicTorsion(1.1);
        setSwayVelocity(2.8);
        break;
      case 'forward_head':
        setCvaAngle(39);
        setShoulderAsymmetry(2.4);
        setKyphosisAngle(46);
        setPelvicTorsion(3.2);
        setSwayVelocity(6.2);
        break;
      case 'upper_crossed':
        setCvaAngle(36);
        setShoulderAsymmetry(4.1);
        setKyphosisAngle(52);
        setPelvicTorsion(4.8);
        setSwayVelocity(7.4);
        break;
      case 'thoracic_kyphosis':
        setCvaAngle(41);
        setShoulderAsymmetry(2.9);
        setKyphosisAngle(56);
        setPelvicTorsion(3.6);
        setSwayVelocity(5.9);
        break;
      case 'swayback':
        setCvaAngle(44);
        setShoulderAsymmetry(3.5);
        setKyphosisAngle(38);
        setPelvicTorsion(5.4);
        setSwayVelocity(8.1);
        break;
    }
  };

  // Start / Stop Webcam
  const toggleWebcam = async () => {
    if (isWebcamActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsWebcamActive(false);
      setFeedMode('simulated');
    } else {
      try {
        setWebcamError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsWebcamActive(true);
        setFeedMode('webcam');
      } catch (err) {
        console.error('Camera access error:', err);
        setWebcamError('Unable to access webcam. Please allow camera permissions or continue with clinical simulated video.');
        setFeedMode('simulated');
      }
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Hold Timer logic for Guide Video
  useEffect(() => {
    let interval: any = null;
    if (isHolding && holdTimer > 0) {
      interval = setInterval(() => {
        setHoldTimer((t) => t - 1);
      }, 1000);
    } else if (holdTimer === 0 && isHolding) {
      setIsHolding(false);
      setRepCount((r) => r + 1);
      setHoldTimer(5);
      // Play brief Web Audio chime for repetition completion
      playTone(587.33, 0.15); // D5
    }
    return () => clearInterval(interval);
  }, [isHolding, holdTimer]);

  const playTone = (freq: number, duration: number) => {
    if (isAudioMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext unavailable or restricted
    }
  };

  // Calculate composite 5D Posture Alignment Score (0 to 100)
  const alignmentScore = Math.max(
    20,
    Math.min(
      100,
      Math.round(
        100 -
          (Math.abs(53 - cvaAngle) * 1.8 +
            shoulderAsymmetry * 4.5 +
            Math.max(0, kyphosisAngle - 38) * 1.5 +
            pelvicTorsion * 3.8 +
            Math.max(0, swayVelocity - 3) * 3)
      )
    )
  );

  // Save to Home Exercise Program
  const handleAddToHep = () => {
    const saved = localStorage.getItem('physiomatch_hep');
    let hepList = saved ? JSON.parse(saved) : [];
    const exists = hepList.some((e: any) => e.title === selectedGuideVideo.title);
    if (!exists) {
      const newEx = {
        id: `hep-${Date.now()}`,
        title: selectedGuideVideo.title,
        targetZone: selectedGuideVideo.targetDimension,
        frequency: selectedGuideVideo.setsReps,
        holdSeconds: selectedGuideVideo.durationSec,
        purpose: selectedGuideVideo.description,
        clinicalInstruction: selectedGuideVideo.steps.join(' '),
        completedToday: false,
      };
      hepList.push(newEx);
      localStorage.setItem('physiomatch_hep', JSON.stringify(hepList));
    }
    setAddedToHep(true);
    setTimeout(() => setAddedToHep(false), 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Kinematic Biomechanics & Video Rehabilitation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Postural 5D Video Analysis & Guided Rehabilitation Suite
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Supervised by <strong>Dr. Heta Doshi (PT)</strong>, Ph.D. Scholar & M.P.Th. Musculoskeletal. Assess multi-segment spinal kinematics across 5 analytical dimensions ($X$ lateral, $Y$ axial height, $Z$ sagittal sway, $\theta$ torsion, and $t/\Delta F$ velocity). Practice targeted corrective exercise videos with real-time cues.
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-3">
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-center min-w-[120px]">
              <div
                className={`text-3xl font-black font-mono tabular-nums ${
                  alignmentScore >= 80
                    ? 'text-teal-400'
                    : alignmentScore >= 60
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {alignmentScore}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider mt-0.5">
                5D Kinematic Index
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 5D Video Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (lg:col-span-7): Video Display Screen with 5D HUD Overlay */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-4 shadow-xl overflow-hidden relative">
            {/* Top Video Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="font-bold text-white tracking-wide">
                  {feedMode === 'webcam' ? 'LIVE WEBCAM STREAM' : '5D BIOMECHANICAL KINEMATIC SIMULATION'}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                  60 FPS · 5D VECTOR HUD
                </span>
              </div>

              {/* Webcam Switcher & HUD Toggles */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleWebcam}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isWebcamActive
                      ? 'bg-red-900/80 text-red-200 border border-red-700'
                      : 'bg-teal-700 hover:bg-teal-600 text-white'
                  }`}
                  title="Toggle device camera for live personal posture analysis"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isWebcamActive ? 'Stop Camera' : 'Use My Camera'}</span>
                </button>
              </div>
            </div>

            {/* Video Viewport Area */}
            <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 select-none">
              {/* Webcam Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover ${
                  feedMode === 'webcam' ? 'block' : 'hidden'
                }`}
              />

              {/* Simulated Clinical Biomechanics Canvas (SVG 5D Human Kinematics) */}
              {feedMode === 'simulated' && (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-radial from-slate-800 via-slate-900 to-slate-950">
                  <svg
                    viewBox="0 0 400 450"
                    className="w-full h-full max-h-[420px]"
                    style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))' }}
                  >
                    <defs>
                      <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#042f2e" />
                      </linearGradient>
                      <linearGradient id="bodyPlumbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* 5D Coordinate Grid Overlay */}
                    {show5DGrid && (
                      <g opacity="0.15" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="4 4">
                        <line x1="50" y1="50" x2="350" y2="50" />
                        <line x1="50" y1="120" x2="350" y2="120" />
                        <line x1="50" y1="200" x2="350" y2="200" />
                        <line x1="50" y1="280" x2="350" y2="280" />
                        <line x1="50" y1="360" x2="350" y2="360" />
                        <line x1="100" y1="30" x2="100" y2="420" />
                        <line x1="200" y1="30" x2="200" y2="420" />
                        <line x1="300" y1="30" x2="300" y2="420" />
                      </g>
                    )}

                    {/* Clinical Plumb Line (True Gravitational Vertical Reference) */}
                    {showPlumbLine && (
                      <g>
                        <line
                          x1="200"
                          y1="25"
                          x2="200"
                          y2="425"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                          opacity="0.85"
                        />
                        <text x="205" y="40" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                          LINE OF GRAVITY (PLUMB)
                        </text>
                      </g>
                    )}

                    {/* Dynamic Biomechanical Kinematic Calculations */}
                    {(() => {
                      // Head center offsets driven by CVA angle and presets
                      const headDx = (53 - cvaAngle) * 1.6;
                      const headX = 200 + headDx;
                      const headY = 85;

                      // C7 cervical joint
                      const c7X = 200 + headDx * 0.35;
                      const c7Y = 130;

                      // Shoulders (affected by shoulderAsymmetry in 1D X)
                      const leftShoulderY = 145 - shoulderAsymmetry * 2.5;
                      const rightShoulderY = 145 + shoulderAsymmetry * 2.5;
                      const leftShoulderX = 145;
                      const rightShoulderX = 255;

                      // Thoracolumbar curve (affected by kyphosis in 2D Y and Z)
                      const tKyphosisShift = (kyphosisAngle - 35) * 0.9;
                      const midSpineX = 200 + tKyphosisShift;
                      const midSpineY = 210;

                      // Pelvis (affected by pelvicTorsion in 4D theta)
                      const pelvisTilt = pelvicTorsion * 1.8;
                      const lAsisY = 270 - pelvisTilt;
                      const rAsisY = 270 + pelvisTilt;
                      const pelvisCenterX = 200;
                      const pelvisCenterY = 270;

                      // Knee & Ankle Base of Support
                      const lKneeX = 165;
                      const lKneeY = 345;
                      const rKneeX = 235;
                      const rKneeY = 345;
                      const lAnkleX = 165;
                      const lAnkleY = 415;
                      const rAnkleX = 235;
                      const rAnkleY = 415;

                      return (
                        <g>
                          {/* Head & Cranium */}
                          <circle
                            cx={headX}
                            cy={headY}
                            r="28"
                            fill="#1e293b"
                            stroke="#14b8a6"
                            strokeWidth="2.5"
                          />
                          {/* Ear / Tragus landmark */}
                          <circle cx={headX - 6} cy={headY + 2} r="4" fill="#38bdf8" />
                          <text x={headX + 10} y={headY - 10} fill="#2dd4bf" fontSize="9" fontWeight="bold">
                            TRAGUS ({headDx > 4 ? `+${Math.round(headDx * 1.5)}mm ant` : 'Optimal'})
                          </text>

                          {/* Craniovertebral Angle Vector Line */}
                          {showJointVectors && (
                            <line
                              x1={headX - 6}
                              y1={headY + 2}
                              x2={c7X}
                              y2={c7Y}
                              stroke="#f59e0b"
                              strokeWidth="2"
                              strokeDasharray="3 3"
                            />
                          )}

                          {/* Cervical Spine (C1-C7) */}
                          <line
                            x1={headX}
                            y1={headY + 28}
                            x2={c7X}
                            y2={c7Y}
                            stroke="#0d9488"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />

                          {/* Shoulder Girdle Bar */}
                          <line
                            x1={leftShoulderX}
                            y1={leftShoulderY}
                            x2={rightShoulderX}
                            y2={rightShoulderY}
                            stroke={shoulderAsymmetry > 2 ? '#f87171' : '#2dd4bf'}
                            strokeWidth="4"
                            strokeLinecap="round"
                          />

                          {/* Thoracic & Lumbar Spine Curved Path */}
                          <path
                            d={`M ${c7X} ${c7Y} Q ${midSpineX} ${midSpineY} ${pelvisCenterX} ${pelvisCenterY}`}
                            fill="none"
                            stroke="url(#spineGrad)"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />

                          {/* Pelvic Belt Bar */}
                          <line
                            x1="140"
                            y1={lAsisY}
                            x2="260"
                            y2={rAsisY}
                            stroke={pelvicTorsion > 3 ? '#fbbf24' : '#2dd4bf'}
                            strokeWidth="5"
                            strokeLinecap="round"
                          />

                          {/* Bilateral Lower Extremity Kinetic Chain */}
                          {/* Left Leg */}
                          <line x1="150" y1={lAsisY + 5} x2={lKneeX} y2={lKneeY} stroke="#334155" strokeWidth="4" />
                          <line x1={lKneeX} y1={lKneeY} x2={lAnkleX} y2={lAnkleY} stroke="#334155" strokeWidth="4" />
                          {/* Right Leg */}
                          <line x1="250" y1={rAsisY + 5} x2={rKneeX} y2={rKneeY} stroke="#334155" strokeWidth="4" />
                          <line x1={rKneeX} y1={rKneeY} x2={rAnkleX} y2={rAnkleY} stroke="#334155" strokeWidth="4" />

                          {/* Interactive Anatomical Landmarks & Vector Callouts */}
                          {/* C7 Vertebral Prominens */}
                          <circle cx={c7X} cy={c7Y} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                          <text x={c7X + 12} y={c7Y + 4} fill="#f8fafc" fontSize="9" fontWeight="bold">
                            C7 (Kyphosis Apex: {kyphosisAngle}°)
                          </text>

                          {/* Left Acromion Shoulder */}
                          <circle cx={leftShoulderX} cy={leftShoulderY} r="5" fill="#2dd4bf" stroke="#ffffff" strokeWidth="1.5" />
                          {/* Right Acromion Shoulder */}
                          <circle cx={rightShoulderX} cy={rightShoulderY} r="5" fill="#2dd4bf" stroke="#ffffff" strokeWidth="1.5" />
                          {shoulderAsymmetry > 1.5 && (
                            <text x={leftShoulderX - 55} y={leftShoulderY - 8} fill="#f87171" fontSize="8" fontWeight="bold">
                              Δ {shoulderAsymmetry.toFixed(1)}° Elev
                            </text>
                          )}

                          {/* Pelvis ASIS Landmarks */}
                          <circle cx="140" cy={lAsisY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          <circle cx="260" cy={rAsisY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          <text x="200" y={pelvisCenterY + 18} fill="#94a3b8" fontSize="8" textAnchor="middle">
                            PELVIC TORSION: {pelvicTorsion}°
                          </text>

                          {/* Dynamic Micro-Sway Vector Indicator in 5D */}
                          <g>
                            <circle
                              cx={200 + Math.sin(Date.now() / 600) * (swayVelocity * 1.5)}
                              cy="435"
                              r="6"
                              fill="#14b8a6"
                              opacity="0.9"
                            />
                            <ellipse
                              cx="200"
                              cy="435"
                              rx={swayVelocity * 4}
                              ry="4"
                              fill="none"
                              stroke="#0d9488"
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                            />
                            <text x="200" y="447" fill="#64748b" fontSize="8" textAnchor="middle">
                              COG Drift Velocity: {swayVelocity} mm/s
                            </text>
                          </g>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              )}

              {/* HUD Live Telemetry Overlay in 4-Color Clinical Scheme */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 pointer-events-none">
                <div className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">
                  5D KINEMATICS DATA
                </div>
                <div>1D (X) Shoulder Tilt: <span className="text-white font-bold">{shoulderAsymmetry.toFixed(1)}°</span></div>
                <div>2D (Y) Kyphosis Cobb: <span className="text-white font-bold">{kyphosisAngle}°</span></div>
                <div>3D (Z) Craniovert CVA: <span className="text-white font-bold">{cvaAngle}°</span></div>
                <div>4D (θ) Pelvic Torsion: <span className="text-white font-bold">{pelvicTorsion.toFixed(1)}°</span></div>
                <div>5D (t) Sway Velocity: <span className="text-white font-bold">{swayVelocity.toFixed(1)} mm/s</span></div>
              </div>

              {/* Plumb / HUD Toggle Pill at Bottom */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 text-[10px]">
                <button
                  type="button"
                  onClick={() => setShowPlumbLine(!showPlumbLine)}
                  className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                    showPlumbLine ? 'bg-teal-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plumb Line
                </button>
                <button
                  type="button"
                  onClick={() => setShowJointVectors(!showJointVectors)}
                  className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                    showJointVectors ? 'bg-teal-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vectors
                </button>
                <button
                  type="button"
                  onClick={() => setShow5DGrid(!show5DGrid)}
                  className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                    show5DGrid ? 'bg-teal-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  5D Grid
                </button>
              </div>
            </div>

            {/* Error Message if Webcam Denied */}
            {webcamError && (
              <div className="mt-3 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{webcamError}</span>
              </div>
            )}
          </div>

          {/* 5 Clinical Posture Preset Buttons */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Simulate Clinical Postural Syndromes:</span>
              <span className="text-[11px] text-slate-500 font-normal">Select to view kinematic deviation</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'ideal', label: 'Balanced Spine', sub: 'Optimal 5D' },
                { id: 'forward_head', label: 'Tech Neck', sub: 'CVA < 45°' },
                { id: 'upper_crossed', label: 'Upper Crossed', sub: 'Protracted' },
                { id: 'thoracic_kyphosis', label: 'Hyperkyphosis', sub: 'Humpback' },
                { id: 'swayback', label: 'Swayback', sub: 'Posterior Pelvis' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id as PosturePreset)}
                  className={`p-2 rounded-xl text-left transition-all border text-xs ${
                    activePreset === p.id
                      ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="truncate">{p.label}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5): 5D Parameter Adjusters & Clinical Findings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-Time 5D Parameter Sliders */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Interactive 5D Kinematic Sliders
                </h3>
              </div>
              <button
                type="button"
                onClick={() => applyPreset('ideal')}
                className="text-[11px] text-teal-800 hover:underline font-semibold"
              >
                Reset to Ideal
              </button>
            </div>

            {/* Slider 1: 1D Coronal Plane X (Shoulder Level) */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-800">1D (X-Axis): Shoulder Tilt Asymmetry</span>
                <span className="font-mono text-teal-800 font-bold">{shoulderAsymmetry.toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={shoulderAsymmetry}
                onChange={(e) => {
                  setActivePreset('forward_head');
                  setShoulderAsymmetry(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.0° Level (Ideal)</span>
                <span>8.0° Marked Asymmetry</span>
              </div>
            </div>

            {/* Slider 2: 2D Axial Plane Y (Thoracic Kyphosis) */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-800">2D (Y-Axis): Thoracic Kyphosis Angle</span>
                <span className="font-mono text-teal-800 font-bold">{kyphosisAngle}°</span>
              </div>
              <input
                type="range"
                min="20"
                max="65"
                step="1"
                value={kyphosisAngle}
                onChange={(e) => {
                  setActivePreset('forward_head');
                  setKyphosisAngle(parseInt(e.target.value, 10));
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>25°-35° Normal Curve</span>
                <span>&gt;45° Hyperkyphosis</span>
              </div>
            </div>

            {/* Slider 3: 3D Sagittal Plane Z (Craniovertebral Angle) */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-800">3D (Z-Axis): Craniovertebral Angle (CVA)</span>
                <span className="font-mono text-teal-800 font-bold">{cvaAngle}°</span>
              </div>
              <input
                type="range"
                min="25"
                max="60"
                step="1"
                value={cvaAngle}
                onChange={(e) => {
                  setActivePreset('forward_head');
                  setCvaAngle(parseInt(e.target.value, 10));
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>&lt;40° Severe Tech Neck</span>
                <span>50°-55° Ideal Alignment</span>
              </div>
            </div>

            {/* Slider 4: 4D Transverse Theta (Pelvic Torsion) */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-800">4D (θ-Axis): Pelvic Transverse Torsion</span>
                <span className="font-mono text-teal-800 font-bold">{pelvicTorsion.toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={pelvicTorsion}
                onChange={(e) => {
                  setActivePreset('forward_head');
                  setPelvicTorsion(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.0° Neutral Pelvis</span>
                <span>10.0° Severe Pelvic Obliquity</span>
              </div>
            </div>

            {/* Slider 5: 5D Time-Velocity Sway (t/ΔF) */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-800">5D (t/ΔF): Dynamic Center of Gravity Sway</span>
                <span className="font-mono text-teal-800 font-bold">{swayVelocity.toFixed(1)} mm/s</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.1"
                value={swayVelocity}
                onChange={(e) => {
                  setActivePreset('forward_head');
                  setSwayVelocity(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>2.0 mm/s High Stability</span>
                <span>12.0 mm/s Postural Instability</span>
              </div>
            </div>
          </div>

          {/* Dr. Heta Doshi's Clinical Assessment Card */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Clinical Biomechanical Findings (Dr. Heta Doshi, PT)
              </h4>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {cvaAngle < 45
                ? `Craniovertebral angle of ${cvaAngle}° creates a forward gravitational arm: every 1 inch of anterior translation adds approximately 10 lbs of effective compressive force to the cervical spine.`
                : `CVA of ${cvaAngle}° indicates balanced sagittal cranial alignment with minimal facet shearing.`}
              {shoulderAsymmetry > 2 &&
                ` Coronal shoulder tilt (${shoulderAsymmetry.toFixed(1)}°) indicates unilateral upper trapezius dominance and levator scapulae spasm.`}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-teal-100 text-xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Effective Cervical Load</div>
                <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
                  {Math.round(12 + Math.max(0, 50 - cvaAngle) * 0.9)} lbs
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-teal-100 text-xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Primary Recommended HEP</div>
                <div className="text-xs font-bold text-teal-800 mt-0.5 truncate">
                  {cvaAngle < 45 ? 'Chin Tucks & Retraction' : 'Thoracic Foam Mobilization'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Guided Video Rehabilitation Suite */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-1">
              <Video className="w-3.5 h-3.5 text-teal-700" />
              <span>Evidence Clinical Guide Videos</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Prescribed Postural Correction Guide Videos
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow Dr. Heta Doshi's step-by-step kinetic tutorials with built-in repetition counter and timer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs flex items-center gap-1.5"
              title="Toggle audio coaching chime"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-teal-700" />}
              <span className="hidden sm:inline">{isAudioMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>
        </div>

        {/* Video Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GUIDE_VIDEOS.map((video) => {
            const isSelected = selectedGuideVideo.id === video.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => {
                  setSelectedGuideVideo(video);
                  setRepCount(0);
                  setHoldTimer(5);
                  setIsHolding(false);
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500/50'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-800'
                  }`}>
                    {video.dimensionCode}
                  </span>
                  <span className={isSelected ? 'text-slate-400' : 'text-slate-400'}>
                    {video.setsReps.split('(')[0]}
                  </span>
                </div>
                <div className="font-bold text-xs leading-snug line-clamp-2">
                  {video.title}
                </div>
                <div className={`text-[11px] mt-2 line-clamp-1 ${
                  isSelected ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {video.focusMuscles}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Guide Video Interactive Player Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Video Player Display Screen */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
              {/* Graphic Biomechanical Motion Visualizer */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-radial from-slate-800 via-slate-900 to-slate-950">
                {selectedGuideVideo.videoGraphicType === 'chin-tuck' && (
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[160px]">
                    <circle cx="100" cy="50" r="24" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2.5" />
                    <line x1="100" y1="74" x2="100" y2="120" stroke="#0d9488" strokeWidth="4" />
                    {/* Retraction Glide Arrow */}
                    <path
                      d="M 125 50 L 95 50 M 105 44 L 95 50 L 105 56"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <text x="100" y="140" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Horizontal Retraction Vector (Keep Eyes Level)
                    </text>
                  </svg>
                )}

                {selectedGuideVideo.videoGraphicType === 'thoracic-ext' && (
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[160px]">
                    <circle cx="70" cy="90" r="14" fill="#0d9488" opacity="0.6" />
                    <path d="M 40 85 Q 70 65 110 70 Q 150 75 170 100" fill="none" stroke="#2dd4bf" strokeWidth="4" />
                    <circle cx="170" cy="100" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="100" y="140" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Thoracic Mobilization on Foam Roller Pivot
                    </text>
                  </svg>
                )}

                {selectedGuideVideo.videoGraphicType === 'scapular-retract' && (
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[160px]">
                    <line x1="50" y1="50" x2="150" y2="50" stroke="#0d9488" strokeWidth="4" />
                    <path d="M 60 55 L 75 75 M 140 55 L 125 75" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="100" cy="40" r="18" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2" />
                    <text x="100" y="140" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Scapular Retraction & Lower Trapezius Depression
                    </text>
                  </svg>
                )}

                {selectedGuideVideo.videoGraphicType === 'pelvic-bridge' && (
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[160px]">
                    <line x1="30" y1="110" x2="80" y2="110" stroke="#475569" strokeWidth="3" />
                    <line x1="80" y1="110" x2="120" y2="70" stroke="#0d9488" strokeWidth="5" />
                    <line x1="120" y1="70" x2="170" y2="110" stroke="#2dd4bf" strokeWidth="5" />
                    <circle cx="35" cy="105" r="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="100" y="140" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Posterior Pelvic Tilt & Gluteal Drive
                    </text>
                  </svg>
                )}
              </div>

              {/* Scrim Overlay Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-3 py-1 rounded-md border border-slate-700">
                {selectedGuideVideo.dimensionCode} · HD CLINICAL PROTOCOL
              </div>
            </div>

            {/* Interactive Player Controls & Hold Timer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsHolding(!isHolding)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                    isHolding
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                  }`}
                >
                  {isHolding ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isHolding ? 'Pause Hold Timer' : 'Start 5s Hold Timer'}</span>
                </button>

                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center min-w-[70px]">
                  <div className="text-sm font-black font-mono text-teal-400 tabular-nums">
                    {holdTimer}s
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">
                    Hold Time
                  </div>
                </div>
              </div>

              {/* Interactive Repetition Counter */}
              <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 font-semibold">Completed Reps:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRepCount((r) => Math.max(0, r - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="text-base font-black font-mono text-white min-w-[24px] text-center">
                    {repCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setRepCount((r) => r + 1);
                      playTone(523.25, 0.1); // C5
                    }}
                    className="w-6 h-6 rounded-lg bg-teal-700 text-white hover:bg-teal-600 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Instructions & Clinical Notes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                {selectedGuideVideo.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedGuideVideo.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                  Step-by-Step Clinical Technique:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
                  {selectedGuideVideo.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200/80 space-y-1">
                <div className="text-[11px] font-bold text-teal-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Clinical Coaching Cues:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                  {selectedGuideVideo.clinicalCues.map((cue, i) => (
                    <li key={i}>{cue}</li>
                  ))}
                </ul>
              </div>

              {/* Action: Add to My Health Journey HEP */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddToHep}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    addedToHep
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  <Dumbbell className="w-4 h-4 text-teal-400" />
                  <span>{addedToHep ? 'Added to My Health Journey!' : 'Add to My Health Journey (HEP)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
