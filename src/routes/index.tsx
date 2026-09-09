import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, BookButton } from "@/components/site/site-layout";
import { FourCFramework } from "@/components/site/four-c";
import { IntegralValues } from "@/components/site/integral-values";
import { FounderSignature } from "@/components/site/founder-signature";
import heroBrand from "@/assets/hero-brand.jpg";
import humanLeader from "@/assets/human-leader.jpg";
import humanHealing from "@/assets/human-healing.jpg";
import humanTogether from "@/assets/human-together.jpg";
import humanCore from "@/assets/human-core.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Integral Values — Helping You Heal. Grow. Flourish." },
      {
        name: "description",
        content:
          "Integrative psychology, coaching, cross-cultural intelligence and leadership. A calm, international space where you are never alone.",
      },
      {
        property: "og:title",
        content: "Integral Values — Helping You Heal. Grow. Flourish.",
      },
      {
        property: "og:description",
        content:
          "Human First. Purpose Driven. Transformation Inspired. Psychology, coaching, culture and consciousness in one integrative approach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const JOURNEY = [
  {
    step: "Discover Yourself",
    name: "Psyché™",
    to: "/psyche",
    body: "Psychological and leadership assessment, read with you rather than about you.",
  },
  {
    step: "Heal Deeply",
    name: "Care & Therapy",
    to: "/counselling",
    body: "A safe space for anxiety, burnout, trauma, relationships and the quiet work of repair.",
  },
  {
    step: "Unlock Your Potential",
    name: "Coaching",
    to: "/coaching",
    body: "Executive, leadership, career and life coaching for people who want to lead consciously.",
  },
  {
    step: "Thrive Together",
    name: "Cross-Culture",
    to: "/cross-culture",
    body: "Intercultural intelligence for individuals, families and international organisations.",
  },
  {
    step: "Become Whole",
    name: "CORE™",
    to: "/core",
    body: "Our integrative pathway, aligning Body, Brain, Emotion and Consciousness.",
  },
] as const;

const PILLARS = [
  {
    to: "/coaching",
    title: "Coaching",
    line: "Unlock Your Potential.",
    img: humanLeader,
    alt: "A person facing an open horizon at sunrise",
  },
  {
    to: "/counselling",
    title: "Care & Therapy",
    line: "Heal. Reconnect. Flourish.",
    img: humanHealing,
    alt: "Soft daylight falling through a quiet forest",
  },
  {
    to: "/cross-culture",
    title: "Cross-Culture",
    line: "Thrive Across Borders.",
    img: humanTogether,
    alt: "People of different cultures walking side by side",
  },
  {
    to: "/core",
    title: "CORE™",
    line: "Become Whole.",
    img: humanCore,
    alt: "A solitary figure in deep blue light",
  },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/Hero-You%E2%80%99re%20not%20Alone%3B.mp4"
          poster={heroBrand}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/45" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-28 lg:px-10">
          <p className="reveal text-[0.7rem] uppercase tracking-[0.28em] text-background/70">
            You're Not Alone.
          </p>
          <h1 className="reveal mt-8 max-w-3xl text-5xl leading-[1.05] text-background sm:text-6xl lg:text-7xl">
            Helping You Heal. Grow. Flourish.
          </h1>
          <p className="reveal mt-8 max-w-xl text-sm uppercase tracking-[0.14em] text-background/75">
            Integrative Psychology • Coaching • Cross-Cultural Intelligence • Leadership
          </p>
          <div className="reveal mt-12 flex flex-wrap items-center gap-4">
            <BookButton />
            <Link
              to="/method"
              className="inline-flex items-center justify-center rounded-full border border-background/50 px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-ink"
            >
              Discover Our Approach
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="halo pointer-events-none absolute -left-52 top-10 h-[36rem] w-[36rem]"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:py-36">
          <h2 className="font-serif text-3xl leading-snug text-ink sm:text-5xl">
            We don't simply solve problems.
            <br />
            We help people become whole.
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            Integral Values brings together psychology, therapy, coaching,
            leadership and cross-cultural intelligence in one coherent approach.
            We work internationally, in strict confidence, with people who are
            ready to look at their life as a whole.
          </p>
        </div>
      </section>

      <Section muted eyebrow="The Integral Journey" title="Five movements, one direction">
        <ol className="relative space-y-4 pl-10">
          <span
            aria-hidden
            className="absolute left-[0.68rem] top-4 bottom-4 w-px bg-border"
          />
          {JOURNEY.map((j) => (
            <li key={j.name} className="relative">
              <span
                aria-hidden
                className="absolute -left-10 top-7 h-3.5 w-3.5 rounded-full border border-primary bg-background"
              />
              <Link
                to={j.to}
                className="group block rounded-[1.5rem] px-6 py-6 transition-colors hover:bg-background/70 sm:flex sm:items-baseline sm:gap-10"
              >
                <span className="block min-w-56">
                  <span className="eyebrow block">{j.step}</span>
                  <span className="mt-2 block font-serif text-2xl text-ink">
                    {j.name}
                  </span>
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground sm:mt-0">
                  {j.body}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {PILLARS.map((p, i) => (
        <section key={p.to}>
          <div
            className={`mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 ${
              i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="overflow-hidden rounded-[2rem]">
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
              />
            </figure>
            <div>
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">
                {p.title}
              </h2>
              <p className="mt-4 font-serif text-2xl italic text-ink/70">
                {p.line}
              </p>
              <Link
                to={p.to}
                className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-primary"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      <Section
        muted
        eyebrow="The 4C Framework"
        title="Body. Brain. Emotion. Consciousness."
      >
        <FourCFramework />
      </Section>

      <Section eyebrow="Our Values" title="I.N.T.E.G.R.A.L.">
        <IntegralValues />
      </Section>

      <Section muted>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <figure>
            <img
              src="/About-founder.jpeg"
              alt="Tassadit Cherfaoui, founder of Integral Values"
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full rounded-[2rem] object-cover"
            />
          </figure>
          <div>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              A life dedicated to helping people become the best version of
              themselves — thriving, flourishing, and at home in who they are.
            </p>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Clinical practice, coaching, leadership and cross-cultural work
              brought together through one principle: never reduce a person to
              a single role, symptom or story.
            </p>
            <FounderSignature className="mt-10" />
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="font-serif text-2xl italic leading-relaxed text-ink/80 sm:text-3xl">
          Your privacy matters. Your trust is our greatest responsibility.
        </p>
        <BookButton className="mt-10" />
      </section>
    </SiteLayout>
  );
}
