import { ECOSYSTEM_ROLES } from "../data/landing-content";
import { HeroCanvas } from "./hero-section";

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative py-28 bg-[#18231F] text-command-foreground overflow-hidden"
    >
      <div className="opacity-20">
        <HeroCanvas />
      </div>

      <div className="absolute inset-0 opacity-15" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-3 mb-10 text-[10px] font-medium uppercase tracking-[0.22em] text-command-foreground/60 reveal">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary status-blink" />
          </span>
          <span className="hidden sm:inline text-amber-500">03 - The network oyaAlerts needs</span>
        </div>

        <div className="max-w-2xl mb-16 reveal">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            Real response is built by a community, not an app.
          </h2>
          <p className="text-command-foreground/70 text-lg leading-relaxed">
            oyaAlerts only works when the people who can actually show up are part of it. We are not
            announcing partnerships - we are explaining who the network needs, and inviting them in.
          </p>
        </div>

        <div className="border-t border-command-foreground/15">
          {ECOSYSTEM_ROLES.map((item, index) => (
            <div
              key={item.title}
              className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 md:gap-10 items-center justify-between py-5 border-b border-command-foreground/15 reveal hover:bg-command-foreground/3 transition-colors"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* <h4 className="text-base md:text-lg font-medium">{item.title}</h4> */}
              <p className=" text-sm text-command-foreground/65 leading-relaxed">{item.note}</p>
              <p className="inline-flex justify-end items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-command-foreground/55">
                <span className="size-1.5 rounded-full bg-amber" />
                Needed
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
