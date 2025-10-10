// import React from 'react';

// import { useUserPreferencesStore } from '../store/store-specs/userPreferencesStore';

// import { ThemeMode, themeMap, applyThemeToDocument } from './theme';

// // Reading direction types
// export type ReadingDirection = 'ltr' | 'rtl';
// export type LayoutPreference = 'right-handed' | 'left-handed';

// // // Create context with default values TODO: remove
// // const ThemeContext = React.createContext<
// //   ThemeContextType & { fluentTheme: IExtendedTheme }
// // >({
// //   theme: themeMap.light,
// //   themeMode: 'light',
// //   setThemeMode: () => {},
// //   toggleTheme: () => {},
// //   setAccessibilityTheme: () => {},
// //   // New reading direction and layout preferences
// //   readingDirection: 'ltr',
// //   layoutPreference: 'right-handed',
// //   setReadingDirection: () => {},
// //   setLayoutPreference: () => {},
// //   toggleReadingDirection: () => {},
// //   toggleLayoutPreference: () => {},
// //   fluentTheme: themeMap.light,
// // });

// // Custom hook for using the theme context
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import { ITheme } from '@fluentui/react';
import {
  themeMap,
  ThemeMode,
  ReadingDirection,
  LayoutPreference,
  IExtendedTheme,
} from '../theme';

export const useAppTheme = () => {
  const { preferences, setPreference, toggleTheme } = useUserPreferencesStore();
  const themeMode = preferences.themeMode;
  const fontScale = preferences.fontScale;
  const theme = themeMap[themeMode] as IExtendedTheme & ITheme;
  const layoutPreference = preferences.layoutPreference;
  const readingDirection = preferences.readingDirection;

  // Side effects (if needed) can be handled in App.tsx or a top-level component

  return {
    theme,
    themeMode,
    fontScale,
    setThemeMode: (mode: ThemeMode) => setPreference('themeMode', mode),
    toggleTheme,
    readingDirection,
    layoutPreference,
    setReadingDirection: (dir: ReadingDirection) =>
      setPreference('readingDirection', dir),
    setLayoutPreference: (pref: LayoutPreference) =>
      setPreference('layoutPreference', pref),
    setFontScale: (scale: number) => setPreference('fontScale', scale),
    toggleReadingDirection: () =>
      setPreference(
        'readingDirection',
        readingDirection === 'rtl' ? 'ltr' : 'rtl'
      ),
    toggleLayoutPreference: () =>
      setPreference(
        'layoutPreference',
        layoutPreference === 'left-handed' ? 'right-handed' : 'left-handed'
      ),
  };
};

// // Old code to be removed later TODO: remove
// // Handle background image two theme switching
// // React.useEffect(() => {
// //   // console.log('[ThemeProvider] background/theme effect', {
// //   //   currentView,
// //   //   background: preferences.backgroundImage,
// //   //   themeMode,
// //   // });
// //   if (currentView === 'home' && preferences.backgroundImage === 'two') {
// //     if (themeMode === 'light') {
// //       setPreviousTheme('light');
// //       setPreference('themeMode', 'dark');
// //     }
// //   } else if (previousTheme) {
// //     // If we're leaving home page or background image two and we have a previous theme, restore it
// //     setPreference('themeMode', previousTheme);
// //     setPreviousTheme(null);
// //   }
// // }, [
// //   currentView,
// //   preferences.backgroundImage,
// //   themeMode,
// //   setPreference,
// //   previousTheme,
// // ]);
