import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/site/site-layout";
import heroDunes from "@/assets/hero-dunes.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Integral Values Psy & Co — Counselling, Coaching, Cross-Culture" },
      {
        name: "description",
        content:
          "An integrative practice for optimal human functioning: counselling with licensed psychologists, coaching, cross-cultural support and organisational care.",
      },
      {
        property: "og:title",
        content: "Integral Values Psy & Co — The quiet work of becoming whole",
      },
      {
        property: "og:description",
        content:
          "Counselling, coaching, cross-culture and core — one integrative approach to human development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FOUR = [
  {
    to: "/counselling",
    n: "01",
    t: "Counselling",
    d: "Individual, couple, family and group therapy with licensed psychologists, plus #Psyché assessment.",
  },
  {
    to: "/coaching",
    n: "02",
    t: "Coaching",
    d: "Individual, corporate and mentor coaching guided by the Integrative Coaching Mindset.",
  },
  {
    to: "/cross-culture",
    n: "03",
    t: "Cross-Culture",
    d: "Expatriation and relocation support, DEIB programmes and facilitated values ranking.",
  },
  {
    to: "/core",
    n: "04",
    t: "Core",
    d: "Integrative Leadership Experience, C-level executive search and Care & Wellbeing at Work.",
  },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border/70">
        <img
          src={heroDunes}
          alt="Abstract desert dunes in cream and sand tones with a thin gold horizon"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative mx-auto max-w-6xl px-6 py-32 lg:px-10 lg:py-44">
          <p className="eyebrow">Integral Values Psy &amp; Co</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            An integrative approach to the development of optimal human
            functioning.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80">
            Counselling, coaching, cross-culture and core. Four fields, one
            practice — dedicated to helping people thrive and flourish, in
            their lives and in their work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="border border-primary bg-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a first call
            </Link>
            <Link
              to="/about"
              className="border border-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Our philosophy
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow="The 4C Framework" title="Four fields that overlap">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FOUR.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group bg-card p-8 transition-colors hover:bg-accent/40"
            >
              <p className="font-serif text-3xl text-gold">{c.n}</p>
              <h3 className="mt-5 text-xl text-ink">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.d}
              </p>
              <span className="mt-6 inline-block border-b border-transparent pb-0.5 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:border-gold group-hover:text-ink">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Mission">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
            A life dedicated to helping people become the best version of
            themselves — thriving, flourishing, and at home in who they are.
          </p>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Twenty-three years as a strategic partner in business
              transformation and leadership development; twenty-five in clinical
              practice. Our psychologists and certified coaches work with
              individuals, couples, families and organisations, in strict
              confidence and within the ICF code of ethics.
            </p>
            <p>
              We do not divide a person into parts. Emotions, thought, body and
              spirit are read together — in relation to yourself, to those close
              to you, and to the world you work in.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="#Psyché" title="Begin quietly, on your own">
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/who5"
            className="border border-border bg-card p-8 transition-colors hover:bg-accent/40"
          >
            <h3 className="text-xl text-ink">WHO-5 Well-Being Index</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Five statements, two minutes. A validated first reading of how the
              last fortnight has actually felt.
            </p>
          </Link>
          <Link
            to="/wheel"
            className="border border-border bg-card p-8 transition-colors hover:bg-accent/40"
          >
            <h3 className="text-xl text-ink">Wheel of Life</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Eight areas of life, scored and drawn as one figure. See where
              things feel full, and where they ask for attention.
            </p>
          </Link>
        </div>
      </Section>

      <Section muted eyebrow="Voices">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              q: "She coached me and gave me strength to reorganise my life during my first months in a new country and culture.",
              a: "Carine — Ministry of Education, Sweden",
            },
            {
              q: "Through her deep listening and her tenacity, she helped me clarify my expectations and priorities after a major change.",
              a: "Ababakar — Ministerial Advisor, Senegal",
            },
            {
              q: "Few people are both good managers and coaches. That was the case when I worked with her.",
              a: "Marc — Planning Leader, Heineken",
            },
          ].map((t) => (
            <figure key={t.a} className="border-l border-gold pl-6">
              <blockquote className="font-serif text-lg italic leading-relaxed text-ink/85">
                “{t.q}”
              </blockquote>
              <figcaption className="eyebrow mt-4">{t.a}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
