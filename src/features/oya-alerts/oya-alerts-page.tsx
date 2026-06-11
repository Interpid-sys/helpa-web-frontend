"use client";

import { useCallback, useRef } from "react";
import { EcosystemSection } from "./components/ecosystem-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";
import ScriptFormSection from "./components/waitlist-sec";
import { WaitlistSection } from "./components/waitlist-section";
import { WhyExistSection } from "./components/why-exist-section";
import { WhyJoinSection } from "./components/why-join-section";
import { useScrollReveal } from "./hooks/use-scroll-reveal";
import { ScriptComparisonSections } from "./script-comparison/script-comparison-sections";
import StatsStrip from "./components/statstrip";
import LayersSection from "./components/layersection";

export function OyaAlertsPage() {
  useScrollReveal();

  const formRef = useRef<HTMLElement | null>(null);

  const scrollToScriptForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15">
      <SiteNav className="border-b border-muted" />
      <HeroSection />
      <StatsStrip />
      <WhyExistSection />
      <HowItWorksSection />
      <EcosystemSection />
      <WhyJoinSection />
      <LayersSection />
      <ScriptFormSection refEl={formRef} />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
