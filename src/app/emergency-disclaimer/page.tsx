import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";
import EmergencyDisclaimer from "./details";

const page = getLegalPage("emergency-disclaimer");

export const metadata: Metadata = {
  title: "Emergency Disclaimer - Oya Alerts",
  description: page?.description,
};

export default function EmergencyDisclaimerPage() {
  return (
    <LegalPageShell title={page!.title} description={page!.description}>
      <EmergencyDisclaimer />
    </LegalPageShell>
  );
}
