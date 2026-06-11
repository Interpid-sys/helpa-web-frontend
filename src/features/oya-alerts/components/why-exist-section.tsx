const PROBLEM_POINTS = [
  {
    title: "Isolation",
    body: "A single call places everything on one overwhelmed system, with no fallback if no one answers.",
  },
  {
    title: "Invisibility",
    body: "Responders and community members nearby have no way of knowing someone needs them within walking distance.",
  },
  {
    title: "Coordination",
    body: "Even when help arrives, family, security, and medics rarely share the same thread of what is actually happening.",
  },
] as const;

export function WhyExistSection() {
  return (
    <section id="why" className="bg-secondary/50 py-28 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start reveal">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            01 - Why this needs to exist
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">
            In an emergency, most Nigerians are on their own.
          </h2>
        </div>
        <div className="space-y-7 pt-2 text-[1.0625rem] leading-relaxed text-muted-foreground">
          <p>
            Today, getting help in a crisis means dialing a number and hoping someone picks up.
            Lines are congested, addresses are hard to communicate, and the people closest to you -
            who could actually help - often never know anything happened.
          </p>
          {PROBLEM_POINTS.map((point) => (
            <div key={point.title} className="border-l-2 border-primary/50 pl-6">
              <h3 className="font-medium text-foreground mb-1.5">{point.title}</h3>
              <p className="text-sm">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
