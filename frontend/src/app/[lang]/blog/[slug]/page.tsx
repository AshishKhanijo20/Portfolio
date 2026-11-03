import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatDate, listAllSlugs, loadEntry } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { FallbackNote } from "@/components/ui/fallback-note";

export async function generateStaticParams() {
  return (await listAllSlugs("blog")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const entry = await loadEntry("blog", (await params).slug, await getLocale());
  return entry ? { title: entry.meta.title, description: entry.meta.summary } : {};
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const entry = await loadEntry("blog", slug, locale);
  // Drafts are reachable in dev only
  if (!entry || (entry.meta.draft && process.env.NODE_ENV !== "development")) notFound();

  const { default: Body, meta, isFallback } = entry;

  return (
    <article>
      <Container className="max-w-3xl pt-14 pb-24 text-lg">
        <Link href={`/${locale}/blog`} className="text-sm text-muted hover:text-accent">
          ← {t.blog.back}
        </Link>
        <p className="mt-8 text-sm text-muted">
          <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time>
          {meta.draft && <span className="ml-2 font-bold text-accent">{t.blog.draft}</span>}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{meta.title}</h1>
        <div className="mt-4 mb-10 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </div>
        {isFallback && <FallbackNote text={t.common.fallbackNote} />}
        <Body />
      </Container>
    </article>
  );
}
