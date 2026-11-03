import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "./container";

/** Temporary page body until the real section is built in Phase 2. */
export async function PlaceholderPage({ title }: { title: string }) {
  const t = await getDictionary();
  return (
    <Container className="py-24">
      <h1 className="font-serif text-4xl">{title}</h1>
      <p className="mt-4 text-muted">{t.placeholder.comingSoon}</p>
    </Container>
  );
}
