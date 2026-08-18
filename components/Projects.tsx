"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Database,
  Globe2,
  PanelsTopLeft,
  Route,
  Workflow,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import useScrollLock from "@/lib/useScrollLock";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Project = {
  title: string;
  category: string;
  description: string;
  outcome: string;
  tags: string[];
  icon: LucideIcon;
  visual: string;
};

// These are intentionally anonymized portfolio concepts. Replace with approved client work.
const projects: Project[] = [
  {
    title: "CRM Automation System",
    category: "GoHighLevel / Operations",
    description:
      "A complete lead-to-client lifecycle with qualification, ownership, reminders, and pipeline visibility.",
    outcome:
      "Designed to reduce manual follow-up and give sales teams a reliable view of every lead's next action.",
    tags: ["GHL", "Workflows", "Pipelines"],
    icon: Workflow,
    visual: "project-visual-orange",
  },
  {
    title: "GHL Funnel & Booking Flow",
    category: "Conversion / Automation",
    description:
      "A responsive campaign funnel connected to calendars, confirmations, and no-show recovery.",
    outcome:
      "Built to make booking frictionless while keeping every appointment status synchronized inside the CRM.",
    tags: ["Funnels", "Calendars", "SMS"],
    icon: PanelsTopLeft,
    visual: "project-visual-silver",
  },
  {
    title: "Real Estate Lead Routing",
    category: "Routing / Sales Ops",
    description:
      "Region-aware lead distribution with round-robin logic, reassignment rules, and escalation paths.",
    outcome:
      "Structured to distribute opportunities quickly and surface uncontacted leads before they go cold.",
    tags: ["Routing", "Round Robin", "Alerts"],
    icon: Route,
    visual: "project-visual-lime",
  },
  {
    title: "WordPress Website Build",
    category: "Web Design / Development",
    description:
      "A modular service-business website with responsive templates and a maintainable content system.",
    outcome:
      "Created to give the internal team flexible page-building tools without compromising visual consistency.",
    tags: ["WordPress", "Elementor", "Responsive"],
    icon: Globe2,
    visual: "project-visual-blue",
  },
  {
    title: "API Sync Dashboard",
    category: "Integration / Data",
    description:
      "A focused operations interface for reviewing sync health, data mappings, and integration exceptions.",
    outcome:
      "Conceptualized to make invisible integration failures visible and easier for non-technical teams to resolve.",
    tags: ["REST API", "Webhooks", "Monitoring"],
    icon: Database,
    visual: "project-visual-violet",
  },
  {
    title: "AI Follow-Up Assistant",
    category: "AI / Customer Experience",
    description:
      "An assisted follow-up flow that prepares context-aware responses while retaining human approval.",
    outcome:
      "Designed to shorten response time without letting automation remove judgment from high-value conversations.",
    tags: ["AI", "Prompts", "Human Review"],
    icon: Bot,
    visual: "project-visual-coral",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useScrollLock(Boolean(activeProject));

  // A callback ref runs the moment the panel lands in the DOM, which is more
  // reliable than waiting a frame and assuming the ref is attached by then.
  const attachPanel = useCallback((node: HTMLElement | null) => {
    panelRef.current = node;
    node
      ?.querySelector<HTMLElement>(".case-study-close")
      ?.focus({ preventScroll: true });
  }, []);

  const openProject = (
    project: Project,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    // Remember where focus came from so it can be handed back on close.
    triggerRef.current = event.currentTarget;
    setActiveProject(project);
  };

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        return;
      }

      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel) return;

      // Keep Tab inside the dialog instead of walking the page behind it.
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [activeProject]);

  return (
    <section id="portfolio" className="section-shell scroll-mt-28" aria-labelledby="portfolio-title">
      <div className="section-inner">
        <div id="portfolio-title">
          <SectionHeading
            index="04"
            eyebrow="Selected Work"
            title="Systems designed to move work forward."
            accent="forward."
            copy="Anonymized case-study concepts based on the kind of CRM, automation, web, and integration work I deliver."
          />
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <ScrollReveal key={project.title} delay={index % 2 === 1 ? 0.08 : 0}>
                <article className="project-card group">
                  <button
                    type="button"
                    onClick={(event) => openProject(project, event)}
                    className={`project-visual ${project.visual}`}
                    aria-label={`View case study: ${project.title}`}
                  >
                    <span className="project-browser-bar">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="project-visual-grid" />
                    <Icon aria-hidden="true" className="project-visual-icon" strokeWidth={1.2} />
                    <span className="project-visual-label">{project.category}</span>
                  </button>

                  <div className="project-content">
                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <p>{project.description}</p>
                    <button
                      type="button"
                      onClick={(event) => openProject(project, event)}
                      className="project-link"
                    >
                      View case study
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            className="case-study-backdrop"
            onClick={() => setActiveProject(null)}
          >
            <motion.article
              ref={attachPanel}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="case-study-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close case study"
                onClick={() => setActiveProject(null)}
                className="case-study-close"
              >
                <X className="h-5 w-5" />
              </button>

              <p>{activeProject.category}</p>
              <h2 id="case-study-title">{activeProject.title}</h2>
              <div className="case-study-rule" />
              <p className="case-study-lead">{activeProject.description}</p>
              <h3>System intent</h3>
              <p className="case-study-body">{activeProject.outcome}</p>
              <div className="case-study-tags">
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="#contact" onClick={() => setActiveProject(null)} className="button button-orange">
                Discuss a similar project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
