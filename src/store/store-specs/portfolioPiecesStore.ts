/**
 * PortfolioPieces Store
 * Zustand store for managing portfolio piece data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  PortfolioPieceDTO,
  PortfolioPieceWithMediaDTO,
  CreatePortfolioPieceRequest,
  UpdatePortfolioPieceRequest,
  PortfolioPieceListParams,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface PortfolioPiecesState {
  // Data
  portfolioPieces: Record<string, PortfolioPieceDTO | PortfolioPieceWithMediaDTO>;
  portfolioPiecesList: string[]; // Array of portfolio piece slugs for ordering
  
  // Filtered lists for different views
  publishedPieces: string[];
  draftPieces: string[];
  categorizedPieces: Record<string, string[]>; // category -> slugs
  taggedPieces: Record<string, string[]>; // tag -> slugs
  authorPieces: Record<string, string[]>; // authorSlug -> slugs
  
  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  loadingStates: Record<string, boolean>; // Per-piece loading states
  
  // Error states
  error: string | null;
  errors: Record<string, string>; // Per-piece errors
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Filters and search
  currentFilters: PortfolioPieceListParams;
  searchResults: string[]; // Slugs of search results
  
  // Cache management
  lastFetched: number | null;
  cacheExpiry: number;
  
  // Actions
  fetchPortfolioPieces: (params?: PortfolioPieceListParams) => Promise<void>;
  
  fetchPortfolioPiece: (slug: string, includeMedia?: boolean) => Promise<void>;
  
  createPortfolioPiece: (portfolioPieceData: CreatePortfolioPieceRequest) => Promise<PortfolioPieceDTO | null>;
  
  updatePortfolioPiece: (portfolioPieceData: UpdatePortfolioPieceRequest) => Promise<PortfolioPieceDTO | null>;
  
  deletePortfolioPiece: (slug: string) => Promise<boolean>;
  
  uploadPortfolioPieceMedia: (
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery',
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
  ) => Promise<boolean>;
  
  // Filter and search actions
  searchPortfolioPieces: (searchTerm: string, params?: Omit<PortfolioPieceListParams, 'searchTerm'>) => Promise<void>;
  
  getPortfolioPiecesByCategory: (category: string, params?: Omit<PortfolioPieceListParams, 'category'>) => Promise<void>;
  
  getPortfolioPiecesByAuthor: (authorSlug: string, params?: Omit<PortfolioPieceListParams, 'authorSlug'>) => Promise<void>;
  
  getPortfolioPiecesByTags: (tags: string[], params?: Omit<PortfolioPieceListParams, 'tags'>) => Promise<void>;
  
  // Cache and state management
  invalidateCache: () => void;
  clearErrors: () => void;
  clearPortfolioPieceError: (slug: string) => void;
  setCurrentFilters: (filters: PortfolioPieceListParams) => void;
  
  // Selectors
  getPortfolioPiece: (slug: string) => PortfolioPieceDTO | PortfolioPieceWithMediaDTO | null;
  getPortfolioPieceWithMedia: (slug: string) => PortfolioPieceWithMediaDTO | null;
  getAllPortfolioPieces: () => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  getPublishedPortfolioPieces: () => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  getDraftPortfolioPieces: () => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  getPortfolioPiecesInCategory: (category: string) => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  getPortfolioPiecesByTag: (tag: string) => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  getPortfolioPiecesByAuthorSlug: (authorSlug: string) => (PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[];
  isPortfolioPieceLoading: (slug: string) => boolean;
  getPortfolioPieceError: (slug: string) => string | null;
  isCacheValid: () => boolean;
}

export const usePortfolioPiecesStore = create<PortfolioPiecesState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        portfolioPieces: {},
        portfolioPiecesList: [],
        publishedPieces: [],
        draftPieces: [],
        categorizedPieces: {},
        taggedPieces: {},
        authorPieces: {},
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
        fetchPortfolioPieces: async (params = {}) => {
          const state = get();
          
          // Check cache validity for list requests
          if (params.page === 1 && state.isCacheValid() && state.portfolioPiecesList.length > 0 && !params.searchTerm) {
            return;
          }
          
          set({ isLoadingList: true, error: null, currentFilters: params });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.getPortfolioPieces(params);
            
            if (response.success && response.data) {
              const portfolioPiecesMap: Record<string, PortfolioPieceDTO | PortfolioPieceWithMediaDTO> = {};
              const portfolioPiecesList: string[] = [];
              const publishedPieces: string[] = [];
              const draftPieces: string[] = [];
              const categorizedPieces: Record<string, string[]> = {};
              const taggedPieces: Record<string, string[]> = {};
              const authorPieces: Record<string, string[]> = {};
              
              response.data.forEach((piece) => {
                portfolioPiecesMap[piece.slug] = piece;
                portfolioPiecesList.push(piece.slug);
                
                // Categorize by status
                if (piece.status === 'Published') {
                  publishedPieces.push(piece.slug);
                } else if (piece.status === 'Draft') {
                  draftPieces.push(piece.slug);
                }
                
                // Categorize by category
                if (!categorizedPieces[piece.category]) {
                  categorizedPieces[piece.category] = [];
                }
                categorizedPieces[piece.category].push(piece.slug);
                
                // Categorize by tags
                piece.tagsList.forEach(tag => {
                  if (!taggedPieces[tag]) {
                    taggedPieces[tag] = [];
                  }
                  taggedPieces[tag].push(piece.slug);
                });
                
                // Categorize by author
                if (!authorPieces[piece.authorSlug]) {
                  authorPieces[piece.authorSlug] = [];
                }
                authorPieces[piece.authorSlug].push(piece.slug);
              });
              
              const newState = {
                portfolioPieces: params.page === 1 ? portfolioPiecesMap : { ...state.portfolioPieces, ...portfolioPiecesMap },
                portfolioPiecesList: params.page === 1 ? portfolioPiecesList : [...state.portfolioPiecesList, ...portfolioPiecesList],
                publishedPieces: params.page === 1 ? publishedPieces : [...state.publishedPieces, ...publishedPieces],
                draftPieces: params.page === 1 ? draftPieces : [...state.draftPieces, ...draftPieces],
                categorizedPieces: params.page === 1 ? categorizedPieces : {
                  ...state.categorizedPieces,
                  ...Object.entries(categorizedPieces).reduce((acc, [category, slugs]) => {
                    acc[category] = [...(state.categorizedPieces[category] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                taggedPieces: params.page === 1 ? taggedPieces : {
                  ...state.taggedPieces,
                  ...Object.entries(taggedPieces).reduce((acc, [tag, slugs]) => {
                    acc[tag] = [...(state.taggedPieces[tag] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                authorPieces: params.page === 1 ? authorPieces : {
                  ...state.authorPieces,
                  ...Object.entries(authorPieces).reduce((acc, [author, slugs]) => {
                    acc[author] = [...(state.authorPieces[author] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                currentPage: response.pagination?.page || 1,
                totalPages: response.pagination?.totalPages || 0,
                totalCount: response.pagination?.totalCount || 0,
                hasNextPage: response.pagination?.hasNextPage || false,
                hasPreviousPage: response.pagination?.hasPreviousPage || false,
                lastFetched: Date.now(),
                isLoadingList: false,
                searchResults: params.searchTerm ? portfolioPiecesList : state.searchResults,
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
        
        fetchPortfolioPiece: async (slug: string, includeMedia = false) => {
          const state = get();
          
          // Check if piece exists and is not stale
          const existingPiece = state.portfolioPieces[slug];
          if (existingPiece && !includeMedia && state.isCacheValid()) {
            return;
          }
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.getPortfolioPiece(slug, { includeMedia });
            
            if (response.success && response.data) {
              set({
                portfolioPieces: { ...state.portfolioPieces, [slug]: response.data },
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
        
        createPortfolioPiece: async (portfolioPieceData: CreatePortfolioPieceRequest) => {
          set({ isLoading: true, error: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.createPortfolioPiece(portfolioPieceData);
            
            if (response.success && response.data) {
              const state = get();
              set({
                portfolioPieces: { ...state.portfolioPieces, [response.data.slug]: response.data },
                portfolioPiecesList: [response.data.slug, ...state.portfolioPiecesList],
                isLoading: false,
                lastFetched: Date.now(),
              });
              
              // Invalidate cache to force refresh
              get().invalidateCache();
              
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
        
        updatePortfolioPiece: async (portfolioPieceData: UpdatePortfolioPieceRequest) => {
          const state = get();
          const { slug } = portfolioPieceData;
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.updatePortfolioPiece(portfolioPieceData);
            
            if (response.success && response.data) {
              set({
                portfolioPieces: { ...state.portfolioPieces, [slug]: response.data },
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
        
        deletePortfolioPiece: async (slug: string) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.deletePortfolioPiece(slug);
            
            if (response.success) {
              const { [slug]: removedPiece, ...remainingPieces } = state.portfolioPieces;
              const { [slug]: removedLoading, ...remainingLoading } = state.loadingStates;
              const { [slug]: removedError, ...remainingErrors } = state.errors;
              
              set({
                portfolioPieces: remainingPieces,
                portfolioPiecesList: state.portfolioPiecesList.filter(s => s !== slug),
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
        
        uploadPortfolioPieceMedia: async (slug: string, file: File, mediaType: 'featured' | 'content' | 'gallery', onProgress) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [`${slug}-upload`]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.portfolioPieces.uploadPortfolioPieceMedia(slug, file, mediaType, onProgress);
            
            if (response.success && response.data) {
              set({
                portfolioPieces: { ...state.portfolioPieces, [slug]: response.data },
                loadingStates: { ...state.loadingStates, [`${slug}-upload`]: false },
                lastFetched: Date.now(),
              });
              return true;
            }
            
            set({
              loadingStates: { ...state.loadingStates, [`${slug}-upload`]: false },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [`${slug}-upload`]: false },
              errors: { ...state.errors, [slug]: formatApiError(error) },
            });
            return false;
          }
        },
        
        // Filter and search actions
        searchPortfolioPieces: async (searchTerm: string, params = {}) => {
          return get().fetchPortfolioPieces({ ...params, searchTerm });
        },
        
        getPortfolioPiecesByCategory: async (category: string, params = {}) => {
          return get().fetchPortfolioPieces({ ...params, category });
        },
        
        getPortfolioPiecesByAuthor: async (authorSlug: string, params = {}) => {
          return get().fetchPortfolioPieces({ ...params, authorSlug });
        },
        
        getPortfolioPiecesByTags: async (tags: string[], params = {}) => {
          return get().fetchPortfolioPieces({ ...params, tags });
        },
        
        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },
        
        clearErrors: () => {
          set({ error: null, errors: {} });
        },
        
        clearPortfolioPieceError: (slug: string) => {
          const state = get();
          const { [slug]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },
        
        setCurrentFilters: (filters: PortfolioPieceListParams) => {
          set({ currentFilters: filters });
        },
        
        // Selectors
        getPortfolioPiece: (slug: string) => {
          return get().portfolioPieces[slug] || null;
        },
        
        getPortfolioPieceWithMedia: (slug: string) => {
          const piece = get().portfolioPieces[slug];
          return (piece && 'mediaItems' in piece) ? piece as PortfolioPieceWithMediaDTO : null;
        },
        
        getAllPortfolioPieces: () => {
          const state = get();
          return state.portfolioPiecesList.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        getPublishedPortfolioPieces: () => {
          const state = get();
          return state.publishedPieces.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        getDraftPortfolioPieces: () => {
          const state = get();
          return state.draftPieces.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        getPortfolioPiecesInCategory: (category: string) => {
          const state = get();
          const slugs = state.categorizedPieces[category] || [];
          return slugs.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        getPortfolioPiecesByTag: (tag: string) => {
          const state = get();
          const slugs = state.taggedPieces[tag] || [];
          return slugs.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        getPortfolioPiecesByAuthorSlug: (authorSlug: string) => {
          const state = get();
          const slugs = state.authorPieces[authorSlug] || [];
          return slugs.map(slug => state.portfolioPieces[slug]).filter(Boolean);
        },
        
        isPortfolioPieceLoading: (slug: string) => {
          return get().loadingStates[slug] || false;
        },
        
        getPortfolioPieceError: (slug: string) => {
          return get().errors[slug] || null;
        },
        
        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'portfolio-pieces-store',
        partialize: (state) => ({
          portfolioPieces: state.portfolioPieces,
          portfolioPiecesList: state.portfolioPiecesList,
          publishedPieces: state.publishedPieces,
          draftPieces: state.draftPieces,
          categorizedPieces: state.categorizedPieces,
          taggedPieces: state.taggedPieces,
          authorPieces: state.authorPieces,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'PortfolioPiecesStore' }
  )
);