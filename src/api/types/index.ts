/**
 * API Types Index
 * Central export for all API-related TypeScript types
 */

// Base types
export * from './base';

// Content types
export * from './authors';
export * from './blogposts';
export * from './portfolio';
export * from './github';
export * from './media';
export * from './books';
export * from './contact';

// API Client types
export interface ApiClientConfig {
  baseUrl: string;
  apiKey: string;
  cdnBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  timeout?: number;
  retryAttempts?: number;
  enableLogging?: boolean;
}

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request options
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  retryAttempts?: number;
  signal?: AbortSignal;
}

// Environment configuration
export interface EnvironmentConfig {
  apiBaseUrl: string;
  cdnBaseUrl: string;
  apiKey: string;
  environment: 'development' | 'staging' | 'production';
}
