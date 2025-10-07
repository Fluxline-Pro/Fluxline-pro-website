/**
 * PT Questionnaire Screen 6: Contact Information
 * Captures name, phone, and email before showing results
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../../../component/typography';
import { PTQuestionnaireButtonArray } from '../../../component/pt-questionnaire/button-array';
import { ProgressIndicator } from '../../../component/pt-questionnaire/progress-indicator';
import FluentInput from '../../../../../theme/components/form-elements/input/input';
import { usePersonalTrainingStore } from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';

const PTQuestionnaireContact: React.FC = () => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  
  const { answers, setContactInfo } = usePersonalTrainingStore();
  
  const [name, setName] = React.useState<string>(answers.contactName);
  const [phone, setPhone] = React.useState<string>(answers.contactPhone);
  const [email, setEmail] = React.useState<string>(answers.contactEmail);
  
  const [nameError, setNameError] = React.useState<string>('');
  const [phoneError, setPhoneError] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');

  const validateName = (value: string): boolean => {
    if (!value || value.trim().length < 2) {
      setNameError('Please enter your full name');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePhone = (value: string): boolean => {
    // Basic phone validation - allow various formats
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!value || !phoneRegex.test(value)) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (value) validateName(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value) validatePhone(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value) validateEmail(value);
  };

  const handleNext = () => {
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    if (isNameValid && isPhoneValid && isEmailValid) {
      setContactInfo(name, phone, email);
      navigate('/onboarding/pt-questionnaire/results');
    }
  };

  const canProceed = name.trim().length >= 2 && phone.length >= 10 && email.includes('@');

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
        currentStep={6}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text="Almost there! Let's connect" />
      <H3styles text='We need your contact info to share your personalized recommendations' marginBottom='2rem' />

      <Container
        display='flex'
        flexDirection='column'
        gap='1.5rem'
        width='100%'
        marginBottom='2rem'
      >
        <FluentInput
          label='Full Name'
          id='contact-name'
          name='contact-name'
          placeholder='Enter your full name'
          required
          value={name}
          onChange={handleNameChange}
          errorMessage={nameError}
          error={!!nameError}
        />

        <FluentInput
          label='Phone Number'
          id='contact-phone'
          name='contact-phone'
          placeholder='(555) 123-4567'
          required
          value={phone}
          onChange={handlePhoneChange}
          errorMessage={phoneError}
          error={!!phoneError}
        />

        <FluentInput
          label='Email Address'
          id='contact-email'
          name='contact-email'
          placeholder='you@example.com'
          type='email'
          required
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailError}
          error={!!emailError}
        />
      </Container>

      <H5styles
        text='🔒 Your information is secure and will only be used to contact you about your fitness journey'
        marginBottom='1rem'
      />

      <PTQuestionnaireButtonArray
        nextDisabled={!canProceed}
        currentStep='contact'
        onNext={handleNext}
      />
    </Container>
  );
};

export default PTQuestionnaireContact;
