import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Tag } from "@/components/ui/tag";

export function ProjectCard({
  slug,
  meta,
  locale,
  t,
}: {
  slug: string;
  meta: ProjectMeta;
  locale: Locale;
  t: Dictionary["projects"];
}) {
  return (
    <Link
      href={`/${locale}/projects/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      {/* Cover band — swap for a screenshot later (e.g. meta.cover) */}
      <div className="relative h-24 bg-gradient-to-br from-sky to-line">
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            meta.status === "in-progress" ? "bg-accent text-accent-foreground" : "bg-pine text-background"
          }`}
        >
          {meta.status === "in-progress" ? t.inProgress : t.completed}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted">
          {meta.context} · {meta.period}
        </p>
        <h3 className="mt-1 text-lg font-bold group-hover:text-accent">{meta.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{meta.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meta.tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
