import { useRef } from "react";
import { BrandLogoDark } from "./brand-logo";

export function SiteNav({ className }: { className?: string } = {}) {
  return (
    <nav
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm  scroll-smooth ${className || ""}`}
    >
      <div className="flex justify-between items-center px-6 max-w-6xl mx-auto">
        <a href="/" aria-label="oyaAlerts home">
          <BrandLogoDark compact />
        </a>
        <div className="hidden md:flex gap-9 text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
          <a href="#why" className="hover:text-foreground transition-colors">
            Why
          </a>
          <a href="#how" className="hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#ecosystem" className="hover:text-foreground transition-colors">
            Network
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="#waitlist"
            className="px-5 py-2.5 bg-amber-500 text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Support The Project
          </a>
          <a
            href="#waitlist"
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}
