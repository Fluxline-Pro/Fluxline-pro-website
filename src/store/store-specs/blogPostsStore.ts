/**
 * BlogPosts Store
 * Zustand store for managing blog post data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  BlogPostDTO,
  BlogPostWithMediaDTO,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  BlogPostListParams,
} from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface BlogPostsState {
  // Data
  blogPosts: Record<string, BlogPostDTO | BlogPostWithMediaDTO>;
  blogPostsList: string[]; // Array of blog post slugs for ordering
  
  // Filtered lists for different views
  publishedPosts: string[];
  draftPosts: string[];
  categorizedPosts: Record<string, string[]>; // category -> slugs
  taggedPosts: Record<string, string[]>; // tag -> slugs
  authorPosts: Record<string, string[]>; // authorSlug -> slugs
  
  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  loadingStates: Record<string, boolean>; // Per-post loading states
  
  // Error states
  error: string | null;
  errors: Record<string, string>; // Per-post errors
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Filters and search
  currentFilters: BlogPostListParams;
  searchResults: string[]; // Slugs of search results
  
  // Cache management
  lastFetched: number | null;
  cacheExpiry: number;
  
  // Actions
  fetchBlogPosts: (params?: BlogPostListParams) => Promise<void>;
  
  fetchBlogPost: (slug: string, includeMedia?: boolean) => Promise<void>;
  
  createBlogPost: (blogPostData: CreateBlogPostRequest) => Promise<BlogPostDTO | null>;
  
  updateBlogPost: (blogPostData: UpdateBlogPostRequest) => Promise<BlogPostDTO | null>;
  
  deleteBlogPost: (slug: string) => Promise<boolean>;
  
  uploadBlogPostMedia: (
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery',
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
  ) => Promise<boolean>;
  
  // Filter and search actions
  searchBlogPosts: (searchTerm: string, params?: Omit<BlogPostListParams, 'searchTerm'>) => Promise<void>;
  
  getBlogPostsByCategory: (category: string, params?: Omit<BlogPostListParams, 'category'>) => Promise<void>;
  
  getBlogPostsByAuthor: (authorSlug: string, params?: Omit<BlogPostListParams, 'authorSlug'>) => Promise<void>;
  
  getBlogPostsByTags: (tags: string[], params?: Omit<BlogPostListParams, 'tags'>) => Promise<void>;
  
  // Cache and state management
  invalidateCache: () => void;
  clearErrors: () => void;
  clearBlogPostError: (slug: string) => void;
  setCurrentFilters: (filters: BlogPostListParams) => void;
  
  // Selectors
  getBlogPost: (slug: string) => BlogPostDTO | BlogPostWithMediaDTO | null;
  getBlogPostWithMedia: (slug: string) => BlogPostWithMediaDTO | null;
  getAllBlogPosts: () => (BlogPostDTO | BlogPostWithMediaDTO)[];
  getPublishedBlogPosts: () => (BlogPostDTO | BlogPostWithMediaDTO)[];
  getDraftBlogPosts: () => (BlogPostDTO | BlogPostWithMediaDTO)[];
  getBlogPostsInCategory: (category: string) => (BlogPostDTO | BlogPostWithMediaDTO)[];
  getBlogPostsByTag: (tag: string) => (BlogPostDTO | BlogPostWithMediaDTO)[];
  getBlogPostsByAuthorSlug: (authorSlug: string) => (BlogPostDTO | BlogPostWithMediaDTO)[];
  isBlogPostLoading: (slug: string) => boolean;
  getBlogPostError: (slug: string) => string | null;
  isCacheValid: () => boolean;
}

export const useBlogPostsStore = create<BlogPostsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        blogPosts: {},
        blogPostsList: [],
        publishedPosts: [],
        draftPosts: [],
        categorizedPosts: {},
        taggedPosts: {},
        authorPosts: {},
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
        fetchBlogPosts: async (params = {}) => {
          const state = get();
          
          // Check cache validity for list requests
          if (params.page === 1 && state.isCacheValid() && state.blogPostsList.length > 0 && !params.searchTerm) {
            return;
          }
          
          set({ isLoadingList: true, error: null, currentFilters: params });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.getBlogPosts(params);
            
            if (response.success && response.data) {
              const blogPostsMap: Record<string, BlogPostDTO | BlogPostWithMediaDTO> = {};
              const blogPostsList: string[] = [];
              const publishedPosts: string[] = [];
              const draftPosts: string[] = [];
              const categorizedPosts: Record<string, string[]> = {};
              const taggedPosts: Record<string, string[]> = {};
              const authorPosts: Record<string, string[]> = {};
              
              response.data.forEach((post) => {
                blogPostsMap[post.slug] = post;
                blogPostsList.push(post.slug);
                
                // Categorize by status
                if (post.status === 'Published') {
                  publishedPosts.push(post.slug);
                } else if (post.status === 'Draft') {
                  draftPosts.push(post.slug);
                }
                
                // Categorize by category
                if (!categorizedPosts[post.category]) {
                  categorizedPosts[post.category] = [];
                }
                categorizedPosts[post.category].push(post.slug);
                
                // Categorize by tags
                post.tagsList.forEach(tag => {
                  if (!taggedPosts[tag]) {
                    taggedPosts[tag] = [];
                  }
                  taggedPosts[tag].push(post.slug);
                });
                
                // Categorize by author
                if (!authorPosts[post.authorSlug]) {
                  authorPosts[post.authorSlug] = [];
                }
                authorPosts[post.authorSlug].push(post.slug);
              });
              
              const newState = {
                blogPosts: params.page === 1 ? blogPostsMap : { ...state.blogPosts, ...blogPostsMap },
                blogPostsList: params.page === 1 ? blogPostsList : [...state.blogPostsList, ...blogPostsList],
                publishedPosts: params.page === 1 ? publishedPosts : [...state.publishedPosts, ...publishedPosts],
                draftPosts: params.page === 1 ? draftPosts : [...state.draftPosts, ...draftPosts],
                categorizedPosts: params.page === 1 ? categorizedPosts : {
                  ...state.categorizedPosts,
                  ...Object.entries(categorizedPosts).reduce((acc, [category, slugs]) => {
                    acc[category] = [...(state.categorizedPosts[category] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                taggedPosts: params.page === 1 ? taggedPosts : {
                  ...state.taggedPosts,
                  ...Object.entries(taggedPosts).reduce((acc, [tag, slugs]) => {
                    acc[tag] = [...(state.taggedPosts[tag] || []), ...slugs];
                    return acc;
                  }, {} as Record<string, string[]>)
                },
                authorPosts: params.page === 1 ? authorPosts : {
                  ...state.authorPosts,
                  ...Object.entries(authorPosts).reduce((acc, [author, slugs]) => {
                    acc[author] = [...(state.authorPosts[author] || []), ...slugs];
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
                searchResults: params.searchTerm ? blogPostsList : state.searchResults,
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
        
        fetchBlogPost: async (slug: string, includeMedia = false) => {
          const state = get();
          
          // Check if post exists and is not stale
          const existingPost = state.blogPosts[slug];
          if (existingPost && !includeMedia && state.isCacheValid()) {
            return;
          }
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.getBlogPost(slug, { includeMedia });
            
            if (response.success && response.data) {
              set({
                blogPosts: { ...state.blogPosts, [slug]: response.data },
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
        
        createBlogPost: async (blogPostData: CreateBlogPostRequest) => {
          set({ isLoading: true, error: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.createBlogPost(blogPostData);
            
            if (response.success && response.data) {
              const state = get();
              set({
                blogPosts: { ...state.blogPosts, [response.data.slug]: response.data },
                blogPostsList: [response.data.slug, ...state.blogPostsList],
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
        
        updateBlogPost: async (blogPostData: UpdateBlogPostRequest) => {
          const state = get();
          const { slug } = blogPostData;
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.updateBlogPost(blogPostData);
            
            if (response.success && response.data) {
              set({
                blogPosts: { ...state.blogPosts, [slug]: response.data },
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
        
        deleteBlogPost: async (slug: string) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [slug]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.deleteBlogPost(slug);
            
            if (response.success) {
              const { [slug]: removedPost, ...remainingPosts } = state.blogPosts;
              const { [slug]: removedLoading, ...remainingLoading } = state.loadingStates;
              const { [slug]: removedError, ...remainingErrors } = state.errors;
              
              set({
                blogPosts: remainingPosts,
                blogPostsList: state.blogPostsList.filter(s => s !== slug),
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
        
        uploadBlogPostMedia: async (slug: string, file: File, mediaType: 'featured' | 'content' | 'gallery', onProgress) => {
          const state = get();
          
          set({
            loadingStates: { ...state.loadingStates, [`${slug}-upload`]: true },
            errors: { ...state.errors, [slug]: '' },
          });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.blogPosts.uploadBlogPostMedia(slug, file, mediaType, onProgress);
            
            if (response.success && response.data) {
              set({
                blogPosts: { ...state.blogPosts, [slug]: response.data },
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
        searchBlogPosts: async (searchTerm: string, params = {}) => {
          return get().fetchBlogPosts({ ...params, searchTerm });
        },
        
        getBlogPostsByCategory: async (category: string, params = {}) => {
          return get().fetchBlogPosts({ ...params, category });
        },
        
        getBlogPostsByAuthor: async (authorSlug: string, params = {}) => {
          return get().fetchBlogPosts({ ...params, authorSlug });
        },
        
        getBlogPostsByTags: async (tags: string[], params = {}) => {
          return get().fetchBlogPosts({ ...params, tags });
        },
        
        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },
        
        clearErrors: () => {
          set({ error: null, errors: {} });
        },
        
        clearBlogPostError: (slug: string) => {
          const state = get();
          const { [slug]: removedError, ...remainingErrors } = state.errors;
          set({ errors: remainingErrors });
        },
        
        setCurrentFilters: (filters: BlogPostListParams) => {
          set({ currentFilters: filters });
        },
        
        // Selectors
        getBlogPost: (slug: string) => {
          return get().blogPosts[slug] || null;
        },
        
        getBlogPostWithMedia: (slug: string) => {
          const post = get().blogPosts[slug];
          return (post && 'mediaItems' in post) ? post as BlogPostWithMediaDTO : null;
        },
        
        getAllBlogPosts: () => {
          const state = get();
          return state.blogPostsList.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        getPublishedBlogPosts: () => {
          const state = get();
          return state.publishedPosts.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        getDraftBlogPosts: () => {
          const state = get();
          return state.draftPosts.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        getBlogPostsInCategory: (category: string) => {
          const state = get();
          const slugs = state.categorizedPosts[category] || [];
          return slugs.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        getBlogPostsByTag: (tag: string) => {
          const state = get();
          const slugs = state.taggedPosts[tag] || [];
          return slugs.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        getBlogPostsByAuthorSlug: (authorSlug: string) => {
          const state = get();
          const slugs = state.authorPosts[authorSlug] || [];
          return slugs.map(slug => state.blogPosts[slug]).filter(Boolean);
        },
        
        isBlogPostLoading: (slug: string) => {
          return get().loadingStates[slug] || false;
        },
        
        getBlogPostError: (slug: string) => {
          return get().errors[slug] || null;
        },
        
        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'blog-posts-store',
        partialize: (state) => ({
          blogPosts: state.blogPosts,
          blogPostsList: state.blogPostsList,
          publishedPosts: state.publishedPosts,
          draftPosts: state.draftPosts,
          categorizedPosts: state.categorizedPosts,
          taggedPosts: state.taggedPosts,
          authorPosts: state.authorPosts,
          lastFetched: state.lastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'BlogPostsStore' }
  )
);