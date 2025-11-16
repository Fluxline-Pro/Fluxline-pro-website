/**
 * Personal Training Questionnaire Store
 * Zustand store for managing personal training questionnaire data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ============= Types =============

export type FitnessLevel =
  | 'complete-beginner'
  | 'returning-after-break'
  | 'some-experience'
  | 'regular-exerciser'
  | 'advanced-athlete';

export type LastWorkoutTime =
  | 'this-week'
  | '2-4-weeks-ago'
  | '2-6-months-ago'
  | '6-plus-months-ago'
  | 'over-a-year-ago';

export type FitnessGoal =
  | 'weight-management'
  | 'building-strength'
  | 'health-wellness'
  | 'more-energy'
  | 'stress-management'
  | 'athletic-performance'
  | 'body-confidence'
  | 'body-building';

export type Motivation =
  | 'family-example'
  | 'feeling-strong'
  | 'more-energy-daily'
  | 'health-markers'
  | 'confident-in-clothes'
  | 'stress-mental-health'
  | 'specific-event'
  | 'feeling-better-overall';

export type Challenge =
  | 'time-constraints'
  | 'not-knowing-where-to-start'
  | 'gym-intimidation'
  | 'inconsistent-motivation'
  | 'previous-injuries'
  | 'confusing-info'
  | 'all-or-nothing-thinking'
  | 'lack-of-accountability'
  | 'none-just-started';

export type WorkoutTime =
  | 'very-limited-15-30'
  | 'some-flexibility-30-45'
  | 'moderate-time-45-60'
  | 'flexible-schedule-60-plus';

export type WorkoutFrequency =
  | '2x-per-week'
  | '3x-per-week'
  | '4x-per-week'
  | '5-plus-per-week'
  | 'daily-movement';

export type WorkoutLocation = 'home-only' | 'gym-only' | 'outdoor-preferred' | 'no-preference';

export type PhysicalConsideration =
  | 'no-limitations'
  | 'previous-injuries'
  | 'joint-issues'
  | 'chronic-conditions'
  | 'pregnancy-postpartum'
  | 'prefer-to-discuss-privately';

export type SupportLevel =
  | 'minimal-checkins'
  | 'regular-support-weekly'
  | 'frequent-contact'
  | 'daily-accountability';

export type AccountabilityMethod =
  | 'progress-photos'
  | 'workout-tracking'
  | 'nutrition-logging'
  | 'weekly-goals'
  | 'community-support'
  | 'milestone-celebrations'
  | 'gentle-reminders'
  | 'progress-dashboard';

export type NutritionInterest =
  | 'not-right-now'
  | 'basic-guidance'
  | 'detailed-planning'
  | 'full-nutrition-coaching';

export type WellnessArea =
  | 'sleep-optimization'
  | 'stress-management'
  | 'hydration-recovery'
  | 'supplement-guidance'
  | 'mindset-motivation'
  | 'energy-management'
  | 'building-habits'
  | 'none-just-fitness';

export type MonthlyInvestment =
  | 'under-150'
  | '150-250'
  | '250-350'
  | '350-plus'
  | 'lets-discuss';

export type TrainingFormat = 'online-only' | 'in-person-only' | 'hybrid' | 'not-sure-yet';

export type PaymentStructure =
  | 'pay-per-session'
  | 'monthly-payments'
  | 'quarterly-plans'
  | 'longer-term-plans';

export type StartTimeline = 'this-week' | 'next-1-2-weeks' | 'within-month' | 'flexible-exploring';

// ============= Interfaces =============

export interface QuestionnaireAnswers {
  // Screen 1: Fitness Journey
  fitnessLevel: FitnessLevel | null;
  lastWorkoutTime: LastWorkoutTime | null;

  // Screen 2: Goals & Motivation
  fitnessGoals: FitnessGoal[];
  motivation: Motivation | null;
  challenges: Challenge[];

  // Screen 3: Lifestyle & Preferences
  workoutTime: WorkoutTime | null;
  workoutFrequency: WorkoutFrequency | null;
  workoutLocation: WorkoutLocation | null;
  physicalConsiderations: PhysicalConsideration[];
  physicalConsiderationsDetails: string;

  // Screen 4: Support & Accountability
  supportLevel: SupportLevel | null;
  accountabilityMethods: AccountabilityMethod[];
  nutritionInterest: NutritionInterest | null;
  wellnessAreas: WellnessArea[];

  // Screen 5: Investment & Format
  monthlyInvestment: MonthlyInvestment | null;
  trainingFormat: TrainingFormat | null;
  paymentStructure: PaymentStructure | null;
  startTimeline: StartTimeline | null;

  // Contact Information
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export interface PersonalTrainingState {
  answers: QuestionnaireAnswers;
  isSubmitted: boolean;
  submittedAt: number | null;
  
  // Actions
  setFitnessLevel: (level: FitnessLevel) => void;
  setLastWorkoutTime: (time: LastWorkoutTime) => void;
  
  setFitnessGoals: (goals: FitnessGoal[]) => void;
  setMotivation: (motivation: Motivation) => void;
  setChallenges: (challenges: Challenge[]) => void;
  
  setWorkoutTime: (time: WorkoutTime) => void;
  setWorkoutFrequency: (frequency: WorkoutFrequency) => void;
  setWorkoutLocation: (location: WorkoutLocation) => void;
  setPhysicalConsiderations: (considerations: PhysicalConsideration[]) => void;
  setPhysicalConsiderationsDetails: (details: string) => void;
  
  setSupportLevel: (level: SupportLevel) => void;
  setAccountabilityMethods: (methods: AccountabilityMethod[]) => void;
  setNutritionInterest: (interest: NutritionInterest) => void;
  setWellnessAreas: (areas: WellnessArea[]) => void;
  
  setMonthlyInvestment: (investment: MonthlyInvestment) => void;
  setTrainingFormat: (format: TrainingFormat) => void;
  setPaymentStructure: (structure: PaymentStructure) => void;
  setStartTimeline: (timeline: StartTimeline) => void;
  
  setContactInfo: (name: string, phone: string, email: string) => void;
  
  markAsSubmitted: () => void;
  resetQuestionnaire: () => void;
}

// ============= Initial State =============

const initialAnswers: QuestionnaireAnswers = {
  fitnessLevel: null,
  lastWorkoutTime: null,
  
  fitnessGoals: [],
  motivation: null,
  challenges: [],
  
  workoutTime: null,
  workoutFrequency: null,
  workoutLocation: null,
  physicalConsiderations: [],
  physicalConsiderationsDetails: '',
  
  supportLevel: null,
  accountabilityMethods: [],
  nutritionInterest: null,
  wellnessAreas: [],
  
  monthlyInvestment: null,
  trainingFormat: null,
  paymentStructure: null,
  startTimeline: null,
  
  contactName: '',
  contactPhone: '',
  contactEmail: '',
};

// ============= Store =============

export const usePersonalTrainingStore = create<PersonalTrainingState>()(
  devtools(
    persist(
      (set) => ({
        answers: initialAnswers,
        isSubmitted: false,
        submittedAt: null,

        // Screen 1 actions
        setFitnessLevel: (level) =>
          set((state) => ({
            answers: { ...state.answers, fitnessLevel: level },
          })),
        
        setLastWorkoutTime: (time) =>
          set((state) => ({
            answers: { ...state.answers, lastWorkoutTime: time },
          })),

        // Screen 2 actions
        setFitnessGoals: (goals) =>
          set((state) => ({
            answers: { ...state.answers, fitnessGoals: goals },
          })),
        
        setMotivation: (motivation) =>
          set((state) => ({
            answers: { ...state.answers, motivation },
          })),
        
        setChallenges: (challenges) =>
          set((state) => ({
            answers: { ...state.answers, challenges },
          })),

        // Screen 3 actions
        setWorkoutTime: (time) =>
          set((state) => ({
            answers: { ...state.answers, workoutTime: time },
          })),
        
        setWorkoutFrequency: (frequency) =>
          set((state) => ({
            answers: { ...state.answers, workoutFrequency: frequency },
          })),
        
        setWorkoutLocation: (location) =>
          set((state) => ({
            answers: { ...state.answers, workoutLocation: location },
          })),
        
        setPhysicalConsiderations: (considerations) =>
          set((state) => ({
            answers: { ...state.answers, physicalConsiderations: considerations },
          })),
        
        setPhysicalConsiderationsDetails: (details) =>
          set((state) => ({
            answers: { ...state.answers, physicalConsiderationsDetails: details },
          })),

        // Screen 4 actions
        setSupportLevel: (level) =>
          set((state) => ({
            answers: { ...state.answers, supportLevel: level },
          })),
        
        setAccountabilityMethods: (methods) =>
          set((state) => ({
            answers: { ...state.answers, accountabilityMethods: methods },
          })),
        
        setNutritionInterest: (interest) =>
          set((state) => ({
            answers: { ...state.answers, nutritionInterest: interest },
          })),
        
        setWellnessAreas: (areas) =>
          set((state) => ({
            answers: { ...state.answers, wellnessAreas: areas },
          })),

        // Screen 5 actions
        setMonthlyInvestment: (investment) =>
          set((state) => ({
            answers: { ...state.answers, monthlyInvestment: investment },
          })),
        
        setTrainingFormat: (format) =>
          set((state) => ({
            answers: { ...state.answers, trainingFormat: format },
          })),
        
        setPaymentStructure: (structure) =>
          set((state) => ({
            answers: { ...state.answers, paymentStructure: structure },
          })),
        
        setStartTimeline: (timeline) =>
          set((state) => ({
            answers: { ...state.answers, startTimeline: timeline },
          })),

        // Contact info action
        setContactInfo: (name, phone, email) =>
          set((state) => ({
            answers: {
              ...state.answers,
              contactName: name,
              contactPhone: phone,
              contactEmail: email,
            },
          })),

        // Submission actions
        markAsSubmitted: () =>
          set(() => ({
            isSubmitted: true,
            submittedAt: Date.now(),
          })),

        resetQuestionnaire: () =>
          set(() => ({
            answers: initialAnswers,
            isSubmitted: false,
            submittedAt: null,
          })),
      }),
      {
        name: 'personal-training-store',
        partialize: (state) => ({
          answers: state.answers,
          isSubmitted: state.isSubmitted,
          submittedAt: state.submittedAt,
        }),
      }
    )
  )
);
