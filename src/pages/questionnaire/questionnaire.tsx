import React from 'react';
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container } from '../../theme/layouts/Container';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import StepperWithArrows from '../../theme/components/stepper/stepper';
import { useDeviceType } from '../../theme/hooks/useMediaQuery';
import { useFadeInOut } from '../../theme/hooks/useFadeInOut';
import { useIndividualPathStore } from '../../store/store-specs/individualPathStore';

// Views
import QuestionnaireWelcome from './views/questionnaire-welcome';
import QuestionnaireClientType from './views/questionnaire-client-type';
import QuestionnaireGoals from './views/questionnaire-goals';
import QuestionnaireChallenges from './views/questionnaire-challenges';
import QuestionnaireMotivation from './views/questionnaire-motivation';
import QuestionnaireServicePreferences from './views/questionnaire-service-preferences';
import QuestionnaireCommitment from './views/questionnaire-commitment';
import QuestionnaireInvestment from './views/questionnaire-investment';
import QuestionnaireContactInfo from './views/questionnaire-contact-info';
import QuestionnaireResults from './views/questionnaire-results';

const steps = [
  {
    label: 'Welcome',
    path: '/questionnaire/welcome',
  },
  {
    label: 'Client Type',
    path: '/questionnaire/client-type',
  },
  {
    label: 'Goals',
    path: '/questionnaire/goals',
  },
  {
    label: 'Challenges',
    path: '/questionnaire/challenges',
  },
  {
    label: 'Assessment',
    path: '/questionnaire/motivation',
  },
  {
    label: 'Preferences',
    path: '/questionnaire/services',
  },
  {
    label: 'Commitment',
    path: '/questionnaire/commitment',
  },
  {
    label: 'Investment',
    path: '/questionnaire/investment',
  },
  {
    label: 'Contact',
    path: '/questionnaire/contact',
  },
  {
    label: 'Results',
    path: '/questionnaire/results',
  },
];

export default function Questionnaire() {
  const location = useLocation();
  const { style, displayedPath } = useFadeInOut(location.pathname, 800);
  const { isMobile, isTablet, isMobileLandscape } = useDeviceType();
  const navigate = useNavigate();
  const { currentStep } = useIndividualPathStore();

  React.useEffect(() => {
    // Redirect to first step if on base questionnaire route
    if (location.pathname === '/questionnaire' || location.pathname === '/questionnaire/') {
      navigate('/questionnaire/welcome');
    }
  }, [location.pathname, navigate]);

  const normalize = (path: string) => path.replace(/\/+$/, '').split('?')[0];
  const currentStepIndex = steps.findIndex(
    (step) => normalize(location.pathname) === normalize(step?.path ?? '')
  );

  return (
    <ViewportGrid
      fullscreen
      placeItemsLeft='normal'
      leftChildren={
        <>
          {/* Progress stepper */}
          {(isMobile || isTablet || isMobileLandscape) &&
            location.pathname !== '/questionnaire/results' &&
            location.pathname !== '/questionnaire/welcome' && (
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
                    completed: currentStepIndex > idx,
                    currentStep: currentStepIndex === idx,
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
            alignContent='normal'
            height='100%'
            width='100%'
            maxWidth='100vw'
            boxSizing='border-box'
          >
            {!isMobile &&
              !isTablet &&
              !isMobileLandscape &&
              location.pathname !== '/questionnaire/results' &&
              location.pathname !== '/questionnaire/welcome' && (
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
                      completed: currentStepIndex > idx,
                      currentStep: currentStepIndex === idx,
                    }))}
                  />
                </div>
              )}

            {location.pathname !== '/questionnaire' && (
              <div key={displayedPath} style={style}>
                <Routes location={{ ...location, pathname: displayedPath }}>
                  <Route
                    path='/questionnaire'
                    element={<Navigate to='/questionnaire/welcome' />}
                  />
                  <Route path='welcome' element={<QuestionnaireWelcome />} />
                  <Route
                    path='client-type'
                    element={<QuestionnaireClientType />}
                  />
                  <Route path='goals' element={<QuestionnaireGoals />} />
                  <Route
                    path='challenges'
                    element={<QuestionnaireChallenges />}
                  />
                  <Route
                    path='motivation'
                    element={<QuestionnaireMotivation />}
                  />
                  <Route
                    path='services'
                    element={<QuestionnaireServicePreferences />}
                  />
                  <Route
                    path='commitment'
                    element={<QuestionnaireCommitment />}
                  />
                  <Route
                    path='investment'
                    element={<QuestionnaireInvestment />}
                  />
                  <Route path='contact' element={<QuestionnaireContactInfo />} />
                  <Route path='results' element={<QuestionnaireResults />} />
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
