// import { create } from 'zustand';
// import axios from 'axios';

// import { useUserPreferencesStore } from './userPreferencesStore';

// KEEPING HERE FOR NOW as reference

// const userPreferences = useUserPreferencesStore.getState();



  // // Navigation Actions
  // navigateTo: (view, postId = undefined) => {
  //   console.log('[navigationStore] navigateTo called', { view, postId });
  //   // if the user navigates off the home page,
  //   // we will swap the home view's background image
  //   if (useNavigationStore.getState().currentView === 'home') {
  //     if (userPreferences.preferences.backgroundImage === 'one') {
  //       userPreferences.setBackgroundImage('two');
  //     } else {
  //       userPreferences.setBackgroundImage('one');
  //     }
  //   }

  //   set((state) => {
  //     console.log('[navigationStore] navigateTo setState', {
  //       prevView: state.currentView,
  //       nextView: view,
  //       prevPostId: state.currentPostId,
  //       nextPostId: postId,
  //       prevHistory: state.viewHistory,
  //     });
  //     return {
  //       currentView: view,
  //       currentPostId: postId,
  //       viewHistory: [...state.viewHistory, view],
  //     };
  //   });
  // },

  // navigateToView: (view) => {
  //   console.log('[navigationStore] navigateToView called', { view });
  //   set((state) => {
  //     // Get the current preferences directly from the store
  //     const preferences = useUserPreferencesStore.getState().preferences;
  //     const currentBackground = preferences.backgroundImage;

  //     console.log('[navigationStore] navigateToView setState', {
  //       prevView: state.currentView,
  //       nextView: view,
  //       prevHistory: state.viewHistory,
  //       currentBackground,
  //     });

  //     // Swap the background image when navigating to/from home page
  //     if (state.currentView === 'home' || view === 'home') {
  //       const newBackground = currentBackground === 'one' ? 'two' : 'one';
  //       console.log(
  //         '[navigationStore] Changing background from',
  //         currentBackground,
  //         'to',
  //         newBackground
  //       );
  //       useUserPreferencesStore.getState().setBackgroundImage(newBackground);
  //     }

  //     return {
  //       currentView: view,
  //       currentPostId: null,
  //       viewHistory: [...state.viewHistory, view],
  //     };
  //   });
  // },

  // goBack: () => {
  //   console.log('[navigationStore] goBack called');
  //   set((state) => {
  //     // console.log('[navigationStore] goBack called', {
  //     //   prevHistory: state.viewHistory,
  //     // });
  //     if (state.viewHistory.length <= 1) return state;
  //     const newHistory = state.viewHistory.slice(0, -1);
  //     return {
  //       currentView: newHistory[newHistory.length - 1],
  //       currentPostId: null,
  //       viewHistory: newHistory,
  //     };
  //   });
  // },

  // goForward: () => {
  //   console.log('[navigationStore] goForward called');
  //   set((state) => {
  //     // console.log('[navigationStore] goForward called', {
  //     //   prevHistory: state.viewHistory,
  //     // });
  //     if (state.viewHistory.length <= 1) return state;
  //     const newHistory = state.viewHistory.slice(0, -1);
  //     return {
  //       currentView: newHistory[newHistory.length - 1],
  //       currentPostId: null,
  //       viewHistory: newHistory,
  //     };
  //   });
  // },


