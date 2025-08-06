/**
 * API Hooks
 * Custom React hooks for common API operations
 */

import { useEffect, useState, useCallback } from 'react';
import {
  useAuthors,
  useBlogPosts,
  usePortfolioPieces,
  useGitHub,
  useMedia,
  useCombinedApi,
} from '../store/store';
import { BlogPostListParams, PortfolioPieceListParams, GitHubReposListParams, MediaListParams } from '../api/types';

/**
 * Hook to fetch and manage a single author
 */
export function useAuthorData(slug: string, includeMedia = false) {
  const store = useAuthors();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const author = store.getAuthor(slug);
  const isLoading = store.isAuthorLoading(slug);
  const error = store.getAuthorError(slug);
  
  const fetchAuthor = useCallback(() => {
    return store.fetchAuthor(slug, includeMedia);
  }, [store, slug, includeMedia]);
  
  useEffect(() => {
    if (!isInitialized && slug) {
      fetchAuthor();
      setIsInitialized(true);
    }
  }, [fetchAuthor, isInitialized, slug]);
  
  return {
    author,
    isLoading,
    error,
    refetch: fetchAuthor,
    clearError: () => store.clearAuthorError(slug),
  };
}

/**
 * Hook to fetch and manage authors list
 */
export function useAuthorsData(params?: {
  page?: number;
  pageSize?: number;
  includeMedia?: boolean;
  sortBy?: 'displayName' | 'firstName' | 'lastName' | 'authorSlug';
  sortOrder?: 'asc' | 'desc';
  autoFetch?: boolean;
}) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = useAuthors();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const authors = store.getAllAuthors();
  const isLoading = store.isLoadingList;
  const error = store.error;
  const pagination = {
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    totalCount: store.totalCount,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
  };
  
  const fetchAuthors = useCallback(() => {
    return store.fetchAuthors(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchAuthors();
      setIsInitialized(true);
    }
  }, [fetchAuthors, isInitialized, autoFetch]);
  
  return {
    authors,
    isLoading,
    error,
    pagination,
    refetch: fetchAuthors,
    clearErrors: store.clearErrors,
  };
}

/**
 * Hook to fetch and manage a single blog post
 */
export function useBlogPostData(slug: string, includeMedia = false) {
  const store = useBlogPosts();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const blogPost = store.getBlogPost(slug);
  const isLoading = store.isBlogPostLoading(slug);
  const error = store.getBlogPostError(slug);
  
  const fetchBlogPost = useCallback(() => {
    return store.fetchBlogPost(slug, includeMedia);
  }, [store, slug, includeMedia]);
  
  useEffect(() => {
    if (!isInitialized && slug) {
      fetchBlogPost();
      setIsInitialized(true);
    }
  }, [fetchBlogPost, isInitialized, slug]);
  
  return {
    blogPost,
    isLoading,
    error,
    refetch: fetchBlogPost,
    clearError: () => store.clearBlogPostError(slug),
  };
}

/**
 * Hook to fetch and manage blog posts list
 */
export function useBlogPostsData(params?: BlogPostListParams & { autoFetch?: boolean }) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = useBlogPosts();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const blogPosts = store.getAllBlogPosts();
  const publishedPosts = store.getPublishedBlogPosts();
  const draftPosts = store.getDraftBlogPosts();
  const isLoading = store.isLoadingList;
  const error = store.error;
  const pagination = {
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    totalCount: store.totalCount,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
  };
  
  const fetchBlogPosts = useCallback(() => {
    return store.fetchBlogPosts(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchBlogPosts();
      setIsInitialized(true);
    }
  }, [fetchBlogPosts, isInitialized, autoFetch]);
  
  return {
    blogPosts,
    publishedPosts,
    draftPosts,
    isLoading,
    error,
    pagination,
    refetch: fetchBlogPosts,
    clearErrors: store.clearErrors,
    searchBlogPosts: store.searchBlogPosts,
    getBlogPostsByCategory: store.getBlogPostsByCategory,
    getBlogPostsByAuthor: store.getBlogPostsByAuthor,
  };
}

/**
 * Hook to fetch and manage portfolio pieces list
 */
export function usePortfolioPiecesData(params?: PortfolioPieceListParams & { autoFetch?: boolean }) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = usePortfolioPieces();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const portfolioPieces = store.getAllPortfolioPieces();
  const publishedPieces = store.getPublishedPortfolioPieces();
  const draftPieces = store.getDraftPortfolioPieces();
  const isLoading = store.isLoadingList;
  const error = store.error;
  const pagination = {
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    totalCount: store.totalCount,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
  };
  
  const fetchPortfolioPieces = useCallback(() => {
    return store.fetchPortfolioPieces(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchPortfolioPieces();
      setIsInitialized(true);
    }
  }, [fetchPortfolioPieces, isInitialized, autoFetch]);
  
  return {
    portfolioPieces,
    publishedPieces,
    draftPieces,
    isLoading,
    error,
    pagination,
    refetch: fetchPortfolioPieces,
    clearErrors: store.clearErrors,
    searchPortfolioPieces: store.searchPortfolioPieces,
    getPortfolioPiecesByCategory: store.getPortfolioPiecesByCategory,
  };
}

/**
 * Hook to fetch and manage GitHub repositories
 */
export function useGitHubRepositoriesData(params?: GitHubReposListParams & { autoFetch?: boolean }) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = useGitHub();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const repositories = store.getAllRepositories();
  const publicRepos = store.getPublicRepositories();
  const originalRepos = store.getOriginalRepositories();
  const activeRepos = store.getActiveRepositories();
  const isLoading = store.isLoadingList;
  const error = store.error;
  const pagination = {
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    totalCount: store.totalCount,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
  };
  
  const fetchRepositories = useCallback(() => {
    return store.fetchRepositories(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchRepositories();
      setIsInitialized(true);
    }
  }, [fetchRepositories, isInitialized, autoFetch]);
  
  return {
    repositories,
    publicRepos,
    originalRepos,
    activeRepos,
    isLoading,
    error,
    pagination,
    refetch: fetchRepositories,
    clearErrors: store.clearErrors,
    searchRepositories: store.searchRepositories,
    getAllLanguages: store.getAllLanguages,
    getAllTopics: store.getAllTopics,
  };
}

/**
 * Hook to fetch and manage GitHub activity
 */
export function useGitHubActivityData(params?: { year?: number; username?: string; autoFetch?: boolean }) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = useGitHub();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const activityGrid = store.getActivityGrid();
  const totalContributions = store.getTotalContributions();
  const isLoading = store.isLoadingActivity;
  const error = store.activityError;
  
  const fetchActivity = useCallback(() => {
    return store.fetchActivityGrid(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchActivity();
      setIsInitialized(true);
    }
  }, [fetchActivity, isInitialized, autoFetch]);
  
  return {
    activityGrid,
    totalContributions,
    isLoading,
    error,
    refetch: fetchActivity,
    clearErrors: store.clearErrors,
  };
}

/**
 * Hook to fetch and manage media items
 */
export function useMediaData(params?: MediaListParams & { autoFetch?: boolean }) {
  const { autoFetch = true, ...fetchParams } = params || {};
  const store = useMedia();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const mediaItems = store.getAllMediaItems();
  const imageItems = store.getImageItems();
  const videoItems = store.getVideoItems();
  const audioItems = store.getAudioItems();
  const isLoading = store.isLoadingList;
  const error = store.error;
  const pagination = {
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    totalCount: store.totalCount,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
  };
  
  const fetchMediaList = useCallback(() => {
    return store.fetchMediaList(fetchParams);
  }, [store, fetchParams]);
  
  useEffect(() => {
    if (autoFetch && !isInitialized) {
      fetchMediaList();
      setIsInitialized(true);
    }
  }, [fetchMediaList, isInitialized, autoFetch]);
  
  return {
    mediaItems,
    imageItems,
    videoItems,
    audioItems,
    isLoading,
    error,
    pagination,
    refetch: fetchMediaList,
    clearErrors: store.clearErrors,
    uploadMedia: store.uploadMedia,
    deleteMedia: store.deleteMedia,
  };
}

/**
 * Hook for global API state management
 */
export function useGlobalApiState() {
  const store = useCombinedApi();
  
  const isLoading = store.getGlobalLoadingState();
  const error = store.getGlobalErrorState();
  const lastSync = store.lastGlobalSync;
  
  return {
    isLoading,
    error,
    lastSync,
    syncAllData: store.syncAllData,
    clearAllErrors: store.clearAllErrors,
    invalidateAllCaches: store.invalidateAllCaches,
    performHealthCheck: store.performHealthCheck,
  };
}

/**
 * Hook for uploading media with progress tracking
 */
export function useMediaUpload() {
  const store = useMedia();
  const [uploadKey, setUploadKey] = useState<string | null>(null);
  
  const isUploading = uploadKey ? store.isUploading(uploadKey) : false;
  const progress = uploadKey ? store.getUploadProgress(uploadKey) : null;
  const error = uploadKey ? store.getUploadError(uploadKey) : null;
  
  const uploadMedia = useCallback(async (
    uploadRequest: Parameters<typeof store.uploadMedia>[0],
    onProgress?: Parameters<typeof store.uploadMedia>[1]
  ) => {
    const key = `${uploadRequest.authorId}-${Date.now()}`;
    setUploadKey(key);
    
    try {
      const result = await store.uploadMedia(uploadRequest, onProgress);
      return result;
    } finally {
      // Clear upload key after a delay to show completion
      setTimeout(() => setUploadKey(null), 2000);
    }
  }, [store]);
  
  const clearError = useCallback(() => {
    if (uploadKey) {
      store.clearUploadError(uploadKey);
    }
  }, [store, uploadKey]);
  
  return {
    uploadMedia,
    isUploading,
    progress,
    error,
    clearError,
  };
}