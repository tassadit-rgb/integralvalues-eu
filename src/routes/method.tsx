import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanMethod from "@/assets/human-method.jpg";

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

function MethodPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="The Integral Method™"
        title="The Integral Method™ — our DNA."
        lead="Not a technique borrowed for the occasion, but a coherent architecture: a philosophy, a map, a mindset, and a journey that carries a person from self-knowledge to wholeness."
        quote="Beyond coping. Towards wholeness."
      />

      <EmotiveImage
        src={humanMethod}
        alt="A person ascending a luminous staircase of light through layered planes"
        caption="One architecture, six elements, a single coherence."
      />

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
          <CardTile
            meta="Discover yourself"
            title="Psyché®"
            body="Evidence-based psychological and leadership assessment. Self-awareness is the first step toward meaningful change."
          />
          <CardTile
            meta="Heal yourself"
            title="Care & Therapy"
            body="Restore emotional balance and reconnect with your authentic self. Healing begins where judgment ends."
          />
          <CardTile
            meta="Unlock your potential"
            title="Coaching"
            body="Turn vision into action and develop conscious leadership. Growth starts from within."
          />
          <CardTile
            meta="Thrive together"
            title="Cross-Culture"
            body="Build bridges across cultures and teams. Diversity becomes strength when people truly connect."
          />
          <div className="md:col-span-2">
            <CardTile
              meta="Become whole"
              title="CORE"
              body="Our signature integrative pathway, designed to align Body, Brain, Heart and Consciousness. Beyond achievement lies fulfilment."
            />
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
