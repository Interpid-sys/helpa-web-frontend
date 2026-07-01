import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, Mail, PlaySquare, Target } from "lucide-react";

import { BrandLogoDark } from "@/features/oya-alerts/components/brand-logo";
import { CAREER_ROLES, getCareerRole } from "@/features/oya-alerts/data/careers";

const ICONS = {
  play: PlaySquare,
  target: Target,
  clipboard: ClipboardCheck,
} as const;

type CareerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CAREER_ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRole(slug);

  if (!role) {
    return {
      title: "Career Role - Oya Alerts",
    };
  }

  return {
    title: `${role.title} - Careers at Oya Alerts`,
    description: role.summary,
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const role = getCareerRole(slug);

  if (!role) notFound();

  const Icon = ICONS[role.icon];
  const mailtoSubject = encodeURIComponent(`${role.title} Application - Oya Alerts`);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <Link href="/" aria-label="oyaAlerts home">
            <BrandLogoDark compact />
          </Link>
          <Link
            href="/#vacancy"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            Back to careers
          </Link>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-7" />
            </span>
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                Careers / {role.salary}
              </span>
              <h1 className="font-serif text-5xl leading-[1.02] text-balance md:text-6xl">
                {role.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{role.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  {role.type}
                </span>
                <span className="rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-sm font-medium text-foreground">
                  {role.salary}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_0.75fr]">
            <div className="rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
              <Section title="Mission">
                <p className="leading-7 text-muted-foreground">{role.mission}</p>
              </Section>

              <Section title="Responsibilities">
                <BulletList items={role.responsibilities} />
              </Section>

              <Section title="Requirements">
                <BulletList items={role.requirements} />
              </Section>

              <Section title="Success Metrics">
                <BulletList items={role.successMetrics} />
              </Section>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-background p-6 md:p-7">
              <h2 className="text-lg font-medium">Apply for this role</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Send a short note and your CV. Mention the role title clearly in your email.
              </p>
              <a
                href={`mailto:careers@oyaa.ng`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Mail className="size-4" />
                Apply via email
              </a>

              <p className="mt-3">
                <a href="mailto:careers@oyaa.ng" className="text-primary">
                  careers@oyaa.ng
                </a>
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-sm font-medium">General note</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Oya Alerts is early-stage and moving quickly. The best candidates are practical,
                  consistent, and comfortable helping build a public safety movement.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
