import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { listEntries } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/alpine/page-hero";
import { ProjectCard } from "@/components/projects/project-card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.nav.projects, description: t.projects.sub };
}

export default async function ProjectsPage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const projects = await listEntries("projects", locale);

  return (
    <>
      <PageHero eyebrow={t.projects.eyebrow} title={t.projects.title} sub={t.projects.sub} />
      <Container className="pt-8 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} slug={p.slug} meta={p.meta} locale={locale} t={t.projects} />
          ))}
        </div>
      </Container>
    </>
  );
}
