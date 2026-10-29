import { AnatomicalZone } from '../types';

export interface KinematicVector5D {
  dimension: string;
  symbol: string;
  normalValue: string;
  pathologicValue: string;
  unit: string;
  status: 'Optimal' | 'Critical Strain' | 'Elevated Load';
  clinicalMeaning: string;
}

export interface BodyConditionDetails {
  id: AnatomicalZone;
  zoneName: string;
  conditionName: string;
  clinicalClassification: string;
  icdCode: string;
  prevalence: string;
  primaryStructures: string[];
  pathomechanism: string;
  keySymptoms: string[];
  kinematic5DVectors: KinematicVector5D[];
  threeModelConfig: {
    cameraPos: [number, number, number];
    modelScale: number;
    primaryParts: string[];
    pathologyHighlight: string;
    motionType: 'flexion_compression' | 'impingement_abduction' | 'valgus_shear' | 'torsion_strain';
  };
  rehabilitationProtocol: {
    phase: string;
    name: string;
    frequency: string;
    duration: string;
    targetMuscle: string;
    keyTechnique: string[];
    drHetaClinicalTip: string;
  };
  mriFindings: string;
  conservativeSuccessRate: string;
}

export const BODY_CONDITIONS_DATA: Record<AnatomicalZone, BodyConditionDetails> = {
  lumbar: {
    id: 'lumbar',
    zoneName: 'Lower Back & Spine',
    conditionName: 'L4-L5 Lumbar Disc Herniation & Sciatic Radiculopathy',
    clinicalClassification: 'Lumbar Intervertebral Disc Disorder with Radiculopathy',
    icdCode: 'M51.16',
    prevalence: '37% of adults presenting with mechanical back pain',
    primaryStructures: [
      'L4 & L5 Vertebral Bodies',
      'Annulus Fibrosus (Concentric Collagen Lamellae)',
      'Nucleus Pulposus (Hydrated Gel Matrix)',
      'L5 Exiting Nerve Root',
      'Posterior Longitudinal Ligament (PLL)',
    ],
    pathomechanism:
      'Repetitive spinal flexion combined with torsional loading induces micro-tears in the posterolateral annulus fibrosus. The pressurized nucleus pulposus extrudes posteriorly, abutting the traversing L5 nerve root sleeve, releasing inflammatory cytokines (phospholipase A2) and generating dermatomal sciatic pain.',
    keySymptoms: [
      'Sharp, radiating electric pain below the knee into the lateral calf/dorsum of foot',
      'Positive Straight Leg Raise (Lasegue sign) at 30°-60°',
      'Paresthesia in L5 dermatome with mild great toe extensor weakness',
      'Aggravated by sitting, coughing, or Valsalva maneuvers; relieved by recumbency or gentle extension',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Coronal)',
        symbol: 'Δx',
        normalValue: '< 1.5',
        pathologicValue: '3.8',
        unit: 'mm lateral shift',
        status: 'Elevated Load',
        clinicalMeaning: 'Sciatic list (antalgic lateral trunk tilt away from herniation site)',
      },
      {
        dimension: 'Y (Axial Load)',
        symbol: 'Fy',
        normalValue: '420',
        pathologicValue: '860',
        unit: 'Newtons (N)',
        status: 'Critical Strain',
        clinicalMeaning: 'Elevated intradiscal hydrostatic pressure during slouched seated posture',
      },
      {
        dimension: 'Z (Sagittal Shear)',
        symbol: 'Δz',
        normalValue: '< 2.0',
        pathologicValue: '5.2',
        unit: 'mm anterior glide',
        status: 'Elevated Load',
        clinicalMeaning: 'Anterior intervertebral shear during uncontrolled forward bending',
      },
      {
        dimension: 'θ (Torsional Angle)',
        symbol: 'θ_z',
        normalValue: '1.2°',
        pathologicValue: '4.8°',
        unit: 'facet rotation',
        status: 'Critical Strain',
        clinicalMeaning: 'Excessive facet joint distraction causing capsular strain',
      },
      {
        dimension: '5D Rate of Force',
        symbol: 'dF/dt',
        normalValue: '120',
        pathologicValue: '340',
        unit: 'N/sec loading rate',
        status: 'Critical Strain',
        clinicalMeaning: 'Abrupt impulse loading during sudden flexion transfers peak stress to disc wall',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 1.8, 6.5],
      modelScale: 1.1,
      primaryParts: ['L4 Vertebra', 'L5 Vertebra', 'Hydrated Disc', 'Extruded Herniation Nucleus', 'Nerve Root'],
      pathologyHighlight: 'L4-L5 Posterolateral Disc Protrusion with Direct Nerve Compression',
      motionType: 'flexion_compression',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Directional Preference & Mechanical Decompression',
      name: 'Prone McKenzie Extension with Neural Mobilization Floss',
      frequency: '3 times daily, 10 reps per set',
      duration: '4-6 weeks targeted progression',
      targetMuscle: 'Lumbar Multifidus & Erector Spinae Core Stabilization',
      keyTechnique: [
        'Maintain relaxed gluteal musculature while pressing torso upward with arm strength',
        'Hold sustained lordotic arch for 3-5 seconds at top extension without breath-holding',
        'Check for symptom centralization (pain moving from lateral calf back toward midline lower back)',
        'Perform seated sciatic nerve slider with gentle head extension during foot dorsiflexion',
      ],
      drHetaClinicalTip:
        'Evidence supports early McKenzie extension protocol to reduce anterior intradiscal pressure and promote mechanical centralization of the displaced nuclear material.',
    },
    mriFindings:
      'Sagittal T2-weighted MRI shows a 4.5mm focal posterolateral disc protrusion at L4-L5 displacing the descending L5 nerve root with surrounding high-intensity zone (HIZ) annulus tear.',
    conservativeSuccessRate: '88.4% resolution without surgical discectomy over 8-12 weeks',
  },

  cervical: {
    id: 'cervical',
    zoneName: 'Neck & Upper Spine',
    conditionName: 'Cervical Spondylosis & Forward Head "Tech Neck" Syndrome',
    clinicalClassification: 'Cervical Radiculopathy & Craniovertebral Myofascial Strain',
    icdCode: 'M47.812',
    prevalence: '62% of office workers and digital screen users',
    primaryStructures: [
      'C4-C7 Vertebrae & Uncovertebral Joints of Luschka',
      'Suboccipital Muscle Triangles (Rectus & Obliquus)',
      'Levator Scapulae & Upper Trapezius',
      'Cervical Neural Foramina (C5-C6)',
      'Longus Colli Deep Neck Flexors',
    ],
    pathomechanism:
      'Sustained forward head posture (Craniovertebral Angle < 50°) dramatically amplifies gravitational cantilever load on the cervical spine (up to 27 kg at 60° flexion). This causes chronic suboccipital shortening, reciprocal weakness of deep cervical flexors, and uncovertebral osteophytic spurring narrowing the exit foramina.',
    keySymptoms: [
      'Constant occipital and suboccipital tension headaches (cervicogenic)',
      'Radiating tingling down the C6 dermatome (radial forearm to thumb/index finger)',
      'Marked loss of cervical active rotation (< 60° bilaterally)',
      'Trigger point referral along upper trapezius and medial scapular border',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Lateral Bend)',
        symbol: 'Δx',
        normalValue: '< 1.0',
        pathologicValue: '3.1',
        unit: 'mm lateral tilt',
        status: 'Optimal',
        clinicalMeaning: 'Slight asymmetry during functional side bending',
      },
      {
        dimension: 'Y (Axial Head Load)',
        symbol: 'Fy',
        normalValue: '48',
        pathologicValue: '265',
        unit: 'Newtons (effective load)',
        status: 'Critical Strain',
        clinicalMeaning: 'Equivalent to 27kg weight cantilevered over C6-C7 fulcrum at 60° phone tilt',
      },
      {
        dimension: 'Z (Forward Anterior Offset)',
        symbol: 'Δz',
        normalValue: '< 5.0',
        pathologicValue: '28.4',
        unit: 'mm forward head offset',
        status: 'Critical Strain',
        clinicalMeaning: 'Severe forward head translation with reduced Craniovertebral Angle (CVA = 42°)',
      },
      {
        dimension: 'θ (Upper Cervical Extension)',
        symbol: 'θ_cva',
        normalValue: '53°',
        pathologicValue: '38°',
        unit: 'CVA angle',
        status: 'Critical Strain',
        clinicalMeaning: 'Hyperextended suboccipital base with hyperflexed lower cervical spine',
      },
      {
        dimension: '5D Velocity / Dwell',
        symbol: 't_dwell',
        normalValue: '< 15',
        pathologicValue: '72',
        unit: 'min static hold',
        status: 'Elevated Load',
        clinicalMeaning: 'Prolonged unbroken static screen posture without micro-recovery breaks',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 2.2, 6.2],
      modelScale: 1.15,
      primaryParts: ['C3-C7 Vertebrae', 'Transverse Foramina', 'Suboccipital Triangle', 'Exiting C6 Nerve', 'Cervical Discs'],
      pathologyHighlight: 'C5-C6 Foraminal Stenosis with Anterior Cantilever Flexion Moment',
      motionType: 'flexion_compression',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Deep Neck Flexor Activation & Axial Retraction',
      name: 'Craniocervical Flexion (Chin Tuck) with Scapular Retraction',
      frequency: 'Every 2 hours during desk work, 12 repetitions',
      duration: '4-8 weeks motor relearning',
      targetMuscle: 'Longus Colli, Longus Capitis & Middle/Lower Trapezius',
      keyTechnique: [
        'Perform gentle nodding motion without engaging superficial sternocleidomastoid (SCM)',
        'Imagine lengthening the back of the neck toward the ceiling, flattening the cervical lordosis gently',
        'Hold isometric contraction for 5 seconds against neutral headrest resistance',
        'Combine with scapular pinch into back pockets to depress clavicular elevation',
      ],
      drHetaClinicalTip:
        'Restoring deep cervical flexor endurance (Longus Colli) is clinically superior to generic neck stretching, reducing cervical loading by over 45%.',
    },
    mriFindings:
      'Cervical MRI reveals C5-C6 disc desiccation, 2.8mm osteophytic bar narrowing the left neuroforamen, with hyperlordosis of C1-C2 and kyphotic straightening of mid-cervical segment.',
    conservativeSuccessRate: '91.2% symptom reduction through specific deep neck flexor stabilization',
  },

  thoracic: {
    id: 'thoracic',
    zoneName: 'Mid-Back & Rib Cage',
    conditionName: 'Postural Thoracic Hyperkyphosis & Costovertebral Hypomobility',
    clinicalClassification: 'Thoracic Segmental Hypomobility & Scheuermann-Pattern Posture',
    icdCode: 'M40.204',
    prevalence: '44% in sedentary desk workers and overhead athletes',
    primaryStructures: [
      'T4-T9 Thoracic Vertebrae',
      'Costovertebral & Costotransverse Articulations',
      'Intercostal Muscles & Posterior Rib Arcs',
      'Pectoralis Minor & Anterior Fascia',
      'Rhomboids & Serratus Anterior Force Couple',
    ],
    pathomechanism:
      'Prolonged sitting with slumped shoulders locks the thoracic spine in reciprocal hyperkyphosis (> 45° Cobb angle). The costovertebral joints undergo restriction, reducing thoracic rotation, impairing costal expansion during deep diaphragmatic respiration, and forcing compensatory hyper-mobility in the lumbar spine.',
    keySymptoms: [
      'Burning interscapular ache between shoulder blades after prolonged sitting',
      'Sharp catch with deep inspiration or rotational sneezing (rib block)',
      'Restricted thoracic extension (< 15° active extension over roller)',
      'Associated anterior chest tightness and shallow apical breathing patterns',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Costal Asymmetry)',
        symbol: 'Δx',
        normalValue: '< 2.0',
        pathologicValue: '4.6',
        unit: 'mm chest cage twist',
        status: 'Elevated Load',
        clinicalMeaning: 'Rotational rib rib-hump asymmetry on forward Adam bending test',
      },
      {
        dimension: 'Y (Axial Compression)',
        symbol: 'Fy',
        normalValue: '350',
        pathologicValue: '610',
        unit: 'Newtons',
        status: 'Optimal',
        clinicalMeaning: 'Distributed compressive load across mid-thoracic vertebral bodies',
      },
      {
        dimension: 'Z (Sagittal Apex)',
        symbol: 'Kyph_Ang',
        normalValue: '28°-35°',
        pathologicValue: '54°',
        unit: 'degrees kyphosis',
        status: 'Critical Strain',
        clinicalMeaning: 'Marked hyperkyphotic apex at T7-T8 creating anterior wedging forces',
      },
      {
        dimension: 'θ (Thoracic Rotation)',
        symbol: 'θ_rot',
        normalValue: '45°',
        pathologicValue: '18°',
        unit: 'degrees active rotation',
        status: 'Critical Strain',
        clinicalMeaning: 'Severe bilateral restriction in thoracic axial rotational excursion',
      },
      {
        dimension: '5D Respiratory Expansion',
        symbol: 'ΔV/dt',
        normalValue: '5.2',
        pathologicValue: '2.1',
        unit: 'cm chest circumference expansion',
        status: 'Critical Strain',
        clinicalMeaning: 'Marked reduction in rib basket excursion at 4th intercostal space',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 2.0, 7.0],
      modelScale: 1.05,
      primaryParts: ['T4-T8 Vertebrae', 'Costovertebral Joints', 'Rib Cage Arcs', 'Intercostal Spaces', 'Erector Spinae'],
      pathologyHighlight: 'T6-T8 Hypomobile Block with Increased Posterior Kyphotic Curvature',
      motionType: 'torsion_strain',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Segmental Thoracic Extension & Costal Mobilization',
      name: 'Thoracic Foam Roller Extension with Ribcage Decompression',
      frequency: 'Daily morning & evening, 10 reps across 3 thoracic segments',
      duration: '4 weeks mobility foundation',
      targetMuscle: 'Thoracic Erectors, Rhomboid Major, Serratus Anterior',
      keyTechnique: [
        'Support head with hands to avoid cervical strain while fulcruming over roller',
        'Exhale fully during extension to unlock costovertebral joint restrictions',
        'Perform seated book-opener or bow-and-arrow rotations to restore 45° axial spin',
        'Avoid hyperextending through the lumbar spine; isolate mid-back segment',
      ],
      drHetaClinicalTip:
        'Mobilizing thoracic extension restores scapular upward rotation, resolving up to 70% of downstream subacromial shoulder impingement symptoms.',
    },
    mriFindings:
      'Standing radiographic spine series demonstrates 52° thoracic kyphosis with anterior marginal spurring at T7-T8 and mild reduction in anterior disc height without compression fracture.',
    conservativeSuccessRate: '94% improvement in thoracic range of motion and postural ease',
  },

  shoulder: {
    id: 'shoulder',
    zoneName: 'Shoulders & Rotator Cuff',
    conditionName: 'Subacromial Impingement & Supraspinatus Tendinopathy',
    clinicalClassification: 'Rotator Cuff Syndrome & Subacromial Bursitis',
    icdCode: 'M75.10',
    prevalence: '32% of all musculoskeletal medical consultations',
    primaryStructures: [
      'Supraspinatus Tendon & Critical Hypovascular Zone',
      'Subacromial Bursa',
      'Coracoacromial Arch & Acromion Process (Type II/III)',
      'Humeral Head & Glenoid Fossa',
      'Biceps Long Head Tendon',
    ],
    pathomechanism:
      'During arm elevation, weakness of the rotator cuff force couple (infraspinatus, subscapularis) fails to depress the humeral head. The humeral head migrates superiorly, compressing the supraspinatus tendon and inflamed subacromial bursa against the undersurface of the anterolateral acromion within the 60°-120° painful arc.',
    keySymptoms: [
      'Sharp catching pain during reaching overhead, putting on a coat, or sleeping on affected side',
      'Positive Neer Impingement and Hawkins-Kennedy provocative tests',
      'Painful Arc sign between 60° and 120° of active abduction',
      'Localized tenderness over the greater tuberosity insertion of supraspinatus',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Humeral Migration)',
        symbol: 'Δy_sup',
        normalValue: '< 1.2',
        pathologicValue: '4.7',
        unit: 'mm superior head migration',
        status: 'Critical Strain',
        clinicalMeaning: 'Failure of rotator cuff depression mechanism, encroaching subacromial space',
      },
      {
        dimension: 'Y (Subacromial Space)',
        symbol: 'SAS_dist',
        normalValue: '9.0-10.5',
        pathologicValue: '4.8',
        unit: 'mm clearance distance',
        status: 'Critical Strain',
        clinicalMeaning: 'Critical subacromial distance reduction measured under ultrasound',
      },
      {
        dimension: 'Z (Scapular Upward Tilt)',
        symbol: 'θ_scap',
        normalValue: '55°',
        pathologicValue: '28°',
        unit: 'degrees scapulohumeral rhythm',
        status: 'Elevated Load',
        clinicalMeaning: 'Scapular dyskinesis with insufficient upward rotation during abduction',
      },
      {
        dimension: 'θ (External Rotation Torque)',
        symbol: 'Torq_ER',
        normalValue: '42',
        pathologicValue: '19',
        unit: 'Nm isometric strength',
        status: 'Elevated Load',
        clinicalMeaning: 'Infraspinatus / Teres minor force deficit allowing humeral head anterior glide',
      },
      {
        dimension: '5D Abduction Velocity',
        symbol: 'ω_abd',
        normalValue: '85',
        pathologicValue: '32',
        unit: 'deg/sec painful hesitation',
        status: 'Critical Strain',
        clinicalMeaning: 'Deceleration and pain hitch during the 60°-120° arc',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 1.6, 6.0],
      modelScale: 1.1,
      primaryParts: ['Humeral Head', 'Glenoid Socket', 'Acromion Arch', 'Supraspinatus Tendon', 'Subacromial Bursa'],
      pathologyHighlight: 'Superior Humeral Head Migration Compressing Supraspinatus Tendon',
      motionType: 'impingement_abduction',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Rotator Cuff Depressor Activation & Scapular Setting',
      name: 'Side-Lying External Rotation with Towel Roll & Scapular Retraction',
      frequency: '3 sets of 15 reps, 4 days/week',
      duration: '6-8 weeks progressive tendon remodeling',
      targetMuscle: 'Infraspinatus, Teres Minor, Lower Trapezius',
      keyTechnique: [
        'Place a rolled towel between elbow and ribcage to maintain 30° scapular plane',
        'Rotate forearm upward slowly over 3 seconds, pause for 2 seconds at top',
        'Do not allow anterior shoulder roll or trunk compensation',
        'Progress to high-volume isometric holds at 45° abduction to induce tendon analgesia',
      ],
      drHetaClinicalTip:
        'Isometric rotator cuff loading at 45° scapular plane triggers immediate corticospinal tendon analgesia, permitting pain-free active kinetic chain rehabilitation.',
    },
    mriFindings:
      'High-resolution MSK Ultrasound shows thickened subacromial-subdeltoid bursa (2.4mm) and focal intrasubstance hypoechoic tendinosis of the supraspinatus without full-thickness detachment.',
    conservativeSuccessRate: '87.6% avoid acromioplasty or surgical repair with targeted biomechanics',
  },

  elbow: {
    id: 'elbow',
    zoneName: 'Elbow, Forearm & Wrist',
    conditionName: 'Lateral Epicondylalgia ("Tennis Elbow") & Radial Tunnel Strain',
    clinicalClassification: 'Common Extensor Tendinopathy & Enthesopathy',
    icdCode: 'M77.11',
    prevalence: '1-3% of general population, 15% in manual/grip workers',
    primaryStructures: [
      'Extensor Carpi Radialis Brevis (ECRB) Origin',
      'Lateral Epicondyle of Humerus',
      'Radial Collateral Ligament Complex',
      'Radiohumeral Joint Capsule',
      'Posterior Interosseous Nerve (PIN)',
    ],
    pathomechanism:
      'Repetitive wrist extension and forceful gripping produces tensile and compressive shear stress at the ECRB tendon insertion on the lateral epicondyle. Angiofibroblastic hyperplasia (tendinosis with disorganized collagen and hypervascular ingrowth) develops, exacerbated by radial nerve interface tension.',
    keySymptoms: [
      'Point tenderness precisely 2-5mm distal to the lateral epicondyle',
      'Sharp pain on resisted middle finger extension (Maudsley test)',
      'Severe pain on resisted wrist extension with elbow straight (Cozen test)',
      'Weakness when lifting a coffee cup or turning a door handle (grip drop)',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Radial Deviation Torque)',
        symbol: 'Torq_rad',
        normalValue: '18',
        pathologicValue: '34',
        unit: 'Nm repetitive load',
        status: 'Critical Strain',
        clinicalMeaning: 'Excessive eccentric wrist extensors load during typing and gripping',
      },
      {
        dimension: 'Y (Tendon Tensile Strain)',
        symbol: 'σ_tens',
        normalValue: '14',
        pathologicValue: '48',
        unit: 'MPa mechanical stress',
        status: 'Critical Strain',
        clinicalMeaning: 'High peak micro-strain exceeding the reparative threshold of ECRB enthesis',
      },
      {
        dimension: 'Z (Radiohumeral Glide)',
        symbol: 'Δz',
        normalValue: '< 0.8',
        pathologicValue: '2.1',
        unit: 'mm joint translation',
        status: 'Optimal',
        clinicalMeaning: 'Mild joint capsule irritation without gross laxity',
      },
      {
        dimension: 'θ (Wrist Extension Arc)',
        symbol: 'θ_wrist',
        normalValue: '70°',
        pathologicValue: '42°',
        unit: 'degrees pain-free extension',
        status: 'Elevated Load',
        clinicalMeaning: 'Restricted terminal wrist extension under resisted grip testing',
      },
      {
        dimension: '5D Grip Endurance',
        symbol: 'F_grip',
        normalValue: '42',
        pathologicValue: '17',
        unit: 'kg dynamometer grip',
        status: 'Critical Strain',
        clinicalMeaning: 'Over 55% reduction in pain-free grip strength compared to contralateral side',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 1.5, 5.8],
      modelScale: 1.2,
      primaryParts: ['Distal Humerus Epicondyle', 'Radius Head', 'Ulna Olecranon', 'ECRB Common Extensor Tendon', 'Annular Ligament'],
      pathologyHighlight: 'Micro-tears and Angiofibroblastic Degeneration at ECRB Origin',
      motionType: 'torsion_strain',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Heavy Slow Resistance (HSR) & Radial Nerve Gliding',
      name: 'Tyler Twist Eccentric ECRB Loading with Neural Mobilization',
      frequency: '3 sets of 15 repetitions daily',
      duration: '6-12 weeks collagen matrix restructuring',
      targetMuscle: 'Extensor Carpi Radialis Brevis & Longus',
      keyTechnique: [
        'Utilize a flexible resistance bar or dumbbell for controlled eccentric lowering',
        'Begin in full wrist extension, release slowly over 4 full seconds into flexion',
        'Maintain relaxed shoulder and neutral scapular alignment during execution',
        'Incorporate upper limb tension test (ULTT 2b) radial nerve sliders',
      ],
      drHetaClinicalTip:
        'Avoid high-frequency cortisone injections which increase 1-year recurrence rates to 72%; Heavy Slow Resistance (HSR) stimulates true type-I tenocyte collagen realignment.',
    },
    mriFindings:
      'Elbow ultrasound demonstrates thickening and hypoechoic clefts within the common extensor tendon origin at the lateral epicondyle with micro-calcifications and positive Doppler hyperemia.',
    conservativeSuccessRate: '92% long-term recovery with progressive eccentric tendon protocols',
  },

  hip: {
    id: 'hip',
    zoneName: 'Hip, Groin & Pelvis',
    conditionName: 'Femoroacetabular Impingement (FAI) & Pelvic Obliquity',
    clinicalClassification: 'Acetabular Labral Pathology & Hip Abductor Dysfunction',
    icdCode: 'M25.85',
    prevalence: '21% in active athletic populations and runners',
    primaryStructures: [
      'Acetabulum Rim & Fibrocartilaginous Labrum',
      'Femoral Head & Aspherical Cam/Pincer Lesion',
      'Gluteus Medius & Minimus Tendons',
      'Iliofemoral Ligament (Y-Ligament of Bigelow)',
      'Sacroiliac (SI) Joint Complex',
    ],
    pathomechanism:
      'An aspherical femoral head-neck junction (Cam deformity) or over-covering acetabulum rim (Pincer deformity) creates mechanical abutment during hip flexion and internal rotation. The acetabular labrum is crushed between bone surfaces, initiating labral detachment, chondral delamination, and secondary pelvic obliquity.',
    keySymptoms: [
      'Deep "C-sign" aching groin pain wrapping to lateral hip',
      'Positive FADIR test (Flexion, Adduction, Internal Rotation reproduces sharp impingement)',
      'Clicking, catching, or giving-way sensation when rising from deep chair or squatting',
      'Trendelenburg sign or pelvic drop during single-leg stance',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Pelvic Drop / Obliquity)',
        symbol: 'Δθ_pelv',
        normalValue: '< 4°',
        pathologicValue: '11°',
        unit: 'degrees Trendelenburg drop',
        status: 'Critical Strain',
        clinicalMeaning: 'Contralateral pelvic tilt caused by gluteus medius inhibition',
      },
      {
        dimension: 'Y (Joint Contact Pressure)',
        symbol: 'P_cart',
        normalValue: '2.8',
        pathologicValue: '8.4',
        unit: 'MPa anterosuperior pressure',
        status: 'Critical Strain',
        clinicalMeaning: 'Tripled focal cartilage pressure at the anterosuperior acetabular labrum',
      },
      {
        dimension: 'Z (Femoral Head Translation)',
        symbol: 'Δz_post',
        normalValue: '< 1.5',
        pathologicValue: '3.9',
        unit: 'mm posterior displacement',
        status: 'Elevated Load',
        clinicalMeaning: 'Excessive posterior shear during deep hip flexion beyond 90°',
      },
      {
        dimension: 'θ (Internal Rotation)',
        symbol: 'θ_IR',
        normalValue: '35°',
        pathologicValue: '12°',
        unit: 'degrees internal rotation at 90° flexion',
        status: 'Critical Strain',
        clinicalMeaning: 'Severely restricted internal rotation due to bony Cam impingement block',
      },
      {
        dimension: '5D Single Leg Stance Stability',
        symbol: 'COP_sway',
        normalValue: '14',
        pathologicValue: '38',
        unit: 'mm/sec center-of-pressure sway',
        status: 'Elevated Load',
        clinicalMeaning: 'Impaired proprioceptive hip stabilizer neuromuscular control',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 2.0, 6.8],
      modelScale: 1.0,
      primaryParts: ['Hemipelvis & Iliac Crest', 'Acetabular Labrum Ring', 'Femoral Head & Neck', 'Cam Osteophyte Node', 'Gluteal Tendons'],
      pathologyHighlight: 'Anterosuperior Acetabular Labral Tear with Cam Abutment',
      motionType: 'torsion_strain',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Deep Hip Stabilizer Activation & Safe Functional ROM',
      name: 'Side-Plank Clamshell with Gluteus Medius Posterior Fiber Focus',
      frequency: '3 sets of 12 reps each side, 4 times weekly',
      duration: '8 weeks neuromuscular re-education',
      targetMuscle: 'Gluteus Medius, Obturator Internus, Piriformis',
      keyTechnique: [
        'Keep pelvis perpendicular to floor without rolling backward',
        'Avoid deep hip flexion past 75° during initial weeks to prevent impingement pinch',
        'Squeeze heels together while driving knee upward against light resistance band',
        'Progress to single-leg Romanian deadlifts for posterior chain kinetic control',
      ],
      drHetaClinicalTip:
        'Preserving pelvic neutrality and modifying deep sitting angles above 90° immediately eliminates the provocative impingement contact force.',
    },
    mriFindings:
      '3T MR Arthrography demonstrates an anterosuperior acetabular labral tear from 11 to 1 o’clock position with an alpha angle of 68° indicating moderate Cam deformity.',
    conservativeSuccessRate: '83% successful athletic return with targeted hip biomechanics',
  },

  knee: {
    id: 'knee',
    zoneName: 'Knee & Patella',
    conditionName: 'Patellofemoral Pain Syndrome (PFPS) & ACL Dynamic Valgus',
    clinicalClassification: 'Patellar Maltracking & Dynamic Knee Valgus Collapse',
    icdCode: 'M22.2X1',
    prevalence: '25% of all knee injuries treated in sports medicine',
    primaryStructures: [
      'Patella & Articular Hyaline Cartilage',
      'Trochlear Groove of Distal Femur',
      'Anterior Cruciate Ligament (ACL)',
      'Medial & Lateral Meniscus C-Cartilages',
      'Vastus Medialis Oblique (VMO) & IT Band',
    ],
    pathomechanism:
      'Weakness of the posterolateral hip abductors allows dynamic knee valgus collapse (femoral adduction and internal rotation) during single-leg loading, jumping, or stairs. This increases the lateral vector (Q-angle), forcing the patella to track laterally against the trochlear ridge and loading the ACL in excessive multi-planar tension.',
    keySymptoms: [
      'Diffuse retropatellar and peripatellar ache aggravated by stairs, squatting, or prolonged sitting (movie sign)',
      'Crepitus and grinding sensation under the kneecap during terminal knee extension',
      'Dynamic valgus collapse visible on single-leg squat or drop-jump landing',
      'Mild joint effusion and tenderness along the lateral patellar facet',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Dynamic Valgus Collapse)',
        symbol: 'θ_valg',
        normalValue: '< 5°',
        pathologicValue: '17.4°',
        unit: 'degrees dynamic valgus',
        status: 'Critical Strain',
        clinicalMeaning: 'Excessive medial knee displacement placing high tension on ACL and MCL',
      },
      {
        dimension: 'Y (Patellofemoral Joint Reaction Force)',
        symbol: 'PFJRF',
        normalValue: '1200',
        pathologicValue: '3450',
        unit: 'Newtons (at 60° squat)',
        status: 'Critical Strain',
        clinicalMeaning: 'Elevated compressive stress on lateral facet hyaline cartilage',
      },
      {
        dimension: 'Z (Anterior Tibial Translation)',
        symbol: 'Δz_ant',
        normalValue: '< 3.0',
        pathologicValue: '7.8',
        unit: 'mm anterior tibial glide',
        status: 'Elevated Load',
        clinicalMeaning: 'Excessive anterior sheer stress on ACL during quadriceps dominant deceleration',
      },
      {
        dimension: 'θ (Tibial External Rotation)',
        symbol: 'θ_tib',
        normalValue: '8°',
        pathologicValue: '21°',
        unit: 'degrees tibial spin',
        status: 'Critical Strain',
        clinicalMeaning: 'Screw-home mechanism disruption causing rotational patellar tilt',
      },
      {
        dimension: '5D Ground Reaction Impact',
        symbol: 'dF/dt_GRF',
        normalValue: '48',
        pathologicValue: '118',
        unit: 'BW/sec loading rate',
        status: 'Critical Strain',
        clinicalMeaning: 'Stiff landing with poor knee flexion absorption shock attenuation',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 1.8, 6.2],
      modelScale: 1.1,
      primaryParts: ['Femur Condyles', 'Tibia Plateau', 'Patella Bone', 'ACL & PCL Ligaments', 'Medial & Lateral Meniscus'],
      pathologyHighlight: 'Lateral Patellar Subluxation and Excessive ACL Strain in Dynamic Valgus',
      motionType: 'valgus_shear',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: Proximal Hip Control & Closed-Chain VMO Loading',
      name: 'Banded Spanish Squat & Step-Downs with Hip External Rotation',
      frequency: '3 sets of 10 reps, 3 times weekly',
      duration: '6-10 weeks neuromuscular stabilization',
      targetMuscle: 'Vastus Medialis Oblique (VMO) & Gluteus Maximus/Medius',
      keyTechnique: [
        'Anchor heavy band behind knee crevice to provide anterior tibial translation resistance',
        'Maintain knee tracking directly over 2nd toe; zero medial collapse permitted',
        'Perform slow 4-second eccentric descent into 45° knee flexion, keeping shins vertical',
        'Add single-leg balance on unstable foam pad to rebuild mechanoreceptor feedback',
      ],
      drHetaClinicalTip:
        'Combining proximal hip strengthening with quadriceps rehabilitation yields 80% higher pain reduction than isolated knee quadriceps exercises alone.',
    },
    mriFindings:
      'Knee MRI reveals grade 2 chondromalacia patellae on the lateral patellar facet with mild subchondral bone marrow edema and minor lateral patellar tilt without full ACL tear.',
    conservativeSuccessRate: '93% resolution without invasive arthroscopy through biomechanical retraining',
  },

  ankle: {
    id: 'ankle',
    zoneName: 'Ankle, Achilles & Foot',
    conditionName: 'Plantar Fasciitis & Achilles Insertional Tendinopathy',
    clinicalClassification: 'Plantar Fasciopathy & Triceps Surae Mechanical Overload',
    icdCode: 'M72.2',
    prevalence: '10% of the general population over lifetime, 22% in runners',
    primaryStructures: [
      'Plantar Aponeurosis Central Band',
      'Medial Calcaneal Tubercle',
      'Achilles Tendon Insertion & Retrocalcaneal Bursa',
      'Talocrural & Subtalar Joints',
      'Windlass Mechanism of 1st Metatarsophalangeal Joint',
    ],
    pathomechanism:
      'Repetitive tensile elongation of the plantar fascia under excessive foot pronation or stiff high arch creates micro-tears at its medial calcaneal insertion. Decreased ankle dorsiflexion (< 10°) forces premature heel rise, amplifying tensile loading on both the Achilles tendon and plantar aponeurosis.',
    keySymptoms: [
      'Excruciating pain on first morning steps ("first-step hesitation")',
      'Sharp pinpoint tenderness over the medial process of the calcaneal tuberosity',
      'Positive Windlass test (passive great toe dorsiflexion reproduces heel pain)',
      'Morning stiffness improving after walking 10 minutes then worsening by evening',
    ],
    kinematic5DVectors: [
      {
        dimension: 'X (Rearfoot Eversion / Pronation)',
        symbol: 'θ_evers',
        normalValue: '4°-6°',
        pathologicValue: '15.8°',
        unit: 'degrees rearfoot eversion',
        status: 'Critical Strain',
        clinicalMeaning: 'Excessive calcaneal eversion uncoiling the medial longitudinal arch',
      },
      {
        dimension: 'Y (First-Step Peak Impact)',
        symbol: 'F_calc',
        normalValue: '750',
        pathologicValue: '1620',
        unit: 'Newtons at heel strike',
        status: 'Critical Strain',
        clinicalMeaning: 'Concentrated heel strike pressure without adequate soft tissue dissipation',
      },
      {
        dimension: 'Z (Achilles Tensile Load)',
        symbol: 'T_achil',
        normalValue: '2800',
        pathologicValue: '5400',
        unit: 'Newtons at push-off',
        status: 'Critical Strain',
        clinicalMeaning: 'Stiff calf complex overpulling the posterior calcaneal leverage arm',
      },
      {
        dimension: 'θ (Ankle Dorsiflexion ROM)',
        symbol: 'θ_DF',
        normalValue: '15°',
        pathologicValue: '4°',
        unit: 'degrees knee-to-wall dorsiflexion',
        status: 'Critical Strain',
        clinicalMeaning: 'Severe equinus restriction causing compensatory foot pronation',
      },
      {
        dimension: '5D Windlass Tension Rate',
        symbol: 'dσ/dt',
        normalValue: '35',
        pathologicValue: '95',
        unit: 'MPa/sec tensile rate',
        status: 'Critical Strain',
        clinicalMeaning: 'High velocity elongation of the plantar fascia during terminal stance phase',
      },
    ],
    threeModelConfig: {
      cameraPos: [0, 1.4, 5.5],
      modelScale: 1.25,
      primaryParts: ['Distal Tibia & Fibula Malleoli', 'Talus Bone', 'Calcaneus Heel Bone', 'Plantar Fascia Band', 'Achilles Tendon'],
      pathologyHighlight: 'Plantar Fascial Enthesopathy and Micro-tearing at Medial Calcaneus',
      motionType: 'torsion_strain',
    },
    rehabilitationProtocol: {
      phase: 'Phase 1: High-Load Strength Training (Rathleff Protocol)',
      name: 'High-Load Plantar Fascia Heel Raise with Rolled Towel under Toes',
      frequency: 'Every other day, 3 sets of 12 reps with 3-second holds',
      duration: '8-12 weeks tensile remodeling',
      targetMuscle: 'Intrinsic Foot Flexors, Tibialis Posterior, Gastrocnemius-Soleus',
      keyTechnique: [
        'Place a rolled towel under the toes to maximally engage the Windlass mechanism',
        'Take 3 seconds to rise, hold at peak height for 2 seconds, take 3 seconds to lower',
        'Ensure weight stays evenly distributed over the 1st and 2nd metatarsal heads',
        'Perform morning calf stretching over step before placing full weight onto feet',
      ],
      drHetaClinicalTip:
        'The Rathleff high-load strength protocol stimulates tenocyte mechanotransduction, yielding superior collagen thickness reduction compared to passive stretching.',
    },
    mriFindings:
      'Diagnostic musculoskeletal ultrasound shows marked plantar fascia thickening of 6.2mm (normal < 4.0mm) at the calcaneal insertion with hypoechoic tissue edema and small plantar spur.',
    conservativeSuccessRate: '95.8% complete symptom recovery with conservative biomechanical care',
  },
};
