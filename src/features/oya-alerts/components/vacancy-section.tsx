import Link from "next/link";
import { ClipboardCheck, Megaphone, PlaySquare, Sparkles, Target } from "lucide-react";

import { CAREER_ROLES } from "../data/careers";

const ICONS = {
  play: PlaySquare,
  target: Target,
  clipboard: ClipboardCheck,
} as const;

export function VacancySection() {
  return (
    <section id="vacancy" className="border-t border-border bg-background px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-3xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Careers
          </span>
          <h2 className="font-serif text-4xl leading-[1.05] text-balance md:text-5xl">
            Help build Nigeria&apos;s safety movement.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Oya Alerts is looking for operators who can move fast across content, go-to-market,
            partnerships, and project delivery as we shift from waitlist into public safety
            awareness, product PR, and community rollout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Megaphone className="size-4" />3 open roles
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-sm font-medium text-foreground">
              <Sparkles className="size-4 text-amber" />
              Women are strongly encouraged to apply
            </span>
          </div>
        </div>

        <div className="reveal mt-12 grid gap-5 md:grid-cols-3">
          {CAREER_ROLES.map((role) => {
            const Icon = ICONS[role.icon];

            return (
              <article
                key={role.slug}
                className="flex h-full flex-col rounded-2xl border border-border bg-secondary/50 p-6 md:p-7"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{role.title}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-amber">
                      {role.salary}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {role.type}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{role.summary}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {role.responsibilities.slice(0, 3).map((item) => (
                    <li key={item} className="border-l-2 border-primary/50 pl-4 text-sm leading-6">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/careers/${role.slug}`}
                  className="mt-auto inline-flex w-fit rounded-full border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
                >
                  View role details
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
