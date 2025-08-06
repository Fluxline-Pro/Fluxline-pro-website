/**
 * Base API Client
 * Provides common HTTP functionality and error handling for all API operations
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiClientConfig,
  ApiError,
  ApiResponse,
  RequestOptions,
  HttpMethod,
} from '../types';

export class BaseApiClient {
  private axiosInstance: AxiosInstance;
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
      },
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        if (
          this.config.enableLogging &&
          this.config.environment === 'development'
        ) {
          console.log(
            `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
            {
              headers: config.headers,
              data: config.data,
              params: config.params,
            }
          );
        }
        return config;
      },
      (error) => {
        this.log('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response) => {
        if (
          this.config.enableLogging &&
          this.config.environment === 'development'
        ) {
          console.log(
            `[API Response] ${response.status} ${response.config.url}`,
            response.data
          );
        }
        return response;
      },
      (error) => {
        this.log('Response error:', error);
        return Promise.reject(this.handleApiError(error));
      }
    );

    return instance;
  }

  private handleApiError(error: any): ApiError {
    // Network error
    if (!error.response) {
      return {
        message: 'Network error - please check your connection',
        statusCode: 0,
        details: error.message,
        timestamp: new Date().toISOString(),
      };
    }

    // HTTP error response
    const response = error.response;
    const apiError: ApiError = {
      message: response.data?.message || `HTTP ${response.status} Error`,
      statusCode: response.status,
      details: response.data?.details || response.statusText,
      timestamp: new Date().toISOString(),
    };

    // Log specific error types
    if (response.status === 401) {
      this.log('Authentication error - check API key');
    } else if (response.status === 403) {
      this.log('Authorization error - insufficient permissions');
    } else if (response.status >= 500) {
      this.log('Server error - please try again later');
    }

    return apiError;
  }

  private log(message: string, data?: any): void {
    if (
      this.config.enableLogging &&
      this.config.environment === 'development'
    ) {
      console.log(`[API Client] ${message}`, data);
    }
  }

  /**
   * Generic HTTP request method with retry logic
   */
  protected async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: endpoint,
      data,
      headers: options?.headers,
      params: options?.params,
      timeout: options?.timeout || this.config.timeout,
      signal: options?.signal,
    };

    const maxRetries = options?.retryAttempts ?? this.config.retryAttempts ?? 3;
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response: AxiosResponse<T> =
          await this.axiosInstance.request(requestConfig);

        // Wrap successful response in ApiResponse format
        return {
          data: response.data,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        lastError = error;

        // Don't retry on client errors (4xx) or for the last attempt
        const statusCode =
          (error as any)?.response?.status || (error as any)?.statusCode;
        if (attempt === maxRetries || (statusCode >= 400 && statusCode < 500)) {
          break;
        }

        // Exponential backoff for retries
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));

        this.log(
          `Retrying request (attempt ${attempt + 1}/${maxRetries}) after ${delay}ms delay`
        );
      }
    }

    throw lastError;
  }

  /**
   * GET request
   */
  protected async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  /**
   * POST request
   */
  protected async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, options);
  }

  /**
   * PUT request
   */
  protected async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, options);
  }

  /**
   * PATCH request
   */
  protected async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, options);
  }

  /**
   * DELETE request
   */
  protected async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }

  /**
   * Upload file with progress tracking
   */
  protected async uploadFile<T>(
    endpoint: string,
    file: File | Blob,
    additionalData?: Record<string, any>,
    onProgress?: (progress: {
      loaded: number;
      total: number;
      percentage: number;
    }) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : String(value)
          );
        }
      });
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: endpoint,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage,
          });
        }
      },
    };

    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.request(config);
      return {
        data: response.data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Build CDN URL with optional transformations
   */
  public buildCdnUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.config.cdnBaseUrl);

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
   * Update configuration
   */
  public updateConfig(newConfig: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.axiosInstance = this.createAxiosInstance();
  }

  /**
   * Get current configuration
   */
  public getConfig(): ApiClientConfig {
    return { ...this.config };
  }
}
