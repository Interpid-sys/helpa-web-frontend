import { RESPONSE_STEPS } from "../data/landing-content";

export function HowItWorksSection() {
  return (
    <section id="how" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 max-w-2xl reveal">
          <span className="text-amber uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            02 - Response timeline
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            One signal. Everyone who can help, at once.
          </h2>
        </div>

        <ol className="relative reveal">
          <div className="absolute left-2.75 top-2 bottom-2 w-px bg-border md:hidden" aria-hidden />
          <div
            className="hidden md:block absolute left-0 right-0 top-8.4 h-px bg-border"
            aria-hidden
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-8">
            {RESPONSE_STEPS.map((step, index) => (
              <li
                key={step.n}
                className="relative pl-9 md:pl-0 md:pt-12 reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="absolute left-0 top-1.5 md:left-0 md:top-2.5 flex items-center justify-center size-5.5 rounded-full bg-background border border-primary/40">
                  <span className="size-2 rounded-full bg-primary" />
                </span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {step.n}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary px-2 py-0.5 rounded-full bg-primary/10">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium leading-snug">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
