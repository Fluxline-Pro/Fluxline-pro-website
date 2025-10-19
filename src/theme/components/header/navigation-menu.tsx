// src/theme/components/navigation/NavigationMenu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useMultiHoverState } from '../../hooks/useHoverState';
import { LayoutGrid } from '../../layouts/LayoutGrid';
import { NavigationItem } from './navigation-item';
import { SocialLinks } from './social-links';
import ModalTitle from './navigation-modal-title';
import LinktreeLogo from '../../../assets/svgs/LinktreeLogo';
import { ROUTES } from '../../../routing/constants';
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';
import { Container } from '../../../theme/layouts/Container';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface NavigationMenuProps {
  onClose: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ onClose }) => {
  const { layoutPreference } = useAppTheme();
  const isLeftHanded = layoutPreference === 'left-handed';
  const { isHovered: isNavHovered, getHoverProps: getNavHoverProps } =
    useMultiHoverState();
  const navigate = useNavigate();
  const onboardingDoneOrSkipped = useUserPreferencesStore(
    (state) => state.preferences.onboardingDoneOrSkipped
  );
  const setOnboardingDoneOrSkipped = useUserPreferencesStore(
    (state) => state.setOnboardingDoneOrSkipped
  );
  const isMobile = useIsMobile();

  const styles = {
    contentContainer: {
      flex: '1 1 auto',
      overflowY: 'auto' as const,
    },
  };

  const handleNavigation = (path: string) => {
    // allow the user to skip onboarding by clicking on a menu item
    if (!onboardingDoneOrSkipped) {
      // console.log('Skipping onboarding');
      setOnboardingDoneOrSkipped(true);
      navigate(
        ROUTES.find((item) => item.name === 'onboarding-skip')?.path || '/'
      );
    }

    const navPath = path.startsWith('/') ? path : `/${path}`;
    // console.log('Navigating to:', navPath);
    navigate(navPath);
    onClose();
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      height='100dvh'
      minHeight='0'
    >
      <ModalTitle title='Menu' />
      <Container
        display='flex'
        flexDirection='column'
        minHeight='0'
        padding={isMobile ? '0 1rem' : '0 2rem'}
        style={styles.contentContainer}
      >
        <LayoutGrid
          display='flex'
          flexDirection='column'
          alignItems={isLeftHanded ? 'flex-start' : 'flex-end'}
          justifyContent='center'
          gap='clamp(0.5rem, 0.5vh, 1rem)'
          margin={0}
          width='100%'
        >
          {ROUTES.filter((item) => item.isMenuItem).map((item) => (
            <NavigationItem
              key={item.path}
              isHovered={isNavHovered(item.path)}
              getHoverProps={getNavHoverProps}
              onClick={() => handleNavigation(item.path)}
              route={item}
            />
          ))}
          <a
            href='https://linktr.ee/aplusinflux'
            rel='noreferrer noopener'
            target='_blank'
            style={{
              margin: '1rem 0',
            }}
          >
            <LinktreeLogo />
          </a>
        </LayoutGrid>
      </Container>
      <SocialLinks />
    </Container>
  );
};
