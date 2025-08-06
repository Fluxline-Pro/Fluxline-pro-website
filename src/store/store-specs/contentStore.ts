import { create } from 'zustand';

import type { PostTypeKey } from './apiStore';

interface Post {
  id: string;
  title: string;
  content: string;
  // ... other post fields
}

interface ContentState {
  blogPosts: Record<string, Post>;
  artworkPosts: Record<string, Post>;
  musicPosts: Record<string, Post>;
  portfolioPosts: Record<string, Post>;
  githubPosts: Record<string, Post>;
  events: Record<string, Post>;
  books: Record<string, Post>;
  contactMeForm: Record<string, Post>;
  isLoading: boolean;
  error: string | null;
  fetchPost: (postId: string) => Promise<void>;
  fetchPosts: (page: number) => Promise<void>;
  setPost: (postType: PostTypeKey, postId: string, post: Post) => void;
  setPosts: (postType: PostTypeKey, posts: Record<string, Post>) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  blogPosts: {},
  artworkPosts: {},
  musicPosts: {},
  portfolioPosts: {},
  githubPosts: {},
  events: {},
  books: {},
  contactMeForm: {},
  isLoading: false,
  error: null,

  // These are now no-ops or can be removed, since fetching is handled by apiStore
  fetchPost: async (_postId) => {},
  fetchPosts: async (_page) => {},

  setPost: (postType, postId, post) => {
    set((state) => ({
      [postType]: { ...state[postType], [postId]: post },
    }));
  },

  setPosts: (postType, posts) => {
    set((state) => ({
      [postType]: { ...state[postType], ...posts },
    }));
  },
}));
