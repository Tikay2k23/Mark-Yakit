const stats = [
  "2+ Years of Web Development Experience",
  "GoHighLevel Systems Builder",
  "CRM Automation Specialist",
  "WordPress / Elementor / Avada / Beaver Builder",
  "Workflow Automation",
  "API & Webhook Integrations",
  "Responsive Web Design",
  "SOP Documentation",
];

export default function StatsMarquee() {
  return (
    <section className="marquee-band" aria-label="Core expertise">
      <div className="marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="marquee-set" aria-hidden={set === 1}>
            {stats.map((stat) => (
              <span key={`${set}-${stat}`} className="marquee-item">
                <i />
                {stat}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
