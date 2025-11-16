/**
 * PressReleases API Client
 * Handles all press release-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  PressReleaseDTO,
  PressReleaseWithMediaDTO,
  CreatePressReleaseRequest,
  UpdatePressReleaseRequest,
  PressReleaseListParams,
  PressReleaseQueryParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class PressReleasesApiClient extends BaseApiClient {
  /**
   * Get all press releases
   * Endpoint: GET /press-releases
   */
  async getPressReleases(
    params?: PressReleaseListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    const endpoint = '/press-releases';
    return this.get<(PressReleaseDTO | PressReleaseWithMediaDTO)[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>>;
  }

  /**
   * Get a single press release by slug
   * Endpoint: GET /press-releases/{slug}
   */
  async getPressRelease(
    slug: string,
    params?: PressReleaseQueryParams,
    options?: RequestOptions
  ): Promise<ApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Press release slug is required and must be a string');
    }

    const endpoint = `/press-releases/${encodeURIComponent(slug)}`;
    return this.get<PressReleaseDTO | PressReleaseWithMediaDTO>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Create a new press release
   * Endpoint: POST /press-releases
   */
  async createPressRelease(
    pressReleaseData: CreatePressReleaseRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<PressReleaseDTO>> {
    this.validateCreatePressReleaseRequest(pressReleaseData);

    const endpoint = '/press-releases';
    return this.post<PressReleaseDTO>(endpoint, pressReleaseData, options);
  }

  /**
   * Update an existing press release
   * Endpoint: POST /press-releases (upsert operation)
   */
  async updatePressRelease(
    pressReleaseData: UpdatePressReleaseRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<PressReleaseDTO>> {
    this.validateUpdatePressReleaseRequest(pressReleaseData);

    const endpoint = '/press-releases';
    return this.post<PressReleaseDTO>(endpoint, pressReleaseData, options);
  }

  /**
   * Delete a press release
   * Endpoint: DELETE /press-releases/{slug}
   */
  async deletePressRelease(
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Press release slug is required and must be a string');
    }

    const endpoint = `/press-releases/${encodeURIComponent(slug)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Upload media for a press release
   * Endpoint: POST /press-releases/{slug}/media
   */
  async uploadPressReleaseMedia(
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery' = 'content',
    onProgress?: (progress: {
      loaded: number;
      total: number;
      percentage: number;
    }) => void,
    options?: RequestOptions
  ): Promise<ApiResponse<PressReleaseDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Press release slug is required and must be a string');
    }

    if (!file || !(file instanceof File)) {
      throw new Error('File is required and must be a File object');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mediaType', mediaType);

    const endpoint = `/press-releases/${encodeURIComponent(slug)}/media`;
    return this.uploadFile<PressReleaseDTO>(endpoint, file, { mediaType }, onProgress);
  }

  /**
   * Get press releases by category
   */
  async getPressReleasesByCategory(
    category: string,
    params?: Omit<PressReleaseListParams, 'category'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    return this.getPressReleases({ ...params, category }, options);
  }

  /**
   * Get press releases by author
   */
  async getPressReleasesByAuthor(
    authorSlug: string,
    params?: Omit<PressReleaseListParams, 'authorSlug'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    return this.getPressReleases({ ...params, authorSlug }, options);
  }

  /**
   * Get press releases by tags
   */
  async getPressReleasesByTags(
    tags: string[],
    params?: Omit<PressReleaseListParams, 'tags'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    return this.getPressReleases({ ...params, tags }, options);
  }

  /**
   * Search press releases
   */
  async searchPressReleases(
    searchTerm: string,
    params?: Omit<PressReleaseListParams, 'searchTerm'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<PressReleaseDTO | PressReleaseWithMediaDTO>> {
    return this.getPressReleases({ ...params, searchTerm }, options);
  }

  /**
   * Validate create press release request
   */
  private validateCreatePressReleaseRequest(data: CreatePressReleaseRequest): void {
    const errors: string[] = [];

    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string');
    }

    if (!data.authorSlug || typeof data.authorSlug !== 'string') {
      errors.push('Author slug is required and must be a string');
    }

    if (!data.description || typeof data.description !== 'string') {
      errors.push('Description is required and must be a string');
    }

    if (!data.content || typeof data.content !== 'string') {
      errors.push('Content is required and must be a string');
    }

    if (!data.slug || typeof data.slug !== 'string') {
      errors.push('Slug is required and must be a string');
    }

    if (!data.category || typeof data.category !== 'string') {
      errors.push('Category is required and must be a string');
    }

    if (!data.status || !['Draft', 'Published', 'Archived'].includes(data.status)) {
      errors.push('Status is required and must be Draft, Published, or Archived');
    }

    if (!data.publishDate || typeof data.publishDate !== 'string') {
      errors.push('Publish date is required and must be an ISO string');
    }

    if (!Array.isArray(data.tagsList)) {
      errors.push('Tags list must be an array');
    }

    if (errors.length > 0) {
      throw new Error(`Invalid press release data: ${errors.join(', ')}`);
    }
  }

  /**
   * Validate update press release request
   */
  private validateUpdatePressReleaseRequest(data: UpdatePressReleaseRequest): void {
    if (!data.slug || typeof data.slug !== 'string') {
      throw new Error('Slug is required and must be a string for updates');
    }

    if (data.status && !['Draft', 'Published', 'Archived'].includes(data.status)) {
      throw new Error('Status must be Draft, Published, or Archived');
    }

    if (data.tagsList && !Array.isArray(data.tagsList)) {
      throw new Error('Tags list must be an array');
    }
  }
}
