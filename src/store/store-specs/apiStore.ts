import axios from 'axios';
import { create } from 'zustand';

import { useContentStore } from './contentStore';

console.log('[API Store] module loaded');

// Only types needed for API actions
export type PostTypeKey =
  | 'blogPosts'
  | 'artworkPosts'
  | 'musicPosts'
  | 'portfolioPosts'
  | 'githubPosts'
  | 'events'
  | 'books'
  | 'contactMeForm';

export interface APIStoreState {
  isLoading: boolean;
  error: string | null;
  fetchPost: (postId: string, postType: PostTypeKey) => Promise<void>;
  fetchPosts: (page: number, postType: PostTypeKey) => Promise<void>;
}

export const useApiStore = create<APIStoreState>((set, get) => ({
  isLoading: false,
  error: null,

  fetchPost: async (postId, postType) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      // Update content store
      useContentStore.getState().setPost(postType, postId, response.data);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to fetch post',
        isLoading: false,
      });
    }
  },

  fetchPosts: async (page, postType) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      // Update content store
      useContentStore.getState().setPosts(postType, response.data);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to fetch posts',
        isLoading: false,
      });
    }
  },
}));
