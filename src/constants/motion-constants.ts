import { HTMLMotionProps } from 'framer-motion';

export type MotionType = 'SLIDE' | 'FADE' | 'POP' | 'DRAWER' | 'DROPDOWN';

type IMotionConstants = {
  [key in MotionType]: HTMLMotionProps<'div'>;
};

export const MOTION: IMotionConstants = {
  SLIDE: {
    initial: { opacity: 0, y: '50%' },
    animate: { opacity: 1, y: 0, transition: { bounce: 0, duration: 0.3 } },
  },
  FADE: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  POP: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0, transition: { bounce: 0, duration: 0.2 } },
    exit: { opacity: 0, y: '100%' },
  },
  DRAWER: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: { bounce: 0, duration: 0.2 },
  },
  DROPDOWN: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.1 },
  },
};
