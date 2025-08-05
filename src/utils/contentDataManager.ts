/**
 * Content Data Manager
 * Handles switching between real API data and mock data based on feature flags
 */

import React from 'react';
import { ContentItem } from '../pages/unified-content-page/unified-content-page';
import {
  BlogPostDTO,
  BlogPostWithMediaDTO,
  BookDTO,
  BookWithMediaDTO,
  PortfolioPieceDTO,
  PortfolioPieceWithMediaDTO,
  GitHubRepository,
  AuthorDTO,
  AuthorWithMediaDTO,
} from '../api/types';
import { useBlogPostsStore } from '../store/store-specs/blogPostsStore';
import { useBooksStore } from '../store/store-specs/booksStore';
import { usePortfolioPiecesStore } from '../store/store-specs/portfolioPiecesStore';
import { useGitHubStore } from '../store/store-specs/githubStore';
import { useAuthorsStore } from '../store/store-specs/authorsStore';
import { faker } from '@faker-js/faker';

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('./apiDebug')
    .then((debug) => {
      debug.debugApiConfiguration();
    })
    .catch(console.error);
}

// Feature flags for API integration
export const CONTENT_API_FLAGS = {
  blog: true, // Enable real blog API - we have credentials now!
  books: true, // Enable real books API
  portfolio: true, // Enable real portfolio API
  github: false, // Disabled - GitHub API still returning mock data, will enable when AplUSAndmINUS data is available
  authors: true, // Enable real authors API
  contact: true, // Enable real contact API
  videos: false, // Still use mock data
  music: false, // Still use mock data
  livestreams: false, // Still use mock data
};

// Check if API is available and configured
export const isApiAvailable = (): boolean => {
  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const cdnUrl = process.env.REACT_APP_CDN_BASE_URL;

    const hasApiUrl = !!apiUrl;
    const hasApiKey = !!apiKey;
    const hasCdnUrl = !!cdnUrl;

    // For development, we need to check if the API URLs and keys are real
    // Note: mock-dev-api and mock-tst-api are actually REAL API endpoints (just with "mock" in the name)
    const isRealApiUrl =
      hasApiUrl &&
      (apiUrl.includes('terencewaters.com') ||
        apiUrl.includes('dev-api') ||
        apiUrl.includes('tst-api') ||
        apiUrl.includes('api.')) &&
      !apiUrl.includes('localhost') &&
      !apiUrl.includes('placeholder');

    const isRealApiKey =
      hasApiKey &&
      apiKey !== 'mock-api-key-for-development' &&
      apiKey !== 'test-api-key-12345' &&
      apiKey !== 'your-api-key-here' &&
      !apiKey.includes('placeholder') &&
      !apiKey.includes('your-') &&
      apiKey.length > 20; // Real API keys are typically longer

    const isAvailable =
      hasApiUrl && hasApiKey && hasCdnUrl && isRealApiUrl && isRealApiKey;

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      // console.log('🔍 API Availability Check:', {
      //   hasApiUrl,
      //   hasApiKey,
      //   hasCdnUrl,
      //   isRealApiUrl,
      //   isRealApiKey,
      //   isAvailable,
      //   apiUrl: apiUrl || 'NOT SET',
      //   cdnUrl: cdnUrl || 'NOT SET',
      //   apiKey: apiKey ? `SET (${apiKey.substring(0, 10)}...)` : 'NOT SET',
      //   note: 'mock-dev-api and mock-tst-api are REAL endpoints (just with "mock" in the name)',
      // });
    }

    return isAvailable;
  } catch (error) {
    // console.error('Error checking API availability:', error);
    return false;
  }
};

// Convert API DTOs to ContentItem format
export const convertBlogPostToContentItem = (
  post: BlogPostDTO | BlogPostWithMediaDTO
): ContentItem => {
  // Handle both BlogPostDTO and BlogPostWithMediaDTO
  const blogPost = 'mediaItems' in post ? post : post;
  const mediaItems = 'mediaItems' in post ? post.mediaItems : [];

  // Find featured image
  const featuredImage = mediaItems.find(
    (media) => media.id === blogPost.featuredImageId
  );

  // Generate fallback image if no featured image is available
  // Use first tag as keyword for more relevant image, fallback to category
  let imageUrl = featuredImage?.url;
  if (!imageUrl) {
    // Get a valid keyword or use default as fallback
    let keyword = 'technology'; // Default fallback

    // Try to get first tag if available and not empty
    if (blogPost.tagsList?.length > 0 && blogPost.tagsList[0]?.trim()) {
      keyword = blogPost.tagsList[0];
    }
    // Otherwise try to use category if available and not empty
    else if (blogPost.category?.trim()) {
      keyword = blogPost.category;
    }

    // Set the seed based on keyword for consistent images
    faker.seed(keyword.length * 100 + keyword.charCodeAt(0));
    imageUrl = faker.image.urlPicsumPhotos({
      width: 1200,
      height: 800,
    });
  }

  return {
    id: blogPost.slug,
    title: blogPost.title,
    description: blogPost.description,
    imageUrl,
    imageAlt: featuredImage?.altText || `${blogPost.title} featured image`,
    date: new Date(blogPost.publishDate),
    author: blogPost.authorSlug,
    category: blogPost.category,
    content: blogPost.content,
    // Additional fields from DTO
    status: blogPost.status,
    tags: blogPost.tagsList,
    slug: blogPost.slug,
    lastModified: new Date(blogPost.lastModified),
    isPublished: blogPost.isPublished || blogPost.status === 'Published',
  };
};

// Convert Books DTO to ContentItem format
export const convertBookToContentItem = (
  book: BookDTO | BookWithMediaDTO
): ContentItem => {
  // Handle both BookDTO and BookWithMediaDTO
  const bookData = 'book' in book ? book.book : book;
  const mediaItems = 'mediaItems' in book ? book.mediaItems : [];

  // Find featured image
  const featuredImage = mediaItems.find(
    (media) => media.id === bookData.featuredImageId
  );

  // Generate fallback image if no featured image is available
  // Use first tag as keyword for more relevant image, fallback to category
  let imageUrl = featuredImage?.url;
  if (!imageUrl) {
    // Get a valid keyword or use default as fallback
    let keyword = 'book'; // Default fallback

    // Try to get first tag if available and not empty
    if (bookData.tagsList?.length > 0 && bookData.tagsList[0]?.trim()) {
      keyword = bookData.tagsList[0];
    }
    // Otherwise try to use category if available and not empty
    else if (bookData.category?.trim()) {
      keyword = bookData.category;
    }

    // Set the seed based on keyword for consistent images
    faker.seed(keyword.length * 100 + keyword.charCodeAt(0));
    imageUrl = faker.image.urlPicsumPhotos({ width: 1200, height: 1800 });
  }

  return {
    id: bookData.slug,
    title: bookData.title,
    description: bookData.description,
    imageUrl,
    imageAlt: featuredImage?.altText || `${bookData.title} cover`,
    date: new Date(bookData.publishDate),
    author: bookData.authorSlug,
    category: bookData.category,
    content: bookData.content,
    // Additional fields from DTO
    status: bookData.status,
    tags: bookData.tagsList,
    slug: bookData.slug,
    lastModified: new Date(bookData.lastModified),
    isPublished: bookData.status === 'Published',
  };
};

// Convert Portfolio DTO to ContentItem format
export const convertPortfolioToContentItem = (
  portfolio: PortfolioPieceDTO | PortfolioPieceWithMediaDTO
): ContentItem => {
  // Handle both PortfolioPieceDTO and PortfolioPieceWithMediaDTO
  const portfolioData = portfolio;
  const mediaItems = 'mediaItems' in portfolio ? portfolio.mediaItems : [];

  // Find featured image
  const featuredImage = mediaItems.find(
    (media) => media.id === portfolioData.featuredImageId
  );

  // Generate fallback image if no featured image is available
  // Use first tag as keyword for more relevant image, fallback to category
  let imageUrl = featuredImage?.url;
  if (!imageUrl) {
    // Get a valid keyword or use default as fallback
    let keyword = 'development'; // Default fallback

    // Try to get first tag if available and not empty
    if (
      portfolioData.tagsList?.length > 0 &&
      portfolioData.tagsList[0]?.trim()
    ) {
      keyword = portfolioData.tagsList[0];
    }
    // Otherwise try to use category if available and not empty
    else if (portfolioData.category?.trim()) {
      keyword = portfolioData.category;
    }

    // Set the seed based on keyword for consistent images
    faker.seed(keyword.length * 100 + keyword.charCodeAt(0));
    imageUrl = faker.image.urlPicsumPhotos({ width: 1200, height: 800 });
  }

  return {
    id: portfolioData.slug,
    title: portfolioData.title,
    description: portfolioData.description,
    imageUrl,
    imageAlt: featuredImage?.altText || `${portfolioData.title} image`,
    date: new Date(portfolioData.publishDate),
    author: portfolioData.authorSlug,
    category: portfolioData.category,
    content: portfolioData.content,
    // Additional fields from DTO
    status: portfolioData.status,
    tags: portfolioData.tagsList,
    slug: portfolioData.slug,
    lastModified: new Date(portfolioData.lastModified),
    isPublished: portfolioData.status === 'Published',
  };
};

// Convert GitHub Repository to ContentItem format
export const convertGitHubRepoToContentItem = (
  repo: GitHubRepository
): ContentItem => {
  // Generate placeholder image using repository language or first topic as keyword
  let keyword = 'code'; // Default fallback

  // Try to get language if available and not empty
  if (repo.language?.trim()) {
    keyword = repo.language;
  }
  // Otherwise try to get first topic if available and not empty
  else if (repo.topics?.length > 0 && repo.topics[0]?.trim()) {
    keyword = repo.topics[0];
  }

  // Set the seed based on keyword for consistent images
  faker.seed(keyword.length * 100 + keyword.charCodeAt(0));
  const imageUrl = faker.image.urlPicsumPhotos({ width: 1200, height: 800 });

  return {
    id: repo.id.toString(),
    title: repo.name,
    description: repo.description || `${repo.name} - GitHub Repository`,
    imageUrl,
    imageAlt: `${repo.name} repository`,
    date: new Date(repo.updatedAt),
    author: repo.owner.login,
    category: repo.language || 'Other',
    content: repo.description || '',
    // Additional fields from GitHub API
    url: repo.htmlUrl,
    fullName: repo.fullName,
    stargazersCount: repo.stargazersCount,
    forksCount: repo.forksCount,
    language: repo.language,
    topics: repo.topics,
    isPrivate: repo.isPrivate,
    isFork: repo.isFork,
    isArchived: repo.isArchived,
    defaultBranch: repo.defaultBranch,
    slug: repo.name,
    lastModified: new Date(repo.updatedAt),
    isPublished: !repo.isPrivate, // Public repos are "published"
  };
};

// Convert Author DTO to ContentItem format
export const convertAuthorToContentItem = (
  author: AuthorDTO | AuthorWithMediaDTO
): ContentItem => {
  // Handle both AuthorDTO and AuthorWithMediaDTO
  const authorData = author;
  const mediaItems = 'mediaItems' in author ? author.mediaItems : [];

  // Find profile image
  const profileImage =
    mediaItems.find((media) => media.id === authorData.profileImageId) ||
    (authorData.profileImageCdnUrl
      ? {
          url: authorData.profileImageCdnUrl,
          altText: `${authorData.displayName} profile image`,
        }
      : undefined);

  // Generate fallback image if no profile image is available
  let imageUrl = profileImage?.url || authorData.profileImageCdnUrl;
  if (!imageUrl) {
    // Use author name as seed for consistent author images
    let seed = authorData.displayName || authorData.authorSlug || 'author';
    faker.seed(seed.length * 100 + seed.charCodeAt(0));
    imageUrl = faker.image.urlPicsumPhotos({ width: 1200, height: 1200 });
  }

  return {
    id: authorData.authorSlug,
    title: authorData.displayName,
    description:
      authorData.bio || `Author profile for ${authorData.displayName}`,
    imageUrl,
    imageAlt:
      profileImage?.altText || `${authorData.displayName} profile image`,
    date: new Date(), // Authors don't have a publish date, use current date
    author: authorData.authorSlug,
    category: 'Author',
    content: authorData.bio || '',
    // Additional fields from DTO
    email: authorData.email,
    website: authorData.website,
    location: authorData.location,
    slug: authorData.authorSlug,
    firstName: authorData.firstName,
    lastName: authorData.lastName,
    username: authorData.username,
    hasValidProfileImage: authorData.hasValidProfileImage,
    isPublished: true, // Authors are always "published"
  };
};

// Generate mock data (existing function moved here)
export const generateMockContent = (
  contentType: string,
  count: number = 12
): ContentItem[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = `${contentType}-${index + 1}`;

    const baseContent = {
      id,
      date: faker.date.past(),
      author: 'Fluxline Team',
    };

    switch (contentType) {
      case 'portfolio':
        return {
          ...baseContent,
          title: `${faker.company.name()} ${faker.helpers.arrayElement(['Transformation', 'Strategic Restructuring', 'Digital Evolution', 'Operational Excellence'])}`,
          description: `A comprehensive case study showcasing Fluxline's strategic approach to business transformation and measurable results.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `Portfolio Project ${index + 1} Image`,
          category: faker.helpers.arrayElement([
            'Digital Transformation',
            'Strategic Consulting',
            'Business Architecture',
            'Operational Optimization',
          ]),
        };

      case 'books':
        return {
          ...baseContent,
          title: `Book Title ${index + 1}`,
          description: `An engaging book about various topics and insights.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 1800 }),
          imageAlt: `Book ${index + 1} Cover`,
          category: faker.helpers.arrayElement([
            'Fiction',
            'Non-Fiction',
            'Technical',
            'Biography',
          ]),
        };

      case 'videos':
        return {
          ...baseContent,
          title: `Video Content ${index + 1}`,
          description: `An informative video covering interesting topics.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
          imageAlt: `Video ${index + 1} Thumbnail`,
          category: faker.helpers.arrayElement([
            'Tutorial',
            'Vlog',
            'Review',
            'Documentary',
          ]),
        };

      case 'music':
        return {
          ...baseContent,
          title: `Music Track ${index + 1}`,
          description: `A musical composition with unique style and creativity.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 1200 }),
          imageAlt: `Music Track ${index + 1} Cover`,
          category: faker.helpers.arrayElement([
            'Electronic',
            'Acoustic',
            'Jazz',
            'Classical',
          ]),
        };

      case 'livestreams':
        return {
          ...baseContent,
          title: `Livestream ${index + 1}`,
          description: `A live streaming session covering various topics and interactions.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
          imageAlt: `Livestream ${index + 1} Thumbnail`,
          category: faker.helpers.arrayElement([
            'Live Coding',
            'Q&A',
            'Tutorial',
            'Discussion',
          ]),
        };

      case 'github':
        // Generate more realistic GitHub repository names and descriptions
        const techWords = [
          'react',
          'node',
          'vue',
          'angular',
          'typescript',
          'python',
          'java',
          'kotlin',
          'swift',
          'go',
        ];
        const projectTypes = [
          'cli',
          'api',
          'app',
          'lib',
          'tool',
          'framework',
          'bot',
          'server',
        ];
        const randomTech = faker.helpers.arrayElement(techWords);
        const randomType = faker.helpers.arrayElement(projectTypes);
        const repoName = `${randomTech}-${randomType}`;

        return {
          ...baseContent,
          title: repoName,
          description: `A ${randomTech} ${randomType} for ${faker.company.buzzVerb()}ing ${faker.company.buzzNoun()} with modern development practices.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `${repoName} repository preview`,
          category: faker.helpers.arrayElement([
            'TypeScript',
            'JavaScript',
            'Python',
            'Java',
            'Go',
            'Kotlin',
          ]),
        };

      case 'about':
        return {
          ...baseContent,
          title: `About Fluxline`,
          description: `Strategic architecture for modern business transformation. Learn about our vision, methodology, and commitment to excellence.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `About Fluxline`,
          category: 'Company',
          content: `Fluxline represents the future of strategic business architecture. We specialize in transforming complex business challenges into streamlined, efficient solutions that drive growth and innovation.`,
        };

      case 'services':
        return {
          ...baseContent,
          title: `${faker.helpers.arrayElement(['Strategic', 'Business', 'Digital', 'Operational'])} ${faker.helpers.arrayElement(['Consulting', 'Architecture', 'Transformation', 'Solutions'])}`,
          description: `Comprehensive strategic services designed to transform your business operations and drive sustainable growth.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `Fluxline Service ${index + 1}`,
          category: faker.helpers.arrayElement([
            'Strategic Consulting',
            'Business Architecture',
            'Digital Transformation',
            'Operational Excellence',
          ]),
        };

      case 'architecture':
        return {
          ...baseContent,
          title: `${faker.helpers.arrayElement(['Enterprise', 'Digital', 'Solution', 'System'])} Architecture ${faker.helpers.arrayElement(['Framework', 'Model', 'Strategy', 'Blueprint'])}`,
          description: `Deep-dive into our architectural methodologies and frameworks that enable scalable business transformation.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `Architecture ${index + 1}`,
          category: faker.helpers.arrayElement([
            'Enterprise Architecture',
            'Solution Design',
            'System Integration',
            'Technical Strategy',
          ]),
        };

      case 'media':
        return {
          ...baseContent,
          title: `${faker.helpers.arrayElement(['Strategic Insights', 'Business Leadership', 'Industry Analysis', 'Transformation Stories'])} - Episode ${index + 1}`,
          description: `Podcasts, videos, and multimedia content featuring strategic insights and industry expertise from Fluxline.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
          imageAlt: `Media Content ${index + 1}`,
          category: faker.helpers.arrayElement([
            'Podcast',
            'Video Interview',
            'Webinar',
            'Case Study Video',
          ]),
        };

      case 'press':
        return {
          ...baseContent,
          title: `${faker.helpers.arrayElement(['Fluxline Announces', 'Press Release:', 'Company Update:', 'Industry Recognition:'])} ${faker.company.buzzPhrase()}`,
          description: `Official announcements, press releases, and company updates from Fluxline Pro.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `Press Release ${index + 1}`,
          category: faker.helpers.arrayElement([
            'Press Release',
            'Company News',
            'Awards',
            'Partnerships',
          ]),
        };

      default: // 'blog' and others
        return {
          ...baseContent,
          title: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} ${faker.helpers.arrayElement(['Insight', 'Strategy', 'Analysis', 'Update'])} ${index + 1}`,
          description: `Strategic insights and thought leadership from Fluxline on ${contentType} and business transformation.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 1200, height: 800 }),
          imageAlt: `${contentType} Content ${index + 1} Image`,
          category: faker.helpers.arrayElement([
            'Strategic Planning',
            'Business Transformation',
            'Industry Analysis',
            'Best Practices',
          ]),
        };
    }
  });
};

// Hook to get content data based on feature flags
export const useContentData = (contentType: string) => {
  const blogPostsStore = useBlogPostsStore();
  const booksStore = useBooksStore();
  const portfolioStore = usePortfolioPiecesStore();
  const githubStore = useGitHubStore();
  const authorsStore = useAuthorsStore();

  // Memoize the configuration to prevent unnecessary re-renders
  const config = React.useMemo(() => {
    const isContentTypeEnabled =
      CONTENT_API_FLAGS[contentType as keyof typeof CONTENT_API_FLAGS];
    const isApiConfigured = isApiAvailable();
    const shouldUseApi = isContentTypeEnabled && isApiConfigured;

    return { isContentTypeEnabled, isApiConfigured, shouldUseApi };
  }, [contentType]);

  // Debug logging - only log when values actually change
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // console.log(`🔍 Content Data Manager - ${contentType}:`, {
      //   ...config,
      //   contentType,
      //   status: config.shouldUseApi
      //     ? '🌐 Using real API data'
      //     : '📋 Using mock data (API not configured or disabled)',
      // });
    }
  }, [contentType, config]);

  const loadContent = React.useCallback(
    async (params?: any) => {
      if (!config.shouldUseApi) {
        // console.log(
        //   `📋 Using mock data for ${contentType} (API not available or not enabled)`
        // );
        return generateMockContent(contentType);
      }

      // console.log(`🌐 Loading real API data for ${contentType}`);
      try {
        switch (contentType) {
          case 'blog':
            const blogParams = {
              status: 'Published',
              page: 1,
              pageSize: 12,
              includeMedia: true,
              ...params,
            };
            // console.log('🔄 Fetching blog posts with params:', blogParams);
            await blogPostsStore.fetchBlogPosts(blogParams);
            const blogPosts = blogPostsStore.getPublishedBlogPosts();
            // console.log('✅ Blog posts fetched:', blogPosts.length, 'posts');
            return blogPosts.map(convertBlogPostToContentItem);

          case 'books':
            await booksStore.fetchBooks({
              status: 'Published',
              page: 1,
              pageSize: 12,
              includeMedia: true,
              ...params,
            });
            return booksStore.getPublishedBooks().map(convertBookToContentItem);

          case 'portfolio':
            await portfolioStore.fetchPortfolioPieces({
              status: 'Published',
              page: 1,
              pageSize: 12,
              includeMedia: true,
              ...params,
            });
            return portfolioStore
              .getPublishedPortfolioPieces()
              .map(convertPortfolioToContentItem);

          case 'github':
            // console.log('🔄 Fetching GitHub repositories');
            await githubStore.fetchRepositories({
              type: 'public',
              includeArchived: false,
              includeForks: true,
              page: 1,
              pageSize: 12,
              ...params,
            });
            const repos = githubStore.getAllRepositories();
            // console.log('✅ GitHub repositories fetched:', repos.length, 'repos');
            return repos.map(convertGitHubRepoToContentItem);

          case 'authors':
            await authorsStore.fetchAuthors({
              page: 1,
              pageSize: 12,
              includeMedia: true,
              ...params,
            });
            return authorsStore.getAllAuthors().map(convertAuthorToContentItem);

          default:
            return generateMockContent(contentType);
        }
      } catch (error) {
        // console.warn(
        //   `⚠️ Failed to load ${contentType} from API, falling back to mock data:`,
        //   error
        // );
        return generateMockContent(contentType);
      }
    },
    [
      contentType,
      config.shouldUseApi,
      blogPostsStore,
      booksStore,
      portfolioStore,
      githubStore,
      authorsStore,
    ]
  );

  const loadSingleContent = React.useCallback(
    async (id: string) => {
      if (!config.shouldUseApi) {
        const mockData = generateMockContent(contentType);
        return mockData.find((item) => item.id === id) || null;
      }

      try {
        switch (contentType) {
          case 'blog':
            // console.log(`🔄 Fetching single blog post: ${id}`);
            await blogPostsStore.fetchBlogPost(id, true);
            const blogPost = blogPostsStore.getBlogPost(id);
            // console.log(
            //   '✅ Blog post fetched:',
            //   blogPost ? 'found' : 'not found'
            // );
            return blogPost ? convertBlogPostToContentItem(blogPost) : null;

          case 'books':
            await booksStore.fetchBook(id, true);
            const book = booksStore.getBook(id);
            return book ? convertBookToContentItem(book) : null;

          case 'portfolio':
            await portfolioStore.fetchPortfolioPiece(id, true);
            const portfolioPiece = portfolioStore.getPortfolioPiece(id);
            return portfolioPiece
              ? convertPortfolioToContentItem(portfolioPiece)
              : null;

          case 'github':
            // For GitHub, we need to fetch from the list since there's no single repo endpoint
            await githubStore.fetchRepositories();
            const repo = githubStore.getRepository(parseInt(id));
            return repo ? convertGitHubRepoToContentItem(repo) : null;

          case 'authors':
            await authorsStore.fetchAuthor(id, true);
            const author = authorsStore.getAuthor(id);
            return author ? convertAuthorToContentItem(author) : null;

          default:
            const mockData = generateMockContent(contentType);
            return mockData.find((item) => item.id === id) || null;
        }
      } catch (error) {
        // console.warn(
        //   `⚠️ Failed to load ${contentType} item ${id} from API, falling back to mock data:`,
        //   error
        // );
        const mockData = generateMockContent(contentType);
        return mockData.find((item) => item.id === id) || null;
      }
    },
    [
      contentType,
      config.shouldUseApi,
      blogPostsStore,
      booksStore,
      portfolioStore,
      githubStore,
      authorsStore,
    ]
  );

  const getLoadingState = React.useCallback(() => {
    if (!config.shouldUseApi) return false;

    switch (contentType) {
      case 'blog':
        return blogPostsStore.isLoadingList;
      case 'books':
        return booksStore.isLoadingList;
      case 'portfolio':
        return portfolioStore.isLoadingList;
      case 'github':
        return githubStore.isLoadingList;
      case 'authors':
        return authorsStore.isLoadingList;
      default:
        return false;
    }
  }, [
    contentType,
    config.shouldUseApi,
    blogPostsStore,
    booksStore,
    portfolioStore,
    githubStore,
    authorsStore,
  ]);

  const getErrorState = React.useCallback(() => {
    if (!config.shouldUseApi) return null;

    switch (contentType) {
      case 'blog':
        return blogPostsStore.error;
      case 'books':
        return booksStore.error;
      case 'portfolio':
        return portfolioStore.error;
      case 'github':
        return githubStore.error;
      case 'authors':
        return authorsStore.error;
      default:
        return null;
    }
  }, [
    contentType,
    config.shouldUseApi,
    blogPostsStore,
    booksStore,
    portfolioStore,
    githubStore,
    authorsStore,
  ]);

  return {
    loadContent,
    loadSingleContent,
    isLoading: getLoadingState(),
    error: getErrorState(),
    isUsingApi: config.shouldUseApi,
  };
};

// Additional helper function to get single author (specialized for authors)
export const useAuthorData = () => {
  const authorsStore = useAuthorsStore();

  const loadAuthorBySlug = React.useCallback(
    async (slug: string, includeMedia: boolean = true) => {
      if (!isApiAvailable() || !CONTENT_API_FLAGS.authors) {
        // Return mock author data
        const mockAuthors = generateMockContent('authors');
        return mockAuthors.find((author) => author.id === slug) || null;
      }

      try {
        await authorsStore.fetchAuthor(slug, includeMedia);
        const author = authorsStore.getAuthor(slug);
        return author ? convertAuthorToContentItem(author) : null;
      } catch (error) {
        // console.warn('Failed to load author from API, falling back to mock:', error);
        const mockAuthors = generateMockContent('authors');
        return mockAuthors.find((author) => author.id === slug) || null;
      }
    },
    [authorsStore]
  );

  return {
    loadAuthorBySlug,
    isLoading: authorsStore.isLoading, // Use the existing loading property
    error: authorsStore.error,
    isUsingApi: isApiAvailable() && CONTENT_API_FLAGS.authors,
  };
};
