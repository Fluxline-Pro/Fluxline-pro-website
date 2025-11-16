/**
 * PT Questionnaire Screen 3: Lifestyle & Preferences Assessment
 * Captures workout time, frequency, location, and physical considerations
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../../../component/typography';
import { PTQuestionnaireButtonArray } from '../../../component/pt-questionnaire/button-array';
import { ProgressIndicator } from '../../../component/pt-questionnaire/progress-indicator';
import { QuestionOption } from '../../../component/pt-questionnaire/question-option';
import FluentInput from '../../../../../theme/components/form-elements/input/input';
import {
  usePersonalTrainingStore,
  WorkoutTime,
  WorkoutFrequency,
  WorkoutLocation,
  PhysicalConsideration,
} from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';

const workoutTimeOptions: { value: WorkoutTime; icon: string; label: string }[] = [
  { value: 'very-limited-15-30', icon: '⏰', label: 'Very Limited (15–30 min)' },
  { value: 'some-flexibility-30-45', icon: '⏱️', label: 'Some Flexibility (30–45 min)' },
  { value: 'moderate-time-45-60', icon: '🕐', label: 'Moderate Time (45–60 min)' },
  { value: 'flexible-schedule-60-plus', icon: '🕒', label: 'Flexible Schedule (60+ min)' },
];

const workoutFrequencyOptions: { value: WorkoutFrequency; label: string }[] = [
  { value: '2x-per-week', label: '2x per week' },
  { value: '3x-per-week', label: '3x per week' },
  { value: '4x-per-week', label: '4x per week' },
  { value: '5-plus-per-week', label: '5+ per week' },
  { value: 'daily-movement', label: 'Daily movement' },
];

const workoutLocationOptions: { value: WorkoutLocation; icon: string; label: string }[] = [
  { value: 'home-only', icon: '🏠', label: 'Home Only' },
  { value: 'gym-only', icon: '🏋️', label: 'Gym Only' },
  { value: 'outdoor-preferred', icon: '🌳', label: 'Outdoor Preferred' },
  { value: 'no-preference', icon: '🔄', label: 'No Preference' },
];

const physicalConsiderationsOptions: { value: PhysicalConsideration; label: string }[] = [
  { value: 'no-limitations', label: 'No limitations or concerns' },
  { value: 'previous-injuries', label: 'Previous injuries (specify below)' },
  { value: 'joint-issues', label: 'Joint issues' },
  { value: 'chronic-conditions', label: 'Chronic conditions' },
  { value: 'pregnancy-postpartum', label: 'Pregnancy or postpartum' },
  { value: 'prefer-to-discuss-privately', label: 'Prefer to discuss privately' },
];

const PTQuestionnaireLifestyle: React.FC = () => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  
  const {
    answers,
    setWorkoutTime,
    setWorkoutFrequency,
    setWorkoutLocation,
    setPhysicalConsiderations,
    setPhysicalConsiderationsDetails,
  } = usePersonalTrainingStore();
  
  const [selectedTime, setSelectedTime] = React.useState<WorkoutTime | null>(
    answers.workoutTime
  );
  const [selectedFrequency, setSelectedFrequency] = React.useState<WorkoutFrequency | null>(
    answers.workoutFrequency
  );
  const [selectedLocation, setSelectedLocation] = React.useState<WorkoutLocation | null>(
    answers.workoutLocation
  );
  const [selectedConsiderations, setSelectedConsiderations] = React.useState<PhysicalConsideration[]>(
    answers.physicalConsiderations
  );
  const [considerationsDetails, setConsiderationsDetails] = React.useState<string>(
    answers.physicalConsiderationsDetails
  );

  const handleTimeSelect = (time: WorkoutTime) => {
    setSelectedTime(time);
    setWorkoutTime(time);
  };

  const handleFrequencySelect = (frequency: WorkoutFrequency) => {
    setSelectedFrequency(frequency);
    setWorkoutFrequency(frequency);
  };

  const handleLocationSelect = (location: WorkoutLocation) => {
    setSelectedLocation(location);
    setWorkoutLocation(location);
  };

  const handleConsiderationToggle = (consideration: PhysicalConsideration) => {
    let newConsiderations: PhysicalConsideration[];
    if (selectedConsiderations.includes(consideration)) {
      newConsiderations = selectedConsiderations.filter((c) => c !== consideration);
    } else {
      newConsiderations = [...selectedConsiderations, consideration];
    }
    setSelectedConsiderations(newConsiderations);
    setPhysicalConsiderations(newConsiderations);
  };

  const handleDetailsChange = (value: string) => {
    setConsiderationsDetails(value);
    setPhysicalConsiderationsDetails(value);
  };

  const canProceed = selectedTime && selectedFrequency && selectedLocation && selectedConsiderations.length > 0;

  const handleNext = () => {
    if (canProceed) {
      navigate('/onboarding/pt-questionnaire/support');
    }
  };

  const showDetailsInput = selectedConsiderations.includes('previous-injuries');

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
        currentStep={3}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text="Let's design around your real life" />
      <H3styles text='The best program fits seamlessly into your routine' marginBottom='2rem' />

      {/* Question 1: Workout Time */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='How much time can you realistically dedicate to workouts?'
          marginBottom='0.75rem'
        />
        {workoutTimeOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedTime === option.value}
            onClick={() => handleTimeSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 2: Workout Frequency */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='How often would you like to work out?'
          marginBottom='0.75rem'
        />
        {workoutFrequencyOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedFrequency === option.value}
            onClick={() => handleFrequencySelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 3: Workout Location */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='Where do you prefer to work out?'
          marginBottom='0.75rem'
        />
        {workoutLocationOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedLocation === option.value}
            onClick={() => handleLocationSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 4: Physical Considerations */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='Any physical considerations we should know about? (Optional)'
          marginBottom='0.75rem'
        />
        {physicalConsiderationsOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedConsiderations.includes(option.value)}
            onClick={() => handleConsiderationToggle(option.value)}
            multiSelect
          />
        ))}
        
        {showDetailsInput && (
          <div style={{ marginTop: '1rem' }}>
            <FluentInput
              label='Please specify any injuries or conditions'
              id='physical-details'
              name='physical-details'
              placeholder='e.g., knee injury, lower back pain...'
              value={considerationsDetails}
              onChange={handleDetailsChange}
              multiline
              rows={3}
            />
          </div>
        )}
      </Container>

      <PTQuestionnaireButtonArray
        nextDisabled={!canProceed}
        currentStep='lifestyle'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireLifestyle;
