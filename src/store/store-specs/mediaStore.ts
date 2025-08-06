/**
 * Media Store
 * Zustand store for managing media data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  MediaItemDTO,
  MediaUploadRequest,
  MediaUploadResponse,
  MediaListParams,
  MediaMetadataUpdateRequest,
  BulkMediaRequest,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface MediaState {
  // Data
  mediaItems: Record<string, MediaItemDTO>; // id -> media item
  mediaItemsList: string[]; // Array of media IDs for ordering
  
  // Filtered lists for different views
  mediaByType: Record<'image' | 'video' | 'audio' | 'document', string[]>;
  mediaByPurpose: Record<'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail', string[]>;
  mediaByAuthor: Record<string, string[]>; // authorId -> media IDs
  mediaByContent: Record<string, string[]>; // contentId -> media IDs
  
  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  uploadingStates: Record<string, boolean>; // Per-upload loading states
  loadingStates: Record<string, boolean>; // Per-media loading states
  
  // Error states
  error: string | null;
  uploadErrors: Record<string, string>; // Per-upload errors
  errors: Record<string, string>; // Per-media errors
  
  // Upload progress tracking
  uploadProgress: Record<string, { loaded: number; total: number; percentage: number }>;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Filters and search
  currentFilters: MediaListParams;
  
  // Cache management
  lastFetched: number | null;
  cacheExpiry: number;
  
  // Actions
  fetchMediaList: (params?: MediaListParams) => Promise<void>;
  
  fetchMedia: (id: string) => Promise<void>;
  
  uploadMedia: (
    uploadRequest: MediaUploadRequest,
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
  ) => Promise<MediaItemDTO | null>;
  
  updateMediaMetadata: (updateRequest: MediaMetadataUpdateRequest) => Promise<MediaItemDTO | null>;
  
  deleteMedia: (id: string) => Promise<boolean>;
  
  bulkMediaOperation: (bulkRequest: BulkMediaRequest) => Promise<boolean>;
  
  // Filter actions
  fetchMediaByAuthor: (authorId: string, params?: Omit<MediaListParams, 'authorId'>) => Promise<void>;
  
  fetchMediaByType: (
    mediaType: 'image' | 'video' | 'audio' | 'document', 
    params?: Omit<MediaListParams, 'mediaType'>
  ) => Promise<void>;
  
  fetchMediaByPurpose: (
    purpose: 'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail',
    params?: Omit<MediaListParams, 'purpose'>
  ) => Promise<void>;
  
  fetchMediaForContent: (
    contentId: string,
    relatedContentType?: string,
    params?: Omit<MediaListParams, 'contentId' | 'relatedContentType'>
  ) => Promise<void>;
  
  // Cache and state management
  invalidateCache: () => void;
  clearErrors: () => void;
  clearMediaError: (id: string) => void;
  clearUploadError: (uploadKey: string) => void;
  setCurrentFilters: (filters: MediaListParams) => void;
  
  // Selectors
  getMediaItem: (id: string) => MediaItemDTO | null;
  getAllMediaItems: () => MediaItemDTO[];
  getMediaByType: (mediaType: 'image' | 'video' | 'audio' | 'document') => MediaItemDTO[];
  getMediaByPurpose: (purpose: 'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail') => MediaItemDTO[];
  getMediaByAuthor: (authorId: string) => MediaItemDTO[];
  getMediaForContent: (contentId: string) => MediaItemDTO[];
  getImageItems: () => MediaItemDTO[];
  getVideoItems: () => MediaItemDTO[];
  getAudioItems: () => MediaItemDTO[];
  getDocumentItems: () => MediaItemDTO[];
  getProfileImages: () => MediaItemDTO[];
  getFeaturedImages: () => MediaItemDTO[];
  getGalleryImages: () => MediaItemDTO[];
  isMediaLoading: (id: string) => boolean;
  isUploading: (uploadKey: string) => boolean;
  getUploadProgress: (uploadKey: string) => { loaded: number; total: number; percentage: number } | null;
  getMediaError: (id: string) => string | null;
  getUploadError: (uploadKey: string) => string | null;
  isCacheValid: () => boolean;
}

export const useMediaStore = create<MediaState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        mediaItems: {},
        mediaItemsList: [],
        mediaByType: {
          image: [],
          video: [],
          audio: [],
          document: [],
        },
        mediaByPurpose: {
          profile: [],
          cover: [],
          gallery: [],
          featured: [],
          content: [],
          thumbnail: [],
        },
        mediaByAuthor: {},
        mediaByContent: {},
        isLoading: false,
        isLoadingList: false,
        uploadingStates: {},
        loadingStates: {},
        error: null,
        uploadErrors: {},
        errors: {},
        uploadProgress: {},
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        currentFilters: {},
        lastFetched: null,
        cacheExpiry: 5 * 60 * 1000, // 5 minutes
        
        // Actions
        fetchMediaList: async (params = {}) => {
          const state = get();
          
          // Check cache validity for list requests
          if (params.page === 1 && state.isCacheValid() && state.mediaItemsList.length > 0) {
            return;
          }
          
          set({ isLoadingList: true, error: null, currentFilters: params });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.getMediaList(params);
            
            if (response.success && response.data) {
              const mediaItemsMap: Record<string, MediaItemDTO> = {};
              const mediaItemsList: string[] = [];
              const mediaByType: Record<'image' | 'video' | 'audio' | 'document', string[]> = {
                image: [],
                video: [],
                audio: [],
                document: [],
              };
              const mediaByPurpose: Record<'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail', string[]> = {
                profile: [],
                cover: [],
                gallery: [],
                featured: [],
                content: [],
                thumbnail: [],
              };
              const mediaByAuthor: Record<string, string[]> = {};
              const mediaByContent: Record<string, string[]> = {};
              
              response.data.forEach((media) => {
                mediaItemsMap[media.id] = media;
                mediaItemsList.push(media.id);
                
                // Categorize by type
                if (mediaByType[media.mediaType]) {
                  mediaByType[media.mediaType].push(media.id);
                }
                
                // Note: MediaItemDTO doesn't have purpose, so we'll need to extend the type or handle this differently
                // For now, we'll skip purpose categorization in the basic DTO
                
                // Categorize by author (need to add authorId to MediaItemDTO or handle differently)
                // For now, skipping author categorization
                
                // Categorize by content (need to add contentId to MediaItemDTO)
                // For now, skipping content categorization
              });
              
              set({
                mediaItems: params.page === 1 ? mediaItemsMap : { ...state.mediaItems, ...mediaItemsMap },
                mediaItemsList: params.page === 1 ? mediaItemsList : [...state.mediaItemsList, ...mediaItemsList],
                mediaByType: params.page === 1 ? mediaByType : {
                  image: [...state.mediaByType.image, ...mediaByType.image],
                  video: [...state.mediaByType.video, ...mediaByType.video],
                  audio: [...state.mediaByType.audio, ...mediaByType.audio],
                  document: [...state.mediaByType.document, ...mediaByType.document],
                },
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
        
        fetchMedia: async (id: string) => {
          const state = get();
          
          // Check if media exists and is not stale
          const existingMedia = state.mediaItems[id];
          if (existingMedia && state.isCacheValid()) {
            return;
          }
          
          set({
            loadingStates: { ...state.loadingStates, [id]: true },
            errors: { ...state.errors, [id]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.getMedia(id);
            
            if (response.success && response.data) {
              set({
                mediaItems: { ...state.mediaItems, [id]: response.data },
                loadingStates: { ...state.loadingStates, [id]: false },
                lastFetched: Date.now(),
              });
            }
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [id]: false },
              errors: { ...state.errors, [id]: formatApiError(error) },
            });
          }
        },
        
        uploadMedia: async (uploadRequest: MediaUploadRequest, onProgress) => {
          const uploadKey = `${uploadRequest.authorId}-${Date.now()}`;
          const state = get();
          
          set({
            uploadingStates: { ...state.uploadingStates, [uploadKey]: true },
            uploadErrors: { ...state.uploadErrors, [uploadKey]: '' },
            uploadProgress: { ...state.uploadProgress, [uploadKey]: { loaded: 0, total: 0, percentage: 0 } },
          });
          
          const progressHandler = (progress: { loaded: number; total: number; percentage: number }) => {
            set({
              uploadProgress: { ...get().uploadProgress, [uploadKey]: progress },
            });
            onProgress?.(progress);
          };
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.uploadMedia(uploadRequest, progressHandler);
            
            if (response.success && response.data) {
              const mediaItem = response.data.mediaItem;
              const currentState = get();
              
              set({
                mediaItems: { ...currentState.mediaItems, [mediaItem.id]: mediaItem },
                mediaItemsList: [mediaItem.id, ...currentState.mediaItemsList],
                uploadingStates: { ...currentState.uploadingStates, [uploadKey]: false },
                lastFetched: Date.now(),
              });
              
              // Clean up progress tracking after a delay
              setTimeout(() => {
                const state = get();
                const { [uploadKey]: removedProgress, ...remainingProgress } = state.uploadProgress;
                set({ uploadProgress: remainingProgress });
              }, 3000);
              
              return mediaItem;
            }
            
            set({
              uploadingStates: { ...get().uploadingStates, [uploadKey]: false },
            });
            return null;
          } catch (error) {
            set({
              uploadingStates: { ...get().uploadingStates, [uploadKey]: false },
              uploadErrors: { ...get().uploadErrors, [uploadKey]: formatApiError(error) },
            });
            return null;
          }
        },
        
        updateMediaMetadata: async (updateRequest: MediaMetadataUpdateRequest) => {
          const state = get();
          const { id } = updateRequest;
          
          set({
            loadingStates: { ...state.loadingStates, [id]: true },
            errors: { ...state.errors, [id]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.updateMediaMetadata(updateRequest);
            
            if (response.success && response.data) {
              set({
                mediaItems: { ...state.mediaItems, [id]: response.data },
                loadingStates: { ...state.loadingStates, [id]: false },
                lastFetched: Date.now(),
              });
              return response.data;
            }
            
            set({
              loadingStates: { ...state.loadingStates, [id]: false },
            });
            return null;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [id]: false },
              errors: { ...state.errors, [id]: formatApiError(error) },
            });
            return null;
          }
        },
        
        deleteMedia: async (id: string) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [id]: true },
            errors: { ...state.errors, [id]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.deleteMedia(id);
            
            if (response.success) {
              const { [id]: removedMedia, ...remainingMedia } = state.mediaItems;
              const { [id]: removedLoading, ...remainingLoading } = state.loadingStates;
              const { [id]: removedError, ...remainingErrors } = state.errors;
              
              set({
                mediaItems: remainingMedia,
                mediaItemsList: state.mediaItemsList.filter(mediaId => mediaId !== id),
                loadingStates: remainingLoading,
                errors: remainingErrors,
                lastFetched: Date.now(),
              });
              
              return true;
            }
            
            set({
              loadingStates: { ...state.loadingStates, [id]: false },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: { ...state.loadingStates, [id]: false },
              errors: { ...state.errors, [id]: formatApiError(error) },
            });
            return false;
          }
        },
        
        bulkMediaOperation: async (bulkRequest: BulkMediaRequest) => {
          const state = get();
          const loadingKey = 'bulk-operation';
          
          set({
            loadingStates: { ...state.loadingStates, [loadingKey]: true },
            error: null,
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.media.bulkMediaOperation(bulkRequest);
            
            if (response.success) {
              // Handle different bulk operations
              if (bulkRequest.operation === 'delete') {
                const remainingMedia = Object.fromEntries(
                  Object.entries(state.mediaItems).filter(([id]) => !bulkRequest.mediaIds.includes(id))
                );
                const remainingList = state.mediaItemsList.filter(id => !bulkRequest.mediaIds.includes(id));
                
                set({
                  mediaItems: remainingMedia,
                  mediaItemsList: remainingList,
                  lastFetched: Date.now(),
                });
              }
              
              set({
                loadingStates: { ...get().loadingStates, [loadingKey]: false },
              });
              
              // Invalidate cache to force refresh
              get().invalidateCache();
              
              return true;
            }
            
            set({
              loadingStates: { ...get().loadingStates, [loadingKey]: false },
            });
            return false;
          } catch (error) {
            set({
              loadingStates: { ...get().loadingStates, [loadingKey]: false },
              error: formatApiError(error),
            });
            return false;
          }
        },
        
        // Filter actions
        fetchMediaByAuthor: async (authorId: string, params = {}) => {
          return get().fetchMediaList({ ...params, authorId });
        },
        
        fetchMediaByType: async (mediaType: 'image' | 'video' | 'audio' | 'document', params = {}) => {
          return get().fetchMediaList({ ...params, mediaType });
        },
        
        fetchMediaByPurpose: async (purpose: 'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail', params = {}) => {
          return get().fetchMediaList({ ...params, purpose });
        },
        
        fetchMediaForContent: async (contentId: string, relatedContentType?: string, params = {}) => {
          return get().fetchMediaList({ ...params, contentId, relatedContentType });
        },
        
        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },
        
        clearErrors: () => {
          set({ error: null, errors: {}, uploadErrors: {} });
        },
        
        clearMediaError: (id: string) => {
          const state = get();
          const { [id]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },
        
        clearUploadError: (uploadKey: string) => {
          const state = get();
          const { [uploadKey]: removedError, ...remainingErrors } = state.uploadErrors;
          set({ uploadErrors: remainingErrors });
        },
        
        setCurrentFilters: (filters: MediaListParams) => {
          set({ currentFilters: filters });
        },
        
        // Selectors
        getMediaItem: (id: string) => {
          return get().mediaItems[id] || null;
        },
        
        getAllMediaItems: () => {
          const state = get();
          return state.mediaItemsList.map(id => state.mediaItems[id]).filter(Boolean);
        },
        
        getMediaByType: (mediaType: 'image' | 'video' | 'audio' | 'document') => {
          const state = get();
          const ids = state.mediaByType[mediaType] || [];
          return ids.map(id => state.mediaItems[id]).filter(Boolean);
        },
        
        getMediaByPurpose: (purpose: 'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail') => {
          const state = get();
          const ids = state.mediaByPurpose[purpose] || [];
          return ids.map(id => state.mediaItems[id]).filter(Boolean);
        },
        
        getMediaByAuthor: (authorId: string) => {
          const state = get();
          const ids = state.mediaByAuthor[authorId] || [];
          return ids.map(id => state.mediaItems[id]).filter(Boolean);
        },
        
        getMediaForContent: (contentId: string) => {
          const state = get();
          const ids = state.mediaByContent[contentId] || [];
          return ids.map(id => state.mediaItems[id]).filter(Boolean);
        },
        
        getImageItems: () => {
          return get().getMediaByType('image');
        },
        
        getVideoItems: () => {
          return get().getMediaByType('video');
        },
        
        getAudioItems: () => {
          return get().getMediaByType('audio');
        },
        
        getDocumentItems: () => {
          return get().getMediaByType('document');
        },
        
        getProfileImages: () => {
          return get().getMediaByPurpose('profile');
        },
        
        getFeaturedImages: () => {
          return get().getMediaByPurpose('featured');
        },
        
        getGalleryImages: () => {
          return get().getMediaByPurpose('gallery');
        },
        
        isMediaLoading: (id: string) => {
          return get().loadingStates[id] || false;
        },
        
        isUploading: (uploadKey: string) => {
          return get().uploadingStates[uploadKey] || false;
        },
        
        getUploadProgress: (uploadKey: string) => {
          return get().uploadProgress[uploadKey] || null;
        },
        
        getMediaError: (id: string) => {
          return get().errors[id] || null;
        },
        
        getUploadError: (uploadKey: string) => {
          return get().uploadErrors[uploadKey] || null;
        },
        
        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'media-store',
        partialize: (state) => ({
          mediaItems: state.mediaItems,
          mediaItemsList: state.mediaItemsList,
          mediaByType: state.mediaByType,
          mediaByPurpose: state.mediaByPurpose,
          mediaByAuthor: state.mediaByAuthor,
          mediaByContent: state.mediaByContent,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'MediaStore' }
  )
);