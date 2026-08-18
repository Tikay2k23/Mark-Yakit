import ScrollReveal from "./ScrollReveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  invert?: boolean;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  copy,
  invert = false,
}: SectionHeadingProps) {
  const accentIndex = accent ? title.indexOf(accent) : -1;
  const heading =
    accent && accentIndex >= 0 ? (
      <>
        {title.slice(0, accentIndex)}
        <span className="section-heading-accent">{accent}</span>
        {title.slice(accentIndex + accent.length)}
      </>
    ) : (
      title
    );

  return (
    <div className="section-heading">
      <ScrollReveal className="section-heading-meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="section-heading-copy">
        <h2 className={invert ? "text-[#f4f4ef]" : "text-[#20201f]"}>{heading}</h2>
        {copy ? (
          <p className={invert ? "text-white/60" : "text-[#20201f]/65"}>{copy}</p>
        ) : null}
      </ScrollReveal>
    </div>
  );
}
