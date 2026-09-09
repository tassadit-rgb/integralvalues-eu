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
        content: "A short, validated check-in on mental well-being over the past two weeks.",
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
  const pct = score * 4;
  const belowCutoff = pct < 50;

  return {
    pct,
    title: belowCutoff ? "Further assessment may be useful" : "Well-being score",
    body: belowCutoff
      ? "The WHO-5 guidance notes that a percentage score below 50 (raw score below 13) has been suggested as a cut-off for poor mental well-being and as an indication for further assessment. This result is not a diagnosis."
      : "Your score is at or above the commonly suggested WHO-5 cut-off of 50. The score is a snapshot of mental well-being over the last two weeks, not a diagnosis or a guarantee that no difficulty is present.",
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">Psyché™ Lab · self-check</p>
          <h1 className="mt-2 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            WHO-5 Well-Being Index
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
              <Card key={i} className="border-border bg-card p-5 text-ink">
                <div className="mb-3 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium leading-snug">{q}</p>
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
                            ? "border-transparent bg-primary text-primary-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-gold hover:bg-accent",
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
              <p className="text-xs text-muted-foreground">
                {answers.filter((a) => a !== null).length} / 5 answered
              </p>
              <Button type="submit" disabled={!complete}>
                See my result
              </Button>
            </div>
          </form>
        )}

        {submitted && result && (
          <Card className="border-border bg-card p-6 text-ink">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">Your result</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-serif text-6xl text-ink">{result.pct}</span>
              <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-accent">
              <div className="h-full bg-primary" style={{ width: `${result.pct}%` }} />
            </div>
            <h2 className="mt-6 font-serif text-2xl text-ink">{result.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.body}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Raw score: {score} / 25. Percentage score: {result.pct} / 100. The WHO-5 measures mental well-being over the previous two weeks. If you are in immediate danger or crisis, contact your local emergency service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setAnswers(Array(5).fill(null));
                  setSubmitted(false);
                }}
                variant="outline"
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
