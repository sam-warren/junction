// src/lib/motion.ts

/** Cubic Beziér curves used across the site. */
export const EASE = {
  /** Apple-flavored snap-out. Default for state changes. */
  default: [0.2, 0, 0, 1] as const,
  /** Ease-in for exits. */
  exit: [0.4, 0, 1, 1] as const,
};

/** Durations in ms. Match make-interfaces-feel-better cadence. */
export const DURATION = {
  state: 200,
  enter: 400,
  hero: 800,
};

/**
 * Spring config for `motion` library.
 * bounce is ALWAYS 0 per make-interfaces-feel-better §7.
 */
export const SPRING = {
  default: { type: "spring", duration: 0.3, bounce: 0 } as const,
};
