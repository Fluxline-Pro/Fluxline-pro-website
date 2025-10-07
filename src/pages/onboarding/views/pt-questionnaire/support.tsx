/**
 * PT Questionnaire Screen 4: Support & Accountability Preferences
 * Captures support level, accountability methods, nutrition interest, and wellness areas
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
  SupportLevel,
  AccountabilityMethod,
  NutritionInterest,
  WellnessArea,
} from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';

const supportLevelOptions: { value: SupportLevel; icon: string; label: string }[] = [
  { value: 'minimal-checkins', icon: '📝', label: 'Minimal Check-ins (mostly independent)' },
  { value: 'regular-support-weekly', icon: '🤝', label: 'Regular Support (weekly check-ins)' },
  { value: 'frequent-contact', icon: '💬', label: 'Frequent Contact (several times/week)' },
  { value: 'daily-accountability', icon: '📱', label: 'Daily Accountability' },
];

const accountabilityOptions: { value: AccountabilityMethod; label: string }[] = [
  { value: 'progress-photos', label: 'Progress photos/measurements' },
  { value: 'workout-tracking', label: 'Workout completion tracking' },
  { value: 'nutrition-logging', label: 'Nutrition logging' },
  { value: 'weekly-goals', label: 'Weekly goal-setting' },
  { value: 'community-support', label: 'Community support (Discord group)' },
  { value: 'milestone-celebrations', label: 'Milestone celebrations' },
  { value: 'gentle-reminders', label: 'Gentle reminders/encouragement' },
  { value: 'progress-dashboard', label: 'Progress dashboard' },
];

const nutritionInterestOptions: { value: NutritionInterest; icon: string; label: string }[] = [
  { value: 'not-right-now', icon: '🚫', label: 'Not Right Now' },
  { value: 'basic-guidance', icon: '📚', label: 'Basic Guidance' },
  { value: 'detailed-planning', icon: '📋', label: 'Detailed Planning' },
  { value: 'full-nutrition-coaching', icon: '🥗', label: 'Full Nutrition Coaching' },
];

const wellnessAreasOptions: { value: WellnessArea; label: string }[] = [
  { value: 'sleep-optimization', label: 'Sleep optimization' },
  { value: 'stress-management', label: 'Stress management' },
  { value: 'hydration-recovery', label: 'Hydration/recovery strategies' },
  { value: 'supplement-guidance', label: 'Supplement guidance' },
  { value: 'mindset-motivation', label: 'Mindset/motivation coaching' },
  { value: 'energy-management', label: 'Energy management' },
  { value: 'building-habits', label: 'Building habits' },
  { value: 'none-just-fitness', label: 'None – just fitness' },
];

const PTQuestionnaireSupport: React.FC = () => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  
  const {
    answers,
    setSupportLevel,
    setAccountabilityMethods,
    setNutritionInterest,
    setWellnessAreas,
  } = usePersonalTrainingStore();
  
  const [selectedSupport, setSelectedSupport] = React.useState<SupportLevel | null>(
    answers.supportLevel
  );
  const [selectedAccountability, setSelectedAccountability] = React.useState<AccountabilityMethod[]>(
    answers.accountabilityMethods
  );
  const [selectedNutrition, setSelectedNutrition] = React.useState<NutritionInterest | null>(
    answers.nutritionInterest
  );
  const [selectedWellness, setSelectedWellness] = React.useState<WellnessArea[]>(
    answers.wellnessAreas
  );

  const handleSupportSelect = (support: SupportLevel) => {
    setSelectedSupport(support);
    setSupportLevel(support);
  };

  const handleAccountabilityToggle = (method: AccountabilityMethod) => {
    let newMethods: AccountabilityMethod[];
    if (selectedAccountability.includes(method)) {
      newMethods = selectedAccountability.filter((m) => m !== method);
    } else {
      newMethods = [...selectedAccountability, method];
    }
    setSelectedAccountability(newMethods);
    setAccountabilityMethods(newMethods);
  };

  const handleNutritionSelect = (nutrition: NutritionInterest) => {
    setSelectedNutrition(nutrition);
    setNutritionInterest(nutrition);
  };

  const handleWellnessToggle = (area: WellnessArea) => {
    let newAreas: WellnessArea[];
    if (selectedWellness.includes(area)) {
      newAreas = selectedWellness.filter((a) => a !== area);
    } else {
      newAreas = [...selectedWellness, area];
    }
    setSelectedWellness(newAreas);
    setWellnessAreas(newAreas);
  };

  const canProceed = selectedSupport && selectedAccountability.length > 0 && selectedNutrition;

  const handleNext = () => {
    if (canProceed) {
      navigate('/onboarding/pt-questionnaire/investment');
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
        currentStep={4}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text='How can we best support your success?' />
      <H3styles text='We tailor our coaching style to what works for you' marginBottom='2rem' />

      {/* Question 1: Support Level */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What level of support and check-ins feels right?'
          marginBottom='0.75rem'
        />
        {supportLevelOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedSupport === option.value}
            onClick={() => handleSupportSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 2: Accountability Methods */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What helps keep you accountable? (multi-select)'
          marginBottom='0.75rem'
        />
        {accountabilityOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedAccountability.includes(option.value)}
            onClick={() => handleAccountabilityToggle(option.value)}
            multiSelect
          />
        ))}
      </Container>

      {/* Question 3: Nutrition Interest */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='How interested are you in nutrition guidance?'
          marginBottom='0.75rem'
        />
        {nutritionInterestOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedNutrition === option.value}
            onClick={() => handleNutritionSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 4: Wellness Areas (Optional) */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What other wellness areas interest you? (Optional)'
          marginBottom='0.75rem'
        />
        {wellnessAreasOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedWellness.includes(option.value)}
            onClick={() => handleWellnessToggle(option.value)}
            multiSelect
          />
        ))}
      </Container>

      <PTQuestionnaireButtonArray
        nextDisabled={!canProceed}
        currentStep='support'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireSupport;
