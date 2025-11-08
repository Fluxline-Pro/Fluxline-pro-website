/**
 * Individual Path Questionnaire Store
 * Manages state for Identity, Branding & Life Coaching questionnaire flow
 */

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Answer types
export type ClientType = 'individual' | 'organization';

export type Goal =
  | 'physical-wellness'
  | 'leadership'
  | 'career-growth'
  | 'mindset'
  | 'relationships'
  | 'life-balance';

export type Challenge =
  | 'stress'
  | 'fitness'
  | 'boundaries'
  | 'confidence'
  | 'time-management'
  | 'direction';

export type Motivation = 'exploring' | 'committed' | 'urgent';

export type Experience = 'none' | 'some' | 'experienced';

export type ServicePreference =
  | 'life-coaching'
  | 'branding'
  | 'fitness'
  | 'identity-management';

export type Format = 'hybrid' | 'in-person' | 'online' | 'flexible';

export type Frequency = 'weekly' | 'bi-weekly' | 'monthly' | 'flexible';

export type ExperienceLevel = 'beginner' | 'some' | 'experienced';

export type AvailableTime = 'limited' | 'moderate' | 'flexible';

export type CommitmentLevel = 'light' | 'moderate' | 'intensive';

export type Budget = 'under-1k' | '1k-3k' | '3k-5k' | 'over-5k';

export type Timeline = 'now' | 'next-month' | 'next-quarter' | 'exploring';

export type DecisionUrgency = 'today' | 'week' | 'month' | 'exploring';

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IndividualPathAnswers {
  // Client Type
  clientType?: ClientType;

  // Assessment
  goals: Goal[];
  challenges: Challenge[];
  motivation?: Motivation;
  priorExperience?: Experience;

  // Service Preferences
  preferredServices: ServicePreference[];
  preferredFormat?: Format;
  sessionFrequency?: Frequency;
  experienceLevel?: ExperienceLevel;

  // Commitment & Lifestyle
  availableTime?: AvailableTime;
  obstacles?: string;
  lifestyleNotes?: string;
  supportSystem?: string;
  commitmentLevel?: CommitmentLevel;

  // Investment & Timeline
  budget?: Budget;
  timeline?: Timeline;
  roiExpectation?: string;
  decisionUrgency?: DecisionUrgency;

  // Contact Info
  contactInfo?: ContactInfo;
}

export interface PackageRecommendation {
  id: string;
  name: string;
  description: string;
  matchScore: number;
  matchReason: string;
  features: string[];
  price: string;
  duration: string;
  isFeatured?: boolean;
}

interface IndividualPathState {
  // Answers
  answers: IndividualPathAnswers;

  // Flow state
  currentStep: number;
  completedSteps: number[];
  isSubmitting: boolean;
  submitSuccess: boolean;
  submissionId: string | null;
  error: string | null;

  // Recommendations
  recommendations: PackageRecommendation[];
  selectedPackage: string | null;

  // Actions
  setAnswer: (key: keyof IndividualPathAnswers, value: any) => void;
  setAnswers: (answers: Partial<IndividualPathAnswers>) => void;
  addGoal: (goal: Goal) => void;
  removeGoal: (goal: Goal) => void;
  addChallenge: (challenge: Challenge) => void;
  removeChallenge: (challenge: Challenge) => void;
  addService: (service: ServicePreference) => void;
  removeService: (service: ServicePreference) => void;
  setContactInfo: (contactInfo: Partial<ContactInfo>) => void;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetQuestionnaire: () => void;
  submitQuestionnaire: () => Promise<boolean>;
  generateRecommendations: () => void;
  selectPackage: (packageId: string) => void;
  clearError: () => void;
}

const initialAnswers: IndividualPathAnswers = {
  clientType: 'individual',
  goals: [],
  challenges: [],
  preferredServices: [],
};

export const useIndividualPathStore = create<IndividualPathState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        answers: { ...initialAnswers },
        currentStep: 0,
        completedSteps: [],
        isSubmitting: false,
        submitSuccess: false,
        submissionId: null,
        error: null,
        recommendations: [],
        selectedPackage: null,

        // Actions
        setAnswer: (key, value) => {
          set((state) => ({
            answers: { ...state.answers, [key]: value },
          }));
        },

        setAnswers: (answers) => {
          set((state) => ({
            answers: { ...state.answers, ...answers },
          }));
        },

        addGoal: (goal) => {
          set((state) => {
            const goals = state.answers.goals || [];
            if (goals.length >= 3 || goals.includes(goal)) {
              return state;
            }
            return {
              answers: { ...state.answers, goals: [...goals, goal] },
            };
          });
        },

        removeGoal: (goal) => {
          set((state) => ({
            answers: {
              ...state.answers,
              goals: (state.answers.goals || []).filter((g) => g !== goal),
            },
          }));
        },

        addChallenge: (challenge) => {
          set((state) => {
            const challenges = state.answers.challenges || [];
            if (challenges.includes(challenge)) {
              return state;
            }
            return {
              answers: {
                ...state.answers,
                challenges: [...challenges, challenge],
              },
            };
          });
        },

        removeChallenge: (challenge) => {
          set((state) => ({
            answers: {
              ...state.answers,
              challenges: (state.answers.challenges || []).filter(
                (c) => c !== challenge
              ),
            },
          }));
        },

        addService: (service) => {
          set((state) => {
            const services = state.answers.preferredServices || [];
            if (services.includes(service)) {
              return state;
            }
            return {
              answers: {
                ...state.answers,
                preferredServices: [...services, service],
              },
            };
          });
        },

        removeService: (service) => {
          set((state) => ({
            answers: {
              ...state.answers,
              preferredServices: (
                state.answers.preferredServices || []
              ).filter((s) => s !== service),
            },
          }));
        },

        setContactInfo: (contactInfo) => {
          set((state) => ({
            answers: {
              ...state.answers,
              contactInfo: { ...state.answers.contactInfo, ...contactInfo } as ContactInfo,
            },
          }));
        },

        setCurrentStep: (step) => {
          set({ currentStep: step });
        },

        markStepComplete: (step) => {
          set((state) => {
            if (!state.completedSteps.includes(step)) {
              return { completedSteps: [...state.completedSteps, step] };
            }
            return state;
          });
        },

        nextStep: () => {
          set((state) => {
            const newStep = state.currentStep + 1;
            return {
              currentStep: newStep,
              completedSteps: state.completedSteps.includes(state.currentStep)
                ? state.completedSteps
                : [...state.completedSteps, state.currentStep],
            };
          });
        },

        previousStep: () => {
          set((state) => ({
            currentStep: Math.max(0, state.currentStep - 1),
          }));
        },

        resetQuestionnaire: () => {
          set({
            answers: { ...initialAnswers },
            currentStep: 0,
            completedSteps: [],
            isSubmitting: false,
            submitSuccess: false,
            submissionId: null,
            error: null,
            recommendations: [],
            selectedPackage: null,
          });
        },

        submitQuestionnaire: async () => {
          const state = get();
          const { answers } = state;

          // Validate contact info
          if (
            !answers.contactInfo?.name ||
            !answers.contactInfo?.email ||
            !answers.contactInfo?.phone
          ) {
            set({ error: 'Contact information is required' });
            return false;
          }

          set({ isSubmitting: true, error: null });

          try {
            // Import services dynamically to avoid circular dependencies
            const { submitToAzure } = await import('../../services/azure');
            const {
              sendQuestionnaireSubmissionEmail,
              sendAdminNotificationEmail,
            } = await import('../../services/email');

            // Submit to Azure
            const azureResponse = await submitToAzure({
              questionnaireType: 'Individual Path',
              timestamp: new Date().toISOString(),
              userInfo: {
                name: answers.contactInfo.name,
                email: answers.contactInfo.email,
                phone: answers.contactInfo.phone,
              },
              answers: answers,
            });

            if (!azureResponse.success) {
              throw new Error('Azure submission failed');
            }

            // Send emails
            await Promise.all([
              sendQuestionnaireSubmissionEmail(
                answers.contactInfo.email,
                answers.contactInfo.name,
                'Individual Path'
              ),
              sendAdminNotificationEmail(
                answers.contactInfo.name,
                answers.contactInfo.email,
                'Individual Path'
              ),
            ]);

            set({
              isSubmitting: false,
              submitSuccess: true,
              submissionId: azureResponse.submissionId,
            });

            return true;
          } catch (error) {
            set({
              isSubmitting: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to submit questionnaire',
            });
            return false;
          }
        },

        generateRecommendations: () => {
          const { answers } = get();
          const recommendations = calculateRecommendations(answers);
          set({ recommendations });
        },

        selectPackage: (packageId) => {
          set({ selectedPackage: packageId });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'individual-path-questionnaire',
        partialize: (state) => ({
          answers: state.answers,
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
        }),
      }
    ),
    { name: 'IndividualPathStore' }
  )
);

/**
 * Decision engine for package recommendations
 * Scores and ranks packages based on user answers
 */
function calculateRecommendations(
  answers: IndividualPathAnswers
): PackageRecommendation[] {
  const packages: PackageRecommendation[] = [];

  // Score calculation based on answers
  let brandingScore = 0;
  let coachingScore = 0;
  let fitnessScore = 0;

  // Goals scoring
  if (answers.goals.includes('career-growth')) brandingScore += 30;
  if (answers.goals.includes('leadership')) coachingScore += 30;
  if (answers.goals.includes('physical-wellness')) fitnessScore += 40;
  if (answers.goals.includes('mindset')) coachingScore += 30;
  if (answers.goals.includes('life-balance')) coachingScore += 25;

  // Service preferences
  if (answers.preferredServices.includes('branding')) brandingScore += 40;
  if (answers.preferredServices.includes('life-coaching')) coachingScore += 40;
  if (answers.preferredServices.includes('fitness')) fitnessScore += 40;
  if (answers.preferredServices.includes('identity-management'))
    brandingScore += 30;

  // Commitment level
  if (answers.commitmentLevel === 'intensive') {
    coachingScore += 10;
    fitnessScore += 10;
  }

  // Budget considerations
  if (answers.budget === 'over-5k') {
    brandingScore += 10;
    coachingScore += 10;
  }

  // Personal Branding Package
  if (brandingScore > 50 || answers.preferredServices.includes('branding')) {
    packages.push({
      id: 'personal-branding',
      name: 'Personal Branding Transformation',
      description:
        'Build your unique personal brand and online presence with professional guidance.',
      matchScore: brandingScore,
      matchReason:
        'Based on your career goals and interest in professional development.',
      features: [
        'Personal brand strategy development',
        'Professional online profile optimization',
        'Content strategy and creation guidance',
        'Personal website development',
        'Social media presence building',
      ],
      price: '$3,500 - $5,000',
      duration: '3 months',
      isFeatured: brandingScore > 70,
    });
  }

  // Life Coaching Package
  if (coachingScore > 50 || answers.preferredServices.includes('life-coaching')) {
    packages.push({
      id: 'life-coaching',
      name: 'Life Transformation Coaching',
      description:
        'One-on-one coaching to help you achieve your personal and professional goals.',
      matchScore: coachingScore,
      matchReason:
        'Your focus on personal growth and life balance aligns perfectly with coaching.',
      features: [
        'Weekly 1-on-1 coaching sessions',
        'Goal setting and accountability',
        'Personalized action plans',
        'Mindset and confidence building',
        'Work-life balance strategies',
      ],
      price: '$2,000 - $4,000',
      duration: '3-6 months',
      isFeatured: coachingScore > 70,
    });
  }

  // Fitness & Wellness Package
  if (fitnessScore > 50 || answers.preferredServices.includes('fitness')) {
    packages.push({
      id: 'fitness-wellness',
      name: 'Personal Training & Wellness',
      description:
        'Customized fitness and wellness program to help you achieve physical wellness.',
      matchScore: fitnessScore,
      matchReason:
        'Your physical wellness goals make this an ideal starting point.',
      features: [
        'Personalized fitness assessment',
        'Custom workout plans',
        'Nutrition guidance',
        'Weekly training sessions',
        'Progress tracking and adjustments',
      ],
      price: '$1,500 - $3,000',
      duration: '3 months',
      isFeatured: fitnessScore > 70,
    });
  }

  // Comprehensive Package (if multiple high scores)
  const totalScore = brandingScore + coachingScore + fitnessScore;
  if (totalScore > 150 || answers.goals.length >= 3) {
    packages.push({
      id: 'comprehensive',
      name: 'Complete Transformation Package',
      description:
        'A holistic approach combining branding, coaching, and wellness for total life transformation.',
      matchScore: totalScore / 3,
      matchReason:
        'Your diverse goals and commitment level suggest a comprehensive approach would serve you best.',
      features: [
        'All features from Branding, Coaching, and Fitness packages',
        'Integrated transformation strategy',
        'Priority support and scheduling',
        'Extended program duration',
        'Quarterly progress reviews',
      ],
      price: '$7,500+',
      duration: '6-12 months',
      isFeatured: true,
    });
  }

  // Sort by match score (highest first)
  packages.sort((a, b) => b.matchScore - a.matchScore);

  return packages.length > 0
    ? packages
    : [
        {
          id: 'discovery',
          name: 'Discovery Session',
          description:
            'Not sure where to start? Book a discovery session to explore your options.',
          matchScore: 50,
          matchReason:
            "Let's talk to find the perfect package for your unique needs.",
          features: [
            '60-minute consultation',
            'Goal assessment',
            'Personalized recommendations',
            'No commitment required',
          ],
          price: 'Complimentary',
          duration: '1 session',
          isFeatured: true,
        },
      ];
}
