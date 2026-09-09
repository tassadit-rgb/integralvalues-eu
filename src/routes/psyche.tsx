import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanPsyche from "@/assets/human-psyche.jpg";

export const Route = createFileRoute("/psyche")({
  head: () => ({
    meta: [
      { title: "Psyché™ Lab — Psychological & Leadership Assessment" },
      {
        name: "description",
        content:
          "Psyché™ Lab: evidence-based assessment — IQ, ADHD, HPI, personality, burnout, WHO-5, career and couple assessment, read with a licensed psychologist.",
      },
      { property: "og:title", content: "Psyché™ Lab — assessment with meaning" },
      {
        property: "og:description",
        content:
          "Validated psychological and leadership assessment, interpreted in conversation, never as a label.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PsychePage,
});

const LAB = [
  { title: "Cognitive (IQ)", body: "Standardised cognitive assessment for adults and adolescents, with a written report and a restitution session." },
  { title: "ADHD", body: "Structured attention-deficit evaluation combining clinical interview, validated scales and collateral history." },
  { title: "HPI / Giftedness", body: "High potential identification, and the emotional life that often accompanies it." },
  { title: "Personality", body: "Trait and dynamic personality inventories used to understand patterns rather than to classify people." },
  { title: "Burnout", body: "Exhaustion, depersonalisation and efficacy measured precisely, with a return-to-balance plan." },
  { title: "Career Assessment", body: "Interests, values and drivers mapped against realistic professional pathways." },
  { title: "Couple Assessment", body: "Attachment, communication and satisfaction read together, with both partners present." },
  { title: "Leadership Assessment", body: "Executive profiling for selection, succession and development — used inside CORE and Executive C-Level." },
] as const;

function PsychePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Psyché™ Lab"
        title="Discover yourself, with evidence."
        lead="Assessment is not a verdict. It is a careful reading of how you think, feel and function — restored to you in conversation, in plain language, by a licensed psychologist."
        quote="Self-awareness is the first step toward meaningful change."
      />

      <EmotiveImage
        src={humanPsyche}
        alt="A person in profile with eyes closed, soft light tracing the face"
        caption="The inner life, measured with respect."
      />

      <Section eyebrow="The Lab" title="What we assess">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {LAB.map((l) => (
            <CardTile key={l.title} title={l.title} body={l.body} />
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Free self-checks" title="Begin quietly, on your own">
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/asrs"
            className="border border-border bg-card p-8 transition-colors hover:bg-accent/40 md:col-span-2"
          >
            <h3 className="text-xl text-ink">ASRS-v1.1 — Adult ADHD Self-Report Scale</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              La grille d'autoévaluation du TDAH chez l'adulte validée par
              l'OMS : 18 questions sur les six derniers mois, avec le résultat
              de dépistage de la partie A immédiatement lisible et prêt à être
              discuté en consultation.
            </p>
          </Link>
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
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Self-checks are informational and do not constitute a diagnosis. If you
          are in distress or at risk, contact your local emergency service or a
          crisis line immediately.
        </p>
      </Section>
    </SiteLayout>
  );
}
