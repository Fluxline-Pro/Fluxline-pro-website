import { create } from 'zustand';

export type ContentViewType = 'grid' | 'small-tile' | 'large-tile';
export type ViewState = 'list' | 'detail';

interface ContentFilterState {
  viewType: ContentViewType;
  viewState: ViewState;
  selectedPost: any | null; // Replace 'any' with actual post type
  overrideImage: string | null; // Image URL to override the card-image component
  startDate: Date;
  endDate: Date;
  isCalendarOpen: boolean;
  activeCalendar: 'start' | 'end' | null; // Track which calendar is active
  setViewType: (viewType: ContentViewType) => void;
  setViewState: (viewState: ViewState) => void;
  setSelectedPost: (post: any | null) => void;
  selectPost: (post: any, navigate?: (path: string) => void) => void; // Updated to handle navigation
  goBackToList: (navigate?: (path: string) => void) => void; // Helper to go back to list view
  setOverrideImage: (imageUrl: string | null) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setDateRange: (startDate: Date, endDate: Date) => void;
  toggleCalendar: (dateType?: 'start' | 'end') => void;
  setCalendarOpen: (isOpen: boolean, dateType?: 'start' | 'end') => void;
  selectDate: (date: Date) => void; // Handle date selection from calendar
}

const defaultStartDate = new Date();
defaultStartDate.setMonth(defaultStartDate.getMonth() - 12); // 1 year ago

const defaultEndDate = new Date(); // Today

export const useContentFilterStore = create<ContentFilterState>((set) => ({
  viewType: 'grid',
  viewState: 'list',
  selectedPost: null,
  overrideImage: null,
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  isCalendarOpen: false,
  activeCalendar: null,

  setViewType: (viewType) => set({ viewType }),

  setViewState: (viewState) => set({ viewState }),

  setSelectedPost: (selectedPost) => set({ selectedPost }),

  selectPost: (post, navigate) => {
    set({
      selectedPost: post,
      viewState: 'detail',
      overrideImage: post.imageUrl || null,
    });

    // If navigate function is provided, update the URL
    if (navigate && post.id) {
      const currentPath = window.location.pathname;
      // Get the base path (e.g., '/blog' from '/blog' or '/blog/some-post')
      const pathParts = currentPath.split('/').filter((part) => part);
      const basePath = pathParts.length > 0 ? `/${pathParts[0]}` : '/';
      // Navigate to the post detail URL
      navigate(`${basePath}/${post.id}`);
    }
  },

  goBackToList: (navigate) => {
    set({
      selectedPost: null,
      viewState: 'list',
      overrideImage: null,
    });

    // If navigate function is provided, update the URL to go back to the main section
    if (navigate) {
      const currentPath = window.location.pathname;
      // Remove the post ID from the URL to go back to the main section
      const basePath = currentPath.split('/').slice(0, -1).join('/');
      navigate(basePath || '/');
    }
  },

  setOverrideImage: (overrideImage) => set({ overrideImage }),

  setStartDate: (startDate) => set({ startDate }),

  setEndDate: (endDate) => set({ endDate }),

  setDateRange: (startDate, endDate) => set({ startDate, endDate }),

  toggleCalendar: (dateType) =>
    set((state) => ({
      isCalendarOpen: !state.isCalendarOpen,
      activeCalendar: !state.isCalendarOpen ? dateType || null : null,
    })),

  setCalendarOpen: (isCalendarOpen, dateType) =>
    set({
      isCalendarOpen,
      activeCalendar: isCalendarOpen ? dateType || null : null,
    }),

  selectDate: (date) =>
    set((state) => {
      const updates: Partial<ContentFilterState> = {
        isCalendarOpen: false,
        activeCalendar: null,
      };

      if (state.activeCalendar === 'start') {
        updates.startDate = date;
      } else if (state.activeCalendar === 'end') {
        updates.endDate = date;
      }

      return updates;
    }),
}));
