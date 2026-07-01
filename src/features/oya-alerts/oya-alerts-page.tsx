"use client";

import { useCallback, useRef } from "react";
import { EcosystemSection } from "./components/ecosystem-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";
import ScriptFormSection from "./components/waitlist-sec";
import { WhyExistSection } from "./components/why-exist-section";
import { WhyJoinSection } from "./components/why-join-section";
import { useScrollReveal } from "./hooks/use-scroll-reveal";
import StatsStrip from "./components/statstrip";
import LayersSection from "./components/layersection";
import { VacancySection } from "./components/vacancy-section";
import { NewsSection } from "./components/news-section";

export function OyaAlertsPage() {
  useScrollReveal();

  const formRef = useRef<HTMLElement | null>(null);

  const scrollToScriptForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15">
      <SiteNav />
      <HeroSection />
      <StatsStrip />
      <WhyExistSection />
      <HowItWorksSection />
      <EcosystemSection />
      <WhyJoinSection />
      <LayersSection />
      <ScriptFormSection refEl={formRef} />
      {/* <NewsSection /> */}
      <VacancySection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
