"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  Check,
  Copy,
  Download,
  Star,
} from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { useLayoutEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const EMAIL = "info.yakit@gmail.com";
const CALENDAR_URL = "https://calendar.app.google/ypbJ6dDfSNKwwfxA9";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Tikay2k23", icon: FaGithub },
  {
    label: "Instagram",
    href: "https://www.instagram.com/info.yakit",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/markangelo.yakit/",
    icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/info-yakit",
    icon: FaLinkedinIn,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639648902655",
    icon: FaWhatsapp,
  },
];

export default function About() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stackTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 92%",
              end: "top 32%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });

          stackTimeline
            .fromTo(
              contentRef.current,
              { y: 90 },
              { y: 0, ease: "none", duration: 1 },
              0,
            )
            .to(
              headingRef.current,
              {
                y: -24,
                scale: 0.965,
                opacity: 0.22,
                ease: "none",
                duration: 1,
              },
              0,
            );

          const refreshFrame = window.requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );

          return () => {
            window.cancelAnimationFrame(refreshFrame);
            stackTimeline.kill();
          };
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-shell scroll-mt-28"
      aria-labelledby="about-title"
    >
      <div className="section-inner">
        <div ref={headingRef} id="about-title" className="about-heading-stage">
          <SectionHeading
            index="02"
            eyebrow="About"
            title="Clear systems. Less friction. Better follow-through."
            accent="Better"
          />
        </div>

        <div ref={contentRef} className="about-layout about-content-stack">
          <ScrollReveal>
            <p className="about-statement">
              I build reliable CRM systems, funnels, websites, and automations for
              service businesses and digital agencies.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="about-detail">
            <p>
              My work focuses on turning messy business processes into clean,
              trackable, automated systems that are easy for teams to use and
              maintain.
            </p>

            <div className="about-contact-panel">
              <div className="about-actions">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="about-action-button about-action-primary"
                >
                  <CalendarDays aria-hidden="true" />
                  Schedule a call
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="about-action-button about-action-secondary"
                >
                  {copied ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {copied ? "Email copied" : "Copy email"}
                </button>
                <a
                  href="/Mark-Yakit-CV.pdf"
                  download="Mark-Yakit-CV.pdf"
                  className="about-action-button about-action-secondary"
                >
                  <Download aria-hidden="true" />
                  Download CV
                </a>
              </div>

              <div className="about-trust">
                <div className="about-stars" aria-label="Five-star client rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} aria-hidden="true" />
                  ))}
                </div>
                <p>Trusted by 10+ clients</p>
              </div>

              <nav className="about-social-links" aria-label="Social profiles">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="about-social-button"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
