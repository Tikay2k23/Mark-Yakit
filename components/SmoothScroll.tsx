"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { setLenisInstance } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const desktopQuery = window.matchMedia("(min-width: 1000px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const stop = () => {
      if (!lenis) return;

      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenis = null;
      setLenisInstance(null);
      gsap.ticker.lagSmoothing(500, 33);
    };

    const syncMode = () => {
      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        stop();
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        anchors: { duration: 1.2, offset: 0 },
        autoRaf: false,
        // autoToggle owns the stopped state and makes lenis.stop() a no-op,
        // which overlays rely on to pause scrolling. This effect already
        // creates and destroys the instance per media query, so it is not needed.
        autoToggle: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
      });

      setLenisInstance(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    syncMode();
    desktopQuery.addEventListener("change", syncMode);
    reducedMotionQuery.addEventListener("change", syncMode);

    return () => {
      desktopQuery.removeEventListener("change", syncMode);
      reducedMotionQuery.removeEventListener("change", syncMode);
      stop();
    };
  }, []);

  return null;
}
