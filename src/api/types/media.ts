/**
 * Media-related TypeScript types
 * Based on Azure Functions Media models
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MediaItemModel, MediaItemDTO } from './base';

/**
 * Media upload request payload
 */
export interface MediaUploadRequest {
  file: File | Blob;
  authorId: string;
  purpose:
    | 'profile'
    | 'cover'
    | 'gallery'
    | 'featured'
    | 'content'
    | 'thumbnail';
  description?: string;
  altText?: string;
  contentId?: string; // ID of the related content (blog post, portfolio piece, etc.)
  relatedContentType?: string; // Type of content this media is related to
}

/**
 * Media upload response
 */
export interface MediaUploadResponse {
  mediaItem: MediaItemDTO;
  uploadUrl: string;
  success: boolean;
  message?: string;
}

/**
 * Media upload progress callback
 */
export interface MediaUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Media list query parameters
 */
export interface MediaListParams {
  page?: number;
  pageSize?: number;
  authorId?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
  purpose?:
    | 'profile'
    | 'cover'
    | 'gallery'
    | 'featured'
    | 'content'
    | 'thumbnail';
  contentId?: string;
  relatedContentType?: string;
  sortBy?: 'uploadedAt' | 'filename' | 'sizeBytes';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Media transformation parameters
 */
export interface MediaTransformParams {
  width?: number;
  height?: number;
  quality?: number; // 1-100 for images
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
}

/**
 * Media metadata update request
 */
export interface MediaMetadataUpdateRequest {
  id: string;
  description?: string;
  altText?: string;
  purpose?:
    | 'profile'
    | 'cover'
    | 'gallery'
    | 'featured'
    | 'content'
    | 'thumbnail';
  contentId?: string;
  relatedContentType?: string;
}

/**
 * Bulk media operation request
 */
export interface BulkMediaRequest {
  mediaIds: string[];
  operation: 'delete' | 'archive' | 'restore';
  targetContentId?: string; // For bulk association operations
}

/**
 * Media CDN URL builder parameters
 */
export interface MediaCdnParams extends MediaTransformParams {
  mediaId: string;
  timestamp?: number; // Cache busting
}

// Re-export from base for convenience
export type { MediaItemModel, MediaItemDTO } from './base';
