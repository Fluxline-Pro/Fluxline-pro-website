/**
 * Combined API Store
 * Integrates all API-related stores into a unified interface
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAuthorsStore } from './authorsStore';
import { useBlogPostsStore } from './blogPostsStore';
import { usePortfolioPiecesStore } from './portfolioPiecesStore';
import { useGitHubStore } from './githubStore';
import { useMediaStore } from './mediaStore';
import { useBooksStore } from './booksStore';
import { useContactStore } from './contactStore';

interface CombinedApiState {
  // Global loading state
  isGlobalLoading: boolean;

  // Global error state
  globalError: string | null;

  // Cache management
  lastGlobalSync: number | null;

  // Actions
  syncAllData: () => Promise<void>;
  clearAllErrors: () => void;
  invalidateAllCaches: () => void;
  getGlobalLoadingState: () => boolean;
  getGlobalErrorState: () => string | null;

  // Health check
  performHealthCheck: () => Promise<{
    authors: boolean;
    blogPosts: boolean;
    portfolioPieces: boolean;
    github: boolean;
    media: boolean;
    books: boolean;
    contact: boolean;
    overall: boolean;
  }>;
}

export const useCombinedApiStore = create<CombinedApiState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isGlobalLoading: false,
      globalError: null,
      lastGlobalSync: null,

      // Actions
      syncAllData: async () => {
        set({ isGlobalLoading: true, globalError: null });

        try {
          // Get all store actions
          const authorsActions = useAuthorsStore.getState();
          const blogPostsActions = useBlogPostsStore.getState();
          const portfolioActions = usePortfolioPiecesStore.getState();
          const githubActions = useGitHubStore.getState();
          const mediaActions = useMediaStore.getState();
          const booksActions = useBooksStore.getState();

          // Perform parallel data fetching with basic parameters
          await Promise.allSettled([
            authorsActions.fetchAuthors({ page: 1, pageSize: 10 }),
            blogPostsActions.fetchBlogPosts({
              page: 1,
              pageSize: 10,
              status: 'Published',
            }),
            portfolioActions.fetchPortfolioPieces({
              page: 1,
              pageSize: 10,
              status: 'Published',
            }),
            githubActions.fetchRepositories({
              page: 1,
              pageSize: 10,
              type: 'public',
            }),
            githubActions.fetchCurrentYearActivity(),
            mediaActions.fetchMediaList({ page: 1, pageSize: 10 }),
            booksActions.fetchBooks({
              page: 1,
              pageSize: 10,
              status: 'Published',
            }),
          ]);

          set({
            isGlobalLoading: false,
            lastGlobalSync: Date.now(),
          });
        } catch (error) {
          set({
            isGlobalLoading: false,
            globalError:
              error instanceof Error ? error.message : 'Failed to sync data',
          });
        }
      },

      clearAllErrors: () => {
        // Clear errors from all stores
        useAuthorsStore.getState().clearErrors();
        useBlogPostsStore.getState().clearErrors();
        usePortfolioPiecesStore.getState().clearErrors();
        useGitHubStore.getState().clearErrors();
        useMediaStore.getState().clearErrors();
        useBooksStore.getState().clearErrors();
        useContactStore.getState().clearErrors();

        // Clear global error
        set({ globalError: null });
      },

      invalidateAllCaches: () => {
        // Invalidate caches from all stores
        useAuthorsStore.getState().invalidateCache();
        useBlogPostsStore.getState().invalidateCache();
        usePortfolioPiecesStore.getState().invalidateCache();
        useGitHubStore.getState().invalidateCache();
        useGitHubStore.getState().invalidateActivityCache();
        useMediaStore.getState().invalidateCache();
        useBooksStore.getState().invalidateCache();

        // Reset global sync time
        set({ lastGlobalSync: null });
      },

      getGlobalLoadingState: () => {
        const state = get();
        const authorsState = useAuthorsStore.getState();
        const blogPostsState = useBlogPostsStore.getState();
        const portfolioState = usePortfolioPiecesStore.getState();
        const githubState = useGitHubStore.getState();
        const mediaState = useMediaStore.getState();
        const booksState = useBooksStore.getState();
        const contactState = useContactStore.getState();

        return (
          state.isGlobalLoading ||
          authorsState.isLoading ||
          authorsState.isLoadingList ||
          blogPostsState.isLoading ||
          blogPostsState.isLoadingList ||
          portfolioState.isLoading ||
          portfolioState.isLoadingList ||
          githubState.isLoading ||
          githubState.isLoadingList ||
          githubState.isLoadingActivity ||
          mediaState.isLoading ||
          mediaState.isLoadingList ||
          booksState.isLoading ||
          booksState.isLoadingList ||
          contactState.isSubmitting
        );
      },

      getGlobalErrorState: () => {
        const state = get();
        const authorsState = useAuthorsStore.getState();
        const blogPostsState = useBlogPostsStore.getState();
        const portfolioState = usePortfolioPiecesStore.getState();
        const githubState = useGitHubStore.getState();
        const mediaState = useMediaStore.getState();
        const booksState = useBooksStore.getState();
        const contactState = useContactStore.getState();

        // Return the first error found
        return (
          state.globalError ||
          authorsState.error ||
          blogPostsState.error ||
          portfolioState.error ||
          githubState.error ||
          githubState.activityError ||
          mediaState.error ||
          booksState.error ||
          contactState.error ||
          null
        );
      },

      performHealthCheck: async () => {
        const results = {
          authors: false,
          blogPosts: false,
          portfolioPieces: false,
          github: false,
          media: false,
          books: false,
          contact: false,
          overall: false,
        };

        try {
          // Test each store by attempting a lightweight fetch
          const tests = await Promise.allSettled([
            useAuthorsStore.getState().fetchAuthors({ page: 1, pageSize: 1 }),
            useBlogPostsStore
              .getState()
              .fetchBlogPosts({ page: 1, pageSize: 1 }),
            usePortfolioPiecesStore
              .getState()
              .fetchPortfolioPieces({ page: 1, pageSize: 1 }),
            useGitHubStore
              .getState()
              .fetchRepositories({ page: 1, pageSize: 1 }),
            useMediaStore.getState().fetchMediaList({ page: 1, pageSize: 1 }),
            useBooksStore.getState().fetchBooks({ page: 1, pageSize: 1 }),
            // We can't test contact form submission with a real submission, so we consider it healthy
            Promise.resolve(true),
          ]);

          results.authors = tests[0].status === 'fulfilled';
          results.blogPosts = tests[1].status === 'fulfilled';
          results.portfolioPieces = tests[2].status === 'fulfilled';
          results.github = tests[3].status === 'fulfilled';
          results.media = tests[4].status === 'fulfilled';
          results.books = tests[5].status === 'fulfilled';
          results.contact = tests[6].status === 'fulfilled';

          results.overall = Object.values(results).every(Boolean);

          return results;
        } catch (error) {
          return results; // All false
        }
      },
    }),
    { name: 'CombinedApiStore' }
  )
);

// Convenience hooks for accessing individual stores
export const useAuthors = () => useAuthorsStore();
export const useBlogPosts = () => useBlogPostsStore();
export const usePortfolioPieces = () => usePortfolioPiecesStore();
export const useGitHub = () => useGitHubStore();
export const useMedia = () => useMediaStore();
export const useBooks = () => useBooksStore();
export const useContact = () => useContactStore();
export const useCombinedApi = () => useCombinedApiStore();

// Selector hooks for common use cases
export const useAuthor = (slug: string) => {
  return useAuthorsStore((state) => state.getAuthor(slug));
};

export const useBlogPost = (slug: string) => {
  return useBlogPostsStore((state) => state.getBlogPost(slug));
};

export const usePortfolioPiece = (slug: string) => {
  return usePortfolioPiecesStore((state) => state.getPortfolioPiece(slug));
};

export const useRepository = (id: number) => {
  return useGitHubStore((state) => state.getRepository(id));
};

export const useMediaItem = (id: string) => {
  return useMediaStore((state) => state.getMediaItem(id));
};

export const useBook = (slug: string) => {
  return useBooksStore((state) => state.getBook(slug));
};

// Loading state hooks
export const useIsLoading = () => {
  return useCombinedApiStore((state) => state.getGlobalLoadingState());
};

export const useGlobalError = () => {
  return useCombinedApiStore((state) => state.getGlobalErrorState());
};

// Content list hooks
export const usePublishedBlogPosts = () => {
  return useBlogPostsStore((state) => state.getPublishedBlogPosts());
};

export const usePublishedPortfolioPieces = () => {
  return usePortfolioPiecesStore((state) =>
    state.getPublishedPortfolioPieces()
  );
};

export const usePublishedBooks = () => {
  return useBooksStore((state) => state.getPublishedBooks());
};

export const usePublicRepositories = () => {
  return useGitHubStore((state) => state.getPublicRepositories());
};

export const useAllAuthors = () => {
  return useAuthorsStore((state) => state.getAllAuthors());
};

// Media hooks by type
export const useImageItems = () => {
  return useMediaStore((state) => state.getImageItems());
};

export const useVideoItems = () => {
  return useMediaStore((state) => state.getVideoItems());
};

// Activity hooks
export const useGitHubActivity = () => {
  return useGitHubStore((state) => state.getActivityGrid());
};

export const useTotalContributions = () => {
  return useGitHubStore((state) => state.getTotalContributions());
};
