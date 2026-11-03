import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { PlaceholderPage } from "@/components/ui/placeholder-page";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDictionary()).nav.contact };
}

export default async function Page() {
  const t = await getDictionary();
  return <PlaceholderPage title={t.nav.contact} />;
}
