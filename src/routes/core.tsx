import { createFileRoute, Link } from "@tanstack/react-router";
import {
import { EmotiveImage } from "@/components/site/emotive-image";
import humanCore from "@/assets/human-core.jpg";
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";

export const Route = createFileRoute("/core")({
  head: () => ({
    meta: [
      { title: "Core — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "The Integrative Leadership Experience, C-level executive search and Care & Wellbeing at Work (CW2) — the organisational core of Integral Values.",
      },
      { property: "og:title", content: "Core — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Leadership immersion, executive search and workplace well-being programmes for organisations.",
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
        eyebrow="4C Framework — Core"
        title="The organisational centre: leadership, people and care at work."
        lead="Core gathers the work we do inside organisations — an immersive leadership experience, executive search for general and C-suite roles, and a well-being programme designed with the people it serves."
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
            meta="ILE"
            title="Integrative Leadership Experience"
            body="A fully integrative simulation condensing years of leadership practice into a few days. Participants turn management theory into practice immediately; available fully in person or 50% blended."
          />
          <CardTile
            meta="Search"
            title="C-level executive search"
            body="General management and C-suite search built on a deep reading of people against culture: assessment, investigation, package negotiation, outplacement and onboarding coaching."
          />
          <CardTile
            meta="CW2"
            title="Care & Wellbeing at Work"
            body="Assessment (#Psyché), a well-being barometer, activity and incentive trackers and change-management tools, assembled into a plan for your organisation."
          />
        </div>
      </Section>

      <Section muted eyebrow="Method" title="Techniques we draw from">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {[
            "The AQAL framework",
            "Positive psychology",
            "Transactional analysis",
            "Spiral dynamics",
            "Ericksonian hypnosis",
            "Neuro-linguistic programming",
            "The dramatic triangle",
            "Bio-dynamic relaxation",
            "Ofman’s core quadrant",
          ].map((t) => (
            <li key={t} className="border-b border-border/60 pb-3">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Why partner" title="What clients rely on">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">Certified and ethical</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our coaches are certified and practise strictly within the ICF
              code of ethics.
            </p>
          </div>
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">98%+ satisfaction</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Most of our work arrives through referral from people we have
              already accompanied.
            </p>
          </div>
          <div className="border-l border-gold pl-6">
            <h3 className="text-lg text-ink">Global reach</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Individuals coached from 42 nationalities across five continents.
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
