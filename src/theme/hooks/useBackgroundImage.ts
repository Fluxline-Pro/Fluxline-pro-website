import React from 'react';
import { useLocation } from 'react-router-dom';

import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';

const BACKGROUND_STORAGE_KEY = 'home-background-toggle';
const ORIGINAL_THEME_KEY = 'original-theme-before-force';

const useBackgroundImage = () => {
  const location = useLocation();
  const { preferences, setPreference } = useUserPreferencesStore();
  const prevPathRef = React.useRef<string | null>(null);
  const themeRef = React.useRef(preferences.themeMode);
  const hasInitializedRef = React.useRef(false);

  // Always use 'one' and never toggle to 'two'
  const [currentBackground] = React.useState<'one' | 'two'>('one');

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Keep theme ref updated
  React.useEffect(() => {
    themeRef.current = preferences.themeMode;
  }, [preferences.themeMode]);

  // Handle navigation-triggered background toggling
  React.useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;
    const prevWasHome = prevPath === '/' || prevPath === '/home';
    const prevWasOnboarding = prevPath?.includes('/onboarding');

    console.log(
      `[useBackgroundImage] Navigation: ${prevPath} -> ${currentPath}`
    );

    // On first mount only (not re-mounts), always use 'one'
    if (!hasInitializedRef.current) {
      console.log(`[useBackgroundImage] First mount, using background: one`);
      localStorage.setItem(BACKGROUND_STORAGE_KEY, 'one');
      hasInitializedRef.current = true;
      prevPathRef.current = currentPath;
      return;
    }

    // Only process actual navigation changes (not same path)
    if (prevPath === currentPath) {
      console.log(`[useBackgroundImage] Same path, ignoring: ${currentPath}`);
      return;
    }

    // Returning TO home page (from non-home) - always use background 'one'
    // BUT exclude onboarding flow since that's initial setup, not navigation
    if (!prevWasHome && !prevWasOnboarding && isHomePage) {
      console.log(`[useBackgroundImage] Returning to home: setting background to 'one'`);
      localStorage.setItem(BACKGROUND_STORAGE_KEY, 'one');
    } else if (prevWasOnboarding && isHomePage) {
      console.log(
        `[useBackgroundImage] Coming from onboarding: keeping background as ${currentBackground}`
      );
    }

    prevPathRef.current = currentPath;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Intentionally excluding currentBackground and isHomePage to prevent loops

  // Handle theme forcing based on being on home page
  React.useEffect(() => {
    // Add a small delay to ensure localStorage has been updated from navigation effect
    const timer = setTimeout(() => {
      const originalTheme = localStorage.getItem(ORIGINAL_THEME_KEY);
      const currentTheme = themeRef.current;

      console.log(
        `[useBackgroundImage] Theme effect - Home: ${isHomePage}, Current theme: ${currentTheme}, Original stored: ${originalTheme}`
      );

      if (!isHomePage) {
        // Not on home page - restore original theme if we forced dark mode
        if (originalTheme && currentTheme === 'dark') {
          console.log(
            `[useBackgroundImage] Not on home page: Restoring original theme: ${originalTheme}`
          );
          localStorage.removeItem(ORIGINAL_THEME_KEY);
          setPreference('themeMode', originalTheme);
        } else {
          console.log(
            `[useBackgroundImage] Not on home page, no theme changes needed`
          );
        }
        return;
      }

      // On home page - always force dark mode (looks better on both backgrounds!)
      if (currentTheme !== 'dark' && !originalTheme) {
        console.log(
          `[useBackgroundImage] Home page + not dark mode: Forcing dark mode (was ${currentTheme})`
        );
        localStorage.setItem(ORIGINAL_THEME_KEY, currentTheme);
        setPreference('themeMode', 'dark');
      } else if (currentTheme !== 'dark' && originalTheme) {
        console.log(
          `[useBackgroundImage] Home page + original theme stored: Forcing dark mode`
        );
        setPreference('themeMode', 'dark');
      } else {
        console.log(
          `[useBackgroundImage] Home page + already dark mode, no changes needed`
        );
      }
    }, 100); // Delay to ensure any navigation state updates have completed

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isHomePage, setPreference]); // Trigger on navigation changes

  return {
    backgroundImage: currentBackground,
  };
};

export default useBackgroundImage;
