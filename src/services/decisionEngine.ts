/**
 * Decision Engine for Personal Training Recommendations
 * Analyzes questionnaire answers and recommends best-fit programs
 */

import { QuestionnaireAnswers } from '../store/store-specs/personalTrainingStore';

export interface ProgramRecommendation {
  title: string;
  description: string;
  idealFor: string[];
  format: string;
  priceRange: string;
  score: number;
}

export interface RecommendationResult {
  topRecommendation: ProgramRecommendation;
  alternativeRecommendations: ProgramRecommendation[];
  personalizedMessage: string;
  nextSteps: string[];
}

/**
 * Calculate program fit score based on questionnaire answers
 */
const calculateProgramScore = (
  answers: QuestionnaireAnswers,
  programCriteria: {
    fitnessLevels?: string[];
    formats?: string[];
    investmentRanges?: string[];
    supportLevels?: string[];
  }
): number => {
  let score = 0;
  let maxScore = 0;

  // Fitness level match
  if (programCriteria.fitnessLevels && answers.fitnessLevel) {
    maxScore += 25;
    if (programCriteria.fitnessLevels.includes(answers.fitnessLevel)) {
      score += 25;
    }
  }

  // Training format match
  if (programCriteria.formats && answers.trainingFormat) {
    maxScore += 20;
    if (programCriteria.formats.includes(answers.trainingFormat)) {
      score += 20;
    }
  }

  // Budget match
  if (programCriteria.investmentRanges && answers.monthlyInvestment) {
    maxScore += 20;
    if (programCriteria.investmentRanges.includes(answers.monthlyInvestment)) {
      score += 20;
    }
  }

  // Support level match
  if (programCriteria.supportLevels && answers.supportLevel) {
    maxScore += 15;
    if (programCriteria.supportLevels.includes(answers.supportLevel)) {
      score += 15;
    }
  }

  // Workout frequency compatibility
  maxScore += 10;
  if (answers.workoutFrequency) {
    score += 10;
  }

  // Goals clarity
  maxScore += 10;
  if (answers.fitnessGoals.length > 0) {
    score += 10;
  }

  return maxScore > 0 ? (score / maxScore) * 100 : 0;
};

/**
 * Generate personalized message based on answers
 */
const generatePersonalizedMessage = (answers: QuestionnaireAnswers): string => {
  const name = answers.contactName || 'there';
  const level = answers.fitnessLevel || 'your current level';
  const goals = answers.fitnessGoals.slice(0, 2).join(' and ') || 'your goals';

  return `Hi ${name}! Based on your ${level} fitness level and your focus on ${goals}, I've put together some recommendations that I think will be a great fit for you. Your wellness journey is unique, and I'm excited to help you achieve your goals! 🌟`;
};

/**
 * Generate next steps based on answers and timeline
 */
const generateNextSteps = (answers: QuestionnaireAnswers): string[] => {
  const steps: string[] = [
    'Terence will review your responses and reach out within 24 hours',
  ];

  if (answers.startTimeline === 'this-week') {
    steps.push('Since you want to start this week, Terence will prioritize scheduling your free consultation');
  } else if (answers.startTimeline === 'next-1-2-weeks') {
    steps.push('We\'ll schedule your free consultation at a time that works for you');
  }

  if (answers.nutritionInterest === 'full-nutrition-coaching' || answers.nutritionInterest === 'detailed-planning') {
    steps.push('Prepare any questions about nutrition guidance for your consultation');
  }

  steps.push('Remember: Your first consultation is free, and your first 2 sessions are on us!');

  return steps;
};

/**
 * Main decision engine function
 */
export const generateRecommendations = (
  answers: QuestionnaireAnswers
): RecommendationResult => {
  // Define available programs
  const programs: ProgramRecommendation[] = [
    {
      title: '1-on-1 Premium Personal Training',
      description: 'Fully customized training with dedicated personal attention, progress tracking, and comprehensive support.',
      idealFor: ['Specific goals', 'Need accountability', 'Want personalized attention'],
      format: 'In-person or Hybrid',
      priceRange: '$250-$350+/month',
      score: calculateProgramScore(answers, {
        fitnessLevels: ['complete-beginner', 'returning-after-break', 'some-experience'],
        formats: ['in-person-only', 'hybrid'],
        investmentRanges: ['250-350', '350-plus'],
        supportLevels: ['regular-support-weekly', 'frequent-contact', 'daily-accountability'],
      }),
    },
    {
      title: 'Online Coaching Program',
      description: 'Flexible online training with custom workout plans, weekly check-ins, and app-based progress tracking.',
      idealFor: ['Home workouts', 'Flexible schedule', 'Self-motivated'],
      format: 'Online Only',
      priceRange: '$150-$250/month',
      score: calculateProgramScore(answers, {
        fitnessLevels: ['some-experience', 'regular-exerciser', 'advanced-athlete'],
        formats: ['online-only', 'not-sure-yet'],
        investmentRanges: ['under-150', '150-250'],
        supportLevels: ['minimal-checkins', 'regular-support-weekly'],
      }),
    },
    {
      title: 'Hybrid Training Package',
      description: 'Best of both worlds: combination of in-person sessions and online support for maximum flexibility.',
      idealFor: ['Want flexibility', 'Mix of guidance and independence', 'Balanced approach'],
      format: 'Hybrid',
      priceRange: '$200-$300/month',
      score: calculateProgramScore(answers, {
        fitnessLevels: ['returning-after-break', 'some-experience', 'regular-exerciser'],
        formats: ['hybrid', 'not-sure-yet'],
        investmentRanges: ['150-250', '250-350'],
        supportLevels: ['regular-support-weekly', 'frequent-contact'],
      }),
    },
    {
      title: 'Group Training Sessions',
      description: 'Small group training (3-5 people) with personalized attention in a supportive, motivating environment.',
      idealFor: ['Community motivation', 'Cost-effective', 'Social fitness'],
      format: 'In-person',
      priceRange: '$100-$175/month',
      score: calculateProgramScore(answers, {
        fitnessLevels: ['complete-beginner', 'returning-after-break', 'some-experience'],
        formats: ['in-person-only', 'hybrid'],
        investmentRanges: ['under-150', '150-250'],
        supportLevels: ['minimal-checkins', 'regular-support-weekly'],
      }),
    },
  ];

  // Boost scores based on specific criteria
  programs.forEach((program) => {
    // Boost for community support preference
    if (answers.accountabilityMethods.includes('community-support') && program.title.includes('Group')) {
      program.score += 15;
    }

    // Boost for home preference
    if (answers.workoutLocation === 'home-only' && program.format === 'Online Only') {
      program.score += 15;
    }

    // Boost for gym preference
    if (answers.workoutLocation === 'gym-only' && program.format.includes('In-person')) {
      program.score += 15;
    }

    // Boost for beginners wanting support
    if (
      (answers.fitnessLevel === 'complete-beginner' || answers.fitnessLevel === 'returning-after-break') &&
      (answers.supportLevel === 'frequent-contact' || answers.supportLevel === 'daily-accountability')
    ) {
      if (program.title.includes('1-on-1')) {
        program.score += 20;
      }
    }
  });

  // Sort programs by score
  programs.sort((a, b) => b.score - a.score);

  const topRecommendation = programs[0];
  const alternativeRecommendations = programs.slice(1, 3);

  return {
    topRecommendation,
    alternativeRecommendations,
    personalizedMessage: generatePersonalizedMessage(answers),
    nextSteps: generateNextSteps(answers),
  };
};
