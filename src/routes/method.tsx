import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, CardTile } from "@/components/site/site-layout";

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: [
      { title: "The Integral Method™ — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "The Integral Method™ is our DNA: AQAL, 3C+1, the Integrative Coaching Mindset™, CARE & CORE™, Psyché™ and the Integral Transformation Journey™.",
      },
      { property: "og:title", content: "The Integral Method™ — our DNA" },
      {
        property: "og:description",
        content:
          "A philosophy and a practice: AQAL, 3C+1, CARE & CORE™ and the Integral Transformation Journey™.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MethodPage,
});

const PARTS = [
  {
    meta: "01",
    title: "The Philosophy",
    body: "A person is never a set of separate parts. Emotion, thought, body and consciousness are read together — in relation to self, to others, and to the world one works in.",
  },
  {
    meta: "02",
    title: "AQAL",
    body: "An integral map: interior and exterior, individual and collective. Four quadrants that keep a single question from collapsing into a single explanation.",
  },
  {
    meta: "03",
    title: "3C + 1",
    body: "Coaching, Care & Therapy, Cross-Culture — and the CORE that holds them. Three practices and one integrative centre.",
  },
  {
    meta: "04",
    title: "The Integrative Coaching Mindset™",
    body: "Deep listening before technique. A stance that stays with the person rather than the presenting problem, within the ICF code of ethics.",
  },
  {
    meta: "05",
    title: "CARE & CORE™",
    body: "Care restores balance; Core reconnects Body, Brain, Heart and Consciousness. Healing and becoming, held in one architecture.",
  },
  {
    meta: "06",
    title: "Psyché™",
    body: "Evidence-based psychological and leadership assessment — the quiet reading that makes the rest of the work precise.",
  },
] as const;

const journeyLinkClass =
  "group block rounded-[1.5rem] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

function MethodPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="halo pointer-events-none absolute -left-48 -top-48 h-[36rem] w-[36rem]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div>
            <p className="eyebrow">The Integral Method™</p>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.06] text-ink sm:text-5xl lg:text-6xl">
              The Integral Method™ — our DNA.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Not a technique borrowed for the occasion, but a coherent architecture:
              a philosophy, a map, a mindset, and a journey that carries a person
              from self-knowledge to wholeness.
            </p>
            <p className="mt-10 max-w-xl font-serif text-xl italic text-ink/70">
              Beyond coping. Towards wholeness.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[30rem] overflow-hidden rounded-[2rem] bg-navy shadow-sm">
            <video
              src="/Hero-Our-method-web.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Integral Method visual"
              className="aspect-[3/4] w-full object-cover object-center"
            />
          </figure>
        </div>
      </section>

      <Section eyebrow="Architecture" title="Six elements, one coherence">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PARTS.map((p) => (
            <div key={p.title} className="bg-card p-8">
              <p className="font-serif text-3xl text-gold">{p.meta}</p>
              <h3 className="mt-5 text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        muted
        eyebrow="Integral Transformation Journey™"
        title="Five movements, one human journey"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Link to="/psyche" className={journeyLinkClass} aria-label="Discover Psyché">
            <CardTile
              meta="Discover yourself"
              title="Psyché®"
              body="Evidence-based psychological and leadership assessment. Self-awareness is the first step toward meaningful change."
            />
          </Link>

          <Link to="/counselling" className={journeyLinkClass} aria-label="Discover Care & Therapy">
            <CardTile
              meta="Heal yourself"
              title="Care & Therapy"
              body="Restore emotional balance and reconnect with your authentic self. Healing begins where judgment ends."
            />
          </Link>

          <Link to="/coaching" className={journeyLinkClass} aria-label="Discover Coaching">
            <CardTile
              meta="Unlock your potential"
              title="Coaching"
              body="Turn vision into action and develop conscious leadership. Growth starts from within."
            />
          </Link>

          <Link to="/cross-culture" className={journeyLinkClass} aria-label="Discover Cross-Culture">
            <CardTile
              meta="Thrive together"
              title="Cross-Culture"
              body="Build bridges across cultures and teams. Diversity becomes strength when people truly connect."
            />
          </Link>

          <div className="md:col-span-2">
            <Link to="/core" className={journeyLinkClass} aria-label="Discover CORE">
              <CardTile
                meta="Become whole"
                title="CORE"
                body="Our signature integrative pathway, designed to align Body, Brain, Heart and Consciousness. Beyond achievement lies fulfilment."
              />
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <Link
            to="/contact"
            className="border border-primary bg-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Begin the journey
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
