/**
 * GitHub Store
 * Zustand store for managing GitHub data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GitHubRepository, GitHubActivityGrid, GitHubReposListParams } from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface GitHubState {
  // Data
  repositories: Record<string, GitHubRepository>; // id -> repository
  repositoriesList: number[]; // Array of repository IDs for ordering
  activityGrid: GitHubActivityGrid | null;
  
  // Filtered lists for different views
  languageRepos: Record<string, number[]>; // language -> repo IDs
  topicRepos: Record<string, number[]>; // topic -> repo IDs
  publicRepos: number[];
  privateRepos: number[];
  originalRepos: number[]; // Non-fork repos
  forkRepos: number[];
  activeRepos: number[]; // Non-archived repos
  archivedRepos: number[];
  
  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;
  isLoadingActivity: boolean;
  loadingStates: Record<string, boolean>; // Per-operation loading states
  
  // Error states
  error: string | null;
  activityError: string | null;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Filters and search
  currentFilters: GitHubReposListParams;
  searchResults: number[]; // Repository IDs of search results
  
  // Cache management
  lastFetched: number | null;
  activityLastFetched: number | null;
  cacheExpiry: number;
  
  // Actions
  fetchRepositories: (params?: GitHubReposListParams) => Promise<void>;
  
  fetchRepositoriesTable: (params?: GitHubReposListParams) => Promise<void>;
  
  fetchActivityGrid: (params?: { year?: number; username?: string }) => Promise<void>;
  
  // Filter and search actions
  fetchReposByLanguage: (language: string, params?: Omit<GitHubReposListParams, 'language'>) => Promise<void>;
  
  fetchReposByTopic: (topic: string, params?: Omit<GitHubReposListParams, 'topic'>) => Promise<void>;
  
  fetchPublicRepos: (params?: Omit<GitHubReposListParams, 'type'>) => Promise<void>;
  
  fetchPopularRepos: (params?: Omit<GitHubReposListParams, 'sort' | 'direction'>) => Promise<void>;
  
  fetchRecentlyUpdatedRepos: (params?: Omit<GitHubReposListParams, 'sort' | 'direction'>) => Promise<void>;
  
  fetchOriginalRepos: (params?: Omit<GitHubReposListParams, 'includeForks'>) => Promise<void>;
  
  fetchActiveRepos: (params?: Omit<GitHubReposListParams, 'includeArchived'>) => Promise<void>;
  
  searchRepositories: (query: string, params?: GitHubReposListParams) => Promise<void>;
  
  // Activity actions
  fetchActivityForYear: (year: number, username?: string) => Promise<void>;
  
  fetchCurrentYearActivity: (username?: string) => Promise<void>;
  
  // Cache and state management
  invalidateCache: () => void;
  invalidateActivityCache: () => void;
  clearErrors: () => void;
  setCurrentFilters: (filters: GitHubReposListParams) => void;
  
  // Selectors
  getRepository: (id: number) => GitHubRepository | null;
  getAllRepositories: () => GitHubRepository[];
  getPublicRepositories: () => GitHubRepository[];
  getPrivateRepositories: () => GitHubRepository[];
  getOriginalRepositories: () => GitHubRepository[];
  getForkRepositories: () => GitHubRepository[];
  getActiveRepositories: () => GitHubRepository[];
  getArchivedRepositories: () => GitHubRepository[];
  getRepositoriesByLanguage: (language: string) => GitHubRepository[];
  getRepositoriesByTopic: (topic: string) => GitHubRepository[];
  getSearchResults: () => GitHubRepository[];
  getActivityGrid: () => GitHubActivityGrid | null;
  getAllLanguages: () => string[];
  getAllTopics: () => string[];
  getTotalContributions: () => number;
  isCacheValid: () => boolean;
  isActivityCacheValid: () => boolean;
}

export const useGitHubStore = create<GitHubState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        repositories: {},
        repositoriesList: [],
        activityGrid: null,
        languageRepos: {},
        topicRepos: {},
        publicRepos: [],
        privateRepos: [],
        originalRepos: [],
        forkRepos: [],
        activeRepos: [],
        archivedRepos: [],
        isLoading: false,
        isLoadingList: false,
        isLoadingActivity: false,
        loadingStates: {},
        error: null,
        activityError: null,
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        currentFilters: {},
        searchResults: [],
        lastFetched: null,
        activityLastFetched: null,
        cacheExpiry: 10 * 60 * 1000, // 10 minutes for GitHub data
        
        // Actions
        fetchRepositories: async (params = {}) => {
          const state = get();
          
          // Check cache validity for list requests
          if (params.page === 1 && state.isCacheValid() && state.repositoriesList.length > 0) {
            return;
          }
          
          set({ isLoadingList: true, error: null, currentFilters: params });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.github.getGitHubRepos(params);
            
            if (response.success && response.data) {
              const repositoriesMap: Record<string, GitHubRepository> = {};
              const repositoriesList: number[] = [];
              const languageRepos: Record<string, number[]> = {};
              const topicRepos: Record<string, number[]> = {};
              const publicRepos: number[] = [];
              const privateRepos: number[] = [];
              const originalRepos: number[] = [];
              const forkRepos: number[] = [];
              const activeRepos: number[] = [];
              const archivedRepos: number[] = [];
              
              response.data.forEach((repo) => {
                repositoriesMap[repo.id] = repo;
                repositoriesList.push(repo.id);
                
                // Categorize by visibility
                if (repo.isPrivate) {
                  privateRepos.push(repo.id);
                } else {
                  publicRepos.push(repo.id);
                }
                
                // Categorize by fork status
                if (repo.isFork) {
                  forkRepos.push(repo.id);
                } else {
                  originalRepos.push(repo.id);
                }
                
                // Categorize by archive status
                if (repo.isArchived) {
                  archivedRepos.push(repo.id);
                } else {
                  activeRepos.push(repo.id);
                }
                
                // Categorize by language
                if (repo.language) {
                  if (!languageRepos[repo.language]) {
                    languageRepos[repo.language] = [];
                  }
                  languageRepos[repo.language].push(repo.id);
                }
                
                // Categorize by topics
                repo.topics.forEach(topic => {
                  if (!topicRepos[topic]) {
                    topicRepos[topic] = [];
                  }
                  topicRepos[topic].push(repo.id);
                });
              });
              
              set({
                repositories: params.page === 1 ? repositoriesMap : { ...state.repositories, ...repositoriesMap },
                repositoriesList: params.page === 1 ? repositoriesList : [...state.repositoriesList, ...repositoriesList],
                languageRepos: params.page === 1 ? languageRepos : {
                  ...state.languageRepos,
                  ...Object.entries(languageRepos).reduce((acc, [language, ids]) => {
                    acc[language] = [...(state.languageRepos[language] || []), ...ids];
                    return acc;
                  }, {} as Record<string, number[]>)
                },
                topicRepos: params.page === 1 ? topicRepos : {
                  ...state.topicRepos,
                  ...Object.entries(topicRepos).reduce((acc, [topic, ids]) => {
                    acc[topic] = [...(state.topicRepos[topic] || []), ...ids];
                    return acc;
                  }, {} as Record<string, number[]>)
                },
                publicRepos: params.page === 1 ? publicRepos : [...state.publicRepos, ...publicRepos],
                privateRepos: params.page === 1 ? privateRepos : [...state.privateRepos, ...privateRepos],
                originalRepos: params.page === 1 ? originalRepos : [...state.originalRepos, ...originalRepos],
                forkRepos: params.page === 1 ? forkRepos : [...state.forkRepos, ...forkRepos],
                activeRepos: params.page === 1 ? activeRepos : [...state.activeRepos, ...activeRepos],
                archivedRepos: params.page === 1 ? archivedRepos : [...state.archivedRepos, ...archivedRepos],
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
        
        fetchRepositoriesTable: async (params = {}) => {
          set({ isLoadingList: true, error: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.github.getGitHubReposTable(params);
            
            if (response.success && response.data) {
              // Process similar to fetchRepositories but for table format
              const repositoriesMap: Record<string, GitHubRepository> = {};
              const repositoriesList: number[] = [];
              
              response.data.forEach((repo) => {
                repositoriesMap[repo.id] = repo;
                repositoriesList.push(repo.id);
              });
              
              set({
                repositories: repositoriesMap,
                repositoriesList,
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
        
        fetchActivityGrid: async (params = {}) => {
          const state = get();
          
          // Check cache validity for activity
          if (state.isActivityCacheValid() && state.activityGrid) {
            return;
          }
          
          set({ isLoadingActivity: true, activityError: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.github.getGitHubActivityGrid(params);
            
            if (response.success && response.data) {
              set({
                activityGrid: response.data,
                activityLastFetched: Date.now(),
                isLoadingActivity: false,
              });
            }
          } catch (error) {
            set({
              activityError: formatApiError(error),
              isLoadingActivity: false,
            });
          }
        },
        
        // Filter and search actions
        fetchReposByLanguage: async (language: string, params = {}) => {
          return get().fetchRepositories({ ...params, language });
        },
        
        fetchReposByTopic: async (topic: string, params = {}) => {
          return get().fetchRepositories({ ...params, topic });
        },
        
        fetchPublicRepos: async (params = {}) => {
          return get().fetchRepositories({ ...params, type: 'public' });
        },
        
        fetchPopularRepos: async (params = {}) => {
          return get().fetchRepositories({ ...params, sort: 'updated', direction: 'desc' });
        },
        
        fetchRecentlyUpdatedRepos: async (params = {}) => {
          return get().fetchRepositories({ ...params, sort: 'updated', direction: 'desc' });
        },
        
        fetchOriginalRepos: async (params = {}) => {
          return get().fetchRepositories({ ...params, includeForks: false });
        },
        
        fetchActiveRepos: async (params = {}) => {
          return get().fetchRepositories({ ...params, includeArchived: false });
        },
        
        searchRepositories: async (query: string, params = {}) => {
          set({ isLoadingList: true, error: null });
          
          try {
            const apiClient = getApiClient();
            const response = await apiClient.github.searchRepos(query, params);
            
            if (response.success && response.data) {
              const searchResults = response.data.map(repo => repo.id);
              set({
                searchResults,
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
        
        // Activity actions
        fetchActivityForYear: async (year: number, username?: string) => {
          return get().fetchActivityGrid({ year, username });
        },
        
        fetchCurrentYearActivity: async (username?: string) => {
          const currentYear = new Date().getFullYear();
          return get().fetchActivityForYear(currentYear, username);
        },
        
        // Cache and state management
        invalidateCache: () => {
          set({ lastFetched: null });
        },
        
        invalidateActivityCache: () => {
          set({ activityLastFetched: null });
        },
        
        clearErrors: () => {
          set({ error: null, activityError: null });
        },
        
        setCurrentFilters: (filters: GitHubReposListParams) => {
          set({ currentFilters: filters });
        },
        
        // Selectors
        getRepository: (id: number) => {
          return get().repositories[id] || null;
        },
        
        getAllRepositories: () => {
          const state = get();
          return state.repositoriesList.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getPublicRepositories: () => {
          const state = get();
          return state.publicRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getPrivateRepositories: () => {
          const state = get();
          return state.privateRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getOriginalRepositories: () => {
          const state = get();
          return state.originalRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getForkRepositories: () => {
          const state = get();
          return state.forkRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getActiveRepositories: () => {
          const state = get();
          return state.activeRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getArchivedRepositories: () => {
          const state = get();
          return state.archivedRepos.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getRepositoriesByLanguage: (language: string) => {
          const state = get();
          const ids = state.languageRepos[language] || [];
          return ids.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getRepositoriesByTopic: (topic: string) => {
          const state = get();
          const ids = state.topicRepos[topic] || [];
          return ids.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getSearchResults: () => {
          const state = get();
          return state.searchResults.map(id => state.repositories[id]).filter(Boolean);
        },
        
        getActivityGrid: () => {
          return get().activityGrid;
        },
        
        getAllLanguages: () => {
          return Object.keys(get().languageRepos);
        },
        
        getAllTopics: () => {
          return Object.keys(get().topicRepos);
        },
        
        getTotalContributions: () => {
          const activityGrid = get().activityGrid;
          return activityGrid?.totalContributions || 0;
        },
        
        isCacheValid: () => {
          const state = get();
          if (!state.lastFetched) return false;
          return Date.now() - state.lastFetched < state.cacheExpiry;
        },
        
        isActivityCacheValid: () => {
          const state = get();
          if (!state.activityLastFetched) return false;
          return Date.now() - state.activityLastFetched < state.cacheExpiry;
        },
      }),
      {
        name: 'github-store',
        partialize: (state) => ({
          repositories: state.repositories,
          repositoriesList: state.repositoriesList,
          activityGrid: state.activityGrid,
          languageRepos: state.languageRepos,
          topicRepos: state.topicRepos,
          publicRepos: state.publicRepos,
          privateRepos: state.privateRepos,
          originalRepos: state.originalRepos,
          forkRepos: state.forkRepos,
          activeRepos: state.activeRepos,
          archivedRepos: state.archivedRepos,
          lastFetched: state.lastFetched,
          activityLastFetched: state.activityLastFetched,
          currentPage: state.currentPage,
          totalPages: state.totalPages,
          totalCount: state.totalCount,
        }),
      }
    ),
    { name: 'GitHubStore' }
  )
);