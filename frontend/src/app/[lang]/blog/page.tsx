import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatDate, listEntries } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { PageHero } from "@/components/alpine/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.nav.blog, description: t.blog.sub };
}

export default async function BlogPage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const posts = await listEntries("blog", locale);

  return (
    <>
      <PageHero eyebrow={t.blog.eyebrow} title={t.blog.title} sub={t.blog.sub} />
      <Container className="max-w-3xl pt-8 pb-24">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">{t.blog.empty}</p>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${locale}/blog/${p.slug}`} className="group block py-8">
                  <p className="text-sm text-muted">
                    <time dateTime={p.meta.date}>{formatDate(p.meta.date, locale)}</time>
                    {p.meta.draft && <span className="ml-2 font-bold text-accent">{t.blog.draft}</span>}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl group-hover:text-accent">{p.meta.title}</h2>
                  <p className="mt-2 text-muted">{p.meta.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.meta.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
