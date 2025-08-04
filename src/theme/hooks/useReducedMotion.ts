import React from 'react';

import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';

export const useReducedMotion = () => {
  const { preferences } = useUserPreferencesStore();
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Check OS-level preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Return true if either user preference OR OS preference is set
  const shouldReduceMotion = preferences.reducedMotion || prefersReducedMotion;

  return {
    shouldReduceMotion,
    userPreference: preferences.reducedMotion,
    osPreference: prefersReducedMotion,
  };
};

export default useReducedMotion;
