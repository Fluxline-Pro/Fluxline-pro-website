/**
 * PressReleases Store
 * Zustand store for managing press release data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  PressReleaseDTO,
  PressReleaseWithMediaDTO,
  CreatePressReleaseRequest,
  UpdatePressReleaseRequest,
  PressReleaseListParams,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface PressReleasesState {
  // Data
  pressReleases: Record<string, PressReleaseDTO | PressReleaseWithMediaDTO>;
  pressReleasesList: string[]; // Array of press release slugs for ordering
  
  // Filtered lists for different views
  publishedReleases: string[];
  draftReleases: string[];
  categorizedReleases: Record<string, string[]>; // category -> slugs
  taggedReleases: Record<string, string[]>; // tag -> slugs
  authorReleases: Record<string, string[]>; // authorSlug -> slugs
  
  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  loadingStates: Record<string, boolean>; // Per-release loading states
  
  // Error states
  error: string | null;
  errors: Record<string, string>; // Per-release errors
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Filters and search
  currentFilters: PressReleaseListParams;
  searchResults: string[]; // Slugs of search results
  
  // Cache management
  lastFetched: number | null;
  cacheExpiry: number;
  
  // Actions
  fetchPressReleases: (params?: PressReleaseListParams) => Promise<void>;
  
  fetchPressRelease: (slug: string, includeMedia?: boolean) => Promise<void>;
  
  createPressRelease: (pressReleaseData: CreatePressReleaseRequest) => Promise<PressReleaseDTO | null>;
  
  updatePressRelease: (pressReleaseData: UpdatePressReleaseRequest) => Promise<PressReleaseDTO | null>;
  
  deletePressRelease: (slug: string) => Promise<boolean>;
  
  uploadPressReleaseMedia: (
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery',
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
  ) => Promise<boolean>;
  
  // Filter and search actions
  searchPressReleases: (searchTerm: string, params?: Omit<PressReleaseListParams, 'searchTerm'>) => Promise<void>;
  
  getPressReleasesByCategory: (category: string, params?: Omit<PressReleaseListParams, 'category'>) => Promise<void>;
  
  getPressReleasesByAuthor: (authorSlug: string, params?: Omit<PressReleaseListParams, 'authorSlug'>) => Promise<void>;
  
  getPressReleasesByTags: (tags: string[], params?: Omit<PressReleaseListParams, 'tags'>) => Promise<void>;
  
  // Cache and state management
  invalidateCache: () => void;
  clearErrors: () => void;
  clearPressReleaseError: (slug: string) => void;
  setCurrentFilters: (filters: PressReleaseListParams) => void;
  
  // Selectors
  getPressRelease: (slug: string) => PressReleaseDTO | PressReleaseWithMediaDTO | null;
  getPressReleaseWithMedia: (slug: string) => PressReleaseWithMediaDTO | null;
  getAllPressReleases: () => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  getPublishedPressReleases: () => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  getDraftPressReleases: () => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  getPressReleasesInCategory: (category: string) => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  getPressReleasesByTag: (tag: string) => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  getPressReleasesByAuthorSlug: (authorSlug: string) => (PressReleaseDTO | PressReleaseWithMediaDTO)[];
  isPressReleaseLoading: (slug: string) => boolean;
  getPressReleaseError: (slug: string) => string | null;
  isCacheValid: () => boolean;
}

export const usePressReleasesStore = create<PressReleasesState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        pressReleases: {},
        pressReleasesList: [],
        publishedReleases: [],
        draftReleases: [],
        categorizedReleases: {},
        taggedReleases: {},
        authorReleases: {},
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
        fetchPressReleases: async (params = {}) => {
          const state = get();
          
          // Check cache validity for list requests
          if (params.page === 1 && state.isCacheValid() && state.pressReleasesList.length > 0 && !params.searchTerm) {
            return;
          }
          
          set({ isLoadingList: true, error: null, currentFilters: params });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.getPressReleases(params);
            
            if (response.success && response.data) {
              const pressReleasesMap: Record<string, PressReleaseDTO | PressReleaseWithMediaDTO> = {};
              const pressReleasesList: string[] = [];
              const publishedReleases: string[] = [];
              const draftReleases: string[] = [];
              const categorizedReleases: Record<string, string[]> = {};
              const taggedReleases: Record<string, string[]> = {};
              const authorReleases: Record<string, string[]> = {};
              
              response.data.forEach((release) => {
                pressReleasesMap[release.slug] = release;
                pressReleasesList.push(release.slug);
                
                // Categorize by status
                if (release.status === 'Published') {
                  publishedReleases.push(release.slug);
                } else if (release.status === 'Draft') {
                  draftReleases.push(release.slug);
                }
                
                // Categorize by category
                if (!categorizedReleases[release.category]) {
                  categorizedReleases[release.category] = [];
                }
                categorizedReleases[release.category].push(release.slug);
                
                // Categorize by tags
                release.tagsList.forEach(tag => {
                  if (!taggedReleases[tag]) {
                    taggedReleases[tag] = [];
                  }
                  taggedReleases[tag].push(release.slug);
                });
                
                // Categorize by author
                if (!authorReleases[release.authorSlug]) {
                  authorReleases[release.authorSlug] = [];
                }
                authorReleases[release.authorSlug].push(release.slug);
              });
              
              const newState = {
                pressReleases: params.page === 1 ? pressReleasesMap : { ...state.pressReleases, ...pressReleasesMap },
                pressReleasesList: params.page === 1 ? pressReleasesList : [...state.pressReleasesList, ...pressReleasesList],
                publishedReleases: params.page === 1 ? publishedReleases : [...state.publishedReleases, ...publishedReleases],
                draftReleases: params.page === 1 ? draftReleases : [...state.draftReleases, ...draftReleases],
                categorizedReleases: params.page === 1 ? categorizedReleases : {
                  ...state.categorizedReleases,
                  ...Object.entries(categorizedReleases).reduce((acc, [category, slugs]) => {
                    acc[category] = [...(state.categorizedReleases[category] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                taggedReleases: params.page === 1 ? taggedReleases : {
                  ...state.taggedReleases,
                  ...Object.entries(taggedReleases).reduce((acc, [tag, slugs]) => {
                    acc[tag] = [...(state.taggedReleases[tag] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                authorReleases: params.page === 1 ? authorReleases : {
                  ...state.authorReleases,
                  ...Object.entries(authorReleases).reduce((acc, [author, slugs]) => {
                    acc[author] = [...(state.authorReleases[author] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                currentPage: response.pagination?.page || params.page || 1,
                totalPages: response.pagination?.totalPages || 0,
                totalCount: response.pagination?.totalCount || response.data.length,
                hasNextPage: response.pagination?.hasNextPage || false,
                hasPreviousPage: response.pagination?.hasPreviousPage || false,
                isLoadingList: false,
                lastFetched: Date.now(),
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
        
        fetchPressRelease: async (slug: string, includeMedia = false) => {
          const state = get();
          
          // Check if release exists and is not stale
          const existingRelease = state.pressReleases[slug];
          if (existingRelease && !includeMedia && state.isCacheValid()) {
            return;
          }
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.getPressRelease(slug, { includeMedia });
            
            if (response.success && response.data) {
              set({
                pressReleases: { ...state.pressReleases, [slug]: response.data },
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
        
        createPressRelease: async (pressReleaseData: CreatePressReleaseRequest) => {
          set({ isLoading: true, error: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.createPressRelease(pressReleaseData);
            
            if (response.success && response.data) {
              const state = get();
              set({
                pressReleases: { ...state.pressReleases, [response.data.slug]: response.data },
                pressReleasesList: [response.data.slug, ...state.pressReleasesList],
                isLoading: false,
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
        
        updatePressRelease: async (pressReleaseData: UpdatePressReleaseRequest) => {
          const state = get();
          const slug = pressReleaseData.slug;
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.updatePressRelease(pressReleaseData);
            
            if (response.success && response.data) {
              set({
                pressReleases: { ...state.pressReleases, [slug]: response.data },
                loadingStates: { ...state.loadingStates, [slug]: false },
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
        
        deletePressRelease: async (slug: string) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.deletePressRelease(slug);
            
            if (response.success) {
              const { [slug]: removedRelease, ...remainingReleases } = state.pressReleases;
              const { [slug]: removedLoading, ...remainingLoading } = state.loadingStates;
              const { [slug]: removedError, ...remainingErrors } = state.errors;
              
              set({
                pressReleases: remainingReleases,
                pressReleasesList: state.pressReleasesList.filter(s => s !== slug),
                loadingStates: remainingLoading,
                errors: remainingErrors,
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
        
        uploadPressReleaseMedia: async (
          slug: string,
          file: File,
          mediaType: 'featured' | 'content' | 'gallery',
          onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
        ) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.pressReleases.uploadPressReleaseMedia(
              slug,
              file,
              mediaType,
              onProgress
            );
            
            if (response.success && response.data) {
              set({
                pressReleases: { ...state.pressReleases, [slug]: response.data },
                loadingStates: { ...state.loadingStates, [slug]: false },
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
        
        // Filter and search actions
        searchPressReleases: async (searchTerm: string, params = {}) => {
          return get().fetchPressReleases({ ...params, searchTerm });
        },
        
        getPressReleasesByCategory: async (category: string, params = {}) => {
          return get().fetchPressReleases({ ...params, category });
        },
        
        getPressReleasesByAuthor: async (authorSlug: string, params = {}) => {
          return get().fetchPressReleases({ ...params, authorSlug });
        },
        
        getPressReleasesByTags: async (tags: string[], params = {}) => {
          return get().fetchPressReleases({ ...params, tags });
        },
        
        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },
        
        clearErrors: () => {
          set({ error: null, errors: {} });
        },
        
        clearPressReleaseError: (slug: string) => {
          const state = get();
          const { [slug]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },
        
        setCurrentFilters: (filters: PressReleaseListParams) => {
          set({ currentFilters: filters });
        },
        
        // Selectors
        getPressRelease: (slug: string) => {
          return get().pressReleases[slug] || null;
        },
        
        getPressReleaseWithMedia: (slug: string) => {
          const release = get().pressReleases[slug];
          if (release && 'mediaItems' in release) {
            return release as PressReleaseWithMediaDTO;
          }
          return null;
        },
        
        getAllPressReleases: () => {
          const state = get();
          return state.pressReleasesList.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        getPublishedPressReleases: () => {
          const state = get();
          return state.publishedReleases.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        getDraftPressReleases: () => {
          const state = get();
          return state.draftReleases.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        getPressReleasesInCategory: (category: string) => {
          const state = get();
          const slugs = state.categorizedReleases[category] || [];
          return slugs.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        getPressReleasesByTag: (tag: string) => {
          const state = get();
          const slugs = state.taggedReleases[tag] || [];
          return slugs.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        getPressReleasesByAuthorSlug: (authorSlug: string) => {
          const state = get();
          const slugs = state.authorReleases[authorSlug] || [];
          return slugs.map(slug => state.pressReleases[slug]).filter(Boolean);
        },
        
        isPressReleaseLoading: (slug: string) => {
          return get().loadingStates[slug] || false;
        },
        
        getPressReleaseError: (slug: string) => {
          return get().errors[slug] || null;
        },
        
        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'press-releases-store',
        partialize: (state) => ({
          pressReleases: state.pressReleases,
          pressReleasesList: state.pressReleasesList,
          publishedReleases: state.publishedReleases,
          draftReleases: state.draftReleases,
          categorizedReleases: state.categorizedReleases,
          taggedReleases: state.taggedReleases,
          authorReleases: state.authorReleases,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'PressReleasesStore' }
  )
);
