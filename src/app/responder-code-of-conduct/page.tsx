import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";

const page = getLegalPage("responder-code-of-conduct");

export const metadata: Metadata = {
  title: "Responder Code of Conduct - Oya Alerts",
  description: page?.description,
};

export default function ResponderCodeOfConductPage() {
  return <LegalPageShell title={page!.title} description={page!.description} />;
}
