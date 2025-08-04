import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../routing/constants';

const useGetPageTitle = () => {
  const { pathname } = useLocation();

  // Remove leading slash for comparison
  const cleanPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  // Find the route with an exact path match
  const matchedRoute = ROUTES.find((routeObj) => {
    const routePath = routeObj.path;
    return cleanPathname === routePath;
  });

  // Return the name of the matched route or default to 'home'
  return matchedRoute?.name || 'home';
};

export default useGetPageTitle;
