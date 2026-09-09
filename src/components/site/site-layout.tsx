import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/method", label: "Our Method" },
  { to: "/works", label: "Works" },
  { to: "/psyche", label: "Psyché" },
  { to: "/for-you", label: "For You" },
  { to: "/contact", label: "Contact" },
] as const;

export function BookButton({
  className = "",
  label = "Book a Consultation",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Link
      to="/booking"
      className={`inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3 lg:px-10 lg:py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Integral Values home"
        >
          <img
            src="/Logo-icon.png"
            alt="Integral Values"
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.74rem] uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}
          <BookButton />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/50 px-6 py-5 lg:hidden">
          <ul className="space-y-4">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block text-base text-muted-foreground hover:text-ink"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-28 bg-navy text-background/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Link to="/" className="inline-flex items-center gap-4" aria-label="Integral Values home">
            <img
              src="/Logo-icon.png"
              alt=""
              aria-hidden="true"
              className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
            />
            <span className="font-serif text-2xl leading-tight text-background sm:text-3xl">
              Integral Values Psy &amp; Co
            </span>
          </Link>
          <p className="mt-6 font-serif text-2xl leading-snug text-background">
            Helping Humanity Flourish.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
            Because trust begins long before the first conversation.
          </p>
          <p className="mt-6 text-sm text-background/70">hello@integralvalues.eu</p>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-background/50">
            Explore
          </p>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            {[
              { to: "/about", label: "About" },
              { to: "/works", label: "Works" },
              { to: "/psyche", label: "Psyché" },
              { to: "/for-you", label: "Resources" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-background">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-background/50">
            Trust
          </p>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            <li>
              <Link to="/security" className="hover:text-background">
                Security
              </Link>
            </li>
            <li>
              <Link to="/code-of-conduct" className="hover:text-background">
                Code of Conduct
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-background">
                Privacy
              </Link>
            </li>
          </ul>

          <div className="mt-8 border-t border-background/15 pt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-background/50">
                Newsletter
              </p>
              <span className="rounded-full border border-background/20 px-3 py-1 text-[0.62rem] uppercase tracking-[0.15em] text-background/60">
                Coming soon
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-background/60">
              The Integral Values newsletter is not active yet. No email address is collected here.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-background/55 lg:px-10">
          <span>© {new Date().getFullYear()} Integral Values</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/security" className="hover:text-background">
              Security
            </Link>
            <Link to="/code-of-conduct" className="hover:text-background">
              Code of Conduct
            </Link>
            <Link to="/privacy" className="hover:text-background">
              Privacy
            </Link>
          </div>
          <span>Human First. Purpose Driven. Transformation Inspired.</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-20 lg:pb-0">{children}</main>
      <SiteFooter />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <BookButton className="w-full py-3.5" />
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  quote,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  quote?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="halo pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
        {quote && (
          <p className="mt-10 max-w-xl font-serif text-xl italic text-ink/70">
            {quote}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  muted,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-secondary/40" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && (
          <h2 className="mt-5 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
        )}
        <div className={eyebrow || title ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function CardTile({
  title,
  body,
  meta,
}: {
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <div className="soft-card p-8">
      {meta && <p className="eyebrow">{meta}</p>}
      <h3 className="mt-3 text-xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
