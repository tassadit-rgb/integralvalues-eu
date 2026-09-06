import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, BookButton } from "@/components/site/site-layout";
import humanLeader from "@/assets/human-leader.jpg";
import humanHealing from "@/assets/human-healing.jpg";
import humanTogether from "@/assets/human-together.jpg";
import humanCore from "@/assets/human-core.jpg";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Coaching, Care & Therapy, Cross-Culture, CORE™" },
      {
        name: "description",
        content:
          "The four ways we work with people: coaching, care and therapy, cross-cultural intelligence and the CORE™ integrative pathway.",
      },
      { property: "og:title", content: "Works — Integral Values®" },
      {
        property: "og:description",
        content:
          "Four editorial pathways: unlock your potential, heal deeply, thrive across borders, become whole.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorksPage,
});

const PILLARS = [
  {
    to: "/coaching",
    title: "Coaching",
    line: "Unlock Your Potential.",
    img: humanLeader,
    alt: "A person looking toward an open horizon at sunrise",
  },
  {
    to: "/counselling",
    title: "Care & Therapy",
    line: "Heal. Reconnect. Flourish.",
    img: humanHealing,
    alt: "Soft daylight through a quiet forest",
  },
  {
    to: "/cross-culture",
    title: "Cross-Culture",
    line: "Thrive Across Borders.",
    img: humanTogether,
    alt: "People of different cultures walking together",
  },
  {
    to: "/core",
    title: "CORE™",
    line: "Become Whole.",
    img: humanCore,
    alt: "A single figure in deep blue light",
  },
] as const;

function WorksPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Works"
        title="Four pathways. One human journey."
        lead="Each pathway stands on its own, and each one leads back to the same intention: helping you become whole."
      />

      {PILLARS.map((p, i) => (
        <section key={p.to} className={i % 2 === 1 ? "bg-secondary/40" : ""}>
          <div
            className={`mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 ${
              i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="overflow-hidden rounded-[2rem]">
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <div>
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">
                {p.title}
              </h2>
              <p className="mt-4 font-serif text-2xl italic text-ink/70">
                {p.line}
              </p>
              <Link
                to={p.to}
                className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-primary"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-10">
        <p className="font-serif text-3xl text-ink">Not sure where to begin?</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          A first conversation is simply a conversation. We listen, and together
          we find the right starting point.
        </p>
        <BookButton className="mt-8" />
      </section>
    </SiteLayout>
  );
}
