export function SectionHeading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      {eyebrow && <p className="text-xs font-bold tracking-[0.14em] text-pine uppercase">{eyebrow}</p>}
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted">{sub}</p>}
    </div>
  );
}
