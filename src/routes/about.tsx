import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";
import { DimensionIcons } from "@/components/site/dimension-icons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Who we are, our core values and the integral philosophy behind Integral Values Psy & Co.",
      },
      { property: "og:title", content: "About — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Our founder, our mission and the integral spirit that guides the practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    k: "Inclusive",
    v: "A way of thinking and acting that lets every individual feel accepted, valued and safe.",
  },
  {
    k: "Nurturing",
    v: "To care for and protect someone while they are growing. Relationships are at the centre of what we do.",
  },
  {
    k: "Thriving",
    v: "A positive psychological state combining vitality with a genuine sense of learning.",
  },
  {
    k: "Effectiveness",
    v: "Using energy, skill and motivation with clarity so that intended goals can be pursued responsibly.",
  },
  {
    k: "Go-Getter",
    v: "Moving ahead with initiative and perseverance while staying accountable to the impact of our actions.",
  },
  {
    k: "Resilience",
    v: "Adapting to difficult experiences through mental, emotional and behavioural flexibility.",
  },
  {
    k: "Assertiveness",
    v: "Expressing needs, boundaries and viewpoints clearly while respecting the dignity of others.",
  },
  {
    k: "Lively",
    v: "Bringing vitality, curiosity and engagement to human relationships and to life.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="A life dedicated to helping people become the best version of themselves."
        lead="Integral Values Psy & Co is an integrative practice bringing together clinical psychology, coaching, cross-cultural work and organisational care. Rigour, reliability and respect — the three constants of every mandate we take."
        quote="“It is not by looking at the light that one becomes luminous, but by plunging into its darkness.” — Carl Gustav Jung"
      />

      <Section eyebrow="Who we are" title="The founder">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] bg-secondary/30">
              <img
                src="/About-founder.jpeg"
                alt="Portrait of Tassadit Cherfaoui, founder of Integral Values Psy & Co"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Tassadit — founder, clinical psychologist and coach.
            </figcaption>
          </figure>

          <div className="max-w-2xl space-y-6 text-[0.95rem] leading-[1.8] text-muted-foreground">
            <p>
              Tassadit was born in Algiers and has lived sixteen years in the
              largest desert on earth. She studied clinical psychology,
              continued research on collective trauma and its societal impact,
              and completed an MBA in management alongside training in forensic
              psychology and investigation.
            </p>
            <p>
              It was on the sand of the great desert that she took her first
              steps. She grew up in the Zawia among other children — most of
              them orphaned, the rest without a home. Love, sharing and
              protection are the values that nourished her, and the Sufi
              philosophy of those days still shapes the behavioural
              psychologist she became.
            </p>
            <p>
              Her path has moved across clinical practice, coaching, leadership,
              cross-cultural work and organisational life, with one continuous
              concern: how to accompany the whole person without reducing them
              to a label, a role or a symptom.
            </p>
            <p>
              Integral Values grew from that crossing of disciplines and lived
              experience, and is now being developed as an international care,
              education and leadership ecosystem.
            </p>
          </div>
        </div>
      </Section>

      <Section muted eyebrow="Four dimensions" title="Body, Brain, Emotion, Consciousness">
        <div className="mx-auto max-w-5xl">
          <DimensionIcons />
        </div>
      </Section>

      <Section muted eyebrow="Why" title="Our core values">
        <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.k} className="border-t border-border pt-5">
              <dt className="font-serif text-xl text-ink">{v.k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.v}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="How" title="Our spirit — the integral philosophy">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The integral approach refuses to divide a person into parts to be
            treated separately. Emotions, thought, body and consciousness are
            read together, in relation to the self, to others, to culture and
            to the wider world.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            In practice this means assessment that informs rather than labels,
            confidentiality that is never negotiable, and an intercultural lens
            that recognises context, history, trauma, belonging and meaning.
          </p>
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Meet us
        </Link>
      </Section>
    </SiteLayout>
  );
}
