/**
 * PT Questionnaire Screen 2: Goals & Motivation Assessment
 * Captures fitness goals, motivation, and challenges
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../../../component/typography';
import { PTQuestionnaireButtonArray } from '../../../component/pt-questionnaire/button-array';
import { ProgressIndicator } from '../../../component/pt-questionnaire/progress-indicator';
import { QuestionOption } from '../../../component/pt-questionnaire/question-option';
import {
  usePersonalTrainingStore,
  FitnessGoal,
  Motivation,
  Challenge,
} from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';

const fitnessGoalsOptions: { value: FitnessGoal; icon: string; label: string }[] = [
  { value: 'weight-management', icon: '⚖️', label: 'Healthy Weight Management' },
  { value: 'building-strength', icon: '💪', label: 'Building Strength' },
  { value: 'health-wellness', icon: '🌿', label: 'Overall Health & Wellness' },
  { value: 'more-energy', icon: '⚡', label: 'More Energy' },
  { value: 'stress-management', icon: '🧘', label: 'Stress Management' },
  { value: 'athletic-performance', icon: '🏃', label: 'Athletic Performance' },
  { value: 'body-confidence', icon: '✨', label: 'Body Confidence' },
  { value: 'body-building', icon: '💪', label: 'Progressive Body Building' },
];

const motivationOptions: { value: Motivation; label: string }[] = [
  { value: 'family-example', label: 'Setting a good example for family' },
  { value: 'feeling-strong', label: 'Feeling strong and capable' },
  { value: 'more-energy-daily', label: 'More energy for daily activities' },
  { value: 'health-markers', label: 'Improving health markers' },
  { value: 'confident-in-clothes', label: 'Feeling confident in clothes' },
  { value: 'stress-mental-health', label: 'Managing stress and mental health' },
  { value: 'specific-event', label: 'Preparing for a specific event' },
  { value: 'feeling-better-overall', label: 'Just feeling better overall' },
];

const challengesOptions: { value: Challenge; label: string }[] = [
  { value: 'time-constraints', label: 'Time constraints with work/family' },
  { value: 'not-knowing-where-to-start', label: 'Not knowing where to start' },
  { value: 'gym-intimidation', label: 'Gym intimidation or discomfort' },
  { value: 'inconsistent-motivation', label: 'Inconsistent motivation' },
  { value: 'previous-injuries', label: 'Previous injuries or physical limitations' },
  { value: 'confusing-info', label: 'Confusing/conflicting info' },
  { value: 'all-or-nothing-thinking', label: 'All-or-nothing thinking' },
  { value: 'lack-of-accountability', label: 'Lack of accountability' },
  { value: 'none-just-started', label: 'None – I\'m just getting started!' },
];

const PTQuestionnaireGoals: React.FC = () => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  
  const { answers, setFitnessGoals, setMotivation, setChallenges } = usePersonalTrainingStore();
  
  const [selectedGoals, setSelectedGoals] = React.useState<FitnessGoal[]>(
    answers.fitnessGoals
  );
  const [selectedMotivation, setSelectedMotivation] = React.useState<Motivation | null>(
    answers.motivation
  );
  const [selectedChallenges, setSelectedChallenges] = React.useState<Challenge[]>(
    answers.challenges
  );

  const handleGoalToggle = (goal: FitnessGoal) => {
    let newGoals: FitnessGoal[];
    if (selectedGoals.includes(goal)) {
      newGoals = selectedGoals.filter((g) => g !== goal);
    } else {
      // Limit to 3 goals
      if (selectedGoals.length >= 3) {
        newGoals = [...selectedGoals.slice(1), goal];
      } else {
        newGoals = [...selectedGoals, goal];
      }
    }
    setSelectedGoals(newGoals);
    setFitnessGoals(newGoals);
  };

  const handleMotivationSelect = (motivation: Motivation) => {
    setSelectedMotivation(motivation);
    setMotivation(motivation);
  };

  const handleChallengeToggle = (challenge: Challenge) => {
    let newChallenges: Challenge[];
    if (selectedChallenges.includes(challenge)) {
      newChallenges = selectedChallenges.filter((c) => c !== challenge);
    } else {
      newChallenges = [...selectedChallenges, challenge];
    }
    setSelectedChallenges(newChallenges);
    setChallenges(newChallenges);
  };

  const canProceed = selectedGoals.length > 0 && selectedMotivation;

  const handleNext = () => {
    if (canProceed) {
      navigate('/onboarding/pt-questionnaire/lifestyle');
    }
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
      maxWidth='800px'
      margin='0 auto'
      padding={isMobile ? '1rem' : '2rem'}
    >
      <ProgressIndicator
        currentStep={2}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text='What draws you to fitness and wellness?' />
      <H3styles text='Understanding your "why" helps us create the perfect program' marginBottom='2rem' />

      {/* Question 1: Goals (select up to 3) */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text={`What are your main goals? (select up to 3) ${selectedGoals.length > 0 ? `- ${selectedGoals.length}/3 selected` : ''}`}
          marginBottom='0.75rem'
        />
        {fitnessGoalsOptions.map((goal) => (
          <QuestionOption
            key={goal.value}
            icon={goal.icon}
            label={goal.label}
            value={goal.value}
            isSelected={selectedGoals.includes(goal.value)}
            onClick={() => handleGoalToggle(goal.value)}
            multiSelect
          />
        ))}
      </Container>

      {/* Question 2: Motivation */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What motivates you most?'
          marginBottom='0.75rem'
        />
        {motivationOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedMotivation === option.value}
            onClick={() => handleMotivationSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 3: Challenges (Optional) */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What has made fitness challenging before? (Optional)'
          marginBottom='0.75rem'
        />
        {challengesOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedChallenges.includes(option.value)}
            onClick={() => handleChallengeToggle(option.value)}
            multiSelect
          />
        ))}
      </Container>

      <PTQuestionnaireButtonArray
        nextDisabled={!canProceed}
        currentStep='goals'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireGoals;
