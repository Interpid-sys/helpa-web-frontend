import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Helpa — Community-powered emergency response for Nigeria" },
      {
        name: "description",
        content:
          "Helpa is building a community-powered emergency response network for Nigeria. Join the waitlist to help decide where we launch first.",
      },
      { property: "og:title", content: "Helpa — Community-powered emergency response" },
      {
        property: "og:description",
        content:
          "Emergency help should not depend on who answers first. Join the waitlist for Helpa's coordinated response network.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const ROLES = [
  "Prefer not to say",
  "Individual / Family",
  "Estate / Community",
  "Professional Responder",
  "Business / Fleet",
  "Institution / Campus",
] as const;

const LOCATIONS = [
  "Prefer not to say",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Other",
] as const;

const STEPS = [
  {
    n: "01",
    tag: "SOS",
    title: "One tap. Signal sent.",
    body: "A single press sends your live location and the nature of the emergency from your phone.",
  },
  {
    n: "02",
    tag: "Signal",
    title: "Trusted circle alerted.",
    body: "Family, friends, and chosen contacts are notified immediately and can follow the situation in real time.",
  },
  {
    n: "03",
    tag: "Support",
    title: "Nearby help dispatched.",
    body: "Verified responders, estate security, and community members close to you are coordinated in parallel.",
  },
  {
    n: "04",
    tag: "Resolution",
    title: "One thread, until safe.",
    body: "Everyone stays on the same response thread — no repeated calls, no lost context — until the situation is resolved.",
  },
];

const ECOSYSTEM = [
  { code: "R-01", title: "Residents", note: "First eyes and hands on the ground in any neighbourhood." },
  { code: "R-02", title: "Families", note: "Trusted circles who must know first, with full context." },
  { code: "R-03", title: "Estates", note: "Security teams and gated community coverage layers." },
  { code: "R-04", title: "Campuses", note: "Duty of care for students, staff, and visitors." },
  { code: "R-05", title: "Fleet operators", note: "Drivers and vehicles already moving across the city." },
  { code: "R-06", title: "Medical & security teams", note: "Trained, verified, response-ready professionals." },
  { code: "R-07", title: "Institutions", note: "Hospitals, agencies, and public services as the wider net." },
];

const FAQ = [
  {
    q: "When will Helpa launch?",
    a: "We are rolling out city by city based on waitlist density. The communities with the most early signups go live first — that is exactly what your signup helps decide.",
  },
  {
    q: "Why does joining early matter?",
    a: "Emergency response is a density problem. Waitlist signal tells us where to concentrate responder and operator outreach so that coverage is real, not theoretical, on launch day.",
  },
  {
    q: "How is my privacy protected?",
    a: "Your location and details are only shared when you actively trigger a signal, and only with the people in your trusted circle and the verified responders closest to you. Nothing is broadcast in the background.",
  },
  {
    q: "How reliable will response be?",
    a: "Helpa is a coordination layer, not a promise of perfect response. Reliability grows as residents, responders, and operators join. We launch in a community only once the network is dense enough to be useful.",
  },
  {
    q: "Which areas will be covered first?",
    a: "Initial focus is on the highest-density waitlist clusters across Lagos, Abuja, and Port Harcourt, expanding outward as community and responder participation grows.",
  },
];

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15">
      <Nav />
      <Hero />
      <WhyExist />
      <HowItWorks />
      <WhyJoin />
      <Ecosystem />
      <WaitlistForm />
      <FaqSection />
      <Footer />
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  return (
    <nav className="flex justify-between items-center px-6 py-7 max-w-6xl mx-auto">
      <span className="flex items-center gap-2.5">
        <span className="relative flex size-2">
          <span className="absolute inset-0 rounded-full bg-primary opacity-60 sos-ripple" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        <span className="font-serif italic text-2xl tracking-tight">Helpa</span>
      </span>
      <div className="hidden md:flex gap-9 text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
        <a href="#why" className="hover:text-foreground transition-colors">Why</a>
        <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
        <a href="#ecosystem" className="hover:text-foreground transition-colors">Network</a>
        <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
      </div>
      <a
        href="#waitlist"
        className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm"
      >
        Join waitlist
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-24">
      <div className="max-w-4xl mx-auto text-center fade-up">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <span className="size-1.5 rounded-full bg-primary status-blink" />
          System status · Building · Nigeria
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] mb-8 tracking-tight text-balance">
          Emergency help should not depend on who answers first.
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 text-pretty">
          Helpa is a community-powered emergency response network for Nigeria —
          one signal that reaches your trusted circle, nearby responders, and the
          people closest to where you are.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-base hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-sm"
          >
            Join the waitlist
          </a>
          <a
            href="#how"
            className="w-full sm:w-auto px-6 py-4 text-base text-foreground/80 hover:text-foreground transition-colors"
          >
            See how it works →
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          Your signup helps us decide where Helpa launches first.
        </p>
      </div>

      <div className="mt-20 reveal">
        <SignalPanel />
      </div>
    </header>
  );
}

function SignalPanel() {
  const chips = [
    { label: "Signal sent", state: "live" as const },
    { label: "Contacts notified", state: "live" as const },
    { label: "Coverage forming", state: "pending" as const },
    { label: "Response path active", state: "live" as const },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-secondary/40 grid-paper">
      {/* Operational header bar */}
      <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-foreground/10 bg-background/60 backdrop-blur text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-emergency opacity-70 sos-ripple" />
            <span className="relative inline-flex size-2 rounded-full bg-emergency" />
          </span>
          <span>SOS · Live signal</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <span>Lat 6.5244°N</span>
          <span>Lon 3.3792°E</span>
          <span className="text-foreground/70">T+00:00:04</span>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <SignalDiagram />

        {/* Status chips row */}
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border border-foreground/10 text-[11px] font-medium tracking-wide text-foreground/80"
            >
              <span
                className={`size-1.5 rounded-full ${
                  c.state === "live" ? "bg-primary status-blink" : "bg-amber"
                }`}
              />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalDiagram() {
  const nodes = [
    { id: "contacts", label: "Trusted contacts", x: 140, y: 130, side: "left" },
    { id: "responders", label: "Nearby responders", x: 860, y: 130, side: "right" },
    { id: "estate", label: "Estate & security", x: 140, y: 380, side: "left" },
    { id: "operators", label: "Emergency operators", x: 860, y: 380, side: "right" },
    { id: "medics", label: "Medical teams", x: 500, y: 470, side: "bottom" },
  ];
  const center = { x: 500, y: 230 };

  return (
    <svg
      viewBox="0 0 1000 540"
      className="w-full h-auto"
      role="img"
      aria-label="Operational diagram showing an SOS signal propagating from a person at the center to trusted contacts, nearby responders, estate security, emergency operators, and medical teams."
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.45 0.13 25)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.45 0.13 25)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Route lines */}
      {nodes.map((n) => (
        <g key={`p-${n.id}`}>
          <line
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="oklch(0.195 0.014 60)"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <line
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="oklch(0.36 0.07 155)"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            className="signal-path"
          />
        </g>
      ))}

      {/* SOS core (oxblood — emergency only) */}
      <circle cx={center.x} cy={center.y} r="130" fill="url(#centerGlow)" />
      <circle
        cx={center.x}
        cy={center.y}
        r="44"
        fill="oklch(0.984 0.008 85)"
        stroke="oklch(0.45 0.13 25)"
        strokeOpacity="0.35"
      />
      <circle
        cx={center.x}
        cy={center.y}
        r="16"
        fill="oklch(0.45 0.13 25)"
        className="sos-core"
      />
      <text
        x={center.x}
        y={center.y + 74}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="3"
        fill="oklch(0.195 0.014 60)"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        SOS · YOU
      </text>

      {/* Outer responder nodes (safety green) */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="11"
            fill="oklch(0.984 0.008 85)"
            stroke="oklch(0.36 0.07 155)"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
          <circle cx={n.x} cy={n.y} r="4.5" fill="oklch(0.36 0.07 155)" className="node-pulse" />
          <text
            x={n.side === "right" ? n.x + 20 : n.side === "left" ? n.x - 20 : n.x}
            y={n.side === "bottom" ? n.y + 32 : n.y + 4}
            textAnchor={n.side === "right" ? "start" : n.side === "left" ? "end" : "middle"}
            fontSize="13"
            fill="oklch(0.195 0.014 60)"
            fillOpacity="0.85"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function WhyExist() {
  return (
    <section id="why" className="bg-secondary/50 py-28 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start reveal">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            01 — Why this needs to exist
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">
            In an emergency, most Nigerians are on their own.
          </h2>
        </div>
        <div className="space-y-7 pt-2 text-[1.0625rem] leading-relaxed text-muted-foreground">
          <p>
            Today, getting help in a crisis means dialing a number and hoping
            someone picks up. Lines are congested, addresses are hard to
            communicate, and the people closest to you — who could actually help —
            often never know anything happened.
          </p>
          <div className="border-l-2 border-primary/50 pl-6">
            <h3 className="font-medium text-foreground mb-1.5">Isolation</h3>
            <p className="text-sm">
              A single call places everything on one overwhelmed system, with no
              fallback if no one answers.
            </p>
          </div>
          <div className="border-l-2 border-primary/50 pl-6">
            <h3 className="font-medium text-foreground mb-1.5">Invisibility</h3>
            <p className="text-sm">
              Responders and community members nearby have no way of knowing
              someone needs them within walking distance.
            </p>
          </div>
          <div className="border-l-2 border-primary/50 pl-6">
            <h3 className="font-medium text-foreground mb-1.5">Coordination</h3>
            <p className="text-sm">
              Even when help arrives, family, security, and medics rarely share
              the same thread of what is actually happening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 max-w-2xl reveal">
          <span className="text-amber uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            02 — Response timeline
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            One signal. Everyone who can help, at once.
          </h2>
        </div>

        <ol className="relative reveal">
          {/* Vertical timeline rail */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:hidden" aria-hidden />
          <div className="hidden md:block absolute left-0 right-0 top-[34px] h-px bg-border" aria-hidden />

          <div className="grid md:grid-cols-4 gap-10 md:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="relative pl-9 md:pl-0 md:pt-12 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Timeline node */}
                <span className="absolute left-0 top-1.5 md:left-0 md:top-[26px] flex items-center justify-center size-[22px] rounded-full bg-background border border-primary/40">
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

function WhyJoin() {
  const items = [
    "Waitlist demand tells us where coordinated response is needed most.",
    "It defines the first launch communities, estates, and campuses.",
    "It guides our outreach to responders, operators, and medical teams.",
    "It builds the density required for reliable response before day one.",
  ];
  return (
    <section className="py-28 border-t border-border bg-secondary/40">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start reveal">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            03 — Why joining matters
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">
            Your signup helps us decide where to launch first.
          </h2>
        </div>
        <ul className="space-y-5 pt-2">
          {items.map((t, i) => (
            <li
              key={t}
              className="flex gap-5 items-start py-3 border-t border-border/70 first:border-t-0"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary pt-1 w-10 shrink-0">
                0{i + 1}
              </span>
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{t}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative py-28 bg-command text-command-foreground overflow-hidden"
    >
      <div className="absolute inset-0 grid-paper-dark opacity-60" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-3 mb-10 text-[10px] font-medium uppercase tracking-[0.22em] text-command-foreground/60 reveal">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary status-blink" />
            Response network · Operational layer
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">04 — The network Helpa needs</span>
        </div>

        <div className="max-w-2xl mb-16 reveal">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            Real response is built by a community, not an app.
          </h2>
          <p className="text-command-foreground/70 text-lg leading-relaxed">
            Helpa only works when the people who can actually show up are part of
            it. We are not announcing partnerships — we are explaining who the
            network needs, and inviting them in.
          </p>
        </div>

        <div className="border-t border-command-foreground/15">
          {ECOSYSTEM.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[auto_1fr_1.4fr_auto] gap-6 md:gap-10 items-center py-5 border-b border-command-foreground/15 reveal hover:bg-command-foreground/[0.03] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="text-[10px] font-mono tracking-widest text-command-foreground/45">
                {item.code}
              </span>
              <h4 className="text-base md:text-lg font-medium">{item.title}</h4>
              <p className="hidden md:block text-sm text-command-foreground/65 leading-relaxed">
                {item.note}
              </p>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-command-foreground/55">
                <span className="size-1.5 rounded-full bg-amber" />
                Needed
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-command-foreground/55 max-w-xl reveal">
          No partnerships implied. Every line above is a role the Helpa network
          requires to function — and a seat we are openly inviting people into.
        </p>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      toast.error("Please enter your name.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("You're on the Helpa waitlist.", {
        description: "We'll be in touch as coverage opens in your area.",
      });
      form.reset();
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  return (
    <section id="waitlist" className="py-28 bg-secondary/50 border-t border-border">
      <div className="max-w-xl mx-auto px-6 reveal">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            05 — Launch signal
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-5 leading-tight">
            Help us decide where Helpa launches.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Only your name is required. Anything else you share helps us plan
            coverage where you live.
          </p>
        </div>

        <div className="relative">
          <form
            onSubmit={onSubmit}
            className={`bg-background rounded-2xl shadow-sm border border-border overflow-hidden transition-all duration-500 ${
              submitted ? "opacity-0 -translate-y-2 pointer-events-none absolute inset-0" : "opacity-100"
            }`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-secondary/60 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary status-blink" />
                Waitlist signal · Ready
              </span>
              <span>HELPA / NG</span>
            </div>

            <div className="p-7 space-y-5">
              <Field label="Full name" required>
                <FormInput name="name" type="text" required maxLength={120} placeholder="Your name" />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" hint="optional">
                  <FormInput name="email" type="email" maxLength={255} placeholder="name@example.com" />
                </Field>
                <Field label="Phone" hint="optional">
                  <FormInput name="phone" type="tel" maxLength={32} placeholder="+234…" />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Role" hint="optional">
                  <FormSelect name="role" options={ROLES} />
                </Field>
                <Field label="City" hint="optional">
                  <FormSelect name="location" options={LOCATIONS} />
                </Field>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-medium text-base hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 shadow-sm"
              >
                {submitting ? "Sending signal…" : "Join the Helpa waitlist"}
              </button>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed pt-1">
                We'll only use this to contact you about Helpa's rollout in your area.
              </p>
            </div>
          </form>

          {submitted && (
            <div className="bg-background p-10 rounded-2xl shadow-sm border border-border text-center fade-up">
              <div className="mx-auto mb-5 size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="size-3 rounded-full bg-primary node-pulse" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Signal received.</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You're on the waitlist. We'll reach out as Helpa opens coverage
                in your area. Tell a neighbour — density is what brings us to
                your community sooner.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 focus:bg-background transition-all"
    />
  );
}

function FormSelect({ name, options }: { name: string; options: readonly string[] }) {
  return (
    <select
      name={name}
      defaultValue={options[0]}
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 focus:bg-background transition-all appearance-none"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          {label}
          {required ? <span className="text-primary ml-1">*</span> : null}
        </span>
        {hint ? (
          <span className="text-[10px] font-normal tracking-[0.16em] text-muted-foreground/70">
            {hint}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="py-28 max-w-4xl mx-auto px-6 reveal">
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
          06 — Questions
        </span>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          Answers before we ship.
        </h2>
      </div>
      <div className="divide-y divide-border border-t border-border">
        {FAQ.map((item) => (
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

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row gap-4 justify-between items-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
        <span className="flex items-center gap-2.5 normal-case tracking-normal">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="font-serif italic text-base text-foreground">Helpa</span>
        </span>
        <span>&copy; {new Date().getFullYear()} Helpa Network · Nigeria first</span>
      </div>
    </footer>
  );
}
