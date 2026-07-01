export const LEGAL_PAGES = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Oya Alerts collects, uses, and protects personal information.",
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    description: "The rules and conditions for using Oya Alerts products and services.",
  },
  {
    slug: "emergency-disclaimer",
    title: "Emergency Disclaimer",
    description: "Important limitations for emergency coordination and response expectations.",
  },
  {
    slug: "data-consent-language",
    title: "Data Consent Language",
    description: "Consent language for account, waitlist, location, incident, and circle data.",
  },
  {
    slug: "responder-code-of-conduct",
    title: "Responder Code of Conduct",
    description: "Safety, privacy, and conduct standards for Oya Alerts responders.",
  },
  {
    slug: "waitlist-consent-language",
    title: "Waitlist Consent Language",
    description: "Consent copy for waitlist, referral, launch, and safety update flows.",
  },
  {
    slug: "community-pilot-agreement",
    title: "Community Pilot Agreement Template",
    description: "Agreement template for estates, communities, businesses, and institutions.",
  },
] as const;

export type LegalPageSlug = (typeof LEGAL_PAGES)[number]["slug"];

export function getLegalPage(slug: LegalPageSlug) {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
