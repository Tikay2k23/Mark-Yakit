"use client";

import { ArrowUpRight, Mail, MapPin, Radio } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
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

export default function Contact() {
  const [status, setStatus] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const projectType = String(data.get("projectType") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`${projectType || "Portfolio inquiry"} from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    setStatus("Opening your email app...");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
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
                <p aria-live="polite">{status}</p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
