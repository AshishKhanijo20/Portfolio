// Shared by server, client and proxy code — keep free of server-only imports.
export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeLabels: Record<Locale, string> = { en: "EN", de: "DE" };
