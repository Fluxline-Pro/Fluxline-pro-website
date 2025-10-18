import React, { useState } from 'react';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { Typography } from '../../theme/components/typography/typography';
import { Container } from '../../theme/layouts/Container';
// import { FluentInput } from '../../theme/components/form-elements/input/input';
// import { FluentButton } from '../../theme/components/button/button';
import { useContactStore } from '../../store/store-specs/contactStore';
import {
  useIsMobile,
  useDeviceOrientation,
} from '../../theme/hooks/useMediaQuery';
import { ImageModal } from '../../theme/components/modal/image-modal';
import { SocialLinks } from '../../theme/components/header/social-links';
// Import business card images directly
import BusinessCardFront from '../../assets/images/businessCardFront.png';
import BusinessCardBack from '../../assets/images/businessCardBack.png';
import { CTACallout } from '../../theme/components';
// import { CONTENT_API_FLAGS, isApiAvailable } from '../../utils/contentDataManager';

// interface FormValidation {
//   name: string | null;
//   email: string | null;
//   message: string | null;
// }

// Obfuscated email to prevent spam crawlers
const getContactEmail = (): string => {
  const reversedLocal = 'ecneret'.split('').reverse().join('');
  const domain = ['fluxline', 'pro'].join('.');
  return `${reversedLocal}@${domain}`;
};

const BusinessCardSection: React.FC = () => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: '',
    alt: '',
  });

  return (
    <>
      <Typography
        variant='h3'
        textAlign='left'
        color={theme.palette.themePrimary}
        marginTop={isMobile ? theme.spacing.m : theme.spacing.xxl}
        marginBottom={isMobile ? theme.spacing.m : theme.spacing.l}
      >
        Business Card
      </Typography>
      <Container
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        gap={isMobile ? '3rem' : '1rem'}
        justifyContent={
          orientation === 'mobile-landscape' &&
          layoutPreference === 'left-handed'
            ? 'flex-end'
            : 'flex-start'
        }
      >
        <div
          className='business-card-container'
          onClick={() => {
            setSelectedImage({
              src: BusinessCardFront,
              alt: 'Fluxline Business Card Front',
            });
            setModalOpen(true);
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
        >
          <img
            src={BusinessCardFront}
            alt='Fluxline Business Card Front'
            style={{
              width: '50%',
              borderRadius: theme.borderRadius.container.button,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            className='business-card-image'
          />
          <div
            className='overlay'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'all 0.3s ease',
              color: 'white',
              borderRadius: theme.borderRadius.container.button,
            }}
          >
            <span
              style={{
                background: 'rgba(0,0,0,0.5)',
                padding: '8px 12px',
                borderRadius: '4px',
                backdropFilter: 'blur(2px)',
              }}
            >
              Click to expand
            </span>
          </div>
        </div>
        <div
          className='business-card-container'
          onClick={() => {
            setSelectedImage({
              src: BusinessCardBack,
              alt: 'Fluxline Business Card Back',
            });
            setModalOpen(true);
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
        >
          <img
            src={BusinessCardBack}
            alt='Fluxline Business Card Back'
            style={{
              width: '50%',
              borderRadius: theme.borderRadius.container.button,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            className='business-card-image'
          />
          <div
            className='overlay'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'all 0.3s ease',
              color: 'white',
              borderRadius: theme.borderRadius.container.button,
            }}
          >
            <span
              style={{
                background: 'rgba(0,0,0,0.5)',
                padding: '8px 12px',
                borderRadius: '4px',
                backdropFilter: 'blur(2px)',
              }}
            >
              Click to expand
            </span>
          </div>
        </div>
      </Container>

      {/* Image Modal for fullscreen viewing */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
      />

      {/* Inline styles for hover effects */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .business-card-container:hover .business-card-image {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .business-card-container:hover .overlay {
            opacity: 1;
          }
        `,
        }}
      />
    </>
  );
};

const VisionHappenSection: React.FC = () => {
  return (
    <CTACallout
      variant='consultation'
      hideBottomHR
      showOnlyFor={[]} // Show on all views since this is the contact page
    />
  );
};

const AboutMeSection: React.FC = () => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  return (
    <Container
      style={{
        background:
          theme.themeMode === 'high-contrast'
            ? theme.semanticColors.warningBackground
            : theme.palette.neutralLight,
        padding: isMobile ? theme.spacing.l : theme.spacing.xxl,
        borderRadius: theme.borderRadius.container.medium,
        marginBottom: theme.spacing.xl,
      }}
    >
      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom={theme.spacing.l}
        noHyphens
      >
        Fluxline helps visionary people, entrepreneurs, and small businesses
        build systems and wisdom that grow with them. We specialize in modular
        web development, scalable design ecosystems, personal training and
        nutrition, career development and life coaching, and human-centered
        technology—blending emotional clarity with strategic innovation.
      </Typography>

      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom={theme.spacing.l}
        noHyphens
      >
        Whether you're launching a brand, evolving your infrastructure, seeking
        personal innovation or improvement, or architecting a long-term
        solution, we design and execute to help you transform.
      </Typography>

      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom={theme.spacing.l}
        noHyphens
      >
        Founded by Terence Waters, Fluxline combines advanced architecture,
        creative storytelling, and intentional coaching to help you build more
        than just products—we help you build philosophies, living identities,
        and frameworks that adapt to change.
      </Typography>

      <Container
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        gap={theme.spacing.l}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent='space-between'
        marginTop={theme.spacing.l}
        padding={isMobile ? theme.spacing.m : theme.spacing.xl}
        style={{
          background:
            theme.themeMode === 'high-contrast'
              ? theme.palette.neutralDark
              : theme.palette.neutralLight,
          borderRadius: theme.borderRadius.container.small,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        }}
      >
        <Container display='flex' flexDirection='column' gap={theme.spacing.s}>
          <Typography
            variant='h4'
            color={theme.palette.themePrimary}
            fontWeight={theme.typography.fontWeights.semiBold}
            lineHeight='1.8'
          >
            Terence Waters
            <br />
          </Typography>
          <Typography
            variant='p'
            color={theme.palette.neutralPrimary}
            fontSize={theme.typography.fontSizes.clamp4}
          >
            Founder, CEO, Personal Trainer & Mythic Architect <br />
            Fluxline Resonance Group, LLC <br />
            Salt Lake City, UT <br />
            📧{' '}
            <a
              href={`mailto:${getContactEmail()}`}
              style={{
                color: theme.palette.themePrimary,
                textDecoration: 'underline',
              }}
            >
              {getContactEmail()}
            </a>
          </Typography>
        </Container>

        <Container
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          justifyContent='flex-start'
        >
          <Typography
            variant='h6'
            color={theme.palette.themePrimary}
            fontSize={theme.typography.fontSizes.clamp5}
            marginBottom={theme.spacing.s}
            textAlign='left'
          >
            Connect with us
          </Typography>
          <SocialLinks />
        </Container>
      </Container>
    </Container>
  );
};

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
    <Container maxWidth='1000px' paddingBottom={theme.spacing.xl}>
      <Typography
        variant='h3'
        textAlign='left'
        color={theme.palette.themePrimary}
        marginTop={isMobile ? theme.spacing.m : undefined}
        marginBottom={theme.spacing.m}
      >
        Let's connect!
      </Typography>
      <AboutMeSection />
      <BusinessCardSection />
      <VisionHappenSection />
      <CTACallout variant='services' showOnlyFor={[]} hideBottomHR />
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
