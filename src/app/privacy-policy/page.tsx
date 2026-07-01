import type { Metadata } from "next";

import { LegalPageShell } from "@/features/oya-alerts/components/legal-page-shell";
import { getLegalPage } from "@/features/oya-alerts/data/legal-pages";
import PrivacyPolicy from "./details";

const page = getLegalPage("privacy-policy");

export const metadata: Metadata = {
  title: "Privacy Policy - Oya Alerts",
  description: page?.description,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title={page!.title} description={page!.description}>
      <PrivacyPolicy />
    </LegalPageShell>
  );
}
