import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogoDark } from "./brand-logo";

type LegalPageShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function LegalPageShell({ title, description, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <Link href="/" aria-label="oyaAlerts home">
            <BrandLogoDark compact />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            Back home
          </Link>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Legal
          </span>
          <h1 className="font-serif text-5xl leading-[1.02] text-balance md:text-6xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
            {children ?? (
              <>
                <h2 className="text-xl font-medium">Content coming soon</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  This page has been created as a placeholder. The full document content will be
                  added here later.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
