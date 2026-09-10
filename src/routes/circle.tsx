import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Heart, Leaf, Sparkles, UsersRound, Globe2 } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "Integral Circle™ — Belong, Connect & Contribute" },
      {
        name: "description",
        content:
          "Integral Circle™ is the community dimension of Integral Values: guided spaces for reflection, belonging, relationships and conscious contribution.",
      },
      { property: "og:title", content: "Integral Circle™ — Integral Values" },
      {
        property: "og:description",
        content:
          "From self-awareness to belonging. From belonging to contribution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntegralCirclePage,
});

const CIRCLES = [
  {
    title: "Inner Circle",
    eyebrow: "Self & Growth",
    body: "Guided reflection, values work, life transitions, self-awareness and integration — in a small, held space where depth can unfold without pressure.",
    accent: "#9C78D5",
    tint: "rgba(156,120,213,0.10)",
    border: "rgba(156,120,213,0.32)",
    icon: Leaf,
  },
  {
    title: "Connection Circle",
    eyebrow: "Relationships & Belonging",
    body: "Shared spaces for dialogue around relationships, couple and family life, migration, identity, community and the experience of belonging across several worlds.",
    accent: "#E5279A",
    tint: "rgba(229,39,154,0.08)",
    border: "rgba(229,39,154,0.28)",
    icon: UsersRound,
  },
  {
    title: "Impact Circle",
    eyebrow: "Conscious Contribution",
    body: "Leadership, mentoring, collective projects, transmission and meaningful contribution — turning personal growth into responsible action in the wider world.",
    accent: "#008FA0",
    tint: "rgba(117,232,213,0.13)",
    border: "rgba(0,206,229,0.30)",
    icon: Globe2,
  },
] as const;

const DIMENSIONS = [
  {
    title: "Body",
    words: "Vitality · Presence · Balance",
    icon: Leaf,
    accent: "#008F83",
    tint: "rgba(117,232,213,0.16)",
  },
  {
    title: "Brain",
    words: "Clarity · Learning · Perspective",
    icon: Brain,
    accent: "#6F4FA8",
    tint: "rgba(156,120,213,0.15)",
  },
  {
    title: "Emotion",
    words: "Awareness · Compassion · Resilience",
    icon: Heart,
    accent: "#B32E64",
    tint: "rgba(229,39,154,0.11)",
  },
  {
    title: "Consciousness",
    words: "Meaning · Connection · A larger view",
    icon: Sparkles,
    accent: "#355D9B",
    tint: "rgba(174,181,232,0.18)",
  },
] as const;

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full border border-[#9C78D5]/30" />
      <div className="absolute inset-[16%] rounded-full border border-[#E5279A]/20" />
      <div className="absolute inset-[24%] rounded-full border border-[#00CEE5]/25" />

      <div className="absolute left-[7%] top-[47%] h-3 w-3 rounded-full bg-[#00AFC4] shadow-[0_0_0_7px_rgba(0,206,229,0.10)]" />
      <div className="absolute right-[13%] top-[21%] h-3 w-3 rounded-full bg-[#E5279A]/70 shadow-[0_0_0_7px_rgba(229,39,154,0.08)]" />
      <div className="absolute right-[21%] bottom-[16%] h-2.5 w-2.5 rounded-full bg-[#9C78D5] shadow-[0_0_0_7px_rgba(156,120,213,0.09)]" />

      <div className="absolute inset-[20%] overflow-hidden rounded-full border border-white/70 bg-[radial-gradient(circle_at_67%_25%,rgba(255,255,255,0.95),rgba(255,255,255,0)_18%),linear-gradient(180deg,#dfe6f3_0%,#d8bfd1_30%,#8bbac0_54%,#395d78_55%,#8db5bb_67%,#e8d9d1_100%)] shadow-[0_28px_70px_rgba(16,8,80,0.14)]">
        <div className="absolute inset-x-[-8%] bottom-[26%] h-[38%] rounded-[50%] bg-[#314b58]/35 blur-[1px]" />
        <div className="absolute -left-[12%] bottom-[32%] h-[35%] w-[65%] rotate-[8deg] rounded-[50%] bg-[#415e65]/55" />
        <div className="absolute -right-[15%] bottom-[34%] h-[33%] w-[67%] -rotate-[7deg] rounded-[50%] bg-[#526d72]/42" />
        <div className="absolute inset-x-0 bottom-[12%] h-[26%] bg-gradient-to-b from-[#b9d7dc]/75 to-[#f6ebe5]/80" />
      </div>

      <div className="absolute inset-[5%] rounded-full bg-[#AEB5E8]/[0.055] blur-2xl" />
    </div>
  );
}

function IntegralCirclePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-[#FDFCFA]">
        <div className="pointer-events-none absolute -left-40 top-4 h-[30rem] w-[30rem] rounded-full bg-[#E5279A]/[0.055] blur-3xl" />
        <div className="pointer-events-none absolute -right-36 -top-20 h-[34rem] w-[34rem] rounded-full bg-[#AEB5E8]/[0.12] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[38%] h-64 w-80 rounded-full bg-[#75E8D5]/[0.08] blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-28">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.30em] text-[#68769A]">
              People · Purpose · A More Human Tomorrow
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] text-[#100850] sm:text-6xl lg:text-7xl">
              Integral Circle™
            </h1>
            <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-[#6F4FA8] sm:text-3xl">
              A space to belong, reflect, connect and grow.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              From self-awareness to belonging. From belonging to contribution.
            </p>
            <p className="mt-7 text-[0.65rem] uppercase tracking-[0.27em] text-[#68769A]">
              Reflect · Connect · Grow · Belong · Contribute
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center rounded-full bg-[#100850] px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            >
              Join the Circle →
            </Link>
          </div>

          <div className="relative">
            <OrbitVisual />
            <p className="mx-auto mt-1 max-w-xs text-center font-serif text-xl italic leading-snug text-[#8A67C5]">
              A kinder, wiser, brighter together.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FDFCFA] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">Three circles · One human movement</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#100850] sm:text-5xl">
              From the inner world to the wider world
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {CIRCLES.map((circle) => {
              const Icon = circle.icon;
              return (
                <article key={circle.title} className="group relative mx-auto aspect-square w-full max-w-[22rem]">
                  <div className="absolute inset-0 rounded-full border" style={{ borderColor: circle.border }} />
                  <div className="absolute inset-[5%] rounded-full border opacity-60" style={{ borderColor: circle.border }} />
                  <div
                    className="absolute inset-[9%] flex flex-col items-center justify-center rounded-full px-8 text-center shadow-[0_18px_55px_rgba(16,8,80,0.06)] transition duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: circle.tint, border: `1px solid ${circle.border}` }}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80"
                      style={{ color: circle.accent, border: `1px solid ${circle.border}` }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-5 font-serif text-3xl text-[#100850]">{circle.title}</h3>
                    <p className="mt-2 text-[0.62rem] uppercase tracking-[0.24em]" style={{ color: circle.accent }}>
                      {circle.eyebrow}
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{circle.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/60 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#AEB5E8]" />
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">A whole human approach</p>
            <span className="h-px w-16 bg-[#AEB5E8]" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DIMENSIONS.map((dimension) => {
              const Icon = dimension.icon;
              return (
                <div key={dimension.title} className="flex items-start gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: dimension.tint, color: dimension.accent }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.45} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#100850]">{dimension.title}</h3>
                    <p className="mt-2 text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                      {dimension.words}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FDFCFA] py-24 sm:py-28">
        <div className="pointer-events-none absolute -left-32 bottom-[-10rem] h-80 w-[34rem] rounded-[50%] bg-[#AEB5E8]/[0.16] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-[-10rem] h-80 w-[34rem] rounded-[50%] bg-[#E5279A]/[0.07] blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-serif text-3xl leading-snug text-[#100850] sm:text-4xl">
            Be part of a more conscious, connected and compassionate world.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Integral Circle™ is not a social network and it is not automatically group therapy. It is a guided community space, with different levels of openness and professional facilitation where appropriate.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-flex items-center rounded-full bg-[#6F3C8D] px-8 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
          >
            Join the Circle →
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Register your interest for upcoming circles and guided experiences.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
