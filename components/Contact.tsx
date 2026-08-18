"use client";

import { ArrowUpRight, Mail, MapPin, Radio } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const EMAIL = "info.yakit@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/info-yakit",
  },
  {
    label: "GitHub",
    href: "https://github.com/Tikay2k23",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/info.yakit",
  },
];

type Status =
  | { kind: "idle" }
  | { kind: "opening" }
  | { kind: "fallback"; copied: boolean };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fallbackTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current);
      }
    },
    [],
  );

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const projectType = String(data.get("projectType") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `${projectType || "Portfolio inquiry"} from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    setStatus({ kind: "opening" });
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // A mailto: link fails silently when no mail client is registered. If this
    // page still holds focus a moment later, nothing opened: surface the address
    // and put the drafted message on the clipboard so it is not lost.
    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current);
    }

    fallbackTimer.current = window.setTimeout(() => {
      if (document.hidden || !document.hasFocus()) {
        setStatus({ kind: "idle" });
        return;
      }

      const copying = navigator.clipboard?.writeText(`${subject}\n\n${body}`);
      if (!copying) {
        setStatus({ kind: "fallback", copied: false });
        return;
      }

      copying
        .then(() => setStatus({ kind: "fallback", copied: true }))
        .catch(() => setStatus({ kind: "fallback", copied: false }));
    }, 2000);
  };

  return (
    <section id="contact" className="contact-section scroll-mt-28" aria-labelledby="contact-title">
      <div className="section-inner">
        <div id="contact-title">
          <SectionHeading
            index="08"
            eyebrow="Contact"
            title="Have a system that needs to work better?"
            accent="better?"
            copy="Tell me what is getting in the way and what a successful outcome looks like."
            invert
          />
        </div>

        <div className="contact-layout">
          <ScrollReveal className="contact-details">
            <p className="contact-intro">
              I’m available for focused builds, ongoing systems support, and
              agency collaboration.
            </p>

            <dl>
              <div>
                <dt><Mail className="h-4 w-4" /> Email</dt>
                <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
              </div>
              <div>
                <dt><MapPin className="h-4 w-4" /> Location</dt>
                <dd>Philippines / Remote</dd>
              </div>
              <div>
                <dt><Radio className="h-4 w-4" /> Availability</dt>
                <dd>Open to selected projects</dd>
              </div>
            </dl>

            <div className="social-placeholders" aria-label="Social profiles">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form onSubmit={submitForm} className="contact-form">
              <div className="form-grid">
                <label>
                  <span>Full name</span>
                  <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                </label>
              </div>

              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="" required>
                  <option value="" disabled>Select a project type</option>
                  <option>GoHighLevel CRM Setup</option>
                  <option>Workflow Automation</option>
                  <option>Website or Funnel</option>
                  <option>API / Webhook Integration</option>
                  <option>Technical Troubleshooting</option>
                  <option>Ongoing Systems Support</option>
                </select>
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="What are you building, and where is the current friction?"
                />
              </label>

              <div className="form-submit">
                <button type="submit" className="button button-orange">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <p aria-live="polite" className="form-status">
                  {status.kind === "opening" ? "Opening your email app..." : null}
                  {status.kind === "fallback" ? (
                    <>
                      {status.copied
                        ? "Message copied to your clipboard. "
                        : "Your email app did not open. "}
                      You can reach me directly at{" "}
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </>
                  ) : null}
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
