/**
 * Base TypeScript types for API models
 * Based on Azure Functions C# models
 */

/**
 * Base content model that all content types inherit from
 * Maps to BaseContentModel.cs in Azure Functions
 */
export interface BaseContentModel {
  // Storage identifiers
  id: string;
  partitionKey: string;
  rowKey: string;
  timestamp?: string; // ISO string
  eTag?: string;

  // Core content properties
  title: string;
  authorSlug: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  status: 'Draft' | 'Published' | 'Archived';

  // Media references (storing IDs that point to media services)
  featuredImageId?: string;    // Reference to primary image in ImageService
  featuredMediaId?: string;    // Reference to primary media in MediaService
  featuredVideoId?: string;    // Reference to primary video in VideoService
  mediaReferencesJson: string; // JSON string array of media IDs for additional attachments

  // Date properties
  publishDate: string;  // ISO string
  lastModified: string; // ISO string

  // Tags as array (for API/business logic)
  tagsList: string[];

  // Computed properties
  isPublished: boolean;
}

/**
 * Media item model for all media types
 * Maps to MediaItemModel.cs in Azure Functions
 */
export interface MediaItemModel {
  // Core identification properties
  id: string;
  authorId: string;

  // Media content properties
  filename: string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
  purpose: 'profile' | 'cover' | 'gallery' | 'featured' | 'content' | 'thumbnail';
  contentType: string; // MIME type (e.g., "image/jpeg", "video/mp4")

  // URLs and presentation
  url: string;          // Full-size media URL
  thumbnailUrl: string; // Thumbnail URL

  // Metadata
  description: string;
  altText: string;
  width: number;
  height: number;
  sizeBytes: number;
  resolution: string; // For images: "96dpi", for videos: "1080p", etc.

  // Timestamps
  uploadedAt: string; // ISO string
  lastModified: string; // ISO string

  // Relationship tracking
  contentId: string;        // ID of the related content (blog post, portfolio piece, etc.)
  relatedContentType: string; // Type of content this media is related to

  // Type-specific properties
  // For images
  imagePurpose: string; // More specific image purposes

  // For videos
  duration: number;     // In seconds
  videoQuality: string; // "SD", "HD", "4K", etc.

  // For audio
  audioDuration: number; // In seconds
  audioBitrate: string;

  // Future extensibility
  metadataJson: string; // Additional metadata as JSON
}

/**
 * Media Item DTO for API responses
 */
export interface MediaItemDTO {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string;
  contentType: string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
  description: string;
  altText: string;
  width: number;
  height: number;
  sizeBytes: number;
  uploadedAt: string;
}

/**
 * API Error response structure
 */
export interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
  timestamp: string;
}

/**
 * API Response wrapper for successful responses
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMetadata {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated API response
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMetadata;
}