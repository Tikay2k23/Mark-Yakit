"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import useScrollLock from "@/lib/useScrollLock";

// Replace or reorder navigation links here.
const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["skills", "about", "portfolio", "reviews", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6 md:bottom-[38px] md:top-auto">
      <div className="nav-blur-stack" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isScrolled ? 0.96 : 1,
          paddingTop: isScrolled ? 6 : 8,
          paddingBottom: isScrolled ? 6 : 8,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "pointer-events-auto relative z-10 mx-auto flex w-[calc(100vw-2rem)] items-center justify-between rounded-full border px-2 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-colors duration-500 md:h-[54px] md:w-[45vw] md:min-w-[560px] md:max-w-[570px] md:px-[7px]",
          isScrolled
            ? "border-black/80 bg-[#111111] backdrop-blur-2xl"
            : "border-black bg-[#111111] backdrop-blur-xl",
        ].join(" ")}
      >
        <a
          href="#top"
          aria-label="Back to top"
          onClick={closeMenu}
          className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition duration-300 hover:bg-white/10 md:h-9 md:w-9"
        >
          <Home className="h-5 w-5 transition duration-300 group-hover:-translate-y-0.5 md:h-5 md:w-5" />
        </a>

        <div className="hidden items-center gap-3 px-2 md:flex">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeSection === item.href.slice(1)}
            />
          ))}
        </div>

        <a
          href="#contact"
          aria-current={activeSection === "contact" ? "location" : undefined}
          className="nav-contact-link hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-[#ef7c00] px-5 text-[15px] font-extrabold text-[#20201f] transition duration-300 hover:bg-[#ff8c08] hover:shadow-[0_0_34px_rgba(239,124,0,0.35)] md:inline-flex"
        >
          <span>
            <i>Contact me</i>
            <i>Hello, it&apos;s me</i>
          </span>
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition duration-300 hover:bg-white/10 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative z-10 mx-auto mt-3 max-w-sm overflow-hidden rounded-[2rem] border border-black/10 bg-[#111111] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:hidden"
          >
            {[...NAV_LINKS, { label: "Contact me", href: "#contact" }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-full px-5 py-4 text-base font-bold text-white/80 transition duration-300 hover:bg-white/[0.08] hover:text-white"
              >
                <span>{item.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef7c00]" />
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      aria-current={active ? "location" : undefined}
      className={[
        "group relative overflow-hidden rounded-full py-1.5 text-[15px] font-extrabold leading-none text-[#f4f4f4] transition duration-300 hover:text-white",
        label === "Portfolio" ? "px-1.5 pr-5" : "px-1.5",
      ].join(" ")}
    >
      <span aria-hidden="true" className="relative block h-4 overflow-hidden">
        <span className="block transition duration-300 group-hover:-translate-y-6">
          {label}
        </span>
        <span className="absolute left-0 top-6 flex items-center gap-1 text-white transition duration-300 group-hover:-translate-y-6">
          {label}
          {label === "Portfolio" ? <ChevronRight className="h-4 w-4" /> : null}
        </span>
      </span>
      {label === "Portfolio" ? (
        <ChevronRight aria-hidden="true" className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white/90" />
      ) : null}
    </a>
  );
}
