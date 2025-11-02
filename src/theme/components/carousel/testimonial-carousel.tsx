import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../layouts/Container';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';

export interface TestimonialCarouselProps {
  children: React.ReactNode[];
  onItemClick?: (index: number) => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  children,
  onItemClick,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Determine how many cards to show at once
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  // Check scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5); // Small threshold to account for rounding
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  };

  // Scroll by one card width
  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.scrollWidth / children.length;
    const scrollAmount = cardWidth * cardsToShow;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children.length]);

  return (
    <Container
      position="relative"
      fullWidth
      style={{ overflow: 'hidden' }}
    >
      {/* Left Arrow */}
      {canScrollLeft && !isMobile && (
        <button
          type="button"
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            background: theme.palette.white,
            borderRadius: '50%',
            padding: '0.75rem',
            border: `2px solid ${theme.palette.neutralLight}`,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLighter;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <FluentIcon
            iconName="ChevronLeft"
            color={theme.palette.themePrimary}
            size="medium"
          />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: theme.spacing.m,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: isMobile ? '1rem 0.5rem' : '1rem 2rem',
        }}
        className="testimonial-carousel-scroll"
      >
        {children.map((child, index) => (
          <div
            key={index}
            onClick={() => onItemClick?.(index)}
            style={{
              minWidth: isMobile
                ? 'calc(100% - 1rem)'
                : isTablet
                ? 'calc(50% - 1rem)'
                : 'calc(33.333% - 1rem)',
              scrollSnapAlign: 'start',
              cursor: onItemClick ? 'pointer' : 'default',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (onItemClick) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (onItemClick) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && !isMobile && (
        <button
          type="button"
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            background: theme.palette.white,
            borderRadius: '50%',
            padding: '0.75rem',
            border: `2px solid ${theme.palette.neutralLight}`,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLighter;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <FluentIcon
            iconName="ChevronRight"
            color={theme.palette.themePrimary}
            size="medium"
          />
        </button>
      )}

      {/* Hide scrollbar with CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .testimonial-carousel-scroll::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />
    </Container>
  );
};
