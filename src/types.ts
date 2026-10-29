export type AnatomicalZone =
  | 'cervical'
  | 'shoulder'
  | 'thoracic'
  | 'lumbar'
  | 'elbow'
  | 'hip'
  | 'knee'
  | 'ankle';

export type BodyView = 'anterior' | 'posterior';

export interface TriageProfile {
  anatomicalZone: AnatomicalZone;
  subRegion: string;
  painLevel: number; // 1-10
  painType: string[];
  duration: '< 2 weeks' | '2-6 weeks' | '6-12 weeks' | '> 3 months';
  isPostOp: boolean;
  postOpDetails?: string;
  radiatingNumbness: boolean;
  dailyImpact: string;
  aggravatingFactors: string;
  relievingFactors: string;
  previousTreatments: string[];
  targetGoals: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

export interface ClinicalOutcome {
  metric: string;
  value: string;
  source: string;
}

export interface AvailableSlot {
  date: string;
  dayLabel: string;
  times: string[];
}

export interface Physiotherapist {
  id: string;
  name: string;
  title: string;
  isFounder?: boolean;
  founderDesignation?: string;
  affiliation?: string;
  universityWebsite?: string;
  contactMobile?: string;
  registrationNumber: string;
  verifiedBoard: string;
  avatarUrl: string;
  clinicName: string;
  clinicAddress: string;
  city: string;
  distanceMiles: number;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  qualifications: string[];
  boardCertifications: string[];
  specializations: string[];
  clinicalTechniques: string[];
  primaryZones: AnatomicalZone[];
  feeInitial: number;
  feeFollowup: number;
  currency: string;
  sessionDurationMinutes: number;
  consultationTypes: ('In-Clinic' | 'Telehealth')[];
  acceptsInsurance: boolean;
  insuranceProviders: string[];
  availableSlots: AvailableSlot[];
  clinicalOutcomes: ClinicalOutcome[];
  bio: string;
  treatmentPhilosophy: string;
  verifiedEducation: string[];
  publishedResearch?: string[];
}

export interface MatchScoreBreakdown {
  overallScore: number;
  zoneMatch: boolean;
  specialtyAlignment: string;
  techniqueRelevance: string[];
  experienceWeight: number;
  rationaleSummary: string;
}

export interface Booking {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistAvatar: string;
  clinicName: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationType: 'In-Clinic' | 'Telehealth';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  anatomicalZone: string;
  painLevel: number;
  status: 'Confirmed' | 'Pending Clinical Review' | 'Completed';
  createdAt: string;
  intakeSummary?: string;
  clinicalNotes?: string;
}

// Home Exercise Program (HEP)
export interface HomeExercise {
  id: string;
  title: string;
  targetArea: string;
  reps: string;
  sets: string;
  holdSeconds: number;
  frequency: string;
  description: string;
  techniqueBullets: string[];
  category: 'Mobility' | 'Strengthening' | 'Stability' | 'Neurodynamics';
  completedToday: boolean;
}

// Recovery Progress Data Point for Recharts
export interface RecoveryProgressPoint {
  week: string;
  date: string;
  vasPainScore: number; // 0-10
  functionalMobility: number; // 0-100%
  exerciseAdherence: number; // 0-100%
  completedCount: number;
  targetCount: number;
}
