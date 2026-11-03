import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const links = [
    { href: "about", label: t.nav.about },
    { href: "projects", label: t.nav.projects },
    { href: "blog", label: t.nav.blog },
    { href: "contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-serif text-2xl">
          ashish<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-6">
          <nav aria-label={t.nav.menu} className="hidden gap-6 text-sm text-muted sm:flex">
            {links.map((l) => (
              <Link key={l.href} href={`/${locale}/${l.href}`} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher current={locale} label={t.controls.language} />
          <ThemeToggle label={t.controls.theme} />
        </div>
      </Container>
    </header>
  );
}
