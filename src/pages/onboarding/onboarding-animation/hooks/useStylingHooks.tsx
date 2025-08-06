import React from 'react';
import { h1StyleSteps, h3StyleSteps, buttonStyleSteps } from '../constants';

const markupMap: Record<string, React.ReactNode> = {
  'markup-one': <h1>welcome in!</h1>,
  'markup-two': <h3>I'm glad you're here :)</h3>,
  'markup-three': <button>Start</button>,
};

const CSSCode: Record<string, Array<Record<string, any>>> = {
  'styling-one': h1StyleSteps,
  'styling-two': h3StyleSteps,
  'styling-three': buttonStyleSteps,
};

const useRenderMarkup = (stage: string) => markupMap[stage] || null;

const useRenderCSSLineByLine = (stage: string) => {
  const steps = CSSCode[stage] || [];
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    setStepIndex(0); // Reset on stage change
    if (steps.length === 0) return;
    if (stepIndex < steps.length - 1) {
      const timeout = setTimeout(() => setStepIndex(stepIndex + 1), 500);
      return () => clearTimeout(timeout);
    }
  }, [stage, stepIndex, steps.length]);

  // Merge all steps up to the current index for cumulative styling
  const mergedStyle = steps
    .slice(0, stepIndex + 1)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return mergedStyle;
};

const useRenderFinalCSS = (stage: string) => {
  const [finalCSS, setFinalCSS] = React.useState<Record<string, any> | null>(
    null
  );

  React.useEffect(() => {
    const steps = CSSCode[stage];
    setFinalCSS(steps[steps.length - 1]);
  }, [stage]);

  return finalCSS;
};

export { useRenderMarkup, useRenderCSSLineByLine, useRenderFinalCSS };
