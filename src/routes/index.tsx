import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/site/site-layout";
import heroBrand from "@/assets/hero-brand.jpg";
import humanHands from "@/assets/human-hands.jpg";
import { EmotiveImage } from "@/components/site/emotive-image";

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

const JOURNEY = [
  {
    step: "Discover yourself",
    name: "Psyché®",
    to: "/psyche",
    body: "Gain a deeper understanding of who you are through evidence-based psychological and leadership assessments.",
    quote: "Self-awareness is the first step toward meaningful change.",
  },
  {
    step: "Heal yourself",
    name: "Care & Therapy",
    to: "/counselling",
    body: "Restore emotional balance, strengthen relationships and reconnect with your authentic self through compassionate psychological care.",
    quote: "Healing begins where judgment ends.",
  },
  {
    step: "Unlock your potential",
    name: "Coaching",
    to: "/coaching",
    body: "Transform your vision into action, develop conscious leadership and build the confidence to create lasting impact.",
    quote: "Growth starts from within.",
  },
  {
    step: "Thrive together",
    name: "Cross-Culture",
    to: "/cross-culture",
    body: "Build bridges across cultures, teams and organisations to foster inclusion, collaboration and global success.",
    quote: "Diversity becomes strength when people truly connect.",
  },
  {
    step: "Become whole",
    name: "CORE",
    to: "/core",
    body: "Experience our signature integrative pathway, designed to align Body, Brain, Heart and Consciousness.",
    quote: "Beyond achievement lies fulfilment.",
  },
] as const;

const FOUR = [
  {
    to: "/coaching",
    n: "01",
    t: "Coaching",
    d: "Executive coaching, leadership development, career transition, life coaching, mentoring and coach supervision.",
  },
  {
    to: "/counselling",
    n: "02",
    t: "Care & Therapy",
    d: "Individual, couples, family, teen and sexology care for anxiety, depression, burnout, trauma and attachment.",
  },
  {
    to: "/cross-culture",
    n: "03",
    t: "Cross-Culture",
    d: "Cross-cultural coaching, relocation and expat support, global mobility, DEIB consulting and soft skills.",
  },
  {
    to: "/core",
    n: "04",
    t: "CORE",
    d: "Therapeutic circles, inner leadership, somatic practices, symbolic work and reflective rituals.",
  },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border/70">
        <img
          src={heroBrand}
          alt="Abstract lavender field at dawn in navy, violet, pink and cyan light"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="relative mx-auto max-w-6xl px-6 py-32 lg:px-10 lg:py-44">
          <p className="eyebrow text-background">Welcome to Integral Value®</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-background sm:text-5xl lg:text-6xl">
            Human First. Purpose Driven. Transformation Inspired.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-background/85">
            Helping individuals, couples, families and organisations thrive
            through an integrative approach that brings together science,
            humanity and conscious leadership.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="border border-primary bg-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a consultation
            </Link>
            <Link
              to="/method"
              className="border border-background px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-ink"
            >
              The Integral Method™
            </Link>
          </div>
        </div>
      </section>

      <Section
        eyebrow="The Integral Values Journey"
        title="Your journey begins here"
      >
        <ol className="space-y-px border border-border bg-border">
          {JOURNEY.map((j, i) => (
            <li key={j.name}>
              <Link
                to={j.to}
                className="group grid gap-4 bg-card p-8 transition-colors hover:bg-accent/40 md:grid-cols-[auto_1fr_1fr] md:items-baseline md:gap-10"
              >
                <span className="font-serif text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="eyebrow block">{j.step}</span>
                  <span className="mt-2 block text-xl text-ink">{j.name}</span>
                </span>
                <span>
                  <span className="block text-sm leading-relaxed text-muted-foreground">
                    {j.body}
                  </span>
                  <span className="mt-3 block font-serif text-base italic text-ink/70">
                    “{j.quote}”
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        muted
        eyebrow="The 4 Pillars"
        title="Four pillars. One human journey."
      >
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


      <EmotiveImage
        src={humanHands}
        alt="Two hands of different skin tones reaching toward each other in violet and cyan light"
        caption="You're not alone."
        align="center"
      />

      <Section muted eyebrow="Mission">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-start">
          <figure className="space-y-3">
            <img
              src={founderReal.url}
              alt="Portrait of Dr Tassadit Cherfaoui, founder of Integral Values Psy & Co"
              width={900}
              height={1200}
              loading="lazy"
              className="w-full rounded-2xl border border-border object-cover shadow-sm"
            />
            <figcaption className="text-xs leading-relaxed text-muted-foreground">
              Dr Tassadit Cherfaoui — founder, clinical psychologist and Master
              Certified Coach.
            </figcaption>
          </figure>
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
