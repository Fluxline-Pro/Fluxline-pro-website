import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import {
  useDeviceOrientation,
  useIsMobile,
} from '../../theme/hooks/useMediaQuery';
// import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import useBackgroundImage from '../../theme/hooks/useBackgroundImage';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import { LayoutGrid } from '../../theme/layouts/LayoutGrid';
import { Typography } from '../../theme/components/typography/typography';
// import { ProgressBar } from '../../theme/components/progress-bar/progress-bar';
import { BookingsButton } from '../../theme/components/button/bookings-button/bookings-button';

export const UnderConstruction = () => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const currentView = useLocation().pathname;
  // const { currentView } = useNavigationStore();

  // console.log('Current view:', currentView);

  return (
    <>
      <h1
        style={{
          ...theme.typography.fonts.h1,
          color:
            currentView === '/'
              ? theme.palette.white
              : theme.palette.themePrimary,
          marginBottom: `${orientation === 'mobile-landscape' ? theme.spacing.xxs : theme.spacing.s}`,
          ...(orientation === 'portrait' && {
            fontSize: 'clamp(2.5rem, 8cqi, 4rem)',
          }),
          ...(orientation === 'square' && {
            fontSize: 'clamp(4rem, 12cqi, 6rem)',
          }),
          ...(orientation === 'mobile-landscape' && {
            fontSize: 'clamp(2.5rem, 8cqi, 4rem)',
          }),
          ...((orientation === 'landscape' || orientation === 'ultrawide') && {
            fontSize: 'clamp(4rem, 8cqi, 6rem)',
          }),
          textShadow: theme.typography.textShadows.textBig,
          textAlign: 'center',
          opacity: 1,
        }}
      >
        Welcome to <br />
        Fluxline
      </h1>
      <h2
        style={{
          ...theme.typography.fonts.homeH3,
          color:
            currentView === '/'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
          marginBottom: 0,
          opacity: 1,
          ...(orientation === 'portrait' && {
            fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
          }),
          ...(orientation === 'square' && {
            fontSize: 'clamp(2rem, 6cqi, 3rem)',
          }),
          ...(orientation === 'mobile-landscape' && {
            fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
          }),
          ...((orientation === 'landscape' || orientation === 'ultrawide') && {
            fontSize: 'clamp(2.5rem, 3cqi, 3.5rem)',
          }),
          textTransform: 'none',
          textAlign: 'center',
        }}
      >
        Strategic Architecture for Modern Business
        <br />
        Coming Soon <br />
        Transform your vision into reality.
      </h2>
    </>
  );
};

const HomeContent: React.FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const { theme, themeMode } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [animateDivider, setAnimateDivider] = React.useState(false);
  const [animateHeader, setAnimateHeader] = React.useState(false);
  const [animateSubHeader, setAnimateSubHeader] = React.useState(false);
  const [animateSubHeaderLines, setAnimateSubHeaderLines] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  React.useEffect(() => {
    // First line animation
    setTimeout(() => {
      setAnimateHeader(true);
    }, 300);

    // Name and HR animation
    setTimeout(() => {
      setAnimateHeader(true);
      setAnimateDivider(true);
    }, 800);

    // Subheader lines animations
    setTimeout(() => {
      setAnimateSubHeader(true);
      setAnimateSubHeaderLines([true, false, false, false]);
    }, 1400);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, false, false]);
    }, 1800);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, true, false]);
    }, 2400);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, true, true]);
    }, 2800);
  }, []);

  const HighlightText = ({ text }: { text: string }) => (
    <span
      style={{
        color: theme.palette.white,
        fontWeight: theme.typography.fontWeights.extraLight,
      }}
    >
      {text}
    </span>
  );

  const animationStyles = {
    fadeIn: {
      animation: 'fadeIn 0.4s ease-in-out forwards',
    },
    slideInRight: {
      animation: 'slideInRight 0.4s ease-in-out forwards',
    },
    slideInDown: {
      animation: 'slideInDown 0.4s ease-in-out forwards',
    },
    slideInUp: {
      animation: 'slideInUp 0.4s ease-in-out forwards',
    },
    drawLine: {
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      animation: 'drawLine 0.4s ease-in-out forwards',
    },
  };

  return (
    <LayoutGrid
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap={isMobile ? '0.25rem' : '0.5rem'}
      padding={
        orientation === 'portrait' ? theme.spacing.s : `0 ${theme.spacing.l}`
      }
      containerQuery={{
        minWidth: `${orientation === 'portrait' ? 90 : orientation === 'mobile-landscape' ? 80 : orientation === 'tablet-portrait' ? 60 : 40}cqi`,
        maxWidth: `${orientation === 'portrait' ? 95 : orientation === 'mobile-landscape' ? 85 : orientation === 'tablet-portrait' ? 70 : 50}cqi`,
        minHeight: '10cqi',
        maxHeight: `${orientation === 'mobile-landscape' ? '80cqi' : '90cqi'}`,
      }}
      containerType='inline-size'
      containerName='home-container'
      style={{
        textAlign: 'center',
        width: '100%',
        justifyContent: 'center',
        transform: `${orientation !== 'square'} && translateY(-5vh)`,
        ...(orientation === 'portrait' && {
          maxWidth: '450px',
          margin: '0 auto',
        }),
        paddingTop: 'max(3rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(3rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes drawLine {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}
      </style>
      <Typography
        variant='h2'
        style={{
          ...theme.typography.fonts.homeH3,
          color:
            themeMode === 'grayscale'
              ? theme.palette.neutralTertiary
              : theme.palette.themePrimary,
          marginBottom: 0,
          opacity: 0,
          transform: 'translateX(-20px)',
          ...(animateHeader && animationStyles.slideInRight),
          ...(orientation === 'portrait' && {
            fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
          }),
          ...(orientation === 'square' && {
            fontSize: 'clamp(2rem, 6cqi, 3rem)',
          }),
          ...(orientation === 'mobile-landscape' && {
            fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
          }),
          ...((orientation === 'landscape' || orientation === 'ultrawide') && {
            fontSize: 'clamp(2.5rem, 3cqi, 3.5rem)',
          }),
        }}
      >
        welcome to
      </Typography>
      <Typography
        variant='h1'
        style={{
          ...theme.typography.fonts.h1,
          color: theme.palette.neutralLighterAlt,
          marginBottom: `${orientation === 'mobile-landscape' ? theme.spacing.xxs : theme.spacing.s}`,
          fontSize: theme.typography.fonts.h1.fontSize,
          textShadow: theme.typography.textShadows.textBig,
          opacity: 0,
          transform: 'translateX(-20px)',
          ...(animateHeader && {
            ...animationStyles.slideInRight,
            animationDelay: '0.5s',
          }),
          ...(orientation === 'portrait' && {
            fontSize: 'clamp(2rem, 8cqi, 4rem)',
          }),
          ...(orientation === 'square' && {
            fontSize: 'clamp(3rem, 12cqi, 5rem)',
          }),
          ...(orientation === 'mobile-landscape' && {
            fontSize: 'clamp(2rem, 8cqi, 3rem)',
          }),
          ...((orientation === 'landscape' || orientation === 'ultrawide') && {
            fontSize: 'clamp(3rem, 8cqi, 4.5rem)',
          }),
        }}
      >
        fluxline
      </Typography>

      <hr
        style={{
          width: '95%',
          height:
            orientation === 'portrait' || orientation === 'mobile-landscape'
              ? '1px'
              : '2px',
          color: theme.palette.themePrimary,
          backgroundColor: theme.palette.themePrimary,
          margin: 0,
          opacity: 1,
          boxShadow: `0 0 1px ${theme.palette.neutralPrimary}`,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          ...(animateDivider && animationStyles.drawLine),
        }}
      />

      <div
        style={{
          marginTop: `${orientation === 'mobile-landscape' ? theme.spacing.xxs : theme.spacing.m}`,
          marginBottom: `${orientation === 'mobile-landscape' ? theme.spacing.xxs : theme.spacing.l}`,
        }}
      >
        <Typography
          variant='h3'
          style={{
            color:
              themeMode === 'grayscale'
                ? theme.palette.neutralTertiary
                : theme.palette.themeSecondary,
            ...theme.typography.fonts.homeH3,
            lineHeight: theme.typography.lineHeights.tight,
            fontWeight: theme.typography.fontWeights.extraLight,
            fontSize: theme.typography.fonts.homeH3.fontSize,
            ...(orientation === 'portrait' && {
              fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
            }),
            ...(orientation === 'square' && {
              fontSize: 'clamp(2rem, 6cqi, 3rem)',
            }),
            ...(orientation === 'mobile-landscape' && {
              fontSize: 'clamp(1.5rem, 4cqi, 2rem)',
            }),
            ...((orientation === 'landscape' ||
              orientation === 'ultrawide') && {
              fontSize: 'clamp(2.5rem, 3cqi, 3.5rem)',
            }),
          }}
        >
          <div
            style={{
              opacity: 0,
              transform: 'translateY(-10px)',
              ...(animateSubHeaderLines[0] && animationStyles.slideInDown),
            }}
          >
            <HighlightText text='strategic' /> consulting
          </div>
          <div
            style={{
              opacity: 0,
              transform: 'translateY(-10px)',
              ...(animateSubHeaderLines[1] && animationStyles.slideInDown),
            }}
          >
            <HighlightText text='business' /> architecture
          </div>
          <div
            style={{
              opacity: 0,
              transform: 'translateY(-10px)',
              ...(animateSubHeaderLines[2] && animationStyles.slideInDown),
            }}
          >
            <HighlightText text='personal training' /> solutions
          </div>
          <div
            style={{
              opacity: 0,
              transform: 'translateY(-10px)',
              ...(animateSubHeaderLines[3] && animationStyles.slideInDown),
            }}
          >
            <HighlightText text='mentoring' /> and coaching
          </div>
        </Typography>
      </div>
      <BookingsButton animateSubHeader={animateSubHeader} willAnimate={true} />
    </LayoutGrid>
  );
};

export const Home: React.FC = () => {
  // const { onboardingDoneOrSkipped } = useUserPreferencesStore(
  //   (state) => state.preferences
  // );
  const { backgroundImage } = useBackgroundImage(); // Much simpler now!
  const isMobile = useIsMobile();
  // const [isLoading, setIsLoading] = React.useState(false);
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   // Only navigate to onboarding if not done and not already on onboarding path
  //   if (
  //     !onboardingDoneOrSkipped &&
  //     !window.location.pathname.includes('/onboarding')
  //   ) {
  //     setIsLoading(false);
  //     navigate('/onboarding');
  //   }
  // }, [navigate, onboardingDoneOrSkipped]);

  // if (isLoading) {
  //   return <ProgressBar label='Loading...' />;
  // }

  return (
    <ViewportGrid
      leftChildren={<HomeContent isMobile={isMobile} />}
      rightChildren={<HomeContent isMobile={isMobile} />}
      isHomePage={true}
      respectLayoutPreference={true}
      backgroundImage={backgroundImage as 'one' | 'two'}
    />
  );
};

export default Home;
