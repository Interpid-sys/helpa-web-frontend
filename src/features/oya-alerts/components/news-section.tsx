import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

import { NEWS_ITEMS } from "../data/news";

export function NewsSection() {
  return (
    <section id="news" className="border-t border-border bg-secondary/40 px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl reveal">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              News / Product PR
            </span>
            <h2 className="font-serif text-4xl leading-[1.05] text-balance md:text-5xl">
              Follow the rollout as Oya Alerts moves into public safety education.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
              We are opening up product updates, community stories, safety content, and launch
              announcements as the project grows beyond a simple waitlist.
            </p>
          </div>
          <Link
            href="/news"
            className="reveal inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
          >
            View all news
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {NEWS_ITEMS.slice(0, 3).map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: (typeof NEWS_ITEMS)[number] }) {
  return (
    <article className="reveal overflow-hidden rounded-2xl border border-border bg-background">
      <Link href={`/news/${item.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-command">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
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
          <h3 className="text-lg font-medium leading-snug transition group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Read update
            <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
