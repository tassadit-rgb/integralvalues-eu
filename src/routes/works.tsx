import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, BookButton } from "@/components/site/site-layout";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Psyché™, Care, Coaching, Cross-Culture, CORE™" },
      {
        name: "description",
        content:
          "The Integral Values trajectory: Psyché™, Care & Therapy, Coaching, Cross-Culture and CORE™ — five connected stages from insight to conscious systems.",
      },
      { property: "og:title", content: "Works — Integral Values" },
      {
        property: "og:description",
        content:
          "Five connected stages: discover yourself, heal deeply, unlock your potential, thrive together and lead or work consciously.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorksPage,
});

const PILLARS = [
  {
    to: "/psyche",
    number: "01",
    title: "Psyché™",
    line: "Discover Yourself.",
    kicker: "Self-understanding",
    body: "A first space for orientation: understand your patterns, strengths, needs and direction before choosing what comes next.",
    detail:
      "Psyché™ opens the Integral Values trajectory through reflection and assessment. The aim is not to reduce a person to a score, but to bring together what they experience, how they function and the context in which they live and work. When appropriate, structured or psychometric tools can support this exploration and help clarify priorities for the next stage.",
    typical: "Values clarification · self-awareness mapping · strengths · attention and wellbeing screening · orientation",
    image: "/works-psyche.png",
    accent: "#A5199B",
    soft: "rgba(156,120,213,0.14)",
    fallback:
      "linear-gradient(135deg, rgba(229,39,154,0.82), rgba(156,120,213,0.72) 42%, rgba(0,206,229,0.70) 100%)",
  },
  {
    to: "/counselling",
    number: "02",
    title: "Care & Therapy",
    line: "Heal Deeply.",
    kicker: "Healing & wellbeing",
    body: "A protected space for distress, trauma, attachment, relationships and the work of reconnecting with yourself and others.",
    detail:
      "Care & Therapy focuses on psychological suffering without separating it from personal history, relationships, culture and present circumstances. The work may explore emotional regulation, attachment, trauma-related difficulties, life transitions and relational patterns, at a pace adapted to the person and the situation.",
    typical: "Emotional regulation · trauma-informed work · attachment · relationships · life transitions · psychological support",
    image: "/works-care.png",
    accent: "#E5279A",
    soft: "rgba(229,39,154,0.13)",
    fallback:
      "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.88), transparent 16%), linear-gradient(145deg, #F7CADB 0%, #EAA7C6 48%, #FDFCFA 100%)",
  },
  {
    to: "/coaching",
    number: "03",
    title: "Coaching",
    line: "Unlock Your Potential.",
    kicker: "Growth & potential",
    body: "Turn insight into movement through clearer choices, intentional action and development aligned with who you are becoming.",
    detail:
      "Coaching translates awareness into action. It supports people navigating responsibility, leadership, career transitions, decision-making or personal development, while keeping performance connected to values, relationships, wellbeing and context rather than treating achievement as an isolated goal.",
    typical: "Goal clarification · leadership · career transition · decision-making · strengths · action planning",
    image: "/works-coaching.png",
    accent: "#00CEE5",
    soft: "rgba(117,232,213,0.16)",
    fallback:
      "radial-gradient(circle at 48% 44%, rgba(255,255,255,0.68), transparent 18%), linear-gradient(145deg, #75E8D5 0%, #00CEE5 56%, #D8FBF6 100%)",
  },
  {
    to: "/cross-culture",
    number: "04",
    title: "Cross-Culture",
    line: "Thrive Together.",
    kicker: "Connection & belonging",
    body: "Bridge identities, cultures and systems when belonging, mobility and difference become part of the psychological or professional landscape.",
    detail:
      "Cross-Culture addresses what changes when a life crosses borders, languages, institutions or cultural codes. It can support migrants, expatriates, returning nationals, mobile families and international teams around identity, belonging, adaptation, collective experience and the tensions that emerge between personal and cultural worlds.",
    typical: "Migration & identity · belonging · cultural transition · intercultural dialogue · mobile families · global teams",
    image: "/works-cross-culture.png",
    accent: "#9C78D5",
    soft: "rgba(156,120,213,0.16)",
    fallback:
      "radial-gradient(circle at 34% 30%, rgba(229,39,154,0.34), transparent 24%), linear-gradient(145deg, #A5199B 0%, #9C78D5 58%, #E5D8F7 100%)",
  },
  {
    to: "/core",
    number: "05",
    title: "CORE™",
    line: "Lead & Work Consciously.",
    kicker: "Integration & systems",
    body: "Extend individual insight into leadership, culture and organisational systems where wellbeing and responsibility must coexist with performance.",
    detail:
      "CORE™ is the organisational dimension of Integral Values. It brings together leadership, people advisory, workplace wellbeing and culture so that transformation is considered at both human and system levels. The focus is on healthier ways of working, clearer responsibility and sustainable organisational development.",
    typical: "Leadership · organisational culture · people advisory · workplace wellbeing · team dynamics · responsible performance",
    image: "/works-core.png",
    accent: "#100850",
    soft: "rgba(174,181,232,0.18)",
    fallback:
      "radial-gradient(circle at 50% 42%, rgba(0,206,229,0.28), transparent 16%), linear-gradient(145deg, #2D78C8 0%, #100850 70%, #091A4B 100%)",
  },
] as const;

type Pillar = (typeof PILLARS)[number];

function WorksPage() {
  const [selected, setSelected] = useState<Pillar | null>(null);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Works"
        title="Five stages. One integral trajectory."
        lead="Psyché™, Care, Coaching, Cross-Culture and CORE™ form one coherent trajectory — from self-understanding to care, growth, belonging and conscious systems. You can enter the pathway wherever your situation calls for it."
      />

      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Greater self-awareness</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#E5279A]/35 via-[#9C78D5]/35 to-[#00CEE5]/35" />
            <span>A more integral tomorrow</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {PILLARS.map((p) => (
              <button
                key={p.to}
                type="button"
                onClick={() => setSelected(p)}
                className="group overflow-hidden rounded-[1.5rem] border bg-card text-left shadow-[0_16px_40px_rgba(16,8,80,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(16,8,80,0.11)]"
                style={{ borderColor: `${p.accent}33` }}
                aria-label={`Open ${p.title} description`}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ background: p.fallback }}
                >
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
                  <span className="absolute left-5 top-4 font-serif text-2xl text-white drop-shadow-sm">
                    {p.number}
                  </span>
                </div>

                <div className="p-6">
                  <p
                    className="text-[0.61rem] uppercase tracking-[0.22em]"
                    style={{ color: p.accent }}
                  >
                    {p.kicker}
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl text-ink">{p.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{p.line}</p>
                    </div>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
                      style={{ backgroundColor: p.soft, color: p.accent }}
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-10">
        <p className="font-serif text-3xl text-ink">The trajectory is not a prescription.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          It is a way of seeing the whole. A person, family, team or organisation can begin at the stage that best matches the present need.
        </p>
        <BookButton className="mt-8" />
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#100850]/72 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} — ${selected.line}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelected(null);
          }}
        >
          <div className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/20 bg-[#FDFCFA] p-7 shadow-2xl sm:p-10 lg:p-12">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-muted-foreground transition hover:text-ink"
              aria-label="Close description"
            >
              ×
            </button>

            <div className="grid gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]"
                style={{ background: selected.fallback }}
              >
                <img
                  src={selected.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 max-w-[12rem] font-serif text-2xl italic leading-tight text-white">
                  {selected.line}
                </p>
              </div>

              <div>
                <p
                  className="text-[0.64rem] uppercase tracking-[0.24em]"
                  style={{ color: selected.accent }}
                >
                  Stage {selected.number} · {selected.kicker}
                </p>
                <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{selected.title}</h2>
                <p className="mt-2 font-serif text-xl italic text-ink/60">{selected.line}</p>
                <p className="mt-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {selected.body}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {selected.detail}
                </p>

                <div className="mt-7 border-t border-border pt-6">
                  <p
                    className="text-[0.62rem] uppercase tracking-[0.22em]"
                    style={{ color: selected.accent }}
                  >
                    Typical work includes
                  </p>
                  <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.13em] text-ink/70">
                    {selected.typical}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={selected.to}
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-white"
                    style={{ backgroundColor: selected.accent }}
                  >
                    View pathway
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-ink"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
