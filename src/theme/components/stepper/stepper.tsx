import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../layouts/Container';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { Typography } from '../typography/typography';
import styles from './stepper.module.scss';

interface StepperProps {
  steps: {
    label: string;
    description: string;
    completed: boolean;
    currentStep?: boolean;
  }[];
  currentStep?: number;
}

const FluentStepper: React.FC<StepperProps> = ({ steps }) => {
  const { theme } = useAppTheme();

  return (
    <Container
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-around'
      paddingLeft='0'
      paddingRight='0'
    >
      {steps.map((step, idx) => (
        <React.Fragment key={step.label + idx}>
          <Container
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minWidth='80px'
            maxWidth='120px'
            padding='0'
          >
            <FluentIcon
              color={theme.palette.themeSecondary}
              iconName={
                step.label === 'Complete' &&
                (step.currentStep || step.completed)
                  ? 'Checkmark'
                  : step.currentStep
                    ? 'CircleFill'
                    : step.completed
                      ? 'Checkmark'
                      : 'CircleRing'
              }
              size='medium'
            />
            <Typography
              textAlign='center'
              marginTop='0.5rem'
              color={
                theme.themeMode === 'high-contrast'
                  ? theme.semanticColors.successIcon
                  : theme.palette.themePrimary
              }
              variant='h6'
              fontSize='clamp(0.75rem, 1.5vw, 0.95rem)'
              style={{ whiteSpace: 'nowrap' }}
            >
              {step.label}
            </Typography>
          </Container>
          {idx < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                background: theme.palette.themeSecondary,
                alignSelf: 'center',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

const StepperWithArrows: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const { theme } = useAppTheme();

  // Check scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // Scroll by a fixed amount
  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
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
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflowY: 'hidden' }}>
      {canScrollLeft && (
        <button
          type='button'
          className='stepper-arrow-btn'
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            background: theme.palette.white,
            borderRadius: '50%',
            padding: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => scrollBy(-120)}
          aria-label='Scroll left'
        >
          <FluentIcon
            iconName='ChevronLeft'
            color={theme.palette.themePrimary}
            size='medium'
          />
        </button>
      )}
      <div
        ref={scrollRef}
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          marginBottom: '1rem',
          scrollBehavior: 'smooth',
          padding: '0',
          margin: '0 auto',
        }}
      >
        <FluentStepper steps={steps} currentStep={currentStep} />
      </div>
      {canScrollRight && (
        <button
          type='button'
          className={styles.stepperArrowBtn}
          style={{
            paddingLeft: '0',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            background: theme.palette.white,
            borderRadius: '50%',
            padding: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => scrollBy(120)}
          aria-label='Scroll right'
        >
          <FluentIcon
            iconName='ChevronRight'
            color={theme.palette.themePrimary}
            size='medium'
          />
        </button>
      )}
    </div>
  );
};

export default StepperWithArrows;
