import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";
import TermsOfUse from "./details";

const page = getLegalPage("terms-of-use");

export const metadata: Metadata = {
  title: "Terms of Use - Oya Alerts",
  description: page?.description,
};

export default function TermsOfUsePage() {
  return (
    <LegalPageShell title={page!.title} description={page!.description}>
      <TermsOfUse />
    </LegalPageShell>
  );
}
