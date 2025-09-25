import React from 'react';
import { Outlet } from 'react-router-dom';

import { useAppTheme } from '../hooks/useAppTheme';
import useBackgroundImage from '../hooks/useBackgroundImage';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Header from '../components/header/header';
// import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';

const InitialLayout: React.FC = () => {
  // console.log('[InitialLayout] RENDER');
  const { theme, themeMode } = useAppTheme();

  // Dynamic document title management
  useDocumentTitle();

  // Background image management - moved here so it runs on all pages
  useBackgroundImage();
  // const { isAuthenticated } = useUserPreferencesStore(
  //   (state) => state.preferences
  // );
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/auth');
  //   }
  //   console.log('[InitialLayout] MOUNT');
  //   return () => console.log('[InitialLayout] UNMOUNT');
  // }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    // Apply background to body
    document.body.style.background =
      theme.gradients[themeMode === 'dark' ? 'dark' : 'light'].background;
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';
  }, [theme, themeMode]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default InitialLayout;
