import React from 'react';

// Remove zustand store import
// import useAnimationStore from '../../../../store/store-specs/animationStore';
import { animationSteps } from '../constants';

// Hooks
import { useFadeIn, useFadeOut, useScrollDown } from './useAnimations';
// Typing hooks for typing and backspacing
import {
  useLineByLineTyping,
  useTypewriter,
  useBackspace,
} from './useTypingHooks';

const useOnboardingAnimation = () => {
  // console.log('[useOnboardingAnimation] MOUNT');
  // Use local state for animation
  const [waitDone, setWaitDone] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [styleStep, setStyleStep] = React.useState(0);
  const [backspaceTarget, setBackspaceTarget] = React.useState('');

  const currentStep = animationSteps[stepIndex];
  const phase = currentStep.type;
  const fullText =
    'text' in currentStep
      ? currentStep.text
      : 'markup' in currentStep
        ? currentStep.markup
        : '';
  const speed = ('speed' in currentStep && currentStep.speed) || 40;
  // console.log('[useOnboardingAnimation] fullText:', fullText);
  // console.log('[useOnboardingAnimation] speed:', speed);
  const typedText = useTypewriter(fullText, speed);
  const lineByLineText = useLineByLineTyping(fullText, speed);
  const backspaceText = useBackspace(backspaceTarget, speed);
  const fadeOutText = useFadeOut(fullText, speed);
  const fadeInText = useFadeIn(fullText, speed);
  const scrollDownText = useScrollDown(fullText, speed);

  // Wait phase: set up timer
  React.useEffect(() => {
    if (phase === 'wait') {
      setWaitDone(false);
      const duration = currentStep.duration || 1000;
      const timeout = setTimeout(() => setWaitDone(true), duration);
      return () => clearTimeout(timeout);
    }
  }, [phase, stepIndex, currentStep]);

  // Compute if the current phase is done
  const isPhaseDone = (() => {
    switch (phase) {
      case 'wait':
        return waitDone;
      case 'typing':
      case 'mistake':
      case 'success':
      case 'final':
      case 'completed':
        return typedText.length === fullText.length;
      case 'backspace':
        return backspaceText.length === 0;
      case 'styling':
        return lineByLineText.length === 0;
      // Add more cases as needed
      default:
        return false;
    }
  })();

  const displayedText = React.useMemo(() => {
    if (
      phase === 'typing' ||
      phase === 'mistake' ||
      phase === 'markup' ||
      phase === 'pre-style' ||
      phase === 'success' ||
      phase === 'final' ||
      phase === 'completed'
    )
      return typedText;
    if (phase === 'backspace') return backspaceText;
    if (phase === 'styling') return lineByLineText;
    if ('text' in currentStep) return currentStep.text;
    if ('markup' in currentStep) return currentStep.markup;
    if (phase === 'fade-out') return fadeOutText;
    if (phase === 'fade-in') return fadeInText;
    if (phase === 'scroll-down') return scrollDownText;
    return '';
  }, [
    phase,
    fadeOutText,
    fadeInText,
    scrollDownText,
    typedText,
    backspaceText,
    lineByLineText,
    currentStep,
  ]);

  const prevMarkup = React.useMemo(() => {
    return animationSteps
      .slice(0, stepIndex)
      .reverse()
      .find((step) => step.type === 'markup')?.markup;
  }, [stepIndex]);

  // Set backspace target only when entering backspace phase
  React.useEffect(() => {
    if (phase === 'backspace') {
      const prevStep = animationSteps[stepIndex - 1];
      if ('text' in prevStep) setBackspaceTarget(prevStep.text);
      else if ('markup' in prevStep) setBackspaceTarget(prevStep.markup);
      else setBackspaceTarget('');
    }
  }, [phase, stepIndex]);

  // Step advancement effect
  React.useEffect(() => {
    if (isPhaseDone && stepIndex < animationSteps.length - 1) {
      const pause = currentStep.pauseAfterStep ?? 800;
      const timeout = setTimeout(() => {
        setStepIndex((i) => i + 1);
        setWaitDone(false);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [isPhaseDone, stepIndex, currentStep]);

  // Reset styleStep when stepIndex changes
  React.useEffect(() => {
    setStyleStep(0);
  }, [stepIndex]);

  // console.log('[useOnboardingAnimation] render', { stepIndex, phase });

  return {
    phase,
    stepIndex,
    styleStep,
    displayedText,
    currentStep,
    prevMarkup,
  };
};

export default useOnboardingAnimation;
