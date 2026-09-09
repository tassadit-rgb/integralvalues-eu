import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanHealing from "@/assets/human-healing.jpg";

export const Route = createFileRoute("/counselling")({
  head: () => ({
    meta: [
      { title: "Care & Therapy — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Individual, couple, family and group psychological support, plus Psyché well-being assessments in a confidential, non-judgemental space.",
      },
      { property: "og:title", content: "Care & Therapy — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "A supportive, confidential space for emotions and needs that have been ignored for too long.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CounsellingPage,
});

const APPROACHES = [
  "Attentive and active listening",
  "Humanistic and existential perspectives",
  "Jungian analytical methods",
  "Gestalt-informed work",
  "Schema-focused perspectives",
  "Transactional analysis",
  "Psychodynamic perspectives and psychodrama",
  "Narrative and mythic storytelling",
  "Family and systemic perspectives",
  "Intercultural awareness",
];

const THEMES = [
  "Anxiety, stress and burnout",
  "Depression and low mood",
  "Trauma-related difficulties",
  "Attachment difficulties",
  "Self-esteem and confidence",
  "Grief and life transitions",
  "Relationship struggles",
  "Addiction recovery support",
];

function CounsellingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="4C Framework — Care & Therapy"
        title="A space where what was too painful to feel can finally be felt."
        lead="Psychological support can be short-term and focused, or longer depending on what you need. The work stays attentive to emotions, relationships, context, body and meaning."
        quote="“Knowing your own darkness is the best method for dealing with the darkness of other people.” — Carl Gustav Jung"
      />

      <EmotiveImage
        src={humanHealing}
        alt="A woman with her eyes closed and a hand on her heart, lit in violet and cyan light"
        caption="Healing begins the moment someone finally listens."
      />

      <Section eyebrow="Settings" title="Who we accompany">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <CardTile
            meta="Individual"
            title="Adults"
            body="A private, judgement-free space to speak openly about difficult feelings, patterns and life events, and to work toward meaningful change at your own pace."
          />
          <CardTile
            meta="Individual"
            title="Teens & preteens"
            body="Support through the physical and emotional turbulence of adolescence, with attention to family, school and the wider environment when appropriate."
          />
          <CardTile
            meta="Relationship"
            title="Couples & families"
            body="Not about blame — about being understood. Communication, trust, intimacy, co-parenting and the patterns each person carries into the relationship."
          />
          <CardTile
            meta="Collective"
            title="Group dynamics"
            body="Facilitated group and practice-analysis spaces where shared experience can support reflection, learning and connection."
          />
        </div>
      </Section>

      <Section muted eyebrow="#Psyché" title="Assessment and self-observation">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <h3 className="text-xl text-ink">WHO-5 Well-Being Index</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Five statements, two minutes, a validated score from 0 to 100. A
              quiet first reading of how the last fortnight has felt.
            </p>
            <Link
              to="/who5"
              className="mt-6 inline-block border-b border-gold pb-1 text-sm text-ink"
            >
              Take the WHO-5
            </Link>
          </div>
          <div className="border border-border bg-card p-8">
            <h3 className="text-xl text-ink">Wheel of Life</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Eight areas, scored from one to ten, drawn as a single figure. See
              where life feels full and where it asks for attention.
            </p>
            <Link
              to="/wheel"
              className="mt-6 inline-block border-b border-gold pb-1 text-sm text-ink"
            >
              Open the wheel
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Scope" title="Some of what we work with">
        <div className="grid gap-10 md:grid-cols-2">
          <ul className="space-y-3 text-sm text-muted-foreground">
            {THEMES.map((t) => (
              <li key={t} className="border-b border-border/60 pb-3">
                {t}
              </li>
            ))}
          </ul>
          <div>
            <p className="eyebrow">Tailored approach</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {APPROACHES.map((a) => (
                <li key={a} className="border-b border-border/60 pb-3">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Session fees are handled in the booking and payment journey rather than displayed on this public page. This site is not an emergency service; in a crisis, contact your local emergency number.
        </p>
        <Link
          to="/booking"
          className="mt-8 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Book a first session
        </Link>
      </Section>
    </SiteLayout>
  );
}
