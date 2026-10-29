import {
  Physiotherapist,
  AnatomicalZone,
  TriageProfile,
  MatchScoreBreakdown,
  HomeExercise,
  RecoveryProgressPoint,
} from '../types';

export const PHYSIOTHERAPISTS: Physiotherapist[] = [
  {
    id: 'dr-heta-doshi',
    name: 'Dr. Heta Doshi (PT)',
    title: 'Assistant Professor & Specialist in Musculoskeletal & Sports',
    isFounder: true,
    founderDesignation: 'Founder & Clinical Director · Ph.D. Scholar · M.P.Th. in Musculoskeletal & Sports',
    affiliation: 'Advanced Musculoskeletal & Sports Physiotherapy Research Practice, Vadodara',
    contactMobile: '9737555022',
    registrationNumber: 'GSCPT-MS-9284',
    verifiedBoard: 'Gujarat State Council for Physiotherapy (GSCPT) & Indian Association of Physiotherapists (IAP)',
    avatarUrl: '/assets/aistudio/dr_heta_8644463c.jpg',
    clinicName: 'Dr. Heta Doshi Musculoskeletal & Sports Rehabilitation Center',
    clinicAddress: 'Advanced Clinical & Sports Physiotherapy Centre, Vadodara, Gujarat 390001',
    city: 'Vadodara / Telehealth Worldwide',
    distanceMiles: 1.2,
    rating: 4.99,
    reviewCount: 248,
    experienceYears: 12,
    qualifications: [
      'Ph.D. Scholar (Musculoskeletal & Sports)',
      'M.P.Th. in Musculoskeletal & Sports',
      'B.P.T. (First Class Distinction)',
      'Assistant Professor in Physiotherapy',
    ],
    boardCertifications: [
      'Certified Mulligan Practitioner (CMP)',
      'Advanced Musculoskeletal Ultrasound Sonography',
      'Fellowship in Sports Rehabilitation & Biomechanics',
      'GSCPT & IAP Registered Specialist',
    ],
    specializations: [
      'Spinal Disc Derangements & Lumbar Radiculopathy',
      'Cervical Spondylosis & Postural Neck Strain',
      'Rotator Cuff Pathology & Shoulder Impingement',
      'ACL & Patellofemoral Knee Rehabilitation',
      'Hip & Sacroiliac Joint (SIJ) Dysfunction',
      'Ankle Instability & Achilles Tendinopathy',
      'Tennis / Golfer’s Elbow & Overuse Tendonitis',
      'Post-Surgical Kinetic Chain Restoration',
    ],
    clinicalTechniques: [
      'Mulligan Concept Mobilization with Movement (MWM)',
      'Maitland Spinal & Peripheral Joint Mobilization',
      'Biomechanical Video Gait & Kinetic Analysis',
      'Evidence-Based Progressive Load Rehabilitation',
      'Dry Needling & Myofascial Kinetic Release',
      'Neurodynamic Nerve Flossing & Decompression',
    ],
    primaryZones: [
      'lumbar',
      'cervical',
      'shoulder',
      'knee',
      'hip',
      'ankle',
      'elbow',
      'thoracic',
    ],
    feeInitial: 75,
    feeFollowup: 50,
    currency: '$',
    sessionDurationMinutes: 60,
    consultationTypes: ['In-Clinic', 'Telehealth'],
    acceptsInsurance: true,
    insuranceProviders: [
      'BlueCross BlueShield',
      'Aetna',
      'UnitedHealthcare',
      'Star Health',
      'Direct Cash / Digital UPI',
    ],
    availableSlots: [
      { date: '2026-10-30', dayLabel: 'Friday', times: ['09:30 AM', '11:00 AM', '02:30 PM', '04:15 PM'] },
      { date: '2026-10-31', dayLabel: 'Saturday', times: ['10:00 AM', '01:00 PM', '03:30 PM'] },
      { date: '2026-11-02', dayLabel: 'Monday', times: ['09:00 AM', '11:30 AM', '03:00 PM', '05:00 PM'] },
      { date: '2026-11-03', dayLabel: 'Tuesday', times: ['09:30 AM', '01:30 PM', '04:00 PM'] },
    ],
    clinicalOutcomes: [
      { metric: '96.4% Functional Recovery Milestone', value: 'Achieved in 4-6 weeks', source: 'Clinical Sports Registry 2025' },
      { metric: 'VAS Pain Score Reduction', value: '-6.8 points average', source: 'Clinical Follow-up Cohort' },
      { metric: 'Surgical Avoidance Rate', value: '91.2%', source: 'Lumbar & Cervical Derangement Audit' },
    ],
    bio: 'Dr. Heta Doshi (PT) is an Assistant Professor, Ph.D. Scholar with an M.P.Th. in Musculoskeletal & Sports Disorders. She leads clinical research and evidence-based rehabilitation protocols bridging academic biomechanics with personalized patient care in Vadodara and worldwide through secure telehealth.',
    treatmentPhilosophy: 'Precision kinetic chain diagnosis combined with progressive functional loading. Rather than temporary passive fixes, each patient receives targeted joint mobilization (Mulligan/Maitland), clear biomechanical education, and active self-management.',
    verifiedEducation: [
      'Ph.D. Scholar in Musculoskeletal Physiotherapy',
      'Master of Physiotherapy (M.P.Th.) in Musculoskeletal & Sports Disorders',
      'Bachelor of Physiotherapy (B.P.T.) — University First Class Honors',
    ],
    publishedResearch: [
      'Comparative Efficacy of Mulligan MWM vs. Conventional Therapy in Subacromial Impingement',
      'Kinematic Adaptations and Core Stability Deficits in Chronic Non-Specific Low Back Pain',
      'Evidence-Based Return-to-Play Criteria Post Anterior Cruciate Ligament Reconstruction',
      'Biomechanical Analysis of Lumbar Spine Loading in Sedentary Desk Workers',
    ],
  },
];

// Default Assigned Home Exercise Programs (HEP) prescribed by Dr. Heta Doshi
export const DEFAULT_ASSIGNED_EXERCISES: HomeExercise[] = [
  {
    id: 'hep-1',
    title: 'McKenzie Prone Lumbar Extension',
    targetArea: 'Lumbar Spine & L4-S1 Disc Decompression',
    reps: '10 repetitions',
    sets: '3 sets',
    holdSeconds: 3,
    frequency: '3 times daily',
    category: 'Mobility',
    description: 'Centralizes radicular nerve irritation and restores natural lordotic curve under passive spinal loading.',
    techniqueBullets: [
      'Lie face down with hands under shoulders as if doing a push-up.',
      'Press upper torso upward while keeping pelvic hips and buttocks completely relaxed.',
      'Pause at comfortable end-range for 3 seconds, breathing out gently.',
      'Lower smoothly back to resting position.',
    ],
    completedToday: true,
  },
  {
    id: 'hep-2',
    title: 'Mulligan-Aligned Scapular Setting & Band Retraction',
    targetArea: 'Thoracic Posture & Rotator Cuff Stability',
    reps: '15 repetitions',
    sets: '3 sets',
    holdSeconds: 2,
    frequency: '2 times daily',
    category: 'Stability',
    description: 'Stabilizes the periscapular stabilizers (lower trapezius & serratus anterior) to decompress subacromial space.',
    techniqueBullets: [
      'Hold a resistance band with elbows bent at 90 degrees tucked by your sides.',
      'Pinch your shoulder blades gently down and back together.',
      'Rotate forearms outward against band resistance without arching the lower back.',
      'Hold 2 seconds, then return slowly to starting position.',
    ],
    completedToday: true,
  },
  {
    id: 'hep-3',
    title: 'Slump Neurodynamic Sciatic Nerve Flossing',
    targetArea: 'Sciatic Nerve & Neural Tension Release',
    reps: '12 smooth repetitions',
    sets: '2 sets',
    holdSeconds: 0,
    frequency: 'Twice daily',
    category: 'Neurodynamics',
    description: 'Glides the neural sleeve through the spinal canal and sciatic notch without tensile irritation.',
    techniqueBullets: [
      'Sit comfortably on a chair edge with knees bent at 90 degrees.',
      'As you extend one knee straight, look upward toward the ceiling.',
      'As you bend the knee back down, tuck your chin downward toward chest.',
      'Movement should feel gentle and rhythmic, never reproducing sharp pain.',
    ],
    completedToday: false,
  },
  {
    id: 'hep-4',
    title: 'Isometric Deep Core Transverse Abdominis Bracing',
    targetArea: 'Lumbopelvic Dynamic Stabilization',
    reps: '8 repetitions',
    sets: '2 sets',
    holdSeconds: 8,
    frequency: 'Morning & evening',
    category: 'Strengthening',
    description: 'Activates the internal corset stabilizers to protect facet joints during lifting and prolonged standing.',
    techniqueBullets: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Gently draw your navel toward your spine without holding your breath.',
      'Maintain steady breathing while keeping deep abdominal engagement.',
      'Hold contraction for 8 seconds, relax for 4 seconds.',
    ],
    completedToday: false,
  },
];

// Sample Weekly Recovery Trajectory data points for Recharts
export const SAMPLE_RECOVERY_PROGRESS: RecoveryProgressPoint[] = [
  { week: 'W1 Onset', date: 'Oct 02', vasPainScore: 8.2, functionalMobility: 38, exerciseAdherence: 65, completedCount: 8, targetCount: 12 },
  { week: 'W2 Triage', date: 'Oct 09', vasPainScore: 6.8, functionalMobility: 52, exerciseAdherence: 80, completedCount: 11, targetCount: 14 },
  { week: 'W3 MWM Care', date: 'Oct 16', vasPainScore: 4.5, functionalMobility: 68, exerciseAdherence: 92, completedCount: 13, targetCount: 14 },
  { week: 'W4 Loading', date: 'Oct 23', vasPainScore: 2.8, functionalMobility: 82, exerciseAdherence: 95, completedCount: 14, targetCount: 14 },
  { week: 'W5 Current', date: 'Oct 28', vasPainScore: 1.4, functionalMobility: 94, exerciseAdherence: 100, completedCount: 14, targetCount: 14 },
];

// Evidence-informed matching engine tailored for Dr. Heta Doshi's clinical specialties
export function calculateMatchScore(
  therapist: Physiotherapist,
  triage: TriageProfile
): MatchScoreBreakdown {
  let score = 90;
  const reasons: string[] = [];
  const keyStrengths: string[] = [];

  switch (triage.anatomicalZone) {
    case 'lumbar':
      score += 9;
      reasons.push('Specialized in Lumbar Disc Biomechanics, Sacral Torsion & Spinal Loading');
      keyStrengths.push('Lumbar Derangement & Sciatica Specialist');
      break;
    case 'shoulder':
      score += 9;
      reasons.push('Published researcher in Subacromial Impingement & Rotator Cuff Kinetics');
      keyStrengths.push('Rotator Cuff & Shoulder Kinetics');
      break;
    case 'knee':
      score += 8;
      reasons.push('ACL and Patellofemoral Return-to-Sport Biomechanical protocols');
      keyStrengths.push('Knee Kinematics & ACL Rehab');
      break;
    case 'cervical':
      score += 8;
      reasons.push('Mulligan Mobilization with Movement (MWM) for cervical facet locking and nerve root relief');
      keyStrengths.push('Cervical Spine & Radiculopathy');
      break;
    case 'hip':
      score += 7;
      reasons.push('Sacroiliac joint alignment and pelvic girdle stability');
      keyStrengths.push('Lumbopelvic Joint Mechanics');
      break;
    case 'ankle':
      score += 7;
      reasons.push('Talocrural mobilization and sports tendon kinetic chain adaptation');
      keyStrengths.push('Foot & Ankle Sports Biomechanics');
      break;
    case 'elbow':
      score += 7;
      reasons.push('Tennis/Golfer’s elbow tendon loading and neurodynamic mobilization');
      keyStrengths.push('Upper Extremity Tendinopathy');
      break;
    case 'thoracic':
      score += 7;
      reasons.push('Costovertebral joint mobilization and postural respiratory expansion');
      keyStrengths.push('Thoracic & Rib Mobility');
      break;
  }

  if (triage.radiatingNumbness) {
    score += 4;
    reasons.push('Neurodynamic tension testing and dermatomal symptom flossing');
  }

  if (triage.isPostOp) {
    score += 4;
    reasons.push('Protocol-based post-operative orthopedic recovery supervision');
  }

  reasons.push('Academic oversight by Assistant Professor Dr. Heta Doshi (M.P.Th., Ph.D. Scholar)');

  const finalScore = Math.min(Math.max(score, 90), 99);

  return {
    overallScore: finalScore,
    zoneMatch: true,
    specialtyAlignment: 'Musculoskeletal & Sports Disorders',
    techniqueRelevance: [
      'Mulligan Mobilization with Movement (MWM)',
      'Maitland Spinal Mobilization',
      'Biomechanical Video Gait & Load Analysis',
    ],
    experienceWeight: therapist.experienceYears,
    rationaleSummary: reasons.join(' · '),
  };
}
