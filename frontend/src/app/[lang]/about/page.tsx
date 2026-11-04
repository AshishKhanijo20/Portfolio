import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { certifications, education, languages, skillGroups, tr } from "@/data/profile";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { PageHero } from "@/components/alpine/page-hero";
import { AscentTimeline } from "@/components/alpine/ascent-timeline";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.nav.about, description: t.about.story[0] };
}

export default async function AboutPage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} />

      <Container className="py-12">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
          {t.about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading title={t.about.ascentTitle} sub={t.about.ascentSub} />
        <AscentTimeline locale={locale} />
      </Container>

      <Container className="py-16" >
        <div id="skills" className="scroll-mt-24">
          <SectionHeading title={t.about.skillsTitle} sub={t.about.skillsSub} />
          <div className="grid gap-5 md:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.title.en} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-bold text-pine">{tr(g.title, locale)}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <section>
          <h2 className="font-serif text-2xl">{t.about.educationTitle}</h2>
          <p className="mt-4 font-bold">{tr(education.degree, locale)}</p>
          <p className="text-pine">
            {education.school} · {education.period}
          </p>
          <p className="mt-2 text-sm text-muted">{tr(education.note, locale)}</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl">{t.about.certsTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {certifications.map((c) => (
              <li key={c}>▲ {c}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-2xl">{t.about.languagesTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {languages.map((l) => (
              <li key={l.name.en} className="flex justify-between gap-4 border-b border-line pb-2">
                <span className="font-medium">{tr(l.name, locale)}</span>
                <span className="text-muted">{tr(l.level, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pt-8 pb-24">
        <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
          <h2 className="font-serif text-3xl">🏔️ {t.about.beyondTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{t.about.beyondText}</p>
        </div>
      </Container>
    </>
  );
}
