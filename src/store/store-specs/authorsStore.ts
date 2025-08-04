/**
 * Authors Store
 * Zustand store for managing author data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  AuthorDTO,
  AuthorWithMediaDTO,
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface AuthorsState {
  // Data
  authors: Record<string, AuthorDTO | AuthorWithMediaDTO>;
  authorsList: string[]; // Array of author slugs for ordering

  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  loadingStates: Record<string, boolean>; // Per-author loading states

  // Error states
  error: string | null;
  errors: Record<string, string>; // Per-author errors

  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  // Cache management
  lastFetched: number | null;
  cacheExpiry: number; // Cache TTL in milliseconds

  // Actions
  fetchAuthors: (params?: {
    page?: number;
    pageSize?: number;
    includeMedia?: boolean;
    sortBy?: 'displayName' | 'firstName' | 'lastName' | 'authorSlug';
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;

  fetchAuthor: (slug: string, includeMedia?: boolean) => Promise<void>;

  createAuthor: (authorData: CreateAuthorRequest) => Promise<AuthorDTO | null>;

  updateAuthor: (authorData: UpdateAuthorRequest) => Promise<AuthorDTO | null>;

  deleteAuthor: (slug: string) => Promise<boolean>;

  uploadProfileImage: (
    slug: string,
    file: File,
    onProgress?: (progress: {
      loaded: number;
      total: number;
      percentage: number;
    }) => void
  ) => Promise<boolean>;

  // Cache management actions
  invalidateCache: () => void;
  clearErrors: () => void;
  clearAuthorError: (slug: string) => void;

  // Selectors
  getAuthor: (slug: string) => AuthorDTO | AuthorWithMediaDTO | null;
  getAuthorWithMedia: (slug: string) => AuthorWithMediaDTO | null;
  getAllAuthors: () => (AuthorDTO | AuthorWithMediaDTO)[];
  isAuthorLoading: (slug: string) => boolean;
  getAuthorError: (slug: string) => string | null;
  isCacheValid: () => boolean;
}

export const useAuthorsStore = create<AuthorsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        authors: {},
        authorsList: [],
        isLoading: false,
        isLoadingList: false,
        loadingStates: {},
        error: null,
        errors: {},
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        lastFetched: null,
        cacheExpiry: 5 * 60 * 1000, // 5 minutes

        // Actions
        fetchAuthors: async (params = {}) => {
          const state = get();

          // Check cache validity for list requests
          if (
            params.page === 1 &&
            state.isCacheValid() &&
            state.authorsList.length > 0
          ) {
            return;
          }

          set({ isLoadingList: true, error: null });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.getAuthors(params);

            if (response.success && response.data) {
              const authorsMap: Record<string, AuthorDTO | AuthorWithMediaDTO> =
                {};
              const authorsList: string[] = [];

              response.data.forEach((author) => {
                authorsMap[author.authorSlug] = author;
                authorsList.push(author.authorSlug);
              });

              set({
                authors:
                  params.page === 1
                    ? authorsMap
                    : { ...state.authors, ...authorsMap },
                authorsList:
                  params.page === 1
                    ? authorsList
                    : [...state.authorsList, ...authorsList],
                currentPage: response.pagination?.page || 1,
                totalPages: response.pagination?.totalPages || 0,
                totalCount: response.pagination?.totalCount || 0,
                hasNextPage: response.pagination?.hasNextPage || false,
                hasPreviousPage: response.pagination?.hasPreviousPage || false,
                lastFetched: Date.now(),
                isLoadingList: false,
              });
            }
          } catch (error) {
            set({
              error: formatApiError(error),
              isLoadingList: false,
            });
          }
        },

        fetchAuthor: async (slug: string, includeMedia = false) => {
          const state = get();

          // Check if author exists and is not stale
          const existingAuthor = state.authors[slug];
          if (existingAuthor && !includeMedia && state.isCacheValid()) {
            return;
          }

          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.getAuthor(slug, {
              includeMedia,
            });

            if (response.success && response.data) {
              set({
                authors: { ...state.authors, [slug]: response.data },
                loadingStates: { ...state.loadingStates, [slug]: false },
                lastFetched: Date.now(),
              });
            }
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [slug]: false },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
          }
        },

        createAuthor: async (authorData: CreateAuthorRequest) => {
          set({ isLoading: true, error: null });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.createAuthor(authorData);

            if (response.success && response.data) {
              const state = get();
              set({
                authors: {
                  ...state.authors,
                  [response.data.authorSlug]: response.data,
                },
                authorsList: [...state.authorsList, response.data.authorSlug],
                isLoading: false,
                lastFetched: Date.now(),
              });
              return response.data;
            }

            set({ isLoading: false });
            return null;
          } catch (error) {
            set({
              error: formatApiError(error),
              isLoading: false,
            });
            return null;
          }
        },

        updateAuthor: async (authorData: UpdateAuthorRequest) => {
          const state = get();
          const { authorSlug } = authorData;

          set({
            loadingStates: { ...state.loadingStates, [authorSlug]: true },
            errors: { ...state.errors, [authorSlug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.updateAuthor(authorData);

            if (response.success && response.data) {
              set({
                authors: { ...state.authors, [authorSlug]: response.data },
                loadingStates: { ...state.loadingStates, [authorSlug]: false },
                lastFetched: Date.now(),
              });
              return response.data;
            }

            set({
              loadingStates: { ...state.loadingStates, [authorSlug]: false },
            });
            return null;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [authorSlug]: false },
              errors: { ...state.errors, [authorSlug]: formatApiError(error) },
            });
            return null;
          }
        },

        deleteAuthor: async (slug: string) => {
          const state = get();

          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.deleteAuthor(slug);

            if (response.success) {
              const { [slug]: removedAuthor, ...remainingAuthors } =
                state.authors;
              const { [slug]: removedLoading, ...remainingLoading } =
                state.loadingStates;
              const { [slug]: removedError, ...remainingErrors } = state.errors;

              set({
                authors: remainingAuthors,
                authorsList: state.authorsList.filter((s) => s !== slug),
                loadingStates: remainingLoading,
                errors: remainingErrors,
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: { ...state.loadingStates, [slug]: false },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [slug]: false },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        uploadProfileImage: async (slug: string, file: File, onProgress) => {
          const state = get();

          set({
            loadingStates: { ...state.loadingStates, [`${slug}-upload`]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.authors.uploadProfileImage(
              slug,
              file,
              onProgress
            );

            if (response.success && response.data) {
              set({
                authors: { ...state.authors, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-upload`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-upload`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-upload`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        // Cache management actions
        invalidateCache: () => {
          set({ lastFetched: null });
        },

        clearErrors: () => {
          set({ error: null, errors: {} });
        },

        clearAuthorError: (slug: string) => {
          const state = get();
          const { [slug]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },

        // Selectors
        getAuthor: (slug: string) => {
          return get().authors[slug] || null;
        },

        getAuthorWithMedia: (slug: string) => {
          const author = get().authors[slug];
          return author && 'mediaItems' in author
            ? (author as AuthorWithMediaDTO)
            : null;
        },

        getAllAuthors: () => {
          const state = get();
          return state.authorsList
            .map((slug) => state.authors[slug])
            .filter(Boolean);
        },

        isAuthorLoading: (slug: string) => {
          return get().loadingStates[slug] || false;
        },

        getAuthorError: (slug: string) => {
          return get().errors[slug] || null;
        },

        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'authors-store',
        partialize: (state) => ({
          authors: state.authors,
          authorsList: state.authorsList,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'AuthorsStore' }
  )
);
