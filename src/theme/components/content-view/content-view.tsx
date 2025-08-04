import React from 'react';
import { isDayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { BaseCard } from '../card/base-card/base-card';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../layouts/Container';
import { Typography } from '../typography/typography';
import { AuthorTagline } from '../author-tagline/author-tagline';
import { FluentButton } from '../button/button';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { useContentFilterStore } from '../../../store/store-specs/contentFilterStore';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import { ContentItem } from '../../../pages/unified-content-page/unified-content-page';
import {
  getNavigationInfo,
  getListButtonText,
  getBasePath,
} from '../../../utils/contentNavigation';

export interface ContentViewProps {
  post: any; // Replace 'any' with the actual type of post
  contentType?: string;
  allPosts?: ContentItem[];
}

export const ContentView: React.FC<ContentViewProps> = ({
  post,
  contentType = '',
  allPosts = [],
}) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { goBackToList } = useContentFilterStore();

  // Get navigation information
  const navigationInfo = getNavigationInfo(allPosts, post.id);
  const listButtonText = getListButtonText(contentType);
  const basePath = getBasePath(contentType);

  // Navigation handlers
  const handlePreviousPost = () => {
    if (navigationInfo.previousPost) {
      navigate(`${basePath}/${navigationInfo.previousPost.id}`);
    }
  };

  const handleNextPost = () => {
    if (navigationInfo.nextPost) {
      navigate(`${basePath}/${navigationInfo.nextPost.id}`);
    }
  };

  const handleBackToList = () => {
    goBackToList(navigate);
  };

  // Content container styles that apply the layout
  const contentContainerStyles = {
    maxWidth: isMobile ? '100%' : isTablet ? '600px' : '58dvw',
    margin: '0 auto',
    padding: theme.spacing.m,
    borderRadius: theme.effects.roundedCorner4,
  };

  // Individual content styles
  const contentViewStyles = {
    padding: isMobile ? theme.spacing.m : theme.spacing.xl,
    margin: isMobile ? '0' : theme.spacing.l,
    width: '100%',
  };

  return (
    <Container style={contentContainerStyles}>
      <BaseCard
        style={contentViewStyles}
        elevation='medium'
        interactive={false}
        padding={isMobile ? theme.spacing.m : theme.spacing.xl}
      >
        <Typography
          variant='h2'
          fontSize={theme.typography.fontSizes.xl}
          color={theme.palette.themePrimary}
          style={{
            marginTop: isMobile ? theme.spacing.m : theme.spacing.s,
            marginBottom: isMobile ? theme.spacing.xxs : theme.spacing.s2,
          }}
        >
          {post.title}
        </Typography>
        {post.date && (
          <Typography
            variant='h5'
            fontSize={theme.typography.fontSizes.clamp4}
            color={theme.palette.themeTertiary}
            style={{
              marginBottom: isMobile ? 0 : theme.spacing.s,
              display: 'block',
            }}
          >
            {isDayjs(post.date)
              ? post.date.format('DD MMM, YYYY')
              : new Date(post.date)
                  .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                  .toLowerCase()}
          </Typography>
        )}
        <AuthorTagline
          isMobile={isMobile}
          author={
            post.displayName ||
            post.authorDisplayName ||
            post.author ||
            'Terence Waters'
          }
          tagline={post.tagline}
        />
        <Typography
          variant='p'
          style={{ lineHeight: '1.6' }}
          color={theme.palette.neutralPrimary}
          margin={isMobile ? '0 0 1rem 0' : '1rem 0'}
        >
          {post.description}
        </Typography>
      </BaseCard>
      <Container
        padding={
          isMobile
            ? '1rem 0'
            : `0 calc(${theme.spacing.xl} + ${theme.spacing.l})`
        }
      >
        <Container
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          gap={theme.spacing.m}
          padding={isMobile ? '0' : `0 ${theme.spacing.xl} ${theme.spacing.l}`}
        >
          {/* Previous and Next buttons container */}
          <Container
            display='flex'
            gap={theme.spacing.s}
            justifyContent='flex-start'
            alignItems='center'
          >
            {navigationInfo.hasPrevious && (
              <FluentButton
                variant='secondary'
                size='small'
                onClick={handlePreviousPost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s1,
                }}
              >
                <FluentIcon
                  iconName='ChevronLeft'
                  size='small'
                  color={theme.isInverted ? 'black' : 'white'}
                />
                <Typography
                  variant='h5'
                  fontSize={theme.typography.fontSizes.clamp4}
                  color={theme.semanticColors.bodyBackground}
                  padding='0.5rem'
                >
                  go back
                </Typography>
              </FluentButton>
            )}

            {navigationInfo.hasNext && (
              <FluentButton
                variant='secondary'
                size='small'
                onClick={handleNextPost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s1,
                }}
              >
                <Typography
                  variant='h5'
                  fontSize={theme.typography.fontSizes.clamp4}
                  color={theme.semanticColors.bodyBackground}
                  padding='0.5rem'
                >
                  next entry
                </Typography>
                <FluentIcon
                  iconName='ChevronRight'
                  size='small'
                  color={theme.isInverted ? 'black' : 'white'}
                />
              </FluentButton>
            )}
          </Container>

          {/* Back to list button */}
          <FluentButton
            variant='secondary'
            size='small'
            onClick={handleBackToList}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s1,
              margin: '0 auto',
              minWidth: isMobile ? '150px' : '200px',
            }}
          >
            <Typography
              variant='h5'
              fontSize={theme.typography.fontSizes.clamp4}
              color={theme.semanticColors.bodyBackground}
              padding='0.5rem'
            >
              {listButtonText}
            </Typography>
          </FluentButton>
        </Container>
      </Container>
    </Container>
  );
};

export default ContentView;
