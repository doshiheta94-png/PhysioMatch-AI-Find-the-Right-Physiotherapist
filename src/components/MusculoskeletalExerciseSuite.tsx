import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Languages,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Activity,
  Calendar,
  AlertCircle,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import {
  EXERCISE_LIBRARY,
  MusculoskeletalExercise,
  ExerciseCategory,
} from '../data/exerciseLibrary';

interface MusculoskeletalExerciseSuiteProps {
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onBookExerciseConsultation?: (exerciseName: string) => void;
  onOpenVideoVault?: () => void;
}

export const MusculoskeletalExerciseSuite: React.FC<MusculoskeletalExerciseSuiteProps> = ({
  currentLanguage,
  onLanguageChange,
  onBookExerciseConsultation,
  onOpenVideoVault,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(EXERCISE_LIBRARY[0].id);

  // Playback & Rep Counter State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentReps, setCurrentReps] = useState<number>(0);
  const [holdTimer, setHoldTimer] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 1.5x
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Animation cycle progress (0-100)
  const [animationTick, setAnimationTick] = useState<number>(0);

  // Voice Guidance (Speech Synthesis) State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Voice Input (Speech Recognition) State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');
  const speechRecognitionRef = useRef<any>(null);

  const t = TRANSLATIONS[currentLanguage];

  // Active Exercise
  const activeExercise =
    EXERCISE_LIBRARY.find((e) => e.id === selectedExerciseId) || EXERCISE_LIBRARY[0];

  // Filtered Exercises
  const filteredExercises =
    selectedCategory === 'all'
      ? EXERCISE_LIBRARY
      : EXERCISE_LIBRARY.filter((e) => e.category === selectedCategory);

  // Web Audio Tone Synth
  const playChimeTone = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
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
    } catch {
      // Audio context restricted before interaction
    }
  };

  // Video Animation Kinematics Loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimationTick((prev) => (prev + 2 * playbackSpeed) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Exercise Paced Rep & Hold Timer
  useEffect(() => {
    if (!isPlaying) return;
    const holdLimit = activeExercise.holdSeconds;

    const timer = setInterval(() => {
      setHoldTimer((prev) => {
        if (prev >= holdLimit) {
          setCurrentReps((r) => {
            const nextR = r + 1;
            playChimeTone(920, 'sine', 0.2);
            return nextR;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, activeExercise.holdSeconds, soundEnabled]);

  // Reset counters when switching exercise
  useEffect(() => {
    setCurrentReps(0);
    setHoldTimer(0);
    setAnimationTick(0);
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  }, [selectedExerciseId]);

  // --- 1. VOICE GUIDANCE (TEXT-TO-SPEECH) ---
  const handleSpeakGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const scriptText = activeExercise.voiceGuideScript[currentLanguage];
    const utterance = new SpeechSynthesisUtterance(scriptText);

    // Set voice language code
    if (currentLanguage === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (currentLanguage === 'gu') {
      utterance.lang = 'gu-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    playChimeTone(650, 'sine', 0.1);
  };

  // --- 2. VOICE INPUT (SPEECH RECOGNITION) ---
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Match recognition language to current app language
    recognition.lang =
      currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'gu' ? 'gu-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceFeedback(t.listening);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        const query = finalTranscript.toLowerCase().trim();
        setVoiceTranscript(query);
        processVoiceCommand(query);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    speechRecognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [currentLanguage]);

  const toggleVoiceInput = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or click buttons directly.');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
      setVoiceFeedback('');
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
        playChimeTone(750, 'sine', 0.12);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Process natural voice commands in English, Hindi, and Gujarati
  const processVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();

    // 1. Start Commands
    if (
      cmd.includes('start') ||
      cmd.includes('play') ||
      cmd.includes('begin') ||
      cmd.includes('शुरू') ||
      cmd.includes('चालू') ||
      cmd.includes('શરૂ') ||
      cmd.includes('પ્રારંભ')
    ) {
      setIsPlaying(true);
      setVoiceFeedback('▶ Started Exercise');
      playChimeTone(880, 'sine', 0.15);
      return;
    }

    // 2. Pause Commands
    if (
      cmd.includes('pause') ||
      cmd.includes('stop') ||
      cmd.includes('wait') ||
      cmd.includes('रोको') ||
      cmd.includes('बंद') ||
      cmd.includes('અટકાવો') ||
      cmd.includes('થોભો')
    ) {
      setIsPlaying(false);
      setVoiceFeedback('⏸ Paused Exercise');
      playChimeTone(440, 'sine', 0.15);
      return;
    }

    // 3. Reset Commands
    if (
      cmd.includes('reset') ||
      cmd.includes('clear') ||
      cmd.includes('रीसेट') ||
      cmd.includes('दोबारा') ||
      cmd.includes('રીસેટ') ||
      cmd.includes('ફરીથી')
    ) {
      setCurrentReps(0);
      setHoldTimer(0);
      setVoiceFeedback('↺ Reps Reset');
      playChimeTone(520, 'sine', 0.15);
      return;
    }

    // 4. Next Exercise
    if (
      cmd.includes('next') ||
      cmd.includes('forward') ||
      cmd.includes('अगला') ||
      cmd.includes('आगे') ||
      cmd.includes('આગળ') ||
      cmd.includes('બીજું')
    ) {
      const idx = filteredExercises.findIndex((e) => e.id === selectedExerciseId);
      const nextIdx = (idx + 1) % filteredExercises.length;
      setSelectedExerciseId(filteredExercises[nextIdx].id);
      setVoiceFeedback(`→ Next: ${filteredExercises[nextIdx].title[currentLanguage]}`);
      playChimeTone(700, 'sine', 0.12);
      return;
    }

    // 5. Previous Exercise
    if (
      cmd.includes('previous') ||
      cmd.includes('back') ||
      cmd.includes('पिछला') ||
      cmd.includes('पीछे') ||
      cmd.includes('પાછળ') ||
      cmd.includes('પહેલું')
    ) {
      const idx = filteredExercises.findIndex((e) => e.id === selectedExerciseId);
      const prevIdx = (idx - 1 + filteredExercises.length) % filteredExercises.length;
      setSelectedExerciseId(filteredExercises[prevIdx].id);
      setVoiceFeedback(`← Previous: ${filteredExercises[prevIdx].title[currentLanguage]}`);
      playChimeTone(600, 'sine', 0.12);
      return;
    }

    // 6. Language Switch via Voice
    if (cmd.includes('gujarati') || cmd.includes('ગુજરાતી')) {
      onLanguageChange('gu');
      setVoiceFeedback('🌐 ભાષા બદલાઈ: ગુજરાતી');
      playChimeTone(800, 'sine', 0.15);
      return;
    }
    if (cmd.includes('hindi') || cmd.includes('हिंदी') || cmd.includes('हिन्दी')) {
      onLanguageChange('hi');
      setVoiceFeedback('🌐 भाषा बदली: हिन्दी');
      playChimeTone(800, 'sine', 0.15);
      return;
    }
    if (cmd.includes('english') || cmd.includes('अंग्रेजी') || cmd.includes('અંગ્રેજી')) {
      onLanguageChange('en');
      setVoiceFeedback('🌐 Language Changed: English');
      playChimeTone(800, 'sine', 0.15);
      return;
    }

    // 7. Voice Guide trigger
    if (cmd.includes('speak') || cmd.includes('explain') || cmd.includes('बोल') || cmd.includes('બોલો')) {
      handleSpeakGuidance();
      setVoiceFeedback('🔊 Voice Guide Active');
      return;
    }

    setVoiceFeedback(`Heard: "${command}"`);
  };

  // SVG Animated Motion Video Engine
  const renderAnimatedExerciseGraphic = () => {
    // Normal progress sine wave between 0 and 1
    const progress = Math.sin((animationTick / 100) * Math.PI * 2) * 0.5 + 0.5;
    const animType = activeExercise.animationType;

    return (
      <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        {/* Grid pattern backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30"></div>

        {/* Dynamic Vector Anatomical Simulation Canvas */}
        <svg
          className="w-full max-w-md h-full select-none"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Surface */}
          <line x1="20" y1="260" x2="380" y2="260" stroke="#334155" strokeWidth="3" />

          {/* 1. McKenzie Prone Lumbar Extension */}
          {animType === 'spine_extension' && (
            <g transform="translate(60, 140)">
              {/* Floor Mat */}
              <rect x="0" y="115" width="280" height="8" rx="4" fill="#0d9488" />
              {/* Legs / Pelvis grounded */}
              <path d="M20 115 L120 115" stroke="#f1f5f9" strokeWidth="14" strokeLinecap="round" />
              {/* Torso Pressing upward with extension curve */}
              <path
                d={`M120 115 Q ${160 - progress * 15} ${110 - progress * 40} ${190} ${115 - progress * 65}`}
                stroke="#2dd4bf"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              {/* Head */}
              <circle
                cx={195 + progress * 5}
                cy={95 - progress * 65}
                r="16"
                fill="#f1f5f9"
                stroke="#0d9488"
                strokeWidth="3"
              />
              {/* Arms pushing into mat */}
              <path
                d={`M175 ${120 - progress * 55} L185 115 L205 115`}
                stroke="#94a3b8"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Decompression Vector Arrow */}
              <path
                d={`M135 75 L135 ${55 - progress * 10}`}
                stroke="#facc15"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
              <text x="145" y="65" fill="#facc15" fontSize="11" fontWeight="bold">
                Disc Unloading
              </text>
            </g>
          )}

          {/* 2. Craniocervical Flexion / Chin Tuck */}
          {animType === 'neck_retraction' && (
            <g transform="translate(130, 60)">
              {/* Upright Torso */}
              <path d="M70 190 L70 90" stroke="#f1f5f9" strokeWidth="18" strokeLinecap="round" />
              {/* Cervical Column Retracting horizontally backward */}
              <path
                d={`M70 90 Q ${65 - progress * 20} 60 ${65 - progress * 25} 30`}
                stroke="#2dd4bf"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              {/* Head sliding backward horizontally */}
              <circle
                cx={65 - progress * 25}
                cy="20"
                r="24"
                fill="#f1f5f9"
                stroke="#0d9488"
                strokeWidth="3"
              />
              {/* Chin Point */}
              <circle cx={45 - progress * 25} cy="30" r="5" fill="#0d9488" />
              {/* Retraction Vector Line */}
              <line
                x1="85"
                y1="30"
                x2={130}
                y2="30"
                stroke="#facc15"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <text x="85" y="20" fill="#facc15" fontSize="11" fontWeight="bold">
                Horizontal Retraction: {(progress * 25).toFixed(0)}mm
              </text>
            </g>
          )}

          {/* 3. Rotator Cuff External Rotation with Towel */}
          {animType === 'shoulder_rotation' && (
            <g transform="translate(140, 70)">
              {/* Torso */}
              <rect x="30" y="40" width="60" height="150" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <circle cx="60" cy="18" r="18" fill="#f1f5f9" />
              {/* Towel roll at side */}
              <rect x="90" y="80" width="16" height="30" rx="6" fill="#facc15" />
              {/* Upper Arm pinned */}
              <line x1="90" y1="55" x2="98" y2="105" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
              {/* Forearm rotating outward */}
              <line
                x1="98"
                y1="105"
                x2={98 + 45 + progress * 35}
                y2={105 - progress * 15}
                stroke="#2dd4bf"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Hand */}
              <circle cx={98 + 45 + progress * 35} cy={105 - progress * 15} r="8" fill="#f1f5f9" />
              {/* Rotation Arc */}
              <path
                d="M 140 110 A 40 40 0 0 0 175 90"
                stroke="#0d9488"
                strokeWidth="3"
                strokeDasharray="3 3"
                fill="none"
              />
              <text x="110" y="145" fill="#2dd4bf" fontSize="11" fontWeight="bold">
                ER Arc: {(30 + progress * 40).toFixed(0)}°
              </text>
            </g>
          )}

          {/* 4. Banded Spanish Squat */}
          {animType === 'knee_squat' && (
            <g transform="translate(100, 60)">
              {/* Heavy Band anchored to left post */}
              <line x1="0" y1="120" x2={100 + progress * 5} y2="120" stroke="#facc15" strokeWidth="8" />
              {/* Thigh hinging backward */}
              <line
                x1={100 + progress * 5}
                y1="120"
                x2={100 - progress * 20}
                y2={65 + progress * 35}
                stroke="#2dd4bf"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Torso upright */}
              <line
                x1={100 - progress * 20}
                y1={65 + progress * 35}
                x2={95 - progress * 25}
                y2={progress * 30}
                stroke="#f1f5f9"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Head */}
              <circle cx={95 - progress * 25} cy={progress * 30 - 20} r="16" fill="#f1f5f9" />
              {/* Vertical Shin */}
              <line
                x1={100 + progress * 5}
                y1="120"
                x2={105}
                y2="195"
                stroke="#f1f5f9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Foot flat */}
              <path d="M95 195 L125 195" stroke="#0d9488" strokeWidth="8" strokeLinecap="round" />
              <text x="135" y="90" fill="#2dd4bf" fontSize="11" fontWeight="bold">
                Knee Flexion: {(progress * 60).toFixed(0)}°
              </text>
              <text x="5" y="110" fill="#facc15" fontSize="10" fontWeight="bold">
                Band Tension (VMO)
              </text>
            </g>
          )}

          {/* 5. Hip Clamshell */}
          {animType === 'hip_clamshell' && (
            <g transform="translate(120, 90)">
              {/* Lower Body Mat */}
              <line x1="-30" y1="140" x2="190" y2="140" stroke="#0d9488" strokeWidth="6" />
              {/* Torso side-lying */}
              <line x1="10" y1="130" x2="80" y2="130" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
              {/* Bottom leg resting */}
              <line x1="80" y1="130" x2="130" y2="135" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
              {/* Top knee opening like a clamshell */}
              <line
                x1="80"
                y1="130"
                x2="110"
                y2={130 - progress * 45}
                stroke="#2dd4bf"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="110"
                y1={130 - progress * 45}
                x2="145"
                y2="135"
                stroke="#2dd4bf"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Heels joined together */}
              <circle cx="145" cy="135" r="7" fill="#facc15" />
              <text x="75" y="65" fill="#facc15" fontSize="11" fontWeight="bold">
                Glute Medius Activation: {(progress * 45).toFixed(0)}°
              </text>
            </g>
          )}

          {/* 6. Rathleff Plantar Fascia Heel Raise */}
          {animType === 'heel_raise' && (
            <g transform="translate(130, 70)">
              {/* Step Edge */}
              <rect x="70" y="145" width="130" height="40" fill="#334155" />
              {/* Rolled Towel under Toes */}
              <circle cx="130" cy="140" r="7" fill="#facc15" />
              {/* Foot rising and descending past step */}
              <path
                d={`M 75 ${145 - progress * 45} L 130 140 L 155 140`}
                stroke="#2dd4bf"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Calcaneus Heel */}
              <circle cx="75" cy={145 - progress * 45} r="10" fill="#f1f5f9" />
              {/* Calf Muscle ascending */}
              <line
                x1="75"
                y1={145 - progress * 45}
                x2="80"
                y2={40 - progress * 45}
                stroke="#f1f5f9"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Tension Vector */}
              <line
                x1="55"
                y1={145 - progress * 45}
                x2="55"
                y2={30 - progress * 45}
                stroke="#facc15"
                strokeWidth="2.5"
                markerEnd="url(#arrowhead)"
              />
              <text x="10" y={100 - progress * 45} fill="#facc15" fontSize="11" fontWeight="bold">
                Tendon Load
              </text>
            </g>
          )}

          {/* 7. Single Leg Romanian Deadlift (Sports Hinge) */}
          {animType === 'athletic_deadlift' && (
            <g transform="translate(120, 60)">
              {/* Standing Leg */}
              <line x1="80" y1="195" x2="80" y2="120" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
              {/* Foot */}
              <path d="M70 195 L95 195" stroke="#0d9488" strokeWidth="8" strokeLinecap="round" />
              {/* Torso hinging forward */}
              <line
                x1="80"
                y1="120"
                x2={80 + 15 + progress * 50}
                y2={120 - 60 + progress * 55}
                stroke="#2dd4bf"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Head */}
              <circle
                cx={80 + 25 + progress * 55}
                cy={120 - 80 + progress * 60}
                r="16"
                fill="#f1f5f9"
              />
              {/* Back Leg extending as counter-pendulum */}
              <line
                x1="80"
                y1="120"
                x2={80 - 20 - progress * 60}
                y2={120 + 30 - progress * 35}
                stroke="#94a3b8"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <text x="110" y="30" fill="#facc15" fontSize="11" fontWeight="bold">
                Hamstring Hinge: {(progress * 70).toFixed(0)}°
              </text>
            </g>
          )}

          {/* 8. Tyler Twist (Tennis Elbow Eccentric Loading) */}
          {animType === 'elbow_twist' && (
            <g transform="translate(130, 70)">
              {/* Torso */}
              <line x1="30" y1="80" x2="30" y2="180" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
              <circle cx="30" cy="55" r="16" fill="#f1f5f9" />
              {/* Forearm extended holding FlexBar */}
              <line x1="30" y1="95" x2="110" y2="95" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
              {/* Affected Wrist extending and releasing into flexion */}
              <line
                x1="110"
                y1="95"
                x2="140"
                y2={95 - 20 + progress * 35}
                stroke="#2dd4bf"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* FlexBar resistance rod twisting */}
              <rect
                x="135"
                y={65 + progress * 20}
                width="16"
                height="70"
                rx="6"
                fill="#facc15"
                stroke="#ca8a04"
                strokeWidth="2"
                transform={`rotate(${progress * 25 - 12} 143 ${100 + progress * 10})`}
              />
              {/* Radial Head / Common Extensor Tendon Highlight */}
              <circle cx="108" cy="95" r="6" fill="#0d9488" className="animate-ping" />
              <circle cx="108" cy="95" r="5" fill="#0d9488" />
              <text x="50" y="35" fill="#facc15" fontSize="11" fontWeight="bold">
                Wrist Eccentric Load: {(progress * 45).toFixed(0)}°
              </text>
            </g>
          )}

          {/* 9. Cat-Cow Segmental Thoracic Mobilization */}
          {animType === 'thoracic_catcow' && (
            <g transform="translate(120, 80)">
              {/* Mat */}
              <line x1="0" y1="160" x2="200" y2="160" stroke="#0d9488" strokeWidth="6" />
              {/* Arms (supporting quadruped) */}
              <line x1="40" y1="110" x2="40" y2="160" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
              {/* Thighs / Legs (supporting quadruped) */}
              <line x1="160" y1="115" x2="160" y2="160" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
              {/* Dynamic Spine wave: arching high (Cat) -> sinking into thoracic extension (Cow) */}
              <path
                d={`M 40 110 Q 100 ${75 + progress * 70} 160 115`}
                stroke="#2dd4bf"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />
              {/* Head moving dynamically with spine */}
              <circle
                cx={25}
                cy={105 - 20 + progress * 35}
                r="16"
                fill="#f1f5f9"
                stroke="#0d9488"
                strokeWidth="2"
              />
              {/* Mid-thoracic mobility indicator */}
              <circle
                cx="100"
                cy={75 + progress * 70}
                r="6"
                fill="#facc15"
              />
              <text x="60" y="30" fill="#facc15" fontSize="11" fontWeight="bold">
                Thoracic Motion: {progress > 0.5 ? 'Cow Extension' : 'Cat Flexion'}
              </text>
            </g>
          )}
        </svg>

        {/* HUD Overlay Badge: Concentric vs Eccentric Phase */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isPlaying ? 'bg-teal-400 animate-pulse' : 'bg-slate-500'
            }`}
          ></span>
          <span className="text-xs font-mono font-bold text-white">
            {progress > 0.65 ? 'Isometric Peak Hold' : progress > 0.3 ? 'Concentric Drive' : 'Eccentric Return'}
          </span>
        </div>

        {/* Speed & Sampling Badge */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-right font-mono text-xs">
          <div className="text-teal-400 font-bold">{playbackSpeed}x Speed</div>
          <div className="text-[10px] text-slate-400">Dr. Heta Doshi 60fps Kinematics</div>
        </div>

        {/* Center Repetition Counter HUD */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-teal-950/70 border border-teal-500/40 flex flex-col items-center justify-center text-teal-300 font-mono">
            <span className="text-[9px] uppercase font-bold text-teal-400">Rep</span>
            <span className="text-xl font-extrabold leading-none">{currentReps}</span>
          </div>

          <div className="text-left font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Hold Timer</div>
            <div className="text-sm font-bold text-white">
              {holdTimer}s / {activeExercise.holdSeconds}s
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentReps(0);
              setHoldTimer(0);
              playChimeTone(450, 'sine', 0.1);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={t.resetReps}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Trilingual Switcher & Voice Command HUD */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                Vadodara Clinical Practice · Dr. Heta Doshi (PT)
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>M.P.Th. Musculoskeletal & Sports Biomechanics</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.allMusculoskeletalExercises}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {activeExercise.categoryLabel[currentLanguage]} ·{' '}
              {currentLanguage === 'gu'
                ? 'સરળ એનિમેટેડ વિડિઓ, વૉઇસ ગાઇડન્સ અને હેન્ડ્સ-ફ્રી વૉઇસ કમાન્ડ સાથે તમામ સ્નાયુ અને સાંધાની કસરતો.'
                : currentLanguage === 'hi'
                ? 'सरल एनिमेटेड वीडियो, ऑडियो वॉयस गाइडेंस और हैंड्स-फ्री वॉयस कमांड के साथ सभी मस्कुलोस्केलेटल और स्पोर्ट्स व्यायाम।'
                : 'Easy animated motion video, audio voice guidance, and hands-free voice input recognition across all musculoskeletal and sports exercises.'}
            </p>
          </div>

          {/* Trilingual Selector & Voice Input Action Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* 3-Language Selector Buttons */}
            <div className="bg-slate-800/90 p-1 rounded-2xl border border-slate-700 flex items-center gap-1">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentLanguage === 'en'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>English</span>
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentLanguage === 'hi'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>हिन्दी</span>
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('gu')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentLanguage === 'gu'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>ગુજરાતી</span>
              </button>
            </div>

            {/* Voice Input Microphone Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-900/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title={t.voiceInput}
            >
              {isListening ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4 text-teal-400" />}
              <span>{isListening ? t.listening : t.voiceInput}</span>
            </button>
          </div>
        </div>

        {/* Live Voice Input Feedback Banner */}
        {isListening && (
          <div className="mt-4 p-3 bg-slate-950/90 rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="font-mono text-teal-300 font-bold">{t.voiceActiveBadge}:</span>
              <span className="text-slate-300 italic">
                {voiceTranscript ? `"${voiceTranscript}"` : t.voiceCommandHint}
              </span>
            </div>
            {voiceFeedback && (
              <span className="text-teal-400 font-mono font-bold bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-800">
                {voiceFeedback}
              </span>
            )}
          </div>
        )}

        {/* Separate Option Banner: All-Condition Video Library (₹200 GPay on 9737555022) */}
        {onOpenVideoVault && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-teal-950/90 to-slate-900 border border-teal-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Full HD Video Masterclasses & Voice Library</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 text-[10px] font-extrabold uppercase">
                    ₹200 GPay
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Unlock complete high-definition video demonstrations for all 8 body conditions via Google Pay on <strong className="text-teal-300 font-mono">9737555022</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenVideoVault}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0 self-stretch md:self-auto justify-center"
            >
              <span>Open Video Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Category Filters Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'spine', label: t.filterSpine },
            { id: 'upper_limb', label: t.filterUpperLimb },
            { id: 'lower_limb', label: t.filterLowerLimb },
            { id: 'sports', label: t.filterSports },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-teal-600 border-teal-500 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Workspace: Video Player + Controls + Step-by-Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Easy Video Player & Real-time Cadence */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  {activeExercise.categoryLabel[currentLanguage]} · {activeExercise.difficulty}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {activeExercise.title[currentLanguage]}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span className="font-semibold text-slate-800">
                    {t.targetMuscles}:
                  </span>
                  <span>{activeExercise.targetArea[currentLanguage]}</span>
                </div>
              </div>

              {/* Text-to-Speech Voice Guide Button */}
              <button
                type="button"
                onClick={handleSpeakGuidance}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
                  isSpeaking
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/30'
                    : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{t.stopVoice}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-teal-600" />
                    <span>{t.speakInstructions}</span>
                  </>
                )}
              </button>
            </div>

            {/* Easy Animated Motion Video Viewport */}
            {renderAnimatedExerciseGraphic()}

            {/* Video Cadence & Prescription Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.repetition}</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {currentReps} / {activeExercise.reps}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.holdSeconds}</span>
                <span className="text-xl font-extrabold text-teal-800 font-mono">
                  {activeExercise.holdSeconds}s
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.sets}</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {activeExercise.sets} Sets
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.frequency}</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-2 mt-1">
                  {activeExercise.frequency[currentLanguage]}
                </span>
              </div>
            </div>

            {/* Interactive Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-teal-700 hover:bg-teal-800 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? t.pauseExercise : t.startExercise}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentReps(0);
                    setHoldTimer(0);
                    playChimeTone(480, 'sine', 0.1);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetReps}</span>
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[0.5, 1, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      playbackSpeed === spd
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dr. Heta Doshi Clinical Coaching Tip */}
          <div className="p-6 bg-teal-50 rounded-3xl border border-teal-200 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>{t.drHetaClinicalTip}</span>
            </div>
            <blockquote className="text-sm text-teal-950 font-medium leading-relaxed italic">
              "{activeExercise.drHetaClinicalTip[currentLanguage]}"
            </blockquote>
            <div className="pt-2 text-xs text-teal-800 font-semibold border-t border-teal-200/60 flex items-center justify-between">
              <span>Dr. Heta Doshi (PT) · Assistant Professor</span>
              <span>Vadodara Clinic</span>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Instructions & Exercise Library Picker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step-by-Step Technique Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>{t.stepByStep}</span>
              </h4>
              <span className="text-xs font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-bold">
                {currentLanguage.toUpperCase()}
              </span>
            </div>

            <ol className="space-y-3">
              {activeExercise.stepByStep[currentLanguage].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{step}</span>
                </li>
              ))}
            </ol>

            {/* Precautions Box */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{t.clinicalPrecautions}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {activeExercise.precautions[currentLanguage].map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Anatomical Muscles */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 block mb-2">
                {t.targetMuscles}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeExercise.targetMuscles.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Exercise Library Switcher List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>{t.allMusculoskeletalExercises}</span>
              <span className="text-xs text-teal-700 font-mono font-bold">
                {filteredExercises.length} Exercises
              </span>
            </h4>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filteredExercises.map((ex) => {
                const isSelected = ex.id === selectedExerciseId;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setSelectedExerciseId(ex.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-teal-50 border-teal-500 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-teal-800 uppercase font-mono">
                        {ex.categoryLabel[currentLanguage]}
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">
                        {ex.title[currentLanguage]}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ex.reps} reps · {ex.holdSeconds}s hold · {ex.difficulty}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-teal-700 translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Direct Consultation Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onBookExerciseConsultation &&
                  onBookExerciseConsultation(activeExercise.title[currentLanguage])
                }
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>{t.consultDrHeta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
