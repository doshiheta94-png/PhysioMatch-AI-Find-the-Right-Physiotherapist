export type AppLanguage = 'en' | 'hi' | 'gu';

export interface TranslationDictionary {
  clinicalTriage: string;
  bodyAtlas3D5D: string;
  posture5D: string;
  myHealthJourney: string;
  musculoskeletalExercises: string;
  consultDrHeta: string;
  founderTag: string;
  selectLanguage: string;
  voiceGuide: string;
  voiceInput: string;
  listening: string;
  voiceCommandHint: string;
  startExercise: string;
  pauseExercise: string;
  resetReps: string;
  repetition: string;
  holdSeconds: string;
  sets: string;
  frequency: string;
  drHetaClinicalTip: string;
  allMusculoskeletalExercises: string;
  easyVideoPlayer: string;
  stepByStep: string;
  speakInstructions: string;
  stopVoice: string;
  voiceActiveBadge: string;
  targetMuscles: string;
  clinicalPrecautions: string;
  filterAll: string;
  filterSpine: string;
  filterUpperLimb: string;
  filterLowerLimb: string;
  filterSports: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    clinicalTriage: 'Clinical Triage',
    bodyAtlas3D5D: '3D/5D Body Atlas',
    posture5D: '5D Posture & Guide',
    myHealthJourney: 'My Health Journey',
    musculoskeletalExercises: 'Exercise & Voice Guide',
    consultDrHeta: 'Consult Dr. Heta Doshi',
    founderTag: 'Dr. Heta Doshi (PT) · Ph.D. Scholar · Vadodara',
    selectLanguage: 'Language',
    voiceGuide: 'Audio Voice Guide',
    voiceInput: 'Voice Command Input',
    listening: 'Listening for commands...',
    voiceCommandHint: 'Try saying: "Start", "Pause", "Next", "Hindi", "Gujarati", or "Count"',
    startExercise: 'Start Guided Reps',
    pauseExercise: 'Pause Exercise',
    resetReps: 'Reset Reps',
    repetition: 'Repetition',
    holdSeconds: 'Hold',
    sets: 'Sets',
    frequency: 'Frequency',
    drHetaClinicalTip: 'Dr. Heta Doshi Clinical Coaching Rationale',
    allMusculoskeletalExercises: 'Musculoskeletal & Sports Rehabilitation Library',
    easyVideoPlayer: 'Easy Animated Motion Video & Biomechanical Guidance',
    stepByStep: 'Step-by-Step Clinical Technique',
    speakInstructions: 'Listen to Voice Guide',
    stopVoice: 'Stop Voice',
    voiceActiveBadge: 'Voice Input Active',
    targetMuscles: 'Target Muscles & Joint Structures',
    clinicalPrecautions: 'Clinical Precautions & Form Cues',
    filterAll: 'All Exercises',
    filterSpine: 'Spine & Back',
    filterUpperLimb: 'Shoulder & Arm',
    filterLowerLimb: 'Knee & Hip',
    filterSports: 'Sports Athletic',
  },
  hi: {
    clinicalTriage: 'क्लीनिकल ट्राइएज',
    bodyAtlas3D5D: '3D/5D बॉडी एटलस',
    posture5D: '5D पोस्चर और गाइड',
    myHealthJourney: 'मेरी स्वास्थ्य यात्रा',
    musculoskeletalExercises: 'व्यायाम और वॉयस गाइड',
    consultDrHeta: 'डॉ. हेता दोशी से परामर्श लें',
    founderTag: 'डॉ. हेता दोशी (पी.टी.) · पीएच.डी. शोधकर्ता · वडोदरा',
    selectLanguage: 'भाषा',
    voiceGuide: 'ऑडियो वॉयस गाइड',
    voiceInput: 'वॉयस कमांड इनपुट',
    listening: 'आपकी आवाज़ सुन रहे हैं...',
    voiceCommandHint: 'बोलें: "शुरू करो", "रोको", "अगला", "गिनती", "गुजराती" या "हिंदी"',
    startExercise: 'व्यायाम शुरू करें',
    pauseExercise: 'व्यायाम रोकें',
    resetReps: 'दोहराव रीसेट करें',
    repetition: 'दोहराव (Reps)',
    holdSeconds: 'होल्ड (सेकंड)',
    sets: 'सेट्स',
    frequency: 'आवृत्ति',
    drHetaClinicalTip: 'डॉ. हेता दोशी क्लीनिकल कोचिंग सलाह',
    allMusculoskeletalExercises: 'मस्कुलोस्केलेटल और खेल पुनर्वास व्यायाम लाइब्रेरी',
    easyVideoPlayer: 'सरल एनिमेटेड मोशन वीडियो और बायोमैकेनिकल मार्गदर्शन',
    stepByStep: 'चरण-दर-चरण क्लीनिकल विधि',
    speakInstructions: 'वॉयस गाइड सुनें',
    stopVoice: 'आवाज़ बंद करें',
    voiceActiveBadge: 'वॉयस इनपुट सक्रिय है',
    targetMuscles: 'लक्षित मांसपेशियां और जोड़',
    clinicalPrecautions: 'क्लीनिकल सावधानियां और सही मुद्रा',
    filterAll: 'सभी व्यायाम',
    filterSpine: 'रीढ़ और पीठ',
    filterUpperLimb: 'कंधा और बांह',
    filterLowerLimb: 'घुटना और कूल्हा',
    filterSports: 'स्पोर्ट्स एथलेटिक',
  },
  gu: {
    clinicalTriage: 'ક્લિનિકલ ટ્રાયેજ',
    bodyAtlas3D5D: '3D/5D બોડી એટલાસ',
    posture5D: '5D પોશ્ચર અને ગાઈડ',
    myHealthJourney: 'મારી હેલ્થ જર્ની',
    musculoskeletalExercises: 'કસરત અને વોઈસ ગાઈડ',
    consultDrHeta: 'ડૉ. હેતા દોશી સાથે કન્સલ્ટેશન',
    founderTag: 'ડૉ. હેતા દોશી (પી.ટી.) · પીએચ.ડી. સ્કોલર · વડોદરા',
    selectLanguage: 'ભાષા',
    voiceGuide: 'ઑડિયો વોઈસ ગાઈડ',
    voiceInput: 'વોઈસ કમાન્ડ ઇનપુટ',
    listening: 'તમારો અવાજ સાંભળી રહ્યા છીએ...',
    voiceCommandHint: 'બોલો: "શરૂ કરો", "અટકાવો", "આગળ", "ગણતરી", "ગુજરાતી" અથવા "હિન્દી"',
    startExercise: 'કસરત શરૂ કરો',
    pauseExercise: 'કસરત અટકાવો',
    resetReps: 'રીસેટ ગણતરી',
    repetition: 'પુનરાવર્તન (Reps)',
    holdSeconds: 'હોલ્ડ (સેકન્ડ)',
    sets: 'સેટ્સ',
    frequency: 'આવર્તન',
    drHetaClinicalTip: 'ડૉ. હેતા દોશી ક્લિનિકલ કોચિંગ માર્ગદર્શન',
    allMusculoskeletalExercises: 'મસ્ક્યુલોસ્કેલેટલ અને સ્પોર્ટ્સ પુનર્વસન કસરત લાઇબ્રેરી',
    easyVideoPlayer: 'સરળ એનિમેટેડ મોશન વિડિઓ અને બાયોમેકેનિકલ માર્ગદર્શન',
    stepByStep: 'તબક્કાવાર ક્લિનિકલ પદ્ધતિ',
    speakInstructions: 'વોઈસ ગાઈડ સાંભળો',
    stopVoice: 'અવાજ બંધ કરો',
    voiceActiveBadge: 'વોઈસ ઇનપુટ ચાલુ છે',
    targetMuscles: 'લક્ષિત સ્નાયુઓ અને સાંધા',
    clinicalPrecautions: 'ક્લિનિકલ સાવચેતી અને સાચી મુદ્રા',
    filterAll: 'બધી કસરતો',
    filterSpine: 'પીઠ અને કરોડરજ્જુ',
    filterUpperLimb: 'ખભો અને હાથ',
    filterLowerLimb: 'ઘૂંટણ અને થાપો',
    filterSports: 'સ્પોર્ટ્સ એથ્લેટિક',
  },
};
