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
    title: "One tap",
    body: "A single SOS sends your live location and the nature of the emergency from your phone.",
  },
  {
    n: "02",
    title: "Trusted circle",
    body: "Your chosen family and friends are alerted immediately and can follow the situation in real time.",
  },
  {
    n: "03",
    title: "Nearby help",
    body: "Verified responders, estate security, and community members close to you are dispatched in parallel.",
  },
  {
    n: "04",
    title: "Coordinated resolution",
    body: "Everyone stays on one thread — no repeated calls, no lost context — until you're safe.",
  },
];

const ECOSYSTEM = [
  { title: "Residents", note: "The first eyes and hands on the ground." },
  { title: "Families", note: "Trusted circles who must know first." },
  { title: "Estates", note: "Security teams and gated community coverage." },
  { title: "Campuses", note: "Duty of care for students and staff." },
  { title: "Fleet operators", note: "Drivers and vehicles already on the move." },
  { title: "Medical & security teams", note: "Trained, verified, response-ready." },
  { title: "Institutions", note: "Hospitals, agencies, and public services." },
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10">
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
      <span className="font-serif italic text-2xl tracking-tight">Helpa</span>
      <div className="hidden md:flex gap-9 text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
        <a href="#why" className="hover:text-foreground transition-colors">Why</a>
        <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
        <a href="#ecosystem" className="hover:text-foreground transition-colors">Network</a>
        <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
      </div>
      <a
        href="#waitlist"
        className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 hover:-translate-y-0.5 transition-all"
      >
        Join waitlist
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-24">
      <div className="max-w-4xl mx-auto text-center fade-up">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <span className="size-1.5 rounded-full bg-accent node-pulse" />
          Now building · Nigeria
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] mb-8 tracking-tight text-balance">
          Emergency help should not depend on who answers first.
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 text-pretty">
          Helpa is a community-powered emergency response network for Nigeria —
          one signal that reaches your trusted circle, nearby responders, and the
          people closest to where you are.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-lg font-medium text-base hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
          Your signup helps us decide where to launch first.
        </p>
      </div>

      <div className="mt-20 reveal">
        <SignalDiagram />
      </div>
    </header>
  );
}

function SignalDiagram() {
  // Five nodes around a central SOS signal
  const nodes = [
    { id: "contacts", label: "Trusted contacts", x: 140, y: 130, side: "left" },
    { id: "responders", label: "Nearby responders", x: 860, y: 130, side: "right" },
    { id: "estate", label: "Estate & security", x: 140, y: 380, side: "left" },
    { id: "operators", label: "Emergency operators", x: 860, y: 380, side: "right" },
    { id: "medics", label: "Medical teams", x: 500, y: 460, side: "bottom" },
  ];
  const center = { x: 500, y: 230 };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-foreground/5 bg-secondary/60 p-6 md:p-10">
      <svg
        viewBox="0 0 1000 540"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram showing an SOS signal propagating from a person at the center to trusted contacts, nearby responders, estate security, emergency operators, and medical teams."
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.42 0.085 60)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.42 0.085 60)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting paths */}
        {nodes.map((n) => (
          <g key={`p-${n.id}`}>
            <line
              x1={center.x}
              y1={center.y}
              x2={n.x}
              y2={n.y}
              stroke="oklch(0.205 0.012 60)"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <line
              x1={center.x}
              y1={center.y}
              x2={n.x}
              y2={n.y}
              stroke="oklch(0.42 0.085 60)"
              strokeOpacity="0.55"
              strokeWidth="1.25"
              className="signal-path"
            />
          </g>
        ))}

        {/* Center glow + SOS */}
        <circle cx={center.x} cy={center.y} r="120" fill="url(#centerGlow)" />
        <circle
          cx={center.x}
          cy={center.y}
          r="40"
          fill="oklch(0.992 0.005 80)"
          stroke="oklch(0.42 0.085 60)"
          strokeOpacity="0.35"
        />
        <circle
          cx={center.x}
          cy={center.y}
          r="14"
          fill="oklch(0.42 0.085 60)"
          className="sos-core"
        />
        <text
          x={center.x}
          y={center.y + 70}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2.5"
          fill="oklch(0.205 0.012 60)"
        >
          SOS
        </text>

        {/* Outer nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r="10"
              fill="oklch(0.992 0.005 80)"
              stroke="oklch(0.205 0.012 60)"
              strokeOpacity="0.35"
            />
            <circle cx={n.x} cy={n.y} r="4" fill="oklch(0.205 0.012 60)" className="node-pulse" />
            <text
              x={n.side === "right" ? n.x + 20 : n.side === "left" ? n.x - 20 : n.x}
              y={n.side === "bottom" ? n.y + 32 : n.y + 4}
              textAnchor={n.side === "right" ? "start" : n.side === "left" ? "end" : "middle"}
              fontSize="13"
              fill="oklch(0.205 0.012 60)"
              fillOpacity="0.85"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function WhyExist() {
  return (
    <section id="why" className="bg-secondary/50 py-28 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start reveal">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
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
          <div className="border-l-2 border-accent/40 pl-6">
            <h3 className="font-medium text-foreground mb-1.5">Isolation</h3>
            <p className="text-sm">
              A single call places everything on one overwhelmed system, with no
              fallback if no one answers.
            </p>
          </div>
          <div className="border-l-2 border-accent/40 pl-6">
            <h3 className="font-medium text-foreground mb-1.5">Invisibility</h3>
            <p className="text-sm">
              Responders and community members nearby have no way of knowing
              someone needs them within walking distance.
            </p>
          </div>
          <div className="border-l-2 border-accent/40 pl-6">
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
        <div className="mb-20 max-w-2xl reveal">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            02 — How Helpa works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            One signal. Everyone who can help, at once.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-10">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="space-y-3 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl font-serif italic text-muted-foreground">
                {step.n}
              </span>
              <h3 className="text-xl font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            03 — Why joining matters
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">
            Your signup helps us decide where to launch first.
          </h2>
        </div>
        <ul className="space-y-6 pt-2 text-muted-foreground">
          {items.map((t, i) => (
            <li key={t} className="flex gap-5">
              <span className="font-serif italic text-foreground/50 shrink-0 w-6">
                {["i.", "ii.", "iii.", "iv."][i]}
              </span>
              <p className="text-[1.0625rem] leading-relaxed">{t}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="py-28 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-20 reveal">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60 mb-4 block">
            04 — The network Helpa needs
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
            Real response is built by a community, not an app.
          </h2>
          <p className="text-background/70 text-lg leading-relaxed">
            Helpa only works when the people who can actually show up are part of
            it. We are not announcing partnerships — we are explaining who the
            network needs, and inviting them in.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {ECOSYSTEM.map((item, i) => (
            <div
              key={item.title}
              className="border-t border-background/10 pt-6 reveal hover:border-background/30 transition-colors"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <h4 className="text-lg font-medium mb-2">{item.title}</h4>
              <p className="text-sm text-background/60 leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>
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
    <section id="waitlist" className="py-28 bg-secondary/60 border-t border-border">
      <div className="max-w-xl mx-auto px-6 reveal">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            05 — Waitlist
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
            className={`space-y-5 bg-background p-8 rounded-2xl shadow-sm border border-border transition-all duration-500 ${
              submitted ? "opacity-0 -translate-y-2 pointer-events-none absolute inset-0" : "opacity-100"
            }`}
          >
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
              className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-medium text-base hover:bg-accent/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? "Joining…" : "Join the Helpa waitlist"}
            </button>

            <p className="text-[11px] text-muted-foreground text-center leading-relaxed pt-1">
              We'll only use this to contact you about Helpa's rollout in your area.
            </p>
          </form>

          {submitted && (
            <div className="bg-background p-10 rounded-2xl shadow-sm border border-border text-center fade-up">
              <div className="mx-auto mb-5 size-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="size-3 rounded-full bg-accent node-pulse" />
              </div>
              <h3 className="font-serif text-2xl mb-2">You're on the waitlist.</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We'll reach out as Helpa opens coverage in your area. Tell a
                neighbor — density is what brings us to your community sooner.
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
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 focus:bg-background transition-all"
    />
  );
}

function FormSelect({ name, options }: { name: string; options: readonly string[] }) {
  return (
    <select
      name={name}
      defaultValue={options[0]}
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 focus:bg-background transition-all appearance-none"
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
          {required ? <span className="text-accent ml-1">*</span> : null}
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
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
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
              <span className="font-medium text-lg pr-2 group-hover:text-accent transition-colors">
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
        <span className="font-serif italic text-base normal-case tracking-normal text-foreground">
          Helpa
        </span>
        <span>&copy; {new Date().getFullYear()} Helpa Network · Nigeria first</span>
      </div>
    </footer>
  );
}
