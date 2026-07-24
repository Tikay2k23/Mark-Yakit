import { ArrowUp } from "lucide-react";

const footerLinks = [
  ["Skills", "#skills"],
  ["About", "#about"],
  ["Portfolio", "#portfolio"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">
        <div>
          <span>Let&apos;s work together</span>
          <i />
          <span>Let&apos;s work together</span>
          <i />
        </div>
      </div>

      <div className="section-inner footer-bottom">
        <div>
          <strong>MARK YAKIT</strong>
          <a href="mailto:info.yakit@gmail.com">info.yakit@gmail.com</a>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="footer-meta">
          <span>© {new Date().getFullYear()}</span>
          <a href="#top" aria-label="Back to top" title="Back to top">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
