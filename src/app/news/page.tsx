import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

import { BrandLogoDark } from "@/features/oya-alerts/components/brand-logo";
import { NEWS_ITEMS } from "@/features/oya-alerts/data/news";

export const metadata: Metadata = {
  title: "News - Oya Alerts",
  description:
    "Product PR, public safety updates, community stories, and launch announcements from Oya Alerts.",
};

export default function NewsIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
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
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              News / Product PR
            </span>
            <h1 className="font-serif text-5xl leading-[1.02] text-balance md:text-6xl">
              Public safety updates, product news, and community rollout notes.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Follow how Oya Alerts is building public safety education, product PR, careers,
              community updates, and launch signals for Nigeria.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-2xl border border-border bg-secondary/45"
              >
                <Link href={`/news/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-command">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111614]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-primary">
                      <Newspaper className="size-3.5" />
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                      <span>{item.date}</span>
                      <span>{item.readingTime}</span>
                    </div>
                    <h2 className="text-xl font-medium leading-snug transition group-hover:text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
                    <div className="mt-5 rounded-xl border border-border bg-background/70 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber">
                        Country trend
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.trend}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read full update
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
