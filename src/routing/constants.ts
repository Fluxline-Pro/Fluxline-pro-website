// Simple route constants for navigation and lookups
interface Routes {
  name: string;
  path: string;
  isMenuItem: boolean;
  isContentScreen: boolean;
  isComingSoon?: boolean;
  isExternal?: boolean;
  isHidden?: boolean;
  externalUrl?: string;
}

export const ROUTES: Routes[] = [
  { name: 'home', path: '', isMenuItem: true, isContentScreen: false },
  { name: 'about us', path: 'about', isMenuItem: true, isContentScreen: false },
  { name: 'blog', path: 'blog', isMenuItem: false, isContentScreen: true },
  {
    name: 'portfolio',
    path: 'my-content',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'portfolio',
    path: 'portfolio',
    isMenuItem: false,
    isContentScreen: true,
  },
  {
    name: 'services',
    path: 'services',
    isMenuItem: true,
    isContentScreen: false,
  },
  {
    name: 'collab & connect',
    path: 'contact-me',
    isMenuItem: true,
    isContentScreen: false,
  },
  // Services sub-routes
  {
    name: 'personal training',
    path: 'services/personal-training',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'education & training',
    path: 'services/education-training',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'consulting',
    path: 'services/consulting',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'business',
    path: 'services/business',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'development',
    path: 'services/development',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'design',
    path: 'services/design',
    isMenuItem: false,
    isContentScreen: false,
  },
  { name: 'github', path: 'github', isMenuItem: false, isContentScreen: true, isComingSoon: false, isExternal: true, externalUrl: 'https://github.com/AplUSAndmINUS' },
  {
    name: 'books',
    path: 'books',
    isMenuItem: false,
    isContentScreen: true,
    isComingSoon: true,
  },
  {
    name: 'music',
    path: 'music',
    isMenuItem: false,
    isContentScreen: true,
    isComingSoon: true,
  },
  {
    name: 'videos',
    path: 'videos',
    isMenuItem: false,
    isContentScreen: true,
    isComingSoon: true,
  },
  {
    name: 'livestreams',
    path: 'livestreams',
    isMenuItem: false,
    isContentScreen: false,
  },
  { name: 'events', path: 'events', isMenuItem: false, isContentScreen: false },
  {
    name: 'contact',
    path: 'contact-me',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding',
    path: 'onboarding',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-welcome',
    path: '/onboarding/welcome',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-skip',
    path: '/onboarding/skip',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-animation',
    path: '/onboarding/animation',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-name',
    path: '/onboarding/name',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-layout',
    path: '/onboarding/layout',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-font-size',
    path: '/onboarding/font-size',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-theme',
    path: '/onboarding/theme',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-accessibility',
    path: '/onboarding/accessibility',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'onboarding-complete',
    path: '/onboarding/complete',
    isMenuItem: false,
    isContentScreen: false,
  },
  // Questionnaire routes
  {
    name: 'questionnaire',
    path: 'questionnaire',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-welcome',
    path: '/questionnaire/welcome',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-client-type',
    path: '/questionnaire/client-type',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-goals',
    path: '/questionnaire/goals',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-challenges',
    path: '/questionnaire/challenges',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-motivation',
    path: '/questionnaire/motivation',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-services',
    path: '/questionnaire/services',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-investment',
    path: '/questionnaire/investment',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-contact',
    path: '/questionnaire/contact',
    isMenuItem: false,
    isContentScreen: false,
  },
  {
    name: 'questionnaire-results',
    path: '/questionnaire/results',
    isMenuItem: false,
    isContentScreen: false,
  },
  // Add more as needed
];
