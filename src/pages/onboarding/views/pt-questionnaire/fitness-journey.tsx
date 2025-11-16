/**
 * PT Questionnaire Screen 1: Fitness Journey Stage
 * Captures fitness level and last workout information
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
  FitnessLevel,
  LastWorkoutTime,
} from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';

const fitnessLevels: { value: FitnessLevel; icon: string; label: string }[] = [
  {
    value: 'complete-beginner',
    icon: '🌱',
    label: 'Complete Beginner – I\'m just starting to think about fitness',
  },
  {
    value: 'returning-after-break',
    icon: '🔄',
    label: 'Returning after a break – I used to exercise, but it\'s been a while',
  },
  {
    value: 'some-experience',
    icon: '🚶',
    label: 'Some Experience – I exercise occasionally but not consistently',
  },
  {
    value: 'regular-exerciser',
    icon: '🏃',
    label: 'Regular Exerciser – I work out regularly but want better results',
  },
  {
    value: 'advanced-athlete',
    icon: '🏆',
    label: 'Advanced Athlete – I\'m experienced but need specialized guidance',
  },
];

const lastWorkoutOptions: { value: LastWorkoutTime; label: string }[] = [
  { value: 'this-week', label: 'This week' },
  { value: '2-4-weeks-ago', label: '2–4 weeks ago' },
  { value: '2-6-months-ago', label: '2–6 months ago' },
  { value: '6-plus-months-ago', label: '6+ months ago' },
  { value: 'over-a-year-ago', label: 'Over a year ago' },
];

const PTQuestionnaireFitnessJourney: React.FC = () => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  
  const { answers, setFitnessLevel, setLastWorkoutTime } = usePersonalTrainingStore();
  
  const [selectedLevel, setSelectedLevel] = React.useState<FitnessLevel | null>(
    answers.fitnessLevel
  );
  const [selectedLastWorkout, setSelectedLastWorkout] = React.useState<LastWorkoutTime | null>(
    answers.lastWorkoutTime
  );

  const showLastWorkoutQuestion = selectedLevel && selectedLevel !== 'complete-beginner';

  const handleLevelSelect = (level: FitnessLevel) => {
    setSelectedLevel(level);
    setFitnessLevel(level);
    
    // Reset last workout if selecting beginner
    if (level === 'complete-beginner') {
      setSelectedLastWorkout(null);
      setLastWorkoutTime(null as any);
    }
  };

  const handleLastWorkoutSelect = (time: LastWorkoutTime) => {
    setSelectedLastWorkout(time);
    setLastWorkoutTime(time);
  };

  const canProceed = selectedLevel && (selectedLevel === 'complete-beginner' || selectedLastWorkout);

  const handleNext = () => {
    if (canProceed) {
      navigate('/onboarding/pt-questionnaire/goals');
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
        currentStep={1}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text='Where are you in your fitness journey?' />
      <H3styles text='No judgment here – we meet you exactly where you are' marginBottom='2rem' />

      {/* Question 1: Fitness Level */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='How would you describe your current fitness level?'
          marginBottom='0.75rem'
        />
        {fitnessLevels.map((level) => (
          <QuestionOption
            key={level.value}
            icon={level.icon}
            label={level.label}
            value={level.value}
            isSelected={selectedLevel === level.value}
            onClick={() => handleLevelSelect(level.value)}
          />
        ))}
      </Container>

      {/* Question 2: Last Workout (conditional) */}
      {showLastWorkoutQuestion && (
        <Container
          display='flex'
          flexDirection='column'
          gap='0.75rem'
          width='100%'
          marginBottom='2rem'
        >
          <H5styles
            text='When was your last consistent workout routine?'
            marginBottom='0.75rem'
          />
          {lastWorkoutOptions.map((option) => (
            <QuestionOption
              key={option.value}
              label={option.label}
              value={option.value}
              isSelected={selectedLastWorkout === option.value}
              onClick={() => handleLastWorkoutSelect(option.value)}
            />
          ))}
        </Container>
      )}

      {/* Encouragement message */}
      <H5styles
        text='Every expert was once a beginner ✨'
        marginTop='1rem'
        marginBottom='1rem'
      />

      <PTQuestionnaireButtonArray
        showBackButton={false}
        nextDisabled={!canProceed}
        currentStep='fitness-journey'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireFitnessJourney;
