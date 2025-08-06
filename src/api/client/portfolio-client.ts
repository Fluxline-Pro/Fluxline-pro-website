/**
 * PortfolioPieces API Client
 * Handles all portfolio piece-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  PortfolioPieceDTO,
  PortfolioPieceWithMediaDTO,
  CreatePortfolioPieceRequest,
  UpdatePortfolioPieceRequest,
  PortfolioPieceListParams,
  PortfolioPieceQueryParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class PortfolioPiecesApiClient extends BaseApiClient {
  /**
   * Get all portfolio pieces
   * Endpoint: GET /portfolio
   */
  async getPortfolioPieces(
    params?: PortfolioPieceListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    const endpoint = '/portfolio';
    return this.get<(PortfolioPieceDTO | PortfolioPieceWithMediaDTO)[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>>;
  }

  /**
   * Get a single portfolio piece by slug
   * Endpoint: GET /portfolio/{slug}
   */
  async getPortfolioPiece(
    slug: string,
    params?: PortfolioPieceQueryParams,
    options?: RequestOptions
  ): Promise<ApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Portfolio piece slug is required and must be a string');
    }

    const endpoint = `/portfolio/${encodeURIComponent(slug)}`;
    return this.get<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Create a new portfolio piece
   * Endpoint: POST /portfolio
   */
  async createPortfolioPiece(
    portfolioPieceData: CreatePortfolioPieceRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<PortfolioPieceDTO>> {
    this.validateCreatePortfolioPieceRequest(portfolioPieceData);
    
    const endpoint = '/portfolio';
    return this.post<PortfolioPieceDTO>(endpoint, portfolioPieceData, options);
  }

  /**
   * Update an existing portfolio piece
   * Endpoint: POST /portfolio (upsert operation)
   */
  async updatePortfolioPiece(
    portfolioPieceData: UpdatePortfolioPieceRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<PortfolioPieceDTO>> {
    this.validateUpdatePortfolioPieceRequest(portfolioPieceData);
    
    const endpoint = '/portfolio';
    return this.post<PortfolioPieceDTO>(endpoint, portfolioPieceData, options);
  }

  /**
   * Upsert portfolio piece (create or update)
   * Endpoint: POST /portfolio
   */
  async upsertPortfolioPiece(
    portfolioPieceData: CreatePortfolioPieceRequest | UpdatePortfolioPieceRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<PortfolioPieceDTO>> {
    // Validate based on whether this looks like a create or update
    if (this.isCreateRequest(portfolioPieceData)) {
      this.validateCreatePortfolioPieceRequest(portfolioPieceData as CreatePortfolioPieceRequest);
    } else {
      this.validateUpdatePortfolioPieceRequest(portfolioPieceData as UpdatePortfolioPieceRequest);
    }
    
    const endpoint = '/portfolio';
    return this.post<PortfolioPieceDTO>(endpoint, portfolioPieceData, options);
  }

  /**
   * Delete a portfolio piece
   * Endpoint: DELETE /portfolio/{slug}
   */
  async deletePortfolioPiece(
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Portfolio piece slug is required and must be a string');
    }

    const endpoint = `/portfolio/${encodeURIComponent(slug)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Upload media for a portfolio piece
   * Endpoint: POST /portfolio/{slug}/media
   */
  async uploadPortfolioPieceMedia(
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery',
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void,
    options?: RequestOptions
  ): Promise<ApiResponse<PortfolioPieceDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Portfolio piece slug is required and must be a string');
    }

    if (!file) {
      throw new Error('File is required for upload');
    }

    const endpoint = `/portfolio/${encodeURIComponent(slug)}/media`;
    return this.uploadFile<PortfolioPieceDTO>(
      endpoint,
      file,
      {
        purpose: mediaType,
        mediaType: this.getMediaTypeFromFile(file),
      },
      onProgress
    );
  }

  /**
   * Get portfolio pieces by category
   */
  async getPortfolioPiecesByCategory(
    category: string,
    params?: Omit<PortfolioPieceListParams, 'category'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    return this.getPortfolioPieces(
      { ...params, category },
      options
    );
  }

  /**
   * Get portfolio pieces by author
   */
  async getPortfolioPiecesByAuthor(
    authorSlug: string,
    params?: Omit<PortfolioPieceListParams, 'authorSlug'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    return this.getPortfolioPieces(
      { ...params, authorSlug },
      options
    );
  }

  /**
   * Get portfolio pieces by tags
   */
  async getPortfolioPiecesByTags(
    tags: string[],
    params?: Omit<PortfolioPieceListParams, 'tags'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    return this.getPortfolioPieces(
      { ...params, tags },
      options
    );
  }

  /**
   * Search portfolio pieces
   */
  async searchPortfolioPieces(
    searchTerm: string,
    params?: Omit<PortfolioPieceListParams, 'searchTerm'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PortfolioPieceDTO | PortfolioPieceWithMediaDTO>> {
    return this.getPortfolioPieces(
      { ...params, searchTerm },
      options
    );
  }

  /**
   * Validate create portfolio piece request
   */
  private validateCreatePortfolioPieceRequest(data: CreatePortfolioPieceRequest): void {
    const requiredFields = ['title', 'authorSlug', 'description', 'content', 'slug', 'category', 'publishDate'];
    
    for (const field of requiredFields) {
      if (!data[field as keyof CreatePortfolioPieceRequest]) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate slug format (alphanumeric with hyphens)
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
      throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
    }

    // Validate status
    if (!['Draft', 'Published', 'Archived'].includes(data.status)) {
      throw new Error('Status must be Draft, Published, or Archived');
    }

    // Validate publish date
    if (!this.isValidDate(data.publishDate)) {
      throw new Error('Invalid publish date format');
    }

    // Validate tags array
    if (data.tagsList && !Array.isArray(data.tagsList)) {
      throw new Error('tagsList must be an array of strings');
    }
  }

  /**
   * Validate update portfolio piece request
   */
  private validateUpdatePortfolioPieceRequest(data: UpdatePortfolioPieceRequest): void {
    if (!data.slug || typeof data.slug !== 'string') {
      throw new Error('slug is required for updates');
    }

    // Validate slug format if provided
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
    }

    // Validate status if provided
    if (data.status && !['Draft', 'Published', 'Archived'].includes(data.status)) {
      throw new Error('Status must be Draft, Published, or Archived');
    }

    // Validate publish date if provided
    if (data.publishDate && !this.isValidDate(data.publishDate)) {
      throw new Error('Invalid publish date format');
    }

    // Validate tags array if provided
    if (data.tagsList && !Array.isArray(data.tagsList)) {
      throw new Error('tagsList must be an array of strings');
    }
  }

  /**
   * Check if request is a create request (has all required fields)
   */
  private isCreateRequest(data: CreatePortfolioPieceRequest | UpdatePortfolioPieceRequest): boolean {
    const createFields = ['title', 'authorSlug', 'description', 'content', 'category', 'publishDate'];
    return createFields.every(field => 
      data.hasOwnProperty(field) && 
      data[field as keyof typeof data] !== undefined
    );
  }

  /**
   * Validate date format (ISO string)
   */
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  /**
   * Get media type from file
   */
  private getMediaTypeFromFile(file: File): 'image' | 'video' | 'audio' | 'document' {
    const mimeType = file.type;
    
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  }
}