/**
 * API Utilities
 * Helper functions for working with the API
 */

import { ApiError, MediaTransformParams } from './types';

/**
 * Check if an error is an API error
 */
export function isApiError(error: any): error is ApiError {
  return (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    'statusCode' in error &&
    'timestamp' in error
  );
}

/**
 * Format API error for display
 */
export function formatApiError(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Get error status code from any error
 */
export function getErrorStatusCode(error: unknown): number {
  if (isApiError(error)) {
    return error.statusCode;
  }

  return 0; // Unknown error
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return isApiError(error) && error.statusCode === 0;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  return isApiError(error) && error.statusCode === 401;
}

/**
 * Check if error is an authorization error
 */
export function isAuthorizationError(error: unknown): boolean {
  return isApiError(error) && error.statusCode === 403;
}

/**
 * Check if error is a not found error
 */
export function isNotFoundError(error: unknown): boolean {
  return isApiError(error) && error.statusCode === 404;
}

/**
 * Check if error is a server error
 */
export function isServerError(error: unknown): boolean {
  return isApiError(error) && error.statusCode >= 500;
}

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && !slug.startsWith('-') && !slug.endsWith('-');
}

/**
 * Parse media references JSON
 */
export function parseMediaReferences(mediaReferencesJson: string): string[] {
  try {
    const parsed = JSON.parse(mediaReferencesJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Stringify media references array
 */
export function stringifyMediaReferences(mediaIds: string[]): string {
  return JSON.stringify(mediaIds || []);
}

/**
 * Build CDN URL with transformations
 */
export function buildCdnUrl(
  baseUrl: string,
  path: string,
  params?: Record<string, any>
): string {
  const url = new URL(path, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Create responsive image transforms
 */
export function createResponsiveTransforms(
  breakpoints: number[] = [320, 480, 768, 1024, 1280, 1920]
): MediaTransformParams[] {
  return breakpoints.map(width => ({
    width,
    format: 'webp',
    quality: 85,
  }));
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  mediaPath: string,
  transforms: MediaTransformParams[]
): string {
  return transforms
    .map(transform => {
      const url = buildCdnUrl(baseUrl, mediaPath, transform);
      return `${url} ${transform.width}w`;
    })
    .join(', ');
}

/**
 * Debounce function for API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function for API calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Create an AbortController with timeout
 */
export function createTimeoutController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  
  setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  return controller;
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Don't retry client errors (4xx)
      if (isApiError(error) && error.statusCode >= 400 && error.statusCode < 500) {
        break;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Check if file is a video
 */
export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/');
}

/**
 * Check if file is an audio file
 */
export function isAudioFile(file: File): boolean {
  return file.type.startsWith('audio/');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create a cache key for API requests
 */
export function createCacheKey(endpoint: string, params?: Record<string, any>): string {
  const sortedParams = params ? 
    Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {} as Record<string, any>) : {};
  
  return `${endpoint}:${JSON.stringify(sortedParams)}`;
}

/**
 * Parse ISO date string to Date object
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Format date for API (ISO string)
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString();
}

/**
 * Check if date is valid
 */
export function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}