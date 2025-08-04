/**
 * BlogPosts API Client
 * Handles all blog post-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  BlogPostDTO,
  BlogPostWithMediaDTO,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  BlogPostListParams,
  BlogPostQueryParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class BlogPostsApiClient extends BaseApiClient {
  /**
   * Get all blog posts
   * Endpoint: GET /posts
   */
  async getBlogPosts(
    params?: BlogPostListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    const endpoint = '/posts';
    return this.get<(BlogPostDTO | BlogPostWithMediaDTO)[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>>;
  }

  /**
   * Get a single blog post by slug
   * Endpoint: GET /posts/{slug}
   */
  async getBlogPost(
    slug: string,
    params?: BlogPostQueryParams,
    options?: RequestOptions
  ): Promise<ApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Blog post slug is required and must be a string');
    }

    const endpoint = `/posts/${encodeURIComponent(slug)}`;
    return this.get<BlogPostDTO | BlogPostWithMediaDTO>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Create a new blog post
   * Endpoint: POST /posts
   */
  async createBlogPost(
    blogPostData: CreateBlogPostRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<BlogPostDTO>> {
    this.validateCreateBlogPostRequest(blogPostData);

    const endpoint = '/posts';
    return this.post<BlogPostDTO>(endpoint, blogPostData, options);
  }

  /**
   * Update an existing blog post
   * Endpoint: POST /posts (upsert operation)
   */
  async updateBlogPost(
    blogPostData: UpdateBlogPostRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<BlogPostDTO>> {
    this.validateUpdateBlogPostRequest(blogPostData);

    const endpoint = '/posts';
    return this.post<BlogPostDTO>(endpoint, blogPostData, options);
  }

  /**
   * Upsert blog post (create or update)
   * Endpoint: POST /posts
   */
  async upsertBlogPost(
    blogPostData: CreateBlogPostRequest | UpdateBlogPostRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<BlogPostDTO>> {
    // Validate based on whether this looks like a create or update
    if (this.isCreateRequest(blogPostData)) {
      this.validateCreateBlogPostRequest(blogPostData as CreateBlogPostRequest);
    } else {
      this.validateUpdateBlogPostRequest(blogPostData as UpdateBlogPostRequest);
    }

    const endpoint = '/posts';
    return this.post<BlogPostDTO>(endpoint, blogPostData, options);
  }

  /**
   * Delete a blog post
   * Endpoint: DELETE /posts/{slug}
   */
  async deleteBlogPost(
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Blog post slug is required and must be a string');
    }

    const endpoint = `/posts/${encodeURIComponent(slug)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Upload media for a blog post
   * Endpoint: POST /posts/{slug}/media
   */
  async uploadBlogPostMedia(
    slug: string,
    file: File,
    mediaType: 'featured' | 'content' | 'gallery',
    onProgress?: (progress: {
      loaded: number;
      total: number;
      percentage: number;
    }) => void,
    options?: RequestOptions
  ): Promise<ApiResponse<BlogPostDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Blog post slug is required and must be a string');
    }

    if (!file) {
      throw new Error('File is required for upload');
    }

    const endpoint = `/posts/${encodeURIComponent(slug)}/media`;
    return this.uploadFile<BlogPostDTO>(
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
   * Get blog posts by category
   */
  async getBlogPostsByCategory(
    category: string,
    params?: Omit<BlogPostListParams, 'category'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    return this.getBlogPosts({ ...params, category }, options);
  }

  /**
   * Get blog posts by author
   */
  async getBlogPostsByAuthor(
    authorSlug: string,
    params?: Omit<BlogPostListParams, 'authorSlug'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    return this.getBlogPosts({ ...params, authorSlug }, options);
  }

  /**
   * Get blog posts by tags
   */
  async getBlogPostsByTags(
    tags: string[],
    params?: Omit<BlogPostListParams, 'tags'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    return this.getBlogPosts({ ...params, tags }, options);
  }

  /**
   * Search blog posts
   */
  async searchBlogPosts(
    searchTerm: string,
    params?: Omit<BlogPostListParams, 'searchTerm'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BlogPostDTO | BlogPostWithMediaDTO>> {
    return this.getBlogPosts({ ...params, searchTerm }, options);
  }

  /**
   * Validate create blog post request
   */
  private validateCreateBlogPostRequest(data: CreateBlogPostRequest): void {
    const requiredFields = [
      'title',
      'authorSlug',
      'description',
      'content',
      'slug',
      'category',
      'publishDate',
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof CreateBlogPostRequest]) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate slug format (alphanumeric with hyphens)
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
      throw new Error(
        'Slug must contain only lowercase letters, numbers, and hyphens'
      );
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
   * Validate update blog post request
   */
  private validateUpdateBlogPostRequest(data: UpdateBlogPostRequest): void {
    if (!data.slug || typeof data.slug !== 'string') {
      throw new Error('slug is required for updates');
    }

    // Validate slug format if provided
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      throw new Error(
        'Slug must contain only lowercase letters, numbers, and hyphens'
      );
    }

    // Validate status if provided
    if (
      data.status &&
      !['Draft', 'Published', 'Archived'].includes(data.status)
    ) {
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
  private isCreateRequest(
    data: CreateBlogPostRequest | UpdateBlogPostRequest
  ): boolean {
    const createFields = [
      'title',
      'authorSlug',
      'description',
      'content',
      'category',
      'publishDate',
    ];
    return createFields.every(
      (field) =>
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
  private getMediaTypeFromFile(
    file: File
  ): 'image' | 'video' | 'audio' | 'document' {
    const mimeType = file.type;

    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  }
}
