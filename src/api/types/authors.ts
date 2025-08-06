/**
 * Author-related TypeScript types
 * Based on Azure Functions Author models
 */

// Import MediaItemDTO from base types
import { MediaItemDTO } from './base';

/**
 * Author model for internal use
 * Maps to AuthorModel.cs in Azure Functions
 */
export interface AuthorModel {
  authorSlug: string; // from PartitionKey, e.g. "terence-waters"
  firstName: string; // e.g. "Terence"
  lastName: string; // e.g. "Waters"
  email: string; // e.g. "terence@waters.com"
  username: string;
  displayName: string;
  location?: string; // e.g. "San Francisco, CA"
  bio?: string;
  website?: string;
  twitterHandle?: string; // e.g. "@terencewaters"
  instagramHandle?: string; // e.g. "@terencewaters"
  linkedInHandle?: string; // e.g. "https://linkedin.com/in/terencewaters"
  blueskyHandle?: string; // e.g. "@terencewaters.bsky.social"

  // Media properties
  profileImageId?: string; // The MediaId of the profile image
  profileImageBlobContainer?: string;
  profileImageFileName?: string; // e.g. "terence-waters.jpg"
  profileImageCdnUrl?: string;
  thumbnailCdnUrl?: string; // fallback if null
  mediaReferencesJson: string; // JSON array of MediaIds

  hasValidProfileImage: boolean; // Indicates if the profile image is valid and available
  imageContentType?: string;
  imageSizeBytes?: number;

  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Author DTO for API responses
 * Maps to AuthorDTO.cs in Azure Functions
 */
export interface AuthorDTO {
  authorSlug: string; // e.g. "terence-waters"
  displayName: string; // e.g. "terencewaters"
  firstName: string; // e.g. "Terence"
  lastName: string; // e.g. "Waters"
  email: string; // e.g. "terence.waters@example.com"
  username: string; // e.g. "terencewaters"

  // Optional properties
  location?: string; // e.g. "San Francisco, CA"
  bio?: string; // e.g. "Software Engineer with a passion for open source."
  website?: string; // e.g. "https://terencewaters.com"
  twitterHandle?: string; // e.g. "@terencewaters"
  instagramHandle?: string; // e.g. "@terencewaters"
  linkedInHandle?: string; // e.g. "https://www.linkedin.com/in/terencewaters"
  blueskyHandle?: string; // e.g. "@terencewaters.bsky.social"

  // Media properties
  hasValidProfileImage: boolean; // Indicates if the profile image is valid and available
  profileImageId?: string; // The MediaId of the profile image
  profileImageFileName?: string; // e.g. "terence-waters.jpg"
  profileImageCdnUrl?: string; // e.g. "https://example.com/images/terence-waters.jpg"
  thumbnailCdnUrl?: string; // e.g. "https://example.com/images/terence-waters-thumbnail.jpg"
  mediaReferencesJson: string; // JSON array of MediaIds
}

/**
 * Author with media DTO for API responses that include media details
 * Maps to AuthorWithMediaDTO.cs in Azure Functions
 */
export interface AuthorWithMediaDTO extends AuthorDTO {
  mediaItems: MediaItemDTO[];
}

/**
 * Create/Update Author request payload
 */
export interface CreateAuthorRequest {
  authorSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  displayName: string;
  location?: string;
  bio?: string;
  website?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  linkedInHandle?: string;
  blueskyHandle?: string;
}

/**
 * Update Author request payload (all fields optional except slug)
 */
export interface UpdateAuthorRequest {
  authorSlug: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  displayName?: string;
  location?: string;
  bio?: string;
  website?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  linkedInHandle?: string;
  blueskyHandle?: string;
}
