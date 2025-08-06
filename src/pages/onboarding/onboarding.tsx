// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // Theme
// import { Container } from '../../theme/layouts/Container';
// import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
// import FluentStepper from '../../theme/components/stepper/stepper';

// // Store
// import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';

// // Views
// import OnboardingAnimation from './onboarding-animation/onboarding-animation';
// import OnboardingWelcome from './views/onboarding-welcome';
// import SkipView from './views/onboarding-skip';

// // Styles & Hooks
// import './onboarding.module.scss';
// import { useFadeInOutView, ViewType } from './hooks/useFadeInOutView';
// import { ROUTE_PATHS } from '@/routing/route-helpers';

// console.log('Onboarding render');
import React from 'react';
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Theme & Components
import { Container } from '../../theme/layouts/Container';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import StepperWithArrows from '../../theme/components/stepper/stepper';

// Routing
import { ROUTES } from '../../routing/constants';

// Hooks
import { useDeviceType } from '../../theme/hooks/useMediaQuery';
import { useFadeInOut } from '../../theme/hooks/useFadeInOut';

// Views
import OnboardingWelcome from './views/onboarding-welcome';
import OnboardingName from './views/onboarding-name';
import OnboardingLayout from './views/onboarding-layout';
import OnboardingFontSize from './views/onboarding-fontsize';
import OnboardingTheme from './views/onboarding-theme';
import OnboardingAccessibility from './views/onboarding-accessibility';
import OnboardingComplete from './views/onboarding-complete';
import OnboardingSkip from './views/onboarding-skip';

// Styles
import styles from './onboarding.module.scss';

const onboardingPath =
  '/' + ROUTES.find((route) => route.name === 'onboarding')?.path;

const steps = [
  {
    label: 'Welcome',
    path: ROUTES.find((route) => route.name === 'onboarding-welcome')?.path,
  },
  {
    label: 'First Name',
    path: ROUTES.find((route) => route.name === 'onboarding-name')?.path,
  },
  {
    label: 'Layout',
    path: ROUTES.find((route) => route.name === 'onboarding-layout')?.path,
  },
  {
    label: 'Font Size',
    path: ROUTES.find((route) => route.name === 'onboarding-font-size')?.path,
  },
  {
    label: 'Theme',
    path: ROUTES.find((route) => route.name === 'onboarding-theme')?.path,
  },
  {
    label: 'Accessibility',
    path: ROUTES.find((route) => route.name === 'onboarding-accessibility')
      ?.path,
  },
  {
    label: 'Complete',
    path: ROUTES.find((route) => route.name === 'onboarding-complete')?.path,
  },
];

export default function Onboarding() {
  console.log('[Onboarding] RENDER');
  const location = useLocation();
  const { style, displayedPath } = useFadeInOut(location.pathname, 800);
  const { isMobile, isTablet, isMobileLandscape } = useDeviceType();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('[Onboarding] MOUNT');
    console.log('onboardingPath', onboardingPath);
    if (onboardingPath === '/onboarding') {
      navigate('/onboarding/welcome');
    }
    return () => console.log('[Onboarding] UNMOUNT');
  }, [navigate]);

  const normalize = (path: string) => path.replace(/\/+$/, '').split('?')[0];
  const currentStep = steps.findIndex(
    (step) => normalize(location.pathname) === normalize(step?.path ?? '')
  );

  console.log('location.pathname:', location.pathname);
  steps.forEach((step, idx) => {
    console.log(`step[${idx}].path:`, step.path);
  });

  return (
    <ViewportGrid
      fullscreen
      placeItemsLeft='normal'
      leftChildren={
        <>
          {/* Place the stepper outside of the container on mobile or tablet so it doesn't bounce */}
          {(isMobile || isTablet || isMobileLandscape) &&
            location.pathname !== '/onboarding/welcome' &&
            location.pathname !== '/onboarding/skip' && (
              <div
                style={{
                  width: '100%',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  marginBottom: '2rem',
                }}
              >
                <StepperWithArrows
                  steps={steps.map((step, idx) => ({
                    label: step.label,
                    description: step.label,
                    completed: currentStep > idx,
                    currentStep: currentStep === idx,
                  }))}
                />
              </div>
            )}
          <Container
            display='grid'
            gridTemplateColumns='1fr'
            gap='1rem'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            alignContent={
              location.pathname === '/onboarding/welcome' ||
              location.pathname === '/onboarding/skip'
                ? 'center'
                : 'normal'
            }
            height='100%'
            width='100%'
            maxWidth='100vw'
            boxSizing='border-box'
          >
            {!isMobile &&
              !isTablet &&
              !isMobileLandscape &&
              location.pathname !== '/onboarding/welcome' &&
              location.pathname !== '/onboarding/skip' && (
                <div
                  style={{
                    width: '100%',
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    marginBottom: '1rem',
                  }}
                >
                  <StepperWithArrows
                    steps={steps.map((step, idx) => ({
                      label: step.label,
                      description: step.label,
                      completed: currentStep > idx,
                      currentStep: currentStep === idx,
                    }))}
                  />
                </div>
              )}
            {location.pathname !== '/onboarding' && (
              <div
                key={displayedPath}
                style={style}
                className={
                  location.pathname === '/onboarding/welcome' ||
                  location.pathname === '/onboarding/skip'
                    ? styles.onboardingContainer
                    : undefined
                }
              >
                <Routes location={{ ...location, pathname: displayedPath }}>
                  <Route
                    path='/onboarding'
                    element={<Navigate to='/onboarding/welcome' />}
                  />
                  <Route path='welcome' element={<OnboardingWelcome />} />
                  <Route path='name' element={<OnboardingName />} />
                  <Route path='layout' element={<OnboardingLayout />} />
                  <Route path='font-size' element={<OnboardingFontSize />} />
                  <Route path='theme' element={<OnboardingTheme />} />
                  <Route
                    path='accessibility'
                    element={<OnboardingAccessibility />}
                  />
                  <Route path='complete' element={<OnboardingComplete />} />
                  <Route path='skip' element={<OnboardingSkip />} />
                </Routes>
              </div>
            )}
          </Container>
        </>
      }
      rightChildren={null}
    />
  );
}

// export const Onboarding: React.FC = () => {
//   const { onboardingDoneOrSkipped } = useUserPreferencesStore(
//     (state) => state.preferences
//   );
//   const navigate = useNavigate();
//   const { setOnboardingDoneOrSkipped } = useUserPreferencesStore();

//   const { currentView, isFading, renderedView, setCurrentView } =
//     useFadeInOutView(
//       ['welcome', 'start', 'welcome-done'],
//       (doneOrSkipped: boolean) => {
//         setOnboardingDoneOrSkipped(doneOrSkipped);
//       },
//       (view: string) => {
//         setCurrentView(view as ViewType);
//       },
//       'welcome'
//     );

//   const handleSkipOnboarding = React.useCallback(() => {
//     setOnboardingDoneOrSkipped(true);
//     navigate(ROUTE_PATHS.onboardingSkip);
//   }, [setOnboardingDoneOrSkipped, navigate]);

//   React.useEffect(() => {
//     if (onboardingDoneOrSkipped) {
//       handleSkipOnboarding();
//     }
//   }, [onboardingDoneOrSkipped, handleSkipOnboarding]);

//   const getCurrentStep = () => {
//     switch (currentView) {
//       case 'welcome':
//       case 'start':
//       case 'welcome-done':
//         return 0;
//       case 'name':
//         return 1;
//       case 'layout':
//         return 2;
//       case 'fontSize':
//         return 3;
//       case 'theme':
//         return 4;
//       case 'accessibility':
//         return 5;
//       case 'complete':
//         return 6;
//       default:
//         return 0;
//     }
//   };

//   return (
//     <ViewportGrid
//       fullscreen
//       placeItemsLeft='normal'
//       leftChildren={
//         <Container
//           display='grid'
//           gridTemplateColumns='1fr'
//           gap='clamp(1rem, 2cqi, 2rem)'
//           flexDirection='column'
//           alignItems='center'
//           justifyContent='center'
//           height='100%'
//           maxWidth='clamp(60rem, 90vw, 70rem)'
//           style={{
//             opacity: isFading ? 0 : 1,
//             transition: 'opacity 0.7s',
//           }}
//         >
//           {currentView === ('animation' as ViewType) ? (
//             <OnboardingAnimation />
//           ) : currentView === 'skip' ? (
//             <SkipView />
//           ) : ['welcome', 'start', 'welcome-done'].includes(currentView) ? (
//             <OnboardingWelcome />
//           ) : (
//             <>
//               <FluentStepper
//                 steps={[
//                   {
//                     label: 'Welcome',
//                     description: 'Welcome',
//                     completed: getCurrentStep() > 0,
//                     currentStep: getCurrentStep() === 0,
//                   },
//                   {
//                     label: 'First Name',
//                     description: 'First Name',
//                     completed: getCurrentStep() > 1,
//                     currentStep: getCurrentStep() === 1,
//                   },
//                   {
//                     label: 'Layout',
//                     description: 'Layout',
//                     completed: getCurrentStep() > 2,
//                     currentStep: getCurrentStep() === 2,
//                   },
//                   {
//                     label: 'Font Size',
//                     description: 'Font Size',
//                     completed: getCurrentStep() > 3,
//                     currentStep: getCurrentStep() === 3,
//                   },
//                   {
//                     label: 'Theme',
//                     description: 'Theme',
//                     completed: getCurrentStep() > 4,
//                     currentStep: getCurrentStep() === 4,
//                   },
//                   {
//                     label: 'Accessibility',
//                     description: 'Accessibility',
//                     completed: getCurrentStep() > 5,
//                     currentStep: getCurrentStep() === 5,
//                   },
//                   {
//                     label: 'Complete',
//                     description: 'Complete',
//                     completed: getCurrentStep() > 5,
//                     currentStep: getCurrentStep() === 6,
//                   },
//                 ]}
//               />
//               {renderedView}
//             </>
//           )}
//         </Container>
//       }
//       rightChildren={null}
//     />
//   );
// };

// export default Onboarding;
