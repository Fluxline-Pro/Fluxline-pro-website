// import React from 'react';
// import { useIsMobile } from '../hooks/useMediaQuery';

export function useMobileScroll() {
  // const [isScrolledPast, setIsScrolledPast] = React.useState(true);
  const isScrolledPast = true;
  // const isMobile = useIsMobile();

  // React.useEffect(() => { // removed the hook since we no longer need it
  //   const handleScroll = () => {
  //     if (!isMobile) return;

  //     // Look for any element with id 'imageCard' or any UnifiedCard with viewType='image'
  //     const imageCardElement = document.getElementById('imageCard');
  //     if (!imageCardElement) return;

  //     const rect = imageCardElement.getBoundingClientRect();
  //     const isPassedImage = rect.bottom <= 0;

  //     setIsScrolledPast(isPassedImage);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   // Also listen for touchmove for smoother mobile experience
  //   window.addEventListener('touchmove', handleScroll, { passive: true });

  //   // Initial check
  //   handleScroll();

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     window.removeEventListener('touchmove', handleScroll);
  //   };
  // }, [isMobile]);

  return isScrolledPast;
}
