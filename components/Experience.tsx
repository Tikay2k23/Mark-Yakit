import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const experience = [
  {
    number: "01",
    role: "GoHighLevel Systems Builder / CRM & Automation Specialist",
    period: "July 2024 - Present",
    focus: "CRM architecture, lead operations, automations, funnels, integrations, and technical support.",
  },
  {
    number: "02",
    role: "WordPress & Web Development Specialist",
    period: "March 2022 - Present",
    focus: "Responsive websites, landing pages, front-end implementation, maintenance, and troubleshooting.",
  },
];

export default function Experience() {
  return (
    <section className="section-shell" aria-labelledby="experience-title">
      <div className="section-inner">
        <div id="experience-title">
          <SectionHeading
            index="05"
            eyebrow="Experience"
            title="Built through hands-on systems work."
            accent="hands-on"
          />
        </div>

        <div className="experience-list">
          {experience.map((item, index) => (
            <ScrollReveal key={item.number} delay={index * 0.08} blur>
              <article className="experience-row">
                <span className="experience-number">{item.number}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.focus}</p>
                </div>
                <time>{item.period}</time>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
