/**
 * Books API Client
 * Handles all book-related API operations
 */

import { BaseApiClient } from './base-client';
import {
  BookDTO,
  BookWithMediaDTO,
  CreateBookRequest,
  UpdateBookRequest,
  BookListParams,
  BookQueryParams,
  ApiResponse,
  PaginatedApiResponse,
  RequestOptions,
} from '../types';

export class BooksApiClient extends BaseApiClient {
  /**
   * Get all books
   * Endpoint: GET /books
   */
  async getBooks(
    params?: BookListParams,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>> {
    const endpoint = '/books';
    return this.get<(BookDTO | BookWithMediaDTO)[]>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    }) as Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>>;
  }

  /**
   * Get a single book by slug
   * Endpoint: GET /books/{slug}
   */
  async getBook(
    slug: string,
    params?: BookQueryParams,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO | BookWithMediaDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}`;
    return this.get<BookDTO | BookWithMediaDTO>(endpoint, {
      ...options,
      params: {
        ...params,
        ...options?.params,
      },
    });
  }

  /**
   * Create or update a book (upsert)
   * Endpoint: POST/PUT /books/{slug}
   */
  async upsertBook(
    slug: string,
    bookData: CreateBookRequest | UpdateBookRequest,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    // Validate based on whether this looks like a create or update
    if (this.isCreateRequest(bookData)) {
      this.validateCreateBookRequest(bookData as CreateBookRequest);
    } else {
      this.validateUpdateBookRequest(bookData as UpdateBookRequest);
    }

    const endpoint = `/books/${encodeURIComponent(slug)}`;
    return this.post<BookDTO>(endpoint, bookData, options);
  }

  /**
   * Delete a book
   * Endpoint: DELETE /books/{slug}
   */
  async deleteBook(
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}`;
    return this.delete<void>(endpoint, options);
  }

  /**
   * Set featured image for a book
   * Endpoint: POST /books/{slug}/featured-image
   */
  async setBookFeaturedImage(
    slug: string,
    mediaId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}/featured-image`;
    return this.post<BookDTO>(endpoint, { mediaId }, options);
  }

  /**
   * Set featured video for a book
   * Endpoint: POST /books/{slug}/featured-video
   */
  async setBookFeaturedVideo(
    slug: string,
    mediaId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}/featured-video`;
    return this.post<BookDTO>(endpoint, { mediaId }, options);
  }

  /**
   * Set featured media for a book
   * Endpoint: POST /books/{slug}/featured-media
   */
  async setBookFeaturedMedia(
    slug: string,
    mediaId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}/featured-media`;
    return this.post<BookDTO>(endpoint, { mediaId }, options);
  }

  /**
   * Add media reference to a book
   * Endpoint: POST /books/{slug}/media
   */
  async addBookMediaReference(
    slug: string,
    mediaId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}/media`;
    return this.post<BookDTO>(endpoint, { mediaId }, options);
  }

  /**
   * Remove media reference from a book
   * Endpoint: DELETE /books/{slug}/media/{mediaId}
   */
  async removeBookMediaReference(
    slug: string,
    mediaId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<BookDTO>> {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Book slug is required and must be a string');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Media ID is required and must be a string');
    }

    const endpoint = `/books/${encodeURIComponent(slug)}/media/${encodeURIComponent(mediaId)}`;
    return this.delete<BookDTO>(endpoint, options);
  }

  /**
   * Get books by category
   */
  async getBooksByCategory(
    category: string,
    params?: Omit<BookListParams, 'category'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>> {
    return this.getBooks({ ...params, category }, options);
  }

  /**
   * Get books by author
   */
  async getBooksByAuthor(
    authorSlug: string,
    params?: Omit<BookListParams, 'authorSlug'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>> {
    return this.getBooks({ ...params, authorSlug }, options);
  }

  /**
   * Get books by tags
   */
  async getBooksByTags(
    tags: string[],
    params?: Omit<BookListParams, 'tags'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>> {
    return this.getBooks({ ...params, tags }, options);
  }

  /**
   * Search books
   */
  async searchBooks(
    searchTerm: string,
    params?: Omit<BookListParams, 'searchTerm'>,
    options?: RequestOptions
  ): Promise<PaginatedApiResponse<BookDTO | BookWithMediaDTO>> {
    return this.getBooks({ ...params, searchTerm }, options);
  }

  /**
   * Validate create book request
   */
  private validateCreateBookRequest(data: CreateBookRequest): void {
    const requiredFields = [
      'title',
      'authorSlug',
      'content',
      'category',
      'tagsList',
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof CreateBookRequest]) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate slug format (alphanumeric with hyphens)
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      throw new Error(
        'Slug must contain only lowercase letters, numbers, and hyphens'
      );
    }

    // Validate status
    if (
      data.status &&
      !['Draft', 'Published', 'Archived'].includes(data.status)
    ) {
      throw new Error('Status must be Draft, Published, or Archived');
    }

    // Validate publish date
    if (data.publishDate && !this.isValidDate(data.publishDate)) {
      throw new Error('Invalid publish date format');
    }

    // Validate tags array
    if (data.tagsList && !Array.isArray(data.tagsList)) {
      throw new Error('tagsList must be an array of strings');
    }
  }

  /**
   * Validate update book request
   */
  private validateUpdateBookRequest(data: UpdateBookRequest): void {
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
    data: CreateBookRequest | UpdateBookRequest
  ): boolean {
    const createFields = [
      'title',
      'authorSlug',
      'content',
      'category',
      'tagsList',
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
}
