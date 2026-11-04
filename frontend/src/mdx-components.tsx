import type { MDXComponents } from "mdx/types";

// Global element styling for all MDX content (projects + blog), using theme tokens.
const components: MDXComponents = {
  h2: (p) => <h2 className="mt-12 mb-4 font-serif text-3xl" {...p} />,
  h3: (p) => <h3 className="mt-8 mb-3 text-xl font-bold" {...p} />,
  p: (p) => <p className="my-5 leading-relaxed" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-6 marker:text-accent" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-accent" {...p} />,
  a: (p) => <a className="text-accent underline underline-offset-4 hover:opacity-80" {...p} />,
  strong: (p) => <strong className="font-bold text-foreground" {...p} />,
  blockquote: (p) => <blockquote className="my-6 border-l-4 border-pine pl-5 text-muted italic" {...p} />,
  hr: () => <hr className="my-10 border-line" />,
  code: (p) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] ring-1 ring-line" {...p} />,
  pre: (p) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-[#1a2320] p-5 text-sm text-[#ecebe4] [&_code]:bg-transparent [&_code]:p-0 [&_code]:ring-0"
      {...p}
    />
  ),
  table: (p) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-left text-sm [&_td]:border-t [&_td]:border-line [&_td]:py-2 [&_th]:py-2" {...p} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
