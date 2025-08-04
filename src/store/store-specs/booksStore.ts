/**
 * Books Store
 * Zustand store for managing books data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  BookDTO,
  BookWithMediaDTO,
  CreateBookRequest,
  UpdateBookRequest,
  BookListParams,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface BooksState {
  // Data
  books: Record<string, BookDTO | BookWithMediaDTO>;
  booksList: string[]; // Array of book slugs for ordering

  // Filtered lists for different views
  publishedBooks: string[];
  draftBooks: string[];
  categorizedBooks: Record<string, string[]>; // category -> slugs
  taggedBooks: Record<string, string[]>; // tag -> slugs
  authorBooks: Record<string, string[]>; // authorSlug -> slugs

  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  loadingStates: Record<string, boolean>; // Per-book loading states

  // Error states
  error: string | null;
  errors: Record<string, string>; // Per-book errors

  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  // Filters and search
  currentFilters: BookListParams;
  searchResults: string[]; // Slugs of search results

  // Cache management
  lastFetched: number | null;
  cacheExpiry: number;

  // Actions
  fetchBooks: (params?: BookListParams) => Promise<void>;

  fetchBook: (slug: string, includeMedia?: boolean) => Promise<void>;

  upsertBook: (
    slug: string,
    bookData: CreateBookRequest | UpdateBookRequest
  ) => Promise<BookDTO | null>;

  deleteBook: (slug: string) => Promise<boolean>;

  // Media actions
  setBookFeaturedImage: (slug: string, mediaId: string) => Promise<boolean>;
  setBookFeaturedVideo: (slug: string, mediaId: string) => Promise<boolean>;
  setBookFeaturedMedia: (slug: string, mediaId: string) => Promise<boolean>;
  addBookMediaReference: (slug: string, mediaId: string) => Promise<boolean>;
  removeBookMediaReference: (slug: string, mediaId: string) => Promise<boolean>;

  // Filter and search actions
  searchBooks: (
    searchTerm: string,
    params?: Omit<BookListParams, 'searchTerm'>
  ) => Promise<void>;

  getBooksByCategory: (
    category: string,
    params?: Omit<BookListParams, 'category'>
  ) => Promise<void>;

  getBooksByAuthor: (
    authorSlug: string,
    params?: Omit<BookListParams, 'authorSlug'>
  ) => Promise<void>;

  getBooksByTags: (
    tags: string[],
    params?: Omit<BookListParams, 'tags'>
  ) => Promise<void>;

  // Cache and state management
  invalidateCache: () => void;
  clearErrors: () => void;
  clearBookError: (slug: string) => void;
  setCurrentFilters: (filters: BookListParams) => void;

  // Selectors
  getBook: (slug: string) => BookDTO | BookWithMediaDTO | null;
  getBookWithMedia: (slug: string) => BookWithMediaDTO | null;
  getAllBooks: () => (BookDTO | BookWithMediaDTO)[];
  getPublishedBooks: () => (BookDTO | BookWithMediaDTO)[];
  getDraftBooks: () => (BookDTO | BookWithMediaDTO)[];
  getBooksInCategory: (category: string) => (BookDTO | BookWithMediaDTO)[];
  getBooksByTag: (tag: string) => (BookDTO | BookWithMediaDTO)[];
  getBooksByAuthorSlug: (authorSlug: string) => (BookDTO | BookWithMediaDTO)[];
  isBookLoading: (slug: string) => boolean;
  getBookError: (slug: string) => string | null;
  isCacheValid: () => boolean;
}

export const useBooksStore = create<BooksState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        books: {},
        booksList: [],
        publishedBooks: [],
        draftBooks: [],
        categorizedBooks: {},
        taggedBooks: {},
        authorBooks: {},
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
        currentFilters: {},
        searchResults: [],
        lastFetched: null,
        cacheExpiry: 5 * 60 * 1000, // 5 minutes

        // Actions
        fetchBooks: async (params = {}) => {
          const state = get();

          // Check cache validity for list requests
          if (
            params.page === 1 &&
            state.isCacheValid() &&
            state.booksList.length > 0 &&
            !params.searchTerm
          ) {
            return;
          }

          set({ isLoadingList: true, error: null, currentFilters: params });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.getBooks(params);

            if (response.success && response.data) {
              const booksMap: Record<string, BookDTO | BookWithMediaDTO> = {};
              const booksList: string[] = [];
              const publishedBooks: string[] = [];
              const draftBooks: string[] = [];
              const categorizedBooks: Record<string, string[]> = {};
              const taggedBooks: Record<string, string[]> = {};
              const authorBooks: Record<string, string[]> = {};

              response.data.forEach((book) => {
                // For BookWithMediaDTO, we need to access the book property
                const bookData = 'book' in book ? book.book : book;

                booksMap[bookData.slug] = book;
                booksList.push(bookData.slug);

                // Categorize by status
                if (bookData.status === 'Published') {
                  publishedBooks.push(bookData.slug);
                } else if (bookData.status === 'Draft') {
                  draftBooks.push(bookData.slug);
                }

                // Categorize by category
                if (!categorizedBooks[bookData.category]) {
                  categorizedBooks[bookData.category] = [];
                }
                categorizedBooks[bookData.category].push(bookData.slug);

                // Categorize by tags
                bookData.tagsList.forEach((tag) => {
                  if (!taggedBooks[tag]) {
                    taggedBooks[tag] = [];
                  }
                  taggedBooks[tag].push(bookData.slug);
                });

                // Categorize by author
                if (!authorBooks[bookData.authorSlug]) {
                  authorBooks[bookData.authorSlug] = [];
                }
                authorBooks[bookData.authorSlug].push(bookData.slug);
              });

              const newState = {
                books:
                  params.page === 1
                    ? booksMap
                    : { ...state.books, ...booksMap },
                booksList:
                  params.page === 1
                    ? booksList
                    : [...state.booksList, ...booksList],
                publishedBooks:
                  params.page === 1
                    ? publishedBooks
                    : [...state.publishedBooks, ...publishedBooks],
                draftBooks:
                  params.page === 1
                    ? draftBooks
                    : [...state.draftBooks, ...draftBooks],
                categorizedBooks:
                  params.page === 1
                    ? categorizedBooks
                    : {
                        ...state.categorizedBooks,
                        ...Object.entries(categorizedBooks).reduce(
                          (acc, [category, slugs]) => {
                            acc[category] = [
                              ...(state.categorizedBooks[category] || []),
                              ...slugs,
                            ];
                            return acc;
                          },
                          {} as Record<string, string[]>
                        ),
                      },
                taggedBooks:
                  params.page === 1
                    ? taggedBooks
                    : {
                        ...state.taggedBooks,
                        ...Object.entries(taggedBooks).reduce(
                          (acc, [tag, slugs]) => {
                            acc[tag] = [
                              ...(state.taggedBooks[tag] || []),
                              ...slugs,
                            ];
                            return acc;
                          },
                          {} as Record<string, string[]>
                        ),
                      },
                authorBooks:
                  params.page === 1
                    ? authorBooks
                    : {
                        ...state.authorBooks,
                        ...Object.entries(authorBooks).reduce(
                          (acc, [author, slugs]) => {
                            acc[author] = [
                              ...(state.authorBooks[author] || []),
                              ...slugs,
                            ];
                            return acc;
                          },
                          {} as Record<string, string[]>
                        ),
                      },
                currentPage: response.pagination?.page || 1,
                totalPages: response.pagination?.totalPages || 0,
                totalCount: response.pagination?.totalCount || 0,
                hasNextPage: response.pagination?.hasNextPage || false,
                hasPreviousPage: response.pagination?.hasPreviousPage || false,
                lastFetched: Date.now(),
                isLoadingList: false,
                searchResults: params.searchTerm
                  ? booksList
                  : state.searchResults,
              };

              set(newState);
            }
          } catch (error) {
            set({
              error: formatApiError(error),
              isLoadingList: false,
            });
          }
        },

        fetchBook: async (slug: string, includeMedia = false) => {
          const state = get();

          // Check if book exists and is not stale
          const existingBook = state.books[slug];
          if (existingBook && !includeMedia && state.isCacheValid()) {
            return;
          }

          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.getBook(slug, {
              includeMedia,
            });

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
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

        upsertBook: async (
          slug: string,
          bookData: CreateBookRequest | UpdateBookRequest
        ) => {
          const state = get();

          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.upsertBook(slug, bookData);

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: { ...state.loadingStates, [slug]: false },
                lastFetched: Date.now(),
              });

              // Invalidate cache to force refresh
              get().invalidateCache();

              return response.data;
            }

            set({
              loadingStates: { ...state.loadingStates, [slug]: false },
            });
            return null;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [slug]: false },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return null;
          }
        },

        deleteBook: async (slug: string) => {
          const state = get();

          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.deleteBook(slug);

            if (response.success) {
              const { [slug]: removedBook, ...remainingBooks } = state.books;
              const { [slug]: removedLoading, ...remainingLoading } =
                state.loadingStates;
              const { [slug]: removedError, ...remainingErrors } = state.errors;

              set({
                books: remainingBooks,
                booksList: state.booksList.filter((s) => s !== slug),
                loadingStates: remainingLoading,
                errors: remainingErrors,
                lastFetched: Date.now(),
              });

              // Invalidate cache to force refresh
              get().invalidateCache();

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

        // Media actions
        setBookFeaturedImage: async (slug: string, mediaId: string) => {
          const state = get();

          set({
            loadingStates: {
              ...state.loadingStates,
              [`${slug}-featured-image`]: true,
            },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.setBookFeaturedImage(
              slug,
              mediaId
            );

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-featured-image`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-image`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-image`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        setBookFeaturedVideo: async (slug: string, mediaId: string) => {
          const state = get();

          set({
            loadingStates: {
              ...state.loadingStates,
              [`${slug}-featured-video`]: true,
            },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.setBookFeaturedVideo(
              slug,
              mediaId
            );

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-featured-video`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-video`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-video`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        setBookFeaturedMedia: async (slug: string, mediaId: string) => {
          const state = get();

          set({
            loadingStates: {
              ...state.loadingStates,
              [`${slug}-featured-media`]: true,
            },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.setBookFeaturedMedia(
              slug,
              mediaId
            );

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-featured-media`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-media`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-featured-media`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        addBookMediaReference: async (slug: string, mediaId: string) => {
          const state = get();

          set({
            loadingStates: {
              ...state.loadingStates,
              [`${slug}-add-media`]: true,
            },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.addBookMediaReference(
              slug,
              mediaId
            );

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-add-media`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-add-media`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-add-media`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        removeBookMediaReference: async (slug: string, mediaId: string) => {
          const state = get();

          set({
            loadingStates: {
              ...state.loadingStates,
              [`${slug}-remove-media`]: true,
            },
            errors: { ...state.errors, [slug]: '' },
          });

          try {
            const apiClient = getApiClient();
            const response = await apiClient.books.removeBookMediaReference(
              slug,
              mediaId
            );

            if (response.success && response.data) {
              set({
                books: { ...state.books, [slug]: response.data },
                loadingStates: {
                  ...state.loadingStates,
                  [`${slug}-remove-media`]: false,
                },
                lastFetched: Date.now(),
              });
              return true;
            }

            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-remove-media`]: false,
              },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: {
                ...state.loadingStates,
                [`${slug}-remove-media`]: false,
              },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },

        // Filter and search actions
        searchBooks: async (searchTerm: string, params = {}) => {
          return get().fetchBooks({ ...params, searchTerm });
        },

        getBooksByCategory: async (category: string, params = {}) => {
          return get().fetchBooks({ ...params, category });
        },

        getBooksByAuthor: async (authorSlug: string, params = {}) => {
          return get().fetchBooks({ ...params, authorSlug });
        },

        getBooksByTags: async (tags: string[], params = {}) => {
          return get().fetchBooks({ ...params, tags });
        },

        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },

        clearErrors: () => {
          set({ error: null, errors: {} });
        },

        clearBookError: (slug: string) => {
          const state = get();
          const { [slug]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },

        setCurrentFilters: (filters: BookListParams) => {
          set({ currentFilters: filters });
        },

        // Selectors
        getBook: (slug: string) => {
          const book = get().books[slug];
          return book || null;
        },

        getBookWithMedia: (slug: string) => {
          const book = get().books[slug];
          return book && 'book' in book ? (book as BookWithMediaDTO) : null;
        },

        getAllBooks: () => {
          const state = get();
          return state.booksList
            .map((slug) => state.books[slug])
            .filter(Boolean);
        },

        getPublishedBooks: () => {
          const state = get();
          return state.publishedBooks
            .map((slug) => state.books[slug])
            .filter(Boolean);
        },

        getDraftBooks: () => {
          const state = get();
          return state.draftBooks
            .map((slug) => state.books[slug])
            .filter(Boolean);
        },

        getBooksInCategory: (category: string) => {
          const state = get();
          const slugs = state.categorizedBooks[category] || [];
          return slugs.map((slug) => state.books[slug]).filter(Boolean);
        },

        getBooksByTag: (tag: string) => {
          const state = get();
          const slugs = state.taggedBooks[tag] || [];
          return slugs.map((slug) => state.books[slug]).filter(Boolean);
        },

        getBooksByAuthorSlug: (authorSlug: string) => {
          const state = get();
          const slugs = state.authorBooks[authorSlug] || [];
          return slugs.map((slug) => state.books[slug]).filter(Boolean);
        },

        isBookLoading: (slug: string) => {
          return get().loadingStates[slug] || false;
        },

        getBookError: (slug: string) => {
          return get().errors[slug] || null;
        },

        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'books-store',
        partialize: (state) => ({
          books: state.books,
          booksList: state.booksList,
          publishedBooks: state.publishedBooks,
          draftBooks: state.draftBooks,
          categorizedBooks: state.categorizedBooks,
          taggedBooks: state.taggedBooks,
          authorBooks: state.authorBooks,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'BooksStore' }
  )
);
