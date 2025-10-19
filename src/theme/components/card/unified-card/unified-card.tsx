import React from 'react';
import { mergeStyles } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import {
  useIsMobile,
  useIsTablet,
  useDeviceOrientation,
} from '../../../hooks/useMediaQuery';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import useIsTextColorLight from '../../../hooks/useIsTextColorLight';

import { BaseCard } from '../base-card/base-card';
import { Typography } from '../../typography/typography';
import { ProgressBar } from '../../progress-bar/progress-bar';
import ImageLoadingSpinner from '../../loading-spinner/image-loading-spinner';
import { FadeIn } from '../../animations/fade-animations';

export type CardViewType = 'grid' | 'small' | 'large' | 'image';

export interface UnifiedCardProps {
  id: string;
  title: string;
  description?: string;
  date?: string | Date;
  imageUrl?: string;
  imageAlt?: string;
  onClick?: () => void;
  isLoading?: boolean;
  elevation?: 'low' | 'medium' | 'high';
  viewType: CardViewType;
  // Image card specific props
  imageText?: string;
  delay?: number;
  useSpinner?: boolean;
  altText?: string;
  // Custom left content - replaces default image when provided
  leftChildren?: React.ReactNode;
  // Optional flag to show title on image (like card-image component)
  showTitleOnImage?: boolean;
  // Optional style overrides
  imageContainerStyle?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
  // Flag to indicate this card is used as the left panel in ViewportGrid
  isViewportLeftPanel?: boolean;
  // Flag to skip dark mode filter (useful for dark logos)
  skipDarkModeFilter?: boolean;
}

export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  id,
  title,
  description,
  date,
  imageUrl,
  imageAlt,
  onClick,
  isLoading = false,
  elevation = 'medium',
  viewType,
  imageText,
  delay = 0,
  useSpinner = false,
  altText,
  leftChildren,
  showTitleOnImage = false,
  imageContainerStyle,
  contentContainerStyle,
  isViewportLeftPanel = false,
  skipDarkModeFilter = false,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const deviceOrientation = useDeviceOrientation();
  const { filter } = useColorVisionFilter(skipDarkModeFilter);
  const formattedDate = useDateFormatter(date || '');
  const { shouldReduceMotion } = useReducedMotion();

  // Get text color based on image brightness
  const { isLight } = useIsTextColorLight(imageUrl || '');

  // Loading state management
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [contentReady, setContentReady] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);
  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
    aspectRatio: number;
  } | null>(null);

  // Check if image is landscape and handle image loading
  React.useEffect(() => {
    if (imageUrl) {
      // Reset loading state when imageUrl changes
      setImageLoaded(false);
      setImageDimensions(null);
      // Initially set isLandscape to false for clean animation
      setIsLandscape(false);

      const img = new Image();
      img.onload = () => {
        // Capture the image's natural dimensions
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;

        // Store image dimensions for container sizing
        setImageDimensions({
          width: naturalWidth,
          height: naturalHeight,
          aspectRatio: aspectRatio,
        });

        // Mark image as loaded first
        setImageLoaded(true);

        // Only apply landscape detection when this card is in the ViewportGrid left panel
        if (isViewportLeftPanel) {
          const isImageLandscape = naturalWidth > naturalHeight;

          // Create a proper animation sequence:
          // 1. First let the image fade in (show it in default state)
          // 2. Then animate the container to landscape orientation if needed
          // 3. Finally apply the transform scale to the image
          if (isImageLandscape) {
            // Add proper timing for smooth animation sequence
            const fadeInTime = 300; // ms - time for image to fade in
            const containerTransitionDelay = fadeInTime + 50; // ms - slight pause after fade in

            setTimeout(() => {
              // First animate the container dimensions
              setIsLandscape(true);
            }, containerTransitionDelay);
          }
        }
      };
      img.onerror = () => {
        // Still mark as loaded on error to prevent infinite loading state
        setImageLoaded(true);
        setImageDimensions(null);
      };

      // Start loading the image
      img.src = imageUrl;

      // No timeout to auto-mark as loaded - we want to wait for the actual image
      return () => {
        // Cleanup - cancel any pending image loads
        img.onload = null;
        img.onerror = null;
        // Clear any pending timeouts
        // (using anonymous function to avoid adding unneeded dependencies)
      };
    } else {
      // If no image URL, consider it loaded
      setImageLoaded(true);
      setImageDimensions(null);
    }
  }, [imageUrl, isViewportLeftPanel, shouldReduceMotion]);

  // Content is ready when we have the required text data
  // Make content ready immediately for all view types
  React.useEffect(() => {
    if (
      title ||
      viewType === 'image' ||
      viewType === 'grid' ||
      viewType === 'small'
    ) {
      // Immediate state update for better performance
      setContentReady(true);
    }
  }, [title, viewType]);

  // Both image and content must be ready for card to show
  // For image cards, we want to show the card immediately but with a loading overlay
  // For other cards, we wait until both image and content are ready
  const isCardReady =
    !isLoading &&
    (viewType === 'image' ||
      viewType === 'grid' ||
      (imageLoaded && contentReady));

  // Handle image card view
  if (viewType === 'image') {
    const getCardDimensions = (): {
      height?: string;
      maxHeight?: string;
      minHeight?: string;
      aspectRatio?: string;
      width?: string;
      maxWidth?: string;
      minWidth?: string;
      transform?: string;
    } => {
      // If we have image dimensions, use the actual aspect ratio to constrain the container
      if (imageDimensions && imageLoaded) {
        const { aspectRatio: imageAspectRatio } = imageDimensions;

        // Use the image's natural aspect ratio to size the container
        // This eliminates empty space above/below the image
        return {
          width: '100%',
          maxWidth: '100%',
          aspectRatio: `${imageAspectRatio}`, // Use the actual image aspect ratio
          // Let aspect ratio determine height, but provide constraints for extreme cases
          minHeight: '200px',
          maxHeight: (() => {
            switch (deviceOrientation) {
              case 'portrait':
                return '350px';
              case 'tablet-portrait':
                return '325px';
              case 'large-portrait':
                return '600px';
              case 'square':
                return '400px';
              case 'mobile-landscape':
                return '350px';
              case 'landscape':
              case 'ultrawide':
              default:
                return '450px';
            }
          })(),
        };
      }

      // Fallback to responsive heights when image dimensions aren't available yet
      // Base dimensions for each device orientation
      const baseDimensions: {
        height?: string;
        maxHeight?: string;
        minHeight?: string;
        aspectRatio?: string;
        width?: string;
        maxWidth?: string;
        minWidth?: string;
      } = (() => {
        switch (deviceOrientation) {
          case 'portrait':
            return {
              // Use viewport-based sizing for ultra-narrow devices like Galaxy Fold
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(250px, 45vh, 350px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minHeight/maxHeight to allow flexible sizing
            };
          case 'tablet-portrait':
            return {
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(275px, 40vh, 325px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minWidth to allow flexible sizing
            };
          case 'large-portrait':
            return {
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(400px, 55vh, 600px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minWidth to allow flexible sizing
            };
          case 'square':
            return {
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(300px, 50vh, 400px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minWidth to allow flexible sizing
            };
          case 'mobile-landscape':
            return {
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(250px, 42vh, 350px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minWidth to allow flexible sizing
            };
          case 'landscape':
          case 'ultrawide':
          default:
            return {
              width: '100%',
              maxWidth: '100%',
              height: 'clamp(350px, 52vh, 450px)', // Responsive height based on viewport
              aspectRatio: 'auto', // Let width constrain the size, not aspect ratio
              // Remove fixed minWidth to allow flexible sizing
            };
        }
      })(); // If the image is landscape, adjust dimensions for better display
      if (isLandscape) {
        const { aspectRatio, ...dimensionsWithoutAspectRatio } = baseDimensions;

        // For landscape orientation, provide specific dimensions that will animate well
        return {
          ...dimensionsWithoutAspectRatio,
          // Use more consistent units to avoid jumpy transitions
          height:
            dimensionsWithoutAspectRatio.height ||
            (() => {
              switch (deviceOrientation) {
                case 'portrait':
                  return 'min(40vh, 250px)';
                case 'tablet-portrait':
                case 'large-portrait':
                  return '300px'; // Use fixed height instead of auto for smoother transitions
                case 'square':
                  return 'min(50vh, 300px)';
                case 'mobile-landscape':
                  return 'min(60vh, 250px)';
                case 'landscape':
                case 'ultrawide':
                  return 'min(60vh, 400px)';
                default:
                  return '350px'; // Use fixed height instead of auto for smoother transitions
              }
            })(),
          minHeight: '200px',
          // Use consistent aspect ratio approach
          aspectRatio: '16/9', // Common landscape ratio
          // Scale transform with easing
          transform: 'scale(1.3)',
          // No transition needed here since we're adding it to the imageStyle
        };
      }

      return baseDimensions;
    };

    const cardDimensions = getCardDimensions();

    const imageContainerStyles = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      width: cardDimensions.width || '100%',
      maxWidth: cardDimensions.maxWidth || '100%',
      minWidth: cardDimensions.minWidth,
      height: cardDimensions.height || '100%',
      // Only apply minHeight if it's specified in dimensions (not for flexible portrait mode)
      ...(cardDimensions.minHeight && { minHeight: cardDimensions.minHeight }),
      maxHeight: cardDimensions.maxHeight,
      aspectRatio:
        cardDimensions.aspectRatio !== 'auto'
          ? cardDimensions.aspectRatio
          : undefined,
      backgroundColor: theme.isInverted
        ? theme.gradients.components.card.dark
        : theme.gradients.components.card.light,
      // Ensure the container stays within bounds
      margin: '0 auto',
      boxSizing: 'border-box' as const,
      // Add smooth transition for all container properties that might change
      transition: shouldReduceMotion
        ? 'none'
        : `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`,
      ...imageContainerStyle,
    };

    const imageStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const, // Changed from 'cover' to 'contain' to show full image
      objectPosition: 'center center',
      display: 'block' as const,
      filter: filter,
      opacity: imageLoaded ? 1 : 0,
      // Image transitions should be timed differently than the container
      // Fade in slowly to match legal page timing (0.5s duration) + 200ms slower
      transition: shouldReduceMotion
        ? 'none'
        : `opacity 0.9s ease-out, 
           transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s`,
      // Remove minWidth/minHeight constraints that force overflow
      transform: cardDimensions.transform,
      margin: '0 auto',
    };

    const loadingStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      backgroundColor: theme.semanticColors.bodyBackground,
      zIndex: 1,
    };

    const textStyles = {
      opacity: isMobile ? 0 : 1,
      position: 'absolute' as const,
      bottom: '2rem',
      left: '2rem',
      zIndex: theme.zIndices.above,
      color: isLight ? theme.palette.black : theme.palette.white,
      fontSize: imageText
        ? 'clamp(1.75rem, 3cqi, 2.25rem)' // Reduced from clamp(2.5rem, 4cqi, 3.25rem) for subtler appearance
        : theme.typography.fontSizes.clamp3,
      textShadow: isLight ? 'none' : theme.typography.textShadows.cardImage,
      maxWidth: 'calc(100% - 3rem)',
      wordWrap: 'break-word' as const,
    };

    // If leftChildren is provided, use it instead of the default image and ensure it's not clickable
    if (leftChildren) {
      return (
        <FadeIn duration={0.5} delay={delay}>
          <div
            id='imageCard'
            style={{
              ...imageContainerStyles,
              boxShadow: theme.shadows.cardImage,
            }}
            data-container-name='card-image'
            data-container-type='inline-size'
          >
            {showTitleOnImage && imageText && (
              <Typography variant='h3' style={textStyles}>
                {imageText}
              </Typography>
            )}
            {leftChildren}
          </div>
        </FadeIn>
      );
    }

    if (isLoading || !isCardReady) {
      return (
        <div
          id='imageCard'
          style={imageContainerStyles}
          data-container-name='card-image'
          data-container-type='inline-size'
        >
          <div style={loadingStyle}>
            {useSpinner ? (
              <ImageLoadingSpinner
                size='medium'
                label='Loading image...'
                showLabel={false}
              />
            ) : (
              <ImageLoadingSpinner
                size='medium'
                label='Loading image...'
                showLabel={true}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <FadeIn duration={0.5} delay={delay}>
        <div
          id='imageCard' // Add id for compatibility with existing hooks
          style={{
            ...imageContainerStyles,
            boxShadow: theme.shadows.cardImage,
            cursor: onClick ? 'pointer' : 'default',
          }}
          data-container-name='card-image'
          data-container-type='inline-size'
          onClick={onClick}
          role={onClick ? 'button' : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={
            onClick
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                  }
                }
              : undefined
          }
        >
          {/* Show loading spinner until image is loaded */}
          {!imageLoaded && imageUrl && (
            <div style={loadingStyle}>
              <ImageLoadingSpinner
                size='medium'
                label='Loading image...'
                showLabel={true}
              />
            </div>
          )}

          {imageText && showTitleOnImage && (
            <Typography variant='h3' style={textStyles}>
              {imageText}
            </Typography>
          )}
          <img
            src={imageUrl}
            alt={altText || imageText || title}
            style={imageStyle}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
      </FadeIn>
    );
  }

  // Regular card styling based on view type
  const getLayoutStyles = () => {
    // Common image container styles
    const baseImageContainer = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      flexShrink: 0,
      backgroundColor: theme.semanticColors.bodyBackground,
    };

    // Common content container styles
    const baseContent = {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: theme.spacing.s1,
      flex: 1,
      minWidth: 0,
    };

    switch (viewType) {
      case 'grid':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            width: '100%',
            height: '100%',
          },
          imageContainer: {
            ...baseImageContainer,
            width: '100%',
            height: isMobile ? '150px' : isTablet ? '150px' : '180px', // Increased height
            backgroundColor: theme.palette.neutralLighter,
          },
          content: {
            ...baseContent,
            padding: theme.spacing.m,
            minHeight: '80px', // Reduced from 100px
            justifyContent: 'center' as const,
          },
        };
      case 'small':
        return {
          container: {
            display: 'flex',
            flexDirection: 'row' as const,
            width: '100%',
            minHeight: '80px',
            // Ensure small cards don't overflow their container
            maxWidth: '100%',
            overflow: 'hidden',
          },
          imageContainer: {
            ...baseImageContainer,
            width: isMobile ? '110px' : '125px',
            height: 'auto' as const,
            minHeight: isMobile ? '80px' : '90px', // Slightly increased height
            marginRight: theme.spacing.s2,
            // Ensure image container respects its width constraints
            maxWidth: isMobile ? '110px' : '125px',
            flexShrink: 0,
          },
          content: {
            ...baseContent,
            padding: `${theme.spacing.m} ${theme.spacing.s}`,
            justifyContent: 'center' as const,
            // Ensure content area doesn't overflow
            minWidth: 0,
            flex: 1,
          },
        };
      case 'large':
        return {
          container: {
            display: 'flex',
            flexDirection: isMobile ? ('column' as const) : ('row' as const),
            width: '100%',
            minHeight: 'auto' as const,
          },
          imageContainer: {
            ...baseImageContainer,
            fontSize: theme.fonts.large.fontSize,
            width: isMobile ? '100%' : '180px', // Increased from 160px
            height: isMobile ? '180px' : ('auto' as const), // Increased from 160px
            minHeight: isMobile ? '180px' : ('auto' as const), // Increased from 160px
            backgroundColor: theme.palette.neutralLighter,
          },
          content: {
            ...baseContent,
            fontSize: theme.fonts.large.fontSize,
            padding: theme.spacing.m,
            justifyContent: 'flex-start' as const,
          },
        };
      default:
        return getLayoutStyles(); // fallback to grid
    }
  };

  const layout = getLayoutStyles();

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block' as const,
    filter: filter,
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 0.9s ease-in-out', // Match legal page timing + 200ms slower
  };

  // Typography classes
  const getTitleClass = () => {
    const baseStyles = {
      margin: 0,
      lineHeight: '1.3',
      textTransform: 'uppercase' as const, // Changed from lowercase to uppercase
      color: theme.palette.themePrimary,
    };

    switch (viewType) {
      case 'large':
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.large.fontSize,
          fontWeight: theme.fonts.large.fontWeight,
        });
      case 'small':
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.medium.fontSize,
          fontWeight: theme.fonts.medium.fontWeight,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        });
      case 'grid':
      default:
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.medium.fontSize,
          fontWeight: theme.fonts.medium.fontWeight,
        });
    }
  };

  const getDescriptionClass = () => {
    const baseStyles = {
      margin: 0,
      lineHeight: '1.4',
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis',
      textTransform: 'lowercase' as const,
      color: theme.palette.neutralSecondary,
    };

    return mergeStyles(baseStyles);
  };

  const getDateClass = () => {
    const baseStyles = {
      margin: 0,
      textTransform: 'lowercase' as const,
      color: theme.palette.themeTertiary,
    };

    switch (viewType) {
      case 'large':
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.small.fontSize,
          marginTop: 'auto',
        });
      case 'small':
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.tiny.fontSize,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginTop: theme.spacing.s1, // Add some margin at the top
        });
      case 'grid':
      default:
        return mergeStyles({
          ...baseStyles,
          fontSize: theme.fonts.xSmall.fontSize,
          marginTop: 'auto',
        });
    }
  };

  const loadingClass = mergeStyles({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.neutralSecondary,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.semanticColors.bodyBackground,
    zIndex: 1,
  });

  // Handle regular card loading
  if (isLoading) {
    return (
      <BaseCard elevation={elevation}>
        <div className={loadingClass}>
          <ProgressBar label='Loading...' autoCenter={false} />
        </div>
      </BaseCard>
    );
  }

  // Regular card rendering
  return (
    <BaseCard
      elevation={elevation}
      onClick={onClick}
      style={{
        position: 'relative',
        // Ensure card doesn't exceed container bounds
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Loading overlay - shows when content is not ready */}
      {!isCardReady && (
        <div className={loadingClass}>
          <ProgressBar label='Loading...' autoCenter={false} />
        </div>
      )}

      {/* Card content with fade in when ready */}
      <FadeIn duration={0.3} delay={0}>
        <div style={layout.container}>
          {/* Render leftChildren if provided, otherwise render the default image */}
          {leftChildren ? (
            <div style={{ ...layout.imageContainer, ...imageContainerStyle }}>
              {leftChildren}
            </div>
          ) : imageUrl ? (
            <div style={{ ...layout.imageContainer, ...imageContainerStyle }}>
              {/* Always show title on image for grid view, use showTitleOnImage for other views */}
              {(viewType === 'grid' || showTitleOnImage) && (
                <Typography
                  variant='h3'
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    zIndex: theme.zIndices.above,
                    color: isLight ? theme.palette.black : theme.palette.white,
                    textShadow: isLight
                      ? 'none'
                      : theme.typography.textShadows.cardImage,
                    maxWidth: 'calc(100% - 1.5rem)',
                    wordWrap: 'break-word',
                    margin: 0,
                    fontSize:
                      viewType === 'grid'
                        ? theme.fonts.xLarge.fontSize
                        : theme.fonts.large.fontSize,
                  }}
                >
                  {title}
                </Typography>
              )}
              <img
                src={imageUrl}
                alt={imageAlt || title}
                style={imageStyle}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            </div>
          ) : null}

          <div style={{ ...layout.content, ...contentContainerStyle }}>
            {/* Only show title in content area if not showing on image */}
            {((!showTitleOnImage && viewType !== 'grid') || !imageUrl) && (
              <Typography variant='h4' className={getTitleClass()}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant='label' className={getDescriptionClass()}>
                {description}
              </Typography>
            )}
            {date && (
              <Typography
                variant='p'
                fontSize='clamp(0.75rem, 2cqi, 1rem)'
                className={getDateClass()}
              >
                {formattedDate}
              </Typography>
            )}
          </div>
        </div>
      </FadeIn>
    </BaseCard>
  );
};

export default UnifiedCard;
