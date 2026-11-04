# Ashish Khanijo — Portfolio Website

Personal portfolio for a software engineer targeting AI/ML & GenAI roles in Austria/Europe.
Source of truth for personal content: `Ashish_Khanijo_CV_new.pdf`.

## Stack
- **frontend/** — Next.js 16 (App Router, Cache Components on) + TypeScript + Tailwind v4 + Framer Motion
  - Next 16 differs from older versions: read `frontend/node_modules/next/dist/docs/` before using an API. Middleware is now `src/proxy.ts`.
  - i18n is built-in (no next-intl): `src/proxy.ts` redirects to `/en` or `/de`; `[lang]` is the root param; server code calls `getDictionary()` / `getLocale()` from `src/i18n/dictionaries.ts`; client components get strings as props.
  - Dark mode: `<html data-theme="dark">` + Tailwind `dark:` variant; colors are CSS tokens in `src/app/globals.css`.
  - Design: "Alpine" (mockup C). Theme = tokens in `globals.css` + fonts in `app/[lang]/layout.tsx` + decorations in `components/alpine/`. Use only semantic color classes (`bg-surface`, `text-accent`, `text-pine`…), never raw hex, so the design stays swappable.
  - Photo pending: `components/ui/avatar.tsx` shows initials until `public/photo.jpg` exists.
  - Don't use `new Date()`/`Math.random()` in server render — Cache Components rejects it.
- **frontend/content/** — projects & blog as MDX via `@next/mdx`, one file per language (`slug.en.mdx`, `slug.de.mdx`)
  - Each file `export const meta = {...}` (types `ProjectMeta` / `PostMeta` in `src/lib/content.ts`); no frontmatter.
  - Missing `.de.mdx` → English shown with a notice. Files starting with `_` are templates (ignored). Blog `draft: true` = dev only.
  - Element styling for MDX lives in `src/mdx-components.tsx`.
- **frontend/src/data/profile.ts** — structured CV data (experience, skills, education…) as `{ en, de }` fields; About/Home/Contact read from it. Will also feed the chatbot knowledge base.
- Unknown slugs call `notFound()` (renders 404 UI + noindex; HTTP status is 200 due to streaming — known, revisit in Phase 6).
- **backend/** — FastAPI + SQLModel + PostgreSQL (Neon in prod), Dockerized, managed with **uv** (see `backend/README.md`)
  - Layout: `app/{main,config,db,models,schemas}.py`, `app/routers/`, `app/services/`. Config only via env (`app/config.py`, `.env.example`).
  - Local DB: `docker compose up -d db` → host port **5433** (a native Windows Postgres 16 service owns 5432 — don't touch it).
  - Tests use in-memory SQLite via dependency overrides (`get_engine`, `get_email_sender`) — no Docker needed. Run `uv run pytest`, `uv run ruff check .`, `uv run ruff format .`.
  - Email is pluggable: `ResendEmailSender` when `RESEND_API_KEY` is set, else `ConsoleEmailSender` (logs).
  - Privacy: never store raw IPs — only salted hashes (`IP_HASH_SALT`).
  - Windows gotcha: don't round-trip files through PowerShell 5.1 `Get-Content`/`Set-Content` — it corrupts UTF-8 (—, ü). Use the Edit/Write tools.
- **AI chatbot** — DeepSeek via OpenAI-compatible client; provider/model/base URL come from env so it can be swapped
- **Email** — Resend for contact-form alerts
- **Deploy** — Vercel (frontend), Render/Fly.io (backend), GitHub Actions CI

## Roadmap
1. Foundation: repo, design mockups (`design/mockups/`), Next.js scaffold, i18n, layout ✅
2. Content pages: Home, About (+skills), Projects + Blog templates, Contact details ✅
3. Backend: `/contact` endpoint, spam protection, rate limiting, email alerts, contact form ✅ (Resend key pending)
4. AI chatbot  ← next: `/chat` streaming, CV-grounded knowledge, daily token cap, hand-off to contact
5. Deploy: Vercel + Render/Fly + Neon + domain + CI/CD
6. Polish: SEO/OG, analytics, a11y, Lighthouse, admin page

## Conventions
- Every user-facing string must exist in both `src/i18n/messages/en.json` and `de.json` (the `Dictionary` type comes from en.json).
- Verify with `npm run lint` and `npm run build` in `frontend/`.
- Never commit secrets; document required vars in `.env.example`.
- Chatbot must only answer from the knowledge files; refuse unrelated requests; enforce token/cost caps.
- Phone number is shown on the site (owner's choice) — render it via click-to-reveal to reduce scraping.
