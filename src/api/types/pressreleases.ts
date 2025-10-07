/**
 * PressRelease-related TypeScript types
 * Based on Azure Functions models - mirrors BlogPost structure
 */

import { BaseContentModel, MediaItemDTO } from './base';

/**
 * Press Release model for internal use
 * Maps to PressReleaseModel.cs in Azure Functions (inherits from BaseContentModel)
 */
export interface PressReleaseModel extends BaseContentModel {
  // Press release-specific properties can be added here if needed in the future
  // Currently inherits all properties from BaseContentModel
}

/**
 * Press Release DTO for API responses
 * Maps to PressReleaseDTO.cs in Azure Functions
 */
export interface PressReleaseDTO {
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
  featuredImageId?: string;    // Reference to primary image in ImageService
  featuredMediaId?: string;    // Reference to primary media in MediaService
  featuredVideoId?: string;    // Reference to primary video in VideoService
  mediaReferencesJson: string; // Array of media IDs for additional attachments
  
  publishDate: string;  // ISO string
  lastModified: string; // ISO string
  tagsList: string[];
  isPublished: string; // Indicates if the press release is published
}

/**
 * Press Release with media DTO for API responses that include media details
 * Maps to PressReleaseWithMediaDTO.cs in Azure Functions
 */
export interface PressReleaseWithMediaDTO extends PressReleaseDTO {
  mediaItems: MediaItemDTO[];
  featuredImage?: MediaItemDTO;
  featuredMedia?: MediaItemDTO;
  featuredVideo?: MediaItemDTO;
}

/**
 * Create Press Release request payload
 */
export interface CreatePressReleaseRequest {
  title: string;
  authorSlug: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  status: 'Draft' | 'Published' | 'Archived';
  featuredImageId?: string;
  featuredMediaId?: string;
  featuredVideoId?: string;
  publishDate: string;  // ISO string
  tagsList: string[];
}

/**
 * Update Press Release request payload (all fields optional except id/slug)
 */
export interface UpdatePressReleaseRequest {
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
  publishDate?: string;  // ISO string
  tagsList?: string[];
}

/**
 * Press Release list query parameters
 */
export interface PressReleaseListParams {
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
}

/**
 * Press Release single query parameters
 */
export interface PressReleaseQueryParams {
  includeMedia?: boolean;
  includeDrafts?: boolean;
}
