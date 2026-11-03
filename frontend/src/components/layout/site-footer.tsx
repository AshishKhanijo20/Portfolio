import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

const socials = [
  { label: "GitHub", href: "https://github.com/AshishKhanijo20" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashish-khanijo-19109819b" },
  { label: "Email", href: "mailto:askhanijo20@gmail.com" },
];

export async function SiteFooter() {
  const t = await getDictionary();
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© Ashish Khanijo · {t.footer.builtWith}</p>
        <ul className="flex gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="hover:text-foreground" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
