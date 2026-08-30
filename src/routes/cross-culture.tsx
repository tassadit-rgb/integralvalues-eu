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
          "Expatriation and relocation support, DEIB programmes and values ranking — coaching people and organisations across 42 nationalities and five continents.",
      },
      { property: "og:title", content: "Cross-Culture — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Relocation support, DEIB and values ranking for people living between cultures.",
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
        lead="We accompany expatriates, returning nationals and international teams through the invisible work of adapting — decoding cultural difference, holding identity steady and rebuilding a sense of place."
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
            title="Expat & relocation support"
            body="Preparation, arrival and the long middle: culture shock, family adjustment, partner careers, schooling and the slow return home."
          />
          <CardTile
            meta="Organisations"
            title="DEIB"
            body="Diversity, equity, inclusion and belonging built as a way of thinking and acting, so that every person feels accepted, valued and safe at work."
          />
          <CardTile
            meta="Instrument"
            title="Values ranking"
            body="A facilitated reading of what an individual, a couple or a team truly values — and where those values quietly disagree with each other."
          />
        </div>
      </Section>

      <Section muted eyebrow="Reach" title="A practice built between continents">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            { n: "42", l: "Nationalities accompanied" },
            { n: "5", l: "Continents" },
            { n: "23+", l: "Years of practice" },
          ].map((s) => (
            <div key={s.l} className="border-l border-gold pl-6">
              <p className="font-serif text-5xl text-ink">{s.n}</p>
              <p className="eyebrow mt-3">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Intercultural difficulty rarely announces itself as such. It arrives
          as fatigue, irritability, a marriage under strain, a team that cannot
          agree on what respect looks like. We work with the culture and the
          person at the same time.
        </p>
      </Section>

      <Section eyebrow="Next" title="Start with a conversation">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tell us where you are moving from, where you are going and who is
          coming with you. We will propose a form of support that fits the
          season you are in.
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
