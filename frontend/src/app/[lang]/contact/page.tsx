import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { contact, tr } from "@/data/profile";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/alpine/page-hero";
import { PhoneReveal } from "@/components/contact/phone-reveal";

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
      <Container className="pt-8 pb-24">
        {/* Phase 3: contact form (recruiter / feedback) goes here */}
        <p className="text-muted">{t.contact.formSoon}</p>
        <dl className="mt-8 max-w-xl divide-y divide-line rounded-2xl border border-line bg-surface">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-4">
              <dt className="text-sm text-muted">{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
