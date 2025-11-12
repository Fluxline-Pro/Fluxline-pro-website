import React from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { mergeStyles } from '@fluentui/react';

// Onboarding
// import Onboarding from '../pages/onboarding/onboarding';
// import OnboardingAnimation from '../pages/onboarding/onboarding-animation/onboarding-animation';
// import OnboardingWelcome from '../pages/onboarding/views/onboarding-welcome';
// import OnboardingName from '../pages/onboarding/views/onboarding-name';
// import OnboardingLayout from '../pages/onboarding/views/onboarding-layout';
// import OnboardingFontSize from '../pages/onboarding/views/onboarding-fontsize';
// import OnboardingTheme from '../pages/onboarding/views/onboarding-theme';
// import OnboardingAccessibility from '../pages/onboarding/views/onboarding-accessibility';
// import OnboardingComplete from '../pages/onboarding/views/onboarding-complete';
// import OnboardingSkip from '../pages/onboarding/views/onboarding-skip';

// CSS Transition
import InitialLayout from '../theme/layouts/InitialLayout';

// Pages
import Home from '../pages/home/home';
import NotFound from '../pages/404/404';
import ContactPage from '../pages/contact-page/contact-page';
// import Events from '../pages/events/events';
// import Portfolio from '../pages/portfolio/portfolio';
// import { UnifiedContentPage } from '../pages/unified-content-page/unified-content-page';
// import AuthScreen from '../pages/auth-screen/auth-screen';
import ServicesPage from '../pages/services-page/services-page';
import WhitePagesView from '../pages/white-pages/white-pages';
import LegalPage from '../pages/legal/legal-page';
import ProgressBar from '../theme/components/progress-bar/progress-bar';
import { useAppTheme } from '../theme/hooks/useAppTheme';

const Loading = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppTheme();

  const styles = mergeStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'transparent',
    color: theme.palette.neutralPrimary,
  });

  return (
    <div className={styles}>
      <React.Suspense
        fallback={<ProgressBar label='Loading...' description='Loading...' />}
      >
        {children}
      </React.Suspense>
    </div>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <InitialLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <ServicesPage contentType='about' />,
      },
      {
        path: 'fluxline-ethos',
        element: <ServicesPage contentType='fluxline-ethos' />,
      },
      {
        path: 'services',
        element: <ServicesPage contentType='services' />,
        children: [
          {
            path: 'personal-training',
            element: <ServicesPage contentType='personal-training' />,
          },
          {
            path: 'education-training',
            element: <ServicesPage contentType='education-training' />,
          },
          {
            path: 'consulting',
            element: <ServicesPage contentType='consulting' />,
          },
          {
            path: 'development',
            element: <ServicesPage contentType='development' />,
          },
          {
            path: 'design',
            element: <ServicesPage contentType='design' />,
          },
          {
            path: 'resonance-core',
            element: <ServicesPage contentType='resonance-core' />,
          },
        ],
      },
      {
        path: 'white-pages',
        element: <WhitePagesView />,
      },
      // {
      //   path: 'architecture',
      //   element: <ServicesPage contentType='architecture' />,
      // },
      // {
      //   path: 'blog',
      //   element: <UnifiedContentPage contentType='blog' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // blog-api route removed - using the consolidated unified-content-page.tsx instead
      // {
      //   path: 'media',
      //   element: <UnifiedContentPage contentType='media' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'collaborate',
      //   element: <ContactPage />,
      // },
      {
        path: 'contact-me',
        element: <ContactPage />,
      },
      // {
      //   path: 'books',
      //   element: <UnifiedContentPage contentType='books' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'authors',
      //   element: <UnifiedContentPage contentType='authors' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'events',
      //   element: <Events />,
      // },
      // {
      //   path: 'github',
      //   element: <UnifiedContentPage contentType='github' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'music',
      //   element: <UnifiedContentPage contentType='music' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'my-content',
      //   element: <Portfolio contentType='my-content' />,
      // },
      // {
      //   path: 'portfolio',
      //   element: <Portfolio contentType='portfolio' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Portfolio handles its own routing
      //     },
      //   ],
      // },
      // {
      //   path: 'videos',
      //   element: <UnifiedContentPage contentType='videos' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'livestreams',
      //   element: <UnifiedContentPage contentType='livestreams' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      // {
      //   path: 'press',
      //   element: <UnifiedContentPage contentType='press' />,
      //   children: [
      //     {
      //       path: ':id',
      //       element: <></>, // Content is handled by UnifiedContentPage
      //     },
      //   ],
      // },
      {
        path: 'legal',
        element: <LegalPage />,
      },
      {
        path: 'legal/:id',
        element: <LegalPage />,
      },
      // {
      //   path: 'onboarding',
      //   element: <Onboarding />,
      //   children: [
      //     {
      //       path: 'animation',
      //       element: <OnboardingAnimation />,
      //     },
      //     {
      //       path: 'welcome',
      //       element: <OnboardingWelcome />,
      //     },
      //     {
      //       path: 'name',
      //       element: <OnboardingName />,
      //     },
      //     {
      //       path: 'layout',
      //       element: <OnboardingLayout />,
      //     },
      //     {
      //       path: 'font-size',
      //       element: <OnboardingFontSize />,
      //     },
      //     {
      //       path: 'theme',
      //       element: <OnboardingTheme />,
      //     },
      //     {
      //       path: 'accessibility',
      //       element: <OnboardingAccessibility />,
      //     },
      //     {
      //       path: 'complete',
      //       element: <OnboardingComplete />,
      //     },
      //     {
      //       path: 'skip',
      //       element: <OnboardingSkip />,
      //     },
      //   ],
      // },
      {
        path: '*',
        element: <Loading>{<NotFound />}</Loading>,
      },
    ],
  },
  // {
  //   path: '/auth',
  //   element: <AuthScreen />,
  // },
];

export const router = createBrowserRouter(routes);
