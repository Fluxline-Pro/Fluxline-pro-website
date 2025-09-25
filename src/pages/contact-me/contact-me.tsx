import React from 'react';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { Typography } from '../../theme/components/typography/typography';
import { Container } from '../../theme/layouts/Container';
// import { FluentInput } from '../../theme/components/form-elements/input/input';
// import { FluentButton } from '../../theme/components/button/button';
import { BookingsButton } from '../../theme/components/button/bookings-button/bookings-button';
import { useContactStore } from '../../store/store-specs/contactStore';
import { useIsMobile } from '../../theme/hooks/useMediaQuery';
import { DisplayGrid, GridItem } from '../../theme/layouts/DisplayGrid';
// Import business card images directly
import BusinessCardFront from '../../assets/images/businessCardFront.png';
import BusinessCardBack from '../../assets/images/businessCardBack.png';
// import { CONTENT_API_FLAGS, isApiAvailable } from '../../utils/contentDataManager';

// interface FormValidation {
//   name: string | null;
//   email: string | null;
//   message: string | null;
// }

const ContactForm: React.FC = () => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  // Use Zustand contact store
  const {
    // formData,
    // isSubmitting,
    submitSuccess,
    // error,
    // setFormData,
    // submitContactForm,
    // resetForm,
    // clearErrors,
    clearSubmissionStatus,
  } = useContactStore();

  // Local validation state for real-time feedback
  // const [validationErrors, setValidationErrors] = React.useState<FormValidation>({
  //   name: null,
  //   email: null,
  //   message: null,
  // });

  // const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false);

  // Check if API is available
  // const isContactApiAvailable = React.useMemo(() => {
  //   return CONTENT_API_FLAGS.contact && isApiAvailable();
  // }, []);

  // Validate individual fields
  // const validateField = React.useCallback((fieldName: string, value: string): string | null => {
  //   switch (fieldName) {
  //     case 'name':
  //       if (!value || value.trim().length < 2) {
  //         return 'Name is required and must be at least 2 characters';
  //       }
  //       return null;
  //     case 'email':
  //       if (!value || value.trim().length === 0) {
  //         return 'Email is required';
  //       }
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (!emailRegex.test(value.trim())) {
  //         return 'Please enter a valid email address';
  //       }
  //       return null;
  //     case 'message':
  //       if (!value || value.trim().length < 10) {
  //         return 'Message is required and must be at least 10 characters';
  //       }
  //       return null;
  //     default:
  //       return null;
  //   }
  // }, []);

  // Validate all fields
  // const validateAllFields = React.useCallback(() => {
  //   const errors: FormValidation = {
  //     name: validateField('name', formData.name),
  //     email: validateField('email', formData.email),
  //     message: validateField('message', formData.message),
  //   };
  //   setValidationErrors(errors);
  //   return !errors.name && !errors.email && !errors.message;
  // }, [formData, validateField]);

  // TO DO: Implement real-time validation
  // const handleChange = (fieldName: string) => (value: string) => {
  //   // Update the store
  //   setFormData({ [fieldName]: value });

  //   // Clear previous errors when user starts typing
  //   clearErrors();

  //   // Real-time validation if form has been submitted
  //   if (hasBeenSubmitted) {
  //     const error = validateField(fieldName, value);
  //     setValidationErrors(prev => ({
  //       ...prev,
  //       [fieldName]: error,
  //     }));
  //   }
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setHasBeenSubmitted(true);

  //   // Clear previous submission status
  //   clearSubmissionStatus();

  //   // Validate all fields
  //   if (!validateAllFields()) {
  //     return;
  //   }

  //   if (!isContactApiAvailable) {
  //     // Fallback for when API is not available
  //     console.log('API not available, using fallback submission:', formData);
  //     alert('Contact form submission is currently unavailable. Please try again later or contact directly via email.');
  //     return;
  //   }

  //   try {
  //     const success = await submitContactForm();
  //     if (success) {
  //       // Reset form and validation on successful submission
  //       setValidationErrors({ name: null, email: null, message: null });
  //       setHasBeenSubmitted(false);
  //       alert('Message sent successfully! Thank you for contacting me.');
  //     }
  //   } catch (err) {
  //     console.error('Form submission error:', err);
  //   }
  // };

  // Clear success status after a delay
  React.useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        clearSubmissionStatus();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, clearSubmissionStatus]);

  return (
    <Container maxWidth='1000px'>
      <Typography
        variant='h2'
        textAlign='left'
        color={theme.palette.themePrimary}
        fontSize={theme.typography.fontSizes.clamp7}
        fontVariationSettings='wght 400,wdth 300,slnt 0'
        marginTop={isMobile ? theme.spacing.m : undefined}
      >
        Let's connect!
      </Typography>
      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom={theme.spacing.m}
        noHyphens
      >
        Let's discuss your needs and goals! Whether you're seeking project
        estimates, personalized training, strategic consulting, or web
        development, we're happy to help. Click the button to book a free, no
        obligation consultation.
      </Typography>
      <BookingsButton />
      <Typography
        variant='h2'
        textAlign='left'
        color={theme.palette.themePrimary}
        fontSize={theme.typography.fontSizes.clamp7}
        fontVariationSettings='wght 400,wdth 300,slnt 0'
        marginTop={isMobile ? theme.spacing.m : theme.spacing.xxl}
        marginBottom={isMobile ? theme.spacing.m : theme.spacing.l}
      >
        Business Card
      </Typography>
      <Container
        display='flex'
        marginBottom={theme.spacing.xxl}
      >
        <GridItem>
          <img
            src={BusinessCardFront}
            alt='Fluxline Business Card Front'
            style={{
              width: '70%',
              borderRadius: theme.borderRadius.container.button,
            }}
          />
        </GridItem>
        <GridItem>
          <img
            src={BusinessCardBack}
            alt='Fluxline Business Card Back'
            style={{
              width: '70%',
              borderRadius: theme.borderRadius.container.button,
            }}
          />
        </GridItem>
      </Container>
      {/* <Typography
        variant='h2'
        textAlign='left'
        color={theme.palette.themePrimary}
        margin='3rem 0 0'
        fontSize={theme.typography.fontSizes.clamp7}
        fontVariationSettings='wght 400,wdth 300,slnt 0'
      >
        Contact Me Form
      </Typography> */}

      {/* Contact form temporarily disabled due to backend issues */}
      {/* <Typography
        variant='p'
        color={theme.palette.orangeLighter}
        marginBottom={theme.spacing.m}
        padding={theme.spacing.m}
        style={{
          background: 'linear-gradient(90deg, #fcf0e0ff 80%, #fcdfbbff 100%)',
          borderRadius: theme.borderRadius.container.button,
          border: `1px solid ${theme.palette.orangeLighter}`,
        }}
      >
        🚧 Coming soon! For now, please click the booking button above to get in touch with me.
      </Typography> */}

      {/* 
      TODO: Re-enable contact form once backend issues are resolved
      
      {/* Show API status for development */}
      {/*process.env.NODE_ENV === 'development' && (
        <Typography
          variant='p'
          color={isContactApiAvailable ? theme.palette.green : theme.palette.orange}
          marginBottom={theme.spacing.s}
          fontSize={theme.typography.fontSizes.small}
        >
          API Status: {isContactApiAvailable ? 'Connected' : 'Using fallback mode'}
        </Typography>
      )*/}

      {/* Show success message */}
      {/*submitSuccess && (
        <Typography
          variant='p'
          color={theme.palette.green}
          marginBottom={theme.spacing.m}
          padding={theme.spacing.m}
          style={{
            backgroundColor: theme.palette.greenLight,
            borderRadius: theme.borderRadius.container.button,
            border: `1px solid ${theme.palette.green}`,
          }}
        >
          ✅ Message sent successfully! Thank you for contacting me.
        </Typography>
      )*/}

      {/* Show error message */}
      {/*error && (
        <Typography
          variant='p'
          color={theme.palette.red}
          marginBottom={theme.spacing.m}
          padding={theme.spacing.m}
          style={{
            backgroundColor: theme.palette.redLight,
            borderRadius: theme.borderRadius.container.button,
            border: `1px solid ${theme.palette.red}`,
          }}
        >
          ❌ {error}
        </Typography>
      )*/}

      {/*<form onSubmit={handleSubmit}>
        <FluentInput
          type='text'
          label='name'
          placeholder='enter your name'
          value={formData.name}
          id='name'
          name='name'
          onChange={handleChange('name')}
          required
          error={!!validationErrors.name}
          errorMessage={validationErrors.name || undefined}
        />

        <FluentInput
          type='email'
          label='email'
          placeholder='enter your email'
          value={formData.email}
          id='email'
          name='email'
          onChange={handleChange('email')}
          required
          error={!!validationErrors.email}
          errorMessage={validationErrors.email || undefined}
        />
        
        <FluentInput
          type='textarea'
          label='message'
          placeholder='enter a message'
          value={formData.message}
          id='message'
          name='message'
          onChange={handleChange('message')}
          required
          error={!!validationErrors.message}
          errorMessage={validationErrors.message || undefined}
        />

        <FluentButton
          type='submit'
          disabled={isSubmitting}
          onSubmit={handleSubmit}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </FluentButton>
      </form>*/}
    </Container>
  );
};

export const ContactMe: React.FC = () => {
  return <ContactForm />;
};

export default ContactMe;
