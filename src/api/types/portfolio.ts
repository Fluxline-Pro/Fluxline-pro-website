/**
 * PortfolioPiece-related TypeScript types
 * Based on Azure Functions PortfolioPiece models
 */

import { BaseContentModel, MediaItemDTO } from './base';

/**
 * Portfolio Piece model for internal use
 * Maps to PortfolioPieceModel.cs in Azure Functions (inherits from BaseContentModel)
 */
export interface PortfolioPieceModel extends BaseContentModel {
  // Portfolio-specific properties can be added here if needed in the future
  // Currently inherits all properties from BaseContentModel
}

/**
 * Portfolio Piece DTO for API responses
 * Maps to PortfolioPieceDTO.cs in Azure Functions
 */
export interface PortfolioPieceDTO {
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
}

/**
 * Portfolio Piece with media DTO for API responses that include media details
 * Maps to PortfolioPieceWithMediaDTO.cs in Azure Functions
 */
export interface PortfolioPieceWithMediaDTO extends PortfolioPieceDTO {
  mediaItems: MediaItemDTO[];
  featuredImage?: MediaItemDTO;
  featuredMedia?: MediaItemDTO;
  featuredVideo?: MediaItemDTO;
}

/**
 * Create Portfolio Piece request payload
 */
export interface CreatePortfolioPieceRequest {
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
 * Update Portfolio Piece request payload (all fields optional except id/slug)
 */
export interface UpdatePortfolioPieceRequest {
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
 * Portfolio Piece list query parameters
 */
export interface PortfolioPieceListParams {
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
 * Portfolio Piece single query parameters
 */
export interface PortfolioPieceQueryParams {
  includeMedia?: boolean;
  includeDrafts?: boolean;
}