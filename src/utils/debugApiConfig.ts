/**
 * Debug Utility for API Configuration
 * Use this to debug API configuration issues
 */

import { createApiConfig } from '../api/config';
import { isApiAvailable } from '../utils/contentDataManager';

export const debugApiConfig = () => {
  // console.group('🔍 API Configuration Debug');

  // Check environment variables
  // console.log('Environment Variables');
  // console.log(
  //   '  REACT_APP_API_BASE_URL:',
  //   process.env.REACT_APP_API_BASE_URL || 'NOT SET'
  // );
  // console.log(
  //   '  REACT_APP_CDN_BASE_URL:',
  //   process.env.REACT_APP_CDN_BASE_URL || 'NOT SET'
  // );
  // console.log(
  //   '  REACT_APP_API_KEY:',
  //   process.env.REACT_APP_API_KEY ? 'SET (hidden)' : 'NOT SET'
  // );
  // console.log(
  //   '  REACT_APP_ENVIRONMENT:',
  //   process.env.REACT_APP_ENVIRONMENT || 'NOT SET'
  // );
  // console.log('  REACT_APP_BRANCH:', process.env.REACT_APP_BRANCH || 'NOT SET');

  // Check API availability
  const apiAvailable = isApiAvailable();
  // console.log('\nAPI Availability Check:');
  // console.log('  isApiAvailable():', apiAvailable);

  // Check API configuration only if we're likely to use it
  if (apiAvailable) {
    // console.log('\n✅ Real API Configuration:');
    try {
      // Create config but don't do anything with it to avoid unused variable warning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _config = createApiConfig();
      // console.log('  baseUrl:', _config.baseUrl);
      // console.log('  cdnBaseUrl:', _config.cdnBaseUrl);
      // console.log('  apiKey:', _config.apiKey ? 'SET (hidden)' : 'NOT SET');
      // console.log('  environment:', _config.environment);
      // console.log('  timeout:', _config.timeout);
      // console.log('  enableLogging:', _config.enableLogging);
    } catch (error) {
      // console.error('  Error creating API config:', error);
    }
  } else {
    // console.log('\n📋 Mock Data Mode Detected');
    // console.log('  Real API not configured or credentials invalid');
    // console.log(
    //   '  Note: mock-dev-api.Fluxline.pro and mock-tst-api.Fluxline.pro are REAL endpoints'
    // );
    // console.log(
    //   '  Check environment variables: REACT_APP_API_BASE_URL, REACT_APP_API_KEY, REACT_APP_CDN_BASE_URL'
    // );
  }

  // console.groupEnd();
};

// Auto-run debug in development
if (process.env.NODE_ENV === 'development') {
  debugApiConfig();
}
