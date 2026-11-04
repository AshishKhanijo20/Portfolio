/** Shown when a German page falls back to the English MDX file. */
export function FallbackNote({ text }: { text: string }) {
  return (
    <p className="mb-8 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
      ℹ️ {text}
    </p>
  );
}
