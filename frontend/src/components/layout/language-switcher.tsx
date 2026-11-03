"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

/** Links to the same page in every other locale, e.g. /en/about → /de/about. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-line p-0.5 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          hrefLang={l}
          aria-current={l === current ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 ${
            l === current ? "bg-foreground text-background" : "text-muted hover:text-foreground"
          }`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
