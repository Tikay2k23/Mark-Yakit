import type Lenis from "lenis";

// SmoothScroll owns the Lenis instance; overlays need to reach it so they can
// pause smooth scrolling while they are open.
//
// This is kept on `window` rather than in module scope because the layout and
// the page are separate client entry points, so a module-level variable is not
// guaranteed to resolve to the same instance in both.
declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export function setLenisInstance(next: Lenis | null) {
  window.__lenis = next;
}

export function getLenisInstance(): Lenis | null {
  return typeof window === "undefined" ? null : window.__lenis ?? null;
}
