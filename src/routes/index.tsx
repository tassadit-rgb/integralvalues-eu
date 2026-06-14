import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, HeartHandshake, Scale, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Integral Value · Psy & Co — You're Not Alone" },
      { name: "description", content: "Thérapie, coaching et conseil juridique réunis dans un espace confidentiel. Suivez votre humeur, journalisez et trouvez le bon professionnel." },
      { property: "og:title", content: "You're Not Alone — Integral Value" },
      { property: "og:description", content: "Un compagnon pour votre santé mentale, du quotidien au professionnel." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh] bg-aurora opacity-90" />

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#offer" className="transition hover:text-foreground">L'offre</a>
          <a href="#how" className="transition hover:text-foreground">Comment ça marche</a>
          <a href="#trust" className="transition hover:text-foreground">Confidentialité</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden h-10 items-center rounded-full px-4 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex">
            Connexion
          </Link>
          <Link to="/auth" search={{ mode: "signup" } as never} className="inline-flex h-10 items-center rounded-full bg-pill px-5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-[1.02]">
            Commencer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {BRAND.tagline}
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Prenez soin de votre <span className="text-gradient">santé mentale</span><br />sans avoir à le faire seul·e.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            {BRAND.short}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth" search={{ mode: "signup" } as never} className="inline-flex h-12 items-center justify-center rounded-full bg-pill px-7 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-[1.02]">
              Créer mon espace
            </Link>
            <a href="#offer" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 text-sm text-foreground/80 transition hover:bg-white/10">
              Découvrir l'offre
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Espace personnel chiffré · Confidentialité RGPD by design</p>
        </div>

        {/* Floating glass card preview */}
        <div className="relative mx-auto mt-20 max-w-4xl">
          <div aria-hidden className="absolute -inset-10 -z-10 bg-aurora blur-3xl opacity-60" />
          <div className="glass-strong rounded-3xl p-2 shadow-ring">
            <div className="rounded-2xl bg-card-gradient p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-3">
                <PreviewTile icon={<Brain className="h-5 w-5" />} title="Suivi de l'humeur" body="Un geste par jour pour reconnaître ce que vous traversez." accent="violet" />
                <PreviewTile icon={<HeartHandshake className="h-5 w-5" />} title="Trouver un pro" body="Thérapeutes, coachs et avocats vérifiés, en français." accent="fuchsia" />
                <PreviewTile icon={<Scale className="h-5 w-5" />} title="Journal privé" body="Posez les choses. Vous seul·e y avez accès." accent="turquoise" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section id="offer" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader eyebrow="Trois piliers" title="Un seul espace pour vous accompagner" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <OfferCard icon={<Brain className="h-6 w-6" />} title="Thérapie" body="Psychologues et psychothérapeutes pour comprendre, traverser, guérir. Approches TCC, EMDR, intégrative." />
          <OfferCard icon={<HeartHandshake className="h-6 w-6" />} title="Coaching" body="Coachs certifiés pour avancer : clarté, transition pro, sommeil, relations, leadership." />
          <OfferCard icon={<Scale className="h-6 w-6" />} title="Conseil juridique" body="Avocats spécialisés en droit de la famille, du travail et harcèlement. Un premier rendez-vous d'orientation." />
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader eyebrow="En 3 étapes" title="Démarrez à votre rythme" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Créez votre espace", d: "Inscription en moins d'une minute, par email ou Google." },
            { n: "02", t: "Posez les premières pierres", d: "Notez votre humeur, ouvrez votre journal. Aucune obligation." },
            { n: "03", t: "Trouvez le bon pro", d: "Filtrez par discipline, langue, ville et demandez un créneau." },
          ].map((s) => (
            <div key={s.n} className="glass relative overflow-hidden rounded-2xl p-6">
              <span className="font-display text-5xl text-gradient">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="mx-auto max-w-6xl px-6 py-24">
        <div className="glass rounded-3xl p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Confidentialité by design
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">Vos données, cloisonnées et protégées.</h2>
              <p className="mt-4 text-muted-foreground">
                Les espaces cliniques, financiers et entreprises sont strictement isolés. Aucune jointure directe. Vos notes et journaux sont accessibles uniquement par vous.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "Chaque utilisateur·rice ne voit que ses propres données",
                "Authentification sécurisée — Google ou email",
                "Hébergement européen · RGPD",
                "Aucun partage commercial de vos contenus",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <Lock className="mt-0.5 h-4 w-4 flex-none text-accent" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-32 text-center">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">
          Premier pas. <span className="text-gradient">Aujourd'hui.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Rejoignez un espace pensé pour vous écouter. Sans jugement, sans bruit.
        </p>
        <Link to="/auth" search={{ mode: "signup" } as never} className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-pill px-8 text-sm font-medium text-primary-foreground shadow-glow">
          Créer mon espace
        </Link>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.name} · {BRAND.sub} — {BRAND.tagline}
      </footer>
    </div>
  );
}

function PreviewTile({ icon, title, body, accent }: { icon: React.ReactNode; title: string; body: string; accent: "violet" | "fuchsia" | "turquoise" }) {
  const ringColor = accent === "turquoise" ? "text-accent" : "text-primary";
  return (
    <div className="rounded-xl bg-white/5 p-5 transition hover:bg-white/10">
      <div className={`mb-3 inline-grid h-9 w-9 place-items-center rounded-lg bg-white/5 ${ringColor}`}>{icon}</div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function OfferCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass group relative overflow-hidden rounded-2xl p-7 transition duration-500 hover:-translate-y-1 hover:shadow-glow">
      <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-hero opacity-20 blur-3xl transition group-hover:opacity-40" />
      <div className="relative">
        <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-pill text-primary-foreground shadow-glow">{icon}</div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{title}</h2>
    </div>
  );
}
