import { FAQ_ITEMS } from "../data/landing-content";

export function FaqSection() {
  return (
    <section id="faq" className="py-28 max-w-4xl mx-auto px-6 reveal">
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
          06 - Questions Before you join
        </span>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          Answers to the hardest questions before we ship.
        </h2>
      </div>
      <div className="divide-y divide-border border-t border-border">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-6">
              <span className="font-medium text-lg pr-2 group-hover:text-primary transition-colors">
                {item.q}
              </span>
              <span className="font-serif text-2xl text-muted-foreground group-open:rotate-45 transition-transform shrink-0">
                +
              </span>
            </summary>
            <p className="mt-4 text-muted-foreground text-[0.95rem] leading-relaxed max-w-2xl">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
