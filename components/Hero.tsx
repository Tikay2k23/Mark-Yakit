"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { Transition } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { PointerEvent, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Replace name, role/title, location, portrait image, and background video here.
const PROFILE = {
  firstName: "MARK",
  lastName: "YAKIT",
  displayName: "Mark Yakit",
  roleLead: "GoHighLevel Systems Builder & API Integration Specialist",
  roleTitle: "CRM & Automation Specialist",
  location: "Full-Stack Web Developer",
  portraitSrc: "/images/graduation-photo-original-quality.webp",
  backgroundVideoSrc: "/images/background-loop.mp4",
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const revealTransition: Transition = {
  duration: 0.92,
  ease: smoothEase,
};

export default function Hero() {
  const [portraitAvailable, setPortraitAvailable] = useState(true);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const cardPinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const cardBackMediaRef = useRef<HTMLDivElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const rightCopyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cardX = useMotionValue(0);
  const cardRotate = useMotionValue(0);
  const smoothCardX = useSpring(cardX, { stiffness: 90, damping: 18, mass: 0.5 });
  const smoothCardRotate = useSpring(cardRotate, { stiffness: 90, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!videoAvailable) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    playVideo();
    document.addEventListener("visibilitychange", playVideo);

    return () => document.removeEventListener("visibilitychange", playVideo);
  }, [videoAvailable]);

  useLayoutEffect(() => {
    if (
      shouldReduceMotion ||
      !heroRef.current ||
      !cardPinRef.current ||
      !cardRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 1000px)", () => {
        const skillsSection = document.querySelector<HTMLElement>("#skills");
        const skillsStack =
          document.querySelector<HTMLElement>(".skills-offset-stack");
        const finalSkillsCard = skillsStack?.querySelector<HTMLElement>(
          ".skills-stack-layer:last-child",
        );
        if (!skillsSection || !skillsStack || !finalSkillsCard) return;

        const horizontalShift = () => Math.min(420, window.innerWidth * 0.25);

        gsap.set(cardRef.current, {
          autoAlpha: 1,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          x: 0,
          y: 0,
        });
        gsap.set(cardFrontRef.current, { opacity: 1 });
        gsap.set(cardBackRef.current, { opacity: 0 });
        gsap.set(cardBackMediaRef.current, { yPercent: -2, scale: 1.04 });

        const pin = ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          endTrigger: finalSkillsCard,
          end: "top 30%",
          pin: cardPinRef.current,
          pinSpacing: false,
          pinReparent: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        });

        heroTimeline
          .to(
            cardRef.current,
            {
              x: horizontalShift,
              y: 70,
              rotationZ: 8,
              ease: "power1.inOut",
              duration: 0.28,
            },
            0,
          )
          .to(
            leftCopyRef.current,
            { x: -96, opacity: 0.08, ease: "power1.inOut", duration: 0.5 },
            0,
          )
          .to(
            rightCopyRef.current,
            { x: 96, opacity: 0.08, ease: "power1.inOut", duration: 0.5 },
            0,
          );

        const skillsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: skillsStack,
            start: "top 90%",
            end: "top 38%",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        skillsTimeline
          .to(cardRef.current, {
            rotationY: 180,
            rotationZ: 6,
            scale: 1.08,
            ease: "power2.inOut",
            duration: 1,
          })
          .to(
            cardFrontRef.current,
            { opacity: 0, duration: 0.01 },
            "<50%",
          )
          .to(cardBackRef.current, { opacity: 1, duration: 0.01 }, "<")
          .to(cardRef.current, {
            scale: 1,
            ease: "power1.out",
            duration: 0.28,
          });

        const backParallaxTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: skillsSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.25,
            invalidateOnRefresh: true,
          },
        });

        backParallaxTimeline
          .to(
            cardBackMediaRef.current,
            {
              yPercent: 2,
              scale: 1.06,
              ease: "none",
            },
            0,
          );

        const exitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: finalSkillsCard,
            start: "top 78%",
            end: "top 30%",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        exitTimeline
          .to(cardRef.current, {
            rotationY: 360,
            ease: "power2.inOut",
            duration: 0.72,
          })
          .to(cardBackRef.current, { opacity: 0, duration: 0.01 }, "<50%")
          .to(cardFrontRef.current, { opacity: 1, duration: 0.01 }, "<")
          .to(cardRef.current, {
            autoAlpha: 0,
            y: 120,
            scale: 0.94,
            ease: "power1.in",
            duration: 0.28,
          });

        const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          window.cancelAnimationFrame(refreshFrame);
          pin.kill();
          heroTimeline.kill();
          skillsTimeline.kill();
          backParallaxTimeline.kill();
          exitTimeline.kill();
        };
      });
    }, heroRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  const movePortrait = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;

    cardX.set(normalizedX * 18);
    cardRotate.set(normalizedX * 1.6);
  };

  const resetPortrait = () => {
    cardX.set(0);
    cardRotate.set(0);
  };

  return (
    <section
      ref={heroRef}
      aria-label={`${PROFILE.displayName} portfolio hero`}
      className="hero-scroll-shell relative isolate bg-[#F2F2F0] text-[#292929]"
      onPointerMove={movePortrait}
      onPointerLeave={resetPortrait}
    >
      <div className="hero-stage relative h-[100svh] overflow-hidden">
        {videoAvailable ? (
          <video
            ref={videoRef}
            aria-hidden="true"
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => {
              if (videoRef.current) {
                void videoRef.current.play().catch(() => undefined);
              }
            }}
            onError={() => setVideoAvailable(false)}
          >
            <source src={PROFILE.backgroundVideoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className="hero-bottom-fade" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1640px] flex-col justify-center px-5 pb-8 pt-20 sm:px-8 sm:pb-12 md:pb-24 lg:px-12 lg:pb-32 lg:pt-14">
          <h1 className="sr-only">{PROFILE.displayName}</h1>

          <motion.div
            initial="hidden"
            animate="show"
            className="grid items-center gap-0 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_270px_minmax(0,1fr)] lg:gap-16 xl:gap-24"
          >
            <motion.div
              ref={leftCopyRef}
              className="order-2 text-left lg:order-1 lg:pt-10 lg:text-left"
            >
              <Reveal delay={0.16}>
                <p className="mb-3 text-[0.84rem] font-medium text-[#5f5f5f] sm:mb-5 sm:text-lg lg:mb-6 lg:whitespace-nowrap lg:text-sm xl:text-base">
                  {PROFILE.roleLead}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <NameReveal name={PROFILE.firstName} className="hero-name-left" />
              </Reveal>
            </motion.div>

            <div
              ref={cardPinRef}
              className="journey-card-pin order-1 lg:order-2 lg:mt-11"
            >
              <motion.div
                style={{ x: smoothCardX, rotate: smoothCardRotate }}
                className="relative"
              >
              <motion.div
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[420px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] bg-white/75 blur-3xl lg:block"
              />

              <motion.div
                initial={{ opacity: 0, y: 36, scale: 0.92, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ delay: 0.28, duration: 1.05, ease: smoothEase }}
                className="portrait-card-face relative lg:mx-auto"
              >
                <div ref={cardRef} className="scroll-card absolute inset-0">
                  <div ref={cardFrontRef} className="scroll-card-face scroll-card-front">
                    {portraitAvailable ? (
                      <Image
                        src={PROFILE.portraitSrc}
                        alt={`${PROFILE.displayName} portrait`}
                        fill
                        priority
                        sizes="(max-width: 999px) 66px, 270px"
                        className="object-cover object-top"
                        onError={() => setPortraitAvailable(false)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white via-[#eeeeeb] to-[#d7d7d3]">
                        <span className="font-display text-7xl font-black text-[#292929]/80">
                          {PROFILE.firstName[0]}
                          {PROFILE.lastName[0]}
                        </span>
                      </div>
                    )}

                    <div
                      className="scroll-card-bottom-fade scroll-card-bottom-fade-light"
                      aria-hidden="true"
                    />
                  </div>

                  <div ref={cardBackRef} className="scroll-card-face scroll-card-back">
                    <div
                      ref={cardBackMediaRef}
                      aria-hidden="true"
                      className="scroll-card-back-media"
                    >
                      <Image
                        src="/images/ama-logo-enhanced.webp"
                        alt="AMA logo"
                        fill
                        sizes="270px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div
                      className="scroll-card-bottom-fade scroll-card-bottom-fade-dark"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>
              </motion.div>
            </div>

            <motion.div
              ref={rightCopyRef}
              className="order-3 flex flex-col text-left lg:block lg:translate-y-2 lg:pt-20 lg:text-right"
            >
              {/* Stacked mobile order keeps both name lines together and moves
                  the role text below them; on lg the source order applies. */}
              <div className="order-2">
                <Reveal delay={0.24}>
                  <p className="mt-6 text-[0.84rem] font-medium text-[#5f5f5f] sm:mt-8 sm:text-lg lg:mb-6 lg:mt-0 lg:text-base">
                    {PROFILE.roleTitle}
                  </p>
                </Reveal>
              </div>
              <div className="order-1">
                <Reveal delay={0.3}>
                  <NameReveal name={PROFILE.lastName} className="hero-name-right" />
                </Reveal>
              </div>
              <div className="order-3 lg:translate-y-4">
                <Reveal delay={0.38}>
                  <p className="mt-1 text-[0.84rem] font-medium text-[#6b6b6b] sm:mt-1.5 sm:text-lg lg:mt-6 lg:text-base">
                    {PROFILE.location}
                  </p>
                </Reveal>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NameReveal({ name, className }: { name: string; className: string }) {
  return (
    <motion.p
      aria-hidden="true"
      className={`hero-name ${className}`}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045 } },
      }}
    >
      {name.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={{
            hidden: { y: "105%", opacity: 0, rotate: 2 },
            show: { y: "0%", opacity: 1, rotate: 0 },
          }}
          transition={{ duration: 0.72, ease: smoothEase }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.p>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        variants={{
          hidden: { y: "115%", opacity: 0 },
          show: { y: "0%", opacity: 1 },
        }}
        transition={{ ...revealTransition, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
