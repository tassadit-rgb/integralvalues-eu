import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Mental health, therapy & coaching companion" },
      {
        name: "description",
        content:
          "Track your mood, journal, and connect with therapists, coaches and legal counselors. Start with a WHO-5 well-being check-in.",
      },
      { property: "og:title", content: "Lumen — Mental health companion" },
      {
        property: "og:description",
        content: "Mood tracking, journaling, and access to therapy, coaching and legal counseling.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 text-white">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Lumen</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          A calm place to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            check in
          </span>{" "}
          with yourself.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-violet-100/80">
          Track your mood, journal, and reach out to therapists, coaches and legal counselors —
          start with a quick, science-backed well-being check-in.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/who5"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-95"
          >
            Take the WHO-5 check-in
          </Link>
        </div>
      </div>
    </div>
  );
}
