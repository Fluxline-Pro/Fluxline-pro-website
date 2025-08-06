// Store specs
import { useApiStore } from './store-specs/apiStore';
import { useContentStore } from './store-specs/contentStore';
import { useUserPreferencesStore } from './store-specs/userPreferencesStore';

// New API stores
import { useAuthorsStore } from './store-specs/authorsStore';
import { useBlogPostsStore } from './store-specs/blogPostsStore';
import { usePortfolioPiecesStore } from './store-specs/portfolioPiecesStore';
import { useGitHubStore } from './store-specs/githubStore';
import { useMediaStore } from './store-specs/mediaStore';
import { useBooksStore } from './store-specs/booksStore';
import { useContactStore } from './store-specs/contactStore';
import { useCombinedApiStore } from './store-specs/combinedApiStore';

// Export individual stores for direct use
export {
  useAuthorsStore,
  useBlogPostsStore,
  usePortfolioPiecesStore,
  useGitHubStore,
  useMediaStore,
  useBooksStore,
  useContactStore,
  useCombinedApiStore,
};

// Export convenience hooks
export * from './store-specs/combinedApiStore';

// Legacy combined store (maintained for backward compatibility)
export const useStore = () => {
  const api = useApiStore();
  const content = useContentStore();
  const userPreferences = useUserPreferencesStore();

  return {
    ...api,
    ...content,
    ...userPreferences,
  };
};
