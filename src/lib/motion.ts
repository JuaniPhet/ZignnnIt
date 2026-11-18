import type Lenis from "lenis";

/**
 * Shared motion helpers.
 * Guardrails (brief §7.3): respect prefers-reduced-motion, no mouse effects on touch
 * devices, animate only transform/opacity.
 */

/** True when the visitor asked the OS for reduced motion. Always false on the server. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on devices with a precise pointer that can hover (mouse/trackpad), i.e. desktop. */
export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Height of the fixed header, used as offset when scrolling to an anchor. */
export const HEADER_OFFSET = 96;

// Single Lenis instance, created by <SmoothScroll /> and read by other components
// (e.g. the mobile menu stops scrolling while it is open).
let lenisInstance: Lenis | null = null;
export const setLenis = (lenis: Lenis | null) => {
  lenisInstance = lenis;
};
export const getLenis = () => lenisInstance;
