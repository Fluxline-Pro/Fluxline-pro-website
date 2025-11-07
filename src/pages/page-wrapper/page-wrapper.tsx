import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import { UnifiedCard } from '../../theme/components/card';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { useContentFilterStore } from '../../store/store-specs/contentFilterStore';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { ThemeMode } from '../../theme/theme';
import { PageStepper } from '../../theme/components/page-stepper';
import { AnimatePresence } from 'framer-motion';
import { FadeUp } from '../../theme/components/animations/fade-animations';

// Helper function to get the appropriate Fluxline logo based on theme mode
const getFluxlineLogo = (themeMode: ThemeMode): string => {
  // Dark mode themes: dark, high-contrast, grayscale-dark
  const darkModeThemes: ThemeMode[] = [
    'dark',
    'high-contrast',
    'grayscale-dark',
  ];

  if (darkModeThemes.includes(themeMode)) {
    return require('../../assets/images/FluxlineLogoDarkMode.png');
  }

  // Light mode themes: light, protanopia, deuteranopia, tritanopia, grayscale
  return require('../../assets/images/FluxlineLogoLightMode.png');
};

// Define page configurations
const PAGE_CONFIGS = {
  '/about': {
    // Using placeholder - you may want to replace this with an actual Fluxline manifesto image
    image: 'FLUXLINE_LOGO', // Special marker for dynamic logo
    imageText: '',
  },
  '/services': {
    image: require('../../assets/images/OurServices1197x1600.jpg'), // Business services illustration
    imageText: 'Our Services',
  },
  '/white-pages': {
    image: 'FLUXLINE_LOGO', // Special marker for dynamic logo
    imageText: '',
  },
  '/legal': {
    image: 'FLUXLINE_LOGO', // Special marker for dynamic logo
    imageText: '',
  },
  '/legal/terms-of-use': {
    image: require('../../assets/images/ConsultingPortrait.jpg'),
    imageText: 'Terms of Use',
  },
  '/legal/privacy-policy': {
    image: require('../../assets/images/GitHubPortrait.jpg'),
    imageText: 'Privacy Policy',
  },
  '/legal/glossary': {
    image: require('../../assets/images/EducationTrainingPortrait.jpg'),
    imageText: 'Glossary of Terms',
  },
  '/legal/stewardship-contract': {
    image: require('../../assets/images/LifeCoachingResonanceCore.jpg'),
    imageText: '',
  },
  '/services/education-training': {
    image: require('../../assets/images/EducationTrainingPortrait.jpg'),
    imageText: 'Education & Training',
  },
  '/services/personal-training': {
    image: require('../../assets/images/PersonalTrainingPortrait.jpg'),
    imageText: 'Personal Training & Wellness',
  },
  '/services/consulting': {
    image: require('../../assets/images/ConsultingPortrait.jpg'),
    imageText: 'Business Consulting',
  },
  '/services/development': {
    image: require('../../assets/images/GitHubPortrait.jpg'),
    imageText: 'Web & App Development',
  },
  '/services/resonance-core': {
    image: require('../../assets/images/LifeCoachingResonanceCore.jpg'),
    imageText: 'Life Coaching: Resonance Core',
  },
  '/services/design': {
    image: require('../../assets/images/Portfolio1280x1815.jpg'),
    imageText: 'Brand & Experience Design',
  },
  '/blog': {
    image: require('../../assets/images/Blog1280x1815.jpg'),
    imageText: 'Blog',
  },
  '/contact-me': {
    image: require('../../assets/images/ContactMe2400x1600.jpg'), // Special marker for dynamic logo
    imageText: '',
  },
  '/books': {
    image: require('../../assets/images/EducationTrainingPortrait.jpg'),
    imageText: 'Books',
  },
  '/events': {
    image: 'https://picsum.photos/400/600?random=events',
    imageText: 'Events',
  },
  '/github': {
    image: require('../../assets/images/GitHubPortrait.jpg'),
    imageText: 'GitHub',
  },
  '/music': {
    image: 'https://picsum.photos/400/600?random=music',
    imageText: 'Music',
  },
  '/my-content': {
    image: require('../../assets/images/Content1280x1815.jpg'),
    imageText: 'My Content',
  },
  '/portfolio': {
    image: require('../../assets/images/Portfolio1280x1815.jpg'),
    imageText: 'Portfolio',
  },
  '/videos': {
    image: 'https://picsum.photos/800/450?random=videos',
    imageText: 'Videos',
  },
  '/livestreams': {
    image: 'https://picsum.photos/800/450?random=livestreams',
    imageText: 'Livestreams',
  },
} as const;

// Special configuration for 404 page
const NOT_FOUND_CONFIG = {
  image: require('../../assets/images/ConsultingPortrait.jpg'), // Using consulting portrait as placeholder for stop sign
  imageText: '404 - Not Found',
};

// Pages that should NOT use the wrapper (like home page)
const EXCLUDED_PAGES = ['/'];

interface PageWrapperProps {
  children: React.ReactNode;
  showImageTitle?: boolean; // Optional prop to override image title visibility
  contentImage?: string; // Optional prop to override the image used in the left panel
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  showImageTitle,
  contentImage,
}) => {
  const location = useLocation();
  const orientation = useDeviceOrientation(); // Determine if we should show the title on the image card
  const { selectedPost } = useContentFilterStore();
  const { id } = useParams();
  const { themeMode } = useAppTheme();

  // Hide title for services views except about view to prevent duplicate titles
  const shouldShowTitle = React.useMemo(() => {
    // If explicitly provided, use that value
    if (showImageTitle !== undefined) {
      return showImageTitle;
    }

    const pathname = location.pathname;

    // If it's a services route but not the about route, hide the title
    if (pathname.startsWith('/services') && pathname !== '/about') {
      return false;
    }

    // For all other routes, show the title (default behavior)
    return true;
  }, [location.pathname, showImageTitle]);

  // Check if current path should use the wrapper
  const shouldUseWrapper = !EXCLUDED_PAGES.includes(location.pathname);

  // Get configuration for current page
  const currentConfig =
    PAGE_CONFIGS[location.pathname as keyof typeof PAGE_CONFIGS];

  // If this page doesn't use the wrapper, render children directly
  if (!shouldUseWrapper) {
    return <>{children}</>;
  }

  // Default fallback config for pages not explicitly defined
  // Use NOT_FOUND_CONFIG for unmatched routes as a special case
  const config = currentConfig || NOT_FOUND_CONFIG;

  // Use the selected post's image if available and we're in detail view
  // Handle dynamic Fluxline logo based on theme mode
  let configImage = config.image;
  if (configImage === 'FLUXLINE_LOGO') {
    configImage = getFluxlineLogo(themeMode);
  }

  const imageToDisplay =
    id && selectedPost && selectedPost.imageUrl
      ? selectedPost.imageUrl
      : contentImage || configImage;

  // Use the selected post's title if available and we're in detail view
  const imageTextToDisplay =
    id && selectedPost && selectedPost.title
      ? selectedPost.title
      : config.imageText || '';

  // Check if we're using the dark mode logo to skip dark mode filter
  const isUsingDarkLogo =
    config.image === 'FLUXLINE_LOGO' &&
    ['dark', 'high-contrast', 'grayscale-dark'].includes(themeMode);

  return (
    <ViewportGrid
      leftChildren={
        <UnifiedCard
          key={location.pathname + (id || '')} // Add key to reset animations on route change
          id='imageCard' // Use consistent id for hooks compatibility
          title={imageTextToDisplay}
          viewType='image'
          imageUrl={imageToDisplay}
          elevation='medium'
          showTitleOnImage={shouldShowTitle}
          imageText={imageTextToDisplay}
          delay={0.1}
          useSpinner={true}
          isViewportLeftPanel={true} // Mark this card as being in the ViewportGrid's left panel
          skipDarkModeFilter={isUsingDarkLogo} // Skip dark mode filter for Fluxline dark logo
        />
      }
      rightChildren={
        <div
          style={{
            width: '100%',
            maxWidth:
              orientation === 'portrait'
                ? '100%'
                : orientation === 'ultrawide'
                  ? '40dvw'
                  : '62dvw',
            paddingRight: '0',
            // Add overflow handling to prevent text from overlapping
            overflowX: 'hidden',
            wordWrap: 'break-word',
            minWidth: 0, // Allow shrinking
          }}
        >
          <AnimatePresence mode='wait'>
            <FadeUp
              key={location.pathname + (id || '')}
              delay={0.1}
              duration={0.5}
            >
              {children}
            </FadeUp>
          </AnimatePresence>
          <PageStepper autoNavigateOnScroll={true} />
        </div>
      }
      respectLayoutPreference={true}
    />
  );
};

export default PageWrapper;
