"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "What systems do you build?",
    answer:
      "I build CRM pipelines, lead-routing systems, follow-up workflows, booking flows, onboarding systems, reporting foundations, and the integrations that connect them.",
  },
  {
    question: "Do you work with GoHighLevel?",
    answer:
      "Yes. GoHighLevel is a core part of my systems work, including sub-account setup, snapshots, workflows, calendars, funnels, permissions, data structure, and troubleshooting.",
  },
  {
    question: "Can you build websites and funnels?",
    answer:
      "Yes. I create responsive websites and conversion-focused funnels in GoHighLevel and WordPress, with careful attention to mobile layouts and maintainability.",
  },
  {
    question: "Can you connect APIs and webhooks?",
    answer:
      "Yes. I map data between platforms, configure webhook-driven flows, test requests and responses, handle common failure states, and document how the connection works.",
  },
  {
    question: "Can you document the system after setup?",
    answer:
      "Yes. Documentation can include SOPs, naming conventions, diagrams, test checklists, handover notes, and team training material.",
  },
  {
    question: "Can you work with agencies?",
    answer:
      "Yes. I can support agencies as a behind-the-scenes systems builder, collaborate inside an existing delivery process, and respect confidential client relationships.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell" aria-labelledby="faq-title">
      <div className="section-inner">
        <div id="faq-title">
          <SectionHeading
            index="07"
            eyebrow="FAQ"
            title="A few useful answers before we start."
            accent="useful"
          />
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;

            return (
              <article key={item.question} className="faq-item">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {item.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
