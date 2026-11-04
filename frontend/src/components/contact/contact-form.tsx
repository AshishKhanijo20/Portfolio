"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Strings = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "success" | "error" | "invalid" | "rateLimited";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TYPES = ["recruiter", "feedback", "other"] as const;

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function ContactForm({ t, locale }: { t: Strings; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus(res.status === 429 ? "rateLimited" : res.status === 422 ? "invalid" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-pine/40 bg-surface p-8 text-center">
        <p className="text-4xl">🏔️</p>
        <p className="mt-4 text-lg">{t.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent underline underline-offset-4"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const errorText = status === "error" || status === "invalid" || status === "rateLimited" ? t[status] : null;

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t.type}</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type, i) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="type" value={type} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40">
                {t.types[type]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t.name}</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t.email}</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t.company}</span>
        <input name="company" maxLength={120} autoComplete="organization" className={field} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t.message}</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder={t.messagePlaceholder}
          className={`${field} resize-y`}
        />
      </label>

      {/* Honeypot — invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {errorText && (
        <p role="alert" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent px-7 py-3 font-medium text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
