// Origin used for canonical URLs, Open Graph tags, robots.txt and the sitemap,
// resolved in order of specificity:
//
//   1. NEXT_PUBLIC_SITE_URL   - set this when the site has a custom domain.
//   2. VERCEL_PROJECT_PRODUCTION_URL - injected by Vercel at build time and
//      always the project's production domain, so deployments are correct with
//      no dashboard configuration. (VERCEL_URL is deliberately not used: it is
//      unique per deployment and would make canonical URLs point at a build.)
//   3. localhost, for local development.
//
// Only read from server components, so the Vercel variable does not need the
// NEXT_PUBLIC_ prefix.
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Mark Yakit";

export const SITE_TITLE =
  "Mark Yakit | CRM, Automation & Full-Stack Development";

export const SITE_DESCRIPTION =
  "Portfolio of Mark Yakit, a GoHighLevel systems builder, CRM automation specialist, API integrator, and full-stack web developer.";
