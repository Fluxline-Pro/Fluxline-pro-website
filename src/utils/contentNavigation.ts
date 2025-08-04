import { ContentItem } from '../pages/unified-content-page/unified-content-page';

/**
 * Utility functions for content navigation between posts
 */

export interface NavigationInfo {
  currentIndex: number;
  nextPost: ContentItem | null;
  previousPost: ContentItem | null;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Find the current post index in the posts array
 */
export const findCurrentIndex = (posts: ContentItem[], currentId: string): number => {
  return posts.findIndex((post) => post.id === currentId || post.slug === currentId);
};

/**
 * Get navigation information for the current post
 */
export const getNavigationInfo = (posts: ContentItem[], currentId: string): NavigationInfo => {
  const currentIndex = findCurrentIndex(posts, currentId);
  
  if (currentIndex === -1) {
    return {
      currentIndex: -1,
      nextPost: null,
      previousPost: null,
      hasNext: false,
      hasPrevious: false,
    };
  }

  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return {
    currentIndex,
    nextPost,
    previousPost,
    hasNext: nextPost !== null,
    hasPrevious: previousPost !== null,
  };
};

/**
 * Generate contextual button text based on content type
 */
export const getListButtonText = (contentType: string): string => {
  switch (contentType) {
    case 'blog':
      return 'full blog list';
    case 'portfolio':
      return 'full portfolio list';
    case 'github':
      return 'full github list';
    case 'music':
      return 'full music list';
    case 'videos':
      return 'full videos list';
    case 'books':
      return 'full books list';
    case 'livestreams':
      return 'full livestreams list';
    default:
      return 'full list';
  }
};

/**
 * Generate base path for navigation
 */
export const getBasePath = (contentType: string): string => {
  return `/${contentType}`;
};