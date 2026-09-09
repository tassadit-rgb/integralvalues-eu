import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanCore from "@/assets/human-core.jpg";

export const Route = createFileRoute("/core")({
  head: () => ({
    meta: [
      { title: "CORE — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "International organisational care, leadership development, executive advisory and workplace well-being through the CORE pathway.",
      },
      { property: "og:title", content: "CORE — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Leadership, organisational care and workplace well-being through an integral, cross-cultural lens.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CorePage,
});

function CorePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="4C Framework — CORE"
        title="The organisational centre: leadership, people and care at work."
        lead="CORE brings together leadership development, organisational care, executive advisory and workplace well-being for organisations operating across cultures and borders."
        quote="“Becoming a leader is the same as becoming a fully integrated human being.” — Ken Wilber"
      />

      <EmotiveImage
        src={humanCore}
        alt="A circle of professionals in open dialogue in a bright modern room"
        caption="Care that holds an organisation together."
      />

      <Section eyebrow="Programmes" title="Three pillars">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Leadership"
            title="Integrative Leadership Experience"
            body="An immersive leadership pathway combining reflection, simulation, feedback and practical application for leaders navigating complexity and change."
          />
          <CardTile
            meta="Executive"
            title="Leadership & people advisory"
            body="Assessment, executive development, succession thinking, onboarding and leadership support with attention to both the person and the organisational culture."
          />
          <CardTile
            meta="Workplace care"
            title="Care & Wellbeing at Work"
            body="Assessment, well-being indicators, prevention, collective reflection and change-management tools assembled into a context-specific organisational plan."
          />
        </div>
      </Section>

      <Section muted eyebrow="Method" title="An integral and cross-cultural lens">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {[
            "AQAL / integral mapping",
            "Positive psychology",
            "Transactional analysis",
            "Spiral dynamics",
            "Narrative and systemic approaches",
            "Intercultural intelligence",
            "Values and meaning",
            "Embodied awareness",
            "Organisational reflection",
          ].map((t) => (
            <li key={t} className="border-b border-border/60 pb-3">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="International" title="For organisations working across borders">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="People"
            title="Human complexity"
            body="Leadership challenges are rarely only technical. Identity, values, relationships, stress and meaning shape how people act at work."
          />
          <CardTile
            meta="Culture"
            title="Cross-cultural realities"
            body="International organisations need space to understand how different expectations around authority, communication, trust and belonging affect performance."
          />
          <CardTile
            meta="Care"
            title="Prevention before crisis"
            body="We favour earlier observation, dialogue and support rather than waiting for distress, disengagement or conflict to become entrenched."
          />
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Discuss an organisational project
        </Link>
      </Section>
    </SiteLayout>
  );
}
