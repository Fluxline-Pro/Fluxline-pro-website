/**
 * Authors API Client
 * Handles all author-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  AuthorDTO,
  AuthorWithMediaDTO,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class AuthorsApiClient extends BaseApiClient {
  /**
   * Get all authors
   * Endpoint: GET /authors
   */
  async getAuthors(
    params?: {
      page?: number;
      pageSize?: number;
      includeMedia?: boolean;
      sortBy?: 'displayName' | 'firstName' | 'lastName' | 'authorSlug';
      sortOrder?: 'asc' | 'desc';
    },
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<AuthorDTO | AuthorWithMediaDTO>> {
    const endpoint = '/authors';
    return this.get<(AuthorDTO | AuthorWithMediaDTO)[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<AuthorDTO | AuthorWithMediaDTO>>;
  }

  /**
   * Get a single author by slug
   * Endpoint: GET /authors/{slug}
   */
  async getAuthor(
    slug: string,
    params?: {
      includeMedia?: boolean;
    },
    options?: RequestOptions
  ): Promise<ApiResponse<AuthorDTO | AuthorWithMediaDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Author slug is required and must be a string');
    }

    const endpoint = `/authors/${encodeURIComponent(slug)}`;
    return this.get<AuthorDTO | AuthorWithMediaDTO>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Create a new author
   * Endpoint: POST /authors
   */
  async createAuthor(
    authorData: CreateAuthorRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<AuthorDTO>> {
    this.validateCreateAuthorRequest(authorData);
    
    const endpoint = '/authors';
    return this.post<AuthorDTO>(endpoint, authorData, options);
  }

  /**
   * Update an existing author
   * Endpoint: POST /authors (upsert operation)
   */
  async updateAuthor(
    authorData: UpdateAuthorRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<AuthorDTO>> {
    this.validateUpdateAuthorRequest(authorData);
    
    const endpoint = '/authors';
    return this.post<AuthorDTO>(endpoint, authorData, options);
  }

  /**
   * Upsert author (create or update)
   * Endpoint: POST /authors
   */
  async upsertAuthor(
    authorData: CreateAuthorRequest | UpdateAuthorRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<AuthorDTO>> {
    // Validate based on whether this looks like a create or update
    if (this.isCreateRequest(authorData)) {
      this.validateCreateAuthorRequest(authorData as CreateAuthorRequest);
    } else {
      this.validateUpdateAuthorRequest(authorData as UpdateAuthorRequest);
    }
    
    const endpoint = '/authors';
    return this.post<AuthorDTO>(endpoint, authorData, options);
  }

  /**
   * Delete an author
   * Endpoint: DELETE /authors/{slug}
   */
  async deleteAuthor(
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Author slug is required and must be a string');
    }

    const endpoint = `/authors/${encodeURIComponent(slug)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Upload author profile image
   * Endpoint: POST /authors/{slug}/media
   */
  async uploadProfileImage(
    slug: string,
    file: File,
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void,
    options?: RequestOptions
  ): Promise<ApiResponse<AuthorDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Author slug is required and must be a string');
    }

    if (!file) {
      throw new Error('File is required for upload');
    }

    const endpoint = `/authors/${encodeURIComponent(slug)}/media`;
    return this.uploadFile<AuthorDTO>(
      endpoint,
      file,
      {
        purpose: 'profile',
        mediaType: 'image',
      },
      onProgress
    );
  }

  /**
   * Validate create author request
   */
  private validateCreateAuthorRequest(data: CreateAuthorRequest): void {
    const requiredFields = ['authorSlug', 'firstName', 'lastName', 'email', 'username', 'displayName'];
    
    for (const field of requiredFields) {
      if (!data[field as keyof CreateAuthorRequest] || 
          typeof data[field as keyof CreateAuthorRequest] !== 'string') {
        throw new Error(`${field} is required and must be a non-empty string`);
      }
    }

    // Validate email format
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    // Validate URLs if provided
    if (data.website && !this.isValidUrl(data.website)) {
      throw new Error('Invalid website URL format');
    }

    if (data.linkedInHandle && !this.isValidUrl(data.linkedInHandle)) {
      throw new Error('Invalid LinkedIn URL format');
    }
  }

  /**
   * Validate update author request
   */
  private validateUpdateAuthorRequest(data: UpdateAuthorRequest): void {
    if (!data.authorSlug || typeof data.authorSlug !== 'string') {
      throw new Error('authorSlug is required for updates');
    }

    // Validate email format if provided
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    // Validate URLs if provided
    if (data.website && !this.isValidUrl(data.website)) {
      throw new Error('Invalid website URL format');
    }

    if (data.linkedInHandle && !this.isValidUrl(data.linkedInHandle)) {
      throw new Error('Invalid LinkedIn URL format');
    }
  }

  /**
   * Check if request is a create request (has all required fields)
   */
  private isCreateRequest(data: CreateAuthorRequest | UpdateAuthorRequest): boolean {
    const createFields = ['firstName', 'lastName', 'email', 'username', 'displayName'];
    return createFields.every(field => 
      data.hasOwnProperty(field) && 
      data[field as keyof typeof data] !== undefined
    );
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}