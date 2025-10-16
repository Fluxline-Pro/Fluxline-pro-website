import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routing/constants';

// Helper function to capitalize route names
const capitalizeRouteName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Generate route to title map from ROUTES constants
const generateRouteToTitleMap = () => {
  const map: { [key: string]: string } = {};

  ROUTES.forEach((route) => {
    const path = route.path === '' ? '/' : `/${route.path}`;
    let title = capitalizeRouteName(route.name);

    // Handle special cases for better titles
    switch (route.name.toLowerCase()) {
      case 'about us':
        title = 'About Us';
        break;
      case "let's connect":
        title = 'Contact Us';
        break;
      case 'my-content':
        title = 'My Content';
        break;
      case 'white pages':
        title = 'White Pages';
        break;
      case 'education & training':
        title = 'Education & Training';
        break;
      case 'resonance-core':
        title = 'Resonance Core';
        break;
      default:
        // Use the capitalized version
        break;
    }

    map[path] = title;
  });

  return map;
};

const routeToTitleMap = generateRouteToTitleMap();

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
    const fullTitle = `Fluxline.pro - ${pageTitle}`;

    document.title = fullTitle;
  }, [location.pathname]);
};
