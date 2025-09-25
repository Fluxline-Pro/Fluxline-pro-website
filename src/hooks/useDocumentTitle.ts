import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteToTitleMap {
  [key: string]: string;
}

const routeToTitleMap: RouteToTitleMap = {
  '/': 'Home',
  '/about': 'About Us',
  '/services': 'Services',
  '/services/personal-training': 'Personal Training',
  '/services/education-training': 'Education Training',
  '/services/consulting': 'Consulting',
  '/services/development': 'Development',
  '/services/design': 'Design',
  '/services/business': 'Business',
  '/blog': 'Blog',
  '/contact-me': 'Contact Us',
  '/books': 'Books',
  '/events': 'Events',
  '/github': 'GitHub',
  '/music': 'Music',
  '/my-content': 'My Content',
  '/portfolio': 'Portfolio',
  '/videos': 'Videos',
  '/livestreams': 'Livestreams',
  '/onboarding': 'Onboarding',
  '/onboarding/animation': 'Onboarding',
  '/onboarding/welcome': 'Onboarding',
  '/onboarding/name': 'Onboarding',
  '/onboarding/layout': 'Onboarding',
  '/onboarding/font-size': 'Onboarding',
  '/onboarding/theme': 'Onboarding',
  '/onboarding/accessibility': 'Onboarding',
  '/onboarding/complete': 'Onboarding',
  '/onboarding/skip': 'Onboarding',
};

export const useDocumentTitle = (): void => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname: string): string => {
      // Handle exact matches first
      if (routeToTitleMap[pathname]) {
        return routeToTitleMap[pathname];
      }

      // Handle dynamic routes
      if (pathname.startsWith('/blog/')) {
        return 'Blog';
      }

      if (pathname.startsWith('/portfolio/')) {
        return 'Portfolio';
      }

      if (pathname.startsWith('/books/')) {
        return 'Books';
      }

      if (pathname.startsWith('/github/')) {
        return 'GitHub';
      }

      if (pathname.startsWith('/music/')) {
        return 'Music';
      }

      if (pathname.startsWith('/videos/')) {
        return 'Videos';
      }

      if (pathname.startsWith('/livestreams/')) {
        return 'Livestreams';
      }

      // Default for unknown routes (404)
      return '404 - Not Found';
    };

    const pageTitle = getPageTitle(location.pathname);
    const fullTitle = `TerenceWaters.com - ${pageTitle}`;

    document.title = fullTitle;
  }, [location.pathname]);
};
