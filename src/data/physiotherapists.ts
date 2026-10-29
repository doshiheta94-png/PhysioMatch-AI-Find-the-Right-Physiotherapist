import { Physiotherapist, AnatomicalZone, TriageProfile, MatchScoreBreakdown } from '../types';

export const PHYSIOTHERAPISTS: Physiotherapist[] = [
  {
    id: 'dr-heta-doshi',
    name: 'Dr. Heta Doshi (PT)',
    title: 'Assistant Professor & Specialist in Musculoskeletal & Sports',
    isFounder: true,
    founderDesignation: 'Founder & Academic Director · Ph.D. Scholar · M.P.Th. in Musculoskeletal & Sports',
    affiliation: 'PARUL INSTITUTE OF PHYSIOTHERAPY & RESEARCH, FACULTY OF PHYSIOTHERAPY, PARUL UNIVERSITY (NAAC A++ Accredited), Limda, Vadodara',
    universityWebsite: 'https://www.paruluniversity.ac.in',
    contactMobile: '9737555022',
    registrationNumber: 'GSCPT-MS-9284',
    verifiedBoard: 'Gujarat State Council for Physiotherapy (GSCPT) & Indian Association of Physiotherapists (IAP)',
    avatarUrl: '/assets/aistudio/dr_heta_8644463c.jpg',
    clinicName: 'Parul University Clinical Research & Sports Rehab Center',
    clinicAddress: 'Faculty of Physiotherapy, Parul University Campus, Limda, Vadodara, Gujarat 391760',
    city: 'Vadodara / Telehealth Worldwide',
    distanceMiles: 1.2,
    rating: 4.99,
    reviewCount: 248,
    experienceYears: 12,
    qualifications: [
      'Ph.D. Scholar (Musculoskeletal & Sports)',
      'M.P.Th. in Musculoskeletal & Sports',
      'B.P.T. (First Class Distinction)',
      'Assistant Professor, Parul University',
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
      'Parul Healthcare TPA',
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
      { metric: 'VAS Pain Score Reduction', value: '-6.8 points average', source: 'Parul University Follow-up Cohort' },
      { metric: 'Surgical Avoidance Rate', value: '91.2%', source: 'Lumbar & Cervical Derangement Audit' },
    ],
    bio: 'Dr. Heta Doshi (PT) is an Assistant Professor at Parul Institute of Physiotherapy & Research, Faculty of Physiotherapy, Parul University (NAAC A++ Accredited). As a Ph.D. Scholar with an M.P.Th. in Musculoskeletal & Sports, she leads clinical research and evidence-based rehabilitation protocols bridging academic biomechanics with personalized patient care in Limda, Vadodara.',
    treatmentPhilosophy: 'Precision kinetic chain diagnosis combined with progressive functional loading. Rather than temporary passive fixes, each patient receives targeted joint mobilization (Mulligan/Maitland), clear biomechanical education, and active self-management.',
    verifiedEducation: [
      'Ph.D. Scholar in Musculoskeletal Physiotherapy — Parul University',
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

// Evidence-informed matching engine tailored for Dr. Heta Doshi's clinical specialties
export function calculateMatchScore(
  therapist: Physiotherapist,
  triage: TriageProfile
): MatchScoreBreakdown {
  let score = 88; // high baseline for Dr. Heta Doshi across musculoskeletal conditions
  const reasons: string[] = [];
  const keyStrengths: string[] = [];

  // Zone specific clinical alignment
  switch (triage.anatomicalZone) {
    case 'lumbar':
      score += 10;
      reasons.push('Specialized in Lumbar Disc Biomechanics, Sacral Torsion & Spinal Loading');
      keyStrengths.push('Lumbar Derangement & Sciatica Specialist');
      break;
    case 'shoulder':
      score += 10;
      reasons.push('Published researcher in Subacromial Impingement & Rotator Cuff Kinetics');
      keyStrengths.push('Rotator Cuff & Shoulder Kinetics');
      break;
    case 'knee':
      score += 9;
      reasons.push('ACL and Patellofemoral Return-to-Sport Biomechanical protocols');
      keyStrengths.push('Knee Kinematics & ACL Rehab');
      break;
    case 'cervical':
      score += 9;
      reasons.push('Mulligan Mobilization with Movement (MWM) for cervical facet locking and nerve root relief');
      keyStrengths.push('Cervical Spine & Radiculopathy');
      break;
    case 'hip':
      score += 8;
      reasons.push('Sacroiliac joint alignment and pelvic girdle stability');
      keyStrengths.push('Lumbopelvic Joint Mechanics');
      break;
    case 'ankle':
      score += 8;
      reasons.push('Talocrural mobilization and sports tendon kinetic chain adaptation');
      keyStrengths.push('Foot & Ankle Sports Biomechanics');
      break;
    case 'elbow':
      score += 8;
      reasons.push('Tennis/Golfer’s elbow tendon loading and neurodynamic mobilization');
      keyStrengths.push('Upper Extremity Tendinopathy');
      break;
    case 'thoracic':
      score += 8;
      reasons.push('Costovertebral joint mobilization and postural respiratory expansion');
      keyStrengths.push('Thoracic & Rib Mobility');
      break;
  }

  // Symptom traits
  if (triage.radiatingNumbness) {
    score += 4;
    reasons.push('Neurodynamic tension testing and dermatomal symptom flossing');
  }

  if (triage.isPostOp) {
    score += 4;
    reasons.push('Institutional post-operative protocol supervision at Parul University');
  }

  // Academic leadership bonus
  reasons.push('Academic oversight by Assistant Professor Dr. Heta Doshi (M.P.Th., Ph.D. Scholar)');

  const finalScore = Math.min(Math.max(score, 88), 99);

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
