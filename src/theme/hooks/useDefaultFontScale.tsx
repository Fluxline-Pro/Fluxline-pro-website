import React, { useEffect } from 'react';
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import { useDeviceType } from './useMediaQuery';

/**
 * Hook to set default font scale based on device type
 * Only applies when the user hasn't manually adjusted the font scale
 */
export const useDefaultFontScale = () => {
  // Get the store methods - we'll use the raw set method for special case
  const userPreferencesStore = useUserPreferencesStore();
  const { preferences } = userPreferencesStore;
  const { isMobile, orientation, isTablet } = useDeviceType();
  const { fontScale, fontScaleManuallySet } = preferences;

  useEffect(() => {
    // Only apply device-specific defaults if user hasn't manually set the font scale
    if (!fontScaleManuallySet) {
      let newDefaultScale = 0.9; // Default for desktop/other devices

      if (isMobile || orientation === 'mobile-landscape') {
        newDefaultScale = 1.0; // Larger for mobile devices
      } else if (
        isTablet ||
        orientation === 'square' ||
        orientation === 'tablet-portrait'
      ) {
        newDefaultScale = 0.95; // Medium size for tablets
      }

      // Only update if the calculated default is different from current value
      if (fontScale !== newDefaultScale) {
        // We need to set the fontScale without marking it as manually set
        // Use the raw setState method to update preferences directly
        useUserPreferencesStore.setState((state) => ({
          ...state,
          preferences: {
            ...state.preferences,
            fontScale: newDefaultScale,
            // Keep fontScaleManuallySet as false since this is an auto-adjustment
          },
        }));
        // console.log(
        //   `Default font scale set to ${newDefaultScale} based on device type: ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`
        // );
      }
    }
  }, [isMobile, isTablet, orientation, fontScaleManuallySet, fontScale]);

  return null; // This hook doesn't return anything, it just performs the effect
};

/**
 * Component to set default font scale based on device type
 * Add this to your App.tsx or another high-level component
 */
export const DefaultFontScaleProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  // Use the hook
  useDefaultFontScale();

  // Render children as-is, this is just a provider
  return <>{children}</>;
};

export default useDefaultFontScale;
