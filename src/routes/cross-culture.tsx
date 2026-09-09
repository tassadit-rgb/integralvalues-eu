import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanTogether from "@/assets/human-together.jpg";

export const Route = createFileRoute("/cross-culture")({
  head: () => ({
    meta: [
      { title: "Cross-Culture — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Intercultural support for expatriation, migration, return, identity, belonging and international organisations.",
      },
      { property: "og:title", content: "Cross-Culture — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Intercultural care, mobility support and organisational inclusion for people living and working across cultures.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CrossCulturePage,
});

function CrossCulturePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="4C Framework — Cross-Culture"
        title="Belonging is learned twice: once at home, once elsewhere."
        lead="We work with people and organisations navigating cultural transition, migration, expatriation, return and life between identities. The aim is not to erase difference, but to make it livable, intelligible and connected."
        quote="Across borders, the person remains whole."
      />

      <EmotiveImage
        src={humanTogether}
        alt="People of different cultures standing close together, lit in cyan and magenta"
        caption="Difference becomes strength when people truly meet."
      />

      <Section eyebrow="Programmes" title="Three ways we work across cultures">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Mobility & migration"
            title="Transitions across borders"
            body="Preparation, arrival, return and the long middle: culture shock, family adjustment, language, schooling, administration and the rebuilding of a sense of place."
          />
          <CardTile
            meta="Identity & belonging"
            title="The invisible side of migration"
            body="Space to work with loss, divided loyalties, discrimination, uprooting, intergenerational stories and the tension between adapting and remaining oneself."
          />
          <CardTile
            meta="Organisations"
            title="DEIB & intercultural intelligence"
            body="Diversity, equity, inclusion and belonging translated into everyday leadership, communication and team practice across languages and cultural norms."
          />
        </div>
      </Section>

      <Section muted eyebrow="Perspective" title="Culture is part of the clinical and human context">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Intercultural difficulty rarely announces itself as such. It may appear as fatigue, conflict, isolation, shame, a family under strain or a person who no longer knows where they belong. We read the situation without separating the individual from history, language, culture and social context.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This perspective also informs the research dimension of Integral Values: how mental-health support can become more inclusive, ethically responsive and culturally intelligent for migrants, immigrants, internationally mobile people and communities living through collective or transgenerational trauma.
          </p>
        </div>
      </Section>

      <Section eyebrow="Next" title="Start with a conversation">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tell us where you are, what transition you are navigating and who is affected. We will propose a form of support that fits the context.
        </p>
        <Link
          to="/booking"
          className="mt-8 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Book a consultation
        </Link>
      </Section>
    </SiteLayout>
  );
}
