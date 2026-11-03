import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { listEntries } from "@/lib/content";
import { stats, tr } from "@/data/profile";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { Contours, Mountains } from "@/components/alpine/mountains";

export default async function HomePage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const featured = (await listEntries("projects", locale)).filter((p) => p.meta.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sky">
        <Contours />
        <Container className="relative z-10 grid items-center gap-12 pt-16 pb-44 sm:pt-24 sm:pb-64 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-pine uppercase">{t.home.status}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              {t.home.headline} <em className="text-accent not-italic">{t.home.headlineAccent}</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{t.home.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/projects`}>{t.home.ctaProjects}</ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="outline">
                {t.home.ctaContact}
              </ButtonLink>
            </div>
          </div>
          <Avatar alt={t.home.photoAlt} className="mx-auto w-52 sm:w-72" />
        </Container>
        <Mountains />
      </section>

      {/* Stats */}
      <Container>
        <dl className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value}>
              <dt className="sr-only">{tr(s.label, locale)}</dt>
              <dd className="font-serif text-4xl text-pine">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{tr(s.label, locale)}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Featured projects */}
      <Container className="py-16">
        <SectionHeading eyebrow={t.home.featuredEyebrow} title={t.home.featuredTitle} sub={t.home.featuredSub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} slug={p.slug} meta={p.meta} locale={locale} t={t.projects} />
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={`/${locale}/projects`} variant="outline">
            {t.home.allProjects} →
          </ButtonLink>
        </div>
      </Container>

      {/* CTA */}
      <Container className="pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-pine px-8 py-14 text-background sm:px-14">
          <h2 className="font-serif text-3xl sm:text-4xl">{t.home.ctaTitle}</h2>
          <p className="mt-3 max-w-xl opacity-90">{t.home.ctaText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/contact`}>{t.home.ctaContact}</ButtonLink>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center rounded-full border border-background/60 px-6 py-3 font-medium hover:bg-background hover:text-pine"
            >
              {t.home.ctaAbout}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
