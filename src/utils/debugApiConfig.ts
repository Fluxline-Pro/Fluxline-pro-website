/**
 * Debug Utility for API Configuration
 * Use this to debug API configuration issues
 */

import { createApiConfig } from '../api/config';
import { isApiAvailable } from '../utils/contentDataManager';

export const debugApiConfig = () => {
  console.group('🔍 API Configuration Debug');

  // Check environment variables
  console.log('Environment Variables:');
  console.log(
    '  REACT_APP_API_BASE_URL:',
    process.env.REACT_APP_API_BASE_URL || 'NOT SET'
  );
  console.log(
    '  REACT_APP_CDN_BASE_URL:',
    process.env.REACT_APP_CDN_BASE_URL || 'NOT SET'
  );
  console.log(
    '  REACT_APP_API_KEY:',
    process.env.REACT_APP_API_KEY ? 'SET (hidden)' : 'NOT SET'
  );
  console.log(
    '  REACT_APP_ENVIRONMENT:',
    process.env.REACT_APP_ENVIRONMENT || 'NOT SET'
  );
  console.log('  REACT_APP_BRANCH:', process.env.REACT_APP_BRANCH || 'NOT SET');

  // Check API availability
  const apiAvailable = isApiAvailable();
  console.log('\nAPI Availability Check:');
  console.log('  isApiAvailable():', apiAvailable);

  // Check API configuration only if we're likely to use it
  if (apiAvailable) {
    console.log('\n✅ Real API Configuration:');
    try {
      const config = createApiConfig();
      console.log('  baseUrl:', config.baseUrl);
      console.log('  cdnBaseUrl:', config.cdnBaseUrl);
      console.log('  apiKey:', config.apiKey ? 'SET (hidden)' : 'NOT SET');
      console.log('  environment:', config.environment);
      console.log('  timeout:', config.timeout);
      console.log('  enableLogging:', config.enableLogging);
    } catch (error) {
      console.error('  Error creating API config:', error);
    }
  } else {
    console.log('\n📋 Mock Data Mode Detected');
    console.log('  Real API not configured or credentials invalid');
    console.log(
      '  Note: mock-dev-api.terencewaters.com and mock-tst-api.terencewaters.com are REAL endpoints'
    );
    console.log(
      '  Check environment variables: REACT_APP_API_BASE_URL, REACT_APP_API_KEY, REACT_APP_CDN_BASE_URL'
    );
  }

  console.groupEnd();
};

// Auto-run debug in development
if (process.env.NODE_ENV === 'development') {
  debugApiConfig();
}
