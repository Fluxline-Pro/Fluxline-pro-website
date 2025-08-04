import { getNavigationInfo, getListButtonText, getBasePath } from '../contentNavigation';
import { ContentItem } from '../../pages/unified-content-page/unified-content-page';

// Mock content items for testing
const mockPosts: ContentItem[] = [
  { id: 'post-1', title: 'Post 1', description: 'First post' },
  { id: 'post-2', title: 'Post 2', description: 'Second post' },
  { id: 'post-3', title: 'Post 3', description: 'Third post' },
];

describe('contentNavigation utilities', () => {
  test('getNavigationInfo returns correct navigation for first post', () => {
    const navigation = getNavigationInfo(mockPosts, 'post-1');
    
    expect(navigation.currentIndex).toBe(0);
    expect(navigation.hasPrevious).toBe(false);
    expect(navigation.hasNext).toBe(true);
    expect(navigation.previousPost).toBe(null);
    expect(navigation.nextPost).toEqual(mockPosts[1]);
  });

  test('getNavigationInfo returns correct navigation for middle post', () => {
    const navigation = getNavigationInfo(mockPosts, 'post-2');
    
    expect(navigation.currentIndex).toBe(1);
    expect(navigation.hasPrevious).toBe(true);
    expect(navigation.hasNext).toBe(true);
    expect(navigation.previousPost).toEqual(mockPosts[0]);
    expect(navigation.nextPost).toEqual(mockPosts[2]);
  });

  test('getNavigationInfo returns correct navigation for last post', () => {
    const navigation = getNavigationInfo(mockPosts, 'post-3');
    
    expect(navigation.currentIndex).toBe(2);
    expect(navigation.hasPrevious).toBe(true);
    expect(navigation.hasNext).toBe(false);
    expect(navigation.previousPost).toEqual(mockPosts[1]);
    expect(navigation.nextPost).toBe(null);
  });

  test('getNavigationInfo handles non-existent post', () => {
    const navigation = getNavigationInfo(mockPosts, 'non-existent');
    
    expect(navigation.currentIndex).toBe(-1);
    expect(navigation.hasPrevious).toBe(false);
    expect(navigation.hasNext).toBe(false);
    expect(navigation.previousPost).toBe(null);
    expect(navigation.nextPost).toBe(null);
  });

  test('getListButtonText returns correct text for different content types', () => {
    expect(getListButtonText('blog')).toBe('full blog list');
    expect(getListButtonText('portfolio')).toBe('full portfolio list');
    expect(getListButtonText('github')).toBe('full github list');
    expect(getListButtonText('unknown')).toBe('full list');
  });

  test('getBasePath returns correct path for content type', () => {
    expect(getBasePath('blog')).toBe('/blog');
    expect(getBasePath('portfolio')).toBe('/portfolio');
  });
});