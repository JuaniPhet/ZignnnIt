/**
 * Types for hero-animations.js (plain JS, no dependency).
 * Starts the hero illustration animations on a document, a container or the
 * <svg id="zg-hero"> itself, and returns a cleanup function.
 */
export function initZgHero(root?: Document | Element): () => void;
