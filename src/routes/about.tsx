import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";
import integralPyramid from "@/assets/integral-pyramid.jpg";
import { DimensionIcons } from "@/components/site/dimension-icons";
import portraitMain from "@/assets/IMG_0016.jpg.asset.json";
import portraitFilm from "@/assets/IMG_0314.jpg.asset.json";
import portraitStage from "@/assets/IMG_0008.jpg.asset.json";
import portraitStudio from "@/assets/IMG_0021_1.jpg.asset.json";

const GALLERY = [
  { src: portraitFilm.url, alt: "Portrait of Tassadit, founder of Integral Values" },
  { src: portraitStage.url, alt: "Tassadit speaking on stage at a TEDx conference" },
  { src: portraitStudio.url, alt: "Black and white studio portrait of Tassadit" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Who we are, our core values and the integral philosophy behind Integral Values Psy & Co — 25 years of clinical psychology, coaching and cross-cultural leadership.",
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
    k: "Effective",
    v: "Using all your energy, skill and motivation to reach the goals you set for yourself.",
  },
  {
    k: "Go-Getter",
    v: "Moving ahead until goals are reached and surpassed, becoming a model for others.",
  },
  {
    k: "Resilient",
    v: "Adapting successfully to difficult experiences through mental, emotional and behavioural flexibility.",
  },
  {
    k: "Assertive",
    v: "Standing up for your interests and expressing your thoughts because respect runs both ways.",
  },
  {
    k: "Liveliness",
    v: "Passion for human beings and for life, kept enthusiastic and accountable.",
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
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
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
              A licensed clinical psychologist in practice for almost twenty-five
              years, a Master Certified Coach and mentor with the International
              Coaching Federation, certified in neuro-linguistic programming,
              Ericksonian hypnosis, and gender and sexology practice. Before
              that, a career across Hilton, Veon, Qtel, Pfizer, Knauf,
              Saint-Gobain, Heineken and BMW &amp; Mini.
            </p>
            <p>
              At the end of 2012, burnout. A rebirth followed: she returned to
              the classroom, joined the European School of Psycho-somato-analysis
              therapy, and since then well-being and mental health at work have
              become her primary vocation. In 2013 she founded her own practice
              and has shared it with an international network ever since.
            </p>
          </div>
          <div className="space-y-8">
            <figure>
              <img
                src={portraitMain.url}
                alt="Tassadit, founder of Integral Values Psy & Co, in her practice"
                loading="lazy"
                className="w-full border border-border object-cover"
              />
              <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Tassadit — clinical psychologist, Master Certified Coach and
                founder of Integral Values Psy &amp; Co.
              </figcaption>
            </figure>
            <img
              src={integralPyramid}
              alt="Integral pyramidal form: Body, Brain and Emotion at the base, Consciousness radiating at the apex"
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full border border-border object-cover"
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              3C + 1 — Body, Brain and Emotion form the base; Consciousness
              rises at the apex and holds them together.
            </p>
          </div>
        </div>
      </Section>

      <Section muted eyebrow="Four dimensions" title="Body, Brain, Emotion, Consciousness">
        <DimensionIcons />
      </Section>

      <Section eyebrow="Portraits" title="In presence">
        <div className="grid gap-6 sm:grid-cols-3">
          {GALLERY.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-[420px] w-full border border-border object-cover"
            />
          ))}
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
            treated separately. Emotions, thought, body and spirit are read
            together, in relation to the self, to the couple, to the team and
            to the world. Coaching, therapy and training are not three
            professions here; they are three angles on one movement.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            In practice this means slowness where slowness is needed and
            directness where it is useful. It means assessment that informs
            rather than labels, and confidentiality that is never negotiable.
            It means that the work belongs to you, and that we are only
            accompanying it.
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
