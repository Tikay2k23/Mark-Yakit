"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    number: "01",
    category: "CRM",
    title: "GoHighLevel CRM Setup",
    description:
      "Clean pipeline architecture, custom fields, calendars, permissions, and reporting foundations built around how your team actually works.",
    tags: ["Pipelines", "Calendars", "Reporting"],
  },
  {
    number: "02",
    category: "Automation",
    title: "Workflow Automation",
    description:
      "Reliable lead nurturing, assignment, follow-up, reminders, and operational workflows with thoughtful edge-case handling.",
    tags: ["Workflows", "Lead Nurture", "QA"],
  },
  {
    number: "03",
    category: "Conversion",
    title: "Funnel & Website Building",
    description:
      "Responsive funnels and marketing sites designed to make the next action obvious, measurable, and easy to maintain.",
    tags: ["Funnels", "UX", "Responsive"],
  },
  {
    number: "04",
    category: "Integration",
    title: "API / Webhook Integrations",
    description:
      "Secure connections between CRMs, forms, databases, and third-party tools with clear data mapping and failure handling.",
    tags: ["REST APIs", "Webhooks", "Data Sync"],
  },
  {
    number: "05",
    category: "Development",
    title: "WordPress Development",
    description:
      "Production-ready WordPress builds using Elementor, Avada, or Beaver Builder without sacrificing responsive polish.",
    tags: ["WordPress", "Elementor", "Avada"],
  },
  {
    number: "06",
    category: "AI",
    title: "AI-Assisted Automations",
    description:
      "Practical AI flows for qualification, follow-up, summarization, and internal assistance with human review where it matters.",
    tags: ["AI Agents", "Follow-Up", "Prompts"],
  },
  {
    number: "07",
    category: "Support",
    title: "Technical Troubleshooting",
    description:
      "Methodical diagnosis of broken workflows, sync issues, deliverability problems, and hard-to-reproduce system behavior.",
    tags: ["Debugging", "Deliverability", "Testing"],
  },
  {
    number: "08",
    category: "Operations",
    title: "SOP & System Documentation",
    description:
      "Clear handover guides, diagrams, naming standards, and team-ready SOPs that make complex systems understandable.",
    tags: ["SOPs", "Handover", "Training"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const layers = gsap.utils.toArray<HTMLElement>(
            ".skills-stack-layer",
          );
          const depthLayers = gsap.utils.toArray<HTMLElement>(
            ".skills-stack-depth",
          );

          const animations = depthLayers.slice(0, -1).map((layer, index) =>
            gsap.to(layer, {
              y: -10,
              scale: 0.965,
              opacity: 0.9,
              ease: "none",
              scrollTrigger: {
                trigger: layers[index + 1],
                start: "top 78%",
                end: "top 18%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }),
          );

          const refreshFrame = window.requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );

          return () => {
            window.cancelAnimationFrame(refreshFrame);
            animations.forEach((animation) => animation.kill());
          };
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-shell skills-journey-section scroll-mt-28"
      aria-labelledby="skills-title"
    >
      <div className="section-inner skills-journey-inner">
        <div className="skills-content-rail">
          <div className="skills-reference-intro">
            <ScrollReveal>
              <p className="skills-script">/ Services, Skills, Abilities</p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <h2 id="skills-title" className="skills-reference-title">
                What I do <span>best?</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="skills-reference-copy">
                I build CRM systems, automations, websites, and integrations
                that help teams move faster and follow up reliably.
              </p>
            </ScrollReveal>
          </div>

          <div className="skills-offset-stack">
            {services.map((service, index) => (
              <div
                key={service.number}
                className="skills-stack-layer"
                style={{ zIndex: index + 1 }}
              >
                <div className="skills-stack-depth">
                  <ScrollReveal
                    delay={Math.min(index * 0.035, 0.18)}
                    className="skills-offset-item"
                  >
                    <article className="skills-offset-card group">
                      <div className="skills-offset-meta">
                        <span className="service-index">{service.number}</span>
                        <span className="service-category">
                          {service.category}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-5 w-5 text-black/30 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#ef7c00]"
                        />
                      </div>

                      <h3>{service.title}</h3>
                      <p>{service.description}</p>

                      <div className="service-tags">
                        {service.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  </ScrollReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
