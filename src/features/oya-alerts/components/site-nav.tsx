"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import { BrandLogoDark } from "./brand-logo";

export function SiteNav({ className }: { className?: string } = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, targetId: string) {
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${targetId}`);
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      } ${className || ""}`}
    >
      <div className="flex justify-between items-center px-6 py-3 max-w-6xl mx-auto">
        <a href="/" aria-label="oyaAlerts home">
          <BrandLogoDark compact />
        </a>
        <div className="hidden md:flex gap-9 text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
          <a
            href="#why"
            onClick={(event) => handleAnchorClick(event, "why")}
            className="hover:text-foreground transition-colors"
          >
            Why
          </a>
          <a
            href="#how"
            onClick={(event) => handleAnchorClick(event, "how")}
            className="hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#ecosystem"
            onClick={(event) => handleAnchorClick(event, "ecosystem")}
            className="hover:text-foreground transition-colors"
          >
            Network
          </a>
          <a
            href="#faq"
            onClick={(event) => handleAnchorClick(event, "faq")}
            className="hover:text-foreground transition-colors"
          >
            FAQ
          </a>
          {/* <a
            href="#news"
            onClick={(event) => handleAnchorClick(event, "news")}
            className="hover:text-foreground transition-colors"
          >
            News
          </a> */}
          <a
            href="#vacancy"
            onClick={(event) => handleAnchorClick(event, "vacancy")}
            className="hover:text-foreground transition-colors"
          >
            Careers
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="#waitlist"
            onClick={(event) => handleAnchorClick(event, "waitlist")}
            className="px-5 py-2.5 bg-amber-500 text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Support the project
          </a>
          <a
            href="#waitlist"
            onClick={(event) => handleAnchorClick(event, "waitlist")}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            Join movement
          </a>
        </div>
      </div>
    </nav>
  );
}
