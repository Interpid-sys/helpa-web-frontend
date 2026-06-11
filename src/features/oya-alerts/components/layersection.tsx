import { ReactNode } from "react";
import { SCRIPT_LAYERS } from "../data/landing-content";

export default function LayersSection() {
  return (
    <ScriptSection
      eyebrow="Three layers of protection"
      title="Your safety network runs deep"
      className="bg-secondary/40"
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
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-amber">
          {eyebrow}
        </div>
        <h2 className="max-w-3xl font-serif text-[clamp(1.8rem,4vw,3rem)] leading-tight text-balance">
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
