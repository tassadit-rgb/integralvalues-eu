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
  HOFSTEDE_LENSES,
  SCIENTIFIC_FOUNDATIONS,
  SCIENTIFIC_FOUNDATIONS_NOTE,
  VALUES_LEVELS,
  VALUES_RANKING_NOTE,
  ZONE_OF_BALANCE,
} from "@/lib/values-ranking";

export const Route = createFileRoute("/cross-culture")({
  head: () => ({
    meta: [
      { title: "Cross-Culture — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Cross-cultural care, Values Ranking, Hofstede-informed cultural mapping, mobility support and international organisational work across cultures.",
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

      <Section muted eyebrow="Values across cultures" title="Three levels, several frames of reference">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The Cross-Culture lens does not rank cultures. It revisits the person’s own Values
          Ranking across personal, family, cultural and organisational frames. What matters is
          not only which value is present, but how central it is and how easy it is to express
          in each context.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {VALUES_LEVELS.map((level, index) => (
            <div
              key={level.label}
              className="rounded-[1.7rem] border bg-card p-6"
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
              <p className="mt-5 text-xs leading-relaxed text-ink/70">
                {level.values.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.7rem] border border-[#9C78D5]/30 bg-card p-6 sm:p-8">
            <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#A5199B]">
              Value tensions to explore
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {CROSS_CULTURAL_VALUE_TENSIONS.map((tension) => (
                <span
                  key={tension}
                  className="rounded-full border border-[#9C78D5]/25 bg-[#9C78D5]/8 px-4 py-2.5 text-sm text-ink/75"
                >
                  {tension}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-[#100850]/15 bg-[#100850]/[0.025] p-6 sm:p-8">
            <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#100850]">
              Contexts we can compare
            </p>
            <p className="mt-5 font-serif text-2xl leading-snug text-ink">
              Self · Family · Culture of origin · Host culture · Organisation
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The objective is to make alignment, adaptation and friction visible without
              turning a national average into a description of an individual.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {VALUES_RANKING_NOTE}
        </p>

        <Link
          to="/values-map"
          className="mt-7 inline-flex items-center rounded-full bg-[#9C78D5] px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
        >
          Open the Cross-Cultural Values Map
        </Link>
      </Section>

      <Section eyebrow="Cultural context" title="Hofstede as a contextual lens — not a label">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Hofstede’s cultural dimensions can help us formulate questions about the wider
          environment around a person or team. They are used here at group and contextual
          level, never to infer an individual personality from nationality.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOFSTEDE_LENSES.map((lens) => (
            <div key={lens.dimension} className="rounded-[1.45rem] border border-[#9C78D5]/25 bg-card p-6">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#A5199B]">
                Hofstede dimension
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{lens.dimension}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {lens.tension}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Communication" title="Finding the Zone of Balance">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.72fr_1fr] lg:items-stretch">
          <div className="rounded-[1.7rem] border border-[#E5279A]/22 bg-card p-7">
            <p className="eyebrow">My frame of reference</p>
            <p className="mt-4 font-serif text-2xl text-ink">Identity, history, values, language</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              What I assume, protect, expect and interpret through my own lived context.
            </p>
          </div>

          <div className="rounded-[1.7rem] border border-[#75E8D5]/45 bg-[#75E8D5]/12 p-7 text-center">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#008FA0]">
              {ZONE_OF_BALANCE.title}
            </p>
            <p className="mt-4 font-serif text-2xl leading-snug text-ink">
              {ZONE_OF_BALANCE.principle}
            </p>
            <div className="mt-5 space-y-2 text-xs leading-relaxed text-muted-foreground">
              {ZONE_OF_BALANCE.conditions.map((condition) => (
                <p key={condition}>{condition}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-[#9C78D5]/25 bg-card p-7">
            <p className="eyebrow">The other frame</p>
            <p className="mt-4 font-serif text-2xl text-ink">Culture, roles, expectations, systems</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              What the other person, family, institution or organisation may be reading from a different reference frame.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-border bg-background/75 p-6 sm:p-8">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#A5199B]">
            Porter-informed communication check
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            We pay attention to whether communication is moving toward evaluation,
            interpretation, support, investigation, solution or understanding. The aim is not
            to force agreement, but to understand the other frame before negotiating difference.
          </p>
        </div>
      </Section>

      <Section eyebrow="Scientific & theoretical foundations" title="Several lenses. One integral reading.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
