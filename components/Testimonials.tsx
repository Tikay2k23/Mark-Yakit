import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

// Replace these six placeholder testimonials with approved client quotes before launch.
const testimonials = [
  {
    quote:
      "Mark translated a complicated process into a system our team could understand and actually use every day.",
    name: "Agency Operations Lead",
    context: "CRM Implementation",
  },
  {
    quote:
      "The workflow was carefully tested, clearly documented, and handed over without leaving us dependent on the builder.",
    name: "Service Business Founder",
    context: "Workflow Automation",
  },
  {
    quote:
      "He spotted the routing edge cases early and gave us a much cleaner way to manage lead ownership.",
    name: "Sales Manager",
    context: "Lead Operations",
  },
  {
    quote:
      "Communication stayed practical and focused. Every recommendation connected back to an operational goal.",
    name: "Digital Agency Partner",
    context: "Systems Consulting",
  },
  {
    quote:
      "The new site feels polished on every screen, and the internal team can update it without breaking the design.",
    name: "Marketing Director",
    context: "WordPress Build",
  },
  {
    quote:
      "A reliable technical partner who can move between CRM logic, APIs, and front-end details without losing context.",
    name: "Product Consultant",
    context: "Integration Project",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="reviews-section scroll-mt-28" aria-labelledby="reviews-title">
      <div className="section-inner">
        <div id="reviews-title">
          <SectionHeading
            index="06"
            eyebrow="Reviews"
            title="Trusted for clarity, follow-through, and careful systems thinking."
            accent="follow-through"
            invert
          />
        </div>
      </div>

      <div className="reviews-marquee">
        <div className="reviews-track">
          {[0, 1].map((set) => (
            <div key={set} className="reviews-set" aria-hidden={set === 1}>
              {testimonials.map((testimonial) => (
                <article key={`${set}-${testimonial.name}`} className="testimonial-card">
                  <Quote aria-hidden="true" className="h-6 w-6 text-[#ef7c00]" />
                  <blockquote>{testimonial.quote}</blockquote>
                  <footer>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.context}</span>
                  </footer>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
