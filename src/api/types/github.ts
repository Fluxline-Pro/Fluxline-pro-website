/**
 * GitHub-related TypeScript types
 * Based on Azure Functions GitHub models
 */

/**
 * GitHub Repository information
 */
export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  url: string;
  htmlUrl: string;
  cloneUrl: string;
  language?: string;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  size: number;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  isDisabled: boolean;
  defaultBranch: string;
  createdAt: string;     // ISO string
  updatedAt: string;     // ISO string
  pushedAt?: string;     // ISO string
  topics: string[];
  license?: {
    key: string;
    name: string;
    url?: string;
  };
  owner: {
    login: string;
    id: number;
    avatarUrl: string;
    type: 'User' | 'Organization';
  };
}

/**
 * GitHub Activity Grid data point
 */
export interface GitHubActivityGridItem {
  date: string;          // ISO date string (YYYY-MM-DD)
  count: number;         // Number of contributions
  level: 0 | 1 | 2 | 3 | 4; // Contribution level for color intensity
}

/**
 * GitHub Activity Grid response
 */
export interface GitHubActivityGrid {
  weeks: GitHubActivityGridItem[][];
  totalContributions: number;
  startDate: string;     // ISO date string
  endDate: string;       // ISO date string
}

/**
 * GitHub Repository list query parameters
 */
export interface GitHubReposListParams {
  page?: number;
  pageSize?: number;
  type?: 'all' | 'owner' | 'member' | 'public' | 'private';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  language?: string;
  topic?: string;
  includeArchived?: boolean;
  includeForks?: boolean;
}

/**
 * GitHub Activity Grid query parameters
 */
export interface GitHubActivityParams {
  year?: number;
  username?: string;
}