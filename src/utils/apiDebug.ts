/**
 * Debug utility for API configuration and GitHub integration
 * This can be imported and called in development to diagnose API issues
 */

export const debugApiConfiguration = () => {
  console.group('🔍 API Configuration Debug');
  
  // Environment variables
  console.log('Environment Variables:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- REACT_APP_ENVIRONMENT:', process.env.REACT_APP_ENVIRONMENT);
  console.log('- REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL || 'NOT SET');
  console.log('- REACT_APP_CDN_BASE_URL:', process.env.REACT_APP_CDN_BASE_URL || 'NOT SET');
  console.log('- REACT_APP_API_KEY:', process.env.REACT_APP_API_KEY ? `SET (${process.env.REACT_APP_API_KEY.substring(0, 10)}...)` : 'NOT SET');
  console.log('- REACT_APP_BRANCH:', process.env.REACT_APP_BRANCH || 'NOT SET');
  
  console.groupEnd();
};

export const debugContentDataManager = async () => {
  const { isApiAvailable, CONTENT_API_FLAGS } = await import('./contentDataManager');
  
  console.group('🔍 Content Data Manager Debug');
  
  // API availability
  console.log('API Available:', isApiAvailable());
  
  // Content API flags
  console.log('Content API Flags:', CONTENT_API_FLAGS);
  
  console.groupEnd();
};

export const debugGitHubStore = async () => {
  try {
    const { useGitHubStore } = await import('../store/store-specs/githubStore');
    const githubStore = useGitHubStore.getState();
    
    console.group('🔍 GitHub Store Debug');
    console.log('Loading states:', {
      isLoading: githubStore.isLoading,
      isLoadingList: githubStore.isLoadingList,
      error: githubStore.error,
    });
    console.log('Data counts:', {
      repositories: Object.keys(githubStore.repositories).length,
      repositoriesList: githubStore.repositoriesList.length,
    });
    console.log('Cache info:', {
      lastFetched: githubStore.lastFetched ? new Date(githubStore.lastFetched).toISOString() : 'Never',
      isCacheValid: githubStore.isCacheValid(),
    });
    console.groupEnd();
  } catch (error) {
    console.error('Failed to debug GitHub store:', error);
  }
};

export const testGitHubApiCall = async () => {
  try {
    const { getApiClient } = await import('../api');
    const apiClient = getApiClient();
    
    console.group('🔍 Testing GitHub API Call');
    console.log('Attempting to fetch GitHub repositories...');
    
    const response = await apiClient.github.getGitHubRepos({
      page: 1,
      pageSize: 5,
      type: 'public',
    });
    
    console.log('API Response:', {
      success: response.success,
      dataCount: response.data?.length || 0,
      pagination: response.pagination,
      // error: response.error, // Removed because 'error' does not exist on PaginatedApiResponse
    });
    
    if (response.data && response.data.length > 0) {
      console.log('Sample repository:', response.data[0]);
    }
    
    console.groupEnd();
    return response;
  } catch (error) {
    console.error('GitHub API test failed:', error);
    console.groupEnd();
    return null;
  }
};

// Auto-run debug in development mode
if (process.env.NODE_ENV === 'development') {
  // Make debug functions available globally for console testing
  (window as any).debugApi = {
    debugApiConfiguration,
    debugContentDataManager,
    debugGitHubStore,
    testGitHubApiCall,
  };
  
  console.log('🛠️ Debug utilities available: window.debugApi');
}