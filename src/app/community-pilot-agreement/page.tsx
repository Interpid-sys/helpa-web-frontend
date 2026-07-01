import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";

const page = getLegalPage("community-pilot-agreement");

export const metadata: Metadata = {
  title: "Community Pilot Agreement Template - Oya Alerts",
  description: page?.description,
};

export default function CommunityPilotAgreementPage() {
  return <LegalPageShell title={page!.title} description={page!.description} />;
}
