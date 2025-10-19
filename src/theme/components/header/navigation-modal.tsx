// src/theme/components/navigation/NavigationModal.tsx
import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isMobileLandscape?: boolean;
}

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
  children,
  isMobileLandscape,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(isOpen);
  const [shouldShow, setShouldShow] = React.useState(false);
  const isMobile = useIsMobile();
  const isLeftHanded = layoutPreference === 'left-handed';
  const [handedness, setHandedness] = React.useState(isLeftHanded);
  const [fadeStage, setFadeStage] = React.useState<'in' | 'pending-in' | 'out'>(
    'in'
  );

  const modalStyles = {
    root: {
      position: 'fixed' as const,
      top: 0,
      right: isLeftHanded ? 'auto' : 0,
      left: isLeftHanded ? 0 : 'auto',
      transform: isOpen
        ? 'translateX(0)'
        : `translateX(${isLeftHanded ? '-100%' : '100%'})`,
      transition: shouldReduceMotion ? 'none' : 'transform 0.5s ease-in-out',
      background: theme.gradients[theme.isInverted ? 'dark' : 'light'].menu,
      zIndex: theme.zIndices.menu,
      boxShadow: theme.shadows.menu,
      width: isMobile ? '100%' : '450px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      pointerEvents: isOpen ? ('auto' as const) : ('none' as const),
    },
    backdrop: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: isOpen ? (theme.isInverted ? 0.9 : 0.8) : 0,
      backgroundColor: theme.isInverted
        ? theme.palette.themeDark
        : theme.palette.themePrimary,
      zIndex: theme.zIndices.menu - 1,
      display: 'block',
      cursor: 'pointer',
      transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
      pointerEvents: isOpen ? ('auto' as const) : ('none' as const),
    },
  };

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const delay = shouldReduceMotion ? 1 : 10;
      setTimeout(() => setShouldShow(true), delay);
    } else if (isVisible) {
      setShouldShow(false);
      const timeout = setTimeout(
        () => setIsVisible(false),
        shouldReduceMotion ? 1 : 500
      );
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isVisible, shouldReduceMotion]);

  React.useEffect(() => {
    if (isOpen && isLeftHanded !== handedness) {
      setFadeStage('pending-in');
      const timeout = setTimeout(
        () => {
          setHandedness(isLeftHanded);
          setFadeStage('in'); // match your transition duration
        },
        shouldReduceMotion ? 1 : 800
      ); // match your transition duration
      return () => clearTimeout(timeout);
    }
  }, [isLeftHanded, isOpen, handedness, shouldReduceMotion]);

  const modalStyle = {
    ...modalStyles.root,
    opacity: fadeStage === 'in' ? 1 : 0,
    transition: shouldReduceMotion
      ? 'none'
      : 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
    right: handedness ? 'auto' : 0,
    left: handedness ? 0 : 'auto',
    transform: shouldShow
      ? 'translateX(0)'
      : `translateX(${handedness ? '-100%' : '100%'})`,
  };

  return (
    <div>
      <div style={modalStyles.backdrop} onClick={onClose} />
      {(isOpen || isVisible) && <div style={modalStyle}>{children}</div>}
    </div>
  );
};
