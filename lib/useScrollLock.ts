"use client";

import { useEffect } from "react";
import { getLenisInstance } from "./lenis";

/**
 * Locks page scrolling while `locked` is true.
 *
 * Two things have to happen, and neither covers the other:
 *
 * 1. `overflow: hidden` goes on <body>, not <html>. Because globals.css sets
 *    `body { overflow-x: hidden }`, body is the element that generates the
 *    page's scrollbar, so hiding overflow on the root has no effect here.
 * 2. Lenis is stopped. It scrolls the page programmatically in response to
 *    wheel events, and programmatic scrolling is never blocked by
 *    `overflow: hidden` — without this the page keeps moving behind the overlay.
 */
export default function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    // Hiding the scrollbar reflows the page; pad by its width to avoid a jump.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const lenis = getLenisInstance();

    lenis?.stop();
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      lenis?.start();
    };
  }, [locked]);
}
