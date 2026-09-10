import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanPsyche from "@/assets/human-psyche.jpg";
import {
  SCIENTIFIC_FOUNDATIONS,
  SCIENTIFIC_FOUNDATIONS_NOTE,
  VALUES_LEVELS,
  VALUES_RANKING_GROUPS,
  VALUES_RANKING_NOTE,
} from "@/lib/values-ranking";

export const Route = createFileRoute("/psyche")({
  head: () => ({
    meta: [
      { title: "Psyché™ Lab — Psychological & Leadership Assessment" },
      {
        name: "description",
        content:
          "Psyché™ Lab: structured psychological and leadership assessment — IQ, ADHD, HPI, personality, burnout, WHO-5, career, couple and Values Ranking, read in context.",
      },
      { property: "og:title", content: "Psyché™ Lab — assessment with meaning" },
      {
        property: "og:description",
        content:
          "Psychological and leadership assessment interpreted in conversation, never as a label.",
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
  { title: "Values Ranking", body: "A structured reflective ranking of personal, relational, cultural and professional values to clarify priorities, tensions and direction." },
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
        lead="Assessment is not a verdict. It is a careful reading of how you think, feel and function — restored to you in conversation, in plain language and in context."
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

      <Section muted eyebrow="Values Ranking" title="What matters most — and how deeply?">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Values are rarely isolated. They interact with relationships, family, culture,
          work, migration and life stage. Psyché™ uses a cross-context values palette and
          then organises the person’s own ranking into three levels of centrality.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {VALUES_LEVELS.map((level, index) => (
            <div
              key={level.label}
              className="rounded-[1.7rem] border bg-card p-6 shadow-[0_12px_30px_rgba(16,8,80,0.04)]"
              style={{
                borderColor:
                  index === 0
                    ? "rgba(229,39,154,0.28)"
                    : index === 1
                      ? "rgba(156,120,213,0.28)"
                      : "rgba(0,206,229,0.28)",
              }}
            >
              <p className="eyebrow">{level.level}</p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{level.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {level.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {level.values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-ink/75"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.6rem] border border-border bg-background/70 p-6 sm:p-8">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#A5199B]">
            Crossed values palette
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES_RANKING_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium text-ink">{group.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {group.values.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {VALUES_RANKING_NOTE}
        </p>
      </Section>

      <Section eyebrow="Scientific & theoretical foundations" title="Established frameworks, integrated with care">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The Integral Values interpretation is informed by established international
          frameworks in values research, intercultural psychology, communication and
          integral theory. Each framework contributes a different lens rather than a label.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SCIENTIFIC_FOUNDATIONS.map((foundation) => (
            <div key={foundation.name} className="rounded-[1.45rem] border border-border bg-card p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                {foundation.role}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{foundation.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {foundation.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {SCIENTIFIC_FOUNDATIONS_NOTE}
        </p>
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
