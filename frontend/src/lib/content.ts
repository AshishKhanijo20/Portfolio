/**
 * MDX content loader for projects and blog posts.
 *
 * Layout:  content/<kind>/<slug>.<locale>.mdx   (e.g. content/projects/genai-service-desk.de.mdx)
 * Each file exports `meta` (see types below). If a German file is missing, the English one is used.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

export type ProjectMeta = {
  title: string;
  summary: string;
  /** Free-text period shown on cards, e.g. "Nov 2025 – Present" */
  period: string;
  /** Sort key, newest first — "YYYY-MM" */
  date: string;
  context: string; // e.g. "BITS Pilani · Capstone", "IAEA"
  tags: string[];
  status: "in-progress" | "completed";
  featured?: boolean;
  links?: { github?: string; demo?: string; paper?: string };
};

export type PostMeta = {
  title: string;
  summary: string;
  /** ISO date "YYYY-MM-DD" */
  date: string;
  tags: string[];
  /** Drafts are visible in `npm run dev` only. */
  draft?: boolean;
};

type Kind = "projects" | "blog";
type MetaFor<K extends Kind> = K extends "projects" ? ProjectMeta : PostMeta;
type MdxModule<M> = { default: ComponentType; meta: M };

const CONTENT_DIR = path.join(process.cwd(), "content");

// One import function per folder so the bundler can statically discover every file.
const importers: Record<Kind, (file: string) => Promise<MdxModule<unknown>>> = {
  projects: (file) => import(`@content/projects/${file}`),
  blog: (file) => import(`@content/blog/${file}`),
};

async function listSlugs(kind: Kind): Promise<string[]> {
  const files = await readdir(path.join(CONTENT_DIR, kind));
  const slugs = files
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_")) // "_" = templates
    .map((f) => f.split(".")[0]);
  return [...new Set(slugs)];
}

/** Loads one entry in the requested locale, falling back to English. */
export async function loadEntry<K extends Kind>(
  kind: K,
  slug: string,
  locale: Locale,
): Promise<(MdxModule<MetaFor<K>> & { slug: string; isFallback: boolean }) | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null; // slugs come from URLs — reject anything odd
  for (const l of locale === defaultLocale ? [locale] : [locale, defaultLocale]) {
    try {
      const mod = (await importers[kind](`${slug}.${l}.mdx`)) as MdxModule<MetaFor<K>>;
      return { ...mod, slug, isFallback: l !== locale };
    } catch {
      // try next locale
    }
  }
  return null;
}

const isVisible = (meta: ProjectMeta | PostMeta) =>
  !("draft" in meta && meta.draft) || process.env.NODE_ENV === "development";

/** All entries' metadata, newest first. Cached at build time. */
export async function listEntries<K extends Kind>(kind: K, locale: Locale) {
  "use cache";
  const entries = await Promise.all(
    (await listSlugs(kind)).map(async (slug) => {
      const e = await loadEntry(kind, slug, locale);
      return e ? { slug, meta: e.meta, isFallback: e.isFallback } : null;
    }),
  );
  return entries
    .filter((e): e is NonNullable<typeof e> => e !== null && isVisible(e.meta))
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export async function listAllSlugs(kind: Kind) {
  "use cache";
  return listSlugs(kind);
}

/** "2025-11" or "2025-11-04" → "Nov 2025" / "4 Nov 2025" in the given locale. */
export function formatDate(iso: string, locale: Locale) {
  const withDay = iso.length > 7;
  return new Intl.DateTimeFormat(locale === "de" ? "de-AT" : "en-GB", {
    year: "numeric",
    month: "short",
    ...(withDay && { day: "numeric" }),
    timeZone: "UTC",
  }).format(new Date(withDay ? iso : `${iso}-01`));
}
