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
          "Leadership, organisational care and people strategy through an integral, cross-cultural approach.",
      },
      { property: "og:title", content: "CORE — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Leadership development, organisational care and people strategy for international organisations.",
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
        eyebrow="CORE — Organisations"
        title="The organisational centre: leadership, people and care at work."
        lead="CORE brings together leadership development, people strategy and mental-health-informed organisational care. The approach reads performance and wellbeing together rather than treating them as separate agendas."
        quote="Human First. Purpose Driven. Transformation Inspired."
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
            body="Immersive leadership development combining reflection, simulation, feedback and practice across decision-making, relationships, culture and personal responsibility."
          />
          <CardTile
            meta="People"
            title="Executive & people strategy"
            body="Support around leadership profiles, succession, onboarding, assessment, role transitions and the fit between people, culture and organisational context."
          />
          <CardTile
            meta="Care"
            title="Care & Wellbeing at Work"
            body="A structured approach to psychosocial wellbeing, prevention, team climate and change — informed by assessment, dialogue and organisational reality."
          />
        </div>
      </Section>

      <Section muted eyebrow="Method" title="What informs the work">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {[
            "The AQAL framework",
            "Positive psychology",
            "Transactional analysis",
            "Spiral dynamics",
            "Systems thinking",
            "Intercultural intelligence",
            "Psychological safety",
            "Change management",
            "Ofman’s core quadrant",
          ].map((t) => (
            <li key={t} className="border-b border-border/60 pb-3">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Why CORE" title="Three operating principles">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">Ethics & confidentiality</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sensitive people and organisational information is handled with clear boundaries, confidentiality and role clarity.
            </p>
          </div>
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">Human + systemic</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We look at the individual, the team, the structure and the wider context instead of locating every difficulty inside one person.
            </p>
          </div>
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">International by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cross-cultural dynamics, language, mobility and different leadership norms are considered from the start rather than added later.
            </p>
          </div>
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
