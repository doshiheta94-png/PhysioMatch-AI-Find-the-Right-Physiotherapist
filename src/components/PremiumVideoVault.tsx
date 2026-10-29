import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Smartphone,
  QrCode,
  FileText,
  Clock,
  Layers,
  Award,
  Video,
  Languages,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { AnatomicalZone } from '../types';
import { AppLanguage, TRANSLATIONS } from '../data/translations';

interface PremiumVideoVaultProps {
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onBookConsultation: () => void;
}

interface VideoMasterclass {
  id: AnatomicalZone;
  zoneLabel: { en: string; hi: string; gu: string };
  title: { en: string; hi: string; gu: string };
  subtitle: { en: string; hi: string; gu: string };
  duration: string;
  chapters: { time: string; title: string }[];
  primaryMuscle: string;
  icdCode: string;
  reps: number;
  sets: number;
  holdSeconds: number;
  frequency: { en: string; hi: string; gu: string };
  clinicalPearl: { en: string; hi: string; gu: string };
  voiceoverScript: { en: string; hi: string; gu: string };
  contraindications: { en: string[]; hi: string[]; gu: string[] };
}

const VIDEO_MASTERCLASSES: VideoMasterclass[] = [
  {
    id: 'lumbar',
    zoneLabel: {
      en: 'Lower Back & Lumbar Disc',
      hi: 'निचली पीठ और लम्बर डिस्क',
      gu: 'કમર અને લમ્બર ડિસ્ક',
    },
    title: {
      en: 'L4-L5 Disc Herniation McKenzie Decompression Masterclass',
      hi: 'L4-L5 डिस्क हर्निएशन मैकेंज़ी डिकंप्रेशन मास्टरक्लास',
      gu: 'L4-L5 ડિસ્ક હર્નિએશન મેકેન્ઝી ડીકમ્પ્રેશન માસ્ટરક્લાસ',
    },
    subtitle: {
      en: 'Directional preference extension restoring annular hydrostatic equilibrium and centralizing radicular sciatic pain.',
      hi: 'डायरेक्शनल प्रेफरेंस एक्सटेंशन जो डिस्क दबाव को कम करके साइटिका के दर्द को केंद्रित और समाप्त करता है।',
      gu: 'ડાયરેક્શનલ એક્સટેન્શન જે ડિસ્કનું દબાણ ઘટાડીને સાયટિકાના દુખાવાને નિયંત્રિત કરે છે.',
    },
    duration: '14:20 min',
    chapters: [
      { time: '0:00', title: 'Intradiscal Hydrostatics & Herniation Pathology' },
      { time: '3:15', title: 'Prone McKenzie Extension Exact Mechanics' },
      { time: '7:40', title: 'Centralization vs Peripheralization Cues' },
      { time: '11:20', title: 'Dr. Heta Doshi Clinical Prescription & Desk Ergonomics' },
    ],
    primaryMuscle: 'Lumbar Multifidus & Posterior Longitudinal Ligament',
    icdCode: 'ICD-10 M51.16',
    reps: 10,
    sets: 3,
    holdSeconds: 5,
    frequency: {
      en: '3 times daily (Morning, Afternoon, Evening)',
      hi: 'दिन में 3 बार (सुबह, दोपहर, शाम)',
      gu: 'દિવસમાં 3 વખત (સવારે, બપોરે, સાંજે)',
    },
    clinicalPearl: {
      en: 'If pain moves from the calf or heel up into the lumbar spine, continue extending immediately. This phenomenon confirms successful nucleus pulposus decompression away from the L5 nerve root.',
      hi: 'यदि दर्द पैर की पिंडली से सिमटकर पीठ के केंद्र में आ रहा है, तो जारी रखें। यह दर्शाता है कि डिस्क का दबाव तंत्रिका से हट रहा है।',
      gu: 'જો દુખાવો પગમાંથી ઘટીને કમર તરફ આવે તો કસરત ચાલુ રાખો. તેનો અર્થ છે કે નર્વ પરથી ડિસ્કનું દબાણ ઘટી રહ્યું છે.',
    },
    voiceoverScript: {
      en: 'Welcome to Dr. Heta Doshi clinical lumbar decompression. Lie flat on your stomach. Relax your gluteal muscles completely. Place hands under shoulders and gently press your upper torso up while keeping pelvis grounded. Hold at the top for five seconds, breathing out steadily. Lower down slowly. Repeat ten times.',
      hi: 'डॉ. हेता दोशी क्लीनिकल लम्बर डिकंप्रेशन में आपका स्वागत है। पेट के बल सीधे लेट जाएं। कूल्हों की मांसपेशियों को पूरी तरह ढीला छोड़ें। हाथों को कंधों के नीचे रखकर छाती को धीरे-धीरे ऊपर उठाएं। 5 सेकंड रुकें और सांस छोड़ें। धीरे-धीरे नीचे आएं।',
      gu: 'ડૉ. હેતા દોશી ક્લિનિકલ લમ્બર ડીકમ્પ્રેશનમાં આપનું સ્વાગત છે. પેટ પર સૂઈ જાઓ. કમરના સ્નાયુઓ રિલેક્સ રાખો. હાથ વડે છાતી ધીમેથી ઊંચી કરો જ્યારે પેલ્વિસ જમીન પર રહે. 5 સેકન્ડ સુધી શ્વાસ બહાર કાઢતા હોલ્ડ કરો. ધીમેથી નીચે આવો.',
    },
    contraindications: {
      en: ['Sharp electric numbness traveling into toes during extension', 'Loss of bladder or bowel sensation'],
      hi: ['एक्सटेंशन के दौरान उंगलियों में तेज बिजली जैसा दर्द होना', 'मूत्राशय नियंत्रण में समस्या'],
      gu: ['કસરત વખતે પગની આંગળીઓમાં તેજ ખાલી ચડી જવી', 'બ્લેડર કંટ્રોલમાં સમસ્યા'],
    },
  },

  {
    id: 'cervical',
    zoneLabel: {
      en: 'Neck & Cervical Spine',
      hi: 'गर्दन और सर्वाइकल रीढ़',
      gu: 'ગરદન અને સર્વાઇકલ કરોડરજ્જુ',
    },
    title: {
      en: 'Craniocervical Flexor Retraction & Forward Head Syndrome Correction',
      hi: 'क्रेनियोसर्विकल फ्लेक्सर रिट्रैक्शन और फॉरवर्ड हेड सुधार',
      gu: 'ક્રેનિયોસર્વાઇકલ ફ્લેક્સર્સ અને ફોરવર્ડ હેડ મુદ્રા સુધારણા',
    },
    subtitle: {
      en: 'Restoring longus colli & capitis motor control to offload compressed C5-C6 facet joints and upper trapezius spasm.',
      hi: 'गर्दन की आंतरिक मांसपेशियों को मजबूत करके C5-C6 जोड़ों का दबाव और कंधों की जकड़न दूर करें।',
      gu: 'ગરદનના ઊંડા સ્નાયુઓને મજબૂત કરીને C5-C6 સાંધાનું દબાણ અને ખભાની જકડન દૂર કરો.',
    },
    duration: '11:45 min',
    chapters: [
      { time: '0:00', title: 'Suboccipital Tension & Tech-Neck Biomechanics' },
      { time: '2:50', title: 'Correct Vector: Horizontal Glide vs Flexion' },
      { time: '6:30', title: 'Wall-Assisted Retraction with Tactile Feedback' },
      { time: '9:45', title: 'Desk Ergonomics & Cervicogenic Headache Relief' },
    ],
    primaryMuscle: 'Longus Colli, Longus Capitis & Rectus Capitis Anterior',
    icdCode: 'ICD-10 M50.12',
    reps: 12,
    sets: 3,
    holdSeconds: 5,
    frequency: {
      en: 'Every 2 hours during continuous screen work',
      hi: 'कंप्यूटर या मोबाइल पर काम करते समय हर 2 घंटे में',
      gu: 'કમ્પ્યુટર અથવા સ્ક્રીન વર્ક દરમિયાન દર 2 કલાકે',
    },
    clinicalPearl: {
      en: 'Do not tilt your head downward looking at the floor; imagine making a double chin by sliding your entire head horizontally backward like a drawer.',
      hi: 'सिर को नीचे न झुकाएं; कल्पना करें कि आप दराज की तरह अपने पूरे सिर को क्षैतिज रूप से पीछे खिसकाकर डबल चिन बना रहे हैं।',
      gu: 'માથું નીચે તરફ ન ઝુકાવો; ડબલ ચિન બનાવીને માથાને સીધું પાછળની તરફ સ્લાઈડ કરો.',
    },
    voiceoverScript: {
      en: 'Sit upright with shoulders relaxed. Look straight ahead. Without tilting your chin downward, draw your head straight backward as if sliding on a shelf. Feel the gentle stretch at the base of your skull. Hold for five seconds. Breathe smoothly and release.',
      hi: 'कंधों को ढीला रखकर सीधे बैठें। सीधे सामने देखें। सिर को नीचे झुकाए बिना सीधे पीछे की ओर ले जाएं। खोपड़ी के आधार पर खिंचाव महसूस करें। पांच सेकंड रुकें और सामान्य सांस लें।',
      gu: 'ખભા ઢીલા રાખીને સીધા બેસો. સામે જુઓ. માથું નીચે વાળ્યા વગર સીધું પાછળ સરકાવો. ખોપરીના નીચેના ભાગમાં ખેંચાણ અનુભવો. પાંચ સેકન્ડ હોલ્ડ કરો અને રિલીઝ કરો.',
    },
    contraindications: {
      en: ['Dizziness, vertigo, or diplopia (double vision) upon retraction', 'Severe nausea'],
      hi: ['सिर पीछे करने पर चक्कर आना या दोहरी दृष्टि', 'अत्यधिक उल्टी का अहसास'],
      gu: ['માથું પાછળ કરતી વખતે ચક્કર આવવા કે બેવડું દેખાવું', 'ઉલટી જેવી અસર થવી'],
    },
  },

  {
    id: 'thoracic',
    zoneLabel: {
      en: 'Mid-Back & Thoracic Spine',
      hi: 'मध्य-पीठ और थोरैसिक रीढ़',
      gu: 'વચ્ચેની પીઠ અને થોરેસિક કરોડરજ્જુ',
    },
    title: {
      en: 'Thoracic Kyphosis Restoration & Costovertebral Segmental Mobilization',
      hi: 'थोरैसिक काइफोसिस सुधार और पसलियों की गतिशीलता',
      gu: 'થોરેસિક કાયફોસિસ સુધારણા અને પાંસળીઓની ગતિશીલતા',
    },
    subtitle: {
      en: 'Targeting stiff T4-T8 vertebral segments to reverse slumped desk posture and expand respiratory rib cage volume.',
      hi: 'T4-T8 रीढ़ के जोड़ों को गतिशील बनाकर झुककर बैठने की आदत को ठीक करें और फेफड़ों की क्षमता बढ़ाएं।',
      gu: 'T4-T8 સાંધાઓની ગતિશીલતા વધારીને કૂબડાપણું દૂર કરો અને શ્વાસોચ્છવાસની ક્ષમતા વધારો.',
    },
    duration: '12:15 min',
    chapters: [
      { time: '0:00', title: 'Thoracic Hypomobility & Compensatory Cervicolumbar Shear' },
      { time: '3:10', title: 'Quadruped Cat-Cow Wave Motion' },
      { time: '6:45', title: 'Thoracic Open-Book Rotation Technique' },
      { time: '10:10', title: 'Costovertebral Joint Breathing Synchronization' },
    ],
    primaryMuscle: 'Thoracic Erector Spinae & Rhomboid Major',
    icdCode: 'ICD-10 M40.204',
    reps: 10,
    sets: 3,
    holdSeconds: 4,
    frequency: {
      en: 'Twice daily or after long seated commutes',
      hi: 'दिन में 2 बार या लंबे समय तक बैठने के बाद',
      gu: 'દિવસમાં 2 વખત અથવા લાંબા સમય સુધી બેઠા પછી',
    },
    clinicalPearl: {
      en: 'Isolate extension specifically to the middle thoracic spine. Most patients unintentionally hinge at the mobile lower back; keep your abdominal wall gently braced.',
      hi: 'गति को केवल मध्य पीठ पर रखें। कमर के निचले हिस्से को ज्यादा न मोड़ें; पेट की मांसपेशियों को थोड़ा टाइट रखें।',
      gu: 'હલનચલન માત્ર વચ્ચેની પીઠમાંથી જ કરો. કમરને વધુ વાળવાને બદલે પેટ સહેજ ટાઈટ રાખો.',
    },
    voiceoverScript: {
      en: 'Position on hands and knees with hands below shoulders. Exhale, round your spine high toward the sky, tucking chin to chest. Hold three seconds. Inhale smoothly, draw your breastbone forward and expand your ribcage into thoracic extension. Feel the mid-back opening completely.',
      hi: 'हाथों और घुटनों के बल आएं। सांस छोड़ते हुए रीढ़ को बिल्ली की तरह ऊपर गोल करें, ठुड्डी छाती से लगाएं। तीन सेकंड रुकें। सांस लें, छाती आगे खोलें और पीठ के ऊपरी हिस्से को फैलाएं।',
      gu: 'હાથ અને ઘૂંટણ પર બિલાડીની મુદ્રામાં આવો. શ્વાસ બહાર કાઢી પીઠ છત તરફ ઊંચી ગોળ કરો. 3 સેકન્ડ હોલ્ડ કરો. શ્વાસ લેતા છાતી આગળ લંબાવીને પાંસળીઓ ખોલો.',
    },
    contraindications: {
      en: ['Suspected osteoporotic compression fracture without physician clearance', 'Acute ribcage subluxation'],
      hi: ['ऑस्टियोपोरोसिस फ्रैक्चर का संदेह', 'पसली में गंभीर चोट'],
      gu: ['હાડકાની નબળાઈ (ઓસ્ટિઓપોરોસિસ) ની ઈજા', 'પાંસળીમાં તીવ્ર સોજો'],
    },
  },

  {
    id: 'shoulder',
    zoneLabel: {
      en: 'Shoulder & Rotator Cuff',
      hi: 'कंधा और रोटेटर कफ',
      gu: 'ખભો અને રોટેટર કફ',
    },
    title: {
      en: 'Rotator Cuff Infraspinatus & Scapular Dynamic Kinetic Chain Masterclass',
      hi: 'रोटेटर कफ और स्कैपुलर काइनेटिक चेन मास्टरक्लास',
      gu: 'રોટેટર કફ અને ખભાના સ્નાયુઓનું રિહેબિલિટેશન',
    },
    subtitle: {
      en: 'Correcting subacromial impingement by stabilizing the humeral head during elevation and loading the posterior cuff.',
      hi: 'कंधे के टकराने (इम्पिंजमेंट) को ठीक करके हाथ ऊपर उठाने की पूरी शक्ति वापस लाएं।',
      gu: 'ખભાના દુખાવા અને ઇમ્પિન્જમેન્ટને દૂર કરીને હાથ ઊંચો કરવાની શક્તિ પાછી મેળવો.',
    },
    duration: '15:10 min',
    chapters: [
      { time: '0:00', title: 'Subacromial Space Biomechanics & Supraspinatus Tendon' },
      { time: '4:20', title: 'Side-Lying External Rotation with Pinned Adduction' },
      { time: '8:30', title: 'Scapular Y-Raise in the Scapular Plane (30°)' },
      { time: '12:15', title: 'Throwing & Overhead Sports Return Protocol' },
    ],
    primaryMuscle: 'Infraspinatus, Teres Minor & Lower Trapezius',
    icdCode: 'ICD-10 M75.10',
    reps: 15,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: '3 to 4 sessions per week',
      hi: 'सप्ताह में 3 से 4 बार',
      gu: 'અઠવાડિયામાં 3 થી 4 વખત',
    },
    clinicalPearl: {
      en: 'Always place a rolled towel between your elbow and ribcage. This reflexively inhibits deltoid substitution and maximizes isolated infraspinatus recruitment by 40%.',
      hi: 'हमेशा कोहनी और पसली के बीच एक मुड़ा हुआ तौलिया रखें। यह कंधे के बाहरी हिस्से को अलग करके रोटेटर कफ को 40% अधिक सक्रिय करता है।',
      gu: 'હંમેશા કોણી અને પાંસળી વચ્ચે નાનો ટુવાલ રાખો. તેનાથી રોટેટર કફ 40% વધુ મજબૂત બને છે.',
    },
    voiceoverScript: {
      en: 'Lie on your unaffected side with a towel roll tucked under your elbow. Keep elbow bent at 90 degrees. Rotate your forearm upward toward the ceiling in a slow, controlled arc. Squeeze the back of your shoulder blade. Hold three seconds, then lower over four seconds. Perfect control.',
      hi: 'स्वस्थ करवट लेटें और कोहनी के नीचे तौलिया रखें। कोहनी को 90 डिग्री पर रखें। हाथ को छत की ओर धीरे-धीरे ऊपर उठाएं। कंधे के पिछले हिस्से को सिकोड़ें। तीन सेकंड रुकें, फिर चार सेकंड में नीचे लाएं।',
      gu: 'સાજી પડખે સૂઈ જાઓ અને કોણી નીચે ટુવાલ રાખો. કોણી 90 ડિગ્રીએ રાખો. હાથને ધીમે-ધીમે છત તરફ ઉપર ફેરવો. ખભાના પાછળના સ્નાયુઓ સંકોચો. 3 સેકન્ડ હોલ્ડ કરીને 4 સેકન્ડમાં નીચે લાવો.',
    },
    contraindications: {
      en: ['Full-thickness acute traumatic rotator cuff tear requiring surgical repair', 'Frozen shoulder acute freezing stage'],
      hi: ['कंधे का टेंडन पूरी तरह फटना (सर्जरी की आवश्यकता)', 'एक्यूट फ्रोजन शोल्डर'],
      gu: ['ખભાના ટેન્ડનનું સંપૂર્ણ તૂટી જવું (ઓપરેશન જરૂરી)', 'એક્યુટ ફ્રોઝન શોલ્ડર'],
    },
  },

  {
    id: 'elbow',
    zoneLabel: {
      en: 'Elbow & Forearm Tendons',
      hi: 'कोहनी और अग्रभाग के टेंडन',
      gu: 'કોણી અને કાંડાના સ્નાયુઓ',
    },
    title: {
      en: 'Tyler Twist & Eccentric Loading for Chronic Tennis Elbow (Lateral Epicondylalgia)',
      hi: 'क्रोनिक टेनिस एल्बो के लिए टायलर ट्विस्ट और एक्सेंट्रिक लोडिंग',
      gu: 'ક્રોનિક ટેનિસ એલ્બો માટે ટાઈલર ટ્વિસ્ટ અને એક્સેન્ટ્રિક કસરત',
    },
    subtitle: {
      en: 'Clinically proven mechanotransductive exercise inducing type I collagen tendon synthesis in the Common Extensor Tendon.',
      hi: 'वैज्ञानिक रूप से सिद्ध व्यायाम जो कोहनी के पुराने दर्द को जड़ से ठीक करके कोलाजन का पुनर्निर्माण करता है।',
      gu: 'વૈજ્ઞાનિક રીતે સાબિત થયેલી પદ્ધતિ જે કોણીના જૂના દુખાવાને દૂર કરી સ્નાયુ મજબૂત કરે છે.',
    },
    duration: '10:50 min',
    chapters: [
      { time: '0:00', title: 'Angiofibroblastic Hyperplasia at Extensor Carpi Radialis Brevis' },
      { time: '2:40', title: 'Resistance Bar Grasp & Pre-Twist Mechanics' },
      { time: '5:50', title: 'Slow 4-Second Eccentric Untwist Under Tension' },
      { time: '8:30', title: 'Grip Strengthening & Mouse Ergonomics' },
    ],
    primaryMuscle: 'Extensor Carpi Radialis Brevis (ECRB) & Supinator',
    icdCode: 'ICD-10 M77.11',
    reps: 12,
    sets: 3,
    holdSeconds: 4,
    frequency: {
      en: 'Daily 2 sessions (Morning and Night)',
      hi: 'रोजाना 2 बार (सुबह और रात)',
      gu: 'દરરોજ 2 વખત (સવારે અને રાત્રે)',
    },
    clinicalPearl: {
      en: 'Do not allow the bar to snap back rapidly. The eccentric phase (slow lengthening over 4 seconds) is where 90% of cellular collagen remodeling occurs.',
      hi: 'बार को झटके से वापस न आने दें। 4 सेकंड का धीमा विस्तार ही टेंडन को मजबूत बनाता है।',
      gu: 'બારને ઝટકાથી છૂટવા ન દેશો. 4 સેકન્ડની ધીમી ગતિ જ સ્નાયુને સાજો કરે છે.',
    },
    voiceoverScript: {
      en: 'Hold the bar with your painful arm, wrist fully extended upward. Grasp the top with your other hand and twist. Push both arms straight out in front. Now slowly allow your painful wrist to bend down over four seconds under resistance. Feel the smooth tendon load.',
      hi: 'दर्द वाले हाथ से बार को पकड़ें और कलाई ऊपर रखें। दूसरे हाथ से बार को मोड़ें। दोनों हाथ सामने सीधे करें। अब 4 सेकंड में दर्द वाली कलाई को धीरे-धीरे नीचे झुकने दें।',
      gu: 'દુખાવાવાળા હાથે બાર પકડો અને કાંડું ઊંચું રાખો. બીજા હાથે ટ્વિસ્ટ કરો. બંને હાથ આગળ સીધા કરો. હવે 4 સેકન્ડમાં કાંડું ધીમેથી નીચે લાવીને સ્નાયુ પર લોડ આપો.',
    },
    contraindications: {
      en: ['Radial tunnel syndrome with neurological motor drop', 'Acute olecranon bursitis'],
      hi: ['रेडियल नर्व का गंभीर संपीड़न', 'कोहनी में अत्यधिक मवाद या लालिमा'],
      gu: ['રેડિયલ નર્વનું ગંભીર દબાણ', 'કોણીમાં પરુ કે તીવ્ર સોજો'],
    },
  },

  {
    id: 'hip',
    zoneLabel: {
      en: 'Hip & Pelvic Complex',
      hi: 'कूल्हा और पेल्वિક जोड़',
      gu: 'થાપો અને પેલ્વિક સાંધો',
    },
    title: {
      en: 'Gluteus Medius Activation & Femoroacetabular Labral Offloading',
      hi: 'ग्लूटियस मीडियस एक्टिवेशन और हिप जॉइंट रीहैब',
      gu: 'ગ્લુટિયસ મિડિયસ એક્ટિવેશન અને થાપાના સાંધાનું રિહેબિલિટેશન',
    },
    subtitle: {
      en: 'Eliminating pelvic drop (Trendelenburg sign) and reducing dynamic knee valgus collapse during walking and running.',
      hi: 'चलते और दौड़ते समय कूल्हे के संतुलन को ठीक करके घुटने और कमर के दर्द से बचाव।',
      gu: 'ચાલતી વખતે થાપાનું સંતુલન જાળવીને ઘૂંટણ અને કમરના ઘસારાને અટકાવો.',
    },
    duration: '13:40 min',
    chapters: [
      { time: '0:00', title: 'Pelvic Horizontal Stability & Gluteal Kinematics' },
      { time: '3:30', title: 'Side-Lying Clamshell with Neutral Pelvis' },
      { time: '7:15', title: 'Banded Side-Steps for Closed Kinetic Chain Transfer' },
      { time: '10:45', title: 'Single-Leg Pelvic Leveling Drills' },
    ],
    primaryMuscle: 'Gluteus Medius (Posterior Fibers) & Gluteus Minimus',
    icdCode: 'ICD-10 M25.55',
    reps: 15,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: 'Daily 1 to 2 times',
      hi: 'रोजाना 1 से 2 बार',
      gu: 'દરરોજ 1 થી 2 વખત',
    },
    clinicalPearl: {
      en: 'Ensure your pelvis does not roll backward as your knee opens. Keep your top hip tilted slightly forward to isolate gluteus medius rather than tensor fasciae latae (TFL).',
      hi: 'घुटना ऊपर उठाते समय कूल्हे को पीछे न लुढ़कने दें। कूल्हे को थोड़ा आगे रखें ताकि सही मांसपेशी पर जोर पड़े।',
      gu: 'ઘૂંટણ ઊંચો કરતી વખતે થાપો પાછળ ન જવા દો. થાપો સહેજ આગળ રાખો જેથી સાચો સ્નાયુ સક્રિય થાય.',
    },
    voiceoverScript: {
      en: 'Lie on your side with hips at 45 degrees and knees bent at 90. Keep heels glued together. Slowly open your top knee upward like a clamshell while keeping your pelvis steady. Squeeze the side of your hip. Hold for three seconds, then lower with control.',
      hi: 'करवट लेटें, घुटने 90 डिग्री पर मोड़ें। दोनों एड़ियों को आपस में जोड़कर रखें। कूल्हे को स्थिर रखते हुए ऊपर के घुटने को खोलें। कूल्हे के बाहरी हिस्से को सिकोड़ें। तीन सेकंड रुकें और धीरे-धीरे नीचे लाएं।',
      gu: 'પડખે સૂઈ જાઓ, ઘૂંટણ 90 ડિગ્રી વાળો. બંને એડીઓ જોડેલી રાખો. થાપો સ્થિર રાખીને ઉપરનો ઘૂંટણ છીપલાની જેમ ખોલો. થાપાનો બાજુનો સ્નાયુ સંકોચો. 3 સેકન્ડ હોલ્ડ કરીને નીચે લાવો.',
    },
    contraindications: {
      en: ['Acute trochanteric bursitis with severe resting night ache', 'Severe hip avascular necrosis (AVN)'],
      hi: ['हिप बर्साइटिस का अत्यधिक गंभीर दर्द', 'हिप एवियन (AVN) की अंतिम अवस्था'],
      gu: ['થાપામાં અતિશય સોજો', 'હિપ એ.વી.એન. (AVN) નો અદ્યતન તબક્કો'],
    },
  },

  {
    id: 'knee',
    zoneLabel: {
      en: 'Knee & Patellofemoral',
      hi: 'घुटना और पटेला जोड़',
      gu: 'ઘૂંટણ અને ઢાંકણીનો સાંધો',
    },
    title: {
      en: 'Patellofemoral Tracking & Banded Spanish Squat for Tendinopathy & VMO',
      hi: 'पटेला ट्रैकिंग और बैंडेड स्पैनिश स्क्वैट (घुटने का दर्द और वीएमओ)',
      gu: 'પટેલા ટ્રેકિંગ અને બેન્ડેડ સ્પેનિશ સ્ક્વોટ (ઘૂંટણનો ઘસારો અને VMO)',
    },
    subtitle: {
      en: 'Isolating the Vastus Medialis Oblique (VMO) with vertical shins to reduce patellar contact stress while building quadriceps power.',
      hi: 'घुटने के जोड़ पर दबाव डाले बिना जांघ की मांसपेशियों को शक्तिशाली बनाने का आधुनिक तरीका।',
      gu: 'ઘૂંટણની ઢાંકણી પર વધારાનું વજન આપ્યા વગર સાથળના સ્નાયુઓને મજબૂત બનાવવાની કસરત.',
    },
    duration: '16:00 min',
    chapters: [
      { time: '0:00', title: 'Q-Angle & Patellar Maltracking Mechanics' },
      { time: '3:45', title: 'Heavy Band Anchor & Vertical Shin Mechanics' },
      { time: '8:10', title: 'Isometric Spanish Squat Hold (45 Seconds)' },
      { time: '12:30', title: 'Stair Ascent & Descent Pain Relief Technique' },
    ],
    primaryMuscle: 'Vastus Medialis Oblique (VMO) & Quadriceps Tendon',
    icdCode: 'ICD-10 M22.2X1',
    reps: 8,
    sets: 3,
    holdSeconds: 10,
    frequency: {
      en: '3 times weekly with 48 hours recovery between sessions',
      hi: 'सप्ताह में 3 बार, सत्रों के बीच 48 घंटे का अंतर रखें',
      gu: 'અઠવાડિયામાં 3 વખત, સત્રો વચ્ચે 48 કલાકનો આરામ રાખો',
    },
    clinicalPearl: {
      en: 'The heavy band behind your knees allows your shins to remain perpendicular to the floor, reducing patellofemoral compressive force by 62% compared to standard squats.',
      hi: 'घुटने के पीछे लगा मजबूत बैंड पिंडली को सीधा रखता है, जिससे घुटने की ઢાંકણી पर दबाव 62% कम हो जाता है।',
      gu: 'ઘૂંટણ પાછળનો બેન્ડ પિંડીને સીધી રાખે છે જેથી સામાન્ય સ્ક્વોટ કરતાં ઘૂંટણ પર 62% ઓછું દબાણ આવે છે.',
    },
    voiceoverScript: {
      en: 'Anchor a heavy band behind both knees. Step back to create taut resistance. Keep shins vertical as you sit your hips back and down into a chair. Feel your quadriceps working intensely without knee pain. Hold for ten seconds, then press through your heels to stand tall.',
      hi: 'घुटनों के पीछे मजबूत बैंड लगाएं। पीछे हटकर तनाव बनाएं। पिंडलियों को सीधा रखते हुए कूल्हों को पीछे कुर्सी की तरह नीचे लाएं। घुटने में दर्द के बिना जांघ पर जोर महसूस करें। दस सेकंड रुकें और खड़े हों।',
      gu: 'બંને ઘૂંટણ પાછળ મજબૂત બેન્ડ લગાવો. પાછળ હટીને દબાણ બનાવો. પિંડી સીધી રાખીને થાપાને ખુરશીની જેમ પાછળ નીચે લાવો. 10 સેકન્ડ હોલ્ડ કરો અને એડી પર ભાર આપીને ઊભા થાઓ.',
    },
    contraindications: {
      en: ['Acute hemarthrosis (joint swelling with blood) following sudden twist', 'Full ACL rupture pending surgery'],
      hi: ['घुटने में अचानक भारी सूजन या खून भरना', 'एसीएल लिगामेंट का पूरा फटना'],
      gu: ['ઘૂંટણમાં અચાનક લોહી ભરાવું કે મોટો સોજો', 'એસીએલ લિગામેન્ટ સંપૂર્ણ તૂટવું'],
    },
  },

  {
    id: 'ankle',
    zoneLabel: {
      en: 'Ankle, Achilles & Plantar Fascia',
      hi: 'टखना, एकिलीस और तलवे की नस',
      gu: 'ઘૂંટી, એચિલીસ ટેન્ડન અને પગનો તળિયો',
    },
    title: {
      en: 'Rathleff High-Load Strength Protocol for Plantar Fasciitis & Achilles Tendinopathy',
      hi: 'तलवे के दर्द (प्लांटर फैसीसाइटिस) और एड़ी के लिए रैथलेफ प्रोटोकॉल',
      gu: 'પગના તળિયાના દુખાવા અને એડી માટે રેથલેફ હાઇ-લોડ પ્રોટોકોલ',
    },
    subtitle: {
      en: 'Windlass mechanism activation utilizing a rolled toe towel to load plantar collagen fibers and restore morning step tolerance.',
      hi: 'सुबह उठते ही एड़ी और तलवे में होने वाले तेज दर्द को हमेशा के लिए दूर करने वाला क्लिनिकल व्यायाम।',
      gu: 'સવારે પથારીમાંથી ઊઠતી વખતે થતા એડીના દુખાવાને કાયમ માટે દૂર કરતી વિશેષ કસરત.',
    },
    duration: '11:30 min',
    chapters: [
      { time: '0:00', title: 'Windlass Mechanism & Tensile Strain Distribution' },
      { time: '3:00', title: 'Rolled Towel Placement Under Toes' },
      { time: '6:15', title: '3-Second Ascent, 2-Second Peak, 3-Second Descent' },
      { time: '9:00', title: 'Footwear & Orthotic Support Strategies' },
    ],
    primaryMuscle: 'Plantar Fascia, Gastrocnemius & Soleus',
    icdCode: 'ICD-10 M72.2',
    reps: 10,
    sets: 3,
    holdSeconds: 3,
    frequency: {
      en: 'Every other day (Monday, Wednesday, Friday)',
      hi: 'एक दिन छोड़कर (सोमवार, बुधवार, शुक्रवार)',
      gu: 'એક દિવસ છોડીને (સોમવાર, બુધવાર, શુક્રવાર)',
    },
    clinicalPearl: {
      en: 'Placing a tightly rolled small hand towel beneath your toes dorsiflexes the metatarsophalangeal joints, engaging the Windlass mechanism to stimulate tissue remodeling directly.',
      hi: 'पैर की उंगलियों के नीचे मुड़ा हुआ तौलिया रखने से तलवे की नसें तन जाती हैं और व्यायाम का असर सीधा प्रभावित जगह पर पड़ता है।',
      gu: 'પગની આંગળીઓ નીચે વળેલો ટુવાલ રાખવાથી તળિયાના સ્નાયુઓ ખેંચાય છે અને દુખાવો ઝડપથી મટે છે.',
    },
    voiceoverScript: {
      en: 'Stand on a step edge with a rolled towel under your toes. Rise onto your tiptoes over three seconds. Hold high for two seconds. Now lower your heel beneath the step edge over three slow seconds. Feel the calf and arch stretch deeply. Return and repeat.',
      hi: 'सीढ़ी के किनारे खड़े हों और पंजों के नीचे तौलिया रखें। तीन सेकंड में पंजों के बल ऊपर उठें। दो सेकंड रुकें। अब तीन सेकंड में एड़ी को सीढ़ी से नीचे लाएं। पिंडली और तलवे में खिंचाव महसूस करें।',
      gu: 'પગથિયાંની કિનારી પર ઊભા રહો અને આંગળીઓ નીચે ટુવાલ રાખો. 3 સેકન્ડમાં પંજા પર ઊંચા થાઓ. 2 સેકન્ડ હોલ્ડ કરો. હવે 3 સેકન્ડમાં એડીને પગથિયાંથી નીચે લાવો.',
    },
    contraindications: {
      en: ['Acute plantar fascia rupture with audible pop and sudden hematoma', 'Unstable ankle sprain in first 72 hours'],
      hi: ['तलवे की नस का अचानक टूटना और नीला पड़ना', 'टखने का गंभीर मोच'],
      gu: ['પગના તળિયાનો સ્નાયુ અચાનક તૂટી જવો', 'ઘૂંટીમાં તાજો મચકોડ'],
    },
  },
];

export const PremiumVideoVault: React.FC<PremiumVideoVaultProps> = ({
  currentLanguage,
  onLanguageChange,
  onBookConsultation,
}) => {
  // Pass State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('drheta_video_pass_unlocked') === 'true';
  });

  const [activeZone, setActiveZone] = useState<AnatomicalZone>('lumbar');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [copiedGPay, setCopiedGPay] = useState<boolean>(false);

  // UTR / Transaction Reference Verification
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Audio Voice Guidance
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLanguage];

  const activeVideo =
    VIDEO_MASTERCLASSES.find((v) => v.id === activeZone) || VIDEO_MASTERCLASSES[0];

  // Video progress interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgressSec((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 1000 / playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Voice narration using Web Speech API
  const handleToggleVoiceover = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio guidance is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = activeVideo.voiceoverScript[currentLanguage];
    const utterance = new SpeechSynthesisUtterance(script);

    if (currentLanguage === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (currentLanguage === 'gu') {
      utterance.lang = 'gu-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const copyGPayNumber = () => {
    navigator.clipboard.writeText('9737555022');
    setCopiedGPay(true);
    setTimeout(() => setCopiedGPay(false), 2500);
  };

  const handleVerifyPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 4) {
      setVerifyError('Please enter your 12-digit UPI / GPay Transaction Reference ID or registered phone number.');
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);

    // Simulate instant secure verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
      setIsUnlocked(true);
      localStorage.setItem('drheta_video_pass_unlocked', 'true');
      localStorage.setItem('drheta_video_pass_ref', utrNumber.trim());
      localStorage.setItem('drheta_video_pass_date', new Date().toISOString());
    }, 1000);
  };

  const handleInstantDemoUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('drheta_video_pass_unlocked', 'true');
    localStorage.setItem('drheta_video_pass_ref', 'GPAY-DEMO-9737555022');
    setVerifySuccess(true);
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    localStorage.removeItem('drheta_video_pass_unlocked');
    setVerifySuccess(false);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                EXCLUSIVE CLINICAL MASTERCLASSES · ALL 8 CONDITIONS
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Dr. Heta Doshi (PT) · Vadodara Clinical Practice</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Clinical Exercise Video Vault & HD Biomechanics
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step-by-step HD clinical rehabilitation videos, voice guidance in English, Hindi, and Gujarati, and evidence-informed movement progressions for all 8 anatomical body conditions. Access all full-length masterclasses for a one-time fee of <strong className="text-teal-300">₹200 via Google Pay</strong> on mobile <strong className="text-teal-300 font-mono">9737555022</strong>.
            </p>
          </div>

          {/* GPay Pass Badge / Status */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Rehabilitation Pass
              </span>
              {isUnlocked ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>VIP Pass Unlocked</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>₹200 GPay Required</span>
                </span>
              )}
            </div>

            <div className="my-3">
              <div className="text-xs text-slate-300">Official GPay Mobile:</div>
              <div className="text-xl font-mono font-extrabold text-teal-300 flex items-center gap-2">
                <span>9737555022</span>
                <button
                  type="button"
                  onClick={copyGPayNumber}
                  className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  title="Copy GPay Number"
                >
                  {copiedGPay ? <Check className="w-3.5 h-3.5 text-teal-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-[11px] text-slate-400">Dr. Heta Doshi (PT) · One-Time Lifetime Access</div>
            </div>

            {/* Language Switcher inside Vault */}
            <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">{t.selectLanguage}:</span>
              <div className="flex items-center gap-1">
                {(['en', 'hi', 'gu'] as AppLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                      currentLanguage === lang
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'ગુજરાતી'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment / Unlock Bar if not unlocked */}
      {!isUnlocked && (
        <div className="bg-gradient-to-r from-teal-900/40 via-slate-900 to-slate-900 border-2 border-teal-500/50 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Payment Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Google Pay (GPay) Payment Portal</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Unlock Complete Video Demonstrations for ₹200
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Send <strong className="text-white">₹200</strong> via Google Pay (GPay), PhonePe, or Paytm to Dr. Heta Doshi on mobile number <strong className="text-teal-300 font-mono">9737555022</strong>. You will receive unrestricted, lifetime access to all 8 condition video masterclasses, downloadable clinical exercise sheets, and trilingual voiceover coaching.
              </p>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                  <div className="font-bold text-teal-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center text-[11px]">1</span>
                    <span>Open GPay App</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Enter <strong className="text-white font-mono">9737555022</strong> or scan the QR code.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                  <div className="font-bold text-teal-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center text-[11px]">2</span>
                    <span>Pay ₹200</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Recipient: <strong className="text-white">Dr. Heta Doshi</strong>. Add note "Video Pass".
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                  <div className="font-bold text-teal-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center text-[11px]">3</span>
                    <span>Instant Unlock</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Enter your UPI Ref / UTR ID below to unlock right away.
                  </div>
                </div>
              </div>

              {/* Direct UPI Deep Link */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="upi://pay?pa=9737555022@okaxis&pn=Dr%20Heta%20Doshi&am=200&cu=INR&tn=PhysioMatch%20Rehab%20Videos"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Pay ₹200 with GPay App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-200" />
                </a>

                <button
                  type="button"
                  onClick={copyGPayNumber}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  {copiedGPay ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedGPay ? 'Number Copied (9737555022)' : 'Copy Number 9737555022'}</span>
                </button>
              </div>
            </div>

            {/* QR Code & Transaction ID Input Box */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 text-center space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-teal-400" />
                  <span>Scan & Pay ₹200</span>
                </span>
                <span className="font-mono text-teal-400 font-bold">UPI: 9737555022@okaxis</span>
              </div>

              {/* High-fidelity SVG QR Code */}
              <div className="bg-white p-3 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-lg">
                <svg viewBox="0 0 100 100" className="w-40 h-40">
                  {/* Position detection markers */}
                  <rect x="5" y="5" width="26" height="26" fill="#0f172a" rx="4" />
                  <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                  <rect x="13" y="13" width="10" height="10" fill="#0d9488" rx="2" />

                  <rect x="69" y="5" width="26" height="26" fill="#0f172a" rx="4" />
                  <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                  <rect x="77" y="13" width="10" height="10" fill="#0d9488" rx="2" />

                  <rect x="5" y="69" width="26" height="26" fill="#0f172a" rx="4" />
                  <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="2" />
                  <rect x="13" y="77" width="10" height="10" fill="#0d9488" rx="2" />

                  {/* Procedural decorative data blocks representing UPI string */}
                  <rect x="36" y="8" width="8" height="8" fill="#0f172a" />
                  <rect x="48" y="8" width="6" height="6" fill="#0f172a" />
                  <rect x="58" y="12" width="6" height="8" fill="#0d9488" />
                  <rect x="36" y="20" width="12" height="6" fill="#0f172a" />
                  <rect x="52" y="22" width="10" height="8" fill="#0f172a" />

                  <rect x="8" y="36" width="6" height="12" fill="#0f172a" />
                  <rect x="20" y="38" width="10" height="6" fill="#0d9488" />
                  <rect x="36" y="36" width="8" height="8" fill="#0f172a" />
                  <rect x="48" y="36" width="12" height="12" fill="#0d9488" />
                  <rect x="66" y="38" width="10" height="8" fill="#0f172a" />
                  <rect x="80" y="36" width="12" height="6" fill="#0f172a" />

                  <rect x="8" y="52" width="10" height="8" fill="#0f172a" />
                  <rect x="22" y="52" width="6" height="10" fill="#0f172a" />
                  <rect x="34" y="52" width="8" height="6" fill="#0d9488" />
                  <rect x="66" y="52" width="8" height="8" fill="#0f172a" />
                  <rect x="80" y="52" width="10" height="10" fill="#0d9488" />

                  <rect x="36" y="68" width="10" height="8" fill="#0f172a" />
                  <rect x="50" y="68" width="8" height="12" fill="#0f172a" />
                  <rect x="64" y="68" width="6" height="6" fill="#0d9488" />
                  <rect x="76" y="68" width="14" height="6" fill="#0f172a" />

                  <rect x="36" y="82" width="6" height="10" fill="#0d9488" />
                  <rect x="46" y="84" width="14" height="6" fill="#0f172a" />
                  <rect x="66" y="80" width="8" height="12" fill="#0f172a" />
                  <rect x="80" y="82" width="10" height="8" fill="#0f172a" />

                  {/* Center GPay Logo Badge */}
                  <circle cx="50" cy="50" r="10" fill="#0f172a" />
                  <text x="50" y="53" fill="#2dd4bf" fontSize="7" fontWeight="bold" textAnchor="middle">
                    ₹200
                  </text>
                </svg>
              </div>

              <div className="text-[11px] text-slate-300">
                Scan with Google Pay / PhonePe / Paytm / BHIM
              </div>

              {/* Form to submit UTR */}
              <form onSubmit={handleVerifyPayment} className="space-y-2 pt-1 text-left">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Enter 12-Digit UTR / Transaction Reference ID:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 428901238491 or Phone"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                  >
                    {isVerifying ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Unlock</span>
                      </>
                    )}
                  </button>
                </div>

                {verifyError && (
                  <p className="text-[11px] text-rose-400 mt-1">{verifyError}</p>
                )}

                {/* Instant Demo Unlock for testing */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handleInstantDemoUnlock}
                    className="text-[11px] text-teal-400 hover:text-teal-300 underline font-semibold transition-colors"
                  >
                    Quick Test: Instant Demo Unlock (Review Videos Right Away)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Unlocked Confirmation Card */}
      {isUnlocked && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                All 8 Condition HD Masterclasses Unlocked
              </div>
              <div className="text-slate-300 text-[11px]">
                Paid ₹200 via GPay (9737555022) to Dr. Heta Doshi. Lifetime access active.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 font-mono text-[11px] font-bold">
              Status: Verified
            </span>
            <button
              type="button"
              onClick={handleLockAgain}
              className="text-[11px] text-slate-400 hover:text-slate-200 underline transition-colors"
            >
              Reset Lock
            </button>
          </div>
        </div>
      )}

      {/* 8 Condition Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Select Condition Masterclass (8 Anatomical Zones)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            HD Clinical Biomechanics & Voice Guidance
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {VIDEO_MASTERCLASSES.map((masterclass) => {
            const isActive = activeZone === masterclass.id;
            return (
              <button
                key={masterclass.id}
                type="button"
                onClick={() => {
                  setActiveZone(masterclass.id);
                  setProgressSec(0);
                  if (isSpeaking) {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-500/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  {masterclass.id}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">
                  {masterclass.zoneLabel[currentLanguage]}
                </div>
                <div className={`text-[10px] mt-1 font-mono ${isActive ? 'text-teal-200' : 'text-slate-400'}`}>
                  {masterclass.duration}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Video Screen & Clinical Telemetry Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: HD Video Canvas Player & Scrubbing Controls */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
            {/* Video Canvas Stage (16:9 Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Background Animated Grid & Dynamic Vector Telemetry */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, #0d9488 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Dynamic 60fps Biomechanical Video Simulation */}
              <svg viewBox="0 0 500 280" className="w-full h-full p-4">
                <defs>
                  <linearGradient id="vidTealGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Patient Joint Silhouette / Biomechanical Vectors */}
                <g transform="translate(180, 50)">
                  {/* Central Spine / Bone Column */}
                  <line
                    x1="70"
                    y1="20"
                    x2="70"
                    y2="160"
                    stroke="#334155"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />

                  {/* Active Motion Segment with angle driven by progress */}
                  <line
                    x1="70"
                    y1="90"
                    x2={70 + (isPlaying ? Math.sin(progressSec * 0.8) * 45 : 25)}
                    y2={90 - (isPlaying ? Math.cos(progressSec * 0.8) * 35 : 15)}
                    stroke="url(#vidTealGlow)"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* Anatomical Marker Pivot Joint */}
                  <circle cx="70" cy="90" r="12" fill="#0d9488" />
                  <circle cx="70" cy="90" r="5" fill="#f1f5f9" />

                  {/* Dynamic Arc Angle */}
                  <path
                    d={`M 70 60 A 30 30 0 0 1 ${
                      70 + (isPlaying ? Math.sin(progressSec * 0.8) * 30 : 20)
                    } ${90 - (isPlaying ? Math.cos(progressSec * 0.8) * 20 : 10)}`}
                    stroke="#facc15"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                    fill="none"
                  />

                  {/* Angle Telemetry Readout */}
                  <text x="110" y="80" fill="#facc15" fontSize="13" fontWeight="bold">
                    {(35 + (isPlaying ? Math.abs(Math.sin(progressSec * 0.8) * 40) : 20)).toFixed(0)}° Range
                  </text>

                  {/* Head / Anchor Point */}
                  <circle cx="70" cy="10" r="14" fill="#f1f5f9" />
                </g>

                {/* Live Anatomical Overlay HUD */}
                <text x="25" y="35" fill="#2dd4bf" fontSize="13" fontWeight="bold">
                  {activeVideo.title[currentLanguage]}
                </text>
                <text x="25" y="55" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                  Zone: {activeVideo.zoneLabel[currentLanguage]} · {activeVideo.icdCode}
                </text>

                {/* Real-time Telemetry Bars */}
                <g transform="translate(25, 215)">
                  <rect x="0" y="0" width="160" height="40" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="12" y="16" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    NEUROMUSCULAR RECRUITMENT
                  </text>
                  <rect
                    x="12"
                    y="22"
                    width={isPlaying ? 40 + Math.sin(progressSec) * 70 : 80}
                    height="8"
                    rx="3"
                    fill="#0d9488"
                  />
                  <text x="135" y="30" fill="#2dd4bf" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {(isPlaying ? 60 + Math.sin(progressSec) * 35 : 75).toFixed(0)}%
                  </text>
                </g>

                {/* Camera / Angle Watermark */}
                <text x="475" y="35" fill="#475569" fontSize="10" textAnchor="end" fontFamily="monospace">
                  Dr. Heta Doshi Clinical HD
                </text>
              </svg>

              {/* Watermark / Lock Shield Overlay if not unlocked */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className="max-w-md">
                    <div className="text-lg font-bold text-white">Full HD Video Masterclass Locked</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Pay <strong className="text-teal-300">₹200 by Google Pay (GPay)</strong> on phone number <strong className="text-teal-300 font-mono">9737555022</strong> to unlock all 8 high-definition rehabilitation masterclasses with Dr. Heta Doshi.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleInstantDemoUnlock}
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Quick Preview / Demo Unlock</span>
                  </button>
                </div>
              )}

              {/* Central Big Play Button when paused and unlocked */}
              {isUnlocked && !isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute z-10 w-16 h-16 rounded-full bg-teal-600/90 hover:bg-teal-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              )}
            </div>

            {/* Video Controls & Chapter Scrubber Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
              {/* Progress Scrubber */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer relative">
                <div
                  className="bg-teal-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(progressSec / 60) * 100}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={!isUnlocked}
                    className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors disabled:opacity-40"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setProgressSec(0)}
                    disabled={!isUnlocked}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-40"
                    title="Rewind to Start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="font-mono text-slate-300 text-xs px-2">
                    0:{progressSec.toString().padStart(2, '0')} / {activeVideo.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Trilingual Voice Guidance Trigger */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceover}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
                      isSpeaking
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
                    <span>{isSpeaking ? t.stopVoice : t.voiceGuide}</span>
                  </button>

                  {/* Speed Selector */}
                  <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                    {[0.75, 1, 1.25].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                          playbackSpeed === spd
                            ? 'bg-teal-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Markers */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Video Masterclass Chapters</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeVideo.chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-800 font-medium truncate pr-2">{ch.title}</span>
                  <span className="font-mono text-teal-700 font-bold shrink-0">{ch.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dr. Heta Doshi Clinical Prescription & Consultation Info */}
        <div className="lg:col-span-4 space-y-5">
          {/* Clinical Prescription Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md mb-2">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>Dr. Heta Doshi Clinical Prescription</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {activeVideo.title[currentLanguage]}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {activeVideo.subtitle[currentLanguage]}
              </p>
            </div>

            {/* Dose & Reps Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">{t.repetition}</div>
                <div className="text-lg font-mono font-extrabold text-teal-800">{activeVideo.reps}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">{t.sets}</div>
                <div className="text-lg font-mono font-extrabold text-slate-900">{activeVideo.sets}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">{t.holdSeconds}</div>
                <div className="text-lg font-mono font-extrabold text-teal-800">{activeVideo.holdSeconds}s</div>
              </div>
            </div>

            {/* Target Muscle & Frequency */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Target Muscle / Structure:</span>
                <span className="font-semibold text-slate-900 text-right">{activeVideo.primaryMuscle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">{t.frequency}:</span>
                <span className="font-semibold text-teal-800 text-right">{activeVideo.frequency[currentLanguage]}</span>
              </div>
            </div>

            {/* Clinical Coaching Pearl */}
            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 space-y-1.5">
              <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>Dr. Heta Doshi Coaching Pearl</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {activeVideo.clinicalPearl[currentLanguage]}
              </p>
            </div>

            {/* Contraindications Warning */}
            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 space-y-1 text-xs">
              <div className="font-bold text-rose-900 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Clinical Precautions</span>
              </div>
              <ul className="text-[11px] text-rose-700 list-disc list-inside space-y-0.5">
                {activeVideo.contraindications[currentLanguage].map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Consultation Offering Callout: ₹800 (Booking ₹400 + Post-Rehab ₹400) */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Personalized Care
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                Total ₹800
              </span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-white">
                Home Visit & Video Consultations
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Get a 1-on-1 personalized assessment with Dr. Heta Doshi via <strong className="text-white">Home Visit</strong> (Vadodara) or <strong className="text-white">Telerehab Video Call</strong> (Worldwide).
              </p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Consultation Fee:</span>
                <span className="font-mono font-bold text-white">₹800</span>
              </div>
              <div className="flex justify-between text-teal-300">
                <span>Advance to Confirm Booking:</span>
                <span className="font-mono font-bold">₹400</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Remaining After Rehabilitation:</span>
                <span className="font-mono font-bold">₹400</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBookConsultation}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment (Pay ₹400 to Reserve)</span>
            </button>

            <div className="text-center text-[11px] text-slate-400">
              Pay via GPay to <strong className="text-teal-300 font-mono">9737555022</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
