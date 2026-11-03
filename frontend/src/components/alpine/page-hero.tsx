import { Container } from "@/components/ui/container";
import { Contours, Mountains } from "./mountains";

/** Compact sky + mountains header used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-sky">
      <Contours />
      <Container className="relative z-10 pt-14 pb-24 sm:pt-20 sm:pb-36">
        <p className="text-xs font-bold tracking-[0.14em] text-pine uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-muted">{sub}</p>}
        {children}
      </Container>
      <Mountains size="sm" />
    </section>
  );
}
