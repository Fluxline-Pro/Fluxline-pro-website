import { FluentButton } from '../button';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { useAppTheme } from '../../../hooks/useAppTheme';

interface BookingsButtonProps {
  animateSubHeader?: boolean;
  isContactMePage?: boolean;
  willAnimate?: boolean; // Add this to indicate if animation will happen
  style?: React.CSSProperties; // Add style prop for custom styling
  isNavigationButton?: boolean; // Add prop to indicate if used in navigation
}

export const BookingsButton = ({
  animateSubHeader,
  willAnimate,
  isContactMePage = false,
  style,
  isNavigationButton = false,
}: BookingsButtonProps) => {
  const orientation = useDeviceOrientation();

  const bookingsButton = () => {
    const url =
      'https://outlook.office.com/owa/calendar/Bookings@terencewaters.com/bookings/';
    window.open(url, '_blank');
  };
  const { theme } = useAppTheme();

  return (
    <FluentButton
      variant='primary'
      onClick={bookingsButton}
      style={{
        marginTop: orientation === 'portrait' ? '0' : '1rem',
        marginBottom: isContactMePage ? '1rem !important' : '0 !important',
        padding: '12px 16px',
        minHeight: orientation === 'portrait' ? '40px' : undefined,
        minWidth: '250px',
        maxWidth: '500px',
        width: animateSubHeader || orientation === 'portrait' ? '100%' : 'auto',
        fontSize: `${
          orientation === 'mobile-landscape'
            ? theme.typography.fonts.h6.fontSize
            : theme.typography.fonts.h4.fontSize
        }`,
        fontWeight: '600', // Slightly bolder for better emphasis
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)', // Enhanced shadow for better visibility
        ...(willAnimate &&
          !animateSubHeader && {
            opacity: 0,
            transform: 'translateY(20px)',
          }),
        ...(animateSubHeader === true && {
          opacity: 0,
          transform: 'translateY(20px)',
          animation: 'slideInUp 0.4s ease-in-out forwards',
          animationDelay: '2.1s',
        }),
        ...(animateSubHeader === false &&
          !willAnimate && {
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ...(animateSubHeader === undefined &&
          !willAnimate && {
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ...(orientation === 'portrait' && {
          fontSize: 'clamp(1.2rem, 3.2cqi, 1.8rem)',
        }),
        ...(orientation === 'square' && {
          fontSize: 'clamp(1.25rem, 3.7cqi, 1.3rem)',
        }),
        ...((orientation === 'landscape' || orientation === 'ultrawide') && {
          fontSize: 'clamp(1.25rem, 2.2cqi, 1.5rem)',
        }),
        ...(orientation === 'mobile-landscape' && {
          fontSize: 'clamp(1.2rem, 3.2cqi, 1.5rem)',
        }),
        // Apply navigation-specific styles when used in navigation
        ...(isNavigationButton && {
          margin: '0',
          padding: '8px 12px',
          minWidth: 'auto',
          width: 'auto',
          fontSize: '14px',
          fontWeight: '500',
          height: '36px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginTop: '0',
          marginBottom: '0',
        }),
        // Apply custom style overrides
        ...style,
      }}
    >
      {isNavigationButton ? 'Book a consultation' : 'Book a free consultation'}
    </FluentButton>
  );
};
