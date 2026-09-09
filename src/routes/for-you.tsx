import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanForYou from "@/assets/human-foryou.jpg";

export const Route = createFileRoute("/for-you")({
  head: () => ({
    meta: [
      { title: "For You — Membership, Resources & Store | Integral Values" },
      {
        name: "description",
        content:
          "Membership, free resources, articles and the book Rise Above — ways to stay close to the Integral Values practice between sessions.",
      },
      { property: "og:title", content: "For You — resources, membership, store" },
      {
        property: "og:description",
        content:
          "Free resources, articles, membership and the book Rise Above from Integral Values Psy & Co.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForYouPage,
});

function ForYouPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For You"
        title="Stay with us, between sessions."
        lead="The work does not only happen in the room. Resources, reflections and a membership designed to keep the practice present in ordinary weeks."
        quote="You're not alone."
      />

      <EmotiveImage
        src={humanForYou}
        alt="A person standing at a wide window at dawn, looking outward"
        caption="A quieter kind of belonging."
      />

      <Section eyebrow="Membership" title="A quieter kind of belonging">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Free"
            title="Resources"
            body="Reflection sheets, breathing and grounding practices, and the WHO-5 and Wheel of Life self-checks — open to everyone."
          />
          <CardTile
            meta="Member"
            title="Integral Circle"
            body="Monthly written reflections, a live group session, and priority access to seasonal workshops and retreats."
          />
          <CardTile
            meta="Store"
            title="Rise Above"
            body="The book — a companion for those rebuilding after change, written from twenty-five years of clinical and executive practice."
          />
        </div>
      </Section>

      <Section muted eyebrow="Articles" title="Reading room">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Healing begins where judgment ends",
              d: "On why self-criticism slows recovery, and what replaces it.",
            },
            {
              t: "The quiet signals of burnout",
              d: "Exhaustion rarely announces itself. Five earlier signs worth naming.",
            },
            {
              t: "Belonging across cultures",
              d: "Why relocation is an identity task before it is a logistical one.",
            },
          ].map((a) => (
            <CardTile key={a.t} title={a.t} body={a.d} meta="Article" />
          ))}
        </div>
        <div className="mt-12">
          <Link
            to="/contact"
            className="border border-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Join the circle
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
