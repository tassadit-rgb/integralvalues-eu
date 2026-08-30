import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/integral-values-logo.png.asset.json";
import slogan from "@/assets/slogan-not-alone.png.asset.json";


const NAV = [
  { to: "/about", label: "About" },
  { to: "/method", label: "The Integral Method" },
  { to: "/coaching", label: "Coaching" },
  { to: "/counselling", label: "Care & Therapy" },
  { to: "/cross-culture", label: "Cross-Culture" },
  { to: "/core", label: "CORE" },
  { to: "/psyche", label: "Psyché" },
  { to: "/for-you", label: "For You" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-ink">
            Integral Values
          </span>
          <span className="eyebrow mt-1">Psy &amp; Co</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="border border-primary px-5 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[0.75rem] uppercase tracking-[0.2em] text-muted-foreground lg:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/70 px-6 py-4 lg:hidden">
          <ul className="space-y-3">
            {[...NAV, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-ink"
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
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-ink">Integral Values Psy &amp; Co</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An integrative approach to the development of optimal human
            functioning — coaching, counselling, cross-culture and core.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">hello@integralvalues.eu</p>
        </div>
        <div>
          <p className="eyebrow">The 4 Pillars</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.slice(2, 6).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-ink">
                About &amp; philosophy
              </Link>
            </li>
            <li>
              <Link to="/who5" className="hover:text-ink">
                WHO-5 well-being
              </Link>
            </li>
            <li>
              <Link to="/wheel" className="hover:text-ink">
                Wheel of Life
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground lg:px-10">
          <span>© {new Date().getFullYear()} Integral Values Psy &amp; Co</span>
          <span>GDPR &amp; Privacy — Confidential by design</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
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
    <section className="border-b border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
        {quote && (
          <p className="mt-10 max-w-xl border-l border-gold pl-5 font-serif text-lg italic text-ink/80">
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
    <section className={muted ? "bg-secondary/30" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && (
          <h2 className="mt-4 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
        )}
        <div className={eyebrow || title ? "mt-10" : ""}>{children}</div>
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
    <div className="border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {meta && <p className="eyebrow">{meta}</p>}
      <h3 className="mt-3 text-xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
