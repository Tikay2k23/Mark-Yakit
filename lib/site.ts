// Set NEXT_PUBLIC_SITE_URL to the deployed origin (no trailing slash) so that
// canonical URLs, Open Graph tags, robots.txt, and the sitemap all point at the
// real domain. The fallback only keeps local development working.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const SITE_NAME = "Mark Yakit";

export const SITE_TITLE =
  "Mark Yakit | CRM, Automation & Full-Stack Development";

export const SITE_DESCRIPTION =
  "Portfolio of Mark Yakit, a GoHighLevel systems builder, CRM automation specialist, API integrator, and full-stack web developer.";
