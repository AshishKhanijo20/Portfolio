"use client";

import { useState } from "react";

/** Shows the phone number only after a click, so it isn't plain text in the HTML. */
export function PhoneReveal({ encoded, label }: { encoded: string; label: string }) {
  const [phone, setPhone] = useState<string | null>(null);

  if (phone) {
    return (
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-medium hover:text-accent">
        {phone}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPhone(atob(encoded))}
      className="font-medium text-accent underline underline-offset-4 hover:opacity-80"
    >
      {label}
    </button>
  );
}
