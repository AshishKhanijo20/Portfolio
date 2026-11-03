import Link from "next/link";

const styles = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  outline: "border border-foreground hover:bg-foreground hover:text-background",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  children: React.ReactNode;
}) {
  const className = `inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition ${styles[variant]}`;
  const external = /^(https?:|mailto:)/.test(href);
  return external ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
