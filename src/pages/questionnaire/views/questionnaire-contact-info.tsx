import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles, H5styles } from '../../onboarding/component/typography';
import { useIndividualPathStore } from '../../../store/store-specs/individualPathStore';
import { TextField } from '@fluentui/react';

const QuestionnaireContactInfo: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, setContactInfo, nextStep, previousStep } =
    useIndividualPathStore();

  const contactInfo = answers.contactInfo || { name: '', email: '', phone: '' };

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const handleNext = () => {
    const newErrors = {
      name: contactInfo.name.trim() === '' ? 'Name is required' : '',
      email: !validateEmail(contactInfo.email)
        ? 'Please enter a valid email'
        : '',
      phone: !validatePhone(contactInfo.phone)
        ? 'Please enter a valid phone number'
        : '',
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='Almost there! 🎉' />
      <H3styles
        text="We need your contact information to show you personalized recommendations"
        marginBottom='clamp(1rem, 2vh, 1.5rem)'
      />
      <H5styles
        text="We'll never spam you or share your information"
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='Full Name'
            required
            value={contactInfo.name}
            onChange={(_, newValue) =>
              setContactInfo({ name: newValue || '' })
            }
            errorMessage={errors.name}
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='John Doe'
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='Email Address'
            required
            type='email'
            value={contactInfo.email}
            onChange={(_, newValue) =>
              setContactInfo({ email: newValue || '' })
            }
            errorMessage={errors.email}
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='john@example.com'
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='Phone Number'
            required
            type='tel'
            value={contactInfo.phone}
            onChange={(_, newValue) =>
              setContactInfo({ phone: newValue || '' })
            }
            errorMessage={errors.phone}
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='+1 (555) 123-4567'
          />
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: theme.palette.themeLighterAlt,
            borderRadius: '8px',
            borderLeft: `4px solid ${theme.palette.themePrimary}`,
          }}
        >
          <p
            style={{
              fontSize: theme.typography.fonts.h5.fontSize,
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralPrimary,
              margin: 0,
            }}
          >
            🔒 Your information is secure and will only be used to provide you with
            personalized recommendations and follow up on your inquiry.
          </p>
        </div>
      </div>

      <ButtonArray
        backButtonText='Investment'
        nextButtonText='See My Recommendations'
        nextDisabled={false}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-contact'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireContactInfo;
