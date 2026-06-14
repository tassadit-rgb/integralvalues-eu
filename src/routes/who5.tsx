import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/who5")({
  head: () => ({
    meta: [
      { title: "WHO-5 Well-Being Index — Mental Health Check-in" },
      {
        name: "description",
        content:
          "Take the WHO-5 Well-Being Index, a 5-question check-in to reflect on how you've felt over the last two weeks.",
      },
      { property: "og:title", content: "WHO-5 Well-Being Index" },
      {
        property: "og:description",
        content: "A short, science-backed check-in on your well-being over the past two weeks.",
      },
    ],
  }),
  component: Who5Page,
});

const QUESTIONS = [
  "I have felt cheerful and in good spirits",
  "I have felt calm and relaxed",
  "I have felt active and vigorous",
  "I woke up feeling fresh and rested",
  "My daily life has been filled with things that interest me",
];

const SCALE = [
  { value: 5, label: "All of the time" },
  { value: 4, label: "Most of the time" },
  { value: 3, label: "More than half of the time" },
  { value: 2, label: "Less than half of the time" },
  { value: 1, label: "Some of the time" },
  { value: 0, label: "At no time" },
];

function interpret(score: number) {
  // WHO-5 raw 0-25; percentage = raw * 4 (0-100). <= 50 suggests low well-being; <= 28 screen for depression.
  const pct = score * 4;
  if (pct <= 28)
    return {
      pct,
      title: "Low well-being",
      body: "Your score suggests you may be going through a hard time. Consider reaching out to a therapist, coach, or trusted person. This is a screening tool, not a diagnosis.",
      tone: "from-fuchsia-500 to-violet-600",
    };
  if (pct <= 50)
    return {
      pct,
      title: "Reduced well-being",
      body: "Your well-being feels below your usual baseline. Small daily habits — sleep, movement, connection — can help. A check-in with a professional may also be valuable.",
      tone: "from-violet-500 to-purple-600",
    };
  if (pct <= 75)
    return {
      pct,
      title: "Good well-being",
      body: "You're doing okay. Keep noticing what supports you and lean into the routines that help you feel grounded.",
      tone: "from-cyan-400 to-violet-500",
    };
  return {
    pct,
    title: "Thriving",
    body: "You're feeling great right now. Notice what's working — sleep, people, purpose — so you can return to it later.",
    tone: "from-cyan-400 to-fuchsia-500",
  };
}

function Who5Page() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => answers.reduce<number>((s, v) => s + (v ?? 0), 0),
    [answers],
  );
  const complete = answers.every((a) => a !== null);
  const result = submitted ? interpret(score) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 text-white">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Check-in</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            WHO-5 Well-Being Index
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-violet-100/80">
            Please indicate, for each of the five statements, which is closest to how you have been
            feeling over the last two weeks.
          </p>
        </div>

        {!submitted && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (complete) setSubmitted(true);
            }}
            className="space-y-4"
          >
            {QUESTIONS.map((q, i) => (
              <Card
                key={i}
                className="border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium leading-snug">Over the last two weeks, {q.toLowerCase()}.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SCALE.map((opt) => {
                    const active = answers[i] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => {
                            const next = [...prev];
                            next[i] = opt.value;
                            return next;
                          })
                        }
                        className={[
                          "rounded-lg border px-3 py-2 text-left text-xs transition",
                          active
                            ? "border-transparent bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                            : "border-white/10 bg-white/5 text-violet-100/90 hover:border-white/20 hover:bg-white/10",
                        ].join(" ")}
                        aria-pressed={active}
                      >
                        <div className="font-semibold">{opt.value}</div>
                        <div className="leading-tight opacity-90">{opt.label}</div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            ))}

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-violet-200/70">
                {answers.filter((a) => a !== null).length} / 5 answered
              </p>
              <Button
                type="submit"
                disabled={!complete}
                className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white hover:opacity-95 disabled:opacity-40"
              >
                See my result
              </Button>
            </div>
          </form>
        )}

        {submitted && result && (
          <Card className="border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Your result</p>
            <div className="mt-4 flex items-end gap-3">
              <span
                className={`bg-gradient-to-r ${result.tone} bg-clip-text text-6xl font-semibold tracking-tight text-transparent`}
              >
                {result.pct}
              </span>
              <span className="pb-2 text-sm text-violet-200/80">/ 100</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full bg-gradient-to-r ${result.tone}`}
                style={{ width: `${result.pct}%` }}
              />
            </div>
            <h2 className="mt-6 text-xl font-semibold">{result.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/85">{result.body}</p>
            <p className="mt-4 text-xs text-violet-200/60">
              Raw score: {score} / 25. The WHO-5 is a screening tool, not a diagnosis. If you're in
              crisis, please contact local emergency services or a crisis line.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setAnswers(Array(5).fill(null));
                  setSubmitted(false);
                }}
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                Retake
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
