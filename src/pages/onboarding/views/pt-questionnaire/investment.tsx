/**
 * PT Questionnaire Screen 5: Investment & Format Preferences
 * Captures budget, training format, payment structure, and start timeline
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
  MonthlyInvestment,
  TrainingFormat,
  PaymentStructure,
  StartTimeline,
} from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../../../../theme/hooks/useAppTheme';

const monthlyInvestmentOptions: { value: MonthlyInvestment; label: string }[] = [
  { value: 'under-150', label: 'Under $150/month' },
  { value: '150-250', label: '$150–250/month' },
  { value: '250-350', label: '$250–350/month' },
  { value: '350-plus', label: '$350+ per month' },
  { value: 'lets-discuss', label: 'Let\'s discuss options' },
];

const trainingFormatOptions: { value: TrainingFormat; icon: string; label: string }[] = [
  { value: 'online-only', icon: '💻', label: 'Online Only' },
  { value: 'in-person-only', icon: '🤝', label: 'In-Person Only' },
  { value: 'hybrid', icon: '🔀', label: 'Hybrid (Mix of Both)' },
  { value: 'not-sure-yet', icon: '🤷', label: 'Not Sure Yet' },
];

const paymentStructureOptions: { value: PaymentStructure; icon: string; label: string }[] = [
  { value: 'pay-per-session', icon: '💳', label: 'Pay Per Session ($75 per session)' },
  { value: 'monthly-payments', icon: '📅', label: 'Monthly Payments' },
  { value: 'quarterly-plans', icon: '💰', label: 'Quarterly Plans (save 10–15%)' },
  { value: 'longer-term-plans', icon: '🏆', label: 'Longer-term Plans (save 20–30%)' },
];

const startTimelineOptions: { value: StartTimeline; icon: string; label: string }[] = [
  { value: 'this-week', icon: '🚀', label: 'This Week' },
  { value: 'next-1-2-weeks', icon: '📅', label: 'Next 1–2 Weeks' },
  { value: 'within-month', icon: '🗓️', label: 'Within the Next Month' },
  { value: 'flexible-exploring', icon: '🤔', label: 'Flexible – Just exploring' },
];

const PTQuestionnaireInvestment: React.FC = () => {
  const { isMobile } = useDeviceType();
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  
  const {
    answers,
    setMonthlyInvestment,
    setTrainingFormat,
    setPaymentStructure,
    setStartTimeline,
  } = usePersonalTrainingStore();
  
  const [selectedInvestment, setSelectedInvestment] = React.useState<MonthlyInvestment | null>(
    answers.monthlyInvestment
  );
  const [selectedFormat, setSelectedFormat] = React.useState<TrainingFormat | null>(
    answers.trainingFormat
  );
  const [selectedPayment, setSelectedPayment] = React.useState<PaymentStructure | null>(
    answers.paymentStructure
  );
  const [selectedTimeline, setSelectedTimeline] = React.useState<StartTimeline | null>(
    answers.startTimeline
  );

  const handleInvestmentSelect = (investment: MonthlyInvestment) => {
    setSelectedInvestment(investment);
    setMonthlyInvestment(investment);
  };

  const handleFormatSelect = (format: TrainingFormat) => {
    setSelectedFormat(format);
    setTrainingFormat(format);
  };

  const handlePaymentSelect = (payment: PaymentStructure) => {
    setSelectedPayment(payment);
    setPaymentStructure(payment);
  };

  const handleTimelineSelect = (timeline: StartTimeline) => {
    setSelectedTimeline(timeline);
    setStartTimeline(timeline);
  };

  const canProceed = selectedInvestment && selectedFormat && selectedPayment && selectedTimeline;

  const handleNext = () => {
    if (canProceed) {
      navigate('/onboarding/pt-questionnaire/contact');
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
        currentStep={5}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text="Let's find the perfect fit for your budget and lifestyle" />
      <H3styles text='Flexible options because wellness should be accessible' marginBottom='2rem' />

      {/* Question 1: Monthly Investment */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What monthly investment feels comfortable for your wellness?'
          marginBottom='0.75rem'
        />
        {monthlyInvestmentOptions.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            value={option.value}
            isSelected={selectedInvestment === option.value}
            onClick={() => handleInvestmentSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 2: Training Format */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='What training format appeals to you most?'
          marginBottom='0.75rem'
        />
        {trainingFormatOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedFormat === option.value}
            onClick={() => handleFormatSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 3: Payment Structure */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='How would you prefer to structure payments?'
          marginBottom='0.75rem'
        />
        {paymentStructureOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedPayment === option.value}
            onClick={() => handlePaymentSelect(option.value)}
          />
        ))}
      </Container>

      {/* Question 4: Start Timeline */}
      <Container
        display='flex'
        flexDirection='column'
        gap='0.75rem'
        width='100%'
        marginBottom='2rem'
      >
        <H5styles
          text='When would you like to start your wellness journey?'
          marginBottom='0.75rem'
        />
        {startTimelineOptions.map((option) => (
          <QuestionOption
            key={option.value}
            icon={option.icon}
            label={option.label}
            value={option.value}
            isSelected={selectedTimeline === option.value}
            onClick={() => handleTimelineSelect(option.value)}
          />
        ))}
      </Container>

      {/* Highlight message */}
      <div
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          backgroundColor: `${theme.palette.themePrimary}15`,
          borderRadius: '8px',
          borderLeft: `4px solid ${theme.palette.themePrimary}`,
          marginBottom: '2rem',
        }}
      >
        <H5styles
          text='✨ Your first consultation is free, and first 2 sessions are on us!'
          marginBottom='0'
        />
      </div>

      <PTQuestionnaireButtonArray
        nextDisabled={!canProceed}
        currentStep='investment'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireInvestment;
