import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, BookButton } from "@/components/site/site-layout";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Coaching, Care & Therapy, Cross-Culture, CORE™" },
      {
        name: "description",
        content:
          "The four ways we work with people: coaching, care and therapy, cross-cultural intelligence and the CORE™ organisational pathway.",
      },
      { property: "og:title", content: "Works — Integral Values" },
      {
        property: "og:description",
        content:
          "Four pathways: unlock your potential, heal deeply, thrive across borders and transform organisations consciously.",
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
    number: "01",
    title: "Coaching",
    line: "Unlock Your Potential.",
    body: "Executive, leadership, career and life coaching for people navigating responsibility, transition and conscious growth.",
    signals: ["Clarity", "Direction", "Action"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(117,232,213,0.48), transparent 34%), radial-gradient(circle at 74% 68%, rgba(156,120,213,0.30), transparent 38%), linear-gradient(135deg, #FDFCFA 0%, rgba(0,206,229,0.10) 100%)",
  },
  {
    to: "/counselling",
    number: "02",
    title: "Care & Therapy",
    line: "Heal. Reconnect. Flourish.",
    body: "Psychological care for anxiety, burnout, trauma, attachment and relationships, with attention to the whole person and their context.",
    signals: ["Safety", "Repair", "Connection"],
    gradient:
      "radial-gradient(circle at 72% 25%, rgba(229,39,154,0.22), transparent 33%), radial-gradient(circle at 30% 72%, rgba(156,120,213,0.34), transparent 40%), linear-gradient(145deg, #FDFCFA 0%, rgba(229,39,154,0.06) 100%)",
  },
  {
    to: "/cross-culture",
    number: "03",
    title: "Cross-Culture",
    line: "Thrive Across Borders.",
    body: "Support for migrants, expatriates, returning nationals, mobile families and global teams navigating identity, belonging and cultural transition.",
    signals: ["Identity", "Belonging", "Bridge"],
    gradient:
      "radial-gradient(circle at 20% 68%, rgba(0,206,229,0.34), transparent 35%), radial-gradient(circle at 78% 30%, rgba(174,181,232,0.42), transparent 38%), linear-gradient(135deg, #FDFCFA 0%, rgba(117,232,213,0.09) 100%)",
  },
  {
    to: "/core",
    number: "04",
    title: "CORE™",
    line: "Transform Organisations Consciously.",
    body: "Organisational care, leadership and people advisory bringing wellbeing, culture and responsible performance into the same conversation.",
    signals: ["Culture", "Leadership", "Systems"],
    gradient:
      "radial-gradient(circle at 70% 24%, rgba(165,25,155,0.22), transparent 34%), radial-gradient(circle at 28% 72%, rgba(117,232,213,0.26), transparent 38%), linear-gradient(135deg, #FDFCFA 0%, rgba(16,8,80,0.08) 100%)",
  },
] as const;

function WorksPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Works"
        title="Four pathways. One integral direction."
        lead="Each pathway stands on its own, and each is guided by the same intention: understanding people in context and supporting responsible, sustainable transformation."
      />

      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          {PILLARS.map((p) => (
            <article
              key={p.to}
              className="group overflow-hidden rounded-[2rem] border border-border/60 bg-card"
            >
              <div
                className="relative min-h-64 overflow-hidden border-b border-border/50 p-8 sm:p-10"
                style={{ backgroundImage: p.gradient }}
                aria-hidden
              >
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-ink/10" />
                <div className="absolute right-8 top-8 h-20 w-20 rounded-full border border-ink/10" />
                <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-primary/20" />

                <div className="relative flex min-h-48 flex-col justify-between">
                  <span className="font-serif text-5xl text-ink/18">{p.number}</span>
                  <div className="flex flex-wrap gap-2">
                    {p.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-ink/10 bg-background/65 px-4 py-2 text-[0.64rem] uppercase tracking-[0.18em] text-ink/70 backdrop-blur-sm"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <h2 className="font-serif text-3xl text-ink sm:text-4xl">{p.title}</h2>
                <p className="mt-4 font-serif text-xl italic text-ink/65 sm:text-2xl">
                  {p.line}
                </p>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <Link
                  to={p.to}
                  className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-primary"
                >
                  Learn more <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

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
