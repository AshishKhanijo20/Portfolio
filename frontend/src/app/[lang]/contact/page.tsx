import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { contact, tr } from "@/data/profile";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/alpine/page-hero";
import { PhoneReveal } from "@/components/contact/phone-reveal";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.nav.contact, description: t.contact.sub };
}

export default async function ContactPage() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: t.contact.email,
      value: (
        <a href={`mailto:${contact.email}`} className="font-medium hover:text-accent">
          {contact.email}
        </a>
      ),
    },
    { label: t.contact.phone, value: <PhoneReveal encoded={contact.phoneEncoded} label={t.contact.showPhone} /> },
    { label: t.contact.location, value: <span className="font-medium">{tr(contact.location, locale)}</span> },
    {
      label: "LinkedIn",
      value: (
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">
          ashish-khanijo
        </a>
      ),
    },
    {
      label: "GitHub",
      value: (
        <a href={contact.github} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">
          AshishKhanijo20
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />
      <Container className="grid gap-12 pt-8 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="mb-6 font-serif text-3xl">{t.contact.form.title}</h2>
          <ContactForm t={t.contact.form} locale={locale} />
        </section>
        <aside>
          <h2 className="mb-6 font-serif text-3xl">{t.contact.directTitle}</h2>
          <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-4">
                <dt className="text-sm text-muted">{r.label}</dt>
                <dd className="truncate">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </>
  );
}
