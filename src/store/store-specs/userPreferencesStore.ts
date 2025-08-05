import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeMode } from '../../theme/theme';

interface UserPreferences {
  backgroundImage: string;
  fontScale: number;
  minFontScale: number;
  maxFontScale: number;
  fontScaleManuallySet: boolean; // Track if user has manually changed font scale
  reducedMotion: boolean;
  highContrast: boolean;
  themeMode: ThemeMode;
  isOnboarded: boolean;
  layoutPreference: 'left-handed' | 'right-handed';
  readingDirection: 'ltr' | 'rtl';
  onboardingDoneOrSkipped: boolean;
  userFirstName: string;
  isAuthenticated: boolean;
}

export interface UserPreferencesState {
  preferences: UserPreferences;
  setBackgroundImage: (image: string) => void;
  resetPreferences: () => void;
  setPreference: (key: keyof UserPreferences, value: any) => void;
  toggleTheme: () => void;
  setOnboardingDoneOrSkipped: (doneOrSkipped: boolean) => void;
  setUserFirstName: (firstName: string) => void;
}

// Convert old fontSize string to scale number
const getFontScaleFromSize = (size?: string): number => {
  switch (size) {
    case 'small':
      return 0.8;
    case 'large':
      return 1.2;
    case 'xLarge':
      return 1.5;
    case 'medium':
    default:
      return 1;
  }
};

// Default preferences - Fluxline Pro defaults to dark mode
const defaultPreferences: UserPreferences = {
  backgroundImage: 'one',
  fontScale: 0.9,
  minFontScale: 0.8,
  maxFontScale: 1.5,
  fontScaleManuallySet: false, // Initially not manually set
  reducedMotion: false,
  highContrast: false,
  themeMode: 'dark', // Fluxline Pro default: dark mode for focused aesthetic
  isOnboarded: false,
  layoutPreference: 'right-handed',
  readingDirection: 'ltr',
  onboardingDoneOrSkipped: false,
  userFirstName: '',
  isAuthenticated: false,
};

export const unacceptableWords = [
  'fuck',
  'shit',
  'asshole',
  'bitch',
  'cunt',
  'dick',
  'faggot',
  'sissy',
  'nigga',
  'nigger',
  'pussy',
  'queer',
  'whore',
  'fag',
  'twat',
  'bastard',
];

export const unacceptableWordsRegex = new RegExp(
  `(${unacceptableWords.join('|')})`,
  'i'
);

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      resetPreferences: () =>
        set({
          preferences: {
            ...defaultPreferences,
            onboardingDoneOrSkipped: true, // ensure user isn't prompted to onboard again
          },
        }),
      setPreference: (key, value) => {
        console.log('Setting preference:', key, value);
        set((state) => {
          // If user is specifically setting fontScale, mark it as manually set
          if (key === 'fontScale') {
            return {
              preferences: {
                ...state.preferences,
                [key]: value,
                fontScaleManuallySet: true,
              },
            };
          }

          // For other preferences, just update normally
          return {
            preferences: { ...state.preferences, [key]: value },
          };
        });
      },
      setBackgroundImage: (image) => {
        console.log('Setting background image to:', image);
        set((state) => {
          const newState = {
            preferences: { ...state.preferences, backgroundImage: image },
          };
          console.log('New preferences state:', newState.preferences);
          return newState;
        });
      },
      setThemeMode: (themeMode: ThemeMode) => {
        console.log('Setting theme mode to:', themeMode);
        set((state) => ({
          preferences: { ...state.preferences, themeMode },
        }));
      },
      toggleTheme: () => {
        console.log('Toggling theme');
        set((state) => ({
          preferences: {
            ...state.preferences,
            themeMode:
              state.preferences.themeMode === 'light' ? 'dark' : 'light',
          },
        }));
      },
      setOnboardingDoneOrSkipped: (doneOrSkipped: boolean) => {
        console.log('Setting onboarding done or skipped:', doneOrSkipped);
        set((state) => ({
          preferences: {
            ...state.preferences,
            onboardingDoneOrSkipped: doneOrSkipped,
          },
        }));
      },
      setUserFirstName: (firstName: string) => {
        console.log('Setting user first name:', firstName);
        if (
          firstName === '' ||
          firstName === undefined ||
          unacceptableWordsRegex.test(firstName)
        ) {
          console.log('Nah... that first name is unacceptable:');
          return;
        }
        set((state) => ({
          preferences: {
            ...state.preferences,
            userFirstName: firstName,
          },
        }));
      },
    }),
    {
      name: 'user-preferences',
      version: 1, // Add version control
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Handle migration from old format
          const oldPrefs = persistedState?.preferences || {};

          // Convert old fontSize to new fontScale
          const fontScale = getFontScaleFromSize(oldPrefs.fontSize);

          return {
            preferences: {
              ...defaultPreferences, // Start with defaults
              ...oldPrefs, // Spread old preferences
              // Override with new format values
              fontScale,
              minFontScale: defaultPreferences.minFontScale,
              maxFontScale: defaultPreferences.maxFontScale,
              // Remove old property
              fontSize: undefined,
              onboardingDoneOrSkipped:
                oldPrefs.onboardingDoneOrSkipped ?? false,
              userFirstName: oldPrefs.userFirstName ?? '',
            },
          };
        }

        // If we're here with existing preferences but no fontScaleManuallySet field,
        // we need to determine if the fontScale has been manually set based on if
        // it differs from the default
        if (
          persistedState?.preferences &&
          !('fontScaleManuallySet' in persistedState.preferences)
        ) {
          const hasDefaultFontScale =
            persistedState.preferences.fontScale === 0.9;

          return {
            ...persistedState,
            preferences: {
              ...persistedState.preferences,
              fontScaleManuallySet: !hasDefaultFontScale, // If it's not default, assume it was manually set
            },
          };
        }

        return persistedState;
      },
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);

// Helper function to clear persisted data (can be called from dev tools if needed)
export const clearPersistedPreferences = () => {
  localStorage.removeItem('user-preferences');
};
