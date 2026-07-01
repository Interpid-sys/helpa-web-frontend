import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";

const page = getLegalPage("waitlist-consent-language");

export const metadata: Metadata = {
  title: "Waitlist Consent Language - Oya Alerts",
  description: page?.description,
};

export default function WaitlistConsentLanguagePage() {
  return <LegalPageShell title={page!.title} description={page!.description} />;
}
