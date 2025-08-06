import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@fluentui/react';

import { router } from './routing/routes';
import { FontScaleProvider } from './theme/components/font-scale/FontScaleProvider';
import { ImageColorProvider } from './theme/contexts/ImageColorContext';
import { DefaultFontScaleProvider } from './theme/hooks/useDefaultFontScale';

import './styles/_app.scss';

// Debug API configuration in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/debugApiConfig');
  import('./utils/envTest'); // Test environment variables loading
}

const App: React.FC = () => {
  // console.log('[App] RENDER');
  // React.useEffect(() => {
  //   // console.log('[App] MOUNT');
  //   return () => console.log('[App] UNMOUNT');
  // }, []);
  return (
    <ThemeProvider>
      <FontScaleProvider>
        <DefaultFontScaleProvider>
          <ImageColorProvider>
            <RouterProvider router={router} />
          </ImageColorProvider>
        </DefaultFontScaleProvider>
      </FontScaleProvider>
    </ThemeProvider>
  );
};

export default App;

// OLD CODE: to be removed later TODO: remove
// const AppContent: React.FC = () => {
//   // const { currentView, currentPostId } = useNavigationStore();

// Add this useEffect for debugging
// React.useEffect(() => {
//   console.log('Current view changed to:', currentView);
// }, [currentView]);

// const renderView = (isOnboarding: boolean, currentPostId: string | null) => {
//   console.log('Rendering view:', currentView); // Add this debug log
// switch (currentView) {
//   case 'home':
//     return <Home />;
//   case 'about':
//     return <About />;
//   case 'blog':
//     return currentPostId ? (
//       <ContentPost postId={currentPostId} />
//     ) : (
//       <Blog />
//     );
//   case 'books':
//     return <Books />;
//   case 'contact':
//     return <ContactMe />;
//   case 'events':
//     return <Events />;
//   case 'github':
//     return currentPostId ? (
//       <ContentPost postId={currentPostId} />
//     ) : (
//       <GitHub />
//     );
//   case 'music':
//     return currentPostId ? (
//       <ContentPost postId={currentPostId} />
//     ) : (
//       <Music />
//     );
//   case 'onboarding':
//     return <Onboarding />;
//   case 'portfolio':
//     return currentPostId ? (
//       <ContentPost postId={currentPostId} />
//     ) : (
//       <Portfolio />
//     );
//   default:
//     return <Home />;
// }
//   if (isOnboarding) {
//     return <Onboarding />;
//   } else if (currentPostId) {
//     return <ContentPost postId={currentPostId} />;
//   }
// };

//   return (
//     <>
//       <Navigation />
//       <Suspense fallback={<div>Loading...</div>}>{renderView()}</Suspense>
//     </>
//   );
// };

// Lazy load components
// const Home = React.lazy(() => import('./pages/home/home'));
// const About = React.lazy(() => import('./pages/about/about'));
// const Blog = React.lazy(() => import('./pages/blog/blog'));
// const Books = React.lazy(() => import('./pages/books/books'));
// const ContactMe = React.lazy(() => import('./pages/contact-me/contact-me'));
// const ContentPost = React.lazy(
//   () => import('./pages/content-post/content-post')
// );
// const Events = React.lazy(() => import('./pages/events/events'));
// const GitHub = React.lazy(() => import('./pages/github/github'));
// const Music = React.lazy(() => import('./pages/music/music'));
// const Onboarding = React.lazy(() => import('./pages/onboarding/onboarding'));
// const Portfolio = React.lazy(() => import('./pages/portfolio/portfolio'));
