/**
 * Main API Client
 * Central API client that provides access to all service-specific clients
 * IMPORTANT NOTE: This needs to be updated for Fluxline.pro's API and services once data services are set up
 */

import { ApiClientConfig, EnvironmentConfig } from '../types';
import { BaseApiClient } from './base-client';
import { AuthorsApiClient } from './authors-client';
import { BlogPostsApiClient } from './blogposts-client';
import { PortfolioPiecesApiClient } from './portfolio-client';
import { GitHubApiClient } from './github-client';
import { MediaApiClient } from './media-client';
import { BooksApiClient } from './books-client';
import { ContactApiClient } from './contact-client';
import { PressReleasesApiClient } from './pressreleases-client';

export class ApiClient extends BaseApiClient {
  // Service-specific clients
  public readonly authors: AuthorsApiClient;
  public readonly blogPosts: BlogPostsApiClient;
  public readonly portfolioPieces: PortfolioPiecesApiClient;
  public readonly github: GitHubApiClient;
  public readonly media: MediaApiClient;
  public readonly books: BooksApiClient;
  public readonly contact: ContactApiClient;
  public readonly pressReleases: PressReleasesApiClient;

  constructor(config: ApiClientConfig) {
    super(config);

    // Initialize service-specific clients
    this.authors = new AuthorsApiClient(config);
    this.blogPosts = new BlogPostsApiClient(config);
    this.portfolioPieces = new PortfolioPiecesApiClient(config);
    this.github = new GitHubApiClient(config);
    this.media = new MediaApiClient(config);
    this.books = new BooksApiClient(config);
    this.contact = new ContactApiClient(config);
    this.pressReleases = new PressReleasesApiClient(config);
  }

  /**
   * Create API client from environment variables
   */
  static fromEnvironment(): ApiClient {
    const config: EnvironmentConfig = {
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
      cdnBaseUrl: process.env.REACT_APP_CDN_BASE_URL || '',
      apiKey: process.env.REACT_APP_API_KEY || '',
      environment:
        (process.env.REACT_APP_ENVIRONMENT as
          | 'development'
          | 'staging'
          | 'production') || 'development',
    };

    if (!config.apiBaseUrl) {
      throw new Error(
        'REACT_APP_API_BASE_URL environment variable is required'
      );
    }

    if (!config.cdnBaseUrl) {
      throw new Error(
        'REACT_APP_CDN_BASE_URL environment variable is required'
      );
    }

    if (!config.apiKey) {
      throw new Error('REACT_APP_API_KEY environment variable is required');
    }

    const clientConfig: ApiClientConfig = {
      baseUrl: config.apiBaseUrl,
      apiKey: config.apiKey,
      cdnBaseUrl: config.cdnBaseUrl,
      environment: config.environment,
      timeout: 30000,
      retryAttempts: 3,
      enableLogging: config.environment === 'development',
    };

    return new ApiClient(clientConfig);
  }

  /**
   * Create API client with custom configuration
   */
  static create(config: Partial<ApiClientConfig>): ApiClient {
    const defaultConfig: ApiClientConfig = {
      baseUrl: 'https://api.terencewaters.com',
      apiKey: '',
      cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
      environment: 'production',
      timeout: 30000,
      retryAttempts: 3,
      enableLogging: false,
    };

    const mergedConfig = { ...defaultConfig, ...config };

    if (!mergedConfig.apiKey) {
      throw new Error('API key is required');
    }

    return new ApiClient(mergedConfig);
  }

  /**
   * Create API client for specific environment
   */
  static forEnvironment(
    environment: 'development' | 'staging' | 'production',
    apiKey: string
  ): ApiClient {
    const environmentConfigs = {
      development: {
        baseUrl: 'https://mock-dev-api.terencewaters.com',
        cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
        enableLogging: true,
      },
      staging: {
        baseUrl: 'https://mock-tst-api.terencewaters.com',
        cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
        enableLogging: true,
      },
      production: {
        baseUrl: 'https://api.terencewaters.com',
        cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
        enableLogging: false,
      },
    };

    const envConfig = environmentConfigs[environment];

    const config: ApiClientConfig = {
      ...envConfig,
      apiKey,
      environment,
      timeout: 30000,
      retryAttempts: 3,
    };

    return new ApiClient(config);
  }

  /**
   * Update configuration for all clients
   */
  public updateConfig(newConfig: Partial<ApiClientConfig>): void {
    super.updateConfig(newConfig);

    // Update all service clients
    this.authors.updateConfig(newConfig);
    this.blogPosts.updateConfig(newConfig);
    this.portfolioPieces.updateConfig(newConfig);
    this.github.updateConfig(newConfig);
    this.media.updateConfig(newConfig);
    this.books.updateConfig(newConfig);
    this.contact.updateConfig(newConfig);
    this.pressReleases.updateConfig(newConfig);
  }

  /**
   * Test API connectivity
   */
  async testConnection(): Promise<{
    status: 'success' | 'error';
    message: string;
    endpoints: {
      authors: boolean;
      blogPosts: boolean;
      portfolioPieces: boolean;
      github: boolean;
      media: boolean;
      books: boolean;
      contact: boolean;
      pressReleases: boolean;
    };
  }> {
    const results = {
      authors: false,
      blogPosts: false,
      portfolioPieces: false,
      github: false,
      media: false,
      books: false,
      contact: false,
      pressReleases: false,
    };

    try {
      // Test each endpoint with minimal requests
      const tests = await Promise.allSettled([
        this.authors.getAuthors({ page: 1, pageSize: 1 }),
        this.blogPosts.getBlogPosts({ page: 1, pageSize: 1 }),
        this.portfolioPieces.getPortfolioPieces({ page: 1, pageSize: 1 }),
        this.github.getGitHubRepos({ page: 1, pageSize: 1 }),
        this.media.getMediaList({ page: 1, pageSize: 1 }),
        this.books.getBooks({ page: 1, pageSize: 1 }),
        // For contact, we can't really test without submitting a form, so this is a placeholder
        Promise.resolve({ success: true }),
        this.pressReleases.getPressReleases({ page: 1, pageSize: 1 }),
      ]);

      results.authors = tests[0].status === 'fulfilled';
      results.blogPosts = tests[1].status === 'fulfilled';
      results.portfolioPieces = tests[2].status === 'fulfilled';
      results.github = tests[3].status === 'fulfilled';
      results.media = tests[4].status === 'fulfilled';
      results.books = tests[5].status === 'fulfilled';
      results.contact = tests[6].status === 'fulfilled';
      results.pressReleases = tests[7].status === 'fulfilled';

      const successCount = Object.values(results).filter(Boolean).length;
      const totalCount = Object.keys(results).length;

      return {
        status: successCount === totalCount ? 'success' : 'error',
        message: `${successCount}/${totalCount} endpoints accessible`,
        endpoints: results,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to test API connectivity',
        endpoints: results,
      };
    }
  }

  /**
   * Get API health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version?: string;
    environment: string;
  }> {
    try {
      // This would ideally be a dedicated health endpoint
      // For now, we'll use a simple connectivity test
      const testResult = await this.testConnection();
      const config = this.getConfig();

      return {
        status: testResult.status === 'success' ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        environment: config.environment,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        environment: this.getConfig().environment,
      };
    }
  }
}

// Export a default instance that can be configured
let defaultApiClient: ApiClient | null = null;

/**
 * Get the default API client instance
 */
export function getApiClient(): ApiClient {
  if (!defaultApiClient) {
    try {
      defaultApiClient = ApiClient.fromEnvironment();
    } catch (error) {
      throw new Error(
        'API client not initialized. Please call initializeApiClient() first or set required environment variables.'
      );
    }
  }
  return defaultApiClient;
}

/**
 * Initialize the default API client
 */
export function initializeApiClient(
  config?: Partial<ApiClientConfig>
): ApiClient {
  if (config) {
    defaultApiClient = ApiClient.create(config);
  } else {
    defaultApiClient = ApiClient.fromEnvironment();
  }
  return defaultApiClient;
}

/**
 * Reset the default API client (useful for testing)
 */
export function resetApiClient(): void {
  defaultApiClient = null;
}

// Re-export all client classes for direct use
export {
  AuthorsApiClient,
  BlogPostsApiClient,
  PortfolioPiecesApiClient,
  GitHubApiClient,
  MediaApiClient,
  BooksApiClient,
  ContactApiClient,
  PressReleasesApiClient,
  BaseApiClient,
};
