/**
 * BlogPost-related TypeScript types
 * Based on Azure Functions BlogPost models
 */

import { BaseContentModel, MediaItemDTO } from './base';

/**
 * Blog Post model for internal use
 * Maps to BlogPostModel.cs in Azure Functions (inherits from BaseContentModel)
 */
export interface BlogPostModel extends BaseContentModel {
  // Blog-specific properties can be added here if needed in the future
  // Currently inherits all properties from BaseContentModel
}

/**
 * Blog Post DTO for API responses
 * Maps to BlogPostDTO.cs in Azure Functions
 */
export interface BlogPostDTO {
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
  isPublished: string; // Indicates if the post is published
}

/**
 * Blog Post with media DTO for API responses that include media details
 * Maps to BlogPostWithMediaDTO.cs in Azure Functions
 */
export interface BlogPostWithMediaDTO extends BlogPostDTO {
  mediaItems: MediaItemDTO[];
  featuredImage?: MediaItemDTO;
  featuredMedia?: MediaItemDTO;
  featuredVideo?: MediaItemDTO;
}

/**
 * Create Blog Post request payload
 */
export interface CreateBlogPostRequest {
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
 * Update Blog Post request payload (all fields optional except id/slug)
 */
export interface UpdateBlogPostRequest {
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
 * Blog Post list query parameters
 */
export interface BlogPostListParams {
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
 * Blog Post single query parameters
 */
export interface BlogPostQueryParams {
  includeMedia?: boolean;
  includeDrafts?: boolean;
}