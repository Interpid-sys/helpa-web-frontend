"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode, RefObject } from "react";

import {
  SCRIPT_ALERTS,
  SCRIPT_FEATURES,
  SCRIPT_HOW_IT_WORKS,
  SCRIPT_LAYERS,
  SCRIPT_OBJECTIONS,
  SCRIPT_PLANS,
  SCRIPT_ROLES,
  SCRIPT_STATES,
  SCRIPT_STATS,
  TYPEWRITER_WORDS,
} from "./script-comparison-data";

type NetworkNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  type: "hub" | "node";
};

type ScriptOption = (typeof SCRIPT_ROLES)[number] | (typeof SCRIPT_STATES)[number];

const FLOW_STEPS = [
  { icon: "SOS", label: "Emergency" },
  { icon: "AL", label: "Alert sent" },
  { icon: "RN", label: "Responder notified" },
  { icon: "PD", label: "Partner dispatched" },
  { icon: "FI", label: "Family informed" },
  { icon: "OK", label: "Resolved" },
] as const;

const TRUST_ITEMS = ["NIN-verified network", "End-to-end encrypted", "Free for 3 months"] as const;

export function ScriptComparisonSections() {
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToScriptForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="script-comparison bg-[#111614] text-[#f5f2ec]">
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <HeroCanvas />
        <div className="relative z-10 mx-auto max-w-[780px] px-6 pb-16 pt-28 text-center">
          <div className="script-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-4 py-1.5 text-xs text-[#3dba72]">
            <span className="size-1.5 rounded-full bg-[#3dba72] script-pulse" />
            Now accepting early access
          </div>

          <h2 className="script-fade-up font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-[#f5f2ec] [animation-delay:100ms]">
            No one should face
            <br />
            <Typewriter />
            <br />
            <span>alone.</span>
          </h2>

          <p className="script-fade-up mx-auto mt-6 max-w-xl text-base leading-8 text-[#8a9e94] [animation-delay:200ms]">
            Helpa is building Nigeria&apos;s first community-powered emergency response network -
            combining real-time technology, trusted community responders, and professional rescue
            teams to ensure that help is never far away.
          </p>

          <div className="script-fade-up [animation-delay:300ms]">
            <AlertFeed />
          </div>

          <div className="script-fade-up mt-10 flex flex-col items-center gap-5 [animation-delay:400ms]">
            <SOSButton onClick={scrollToScriptForm} />
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8a9e94]">
              <span>
                Join <strong className="font-medium text-[#f5f2ec]">before launch</strong>
              </span>
              <span className="opacity-40">/</span>
              <span>Free 3-month access</span>
              <span className="opacity-40">/</span>
              <span>NIN-verified</span>
            </div>
          </div>

          <div className="script-fade-up mt-12 [animation-delay:500ms]">
            <ResponseFlow />
          </div>
        </div>
      </section>

      {/* <StatsStrip /> */}
      {/* <WhyScriptSection /> */}
      {/* <HowScriptSection /> */}
      {/* <LayersSection /> */}
      {/* <FeaturesSection /> */}
      {/* <MembershipSection onJoin={scrollToScriptForm} /> */}
      {/* <ScriptFormSection refEl={formRef} /> */}
      <ScriptFaq />
      <ScriptFooter />

      <style jsx global>{`
        .script-comparison * {
          box-sizing: border-box;
        }

        .script-comparison button,
        .script-comparison input {
          font-family: inherit;
        }

        .script-fade-up {
          animation: scriptFadeUp 0.7s ease both;
        }

        .script-pulse {
          animation: scriptPulse 2s ease-in-out infinite;
        }

        .script-sos-ring {
          animation: scriptSosRing 2.4s ease-out infinite;
        }

        .script-sos-ring-2 {
          animation-delay: 0.6s;
        }

        .script-sos-ring-3 {
          animation-delay: 1.2s;
        }

        .script-feed-text {
          animation: scriptFeedSlide 0.4s ease both;
        }

        .script-caret {
          animation: scriptBlink 1s step-end infinite;
        }

        .script-step-card {
          animation: scriptScaleIn 0.35s ease both;
        }

        @keyframes scriptBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes scriptFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scriptScaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scriptPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.6);
          }
        }

        @keyframes scriptSosRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        @keyframes scriptFeedSlide {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    nodesRef.current = Array.from({ length: 55 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      type: index < 4 ? "hub" : "node",
    }));

    const alertNodes = new Set([0, 8, 20, 35]);

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.pulse += 0.012;
      });

      nodes.forEach((a, index) => {
        nodes.slice(index + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 130) return;

          const alpha = (1 - distance / 130) * 0.22;
          context.beginPath();
          context.strokeStyle = `rgba(61,186,114,${alpha})`;
          context.lineWidth = 0.6;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        });
      });

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      nodes.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= 150) return;

        context.beginPath();
        context.strokeStyle = `rgba(61,186,114,${(1 - distance / 150) * 0.5})`;
        context.lineWidth = 0.8;
        context.moveTo(node.x, node.y);
        context.lineTo(mouseX, mouseY);
        context.stroke();
      });

      nodes.forEach((node, index) => {
        const isAlert = alertNodes.has(index);
        const isHub = node.type === "hub";

        if (isAlert) {
          const ring = (Math.sin(node.pulse) + 1) * 0.5;
          context.beginPath();
          context.arc(node.x, node.y, node.r + ring * 14, 0, Math.PI * 2);
          context.strokeStyle = `rgba(61,186,114,${0.15 * ring})`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(node.x, node.y, isHub ? node.r * 2 : node.r, 0, Math.PI * 2);
        context.fillStyle = isHub
          ? "rgba(61,186,114,0.9)"
          : isAlert
            ? "rgba(61,186,114,0.7)"
            : "rgba(61,186,114,0.35)";
        context.fill();
      });

      if (mouseX > 0) {
        context.beginPath();
        context.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        context.fillStyle = "rgba(61,186,114,0.8)";
        context.fill();

        const ring = (Math.sin(time * 0.002) + 1) * 0.5;
        context.beginPath();
        context.arc(mouseX, mouseY, 4 + ring * 18, 0, Math.PI * 2);
        context.strokeStyle = `rgba(61,186,114,${0.2 * ring})`;
        context.lineWidth = 1;
        context.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    canvas.addEventListener("mousemove", onMove);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-90" />;
}

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setIndex((current) => (current + 1) % TYPEWRITER_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [deleting, displayed, index]);

  return (
    <span className="italic text-[#3dba72]">
      {displayed}
      <span className="script-caret ml-1 inline-block h-[0.9em] border-r-2 border-[#3dba72]" />
    </span>
  );
}

function AlertFeed() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPosition((current) => current + 1), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-[#283330] bg-white/5 px-4 py-2 text-xs text-[#8a9e94]">
      <span className="size-1.5 shrink-0 rounded-full bg-[#3dba72] script-pulse" aria-hidden />
      <span key={position} className="script-feed-text">
        {SCRIPT_ALERTS[position % SCRIPT_ALERTS.length]}
      </span>
    </div>
  );
}

function SOSButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex size-[120px] items-center justify-center rounded-full bg-transparent"
      aria-label="Join script comparison waitlist"
    >
      <span className="script-sos-ring absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="script-sos-ring script-sos-ring-2 absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="script-sos-ring script-sos-ring-3 absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="relative z-10 flex size-[72px] flex-col items-center justify-center rounded-full bg-[#3dba72] text-[#0d2818] transition group-hover:scale-105 group-hover:bg-[#4ecf82]">
        <span className="text-sm font-medium leading-none">SOS</span>
        <span className="mt-0.5 whitespace-nowrap text-[0.55rem] opacity-75">Join Waitlist</span>
      </span>
    </button>
  );
}

function ResponseFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => (current + 1) % FLOW_STEPS.length),
      1200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-center">
      {FLOW_STEPS.map((step, index) => {
        const lit = index <= active;
        return (
          <div key={step.label} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`flex size-8 items-center justify-center rounded-full border text-[0.6rem] transition ${
                  lit
                    ? "border-[#3dba72] bg-[#3dba72]/15 text-[#3dba72]"
                    : "border-[#283330] bg-[#1c2220] text-[#8a9e94]"
                }`}
              >
                {step.icon}
              </div>
              {index < FLOW_STEPS.length - 1 ? (
                <div className="h-px w-9 bg-[#283330]">
                  <div
                    className={`h-px bg-[#3dba72] transition-all ${index < active ? "w-full" : "w-0"}`}
                  />
                </div>
              ) : null}
            </div>
            <div
              className={`mt-2 max-w-[68px] text-center text-[0.62rem] leading-snug ${lit ? "text-[#f5f2ec]" : "text-[#8a9e94]"}`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatsStrip() {
  return (
    <div className="grid border-y border-[#283330] bg-[#1c2220] md:grid-cols-3">
      {SCRIPT_STATS.map((stat) => (
        <div
          key={stat.val}
          className="border-b border-[#283330] px-4 py-6 text-center md:border-b-0 md:border-r md:last:border-r-0"
        >
          <div className="font-serif text-4xl leading-none text-[#f5f2ec]">{stat.val}</div>
          <div className="mt-2 text-xs leading-relaxed text-[#8a9e94]">{stat.lbl}</div>
        </div>
      ))}
    </div>
  );
}

function ScriptSection({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-24 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#3dba72]">
          {eyebrow}
        </div>
        <h2 className="max-w-3xl font-serif text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#f5f2ec]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#8a9e94]">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function WhyScriptSection() {
  return (
    <ScriptSection
      eyebrow="Why Helpa exists"
      title="The system is broken. We're fixing it."
      className="bg-[#1c2220]"
    >
      <div className="mt-12 grid overflow-hidden rounded-xl border border-[#283330] md:grid-cols-2">
        <div className="border-b border-[#283330] bg-[#1c2220] p-8 md:border-b-0 md:border-r">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-[#8a9e94]">
            The problem
          </div>
          <p className="text-sm leading-7 text-[#e87070]">
            Traditional emergency systems struggle with delayed response times, lack of accurate
            information, and limited local coordination. 87% of distress calls go unanswered - even
            in Lagos.
          </p>
          <div className="mt-6 flex gap-6">
            <StatMini value="0.4" label="Ambulances per 100K people" />
            <StatMini value="1.2M" label="Preventable deaths annually" />
          </div>
        </div>
        <div className="bg-[#1c2220] p-8">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-[#8a9e94]">
            Our solution
          </div>
          <p className="text-sm leading-7 text-[#8a9e94]">
            Helpa creates an intelligent network where communities actively support one another
            through technology, verified responders, and rapid communication - online and offline.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["NIN-verified", "Offline-first", "Community-led", "Encrypted", "<60s dispatch"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-3 py-1 text-xs font-medium text-[#3dba72]"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-2xl rounded-r-xl border-l-2 border-[#3dba72] bg-[#3dba72]/5 px-6 py-5">
        <span className="block font-serif text-5xl leading-none text-[#3dba72]/60">&quot;</span>
        <p className="text-base leading-7 text-[#8a9e94]">
          Uber connected drivers to riders.
          <br />
          <strong className="font-medium text-[#f5f2ec]">
            Helpa connects people in danger to the nearest trusted help.
          </strong>
        </p>
      </div>
    </ScriptSection>
  );
}

function StatMini({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-serif text-3xl leading-none text-[#f5f2ec]">{value}</span>
      <span className="text-xs leading-snug text-[#8a9e94]">{label}</span>
    </div>
  );
}

function HowScriptSection() {
  return (
    <ScriptSection eyebrow="How Helpa works" title="Five steps. One network. Zero delays.">
      <div className="mt-10 max-w-2xl">
        {SCRIPT_HOW_IT_WORKS.map((item) => (
          <div
            key={item.num}
            className="grid grid-cols-[56px_1fr] gap-6 border-b border-[#283330] py-7 last:border-b-0"
          >
            <div className="pt-1 font-serif text-2xl leading-none text-[#3dba72]/60">
              {item.num}
            </div>
            <div>
              <h3 className="font-medium text-[#f5f2ec]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#8a9e94]">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </ScriptSection>
  );
}

function LayersSection() {
  return (
    <ScriptSection
      eyebrow="Three layers of protection"
      title="Your safety network runs deep"
      className="bg-[#1c2220]"
    >
      <div className="mt-10 grid overflow-hidden rounded-xl border border-[#283330] md:grid-cols-3">
        {SCRIPT_LAYERS.map((layer) => (
          <div
            key={layer.label}
            className="border-b border-[#283330] bg-[#1c2220] p-8 transition hover:bg-[#283330] md:border-b-0 md:border-r md:last:border-r-0"
          >
            <span
              className="mb-4 block size-2 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            <h3 className="mb-5 font-medium text-[#f5f2ec]">{layer.label}</h3>
            <ul className="space-y-3">
              {layer.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-[#8a9e94]">
                  <span style={{ color: layer.color }}>-&gt;</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ScriptSection>
  );
}

function FeaturesSection() {
  return (
    <ScriptSection eyebrow="Key features" title="Everything you need. Nothing you don't.">
      <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
        {SCRIPT_FEATURES.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3 rounded-xl border border-[#283330] bg-[#1c2220] px-4 py-3 text-sm text-[#8a9e94] transition hover:border-[#3dba72] hover:text-[#f5f2ec]"
          >
            <span className="text-[#3dba72]" aria-hidden>
              &#10003;
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </ScriptSection>
  );
}

function MembershipSection({ onJoin }: { onJoin: () => void }) {
  return (
    <ScriptSection
      eyebrow="Membership"
      title="Safety should be proactive, not reactive."
      subtitle="Helpa operates on a subscription model because protection that only activates during emergencies is not protection - it is luck."
      className="bg-[#1c2220]"
    >
      <div className="mt-10 grid overflow-hidden rounded-xl border border-[#283330] md:grid-cols-3">
        {SCRIPT_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative border-b border-[#283330] p-8 transition hover:bg-[#283330] md:border-b-0 md:border-r md:last:border-r-0 ${
              plan.highlight
                ? "bg-[#3dba72]/10 ring-1 ring-inset ring-[#3dba72]/25"
                : "bg-[#1c2220]"
            }`}
          >
            {plan.highlight ? (
              <div className="absolute right-4 top-4 rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-3 py-1 text-[0.65rem] font-medium text-[#3dba72]">
                Most popular
              </div>
            ) : null}
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-[#8a9e94]">
              {plan.name}
            </h3>
            <div className="font-serif text-3xl leading-none text-[#f5f2ec]">
              {plan.price}
              <span className="font-sans text-sm text-[#8a9e94]">{plan.period}</span>
            </div>
            <p className="mt-4 min-h-20 text-sm leading-7 text-[#8a9e94]">{plan.desc}</p>
            <button
              type="button"
              onClick={onJoin}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3dba72] px-5 py-3 text-sm font-medium text-[#0d2818] transition hover:-translate-y-0.5 hover:bg-[#4ecf82]"
            >
              Join waitlist <ArrowIcon />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-[#8a9e94]">
        Waitlist members get 3 months free at launch / Freemium tier always available
      </p>
    </ScriptSection>
  );
}

function ScriptFormSection({ refEl }: { refEl: RefObject<HTMLElement | null> }) {
  return (
    <section ref={refEl} className="bg-[#111614] px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#3dba72]">
            Join the waitlist
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-[#f5f2ec]">
            Because emergencies do not wait -
            <br />
            <em className="text-[#3dba72]">and neither should help.</em>
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#8a9e94]">
            Be among the first to experience a new standard of personal and community safety. Get
            early access, exclusive launch benefits, and priority membership opportunities.
          </p>
          <div className="mt-8 space-y-3">
            {TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#8a9e94]">
                <span className="text-[#3dba72]">&#10003;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <ScriptWaitlistForm />
      </div>
    </section>
  );
}

function ScriptWaitlistForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(0);
  const [done, setDone] = useState(false);

  const autoSelect = (setter: (value: string) => void, value: string, nextStep: number) => {
    setter(value);
    setTimeout(() => setStep(nextStep), 280);
  };

  const submit = () => {
    setPosition(Math.floor(Math.random() * 300) + 100);
    setDone(true);
  };

  return (
    <div>
      {!done ? <ProgressBar step={step} total={5} /> : null}
      <div key={done ? "done" : step} className="script-step-card">
        {done ? (
          <Success position={position} name={name} />
        ) : step === 1 ? (
          <TextStep
            stepNum={1}
            question="What's your name?"
            hint="Just your first name is fine."
            inputProps={{
              type: "text",
              placeholder: "Your first name",
              value: name,
              onChange: (event) => setName(event.target.value),
            }}
            onNext={() => name.trim() && setStep(2)}
          />
        ) : step === 2 ? (
          <TextStep
            stepNum={2}
            question={`Nice to meet you, ${name}. What's your email?`}
            hint="We'll send your early access link here."
            inputProps={{
              type: "email",
              placeholder: "you@example.com",
              value: email,
              onChange: (event) => setEmail(event.target.value),
            }}
            onNext={() => setStep(3)}
            onSkip={() => setStep(3)}
          />
        ) : step === 3 ? (
          <OptionsStep
            stepNum={3}
            question="How do you want to use Helpa?"
            hint="This helps us tailor your experience."
            options={SCRIPT_ROLES}
            selected={role}
            onSelect={(value) => autoSelect(setRole, value, 4)}
          />
        ) : step === 4 ? (
          <OptionsStep
            stepNum={4}
            question="Which state are you based in?"
            hint="We're launching city by city."
            options={SCRIPT_STATES}
            selected={state}
            onSelect={(value) => autoSelect(setState, value, 5)}
          />
        ) : (
          <TextStep
            stepNum={5}
            question="Last one - your phone number."
            hint="For SMS early access invite. We'll never spam you."
            inputProps={{
              type: "tel",
              placeholder: "+234 800 000 0000",
              value: phone,
              onChange: (event) => setPhone(event.target.value),
            }}
            onNext={submit}
            onSkip={submit}
          />
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="h-0.5 overflow-hidden rounded-full bg-[#283330]">
        <div
          className="h-full rounded-full bg-[#3dba72] transition-all"
          style={{ width: `${Math.round((step / total) * 100)}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-[#8a9e94]">
        Step {step} of {total}
      </div>
    </div>
  );
}

function TextStep({
  stepNum,
  question,
  hint,
  inputProps,
  onNext,
  onSkip,
}: {
  stepNum: number;
  question: string;
  hint?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  onNext?: () => void;
  onSkip?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-[#8a9e94]">
        Step {stepNum} of 5
      </div>
      <div className="font-serif text-[clamp(1.4rem,3.5vw,1.9rem)] leading-tight text-[#f5f2ec]">
        {question}
      </div>
      {hint ? <div className="mt-2 text-sm leading-6 text-[#8a9e94]">{hint}</div> : null}
      <input
        ref={inputRef}
        {...inputProps}
        className="mt-7 w-full border-0 border-b border-[#283330] bg-transparent px-0 py-3 text-lg text-[#f5f2ec] outline-none transition placeholder:text-[#8a9e94] focus:border-[#3dba72]"
        onKeyDown={(event) => {
          if (event.key === "Enter") onNext?.();
          inputProps.onKeyDown?.(event);
        }}
      />
      <div className="mt-2 flex flex-col items-start gap-2">
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3dba72] px-5 py-3 text-sm font-medium text-[#0d2818] transition hover:-translate-y-0.5 hover:bg-[#4ecf82]"
          >
            Continue <ArrowIcon />
          </button>
        ) : null}
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-[#8a9e94] underline decoration-transparent transition hover:text-[#f5f2ec] hover:decoration-[#8a9e94]"
          >
            Skip
          </button>
        ) : null}
      </div>
    </div>
  );
}

function OptionsStep({
  stepNum,
  question,
  hint,
  options,
  selected,
  onSelect,
}: {
  stepNum: number;
  question: string;
  hint?: string;
  options: readonly ScriptOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-[#8a9e94]">
        Step {stepNum} of 5
      </div>
      <div className="font-serif text-[clamp(1.4rem,3.5vw,1.9rem)] leading-tight text-[#f5f2ec]">
        {question}
      </div>
      {hint ? <div className="mt-2 text-sm leading-6 text-[#8a9e94]">{hint}</div> : null}
      <div className="mt-7 flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? "border-[#3dba72] bg-[#3dba72]/10 text-[#f5f2ec]"
                  : "border-[#283330] bg-transparent text-[#8a9e94] hover:border-[#3dba72] hover:bg-[#3dba72]/5 hover:text-[#f5f2ec]"
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-[0.68rem] font-medium ${
                  isSelected
                    ? "border-[#3dba72] bg-[#3dba72] text-[#0d2818]"
                    : "border-[#283330] text-[#8a9e94]"
                }`}
              >
                {option.key}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Success({ position, name }: { position: number; name: string }) {
  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "Helpa",
          text: "I joined the Helpa waitlist. Safety for Nigeria.",
          url: "https://helpa.ng",
        })
        .catch(() => undefined);
      return;
    }

    navigator.clipboard?.writeText("https://helpa.ng");
  };

  return (
    <div className="py-8 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-[#3dba72]/30 bg-[#3dba72]/10 text-2xl text-[#3dba72]">
        &#10003;
      </div>
      <div className="mb-5 inline-block rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-4 py-2 text-sm text-[#3dba72]">
        #{position} on the waitlist
      </div>
      <h3 className="font-serif text-3xl text-[#f5f2ec]">
        You&apos;re in{name ? `, ${name}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#8a9e94]">
        We&apos;ll reach out when Helpa launches in your area. Emergencies do not wait - and neither
        should help.
      </p>
      <button
        type="button"
        onClick={share}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3dba72] px-5 py-3 text-sm font-medium text-[#0d2818] transition hover:-translate-y-0.5 hover:bg-[#4ecf82]"
      >
        Share Helpa <ArrowIcon />
      </button>
    </div>
  );
}

function ScriptFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ScriptSection
      eyebrow="Before you join"
      title="The hardest questions every user asks"
      subtitle="For a service like Helpa, people rarely reject the idea of safety. They reject whether they believe it will actually work."
      className="bg-[#1c2220]"
    >
      <div className="mt-10 max-w-3xl">
        {SCRIPT_OBJECTIONS.map((item, index) => (
          <div key={item.q} className="border-b border-[#283330]">
            <button
              type="button"
              onClick={() => setOpen(open === index ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={open === index}
            >
              <span className="font-medium leading-relaxed text-[#f5f2ec]">{item.q}</span>
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition ${
                  open === index
                    ? "rotate-45 border-[#3dba72] bg-[#3dba72] text-[#0d2818]"
                    : "border-[#283330] text-[#8a9e94]"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all ${open === index ? "max-h-52" : "max-h-0"}`}
            >
              <p className="pb-6 text-sm leading-7 text-[#8a9e94]">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </ScriptSection>
  );
}

function ScriptFooter() {
  return (
    <footer className="border-t border-[#283330] bg-[#111614] px-6 py-10 text-center">
      <div className="font-serif text-xl text-[#f5f2ec]">
        helpa<span className="text-[#3dba72]">.</span>
      </div>
      <p className="mt-2 font-serif text-base italic text-[#8a9e94]">
        &quot;Know that someone has your back wherever you are.&quot;
      </p>
      <p className="mt-2 text-xs text-[#334340]">
        &copy; 2025 Helpa Technologies Ltd / Built for Nigeria
      </p>
    </footer>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
