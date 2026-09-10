import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanTogether from "@/assets/human-together.jpg";
import {
  CROSS_CULTURAL_VALUE_TENSIONS,
  VALUES_RANKING_GROUPS,
  VALUES_RANKING_NOTE,
} from "@/lib/values-ranking";

export const Route = createFileRoute("/cross-culture")({
  head: () => ({
    meta: [
      { title: "Cross-Culture — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Cross-cultural care, Values Ranking, mobility support and international organisational work for people living, working or rebuilding belonging across cultures.",
      },
      { property: "og:title", content: "Cross-Culture — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Relocation, identity, values, belonging and intercultural work for people and organisations across borders.",
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
        lead="We accompany expatriates, migrants, returning nationals, internationally mobile families and global teams through the invisible work of adapting — decoding difference, holding identity steady and rebuilding a sense of place."
        quote="“Once we accept our limits, we go beyond them.” — Albert Einstein"
      />

      <EmotiveImage
        src={humanTogether}
        alt="People of different cultures standing close together, lit in cyan and magenta"
        caption="Difference becomes strength when people truly meet."
      />

      <Section eyebrow="Programmes" title="Three ways we work across cultures">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Mobility"
            title="Migration, expat & relocation support"
            body="Preparation, arrival and the long middle: culture shock, family adjustment, partner careers, schooling, administrative stress, return and the rebuilding of belonging."
          />
          <CardTile
            meta="Organisations"
            title="Inclusion & intercultural intelligence"
            body="Support for international teams and organisations seeking to turn cultural difference into trust, clarity, belonging and responsible collaboration."
          />
          <CardTile
            meta="Identity"
            title="Values Ranking, trauma & belonging"
            body="We revisit the Values Ranking introduced in Psyché™ to explore how personal priorities interact with family expectations, cultural norms, migration history, collective or transgenerational trauma and the realities of belonging across several worlds."
          />
        </div>
      </Section>

      <Section muted eyebrow="Values across cultures" title="The same value can mean something different in another context">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The Cross-Culture lens does not rank cultures. It revisits your own Values Ranking
          across personal, family, cultural and organisational contexts. The aim is to identify
          where the same priorities feel aligned, where they become difficult to express, and
          where two legitimate values may pull in different directions.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES_RANKING_GROUPS.map((group) => (
              <div key={group.label} className="rounded-[1.4rem] border border-border bg-card p-5">
                <p className="eyebrow">{group.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/75">
                  {group.values.join(" · ")}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.6rem] border border-[#9C78D5]/35 bg-[#9C78D5]/8 p-6 sm:p-7">
            <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#A5199B]">
              Cross-cultural tensions to explore
            </p>
            <div className="mt-5 space-y-3">
              {CROSS_CULTURAL_VALUE_TENSIONS.map((tension) => (
                <div
                  key={tension}
                  className="rounded-full border border-[#9C78D5]/25 bg-background/80 px-4 py-2.5 text-sm text-ink/75"
                >
                  {tension}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {VALUES_RANKING_NOTE}
        </p>
      </Section>

      <Section muted eyebrow="International lens" title="The person and the context, together">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Individual"
            title="Identity across borders"
            body="Living between cultures can reshape language, family roles, attachment, self-image and the meaning of home."
          />
          <CardTile
            meta="Collective"
            title="History and inherited trauma"
            body="Where relevant, we consider how war, displacement, discrimination, collective violence and family history may continue to influence present experience."
          />
          <CardTile
            meta="Systems"
            title="Access and institutions"
            body="Mental-health, educational, social and organisational systems are part of the environment. We pay attention to how people actually encounter them across countries and cultures."
          />
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Intercultural difficulty rarely announces itself as such. It can arrive
          as fatigue, isolation, distress, conflict, loss of meaning or the
          feeling of no longer knowing where one belongs. We work with the
          person, the relationships and the cultural context at the same time.
        </p>
      </Section>

      <Section eyebrow="Next" title="Start with a conversation">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tell us where you are, where you come from, what has changed and who
          is involved. We will propose a form of support that fits your context,
          whether you are moving, settling, returning or simply trying to make
          sense of life between cultures.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Talk to us
        </Link>
      </Section>
    </SiteLayout>
  );
}
