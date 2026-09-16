export type EducationLevel = 'grade_9' | 'grade_10' | 'grade_11' | 'graduate' | 'gap_year';

export type StudyField =
  | 'cs_it'
  | 'engineering'
  | 'business_econ'
  | 'medicine_bio'
  | 'design_media'
  | 'humanities_law';

export type TargetCountry =
  | 'kz'
  | 'eu_germany'
  | 'eu_italy'
  | 'usa'
  | 'asia_korea'
  | 'asia_singapore'
  | 'online';

export type BudgetTier = 'grant_only' | 'low_5k' | 'mid_15k' | 'high_30k_plus';

export interface UserProfile {
  name: string;
  level: EducationLevel;
  targetYear: number; // e.g. 2026, 2027
  fields: StudyField[];
  gpa: number; // on 5.0 or 4.0 scale
  gpaScale: '4.0' | '5.0';
  targetCountries: TargetCountry[];
  budget: BudgetTier;
  // Exams and scores
  ielts: number | null; // e.g. 7.0
  sat: number | null; // e.g. 1420
  ent: number | null; // e.g. 125 (Unified National Testing KZ)
  toefl: number | null;
  duolingo: number | null;
  olympiadLevel: 'none' | 'school' | 'city' | 'republic' | 'international';
  hasVolunteeringOrProjects: boolean;
  notes: string;
}

export type RecommendationTier = 'dream' | 'target' | 'safety';

export interface UniversityProgram {
  id: string;
  name: string;
  nativeName: string;
  country: TargetCountry;
  countryName: string;
  city: string;
  logo: string;
  bannerGradient: string;
  field: StudyField;
  programName: string;
  language: string;
  tuitionUsdPerYear: number;
  livingCostUsdPerYear: number;
  scholarshipAvailable: boolean;
  scholarshipName: string;
  scholarshipDetails: string;
  minGpa: number;
  minIelts: number;
  minSat?: number;
  minEnt?: number;
  applicationDeadline: string; // e.g. "2026-11-30"
  deadlineLabel: string;
  ranking: string;
  acceptanceRate: string;
  officialSourceUrl: string;
  dataSourceNotice: string;
  keyStrengths: string[];
  careerProspects: string;
}

export interface ScoredRecommendation {
  university: UniversityProgram;
  tier: RecommendationTier;
  matchScore: number; // 0 - 100%
  chanceCategory: 'Высокие (75-90%)' | 'Средние (50-74%)' | 'Конкурентные (30-49%)' | 'Экстремальные (<30%)';
  whyItFits: {
    title: string;
    points: string[];
    academicFit: string;
    financialFit: string;
    careerFit: string;
  };
  risksAndBottlenecks: string[];
  scholarshipOpportunities: string[];
}

export interface DiagnosticReport {
  summary: string;
  strengths: string[];
  limitations: string[];
  educationalGoal: string;
  readinessScore: number; // 0 - 100
  recommendedStrategy: string;
}

export interface RoadmapTask {
  id: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  quarterTitle: string;
  title: string;
  description: string;
  category: 'exams' | 'documents' | 'finance' | 'activities';
  dueDate: string; // "2026-10-15"
  dueLabel: string;
  priority: 'critical' | 'important' | 'recommended';
  isCompleted: boolean;
  relatedUniversityId?: string;
  actionGuide?: string;
}

export interface DemoPreset {
  id: string;
  title: string;
  tagline: string;
  avatar: string;
  profile: UserProfile;
}
