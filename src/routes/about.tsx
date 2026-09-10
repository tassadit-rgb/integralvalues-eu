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
    letter: "I",
    k: "Inclusive",
    v: "A way of thinking and acting that lets every individual feel accepted, valued and safe.",
    accent: "#E5279A",
    tint: "rgba(229,39,154,0.08)",
    border: "rgba(229,39,154,0.20)",
  },
  {
    letter: "N",
    k: "Nurturing",
    v: "To care for and protect someone while they are growing. Relationships are at the centre of what we do.",
    accent: "#00AFC4",
    tint: "rgba(117,232,213,0.15)",
    border: "rgba(0,206,229,0.20)",
  },
  {
    letter: "T",
    k: "Thriving",
    v: "A positive psychological state combining vitality with a genuine sense of learning.",
    accent: "#8A5FD0",
    tint: "rgba(156,120,213,0.12)",
    border: "rgba(156,120,213,0.22)",
  },
  {
    letter: "E",
    k: "Effectiveness",
    v: "Using energy, skill and motivation with clarity so that intended goals can be pursued responsibly.",
    accent: "#3D73C9",
    tint: "rgba(174,181,232,0.16)",
    border: "rgba(61,115,201,0.18)",
  },
  {
    letter: "G",
    k: "Go-Getter",
    v: "Moving ahead with initiative and perseverance while staying accountable to the impact of our actions.",
    accent: "#E56A63",
    tint: "rgba(229,106,99,0.08)",
    border: "rgba(229,106,99,0.18)",
  },
  {
    letter: "R",
    k: "Resilience",
    v: "Adapting to difficult experiences through mental, emotional and behavioural flexibility.",
    accent: "#A5199B",
    tint: "rgba(165,25,155,0.08)",
    border: "rgba(165,25,155,0.18)",
  },
  {
    letter: "A",
    k: "Assertiveness",
    v: "Expressing needs, boundaries and viewpoints clearly while respecting the dignity of others.",
    accent: "#00A9BF",
    tint: "rgba(0,206,229,0.10)",
    border: "rgba(0,169,191,0.18)",
  },
  {
    letter: "L",
    k: "Lively",
    v: "Bringing vitality, curiosity and engagement to human relationships and to life.",
    accent: "#E5279A",
    tint: "rgba(229,39,154,0.08)",
    border: "rgba(229,39,154,0.18)",
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

      <section className="relative overflow-hidden bg-[#FDFCFA] py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#E5279A]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#AEB5E8]/[0.12] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-96 rounded-full bg-[#75E8D5]/[0.10] blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.30em] text-[#68769A]">
              People · Growth · Meaningful Change
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[#100850] sm:text-5xl">
              Our core values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              These values guide how we care, communicate, decide and grow — creating a space that feels safe, empowering and alive.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <article
                key={value.k}
                className="group relative overflow-hidden rounded-[1.8rem] border bg-white/85 p-6 text-center shadow-[0_14px_40px_rgba(16,8,80,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,8,80,0.09)]"
                style={{ borderColor: value.border }}
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full font-serif text-2xl"
                  style={{ backgroundColor: value.tint, color: value.accent }}
                  aria-hidden="true"
                >
                  {value.letter}
                </div>
                <h3 className="mt-5 font-serif text-2xl text-[#100850]">{value.k}</h3>

                <details className="mt-4 border-t border-[#100850]/10 pt-4 text-left">
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.62rem] uppercase tracking-[0.20em] text-[#68769A] outline-none transition hover:text-[#100850] [&::-webkit-details-marker]:hidden"
                    aria-label={`Read the meaning of ${value.k}`}
                  >
                    <span>Read meaning</span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-base leading-none"
                      style={{ backgroundColor: value.tint, color: value.accent }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {value.v}
                  </p>
                </details>

                <div
                  className="absolute inset-x-0 bottom-0 h-2 opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: value.tint }}
                />
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-4 text-center">
            <span className="h-px w-14 bg-[#AEB5E8]" />
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#68769A]">
              Values for a brighter tomorrow
            </p>
            <span className="h-px w-14 bg-[#AEB5E8]" />
          </div>
        </div>
      </section>

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
