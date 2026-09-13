import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setIsError(true);
      setMessage("Please confirm your consent before subscribing.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    setBusy(true);
    setMessage(null);
    setIsError(false);

    const { error } = await (supabase as any).from("newsletter_subscribers").insert({
      email: normalizedEmail,
      source: "website_footer",
      consent_version: "2026-09-14",
      status: "subscribed",
    });

    if (error) {
      if (error.code === "23505") {
        setIsError(false);
        setMessage("You are already subscribed.");
      } else {
        console.error("[newsletter] subscription failed", error);
        setIsError(true);
        setMessage("Subscription could not be completed. Please try again.");
      }
    } else {
      setEmail("");
      setConsent(false);
      setMessage("Thank you. You are now subscribed.");
    }

    setBusy(false);
  }

  return (
    <div className="mt-8 border-t border-background/15 pt-6">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-background/50">
        Newsletter
      </p>
      <p className="mt-3 text-xs leading-relaxed text-background/60">
        Reflections, practical tools and news from Integral Values.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <div className="flex overflow-hidden rounded-full border border-background/25 bg-background/5 focus-within:border-background/45">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs text-background outline-none placeholder:text-background/40"
          />
          <button
            type="submit"
            disabled={busy}
            className="shrink-0 bg-background px-4 py-3 text-[0.58rem] uppercase tracking-[0.14em] text-navy transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "…" : "Subscribe"}
          </button>
        </div>

        <label className="flex cursor-pointer items-start gap-2 text-[0.68rem] leading-relaxed text-background/55">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-background"
          />
          <span>
            I agree to receive the Integral Values newsletter. I can unsubscribe at any time. See our{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-background">
              Privacy notice
            </Link>
            .
          </span>
        </label>

        {message && (
          <p
            aria-live="polite"
            className={`text-[0.68rem] leading-relaxed ${isError ? "text-[#FFB4C9]" : "text-background/75"}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
