import { WAITLIST_REASONS } from "../data/landing-content";

export function WhyJoinSection() {
  return (
    <section className="py-28 border-t border-border bg-secondary/40">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start reveal">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            04 - Why joining matters
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">
            Your signup helps us decide where to launch first.
          </h2>
        </div>
        <ul className="space-y-5 pt-2">
          {WAITLIST_REASONS.map((reason, index) => (
            <li
              key={reason}
              className="flex gap-5 items-start py-3 border-t border-border/70 first:border-t-0"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary pt-1 w-10 shrink-0">
                0{index + 1}
              </span>
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
