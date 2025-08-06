import React from 'react';

import { AnimationStep } from '../onboarding.types';
// Emojis
export const EMOJI_ANGRY = '😠';
export const EMOJI_SMILE = '😄';
export const EMOJI_FIRE = '🔥';
export const EMOJI_ROCKET = '🚀';
export const EMOJI_CONFETTI = '🎉';
export const EMOJI_PAINT = '🎨';
export const EMOJI_SWEAT = '😅';

// Typing animation texts for all the states
const introText = `well hi there! ${EMOJI_SMILE}`;
const fullTextOne = `welcome in! ${EMOJI_SMILE}`;
const fullTextTwo = `I'm glad you're here :)`;
const fullTextThree = `Start`;

const mistakeTextIntro = 'Hmmm...';
const mistakeTextIntroOneA = `This probably isn't the best way to show my skills, is it? ${EMOJI_SWEAT}`;
const mistakeTextIntroOne = `Hey, I know! ${EMOJI_SMILE}`;
const mistakeTextIntroTwo = `I'll bring you in with a warm welcome! ${EMOJI_PAINT}`;
const mistakeTextOne = `First, let's make my welcome text bigger...`;
const mistakeTextTwo = `Ugh! I forgot again. ${EMOJI_ANGRY} Let's make that a subheading.`;
const mistakeTextThree = `Well, you can't click on that, can you now? ${EMOJI_ANGRY} Let's make that a button!`;
const mistakeTextFour = `Let's make that a button!`;

const markupTextOne = `<h1 class="css-H1heading">
  welcome in!
</h1>`;
const markupTextTwo = `<h3 class="css-H3heading">
  I'm glad you're here :)
</h3>`;
const markupTextThree = `<button class="css-button">
  Start
</button>`;

const stylingTextOne = `Something is missing... styling perhaps? ${EMOJI_ROCKET}`;
const stylingTextTwo = `Let's add some styling to that. ${EMOJI_FIRE}`;
const stylingTextThree = `And now... the finishing touches! ${EMOJI_ROCKET}`;

const successTextOne = `Great! Now let's make a subheading.`;
const successTextTwo = `Perfect! Now let's make a button.`;
const successTextThree = `There we go. We're done! ${EMOJI_CONFETTI}`;

const finalText = '...well then...';
const completedText = `Now I can properly introduce you! ${EMOJI_SMILE}`;

const HTMLCodeOne = `
  <h1 class="css-H1heading">
    welcome in!
  </h1>
`;

const HTMLCodeTwo = `
  <h3 class="css-H3heading">
    I'm glad you're here :)
  </h3>
`;

const HTMLCodeThree = `
  <button class="css-button">
    Start
  </button>
`;

const CSSCodeOne = [
  '.css-H1heading { ',
  'color: #0078d4;',
  'font-size: clamp(4rem, 4cqi, 6rem);',
  'text-shadow: 2px 4px 4px rgba(0,0,0,0.2);',
  'margin-bottom: clamp(0.5rem, 1cqi, 1rem);',
  '}',
];

const CSSCodeTwo = [
  '.css-H3heading { ',
  'color: #333;',
  'font-size: clamp(1.5rem, 3cqi, 3.5rem);',
  'font-weight: 200;',
  'font-variation-settings: "wght" 300, "wdth" 200, "slnt" 0;',
  'margin-bottom: clamp(1rem, 2cqi, 2rem);',
  '}',
];

const CSSCodeThree = [
  '.css-button { ',
  'background: #0078d4;',
  'font-size: 1.25rem;',
  'padding: 1rem 2rem;',
  'border-radius: 0.5rem;',
  'border: none;',
  'cursor: pointer;',
  '}',
];

const h1StyleSteps = [
  { color: '#0078d4' },
  { fontFamily: 'proxima-nova, "Roboto Flex", Arial, Helvetica, sans-serif' },
  { fontSize: 'clamp(4rem, 4cqi, 6rem)' },
  { textShadow: '2px 4px 4px rgba(0,0,0,0.2)' },
  { marginBottom: 'clamp(0.5rem, 1cqi, 1rem)' },
];

const h3StyleSteps = [
  { color: '#333' },
  { fontFamily: '"Roboto Flex", Arial, Helvetica,sans-serif' },
  { fontSize: 'clamp(1.5rem, 3cqi, 3.5rem)' },
  { fontWeight: '200' },
  { fontVariationSettings: '"wght" 300, "wdth" 200, "slnt" 0' },
  { marginBottom: 'clamp(1rem, 2cqi, 2rem)' },
];

const buttonStyleSteps = [
  { background: '#0078d4' },
  { fontFamily: '"Roboto Flex", Arial, Helvetica, sans-serif' },
  { fontSize: '1.25rem' },
  { padding: '1rem 2rem' },
  { borderRadius: '0.5rem' },
  { border: 'none' },
];

const animationSteps: AnimationStep[] = [
  // first step heading h1
  { type: 'wait', duration: 1000 },
  { type: 'typing', text: introText, speed: 175, pauseAfterStep: 2000 },
  { type: 'backspace', text: introText, speed: 80, pauseAfterStep: 200 },
  { type: 'typing', text: fullTextOne, speed: 175, pauseAfterStep: 2000 },
  { type: 'backspace', text: fullTextOne, speed: 80, pauseAfterStep: 200 },
  { type: 'typing', text: mistakeTextIntro, speed: 175, pauseAfterStep: 2000 },
  // { type: 'scroll-down', text: mistakeTextIntro, speed: 70, pauseAfterStep: 200 },
  { type: 'typing', text: mistakeTextIntroOneA, speed: 175, pauseAfterStep: 2000 },
  {
    type: 'backspace',
    text: mistakeTextIntroOneA,
    speed: 70,
    pauseAfterStep: 200,
  },
  { type: 'typing', text: mistakeTextIntroOne, speed: 175, pauseAfterStep: 2000 },
  {
    type: 'typing',
    text: mistakeTextIntroOne,
    speed: 175,
    pauseAfterStep: 2000,
  },
  {
    type: 'backspace',
    text: mistakeTextIntroOne,
    speed: 70,
    pauseAfterStep: 200,
  },
  {
    type: 'typing',
    text: mistakeTextIntroTwo,
    speed: 175,
    pauseAfterStep: 2000,
  },
  {
    type: 'backspace',
    text: mistakeTextIntroTwo,
    speed: 70,
    pauseAfterStep: 200,
  },
  { type: 'mistake', text: mistakeTextOne, speed: 195, pauseAfterStep: 2000 },
  // { type: 'fade-out', text: mistakeTextOne, speed: 70, pauseAfterStep: 200 },
  { type: 'markup', markup: markupTextOne, speed: 180, pauseAfterStep: 1000 },
  // { type: 'scroll-down', text: markupTextOne, speed: 70, pauseAfterStep: 200 },
  { type: 'pre-style', text: stylingTextOne, speed: 125, pauseAfterStep: 2000 },
  { type: 'styling', styleKey: h1StyleSteps, speed: 200, pauseAfterStep: 1000 },
  { type: 'scroll-down', text: stylingTextOne, speed: 70, pauseAfterStep: 200 },
  { type: 'success', text: successTextOne, speed: 150, pauseAfterStep: 2000 },
  { type: 'backspace', text: successTextOne, speed: 110, pauseAfterStep: 200 },

  // second step heading h3
  { type: 'wait', duration: 1000 },
  { type: 'typing', text: fullTextTwo, speed: 175, pauseAfterStep: 2000 },
  { type: 'backspace', text: fullTextTwo, speed: 120, pauseAfterStep: 200 },
  { type: 'mistake', text: mistakeTextTwo, speed: 175, pauseAfterStep: 2000 },
  { type: 'backspace', text: mistakeTextTwo, speed: 70, pauseAfterStep: 200 },
  { type: 'markup', markup: markupTextTwo, speed: 125, pauseAfterStep: 1000 },
  { type: 'pre-style', text: stylingTextTwo, speed: 125, pauseAfterStep: 2000 },
  { type: 'styling', styleKey: h3StyleSteps, speed: 125, pauseAfterStep: 1000 },
  { type: 'success', text: successTextTwo, speed: 120, pauseAfterStep: 2000 },
  { type: 'backspace', text: successTextTwo, speed: 70, pauseAfterStep: 200 },

  // third step button
  { type: 'wait', duration: 1000 },
  { type: 'typing', text: fullTextThree, speed: 150, pauseAfterStep: 2000 },
  { type: 'backspace', text: fullTextThree, speed: 120, pauseAfterStep: 200 },
  { type: 'mistake', text: mistakeTextThree, speed: 120, pauseAfterStep: 2000 },
  {
    type: 'backspace',
    text: mistakeTextThree,
    speed: 70,
    pauseAfterStep: 2000,
  },
  { type: 'typing', text: mistakeTextFour, speed: 150, pauseAfterStep: 2000 },
  { type: 'backspace', text: mistakeTextFour, speed: 120, pauseAfterStep: 200 },
  { type: 'markup', markup: markupTextThree, speed: 125, pauseAfterStep: 1000 },
  {
    type: 'pre-style',
    text: stylingTextThree,
    speed: 125,
    pauseAfterStep: 2000,
  },
  {
    type: 'styling',
    styleKey: buttonStyleSteps,
    speed: 125,
    pauseAfterStep: 1000,
  },
  { type: 'success', text: successTextThree, speed: 120, pauseAfterStep: 2000 },
  {
    type: 'backspace',
    text: successTextThree,
    speed: 120,
    pauseAfterStep: 200,
  },

  // final step and completion
  { type: 'wait', duration: 1000 },
  { type: 'final', text: finalText, speed: 120, pauseAfterStep: 2000 },
  { type: 'completed', text: completedText, speed: 120, pauseAfterStep: 2000 },
];

const useBackspace = (text: string, speed = 120) => {
  const [typed, setTyped] = React.useState(text);

  // Reset when text changes
  React.useEffect(() => {
    setTyped(text);
  }, [text]);

  React.useEffect(() => {
    if (typed.length > 0) {
      const timeout = setTimeout(
        () => setTyped(typed.slice(0, typed.length - 1)),
        speed
      );
      return () => clearTimeout(timeout);
    }
  }, [typed, speed]);

  return typed;
};

export {
  fullTextOne,
  fullTextTwo,
  fullTextThree,
  mistakeTextOne,
  mistakeTextTwo,
  mistakeTextThree,
  successTextOne,
  successTextTwo,
  successTextThree,
  finalText,
  completedText,
  stylingTextOne,
  stylingTextTwo,
  stylingTextThree,
  HTMLCodeOne,
  HTMLCodeTwo,
  HTMLCodeThree,
  CSSCodeOne,
  CSSCodeTwo,
  CSSCodeThree,
  h1StyleSteps,
  h3StyleSteps,
  buttonStyleSteps,
  animationSteps,
  useBackspace,
};
