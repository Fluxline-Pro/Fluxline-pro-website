import {
  h1StyleSteps,
  h3StyleSteps,
  buttonStyleSteps,
} from './onboarding-animation/constants';

// Animation steps array
export type AnimationStep =
  | ({ type: 'wait'; duration: number } & { pauseAfterStep?: number })
  | ({ type: 'typing'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'backspace'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'mistake'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'markup'; markup: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'pre-style'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({
      type: 'styling';
      styleKey:
        | typeof h1StyleSteps
        | typeof h3StyleSteps
        | typeof buttonStyleSteps;
      speed: number;
    } & { pauseAfterStep?: number })
  | ({ type: 'success'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'final'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'completed'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'fade-out'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'fade-in'; text: string; speed: number } & {
      pauseAfterStep?: number;
    })
  | ({ type: 'scroll-down'; text: string; speed: number } & {
      pauseAfterStep?: number;
    });
