/**
 * API Configuration Helpers
 * Utilities for creating and validating API configurations
 * IMPORTANT NOTE: This needs to be updated for Fluxline.pro's API and services once data services are set up
 */

import { ApiClientConfig, EnvironmentConfig } from './types';

/**
 * Determine environment based on branch or environment variable
 */
function determineEnvironment(): 'development' | 'staging' | 'production' {
  // Check explicit environment variable first
  const explicitEnv = process.env.REACT_APP_ENVIRONMENT as
    | 'development'
    | 'staging'
    | 'production';
  if (
    explicitEnv &&
    ['development', 'staging', 'production'].includes(explicitEnv)
  ) {
    return explicitEnv;
  }

  // Detect from branch name or build context
  const branch =
    process.env.REACT_APP_BRANCH ||
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    '';

  if (branch.includes('master') || branch.includes('main')) {
    return 'production';
  } else if (branch.includes('staging') || branch.includes('test')) {
    return 'staging';
  } else {
    return 'development';
  }
}

/**
 * Get timeout based on environment
 */
function getTimeoutForEnvironment(
  environment: 'development' | 'staging' | 'production'
): number {
  switch (environment) {
    case 'development':
      return 60000; // 60 seconds for development
    case 'staging':
      return 45000; // 45 seconds for staging
    case 'production':
      return 30000; // 30 seconds for production
    default:
      return 30000;
  }
}

/**
 * Create API configuration from environment variables
 */
export function createApiConfig(): ApiClientConfig {
  // Determine environment from branch or environment variable
  const environment = determineEnvironment();

  const config: EnvironmentConfig = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
    cdnBaseUrl: process.env.REACT_APP_CDN_BASE_URL || '',
    apiKey: process.env.REACT_APP_API_KEY || '',
    environment,
  };

  // If environment variables are missing, use defaults based on environment
  if (!config.apiBaseUrl || !config.apiKey || !config.cdnBaseUrl) {
    console.warn(
      'Some API environment variables are missing, using defaults for',
      environment
    );
    const envDefaults = getEnvironmentConfig(environment);
    config.apiBaseUrl = config.apiBaseUrl || envDefaults.baseUrl || '';
    config.cdnBaseUrl = config.cdnBaseUrl || envDefaults.cdnBaseUrl || '';
    config.apiKey = config.apiKey || 'mock-api-key-for-development';
  }

  try {
    validateEnvironmentConfig(config);
  } catch (error) {
    console.warn('API configuration validation failed:', error);
    // In development, continue with mock data
    if (environment === 'development') {
      console.warn('Continuing with mock data for development');
    }
  }

  return {
    baseUrl: config.apiBaseUrl,
    apiKey: config.apiKey,
    cdnBaseUrl: config.cdnBaseUrl,
    environment: config.environment,
    timeout: getTimeoutForEnvironment(config.environment),
    retryAttempts: 3,
    enableLogging: config.environment !== 'production',
  };
}

/**
 * Validate API configuration
 */
export function validateApiConfig(config: Partial<ApiClientConfig>): string[] {
  const errors: string[] = [];

  if (!config.baseUrl) {
    errors.push('baseUrl is required');
  } else if (!isValidUrl(config.baseUrl)) {
    errors.push('baseUrl must be a valid URL');
  }

  if (!config.apiKey) {
    errors.push('apiKey is required');
  } else if (typeof config.apiKey !== 'string' || config.apiKey.length < 10) {
    errors.push('apiKey must be a string with at least 10 characters');
  }

  if (!config.cdnBaseUrl) {
    errors.push('cdnBaseUrl is required');
  } else if (!isValidUrl(config.cdnBaseUrl)) {
    errors.push('cdnBaseUrl must be a valid URL');
  }

  if (
    config.environment &&
    !['development', 'staging', 'production'].includes(config.environment)
  ) {
    errors.push('environment must be development, staging, or production');
  }

  if (
    config.timeout &&
    (typeof config.timeout !== 'number' || config.timeout < 1000)
  ) {
    errors.push('timeout must be a number >= 1000 milliseconds');
  }

  if (
    config.retryAttempts &&
    (typeof config.retryAttempts !== 'number' ||
      config.retryAttempts < 0 ||
      config.retryAttempts > 10)
  ) {
    errors.push('retryAttempts must be a number between 0 and 10');
  }

  return errors;
}

/**
 * Validate environment configuration
 */
function validateEnvironmentConfig(config: EnvironmentConfig): void {
  const requiredVars = [
    { key: 'apiBaseUrl', env: 'REACT_APP_API_BASE_URL' },
    { key: 'cdnBaseUrl', env: 'REACT_APP_CDN_BASE_URL' },
    { key: 'apiKey', env: 'REACT_APP_API_KEY' },
  ];

  const missingVars = requiredVars.filter(
    ({ key }) => !config[key as keyof EnvironmentConfig]
  );

  if (missingVars.length > 0) {
    const missingEnvVars = missingVars.map(({ env }) => env).join(', ');
    throw new Error(
      `Missing required environment variables: ${missingEnvVars}. ` +
        'Please set these variables in your environment or .env file.'
    );
  }

  // Validate URLs
  if (!isValidUrl(config.apiBaseUrl)) {
    throw new Error(`Invalid API base URL: ${config.apiBaseUrl}`);
  }

  if (!isValidUrl(config.cdnBaseUrl)) {
    throw new Error(`Invalid CDN base URL: ${config.cdnBaseUrl}`);
  }
}

/**
 * Check if a string is a valid URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get environment-specific API configuration
 */
export function getEnvironmentConfig(
  environment: 'development' | 'staging' | 'production'
): Partial<ApiClientConfig> {
  const configs = {
    development: {
      baseUrl: 'https://mock-dev-api.terencewaters.com',
      cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
      enableLogging: true,
      timeout: 60000, // Longer timeout for dev
    },
    staging: {
      baseUrl: 'https://mock-tst-api.terencewaters.com',
      cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
      enableLogging: true,
      timeout: 45000,
    },
    production: {
      baseUrl: 'https://api.terencewaters.com',
      cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
      enableLogging: false,
      timeout: 30000,
    },
  };

  return {
    ...configs[environment],
    environment,
    retryAttempts: 3,
  };
}

/**
 * Merge configuration with environment defaults
 */
export function mergeWithEnvironmentDefaults(
  config: Partial<ApiClientConfig>,
  environment?: 'development' | 'staging' | 'production'
): ApiClientConfig {
  const env = environment || config.environment || 'production';
  const envDefaults = getEnvironmentConfig(env);

  const merged = {
    ...envDefaults,
    ...config,
    environment: env,
  } as ApiClientConfig;

  const validationErrors = validateApiConfig(merged);
  if (validationErrors.length > 0) {
    throw new Error(
      `Invalid API configuration: ${validationErrors.join(', ')}`
    );
  }

  return merged;
}

/**
 * Create a test configuration for development/testing
 */
export function createTestConfig(
  overrides?: Partial<ApiClientConfig>
): ApiClientConfig {
  return mergeWithEnvironmentDefaults({
    baseUrl: 'https://mock-dev-api.terencewaters.com',
    apiKey: 'test-api-key-12345',
    cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
    environment: 'development',
    enableLogging: true,
    ...overrides,
  });
}
