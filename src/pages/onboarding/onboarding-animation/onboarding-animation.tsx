import React from 'react';

import { Typography } from '../../../theme/components/typography/typography';
import { FluentButton } from '../../../theme/components/button/button';
import { buttonStyleSteps, h1StyleSteps, h3StyleSteps } from './constants';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import useOnboardingAnimation from './hooks/useOnboardingAnimation';
import { ViewportGrid } from '../../../theme/layouts/ViewportGrid';

type TypingAnimationProps = {
  stage: string;
  typed: string;
  styleStep: number;
  currentStep?: any;
};

const NonStyledTypography = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '2rem' }}>{children}</p>
);

const FinalH1Typography = () => (
  <Typography
    variant='h1'
    style={getMergedStyle(h1StyleSteps, h1StyleSteps.length - 1)}
  >
    welcome in!
  </Typography>
);

const FinalH3Typography = () => (
  <Typography
    variant='h3'
    textAlign='center'
    style={getMergedStyle(h3StyleSteps, h3StyleSteps.length - 1)}
  >
    I'm glad you're here :)
  </Typography>
);

const FinalFluentButton = () => (
  <FluentButton size='large' variant='primary'>
    Start
  </FluentButton>
);

export const BlinkingCursor: React.FC = () => {
  const blinkingCursorStyles = {
    display: 'inline-block',
    width: 'clamp(0.5ch, 1cqi, 1ch)',
    animation: 'blink 1s steps(1) infinite',
    color: 'inherit',
    fontWeight: 300,
    fontSize: 'clamp(1.5rem, 2cqi, 3rem)',
    verticalAlign: 'baseline',
  };

  return (
    <span style={blinkingCursorStyles}>
      |
      <style>
        {`
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}
      </style>
    </span>
  );
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ stage, typed }) => {
  const { theme } = useAppTheme();

  const typingStyles = {
    fontSize: 'clamp(1rem, 2cqi, 2rem)',
    color: theme.palette.neutralPrimary,
  };

  if (stage === 'typing') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code style={typingStyles}>{typed}</code>
        <BlinkingCursor />
      </div>
    );
  }

  if (stage === 'backspace') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code style={typingStyles}>{typed}</code>
        <BlinkingCursor />
      </div>
    );
  }

  if (stage === 'mistake') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code className='mistake-text' style={typingStyles}>
          {typed}
          <BlinkingCursor />
        </code>
      </div>
    );
  }

  if (stage === 'markup') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code style={typingStyles}>{typed}</code>
        <BlinkingCursor />
      </div>
    );
  }

  if (stage === 'styling') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code style={typingStyles}>{/* ... */}</code>
        <BlinkingCursor />
      </div>
    );
  }

  if (stage === 'success' || stage === 'completed') {
    return (
      <div className='onboarding-typed-animation-container'>
        <code className='success-text' style={typingStyles}>
          {typed}
          <BlinkingCursor />
        </code>
      </div>
    );
  }

  return null;
};

// Helper: progressively merge style steps
const getMergedStyle = (steps: any[], styleStep: number) =>
  steps
    .slice(0, styleStep + 1)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

const CSSAnimation: React.FC<{
  stage: string;
  styleStep: number;
  currentStep?: any;
  prevMarkup?: string;
}> = ({ stage, styleStep, currentStep, prevMarkup }) => {
  let content: React.ReactNode = null;

  if (stage === 'typing' && currentStep?.text) {
    content = <NonStyledTypography>{currentStep?.text}</NonStyledTypography>;
  }

  if (stage === 'backspace' && currentStep?.text) {
    content = <NonStyledTypography>{currentStep?.text}</NonStyledTypography>;
  }

  if (stage === 'markup' && currentStep?.markup) {
    if (currentStep.markup === '<h1>welcome in!</h1>') {
      content = <h1>welcome in!</h1>;
    }

    if (currentStep.markup === "<h3>I'm glad you're here :)</h3>") {
      content = <h3>I'm glad you're here :)</h3>;
    }

    if (currentStep.markup === '<button>Start</button>') {
      content = <button>Start</button>;
    }
  }

  // needs to be incrementally styled on each step within the styling phase
  // for now, just return the markup
  if (stage === 'pre-style' && prevMarkup) {
    content = <div dangerouslySetInnerHTML={{ __html: prevMarkup }} />;
  }

  // Styling output (progressively styled JSX)
  if (stage === 'styling' && currentStep?.styleKey) {
    if (currentStep.styleKey === h1StyleSteps) {
      if (styleStep === h1StyleSteps.length - 1) {
        content = <FinalH1Typography />;
      } else {
        content = (
          <h1 style={getMergedStyle(h1StyleSteps, styleStep)}>welcome in!</h1>
        );
      }
    } else if (currentStep.styleKey === h3StyleSteps) {
      if (styleStep === h3StyleSteps.length - 1) {
        content = <FinalH3Typography />;
      } else {
        content = (
          <h3 style={getMergedStyle(h3StyleSteps, styleStep)}>
            I'm glad you're here :)
          </h3>
        );
      }
    } else if (currentStep.styleKey === buttonStyleSteps) {
      if (styleStep === buttonStyleSteps.length - 1) {
        content = <FinalFluentButton />;
      } else {
        content = (
          <button
            type='button'
            style={getMergedStyle(buttonStyleSteps, styleStep)}
          >
            Start
          </button>
        );
      }
    }
  }

  // Final output (fully styled)
  if (stage === 'completed') {
    content = (
      <div>
        <FinalH1Typography />
        <FinalH3Typography />
        <FinalFluentButton />
      </div>
    );
  }

  // Default fallback
  if (!content) {
    content = <div>&nbsp;</div>;
  }

  return <div className='onboarding-css-animation-container'>{content}</div>;
};

const OnboardingAnimation: React.FC<{ animationClassName?: string }> = ({
  animationClassName,
}) => {
  console.log('[OnboardingAnimation] MOUNT');
  const didMount = React.useRef(false);
  React.useEffect(() => {
    if (didMount.current) {
      console.warn('OnboardingAnimation remounted!');
    } else {
      console.log('[OnboardingAnimation] didMount OK');
      didMount.current = true;
    }
  }, []);

  const { phase, styleStep, displayedText, currentStep, prevMarkup } =
    useOnboardingAnimation();

  return (
    <ViewportGrid
      className={animationClassName}
      leftChildren={
        <TypingAnimation
          stage={phase}
          typed={(displayedText as string) ?? ''}
          styleStep={styleStep}
        />
      }
      rightChildren={
        <CSSAnimation
          stage={phase}
          styleStep={styleStep}
          currentStep={currentStep}
          prevMarkup={prevMarkup}
        />
      }
    />
  );
};

export default OnboardingAnimation;
