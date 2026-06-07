import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import signalNetwork from "@/assets/signal-network.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Helpa — Community-powered emergency response for Nigeria" },
      {
        name: "description",
        content:
          "Helpa is a community-powered emergency response network for Nigeria. Join the waitlist to help shape where coordinated response launches first.",
      },
      { property: "og:title", content: "Helpa — Community-powered emergency response" },
      {
        property: "og:description",
        content:
          "Help should not depend on who picks up first. Join the waitlist for Helpa's coordinated response network.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const ROLES = [
  "Individual / Family",
  "Estate / Community",
  "Professional Responder",
  "Business / Fleet",
] as const;

const LOCATIONS = ["Lagos", "Abuja", "Port Harcourt", "Other"] as const;

const STEPS = [
  {
    n: "01",
    title: "The SOS",
    body: "A single tap triggers a high-priority signal with your live location and incident context.",
  },
  {
    n: "02",
    title: "Trust Loop",
    body: "Your emergency contacts and the nearest verified responders are notified instantly.",
  },
  {
    n: "03",
    title: "Density Power",
    body: "Nearby community members — security, medical, residents — receive a coordinated dispatch.",
  },
  {
    n: "04",
    title: "Resolution",
    body: "Response teams coordinate on a single thread until the situation is safely managed.",
  },
];

const ECOSYSTEM = [
  { title: "Residents", note: "Day-to-day coverage" },
  { title: "Families", note: "Trusted circles" },
  { title: "Responders", note: "Actionable support" },
  { title: "Estates", note: "Community density" },
  { title: "Campuses", note: "Institutional safety" },
  { title: "Operators", note: "Fleet, security, medical" },
  { title: "Institutions", note: "Duty of care" },
];

const FAQ = [
  {
    q: "When will Helpa launch?",
    a: "We are rolling out city-by-city based on waitlist density. Lagos, Abuja, and Port Harcourt are the first priorities; the cities with the most early signups go live first.",
  },
  {
    q: "Why does joining early matter?",
    a: "Emergency response is a density game. Waitlist data helps us identify the neighborhoods and communities where coverage is most needed, and where to focus responder and operator outreach.",
  },
  {
    q: "How is my privacy protected?",
    a: "Your location and profile are only shared when you actively trigger a signal, and only with the relevant response network. Nothing is broadcast in the background.",
  },
  {
    q: "How reliable is the response?",
    a: "Helpa is a coordination layer on top of verified responders, community members, and trusted operators. Reliability scales with density, which is exactly what the waitlist helps build.",
  },
  {
    q: "Which areas will be covered?",
    a: "Initial coverage will focus on the highest-density waitlist clusters within Lagos, Abuja, and Port Harcourt, expanding outward as responder and community participation grows.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyJoin />
      <Ecosystem />
      <WaitlistForm />
      <FaqSection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex justify-between items-center px-6 py-8 max-w-6xl mx-auto">
      <span className="font-serif italic text-2xl tracking-tight">Helpa</span>
      <div className="hidden md:flex gap-8 text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
        <a href="#problem" className="hover:text-foreground transition-colors">The Gap</a>
        <a href="#how" className="hover:text-foreground transition-colors">The Signal</a>
        <a href="#ecosystem" className="hover:text-foreground transition-colors">Ecosystem</a>
      </div>
      <a
        href="#waitlist"
        className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-all"
      >
        Join waitlist
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center fade-up">
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 tracking-tight text-balance">
        Help should not depend on
        <br className="hidden md:block" /> who picks up first.
      </h1>
      <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 text-pretty">
        In Nigeria, an emergency often means isolation. Helpa creates a coordinated support
        signal that bridges the gap between those in need and those ready to respond.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#waitlist"
          className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-lg font-medium text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Join the waitlist
        </a>
        <span className="text-muted-foreground text-sm">
          Free to join. Built for response, not panic.
        </span>
      </div>

      <div className="mt-20 relative">
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden ring-1 ring-foreground/5 bg-secondary">
          <img
            src={signalNetwork}
            alt="Abstract topographical map showing a single signal point with concentric ripples connecting to a network of nodes"
            width={1600}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="absolute inset-0 m-auto block size-4 rounded-full bg-accent/40 sos-ripple" />
              <span className="absolute inset-0 m-auto block size-4 rounded-full bg-accent/30 sos-ripple sos-ripple-delay" />
              <span className="absolute inset-0 m-auto block size-4 rounded-full bg-accent/20 sos-ripple sos-ripple-delay-2" />
              <span className="relative block size-3 rounded-full bg-accent shadow-[0_0_24px_rgba(133,77,14,0.5)]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Problem() {
  return (
    <section id="problem" className="bg-secondary/60 py-28 border-y border-border">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            01 — The Gap
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
            The emergency response gap.
          </h2>
        </div>
        <div className="space-y-8 pt-2">
          <p className="text-muted-foreground leading-relaxed">
            In moments of crisis, the current system is fragmented. Delayed calls, congested
            lines, and a lack of hyper-local visibility mean help often arrives too late, or
            not at all.
          </p>
          <div className="border-l-2 border-accent/30 pl-6">
            <h3 className="font-medium mb-2">Isolation</h3>
            <p className="text-sm text-muted-foreground">
              Individual calls fail when operators are overwhelmed or infrastructure is down.
            </p>
          </div>
          <div className="border-l-2 border-accent/30 pl-6">
            <h3 className="font-medium mb-2">Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Responders lack the precise context and location needed to navigate dense
              Nigerian cities.
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
        <div className="mb-20 text-center">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            02 — How Helpa Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl">One signal, coordinated response.</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="space-y-3">
              <span className="text-3xl font-serif italic text-muted-foreground">{step.n}</span>
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
  return (
    <section className="py-28 border-t border-border bg-secondary/40">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            03 — Why Joining Matters
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
            Density decides where we launch.
          </h2>
        </div>
        <ul className="space-y-6 pt-2 text-muted-foreground">
          <li className="flex gap-4">
            <span className="font-serif italic text-foreground/60 shrink-0">i.</span>
            <p>Waitlist demand reveals where coordinated response is needed most.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-serif italic text-foreground/60 shrink-0">ii.</span>
            <p>It helps us identify the first launch communities and estates.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-serif italic text-foreground/60 shrink-0">iii.</span>
            <p>It guides responder and operator outreach in your area.</p>
          </li>
          <li className="flex gap-4">
            <span className="font-serif italic text-foreground/60 shrink-0">iv.</span>
            <p>It builds the density required for safe, reliable response before launch.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="py-28 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60 mb-4 block">
            04 — Ecosystem
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            A network built on density.
          </h2>
          <p className="text-background/70 text-lg">
            Helpa is infrastructure, not an app alone. Every group below is necessary for
            response to actually work — and necessary, not yet signed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {ECOSYSTEM.map((item) => (
            <div key={item.title} className="border-t border-background/10 pt-6">
              <h4 className="text-lg font-medium mb-2">{item.title}</h4>
              <p className="text-xs text-background/50 uppercase tracking-[0.18em]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);

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
    }, 400);
  }

  return (
    <section id="waitlist" className="py-28 bg-secondary/60 border-t border-border">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Shape the rollout.</h2>
          <p className="text-muted-foreground">
            Signups help determine where Helpa launches first. Your presence builds the
            density required for safe response.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-6 bg-background p-8 rounded-2xl shadow-sm border border-border"
        >
          <Field label="Full Name" required>
            <input
              name="name"
              type="text"
              required
              maxLength={120}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-colors"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email">
              <input
                name="email"
                type="email"
                maxLength={255}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-colors"
              />
            </Field>
            <Field label="Phone">
              <input
                name="phone"
                type="tel"
                maxLength={32}
                placeholder="+234…"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-colors"
              />
            </Field>
          </div>

          <Field label="Role">
            <select
              name="role"
              defaultValue={ROLES[0]}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-colors appearance-none"
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </Field>

          <Field label="Launch City">
            <select
              name="location"
              defaultValue={LOCATIONS[0]}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-colors appearance-none"
            >
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-medium text-lg hover:bg-accent/90 transition-all disabled:opacity-60"
          >
            {submitting ? "Joining…" : "Join Helpa waitlist"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {required ? <span className="text-accent ml-1">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function FaqSection() {
  return (
    <section className="py-28 max-w-4xl mx-auto px-6">
      <h2 className="font-serif text-3xl md:text-4xl mb-12">Questions.</h2>
      <div className="divide-y divide-border border-t border-border">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-medium text-lg pr-6">{item.q}</span>
              <span className="font-serif text-2xl text-muted-foreground group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-2xl">
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
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
        <span>&copy; {new Date().getFullYear()} Helpa Network</span>
        <span>Nigeria First</span>
      </div>
    </footer>
  );
}
