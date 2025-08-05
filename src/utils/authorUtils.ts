/**
 * Author resolution utilities
 * Handles various author fields and provides debugging information
 */

export interface AuthorObject {
  displayName?: string;
  authorDisplayName?: string;
  author?: string;
  name?: string;
}

/**
 * Resolves the author name from various possible fields
 * @param post - The post object containing author information
 * @returns The resolved author name or a default
 */
export const resolveAuthorName = (post: AuthorObject): string => {
  return (
    post.displayName ||
    post.authorDisplayName ||
    post.author ||
    post.name ||
    'Terence Waters'
  );
};

/**
 * Debug function to show author resolution process
 * @param post - The post object containing author information
 * @returns Debug information about author resolution
 */
export const debugAuthorResolution = (post: AuthorObject) => {
  return {
    displayName: post.displayName || null,
    authorDisplayName: post.authorDisplayName || null,
    author: post.author || null,
    name: post.name || null,
    resolved: resolveAuthorName(post),
  };
};