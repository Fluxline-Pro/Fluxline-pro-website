import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { SpinnerSize } from '@fluentui/react/lib/Spinner';

import PageWrapper from '../page-wrapper/page-wrapper';
import { FilterToolbar } from '../../theme/components/filter-toolbar/filter-toolbar';
import { LayoutGrid } from '../../theme/layouts/LayoutGrid';
import { UnifiedCard } from '../../theme/components/card';
import { Calendar } from '../../theme/components/dates/calendar/calendar';
import { ContentView } from '../../theme/components/content-view/content-view';
import { useContentFilterStore } from '../../store/store-specs/contentFilterStore';
import { ContentSquare } from '../../theme/components/content-square/content-square';
import { ROUTES } from '../../routing/constants';
import Services from '../services/services';
import ContactMe from '../contact-me/contact-me';
import FluentSpinner from '../../theme/components/loading-spinner/loading-spinner';
import FluentButton from '../../theme/components/button/button';
import { Container } from '../../theme/layouts/Container';
import Typography from '../../theme/components/typography/typography';
import {
  useDeviceOrientation,
  useIsLargeDesktop,
  useIsMobile,
  useIsTablet,
} from '../../theme/hooks/useMediaQuery';
import {
  useContentData,
  generateMockContent,
} from '../../utils/contentDataManager';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { AnimatePresence } from 'framer-motion';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { borderRadius, shadows } from '../../theme/theme';

// Generic content item interface (keep existing)
export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  date?: Date;
  author?: string;
  category?: string;
  content?: string;
  media?: string;
  [key: string]: any;
}

interface UnifiedContentPageProps {
  contentType:
    | 'blog'
    | 'music'
    | 'videos'
    | 'books'
    | 'github'
    | 'livestreams'
    | 'portfolio'
    | 'authors'
    | 'my-content'
    | 'services'
    | 'about'
    | 'architecture'
    | 'media'
    | 'press'
    | 'personal-training'
    | 'education-training'
    | 'resonance-core'
    | 'consulting'
    | 'development'
    | 'design'
    | 'contact-me';
}

const Loading = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense
    fallback={
      <FluentSpinner
        size={SpinnerSize.large}
        label='Loading...'
        showLabel={true}
      />
    }
  >
    {children}
  </React.Suspense>
);

const ContentManager: React.FC<{ contentType: string }> = ({ contentType }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    viewType,
    viewState,
    isCalendarOpen,
    goBackToList,
    selectedPost,
    selectPost,
  } = useContentFilterStore();

  const [displayPosts, setDisplayPosts] = React.useState<ContentItem[]>([]);
  const [post, setPost] = React.useState<ContentItem | null>(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  // Triple-layer protection against infinite API calls
  const hasInitialized = React.useRef<string | false>(false);
  const loadingRef = React.useRef(false); // Track if we're already loading
  const isLoadingGlobalRef = React.useRef(false); // Static flag to prevent parallel API calls

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isMobileLandscape = useDeviceOrientation() === 'mobile-landscape';
  const isTabletPortrait = useDeviceOrientation() === 'tablet-portrait';
  const isLargeScreen = useIsLargeDesktop();
  const isSquare = useDeviceOrientation() === 'square';
  const { theme } = useAppTheme();

  // Get content data manager
  const { loadContent, loadSingleContent, isLoading, error, isUsingApi } =
    useContentData(contentType);

  // State to track retry button clicks and prevent duplicates
  const [isRetrying, setIsRetrying] = React.useState(false);
  const retryTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Handler to retry loading content with debounce to prevent double-clicks
  const handleRetry = () => {
    if (isRetrying) {
      // console.log('⚠️ Already retrying, please wait...');
      return;
    }

    // console.log('🔄 Manually retrying API call...');
    setIsRetrying(true);

    // Clear any existing timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    // Reset all loading flags
    hasInitialized.current = false;
    loadingRef.current = false;
    isLoadingGlobalRef.current = false;
    setDataLoaded(false);

    // Reset retry state after delay
    retryTimeoutRef.current = setTimeout(() => {
      setIsRetrying(false);
    }, 2000); // 2 second cooldown
  };

  // Reset state when content type changes
  React.useEffect(() => {
    // If the content type is changing, reset the state
    if (hasInitialized.current && hasInitialized.current !== contentType) {
      // console.log(
      //   `🔄 Content type changed from ${hasInitialized.current} to ${contentType}, resetting state`
      // );
      setDisplayPosts([]);
      setPost(null);
      setDataLoaded(false);
      hasInitialized.current = false;
      loadingRef.current = false;
      isLoadingGlobalRef.current = false;
    }
  }, [contentType]);

  // Load content data with protection against infinite API calls
  React.useEffect(() => {
    // Skip if we've already loaded this content type or if we're already loading
    if (
      hasInitialized.current === contentType ||
      loadingRef.current ||
      isLoadingGlobalRef.current
    ) {
      return;
    }

    // Memoize the necessary dependencies to avoid closures capturing outdated values
    const currentContentType = contentType;
    const loadContentFn = loadContent;

    const loadData = async () => {
      // Set all loading flags
      loadingRef.current = true;
      isLoadingGlobalRef.current = true;

      // console.log(
      //   `🔄 [${currentContentType}] API Request started at ${new Date().toISOString()}`
      // );

      try {
        // console.log(`� [${currentContentType}] Fetching content...`);
        const content = await loadContentFn();

        // Only update state if we're still on the same content type
        if (
          currentContentType === hasInitialized.current ||
          !hasInitialized.current
        ) {
          setDisplayPosts(content);
          setDataLoaded(true);
          // console.log(
          //   `✅ [${currentContentType}] Content loaded successfully:`,
          //   {
          //     items: content.length,
          //     timestamp: new Date().toISOString(),
          //     sampleItem:
          //       content.length > 0
          //         ? { id: content[0].id, title: content[0].title }
          //         : 'none',
          //   }
          // );
        } else {
          // console.warn(
          //   `⚠️ [${currentContentType}] Content type changed during load, discarding results`
          // );
        }
      } catch (err) {
        // console.error(`❌ [${currentContentType}] Error loading content:`, err);
        // Fallback to mock data on error
        const mockContent = generateMockContent(currentContentType);
        setDisplayPosts(mockContent);
        setDataLoaded(true);
        // console.log(
        //   `🔄 [${currentContentType}] Fallback to mock data:`,
        //   mockContent.length,
        //   'items'
        // );
      } finally {
        // Always clean up loading state
        loadingRef.current = false;
        isLoadingGlobalRef.current = false;
        // Mark that we've initialized with this content type
        hasInitialized.current = currentContentType;
        // console.log(
        //   `✓ [${currentContentType}] Loading operation complete at ${new Date().toISOString()}`
        // );
      }
    };

    loadData();
  }, [contentType, loadContent]); // Include both dependencies

  // Handle detail view logic with protection against unnecessary API calls
  // Handle switching back to list view
  React.useEffect(() => {
    if (!id && viewState === 'detail') {
      goBackToList();
      setPost(null);
    }
  }, [id, viewState, goBackToList]);

  // Handle detail view logic with protection against unnecessary API calls
  React.useEffect(() => {
    // Skip if no ID or no posts loaded yet
    if (!id || displayPosts.length === 0) {
      return;
    }

    // Skip if we're already loading
    if (loadingRef.current || isLoadingGlobalRef.current) {
      return;
    }

    // First check if we already have the post loaded
    const existingPost = displayPosts.find((p) => p.id === id || p.slug === id);
    if (existingPost) {
      setPost(existingPost);
      selectPost(existingPost);
      return;
    }

    // Memoize the necessary dependencies to avoid closures capturing outdated values
    const currentId = id;
    const currentContentType = contentType;
    const loadSingleContentFn = loadSingleContent;
    const navigateFn = navigate;
    const selectPostFn = selectPost;
    const currentDisplayPosts = [...displayPosts];

    const loadDetailData = async () => {
      // Set loading flags
      loadingRef.current = true;
      isLoadingGlobalRef.current = true;

      // console.log(
      //   `🔄 [${currentContentType}/${currentId}] Detail request started at ${new Date().toISOString()}`
      // );

      try {
        // console.log(
        //   `� [${currentContentType}/${currentId}] Fetching detail content...`
        // );
        const detailPost = await loadSingleContentFn(currentId);

        if (detailPost) {
          setPost(detailPost);
          selectPostFn(detailPost);
          // console.log(
          //   `✅ [${currentContentType}/${currentId}] Detail content loaded:`,
          //   {
          //     id: detailPost.id,
          //     title: detailPost.title,
          //     timestamp: new Date().toISOString(),
          //   }
          // );
        } else {
          // console.warn(
          //   `⚠️ [${currentContentType}/${currentId}] No detail content found, navigating back`
          // );
          navigateFn(`/${currentContentType}`);
        }
      } catch (err) {
        // console.error(
        //   `❌ [${currentContentType}/${currentId}] Error loading detail:`,
        //   err
        // );

        // Fallback to finding in existing posts
        // console.log(
        //   `🔍 [${currentContentType}/${currentId}] Trying fallback to cached posts...`
        // );
        const foundPost = currentDisplayPosts.find(
          (p) => p.id === currentId || p.slug === currentId
        );

        if (foundPost) {
          // console.log(
          //   `✅ [${currentContentType}/${currentId}] Found in cached posts`
          // );
          setPost(foundPost);
          selectPostFn(foundPost);
        } else {
          // console.warn(
          //   `⚠️ [${currentContentType}/${currentId}] Not found in cache either, navigating back`
          // );
          navigateFn(`/${currentContentType}`);
        }
      } finally {
        // Clean up loading flags
        loadingRef.current = false;
        isLoadingGlobalRef.current = false;
        // console.log(
        //   `✓ [${currentContentType}/${currentId}] Detail loading complete at ${new Date().toISOString()}`
        // );
      }
    };

    loadDetailData();
  }, [
    id,
    displayPosts.length,
    contentType,
    loadSingleContent,
    navigate,
    selectPost,
    displayPosts,
  ]);

  // Show loading state
  if (isLoading || !dataLoaded) {
    return (
      <FluentSpinner
        size={SpinnerSize.large}
        label='Loading content...'
        showLabel={true}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <Container
        size='md'
        style={{
          textAlign: 'center',
          padding: '2rem',
          margin: '0 auto',
          backgroundColor: theme.palette.neutralLighter,
          borderRadius: borderRadius.l,
          boxShadow: shadows.m,
        }}
      >
        <Typography
          variant='h2'
          color={theme.palette.red}
          fontSize={theme.typography.fontSizes.clamp5}
          marginBottom='1rem'
        >
          ⚠️
        </Typography>

        <Typography
          variant='h2'
          color={theme.palette.themePrimary}
          marginBottom='1rem'
        >
          Error Loading Content
        </Typography>

        <Container
          style={{
            backgroundColor: theme.palette.neutralLighterAlt,
            padding: '1rem',
            borderRadius: borderRadius.s,
            marginBottom: '1rem',
            overflowX: 'auto',
            textAlign: 'left',
          }}
        >
          <Typography
            variant='pre'
            fontFamily='monospace'
            fontSize='0.9rem'
            color={theme.palette.neutralPrimary}
          >
            {error.toString()}
          </Typography>
        </Container>

        <Typography
          variant='p'
          marginBottom='1rem'
          color={theme.palette.neutralSecondary}
        >
          {isUsingApi
            ? "The API request failed. You'll see mock data instead."
            : 'Using mock data since API mode is disabled.'}
        </Typography>

        <Container display='flex' justifyContent='center' gap='1rem'>
          <FluentButton
            onClick={handleRetry}
            disabled={isRetrying}
            variant='primary'
            text={isRetrying ? '⏳ Retrying...' : '🔄 Retry API Call'}
            size='medium'
            isDisabled={isRetrying}
          />

          <FluentButton
            onClick={() => navigate(`/${contentType}`)}
            variant='secondary'
            isOutlined={true}
            text='Return to List View'
            size='medium'
          />
        </Container>
      </Container>
    );
  }

  // Special handling for my-content: render ContentSquares instead of cards
  if (contentType === 'my-content') {
    return (
      <Container>
        <LayoutGrid
          columns={isMobile || isTablet ? 2 : 3}
          maxWidth='900px'
          margin='0 auto'
          gap='1.5rem'
        >
          {ROUTES.map((route) => {
            if (route.isContentScreen) {
              // Special handling for GitHub: show "Coming Soon!" but enable external link
              const isGitHub = route.name === 'github';
              const shouldShowComingSoon = route.isComingSoon || isGitHub;

              const handleClick = () => {
                if (route.isExternal && route.externalUrl) {
                  window.open(
                    route.externalUrl,
                    '_blank',
                    'noopener,noreferrer'
                  );
                } else if (!route.isComingSoon) {
                  navigate(`/${route.path}`);
                }
              };

              return (
                <ContentSquare
                  key={route.path}
                  name={route.name}
                  isComingSoon={shouldShowComingSoon}
                  isExternal={route.isExternal || false}
                  date={
                    shouldShowComingSoon
                      ? 'Coming Soon!'
                      : new Date().toISOString()
                  }
                  onClick={
                    route.isComingSoon && !route.isExternal
                      ? undefined
                      : handleClick
                  }
                />
              );
            }
            return null;
          })}
        </LayoutGrid>
      </Container>
    );
  }

  // Special handling for services/about content types: render Services component
  if (
    contentType === 'about' ||
    contentType === 'services' ||
    contentType === 'personal-training' ||
    contentType === 'resonance-core' ||
    contentType === 'education-training' ||
    contentType === 'consulting' ||
    contentType === 'development' ||
    contentType === 'design'
  ) {
    return <Services currentView={contentType} />;
  }

  // Special handling for contact-me: render ContactMe component
  if (contentType === 'contact-me') {
    return <ContactMe />;
  }

  // If we have an ID, show the detail view
  if (id) {
    const displayPost = post || selectedPost;
    if (!displayPost) {
      return (
        <FluentSpinner
          size={SpinnerSize.large}
          label='Loading post...'
          showLabel={true}
        />
      );
    }
    return (
      <AnimatePresence mode='wait'>
        <FadeUp key={`detail-${id}`} delay={0.1} duration={0.5}>
          <ContentView
            post={displayPost}
            contentType={contentType}
            allPosts={displayPosts}
          />
        </FadeUp>
      </AnimatePresence>
    );
  }

  // If calendar is open, show calendar
  if (isCalendarOpen) {
    return (
      <AnimatePresence mode='wait'>
        <FadeUp key='calendar-view' delay={0.1} duration={0.5}>
          <Calendar />
        </FadeUp>
      </AnimatePresence>
    );
  }

  // Grid columns configuration
  const getGridColumns = () => {
    if (viewType === 'large-tile') {
      return isMobile ? 1 : 2;
    } else if (viewType === 'grid') {
      return isMobile ? 1 : isTablet ? 2 : !isLargeScreen ? 3 : 4;
    } else {
      return isMobile || isTabletPortrait
        ? 1
        : isTablet || isSquare || isMobileLandscape
          ? 2
          : 3;
    }
  };

  const columns = getGridColumns();

  const renderCard = (post: ContentItem) => {
    const handleCardClick = () => {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/').filter((part) => part);
      const basePath =
        pathParts.length > 0 ? `/${pathParts[0]}` : `/${contentType}`;
      navigate(`${basePath}/${post.id}`);
    };

    const commonProps = {
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl || post.media,
      imageAlt: post.imageAlt,
      date: post.date,
      onClick: handleCardClick,
      showTitleOnImage: viewType === 'large-tile',
    };

    // Map view types to unified card view types
    const getCardViewType = () => {
      switch (viewType) {
        case 'grid':
          return 'grid' as const;
        case 'small-tile':
          return 'small' as const;
        case 'large-tile':
          return 'large' as const;
        default:
          return 'grid' as const;
      }
    };

    // For all card types, we'll show title on image when there's an image
    const shouldShowTitleOnImage = post.imageUrl || post.media ? true : false;

    // For portfolio items with images, use specialized rendering when in large-tile view
    if (
      contentType === 'portfolio' &&
      (post.imageUrl || post.media) &&
      viewType === 'large-tile'
    ) {
      // For portfolio in large-tile view, use the image card view type
      return (
        <UnifiedCard
          key={post.id}
          {...commonProps}
          viewType='image'
          imageText={post.title}
          showTitleOnImage={true}
          delay={0.1}
          onClick={handleCardClick} // Explicitly pass onClick to ensure it's not lost
        />
      );
    }

    // Create custom left children for small view type with image
    if (viewType === 'small-tile' && (post.imageUrl || post.media)) {
      const imageUrl = post.imageUrl || post.media;
      const imageAlt = post.imageAlt || post.title;

      // Create left side image content with hover effect
      const leftImageContent = (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
              // Apply zoom effect on hover
              (e.target as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              // Reset on mouse out
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }}
          />
        </div>
      );

      return (
        <UnifiedCard
          key={post.id}
          {...commonProps}
          viewType='small'
          leftChildren={leftImageContent}
        />
      );
    }

    return (
      <UnifiedCard
        key={post.id}
        {...commonProps}
        viewType={getCardViewType()}
        showTitleOnImage={shouldShowTitleOnImage}
        imageText={post.title}
      />
    );
  };

  // // Format the timestamp nicely
  // const formatTimestamp = (date: Date | null) => {
  //   if (!date) return '';
  //   const now = new Date();
  //   const diffMs = now.getTime() - date.getTime();
  //   const diffSec = Math.floor(diffMs / 1000);

  //   if (diffSec < 60) return `${diffSec}s ago`;
  //   if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;

  //   return date.toLocaleTimeString(undefined, {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  // };
  // Show list view
  return (
    <Container>
      <FilterToolbar />
      {/* <ApiStatusIndicator /> */}
      <AnimatePresence mode='wait'>
        <FadeUp
          key={`list-${viewType}-${displayPosts.length}`}
          delay={0.1}
          duration={0.5}
        >
          <LayoutGrid columns={columns} gap='1rem' margin='0 0 1.25rem 0'>
            {displayPosts.map(renderCard)}
          </LayoutGrid>
        </FadeUp>
      </AnimatePresence>
      <Outlet />
    </Container>
  );
};

export const UnifiedContentPage: React.FC<UnifiedContentPageProps> = ({
  contentType,
}) => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();

  // For services content types, let PageWrapper handle the title logic
  // For other content types, only hide the image title when in detail view (when there's an ID)
  const shouldShowImageTitle = React.useMemo(() => {
    // If it's a services-related content type or contact-me, don't override PageWrapper's logic
    if (isMobile) {
      if (
        contentType === 'personal-training' ||
        contentType === 'education-training' ||
        contentType === 'resonance-core' ||
        contentType === 'consulting' ||
        contentType === 'development' ||
        contentType === 'design' ||
        contentType === 'contact-me'
      ) {
        return undefined; // Let PageWrapper decide
      }
    }

    // For other content types, hide title only when there's an ID (detail view)
    return !id;
  }, [contentType, isMobile, id]);

  return (
    <Loading>
      <PageWrapper showImageTitle={shouldShowImageTitle}>
        <ContentManager contentType={contentType} />
      </PageWrapper>
    </Loading>
  );
};

export default UnifiedContentPage;
