import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";
import { Contours, Mountains } from "@/components/alpine/mountains";

export default async function HomePage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
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
            <Link
              href={`/${locale}/projects`}
              className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
            >
              {t.home.ctaProjects}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-foreground px-6 py-3 font-medium hover:bg-foreground hover:text-background"
            >
              {t.home.ctaContact}
            </Link>
          </div>
        </div>
        <Avatar alt={t.home.photoAlt} className="mx-auto w-52 sm:w-72" />
      </Container>
      <Mountains />
    </section>
  );
}
