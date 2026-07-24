import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const highlights = [
  ["Lead Operations", "Multi-region lead routing systems"],
  ["Sales Automation", "Round-robin sales assignment workflows"],
  ["Appointments", "Appointment reminder systems"],
  ["Lead Recovery", "Missed-call text-back automations"],
  ["Integration", "Private integration testing"],
  ["Compliance", "A2P compliance support"],
  ["Data Operations", "CRM synchronization workflows"],
  ["Client Experience", "Client onboarding systems"],
];

export default function Highlights() {
  return (
    <section className="section-shell" aria-labelledby="highlights-title">
      <div className="section-inner">
        <div id="highlights-title">
          <SectionHeading
            index="03"
            eyebrow="Systems & Project Highlights"
            title="Operational work that holds up in the real world."
            accent="real world."
            copy="Selected system patterns and project categories. Client-specific implementation details remain confidential."
          />
        </div>

        <div className="highlights-list">
          {highlights.map(([category, title], index) => (
            <ScrollReveal key={title} delay={Math.min(index * 0.04, 0.16)}>
              <article className="highlight-row group">
                <span className="highlight-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="highlight-category">{category}</span>
                <h3>{title}</h3>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
