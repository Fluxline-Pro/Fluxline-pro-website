/**
 * Media API Client
 * Handles all media-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  MediaItemDTO,
  MediaUploadRequest,
  MediaUploadResponse,
  MediaUploadProgress,
  MediaListParams,
  MediaTransformParams,
  MediaMetadataUpdateRequest,
  BulkMediaRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MediaCdnParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class MediaApiClient extends BaseApiClient {
  /**
   * Upload a media file
   * Endpoint: POST /media/upload
   */
  async uploadMedia(
    uploadRequest: MediaUploadRequest,
    onProgress?: (progress: MediaUploadProgress) => void,
    options?: RequestOptions
  ): Promise<ApiResponse<MediaUploadResponse>> {
    this.validateUploadRequest(uploadRequest);

    const endpoint = '/media/upload';

    const additionalData = {
      authorId: uploadRequest.authorId,
      purpose: uploadRequest.purpose,
      description: uploadRequest.description,
      altText: uploadRequest.altText,
      contentId: uploadRequest.contentId,
      relatedContentType: uploadRequest.relatedContentType,
    };

    return this.uploadFile<MediaUploadResponse>(
      endpoint,
      uploadRequest.file,
      additionalData,
      onProgress
    );
  }

  /**
   * Get a media item by ID
   * Endpoint: GET /media/{id}
   */
  async getMedia(
    id: string,
    options?: RequestOptions
  ): Promise<ApiResponse<MediaItemDTO>> {
    if (!id || typeof id !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/media/${encodeURIComponent(id)}`;
    return this.get<MediaItemDTO>(endpoint, options);
  }

  /**
   * Get media items list
   * Endpoint: GET /media
   */
  async getMediaList(
    params?: MediaListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<MediaItemDTO>> {
    const endpoint = '/media';
    return this.get<MediaItemDTO[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<MediaItemDTO>>;
  }

  /**
   * Update media metadata
   * Endpoint: PATCH /media/{id}
   */
  async updateMediaMetadata(
    updateRequest: MediaMetadataUpdateRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<MediaItemDTO>> {
    this.validateMetadataUpdateRequest(updateRequest);

    const endpoint = `/media/${encodeURIComponent(updateRequest.id)}`;
    const { id, ...updateData } = updateRequest;

    return this.patch<MediaItemDTO>(endpoint, updateData, options);
  }

  /**
   * Delete a media item
   * Endpoint: DELETE /media/{id}
   */
  async deleteMedia(
    id: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!id || typeof id !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/media/${encodeURIComponent(id)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Bulk media operations
   * Endpoint: POST /media/bulk
   */
  async bulkMediaOperation(
    bulkRequest: BulkMediaRequest,
    options?: RequestOptions
  ): Promise<
    ApiResponse<{ success: boolean; processedIds: string[]; errors: string[] }>
  > {
    this.validateBulkRequest(bulkRequest);

    const endpoint = '/media/bulk';
    return this.post(endpoint, bulkRequest, options);
  }

  /**
   * Get media by author
   */
  async getMediaByAuthor(
    authorId: string,
    params?: Omit<MediaListParams, 'authorId'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<MediaItemDTO>> {
    if (!authorId || typeof authorId !== 'string') {
      throw new Error('Author ID is required and must be a string');
    }

    return this.getMediaList({ ...params, authorId }, options);
  }

  /**
   * Get media by type
   */
  async getMediaByType(
    mediaType: 'image' | 'video' | 'audio' | 'document',
    params?: Omit<MediaListParams, 'mediaType'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<MediaItemDTO>> {
    return this.getMediaList({ ...params, mediaType }, options);
  }

  /**
   * Get media by purpose
   */
  async getMediaByPurpose(
    purpose:
      | 'profile'
      | 'cover'
      | 'gallery'
      | 'featured'
      | 'content'
      | 'thumbnail',
    params?: Omit<MediaListParams, 'purpose'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<MediaItemDTO>> {
    return this.getMediaList({ ...params, purpose }, options);
  }

  /**
   * Get media for specific content
   */
  async getMediaForContent(
    contentId: string,
    relatedContentType?: string,
    params?: Omit<MediaListParams, 'contentId' | 'relatedContentType'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<MediaItemDTO>> {
    if (!contentId || typeof contentId !== 'string') {
      throw new Error('Content ID is required and must be a string');
    }

    return this.getMediaList(
      { ...params, contentId, relatedContentType },
      options
    );
  }

  /**
   * Build CDN URL for media with transformations
   */
  buildMediaCdnUrl(
    mediaId: string,
    transformParams?: MediaTransformParams
  ): string {
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const path = `/media/${encodeURIComponent(mediaId)}`;
    return this.buildCdnUrl(path, transformParams);
  }

  /**
   * Build thumbnail URL
   */
  buildThumbnailUrl(
    mediaId: string,
    size: { width: number; height: number } = { width: 150, height: 150 }
  ): string {
    return this.buildMediaCdnUrl(mediaId, {
      width: size.width,
      height: size.height,
      crop: 'fill',
      format: 'webp',
    });
  }

  /**
   * Build responsive image URLs
   */
  buildResponsiveImageUrls(
    mediaId: string,
    breakpoints: number[] = [320, 480, 768, 1024, 1280, 1920]
  ): { [key: number]: string } {
    const urls: { [key: number]: string } = {};

    breakpoints.forEach((width) => {
      urls[width] = this.buildMediaCdnUrl(mediaId, {
        width,
        format: 'webp',
        quality: 85,
      });
    });

    return urls;
  }

  /**
   * Generate srcset for responsive images
   */
  generateSrcSet(
    mediaId: string,
    breakpoints: number[] = [320, 480, 768, 1024, 1280, 1920]
  ): string {
    const urls = this.buildResponsiveImageUrls(mediaId, breakpoints);

    return Object.entries(urls)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ');
  }

  /**
   * Validate upload request
   */
  private validateUploadRequest(request: MediaUploadRequest): void {
    if (!request.file) {
      throw new Error('File is required for upload');
    }

    if (!request.authorId || typeof request.authorId !== 'string') {
      throw new Error('Author ID is required and must be a string');
    }

    if (!request.purpose || typeof request.purpose !== 'string') {
      throw new Error('Purpose is required and must be a string');
    }

    const validPurposes = [
      'profile',
      'cover',
      'gallery',
      'featured',
      'content',
      'thumbnail',
    ];
    if (!validPurposes.includes(request.purpose)) {
      throw new Error(`Purpose must be one of: ${validPurposes.join(', ')}`);
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (request.file.size > maxSize) {
      throw new Error('File size must be less than 100MB');
    }
  }

  /**
   * Validate metadata update request
   */
  private validateMetadataUpdateRequest(
    request: MediaMetadataUpdateRequest
  ): void {
    if (!request.id || typeof request.id !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    if (request.purpose) {
      const validPurposes = [
        'profile',
        'cover',
        'gallery',
        'featured',
        'content',
        'thumbnail',
      ];
      if (!validPurposes.includes(request.purpose)) {
        throw new Error(`Purpose must be one of: ${validPurposes.join(', ')}`);
      }
    }
  }

  /**
   * Validate bulk request
   */
  private validateBulkRequest(request: BulkMediaRequest): void {
    if (
      !request.mediaIds ||
      !Array.isArray(request.mediaIds) ||
      request.mediaIds.length === 0
    ) {
      throw new Error('mediaIds is required and must be a non-empty array');
    }

    if (request.mediaIds.some((id) => !id || typeof id !== 'string')) {
      throw new Error('All media IDs must be non-empty strings');
    }

    const validOperations = ['delete', 'archive', 'restore'];
    if (!request.operation || !validOperations.includes(request.operation)) {
      throw new Error(
        `Operation must be one of: ${validOperations.join(', ')}`
      );
    }

    // Limit bulk operations to 100 items
    if (request.mediaIds.length > 100) {
      throw new Error('Bulk operations are limited to 100 items at a time');
    }
  }
}
