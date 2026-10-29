import { AppLanguage } from './translations';

export interface TrilingualContent {
  en: string;
  hi: string;
  gu: string;
}

export interface TrilingualList {
  en: string[];
  hi: string[];
  gu: string[];
}

export type ExerciseCategory = 'spine' | 'upper_limb' | 'lower_limb' | 'sports';

export interface MusculoskeletalExercise {
  id: string;
  category: ExerciseCategory;
  title: TrilingualContent;
  targetArea: TrilingualContent;
  categoryLabel: TrilingualContent;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced Sports';
  reps: number;
  sets: number;
  holdSeconds: number;
  frequency: TrilingualContent;
  equipment: TrilingualContent;
  stepByStep: TrilingualList;
  voiceGuideScript: TrilingualContent;
  drHetaClinicalTip: TrilingualContent;
  precautions: TrilingualList;
  targetMuscles: string[];
  animationType:
    | 'spine_extension'
    | 'neck_retraction'
    | 'thoracic_catcow'
    | 'shoulder_rotation'
    | 'elbow_twist'
    | 'knee_squat'
    | 'hip_clamshell'
    | 'athletic_deadlift'
    | 'heel_raise'
    | 'single_leg_balance';
}

export const EXERCISE_LIBRARY: MusculoskeletalExercise[] = [
  {
    id: 'lumbar_mckenzie_extension',
    category: 'spine',
    title: {
      en: 'Prone McKenzie Lumbar Extension & Disc Centralization',
      hi: 'प्रोन मैकेंज़ी लम्बर एक्सटेंशन और डिस्क सेंट्रलाइजेशन',
      gu: 'પ્રોન મેકેન્ઝી કમર એક્સટેન્શન અને ડિસ્ક સેન્ટ્રલાઇઝેશન',
    },
    targetArea: {
      en: 'L4-L5 Lumbar Spine & Sciatic Nerve Root',
      hi: 'L4-L5 लम्बर रीढ़ और साइटिका तंत्रिका',
      gu: 'L4-L5 કમરની કરોડરજ્જુ અને સાયટિકા નર્વ',
    },
    categoryLabel: {
      en: 'Spine & Disc Rehabilitation',
      hi: 'रीढ़ और डिस्क पुनर्वास',
      gu: 'કરોડરજ્જુ અને ડિસ્ક પુનર્વસન',
    },
    difficulty: 'Beginner',
    reps: 10,
    sets: 3,
    holdSeconds: 4,
    frequency: {
      en: '3 times daily (Morning, Afternoon, Evening)',
      hi: 'दिन में 3 बार (सुबह, दोपहर, शाम)',
      gu: 'દિવસમાં 3 વખત (સવારે, બપોરે, સાંજે)',
    },
    equipment: {
      en: 'Firm Exercise Mat or Bed',
      hi: 'समतल मैट या सख्त बिस्तर',
      gu: 'ફર્મ એક્સરસાઇઝ મેટ અથવા પલંગ',
    },
    stepByStep: {
      en: [
        'Lie flat on your stomach with hands positioned beneath your shoulders like a press-up.',
        'Keep your lower back, hips, and leg muscles completely relaxed.',
        'Press into your palms to lift your chest upward, maintaining your pelvis flat against the surface.',
        'Hold the gentle extension curve for 3 to 5 seconds while exhaling smoothly.',
        'Lower yourself back down and repeat for 10 controlled repetitions.',
      ],
      hi: [
        'पेट के बल लेटें और हाथों को कंधों के नीचे पुश-अप की तरह रखें।',
        'कमर, कूल्हों और पैरों की मांसपेशियों को पूरी तरह ढीला और शांत रखें।',
        'हथेलियों से दबाव डालते हुए छाती को ऊपर उठाएं, कूल्हे जमीन पर ही रहें।',
        'शीर्ष पर 3 से 5 सेकंड तक रुकें और सामान्य रूप से सांस छोड़ें।',
        'धीरे-धीरे नीचे आएं और इसे 10 बार दोहराएं।',
      ],
      gu: [
        'પેટ પર સૂઈ જાઓ અને બંને હાથ ખભાની નીચે પુશ-અપ પોઝિશનમાં રાખો.',
        'કમર, થાપા અને પગના સ્નાયુઓને સંપૂર્ણપણે હળવા અને રિલેક્સ રાખો.',
        'હથેળીઓ પર વજન આપીને છાતીને ધીમે-ધીમે ઊંચી કરો, પેલ્વિસ જમીન પર જ રહેવું જોઈએ.',
        'ટોચ પર 3 થી 5 સેકન્ડ શ્વાસ બહાર કાઢતા હોલ્ડ કરો.',
        'ધીમેથી નીચે આવો અને નિયંત્રિત ગતિમાં 10 વખત પુનરાવર્તન કરો.',
      ],
    },
    voiceGuideScript: {
      en: 'Lie on your stomach. Relax your glutes. Press up with your hands, keeping your hips down. Hold for five seconds. Breathe out gently. Now slowly lower down. Great job.',
      hi: 'पेट के बल लेट जाएं। कूल्हों को ढीला छोड़ें। हाथों से छाती को ऊपर उठाएं। पांच सेकंड तक रुकें। सांस बाहर छोड़ें। अब धीरे-धीरे नीचे आएं। बहुत बढ़िया।',
      gu: 'પેટ પર સૂઈ જાઓ. કમર ઢીલી રાખો. હાથ વડે છાતી ઉપર કરો. પાંચ સેકન્ડ સુધી શ્વાસ બહાર કાઢતા હોલ્ડ કરો. હવે ધીમેથી નીચે આવો. સરસ કામ.',
    },
    drHetaClinicalTip: {
      en: 'Focus on symptom centralization: if the pain recedes from your calf or thigh up into your lower back, this indicates successful mechanical decompression of the lumbar disc.',
      hi: 'लक्षणों के सेंट्रलाइजेशन पर ध्यान दें: यदि दर्द पिंडली या जांघ से घटकर पीठ के केंद्र में आ रहा है, तो यह डिस्क पर दबाव कम होने का स्पष्ट संकेत है।',
      gu: 'સિમ્પ્ટમ સેન્ટ્રલાઇઝેશન પર ધ્યાન આપો: જો દુખાવો પગ કે સાથળમાંથી ઘટીને કમરના કેન્દ્ર તરફ આવે, તો તેનો અર્થ એ છે કે ડિસ્ક પરનું દબાણ ઘટી રહ્યું છે.',
    },
    precautions: {
      en: [
        'Stop if pain increases down into your foot or toes.',
        'Do not tighten your buttocks during the press-up.',
      ],
      hi: [
        'यदि पैर या पंजे में दर्द बढ़े तो तुरंत रुकें।',
        'छाती उठाते समय नितंबों को टाइट न करें।',
      ],
      gu: [
        'જો દુખાવો પગની પાની કે આંગળીઓ તરફ વધે તો તરત અટકાવી દો.',
        'ઊંચા થતી વખતે થાપાના સ્નાયુઓ ખેંચશો નહીં.',
      ],
    },
    targetMuscles: ['Erector Spinae', 'Lumbar Multifidus', 'Posterior Longitudinal Ligament'],
    animationType: 'spine_extension',
  },

  {
    id: 'cervical_chin_tuck',
    category: 'spine',
    title: {
      en: 'Craniocervical Flexion & Deep Neck Flexor Retraction (Chin Tuck)',
      hi: 'क्रेनियोसर्विकल फ्लेक्सन और डीप नेक फ्लेक्सर (चिन टक)',
      gu: 'ક્રેનિયોસર્વાઇકલ ફ્લેક્સન અને ડીપ નેક ફ્લેક્સર્સ (ચિન ટક)',
    },
    targetArea: {
      en: 'C5-C6 Cervical Spine & Suboccipital Base',
      hi: 'C5-C6 गर्दन की रीढ़ और सबऑक्सीपिटल बेस',
      gu: 'C5-C6 ગરદન અને સબ-ઓક્સિપિટલ ભાગ',
    },
    categoryLabel: {
      en: 'Neck & Posture Alignment',
      hi: 'गर्दन और पोस्चर सुधार',
      gu: 'ગરદન અને પોશ્ચર સુધારણા',
    },
    difficulty: 'Beginner',
    reps: 12,
    sets: 3,
    holdSeconds: 5,
    frequency: {
      en: 'Every 2 hours during desk work or driving',
      hi: 'डेस्क कार्य या ड्राइविंग के दौरान हर 2 घंटे में',
      gu: 'ડેસ્ક વર્ક અથવા ડ્રાઇવિંગ દરમિયાન દર 2 કલાકે',
    },
    equipment: {
      en: 'Chair with upright backrest or wall',
      hi: 'सीधी कुर्सी या दीवार',
      gu: 'સીધી ખુરશી અથવા દીવાલ',
    },
    stepByStep: {
      en: [
        'Sit upright with your eyes looking directly forward at horizon level.',
        'Without tilting your head down, draw your chin horizontally backward like making a gentle double chin.',
        'Feel the back of your neck lengthening upward toward the ceiling.',
        'Hold the deep neck flexor contraction for 5 seconds without holding your breath.',
        'Release gently to neutral and repeat for 12 smooth repetitions.',
      ],
      hi: [
        'रीढ़ सीधी करके बैठें और आंखें सामने क्षितिज स्तर पर रखें।',
        'सिर को नीचे झुकाए बिना, ठोड़ी को धीरे से पीछे की ओर खींचें (हल्की डबल चिन बनाएं)।',
        'महसूस करें कि आपकी गर्दन का पिछला हिस्सा छत की तरफ लंबा हो रहा है।',
        'सांस रोके बिना इस खिंचाव को 5 सेकंड तक बनाए रखें।',
        'धीरे से सामान्य स्थिति में आएं और 12 बार दोहराएं।',
      ],
      gu: [
        'કરોડરજ્જુ સીધી રાખીને બેસો અને નજર સીધી સામે રાખો.',
        'માથું નીચે નમાવ્યા વગર, દાઢીને ધીમેથી પાછળની તરફ ખેંચો (ડબલ ચિન બનાવો).',
        'અનુભવ કરો કે ગરદનનો પાછળનો ભાગ છત તરફ ખેંચાઈને સીધો થઈ રહ્યો છે.',
        'શ્વાસ રોક્યા વગર 5 સેકન્ડ સુધી આ સ્થિતિ જાળવી રાખો.',
        'ધીમેથી સામાન્ય સ્થિતિમાં લાવો અને 12 વખત પુનરાવર્તન કરો.',
      ],
    },
    voiceGuideScript: {
      en: 'Sit upright. Look straight ahead. Draw your chin backward horizontally. Feel the back of your neck lengthen. Hold for five seconds. Breathe. Relax forward.',
      hi: 'सीधे बैठें। सामने देखें। ठोड़ी को सीधे पीछे खींचें। गर्दन के पिछले हिस्से में खिंचाव महसूस करें। पांच सेकंड रुकें। सांस लें। अब ढीला छोड़ें।',
      gu: 'સીધા બેસો. સામે જુઓ. દાઢીને સીધી પાછળ ખેંચો. ગરદનનો પાછળનો ભાગ ખેંચાવા દો. પાંચ સેકન્ડ હોલ્ડ કરો. શ્વાસ લો. હવે હળવાશ કરો.',
    },
    drHetaClinicalTip: {
      en: 'Keep your jaw and teeth unclenched. Activating the Longus Colli reduces the gravitational cantilever load on the C5-C6 nerve root by over 45%.',
      hi: 'जबड़ों और दांतों को भींचें नहीं। लोंगस कोली को सक्रिय करने से C5-C6 नसों पर खिंचाव 45% तक कम हो जाता है।',
      gu: 'જડબું અને દાંત ભીંસશો નહીં. લોંગસ કોલી સ્નાયુ સક્રિય થવાથી C5-C6 નર્વ પરનો ભાર 45% કરતાં વધુ ઘટી જાય છે.',
    },
    precautions: {
      en: [
        'Do not look down toward your chest; slide the head horizontally backward.',
        'Stop if you feel dizziness or lightheadedness.',
      ],
      hi: [
        'छाती की तरफ नीचे न देखें; सिर को क्षैतिज रूप से पीछे ले जाएं।',
        'यदि चक्कर आए तो तुरंत बंद करें।',
      ],
      gu: [
        'છાતી તરફ નીચે ન જોશો; માથાને સીધું પાછળની દિશામાં સરકાવો.',
        'જો ચક્કર જેવું લાગે તો તરત અટકાવી દો.',
      ],
    },
    targetMuscles: ['Longus Colli', 'Longus Capitis', 'Suboccipital Decompressors'],
    animationType: 'neck_retraction',
  },

  {
    id: 'shoulder_rotator_cuff_er',
    category: 'upper_limb',
    title: {
      en: 'Rotator Cuff External Rotation & Scapular Depression',
      hi: 'रोटेक्टर कफ एक्सटर्नल रोटेशन और स्कैपुलर डिप्रेसर',
      gu: 'રોટેટર કફ એક્સટર્નલ રોટેશન અને સ્કેપ્યુલર ડિપ્રેશન',
    },
    targetArea: {
      en: 'Glenohumeral Joint & Supraspinatus Tendon',
      hi: 'कंधे का जोड़ और सुप्रास्पिनैटस टेंडन',
      gu: 'ખભાનો સાંધો અને સુપ્રાસ્પિનાટસ ટેન્ડન',
    },
    categoryLabel: {
      en: 'Shoulder & Sports Arm Rehab',
      hi: 'कंधा और स्पोर्ट्स आर्म पुनर्वास',
      gu: 'ખભા અને સ્પોર્ટ્સ આર્મ પુનર્વસન',
    },
    difficulty: 'Intermediate',
    reps: 15,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: '4 days per week with 1 day recovery between sessions',
      hi: 'सप्ताह में 4 दिन, सत्रों के बीच 1 दिन का आराम',
      gu: 'અઠવાડિયામાં 4 દિવસ, સત્રો વચ્ચે 1 દિવસ આરામ',
    },
    equipment: {
      en: 'Light Elastic Resistance Band or Towel Roll',
      hi: 'हल्का रेजिस्टेंस बैंड या तौलिया रोल',
      gu: 'હળવો રેઝિસ્ટન્સ બેન્ડ અથવા ટુવાલ રોલ',
    },
    stepByStep: {
      en: [
        'Stand or sit upright with a rolled towel pinned snugly between your elbow and rib cage.',
        'Bend your elbow to 90 degrees with palm facing inward.',
        'Retract your shoulder blades backward and down into your back pockets.',
        'Rotate your forearm outward away from your belly button, keeping your elbow glued to the towel.',
        'Hold for 3 seconds at outer rotation, feeling the posterior shoulder burn, then return slowly over 3 seconds.',
      ],
      hi: [
        'सीधे खड़े हों और कोहनी तथा पसलियों के बीच एक मुड़ा हुआ तौलिया दबाएं।',
        'कोहनी को 90 डिग्री पर मोड़ें और हथेली अंदर की ओर रखें।',
        'कंधे के ब्लेड्स को पीछे और नीचे की तरफ खींचे।',
        'कोहनी को तौलिए पर चिपकाए रखते हुए, हाथ को बाहर की तरफ घुमाएं।',
        'बाहर 3 सेकंड रुकें, फिर 3 सेकंड में धीरे-धीरे वापस लाएं।',
      ],
      gu: [
        'સીધા ઊભા રહો અને કોણી તથા પાંસળી વચ્ચે એક વળેલો ટુવાલ દબાવી રાખો.',
        'કોણીને 90 ડિગ્રીના ખૂણે વાળો અને હથેળી અંદર તરફ રાખો.',
        'ખભાના પાછળના હાડકાં (સ્કેપ્યુલા) ને પાછળ અને નીચેની તરફ ખેંચો.',
        'કોણીને ટુવાલ સાથે અડાડેલી રાખીને હાથને બહારની તરફ ફેરવો.',
        'બહારની બાજુ 3 સેકન્ડ હોલ્ડ કરો, પછી 3 સેકન્ડમાં ધીમેથી પાછા લાવો.',
      ],
    },
    voiceGuideScript: {
      en: 'Tuck the towel at your side. Squeeze shoulder blades down. Rotate your forearm outward smoothly. Hold for three seconds. Lower back slowly. Great control.',
      hi: 'तौलिया बगल में दबाएं। कंधे के ब्लेड्स पीछे खींचें। हाथ को बाहर की ओर घुमाएं। तीन सेकंड रुकें। धीरे-धीरे वापस आएं। बहुत अच्छा संतुलन।',
      gu: 'ટુવાલ પડખામાં દબાવો. ખભા પાછળ ખેંચો. હાથને બહારની તરફ ધીમેથી ફેરવો. ત્રણ સેકન્ડ હોલ્ડ કરો. ધીમેથી પાછા લાવો. સરસ કંટ્રોલ.',
    },
    drHetaClinicalTip: {
      en: 'The towel roll maintains 30 degrees of scaption, maximizing blood perfusion to the critical hypovascular zone of the supraspinatus tendon.',
      hi: 'तौलिया कोहनी को 30 डिग्री पर रखता है, जिससे सुप्रास्पिनैटस टेंडन में रक्त संचार सबसे बेहतर रहता है और टकराव से बचाव होता है।',
      gu: 'ટુવાલ કોણીને 30 ડિગ્રી પર રાખે છે, જેથી સુપ્રાસ્પિનાટસ ટેન્ડનમાં રક્ત પરિભ્રમણ મહત્તમ રહે છે અને ખભાનો ભરાવો અટકે છે.',
    },
    precautions: {
      en: [
        'Do not let the towel drop; this means your elbow drifted away from the body.',
        'Do not twist your spine or hike your shoulder.',
      ],
      hi: [
        'तौलिया गिरने न पाए; इसका अर्थ है कोहनी शरीर से दूर हो गई।',
        'कमर न मरोड़ें और कंधा ऊपर न उचकाएं।',
      ],
      gu: [
        'ટુવાલ નીચે પડવા ન દેશો; તેનો અર્થ છે કોણી શરીરથી દૂર થઈ ગઈ.',
        'કમર મચકોડશો નહીં કે ખભો ઊંચો કરશો નહીં.',
      ],
    },
    targetMuscles: ['Infraspinatus', 'Teres Minor', 'Lower Trapezius'],
    animationType: 'shoulder_rotation',
  },

  {
    id: 'knee_spanish_squat',
    category: 'lower_limb',
    title: {
      en: 'Banded Spanish Squat for Patellofemoral Pain & VMO Loading',
      hi: 'बैंडेड स्पैनिश स्क्वाट (घुटने के दर्द और वीएमओ के लिए)',
      gu: 'બેન્ડેડ સ્પેનિશ સ્ક્વોટ (ઘૂંટણના દુખાવા અને VMO માટે)',
    },
    targetArea: {
      en: 'Patellofemoral Joint & Anterior Cruciate Ligament (ACL)',
      hi: 'घुटने का जोड़ और एसीएल (ACL) लिगामेंट',
      gu: 'ઘૂંટણનો સાંધો અને એ.સી.એલ. (ACL) લિગામેન્ટ',
    },
    categoryLabel: {
      en: 'Knee & Sports Quad Mechanics',
      hi: 'घुटना और स्पोर्ट्स क्वाड्रिसेप्स',
      gu: 'ઘૂંટણ અને સ્પોર્ટ્સ ક્વાડ્રિસેપ્સ',
    },
    difficulty: 'Intermediate',
    reps: 10,
    sets: 3,
    holdSeconds: 5,
    frequency: {
      en: '3 times weekly with 48 hours recovery',
      hi: 'सप्ताह में 3 बार, 48 घंटे के अंतर पर',
      gu: 'અઠવાડિયામાં 3 વખત, 48 કલાકના અંતરે',
    },
    equipment: {
      en: 'Heavy Resistance Loop Band anchored to sturdy post',
      hi: 'भारी लूप रेजिस्टेंस बैंड मजबूत पोल से बंधा हुआ',
      gu: 'હેવી લૂપ રેઝિસ્ટન્સ બેન્ડ મજબૂત આધાર સાથે બાંધેલો',
    },
    stepByStep: {
      en: [
        'Loop a heavy resistance band around a solid pillar and hook both loops behind your knee creases.',
        'Step backward until the band pulls your knees firmly forward.',
        'Keep your shins completely vertical as you sit hips backward like lowering onto a chair.',
        'Descend into a 60-degree knee bend, keeping full foot contact on the ground.',
        'Hold the isometric quadriceps contraction for 5 seconds without letting knees cave inward, then rise.',
      ],
      hi: [
        'एक मजबूत पोल पर हैवी बैंड बांधें और दोनों घुटनों के पिछले हिस्से में फंसाएं।',
        'पीछे हटें जब तक कि बैंड घुटनों को आगे की तरफ न खींचे।',
        'पिंडलियों को बिल्कुल सीधा (वर्टिकल) रखें और कूल्हों को कुर्सी पर बैठने की तरह पीछे ले जाएं।',
        '60 डिग्री तक झुकें, दोनों पैर जमीन पर मजबूती से जमे रहें।',
        'घुटनों को अंदर की ओर झुके बिना 5 सेकंड रुकें, फिर सीधे खड़े हों।',
      ],
      gu: [
        'એક મજબૂત થાંભલા સાથે હેવી બેન્ડ બાંધો અને બંને ઘૂંટણના પાછળના ભાગમાં ભરાવો.',
        'પાછળ ખસો જેથી બેન્ડ ઘૂંટણને મજબૂતીથી આગળ ખેંચે.',
        'પગની નળીઓ એકદમ સીધી (ઊભી) રાખો અને ખુરશી પર બેસતા હોવ તેમ થાપા પાછળ ધકેલો.',
        '60 ડિગ્રી સુધી નીચે જાઓ, બંને પગના તળિયા પૂરા જમીન પર રાખો.',
        'ઘૂંટણ અંદર ન વળે તેનું ધ્યાન રાખીને 5 સેકન્ડ હોલ્ડ કરો, પછી ઊભા થાઓ.',
      ],
    },
    voiceGuideScript: {
      en: 'Band behind the knees. Step back into tension. Keep your shins vertical. Sit back with hips. Hold for five seconds. Push through your heels to stand. Excellent.',
      hi: 'बैंड घुटनों के पीछे। पीछे हटकर तनाव बनाएं। पिंडलियां सीधी रखें। कूल्हों को पीछे ले जाएं। पांच सेकंड रुकें। एड़ियों से जोर लगाकर खड़े हों। बहुत बढ़िया।',
      gu: 'બેન્ડ ઘૂંટણ પાછળ રાખો. પાછળ ખસીને તણાવ બનાવો. નળીઓ સીધી રાખો. થાપા પાછળ બેસાડો. પાંચ સેકન્ડ હોલ્ડ કરો. એડીઓ પર વજન આપીને ઊભા થાઓ. ખૂબ સરસ.',
    },
    drHetaClinicalTip: {
      en: 'The posterior tibial shear provided by the band unloads the patellofemoral cartilage while generating peak isometric VMO motor unit recruitment.',
      hi: 'बैंड द्वारा दिया गया पिछला खिंचाव घुटने की कटोरी (पटेला) से दबाव हटा देता है और वीएमओ मांसपेशी को अत्यधिक मजबूत करता है।',
      gu: 'બેન્ડ દ્વારા મળતો પાછળનો ટેકો ઢાંકણી (પટેલા) પરનું ઘર્ષણ ઘટાડે છે અને VMO સ્નાયુને અત્યંત મજબૂત બનાવે છે.',
    },
    precautions: {
      en: [
        'Never let knees collapse inward into valgus knock-knee.',
        'Keep weight balanced through midfoot and heel, not toes.',
      ],
      hi: [
        'घुटनों को अंदर की ओर आपस में टकराने (नोक-नी) न दें।',
        'वजन पंजों पर नहीं, बल्कि एड़ियों और तलवों पर रखें।',
      ],
      gu: [
        'ઘૂંટણને અંદરની તરફ ભટકાવા (નોક-ની) દેશો નહીં.',
        'વજન આંગળીઓ પર નહીં, પણ એડી અને તળિયાના મધ્ય ભાગ પર રાખો.',
      ],
    },
    targetMuscles: ['Vastus Medialis Oblique (VMO)', 'Gluteus Maximus', 'Patellar Tendon'],
    animationType: 'knee_squat',
  },

  {
    id: 'hip_clamshell_glute_med',
    category: 'lower_limb',
    title: {
      en: 'Side-Lying Clamshell & Posterior Gluteus Medius Abduction',
      hi: 'साइड-लाइंग क्लैमशेल और ग्लूटियस मीडियस अबडक्शन',
      gu: 'સાઇડ-લાઇંગ ક્લેમશેલ અને ગ્લુટિયસ મીડિયસ એબડક્શન',
    },
    targetArea: {
      en: 'Pelvic Girdle & Hip Abductor Force Couple',
      hi: 'पेल्विक गर्डल और हिप एबडक्टर मांसपेशियां',
      gu: 'પેલ્વિક ગર્ડલ અને થાપાના સ્ટેબિલાઇઝર સ્નાયુઓ',
    },
    categoryLabel: {
      en: 'Pelvis & Hip Stability',
      hi: 'पेल्विस और हिप स्थिरता',
      gu: 'પેલ્વિસ અને હિપ સ્થિરતા',
    },
    difficulty: 'Beginner',
    reps: 15,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: 'Daily or 5 days per week',
      hi: 'प्रतिदिन या सप्ताह में 5 दिन',
      gu: 'દરરોજ અથવા અઠવાડિયામાં 5 દિવસ',
    },
    equipment: {
      en: 'Exercise Mat (Optional Mini Resistance Band)',
      hi: 'एक्सरसाइज मैट (वैकल्पिक मिनी रेजिस्टेंस बैंड)',
      gu: 'એક્સરસાઇઝ મેટ (વૈકલ્પિક મિની રેઝિસ્ટન્સ બેન્ડ)',
    },
    stepByStep: {
      en: [
        'Lie on your unaffected side with hips bent at 45 degrees and knees bent at 90 degrees.',
        'Stack your hips vertically one directly on top of the other, perpendicular to the floor.',
        'Keep your heels glued together as you open your top knee upward toward the ceiling.',
        'Do not roll your top hip backward; place your top hand on the hip bone to monitor stability.',
        'Hold the top position for 3 seconds, feeling the deep lateral glute contract, then lower slowly.',
      ],
      hi: [
        'स्वस्थ करवट पर लेटें, कूल्हे 45 डिग्री और घुटने 90 डिग्री पर मुड़े हों।',
        'दोनों कूल्हों को एक के ऊपर एक सीधा रखें, जमीन से 90 डिग्री पर।',
        'एड़ियों को आपस में चिपकाए रखते हुए, ऊपर वाले घुटने को छत की ओर खोलें।',
        'ऊपर वाले कूल्हे को पीछे की तरफ न लुढ़कने दें; हाथ से कूल्हे को स्थिर रखें।',
        'शीर्ष पर 3 सेकंड रुकें, हिप की बाहरी मांसपेशी में खिंचाव महसूस करें, फिर धीरे-धीरे नीचे लाएं।',
      ],
      gu: [
        'પડખે સૂઈ જાઓ, થાપા 45 ડિગ્રી અને ઘૂંટણ 90 ડિગ્રીના ખૂણે વળેલા રાખો.',
        'બંને થાપા એકબીજાની બરાબર ઉપર સીધા રાખો, જમીન સાથે લંબરૂપ.',
        'બંને એડીઓ ભેગી રાખીને ઉપરના ઘૂંટણને છત તરફ ધીમેથી ઊંચું કરો.',
        'ઉપરનો થાપો પાછળની તરફ ગબડી ન જાય તેનું ખાસ ધ્યાન રાખો.',
        'ટોચ પર 3 સેકન્ડ હોલ્ડ કરો, થાપાના પાછળના સ્નાયુમાં સંકોચન અનુભવો, પછી નીચે લાવો.',
      ],
    },
    voiceGuideScript: {
      en: 'Lie on your side. Keep your heels together. Open your top knee upward without rolling your hips backward. Hold for three seconds. Lower down gently. Feel the glute working.',
      hi: 'करवट लेकर लेटें। एड़ियों को जोड़कर रखें। कूल्हों को पीछे लुढ़काए बिना ऊपर वाले घुटने को खोलें। तीन सेकंड रुकें। धीरे से नीचे लाएं। हिप की ताकत महसूस करें।',
      gu: 'પડખે સૂઈ જાઓ. એડીઓ ભેગી રાખો. થાપો પાછળ ખસેડ્યા વગર ઘૂંટણને ઉપર ખોલો. ત્રણ સેકન્ડ હોલ્ડ કરો. ધીમેથી નીચે લાવો. સ્નાયુનું જોર અનુભવો.',
    },
    drHetaClinicalTip: {
      en: 'Gluteus medius weakness is the primary cause of Trendelenburg pelvic drop and dynamic knee valgus during running and stair climbing.',
      hi: 'ग्लूटियस मीडियस की कमजोरी दौड़ते समय और सीढ़ियां चढ़ते समय घुटने के अंदर झुकने और कूल्हे के लटकने का मुख्य कारण है।',
      gu: 'દોડતી વખતે અને પગથિયાં ચડતી વખતે ઘૂંટણ અંદર વળવા અને કમર લટકવા પાછળ ગ્લુટિયસ મીડિયસની નબળાઈ મુખ્ય કારણ છે.',
    },
    precautions: {
      en: [
        'Do not roll your pelvis backward to gain false range of motion.',
        'Keep movement slow and strictly isolated to the hip.',
      ],
      hi: [
        'ज्यादा ऊपर उठाने के चक्कर में कूल्हे को पीछे न घुमाएं।',
        'गति धीमी रखें और केवल हिप से ही घुमाएं।',
      ],
      gu: [
        'વધુ ઊંચું કરવા માટે થાપાને પાછળ ઢાળશો નહીં.',
        'ગતિ ધીમી રાખો અને માત્ર થાપાના સાંધામાંથી જ હલનચલન કરો.',
      ],
    },
    targetMuscles: ['Gluteus Medius (Posterior Fibers)', 'Obturator Internus', 'Piriformis'],
    animationType: 'hip_clamshell',
  },

  {
    id: 'ankle_rathleff_heel_raise',
    category: 'sports',
    title: {
      en: 'Rathleff High-Load Plantar Fascia & Achilles Heel Raise',
      hi: 'राथलेफ हाई-लोड प्लांटर फेशिया और एच्लीस हील रेज़',
      gu: 'રાથલેફ હાઇ-લોડ પ્લાન્ટર ફાસિયા અને એકિલીસ હીલ રેઇઝ',
    },
    targetArea: {
      en: 'Plantar Aponeurosis & Triceps Surae (Calf Complex)',
      hi: 'प्लांटर फेशिया और पिंडली का कॉम्प्लेक्स',
      gu: 'પ્લાન્ટર ફાસિયા અને પિંડીના સ્નાયુઓ',
    },
    categoryLabel: {
      en: 'Foot, Ankle & Sports Running',
      hi: 'पैर, टखना और खेलकूद रनिंग',
      gu: 'પગ, ઘૂંટી અને સ્પોર્ટ્સ રનિંગ',
    },
    difficulty: 'Advanced Sports',
    reps: 12,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: 'Every other day (allows 48h tendon collagen synthesis)',
      hi: 'एक दिन छोड़कर (टेंडन की रिकवरी के लिए 48 घंटे जरूरी हैं)',
      gu: 'એકાંતરે દિવસે (ટેન્ડનના રિકવરી માટે 48 કલાક જરૂરી છે)',
    },
    equipment: {
      en: 'Step edge and rolled hand towel beneath toes',
      hi: 'सीढ़ी का किनारा और पंजों के नीचे मुड़ा हुआ छोटा तौलिया',
      gu: 'પગથિયાંની કિનારી અને આંગળીઓ નીચે વળેલો નાનો ટુવાલ',
    },
    stepByStep: {
      en: [
        'Stand with balls of your feet on the edge of a step, with a rolled towel placed beneath your toes to bend them upward.',
        'Rise up onto your tip-toes over a smooth 3-second count.',
        'Hold at maximum height for 2 full seconds, feeling the arch and calf contract.',
        'Lower down past the step level over a controlled 3-second descent into a deep stretch.',
        'Repeat for 12 deliberate repetitions without bouncing.',
      ],
      hi: [
        'सीढ़ी के किनारे पर पंजों के बल खड़े हों, आंगुलियों के नीचे मुड़ा तौलिया रखें ताकि वे ऊपर मुड़ी रहें।',
        '3 सेकंड की गिनती में एड़ियों को पूरी ऊंचाई तक ऊपर उठाएं।',
        'अधिकतम ऊंचाई पर 2 सेकंड रुकें, तलवे और पिंडली में खिंचाव महसूस करें।',
        'नियंत्रित तरीके से 3 सेकंड में एड़ियों को सीढ़ी के स्तर से नीचे ले जाकर स्ट्रेच करें।',
        'बिना झटका दिए इसे 12 बार सावधानी से दोहराएं।',
      ],
      gu: [
        'પગથિયાંની કિનારી પર પંજાના ટેકે ઊભા રહો, આંગળીઓ નીચે વળેલો ટુવાલ રાખો જેથી આંગળીઓ ઊંચી રહે.',
        '3 સેકન્ડની ગણતરીમાં એડીઓને પૂરી ઊંચાઈ સુધી ઊંચી કરો.',
        'સૌથી ઊંચી પોઝિશન પર 2 સેકન્ડ હોલ્ડ કરો, તળિયા અને પિંડીમાં ખેંચાણ અનુભવો.',
        'નિયંત્રિત ગતિમાં 3 સેકન્ડમાં એડીઓને પગથિયાંથી નીચે લાવીને ઊંડો સ્ટ્રેચ આપો.',
        'ઝટકા માર્યા વગર 12 વખત નિયમિત રીતે પુનરાવર્તન કરો.',
      ],
    },
    voiceGuideScript: {
      en: 'Stand on the step edge with towel under toes. Rise up for three seconds. Hold at the top for two seconds. Lower down past the step slowly for three seconds. Great calf loading.',
      hi: 'पंजों के नीचे तौलिया रखकर सीढ़ी पर खड़े हों। तीन सेकंड में ऊपर उठें। दो सेकंड शीर्ष पर रुकें। तीन सेकंड में धीरे-धीरे नीचे आएं। बहुत बढ़िया पिंडली का व्यायाम।',
      gu: 'પંજા નીચે ટુવાલ રાખી પગથિયાં પર ઊભા રહો. ત્રણ સેકન્ડમાં ઊંચા થાઓ. ટોચ પર બે સેકન્ડ હોલ્ડ કરો. ત્રણ સેકન્ડમાં ધીમેથી નીચે લાવો. ઉત્તમ પિંડીનું ખેંચાણ.',
    },
    drHetaClinicalTip: {
      en: 'The rolled towel engages the Windlass mechanism of the foot, placing tensile strain directly through the plantar fascia to stimulate collagen remodeling.',
      hi: 'पंजों के नीचे तौलिया रखने से पैर का विंडलास मैकेनिज्म सक्रिय होता है, जिससे प्लांटर फेशिया के कोलेजन को मजबूती मिलती है।',
      gu: 'પંજા નીચે ટુવાલ રાખવાથી પગનું વિન્ડલાસ મિકેનિઝમ સક્રિય થાય છે, જે પ્લાન્ટર ફાસિયાના સ્નાયુઓને મજબૂતી આપે છે.',
    },
    precautions: {
      en: [
        'Hold onto a sturdy wall or handrail for balance.',
        'Do not bounce rapidly at the bottom stretch position.',
      ],
      hi: [
        'संतुलन बनाए रखने के लिए दीवार या रेलिंग का सहारा लें।',
        'नीचे की स्थिति में झटके न मारें।',
      ],
      gu: [
        'સંતુલન જાળવવા દીવાલ કે રેલિંગનો ટેકો અવશ્ય લો.',
        'નીચે સ્ટ્રેચ કરતી વખતે ઝડપી ઝટકા ન મારો.',
      ],
    },
    targetMuscles: ['Plantar Fascia', 'Achilles Tendon', 'Gastrocnemius', 'Soleus'],
    animationType: 'heel_raise',
  },

  {
    id: 'sports_single_leg_rdl',
    category: 'sports',
    title: {
      en: 'Single-Leg Romanian Deadlift (Athletic Hamstring & Glute Hinge)',
      hi: 'सिंगल-लेग रोमानियन डेडलिफ्ट (हैमस्ट्रिंग और ग्लूट हिंज)',
      gu: 'સિંગલ-લેગ રોમાનિયન ડેડલિફ્ટ (હેમસ્ટ્રિંગ અને ગ્લુટ હિન્જ)',
    },
    targetArea: {
      en: 'Posterior Kinetic Chain & Pelvic Proprioception',
      hi: 'पोस्टीरियर काइनेटिक चेन और पेल्विक बैलेंस',
      gu: 'પાછળની કાઇનેટિક ચેઇન અને પેલ્વિક સંતુલન',
    },
    categoryLabel: {
      en: 'Sports Athletic Conditioning',
      hi: 'स्पोर्ट्स एथलेटिक कंडीशनिंग',
      gu: 'સ્પોર્ટ્સ એથ્લેટિક કન્ડિશનિંગ',
    },
    difficulty: 'Advanced Sports',
    reps: 10,
    sets: 3,
    holdSeconds: 2,
    frequency: {
      en: '3 sessions per week',
      hi: 'सप्ताह में 3 सत्र',
      gu: 'અઠવાડિયામાં 3 સત્રો',
    },
    equipment: {
      en: 'Bodyweight or Light Dumbbell / Kettlebell',
      hi: 'शारीरिक भार या हल्का डंबल / केतलीबेल',
      gu: 'શરીરનું વજન અથવા હળવો ડમ્બેલ / કેટલબેલ',
    },
    stepByStep: {
      en: [
        'Stand tall on one leg with a soft micro-bend in the standing knee.',
        'Keep your spine completely neutral and chest proudly forward.',
        'Hinge at your hip, reaching your non-standing leg straight backward like a pendulum.',
        'Lower your torso until parallel with the floor, feeling the standing hamstring load intensely.',
        'Drive through your standing heel and squeeze your glute to return upright.',
      ],
      hi: [
        'एक पैर पर सीधे खड़े हों, खड़े पैर के घुटने को हल्का सा लचीला रखें।',
        'रीढ़ की हड्डी को बिल्कुल सीधा और छाती को गर्व से आगे रखें।',
        'कूल्हे से आगे की ओर झुकें और दूसरे पैर को पेंडुलम की तरह सीधे पीछे ले जाएं।',
        'धड़ को जमीन के समानांतर होने तक नीचे लाएं, खड़े पैर की हैमस्ट्रिंग पर खिंचाव महसूस करें।',
        'खड़ी एड़ी से दबाव बनाते हुए और हिप को सिकोड़ते हुए सीधे खड़े हों।',
      ],
      gu: [
        'એક પગ પર ટટ્ટાર ઊભા રહો, જે પગ પર વજન હોય તેનો ઘૂંટણ સહેજ વળેલો રાખો.',
        'કરોડરજ્જુ એકદમ સીધી અને છાતી આગળ રાખો.',
        'થાપામાંથી આગળ ઝૂકો અને બીજા પગને લોલકની જેમ સીધો પાછળ લંબાવો.',
        'શરીરને જમીનની સમાંતર થાય ત્યાં સુધી નીચે લાવો, ઊભા પગના હેમસ્ટ્રિંગ સ્નાયુ પર વજન અનુભવો.',
        'ઊભા પગની એડી પર ભાર આપીને અને થાપો સંકોચીને પાછા સીધા ઊભા થાઓ.',
      ],
    },
    voiceGuideScript: {
      en: 'Balance on one foot. Soft knee. Hinge at your hip, extending back leg straight. Keep your back flat. Squeeze your standing glute to return upright. Pure athletic stability.',
      hi: 'एक पैर पर संतुलन बनाएं। घुटना हल्का लचीला। कूल्हे से झुकें, पिछला पैर सीधा रखें। पीठ सपाट रहे। हिप की ताकत से सीधे खड़े हों। बेहतरीन एथलेटिक संतुलन।',
      gu: 'એક પગ પર બેલેન્સ કરો. ઘૂંટણ સહેજ ઢીલો. થાપામાંથી ઝૂકો અને પાછળનો પગ સીધો રાખો. પીઠ સીધી રાખો. થાપાના જોરે પાછા ઊભા થાઓ. શ્રેષ્ઠ એથ્લેટિક સ્થિરતા.',
    },
    drHetaClinicalTip: {
      en: 'Eccentric hamstring loading in a closed kinetic chain is clinically proven to reduce non-contact ACL tear risk by up to 65% in athletes.',
      hi: 'क्लोज्ड काइनेटिक चेन में हैमस्ट्रिंग की यह ट्रेनिंग खिलाड़ियों में एसीएल (ACL) लिगामेंट फटने के जोखिम को 65% तक कम करती है।',
      gu: 'આ કસરત ખેલાડીઓમાં દોડતી કે કૂદતી વખતે એ.સી.એલ. (ACL) લિગામેન્ટ તૂટવાનું જોખમ 65% જેટલું ઘટાડે છે.',
    },
    precautions: {
      en: [
        'Do not round your lower back.',
        'Do not open or rotate your pelvis outward; keep hip bones facing the floor.',
      ],
      hi: [
        'कमर को गोल न करें, सीधी रखें।',
        'कूल्हे को बाहर की तरफ न घुमाएं; दोनों कूल्हे जमीन के समानांतर रहें।',
      ],
      gu: [
        'કમરમાંથી કૂબડું ન વાળો, પીઠ સીધી રાખો.',
        'થાપો બહારની તરફ ખોલશો નહીં; બંને થાપા જમીન તરફ સીધા રહેવા જોઈએ.',
      ],
    },
    targetMuscles: ['Biceps Femoris (Hamstring)', 'Gluteus Maximus', 'Erector Spinae'],
    animationType: 'athletic_deadlift',
  },
];
