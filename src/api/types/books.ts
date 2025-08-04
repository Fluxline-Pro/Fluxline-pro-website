/**
 * Books-related TypeScript types
 * Based on Azure Functions Books models
 */

import { BaseContentModel, MediaItemDTO } from './base';

/**
 * Book model for internal use
 * Maps to BookModel.cs in Azure Functions (inherits from BaseContentModel)
 */
export interface BookModel extends BaseContentModel {
  // Book-specific properties can be added here if needed in the future
  // Currently inherits all properties from BaseContentModel
}

/**
 * Book DTO for API responses
 * Maps to BookDTO.cs in Azure Functions
 */
export interface BookDTO {
  id: string;
  partitionKey: string;
  rowKey: string;
  timestamp?: string; // ISO string
  title: string;
  authorSlug: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  status: 'Draft' | 'Published' | 'Archived';

  // Media references (storing IDs that point to media services)
  featuredImageId?: string; // Reference to primary image in ImageService
  featuredMediaId?: string; // Reference to primary media in MediaService
  featuredVideoId?: string; // Reference to primary video in VideoService
  mediaReferencesJson: string; // Array of media IDs for additional attachments

  publishDate: string; // ISO string
  lastModified: string; // ISO string
  tagsList: string[];
}

/**
 * Book with media DTO for API responses that include media details
 * Maps to BookWithMediaDTO.cs in Azure Functions
 */
export interface BookWithMediaDTO {
  book: BookDTO;
  mediaItems: MediaItemDTO[];
  featuredImage?: MediaItemDTO;
  featuredVideo?: MediaItemDTO;
  featuredMedia?: MediaItemDTO;
}

/**
 * Create Book request payload
 */
export interface CreateBookRequest {
  title: string;
  authorSlug: string;
  description?: string;
  content: string;
  slug: string;
  category: string;
  status?: 'Draft' | 'Published' | 'Archived';
  featuredImageId?: string;
  featuredMediaId?: string;
  featuredVideoId?: string;
  publishDate?: string; // ISO string
  tagsList: string[];
}

/**
 * Update Book request payload (all fields optional except slug)
 */
export interface UpdateBookRequest {
  id?: string;
  slug: string;
  title?: string;
  authorSlug?: string;
  description?: string;
  content?: string;
  category?: string;
  status?: 'Draft' | 'Published' | 'Archived';
  featuredImageId?: string;
  featuredMediaId?: string;
  featuredVideoId?: string;
  publishDate?: string; // ISO string
  tagsList?: string[];
}

/**
 * Book list query parameters
 */
export interface BookListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  status?: 'Draft' | 'Published' | 'Archived';
  authorSlug?: string;
  tags?: string[];
  searchTerm?: string;
  sortBy?: 'publishDate' | 'lastModified' | 'title';
  sortOrder?: 'asc' | 'desc';
  includeMedia?: boolean;
  isPublished?: boolean;
  limit?: number;
}

/**
 * Book single query parameters
 */
export interface BookQueryParams {
  includeMedia?: boolean;
  isPublished?: boolean;
}

/**
 * Set media reference request
 */
export interface SetMediaReferenceRequest {
  mediaId: string;
}
