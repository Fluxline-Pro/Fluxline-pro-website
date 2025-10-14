// src/theme/components/navigation/Navigation.tsx
import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { NavigationBar } from './navigation-bar';
import { NavigationModal } from './navigation-modal';
import { NavigationMenu } from './navigation-menu';
import { NavigationSettings } from './settings/navigation-settings';
import { useDeviceOrientation } from '../../hooks/useMediaQuery';

const Header: React.FC = () => {
  const [activeModal, setActiveModal] = React.useState<
    'menu' | 'settings' | null
  >(null);
  const [isViewTransitioning, setIsViewTransitioning] = React.useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = React.useState(false); // Track PDF modal state
  const { themeMode, setThemeMode } = useAppTheme();
  const isMobileLandscape = useDeviceOrientation() === 'mobile-landscape';

  // Listen for PDF modal state changes via custom events
  React.useEffect(() => {
    const handlePdfModalOpen = () => setIsPdfModalOpen(true);
    const handlePdfModalClose = () => setIsPdfModalOpen(false);

    window.addEventListener('pdf-modal-open', handlePdfModalOpen);
    window.addEventListener('pdf-modal-close', handlePdfModalClose);

    return () => {
      window.removeEventListener('pdf-modal-open', handlePdfModalOpen);
      window.removeEventListener('pdf-modal-close', handlePdfModalClose);
    };
  }, []);

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleSettingsClick = () => {
    if (activeModal === 'settings') {
      setActiveModal(null);
    } else if (activeModal === 'menu') {
      setIsViewTransitioning(true);
      setTimeout(() => {
        setActiveModal('settings');
        setIsViewTransitioning(false);
      }, 300);
    } else {
      setActiveModal('settings');
    }
  };

  const handleMenuClick = () => {
    if (activeModal === 'menu') {
      setActiveModal(null);
    } else if (activeModal === 'settings') {
      setIsViewTransitioning(true);
      setTimeout(() => {
        setActiveModal('menu');
        setIsViewTransitioning(false);
      }, 300);
    } else {
      setActiveModal('menu');
    }
  };

  const handleThemeClick = () => {
    if (themeMode !== 'light' && themeMode !== 'dark') return;
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <NavigationBar
        onSettingsClick={handleSettingsClick}
        onMenuClick={handleMenuClick}
        onThemeClick={handleThemeClick}
        isMenuOpen={activeModal === 'menu'}
        isSettingsOpen={activeModal === 'settings'}
        isPdfModalOpen={isPdfModalOpen}
      />
      <NavigationModal
        isMobileLandscape={isMobileLandscape}
        isOpen={activeModal !== null}
        onClose={handleModalClose}
      >
        <div
          style={{
            opacity: isViewTransitioning ? 0 : 1,
            transition: 'all 0.3s ease-in-out',
            height: '100%',
            width: '100%',
          }}
        >
          {activeModal === 'menu' && (
            <NavigationMenu onClose={handleModalClose} />
          )}
          {activeModal === 'settings' && <NavigationSettings />}
        </div>
      </NavigationModal>
    </div>
  );
};

export default Header;
