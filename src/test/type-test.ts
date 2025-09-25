/**
 * Type Test - Verify API types compile correctly
 */

// Import all our API types to test compilation
import {
  ApiClientConfig,
  AuthorDTO,
  AuthorWithMediaDTO,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  BlogPostDTO,
  BlogPostWithMediaDTO,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  PortfolioPieceDTO,
  PortfolioPieceWithMediaDTO,
  CreatePortfolioPieceRequest,
  UpdatePortfolioPieceRequest,
  GitHubRepository,
  GitHubActivityGrid,
  MediaItemDTO,
  MediaUploadRequest,
  ApiResponse,
  PaginatedApiResponse,
  ApiError,
} from '../api/types';

// Test type definitions with sample data
const testConfig: ApiClientConfig = {
  baseUrl: 'https://api.example.com',
  apiKey: 'test-key',
  cdnBaseUrl: 'https://cdn.example.com',
  environment: 'development',
  timeout: 30000,
  retryAttempts: 3,
  enableLogging: true,
};

const testAuthor: AuthorDTO = {
  authorSlug: 'test-author',
  displayName: 'Test Author',
  firstName: 'Test',
  lastName: 'Author',
  email: 'test@example.com',
  username: 'testauthor',
  hasValidProfileImage: false,
  mediaReferencesJson: '[]',
};

const testBlogPost: BlogPostDTO = {
  id: 'test-id',
  partitionKey: 'blogposts',
  rowKey: 'test-post',
  title: 'Test Blog Post',
  authorSlug: 'test-author',
  description: 'Test description',
  content: 'Test content',
  slug: 'test-blog-post',
  category: 'Technology',
  status: 'Draft',
  mediaReferencesJson: '[]',
  publishDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  tagsList: ['test', 'typescript'],
  isPublished: 'true',
};

const testCreateRequest: CreateBlogPostRequest = {
  title: 'New Blog Post',
  authorSlug: 'test-author',
  description: 'New post description',
  content: 'New post content',
  slug: 'new-blog-post',
  category: 'Technology',
  status: 'Published',
  publishDate: new Date().toISOString(),
  tagsList: ['new', 'post'],
};

const testApiResponse: ApiResponse<AuthorDTO> = {
  data: testAuthor,
  success: true,
  timestamp: new Date().toISOString(),
};

const testPaginatedResponse: PaginatedApiResponse<BlogPostDTO> = {
  data: [testBlogPost],
  success: true,
  timestamp: new Date().toISOString(),
  pagination: {
    page: 1,
    pageSize: 10,
    totalCount: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const testApiError: ApiError = {
  message: 'Test error',
  statusCode: 400,
  details: 'Test error details',
  timestamp: new Date().toISOString(),
};

const testMediaUpload: MediaUploadRequest = {
  file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
  authorId: 'test-author-id',
  purpose: 'profile',
  description: 'Test upload',
  altText: 'Test image',
};

// Test GitHub types
const testRepository: GitHubRepository = {
  id: 1,
  name: 'test-repo',
  fullName: 'user/test-repo',
  description: 'Test repository',
  url: 'https://github.com/user/test-repo',
  htmlUrl: 'https://github.com/user/test-repo',
  cloneUrl: 'https://github.com/user/test-repo.git',
  stargazersCount: 10,
  forksCount: 2,
  watchersCount: 5,
  size: 1024,
  isPrivate: false,
  isFork: false,
  isArchived: false,
  isDisabled: false,
  defaultBranch: 'main',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  topics: ['typescript', 'react'],
  owner: {
    login: 'testuser',
    id: 123,
    avatarUrl: 'https://github.com/testuser.png',
    type: 'User',
  },
};

// Function to test type compatibility
function validateTypes() {
  // console.log('Type validation successful!');
  // console.log('Config:', testConfig.baseUrl);
  // console.log('Author:', testAuthor.displayName);
  // console.log('Blog Post:', testBlogPost.title);
  // console.log('Response:', testApiResponse.success);
  // console.log('Repository:', testRepository.name);
}

export default validateTypes;
