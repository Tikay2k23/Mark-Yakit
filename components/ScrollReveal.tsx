"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  blur?: boolean;
};

/**
 * Reveals its children as they scroll into view.
 *
 * The reveal is a progressive enhancement, never a gate on the content being
 * readable:
 *
 * - The hidden state lives in CSS behind `html.js`, so if scripting never runs
 *   the content simply renders visible instead of the page going blank.
 * - The transition is CSS rather than JavaScript-driven. iOS pauses
 *   requestAnimationFrame during momentum scrolling and throttles it in Low
 *   Power Mode, which can leave a JS-animated reveal stuck at opacity 0.
 * - Intersection uses a zero threshold with a bottom root margin, so elements
 *   taller than the viewport still trigger. A ratio-based threshold can never
 *   be reached by an element several screens tall.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 36,
  blur = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Toggled on the node rather than through state: this is purely visual, and
    // the page renders one of these per block, so re-rendering each is waste.
    const reveal = () => element.classList.add("is-revealed");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={["reveal", blur ? "reveal-blur" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--reveal-y": `${distance}px`,
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
