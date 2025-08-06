/**
 * GitHub API Client
 * Handles all GitHub-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  GitHubRepository,
  GitHubActivityGrid,
  GitHubReposListParams,
  GitHubActivityParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class GitHubApiClient extends BaseApiClient {
  /**
   * Get GitHub repositories
   * Endpoint: GET /github/repos
   */
  async getGitHubRepos(
    params?: GitHubReposListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    const endpoint = '/github/repos';
    return this.get<GitHubRepository[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<GitHubRepository>>;
  }

  /**
   * Get GitHub repositories in table format
   * Endpoint: GET /github/repos/table
   */
  async getGitHubReposTable(
    params?: GitHubReposListParams,
    options?: RequestOptions
  ): Promise<ApiResponse<GitHubRepository[]>> {
    const endpoint = '/github/repos/table';
    return this.get<GitHubRepository[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Get GitHub activity grid data
   * Endpoint: GET /github/activity
   */
  async getGitHubActivityGrid(
    params?: GitHubActivityParams,
    options?: RequestOptions
  ): Promise<ApiResponse<GitHubActivityGrid>> {
    const endpoint = '/github/activity';
    return this.get<GitHubActivityGrid>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Get public repositories only
   */
  async getPublicRepos(
    params?: Omit<GitHubReposListParams, 'type'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    return this.getGitHubRepos(
      { ...params, type: 'public' },
      options
    );
  }

  /**
   * Get repositories by language
   */
  async getReposByLanguage(
    language: string,
    params?: Omit<GitHubReposListParams, 'language'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    if (!language || typeof language !== 'string') {
      throw new Error('Language is required and must be a string');
    }

    return this.getGitHubRepos(
      { ...params, language },
      options
    );
  }

  /**
   * Get repositories by topic
   */
  async getReposByTopic(
    topic: string,
    params?: Omit<GitHubReposListParams, 'topic'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    if (!topic || typeof topic !== 'string') {
      throw new Error('Topic is required and must be a string');
    }

    return this.getGitHubRepos(
      { ...params, topic },
      options
    );
  }

  /**
   * Get repositories sorted by stars (most popular)
   */
  async getPopularRepos(
    params?: Omit<GitHubReposListParams, 'sort' | 'direction'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    return this.getGitHubRepos(
      { ...params, sort: 'updated', direction: 'desc' },
      options
    );
  }

  /**
   * Get recently updated repositories
   */
  async getRecentlyUpdatedRepos(
    params?: Omit<GitHubReposListParams, 'sort' | 'direction'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    return this.getGitHubRepos(
      { ...params, sort: 'updated', direction: 'desc' },
      options
    );
  }

  /**
   * Get activity for a specific year
   */
  async getActivityForYear(
    year: number,
    username?: string,
    options?: RequestOptions
  ): Promise<ApiResponse<GitHubActivityGrid>> {
    if (!year || typeof year !== 'number' || year < 2008 || year > new Date().getFullYear()) {
      throw new Error('Year must be a valid number between 2008 and current year');
    }

    return this.getGitHubActivityGrid(
      { year, username },
      options
    );
  }

  /**
   * Get activity for current year
   */
  async getCurrentYearActivity(
    username?: string,
    options?: RequestOptions
  ): Promise<ApiResponse<GitHubActivityGrid>> {
    const currentYear = new Date().getFullYear();
    return this.getActivityForYear(currentYear, username, options);
  }

  /**
   * Get repositories excluding forks
   */
  async getOriginalRepos(
    params?: Omit<GitHubReposListParams, 'includeForks'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    return this.getGitHubRepos(
      { ...params, includeForks: false },
      options
    );
  }

  /**
   * Get repositories excluding archived ones
   */
  async getActiveRepos(
    params?: Omit<GitHubReposListParams, 'includeArchived'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    return this.getGitHubRepos(
      { ...params, includeArchived: false },
      options
    );
  }

  /**
   * Search repositories (if the API supports it)
   */
  async searchRepos(
    query: string,
    params?: GitHubReposListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<GitHubRepository>> {
    if (!query || typeof query !== 'string') {
      throw new Error('Search query is required and must be a string');
    }

    // This would depend on the Azure Function implementing a search endpoint
    // For now, we'll return all repos and let the client filter
    // In a real implementation, you might have a dedicated search endpoint
    const response = await this.getGitHubRepos(params, options);
    
    // Client-side filtering as fallback
    if (response.data) {
      const filteredData = response.data.filter(repo =>
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.description?.toLowerCase().includes(query.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
      );

      return {
        ...response,
        data: filteredData,
        pagination: {
          ...response.pagination,
          totalCount: filteredData.length,
          totalPages: Math.ceil(filteredData.length / (params?.pageSize || 10)),
        },
      };
    }

    return response;
  }
}