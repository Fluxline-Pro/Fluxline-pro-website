/**
 * Environment Variables Test
 * Simple utility to test if environment variables are loading properly
 */

export const testEnvironmentVariables = () => {
  // console.group('🧪 Environment Variables Test');

  const envVars = {
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_CDN_BASE_URL: process.env.REACT_APP_CDN_BASE_URL,
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
    REACT_APP_BRANCH: process.env.REACT_APP_BRANCH,
    NODE_ENV: process.env.NODE_ENV,
  };

  // console.log('Raw Environment Variables:');
  Object.entries(envVars).forEach(([key, value]) => {
    if (key.includes('API_KEY') && value) {
      // console.log(`  ${key}: ${value.substring(0, 10)}...`);
    } else {
      // console.log(`  ${key}: ${value || 'NOT SET'}`);
    }
  });

  const allSet = Object.entries(envVars)
    .filter(([key]) => key.startsWith('REACT_APP_'))
    .every(([_, value]) => !!value);

  // console.log(`\n✅ All REACT_APP_ variables set: ${allSet}`);

  if (!allSet) {
    // console.log('❌ Missing environment variables detected!');
    // console.log('💡 Make sure:');
    // console.log('   1. File is named .env.local (with dot)');
    // console.log('   2. React dev server has been restarted');
    // console.log('   3. Variables start with REACT_APP_');
  }

  // console.groupEnd();
  return allSet;
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  testEnvironmentVariables();
}
