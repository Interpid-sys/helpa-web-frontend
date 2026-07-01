import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Linkedin, MessageCircle, Send, Twitter } from "lucide-react";

import { BrandLogoDark } from "@/features/oya-alerts/components/brand-logo";
import { NEWS_ITEMS, getNewsItem } from "@/features/oya-alerts/data/news";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://oyaa.ng";

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);

  if (!item) {
    return {
      title: "News - Oya Alerts",
    };
  }

  return {
    title: `${item.title} - Oya Alerts News`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image.src }],
      type: "article",
      url: `${SITE_URL}/news/${item.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt,
      images: [item.image.src],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);

  if (!item) notFound();

  const articleUrl = `${SITE_URL}/news/${item.slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(item.title);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Link href="/" aria-label="oyaAlerts home">
            <BrandLogoDark compact />
          </Link>
          <Link
            href="/news"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            All news
          </Link>
        </div>
      </header>

      <article>
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                {item.tag}
              </span>
              <span className="text-sm text-muted-foreground">{item.date}</span>
              <span className="text-sm text-muted-foreground">{item.readingTime}</span>
            </div>

            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-balance md:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-command">
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111614]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_280px]">
            <div className="rounded-2xl border border-border bg-secondary/45 p-6 md:p-8">
              <div className="mb-8 rounded-xl border border-border bg-background p-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber">
                  Country trend
                </p>
                <p className="mt-2 leading-7 text-muted-foreground">{item.trend}</p>
              </div>

              {item.body.map((section) => (
                <section key={section.heading} className="mt-10 first:mt-0">
                  <h2 className="text-2xl font-medium leading-snug">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="mt-10 rounded-xl border border-border bg-background p-5">
                <h2 className="text-lg font-medium">Key takeaways</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                  {item.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-background p-6">
              <h2 className="text-lg font-medium">Share this update</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Help more people follow the Oya Alerts rollout and public safety movement.
              </p>
              <div className="mt-6 grid gap-3">
                <ShareLink
                  href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  label="Share on X"
                  Icon={Twitter}
                />
                <ShareLink
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  label="Share on LinkedIn"
                  Icon={Linkedin}
                />
                <ShareLink
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  label="Share on Facebook"
                  Icon={Facebook}
                />
                <ShareLink
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  label="Share on WhatsApp"
                  Icon={MessageCircle}
                />
              </div>
              <Link
                href="/#waitlist"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Send className="size-4" />
                Get launch updates
              </Link>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}

function ShareLink({ href, label, Icon }: { href: string; label: string; Icon: typeof Twitter }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
    >
      <Icon className="size-4" />
      {label}
    </a>
  );
}
