import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { listAllSlugs, loadEntry } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/button-link";
import { FallbackNote } from "@/components/ui/fallback-note";

export async function generateStaticParams() {
  return (await listAllSlugs("projects")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const entry = await loadEntry("projects", (await params).slug, await getLocale());
  return entry ? { title: entry.meta.title, description: entry.meta.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const entry = await loadEntry("projects", slug, locale);
  if (!entry) notFound();

  const { default: Body, meta, isFallback } = entry;
  const links = [
    { href: meta.links?.github, label: t.projects.github },
    { href: meta.links?.demo, label: t.projects.demo },
    { href: meta.links?.paper, label: t.projects.paper },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <article>
      <header className="border-b border-line bg-sky">
        <Container className="py-14 sm:py-20">
          <Link href={`/${locale}/projects`} className="text-sm text-muted hover:text-accent">
            ← {t.projects.back}
          </Link>
          <p className="mt-6 text-xs font-bold tracking-[0.14em] text-pine uppercase">
            {meta.context} · {meta.period} ·{" "}
            <span className="text-accent">
              {meta.status === "in-progress" ? t.projects.inProgress : t.projects.completed}
            </span>
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{meta.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{meta.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((l, i) => (
                <ButtonLink key={l.label} href={l.href} variant={i === 0 ? "primary" : "outline"}>
                  {l.label} ↗
                </ButtonLink>
              ))}
            </div>
          )}
        </Container>
      </header>
      <Container className="max-w-3xl py-12 pb-24 text-lg">
        {isFallback && <FallbackNote text={t.common.fallbackNote} />}
        <Body />
      </Container>
    </article>
  );
}
