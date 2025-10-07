# API Layer Documentation

This document provides comprehensive documentation for the API layer and Zustand store implementation for the Terence Waters website content management system.

## Overview

The API layer provides a robust interface to interact with Azure Functions backend services, supporting Authors, Blog Posts, Portfolio Pieces, Books, Contact Form submissions, GitHub repositories, and Media management. It includes TypeScript types, API clients, Zustand stores, and React hooks for seamless integration.

## Important Note

These reference TerenceWaters.com, as its code base was used to incorporate Fluxline.pro's underlying code and deployment. Once APIs and backend data services are implemented for the site, this README, along with all URLs and staticwebapp.config.json apps and objects, will need to be configured with Fluxline.pro's URL settings and API endpoints. -TW 10/07/2025

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [API Client Configuration](#api-client-configuration)
3. [Type System](#type-system)
4. [API Clients](#api-clients)
5. [Zustand Stores](#zustand-stores)
6. [React Hooks](#react-hooks)
7. [Usage Examples](#usage-examples)
8. [Error Handling](#error-handling)
9. [Caching Strategy](#caching-strategy)
10. [Testing](#testing)

## Installation & Setup

### Environment Variables

Set the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.terencewaters.com
NEXT_PUBLIC_CDN_BASE_URL=https://twmedia-cdn.azureedge.net
NEXT_PUBLIC_API_KEY=your-api-key-here
NEXT_PUBLIC_ENVIRONMENT=production
```

### Environment-Specific URLs

- **Development**: `https://mock-dev-api.terencewaters.com`
- **Staging**: `https://mock-tst-api.terencewaters.com`
- **Production**: `https://api.terencewaters.com`

### Initialization

```typescript
import { initializeApiClient } from './api';

// Initialize with environment variables
const apiClient = initializeApiClient();

// Or initialize with custom configuration
const apiClient = initializeApiClient({
  baseUrl: 'https://api.terencewaters.com',
  apiKey: 'your-api-key',
  cdnBaseUrl: 'https://twmedia-cdn.azureedge.net',
  environment: 'production',
});
```

## API Client Configuration

The API client supports various configuration options:

```typescript
interface ApiClientConfig {
  baseUrl: string; // API base URL
  apiKey: string; // X-Api-Key for authentication
  cdnBaseUrl: string; // CDN base URL for media
  environment: 'development' | 'staging' | 'production';
  timeout?: number; // Request timeout (default: 30000ms)
  retryAttempts?: number; // Retry attempts (default: 3)
  enableLogging?: boolean; // Enable request/response logging
}
```

## Type System

### Base Types

```typescript
// Base content model for all content types
interface BaseContentModel {
  id: string;
  partitionKey: string;
  rowKey: string;
  timestamp?: string;
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
  mediaReferencesJson: string;
  publishDate: string;
  lastModified: string;
  tagsList: string[];
  isPublished: boolean;
}

// Media item model
interface MediaItemModel {
  id: string;
  authorId: string;
  filename: string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
  purpose:
    | 'profile'
    | 'cover'
    | 'gallery'
    | 'featured'
    | 'content'
    | 'thumbnail';
  contentType: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  altText: string;
  width: number;
  height: number;
  sizeBytes: number;
  uploadedAt: string;
  // ... additional properties
}
```

### Content-Specific Types

```typescript
// Author types
interface AuthorDTO {
  authorSlug: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  location?: string;
  bio?: string;
  website?: string;
  profileImageCdnUrl?: string;
  // ... social handles and media properties
}

// Blog post types
interface BlogPostDTO extends BaseContentModel {
  // Inherits all base content properties
}

// Portfolio piece types
interface PortfolioPieceDTO extends BaseContentModel {
  // Inherits all base content properties
}

// Book types
interface BookDTO extends BaseContentModel {
  // Inherits all base content properties
}

// Book with media types
interface BookWithMediaDTO {
  book: BookDTO;
  mediaItems: MediaItemModel[];
  featuredImage?: MediaItemModel;
  featuredVideo?: MediaItemModel;
  featuredMedia?: MediaItemModel;
}

// Book request types
interface CreateBookRequest {
  title: string;
  authorSlug: string;
  description?: string;
  content: string;
  slug?: string;
  category: string;
  status?: string;
  featuredImageId?: string;
  featuredVideoId?: string;
  featuredMediaId?: string;
  publishDate?: string;
  tagsList: string[];
}

// Contact form types
interface ContactMeDTO {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// GitHub repository types
interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  url: string;
  language?: string;
  stargazersCount: number;
  forksCount: number;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  topics: string[];
  // ... additional properties
}
```

## API Clients

### Authors API Client

```typescript
const authorsClient = new AuthorsApiClient(config);

// Get all authors
const authors = await authorsClient.getAuthors({
  page: 1,
  pageSize: 10,
  includeMedia: true,
  sortBy: 'displayName',
  sortOrder: 'asc',
});

// Get single author
const author = await authorsClient.getAuthor('terence-waters', {
  includeMedia: true,
});

// Create author
const newAuthor = await authorsClient.createAuthor({
  authorSlug: 'john-doe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  username: 'johndoe',
  displayName: 'John Doe',
});

// Upload profile image
const updatedAuthor = await authorsClient.uploadProfileImage(
  'john-doe',
  file,
  (progress) => console.log(`Upload: ${progress.percentage}%`)
);
```

### Blog Posts API Client

```typescript
const blogPostsClient = new BlogPostsApiClient(config);

// Get all blog posts
const posts = await blogPostsClient.getBlogPosts({
  page: 1,
  pageSize: 10,
  status: 'Published',
  category: 'Technology',
  includeMedia: true,
});

// Get single blog post
const post = await blogPostsClient.getBlogPost('my-blog-post-slug');

// Create blog post
const newPost = await blogPostsClient.createBlogPost({
  title: 'My New Blog Post',
  slug: 'my-new-blog-post',
  authorSlug: 'terence-waters',
  description: 'This is a new blog post',
  content: 'Blog post content here...',
  category: 'Technology',
  status: 'Published',
  publishDate: new Date().toISOString(),
  tagsList: ['react', 'typescript'],
});

// Search blog posts
const searchResults = await blogPostsClient.searchBlogPosts('react typescript');
```

### Books API Client

```typescript
const booksClient = new BooksApiClient(config);

// Get all books
const books = await booksClient.getBooks({
  page: 1,
  pageSize: 10,
  status: 'Published',
  category: 'Fiction',
  includeMedia: true,
});

// Get single book
const book = await booksClient.getBook('my-amazing-book', {
  includeMedia: true,
});

// Create or update a book
const newBook = await booksClient.upsertBook('my-amazing-book', {
  title: 'My Amazing Book',
  authorSlug: 'terence-waters',
  description: 'This is a fantastic new book',
  content: 'Book content here...',
  category: 'Fiction',
  status: 'Published',
  tagsList: ['fantasy', 'adventure'],
});

// Delete a book
await booksClient.deleteBook('my-amazing-book');

// Media operations
await booksClient.setBookFeaturedImage('my-amazing-book', 'media-id-123');
await booksClient.setBookFeaturedVideo('my-amazing-book', 'media-id-456');
await booksClient.addBookMediaReference('my-amazing-book', 'media-id-789');
await booksClient.removeBookMediaReference('my-amazing-book', 'media-id-789');

// Filter books by category, author, or tags
const fictionBooks = await booksClient.getBooksByCategory('Fiction');
const authorBooks = await booksClient.getBooksByAuthor('terence-waters');
const taggedBooks = await booksClient.getBooksByTags(['fantasy', 'adventure']);

// Search books
const searchResults = await booksClient.searchBooks('fantasy adventure');
```

### Contact API Client

```typescript
const contactClient = new ContactApiClient(config);

// Submit contact form
const response = await contactClient.submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I would like to inquire about your services...',
});

// Response contains success status and message
if (response.success) {
  console.log('Form submitted successfully');
} else {
  console.error('Form submission failed:', response.error);
}
```

### Media API Client

```typescript
const mediaClient = new MediaApiClient(config);

// Upload media
const uploadResult = await mediaClient.uploadMedia(
  {
    file: selectedFile,
    authorId: 'author-id',
    purpose: 'featured',
    description: 'Featured image for blog post',
    altText: 'Description for accessibility',
  },
  (progress) => {
    console.log(`Upload progress: ${progress.percentage}%`);
  }
);

// Get media list
const mediaList = await mediaClient.getMediaList({
  page: 1,
  pageSize: 20,
  mediaType: 'image',
  purpose: 'featured',
});

// Build CDN URLs
const imageUrl = mediaClient.buildMediaCdnUrl('media-id', {
  width: 800,
  height: 600,
  format: 'webp',
  quality: 85,
});

// Generate responsive image URLs
const responsiveUrls = mediaClient.buildResponsiveImageUrls('media-id');
const srcSet = mediaClient.generateSrcSet('media-id');
```

## Zustand Stores

### Authors Store

```typescript
import { useAuthorsStore } from './store';

function AuthorsComponent() {
  const authorsStore = useAuthorsStore();

  // Fetch authors
  useEffect(() => {
    authorsStore.fetchAuthors({ page: 1, pageSize: 10 });
  }, []);

  // Access state
  const authors = authorsStore.getAllAuthors();
  const isLoading = authorsStore.isLoadingList;
  const error = authorsStore.error;

  // Get specific author
  const author = authorsStore.getAuthor('terence-waters');

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {authors.map(author => (
        <div key={author.authorSlug}>{author.displayName}</div>
      ))}
    </div>
  );
}
```

### Blog Posts Store

```typescript
import { useBlogPostsStore } from './store';

function BlogPostsComponent() {
  const blogPostsStore = useBlogPostsStore();

  // Fetch published posts
  useEffect(() => {
    blogPostsStore.fetchBlogPosts({
      status: 'Published',
      sortBy: 'publishDate',
      sortOrder: 'desc'
    });
  }, []);

  // Access different views
  const allPosts = blogPostsStore.getAllBlogPosts();
  const publishedPosts = blogPostsStore.getPublishedBlogPosts();
  const techPosts = blogPostsStore.getBlogPostsByCategory('Technology');

  // Search functionality
  const searchPosts = (term: string) => {
    blogPostsStore.searchBlogPosts(term);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => searchPosts(e.target.value)}
        placeholder="Search posts..."
      />
      {publishedPosts.map(post => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </article>
      ))}
    </div>
  );
}
```

### Books Store

```typescript
import { useBooksStore } from './store';

function BooksComponent() {
  const booksStore = useBooksStore();

  // Fetch published books
  useEffect(() => {
    booksStore.fetchBooks({
      status: 'Published',
      category: 'Fiction',
      includeMedia: true
    });
  }, []);

  // Access different views
  const allBooks = booksStore.getAllBooks();
  const publishedBooks = booksStore.getPublishedBooks();
  const fictionBooks = booksStore.getBooksInCategory('Fiction');
  const booksByAuthor = booksStore.getBooksByAuthorSlug('terence-waters');
  const booksByTag = booksStore.getBooksByTag('fantasy');

  // Fetch a specific book
  const handleBookClick = (slug: string) => {
    booksStore.fetchBook(slug, true); // true = includeMedia
  };

  // Book operations
  const handleFeaturedImage = async (slug: string, mediaId: string) => {
    const success = await booksStore.setBookFeaturedImage(slug, mediaId);
    if (success) {
      console.log('Featured image updated');
    }
  };

  return (
    <div>
      {publishedBooks.map(book => (
        <article key={book.slug} onClick={() => handleBookClick(book.slug)}>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <div>Tags: {book.tagsList.join(', ')}</div>
        </article>
      ))}
    </div>
  );
}
```

### Contact Store

```typescript
import { useContactStore } from './store';

function ContactForm() {
  const contactStore = useContactStore();

  // Form state and actions
  const { formData, isSubmitting, submitSuccess, error } = contactStore;

  // Update form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    contactStore.setFormData({ [name]: value });
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await contactStore.submitContactForm();

    if (success) {
      // Form submitted successfully
      contactStore.resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          required
        />
      </div>

      {error && <div className="error">{error}</div>}
      {submitSuccess && <div className="success">Message sent successfully!</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## React Hooks

### Pre-built Hooks for Common Operations

```typescript
import {
  useAuthorData,
  useAuthorsData,
  useBlogPostData,
  useBlogPostsData,
  useGitHubRepositoriesData,
  useBookData,
  useBooksData,
  useMediaUpload
} from './hooks';

// Single author hook
function AuthorProfile({ slug }: { slug: string }) {
  const { author, isLoading, error, refetch } = useAuthorData(slug, true);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!author) return <div>Author not found</div>;

  return (
    <div>
      <h1>{author.displayName}</h1>
      <p>{author.bio}</p>
      {author.profileImageCdnUrl && (
        <img src={author.profileImageCdnUrl} alt={author.displayName} />
      )}
    </div>
  );
}

// Authors list hook
function AuthorsList() {
  const { authors, isLoading, pagination, refetch } = useAuthorsData({
    pageSize: 12,
    sortBy: 'displayName'
  });

  return (
    <div>
      {authors.map(author => (
        <div key={author.authorSlug}>{author.displayName}</div>
      ))}
      {pagination.hasNextPage && (
        <button onClick={() => refetch()}>Load More</button>
      )}
    </div>
  );
}

// Books hook
function BooksList() {
  const { books, isLoading, pagination, refetch } = useBooksData({
    pageSize: 12,
    status: 'Published',
    category: 'Fiction'
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading books...</div>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <div key={book.slug} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </div>
          ))}
          {pagination.hasNextPage && (
            <button onClick={() => refetch()}>Load More</button>
          )}
        </div>
      )}
    </div>
  );
}

// Single book hook
function BookDetail({ slug }: { slug: string }) {
  const { book, isLoading, error, refetch } = useBookData(slug, true);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  // Access media if available
  const featuredImage = book.featuredImageId && 'mediaItems' in book ?
    book.mediaItems.find(m => m.id === book.featuredImageId) :
    null;

  return (
    <div className="book-detail">
      {featuredImage && <img src={featuredImage.url} alt={book.title} />}
      <h1>{book.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: book.content }} />
    </div>
  );
}

// Contact form hook
function ContactFormWithHook() {
  const {
    formData,
    setFormData,
    submitContactForm,
    isSubmitting,
    submitSuccess,
    error,
    resetForm
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submitContactForm()) {
      // Success handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

// Media upload hook
function MediaUploadComponent() {
  const { uploadMedia, isUploading, progress, error } = useMediaUpload();

  const handleFileUpload = async (file: File) => {
    const result = await uploadMedia({
      file,
      authorId: 'current-author-id',
      purpose: 'gallery',
      description: 'Gallery image'
    }, (progress) => {
      console.log(`Upload: ${progress.percentage}%`);
    });

    if (result) {
      console.log('Upload successful:', result);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        disabled={isUploading}
      />
      {isUploading && progress && (
        <div>Upload Progress: {progress.percentage}%</div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

## Usage Examples

### Complete Blog Post with Media

```typescript
function BlogPostPage({ slug }: { slug: string }) {
  const { blogPost, isLoading, error } = useBlogPostData(slug, true);
  const mediaStore = useMedia();

  useEffect(() => {
    if (blogPost?.featuredImageId) {
      mediaStore.fetchMedia(blogPost.featuredImageId);
    }
  }, [blogPost, mediaStore]);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  if (!blogPost) return <NotFoundComponent />;

  const featuredImage = blogPost.featuredImageId
    ? mediaStore.getMediaItem(blogPost.featuredImageId)
    : null;

  return (
    <article>
      {featuredImage && (
        <img
          src={featuredImage.url}
          alt={featuredImage.altText}
          loading="lazy"
        />
      )}
      <h1>{blogPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      <div>
        Tags: {blogPost.tagsList.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}
```

### Book Detail Page

```typescript
function BookDetailPage({ slug }: { slug: string }) {
  const { book, isLoading, error } = useBookData(slug, true);
  const { book: bookWithMedia } = useBook(slug);
  const authorStore = useAuthors();

  useEffect(() => {
    if (book?.authorSlug) {
      authorStore.fetchAuthor(book.authorSlug);
    }
  }, [book, authorStore]);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  if (!book) return <NotFoundComponent />;

  // Get author details
  const author = authorStore.getAuthor(book.authorSlug);

  // Get media items if available
  const featuredImage = bookWithMedia && 'mediaItems' in bookWithMedia && bookWithMedia.featuredImageId
    ? bookWithMedia.mediaItems.find(m => m.id === bookWithMedia.featuredImageId)
    : null;

  const bookMedia = bookWithMedia && 'mediaItems' in bookWithMedia
    ? bookWithMedia.mediaItems
    : [];

  return (
    <article className="book-detail">
      <header>
        {featuredImage && (
          <img
            src={featuredImage.url}
            alt={book.title}
            className="book-cover"
            loading="lazy"
          />
        )}
        <h1>{book.title}</h1>
        {author && (
          <div className="author-info">
            <span>By {author.displayName}</span>
            {author.profileImageCdnUrl && (
              <img
                src={author.profileImageCdnUrl}
                alt={author.displayName}
                className="author-thumbnail"
              />
            )}
          </div>
        )}
        <div className="book-meta">
          <span className="category">{book.category}</span>
          <span className="publish-date">
            {new Date(book.publishDate).toLocaleDateString()}
          </span>
        </div>
      </header>

      <div className="book-description">{book.description}</div>

      <div className="book-content" dangerouslySetInnerHTML={{ __html: book.content }} />

      {bookMedia.length > 0 && (
        <section className="book-gallery">
          <h2>Gallery</h2>
          <div className="media-grid">
            {bookMedia.map(media => (
              <div key={media.id} className="media-item">
                {media.mediaType === 'image' ? (
                  <img src={media.url} alt={media.description || book.title} />
                ) : media.mediaType === 'video' ? (
                  <video src={media.url} controls poster={media.thumbnailUrl} />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="tags">
        {book.tagsList.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}
```

### Contact Form Integration

```typescript
function ContactPage() {
  const contactStore = useContactStore();
  const { formData, isSubmitting, submitSuccess, error } = contactStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    contactStore.setFormData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit the form
    const result = await contactStore.submitContactForm();

    if (result) {
      // Show success message or redirect
      setTimeout(() => {
        contactStore.resetForm();
        contactStore.clearSubmissionStatus();
      }, 5000); // Clear form after 5 seconds
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      {submitSuccess ? (
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
```

### GitHub Portfolio Integration

```typescript
function GitHubPortfolio() {
  const { repositories, isLoading } = useGitHubRepositoriesData({
    type: 'public',
    sort: 'updated',
    direction: 'desc',
    pageSize: 6
  });

  const { activityGrid, totalContributions } = useGitHubActivityData();

  return (
    <section>
      <h2>Recent Projects</h2>
      {isLoading ? (
        <div>Loading repositories...</div>
      ) : (
        <div className="repo-grid">
          {repositories.map(repo => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div>
                <span>⭐ {repo.stargazersCount}</span>
                <span>🍴 {repo.forksCount}</span>
                <span>{repo.language}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3>GitHub Activity</h3>
      <p>Total Contributions: {totalContributions}</p>
      {activityGrid && (
        <div className="activity-grid">
          {/* Render activity grid visualization */}
        </div>
      )}
    </section>
  );
}
```

## Error Handling

### API Error Types

```typescript
interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
  timestamp: string;
}
```

### Error Handling Utilities

```typescript
import {
  isApiError,
  isNetworkError,
  isAuthError,
  formatApiError,
} from './api/utils';

function handleApiError(error: unknown) {
  if (isNetworkError(error)) {
    // Handle network connectivity issues
    showNotification('Network error. Please check your connection.');
  } else if (isAuthError(error)) {
    // Handle authentication errors
    redirectToLogin();
  } else {
    // Handle other API errors
    showNotification(formatApiError(error));
  }
}
```

## Combined API Store

The Combined API Store integrates all individual API stores to provide unified access and health checks. It's especially useful for loading multiple data sources at once, checking the overall API health, and managing global state.

```typescript
import { useCombinedApiStore, useBooks, useContact } from './store';

function AppInitializer() {
  const { syncAllData, performHealthCheck, isGlobalLoading } = useCombinedApiStore();

  useEffect(() => {
    // Load all essential data on app initialization
    syncAllData();

    // Periodically check API health
    const interval = setInterval(async () => {
      const health = await performHealthCheck();
      if (!health.overall) {
        console.error('API health check failed:', health);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return isGlobalLoading ? <LoadingScreen /> : null;
}
```

### Custom Selector Hooks

The API includes many pre-built selector hooks for easy data access:

```typescript
// Book hooks
const book = useBook('my-amazing-book'); // Get a single book by slug
const publishedBooks = usePublishedBooks(); // Get all published books
const fictionBooks = useBooksByCategory('Fiction'); // Get books by category
const fantasyBooks = useBooksByTag('fantasy'); // Get books by tag
const authorBooks = useBooksByAuthor('author-slug'); // Get books by author

// Contact form hook
const { formData, submitContactForm, isSubmitting } = useContact();
```

## Caching Strategy

### Cache Management

The stores implement intelligent caching with the following features:

- **TTL (Time To Live)**: 5 minutes for content, 10 minutes for GitHub data
- **Automatic Invalidation**: Cache is invalidated after mutations
- **Selective Refresh**: Only fetch data when cache is stale
- **Persistence**: Important data is persisted to localStorage

### Cache Control

```typescript
// Invalidate all caches
const { invalidateAllCaches } = useGlobalApiState();
invalidateAllCaches();

// Invalidate specific store cache
const authorsStore = useAuthorsStore();
authorsStore.invalidateCache();

// Force refresh data
const { refetch } = useBlogPostsData();
refetch();
```

## Testing

### Unit Testing API Functions

```typescript
import { AuthorsApiClient } from './api';
import { createTestConfig } from './api/config';

describe('AuthorsApiClient', () => {
  let client: AuthorsApiClient;

  beforeEach(() => {
    const config = createTestConfig();
    client = new AuthorsApiClient(config);
  });

  it('should fetch authors successfully', async () => {
    const response = await client.getAuthors({ page: 1, pageSize: 10 });
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
```

### Testing Store Actions

```typescript
import { useAuthorsStore } from './store';
import { renderHook, act } from '@testing-library/react';

describe('AuthorsStore', () => {
  it('should fetch and store authors', async () => {
    const { result } = renderHook(() => useAuthorsStore());

    await act(async () => {
      await result.current.fetchAuthors({ page: 1, pageSize: 5 });
    });

    expect(result.current.authors).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });
});
```

### Integration Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { useAuthorData } from './hooks';

function TestComponent() {
  const { author, isLoading } = useAuthorData('test-author');

  if (isLoading) return <div>Loading...</div>;
  return <div>{author?.displayName}</div>;
}

test('should load and display author data', async () => {
  render(<TestComponent />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });
});
```

## Performance Considerations

### Optimization Strategies

1. **Pagination**: Always use pagination for large datasets
2. **Selective Loading**: Only load media when needed (`includeMedia` parameter)
3. **Debounced Search**: Implement debouncing for search operations
4. **Lazy Loading**: Load content as needed, not all at once
5. **CDN Usage**: Use CDN URLs for media with appropriate transformations

### Memory Management

```typescript
// Clean up stores when components unmount
useEffect(() => {
  return () => {
    // Cleanup is handled automatically by Zustand persistence
  };
}, []);

// Use selectors to prevent unnecessary re-renders
const author = useAuthorsStore((state) => state.getAuthor('specific-slug'));
```

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure `NEXT_PUBLIC_API_KEY` is set correctly
2. **CORS Issues**: Verify the API endpoints support your domain
3. **Network Timeouts**: Adjust timeout settings for slow networks
4. **Cache Issues**: Use `invalidateCache()` if data seems stale

### Debug Mode

Enable logging in development:

```typescript
const config = createApiConfig();
config.enableLogging = true;
const client = new ApiClient(config);
```

This will log all API requests and responses to the browser console.

---

For additional support or questions, please refer to the Azure Functions documentation or contact the development team.
