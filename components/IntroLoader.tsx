"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? 120 : 1350,
    );

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: shouldReduceMotion
              ? "inset(0 0 0 0)"
              : "inset(0 0 100% 0)",
          }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141413] text-white"
        >
          <div className="w-[min(78vw,360px)]">
            <div className="flex items-end justify-between">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-xl font-black tracking-normal"
              >
                MARK YAKIT
              </motion.span>
              <span className="text-[10px] font-bold uppercase text-white/42">Portfolio 2026</span>
            </div>
            <div className="mt-4 h-px overflow-hidden bg-white/14">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
                className="h-full origin-left bg-[#ef7c00]"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
