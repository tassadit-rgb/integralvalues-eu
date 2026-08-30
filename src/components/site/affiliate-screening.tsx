import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type ScreeningAnswers = Record<string, string>;
export type ScreeningOutcome = "eligible" | "conditional" | "not_eligible";

type Option = { value: string; label: string; weight: 2 | 1 | 0 };

type Question = {
  id: string;
  question: string;
  help?: string;
  options: Option[];
};

export const SCREENING_QUESTIONS: Question[] = [
  {
    id: "qualification",
    question: "What is your current professional qualification?",
    help: "Clinical psychologist, psychotherapist, certified coach (ICF or equivalent), supervisor or intercultural specialist.",
    options: [
      { value: "licensed", label: "Licensed / certified and practising", weight: 2 },
      { value: "in_certification", label: "Currently completing certification", weight: 1 },
      { value: "none", label: "No recognised qualification yet", weight: 0 },
    ],
  },
  {
    id: "experience",
    question: "How many years of independent practice do you have?",
    options: [
      { value: "3_plus", label: "Three years or more", weight: 2 },
      { value: "1_3", label: "Between one and three years", weight: 1 },
      { value: "under_1", label: "Less than one year", weight: 0 },
    ],
  },
  {
    id: "insurance",
    question: "Do you hold professional liability insurance?",
    options: [
      { value: "yes", label: "Yes, currently active", weight: 2 },
      { value: "pending", label: "In progress / renewing", weight: 1 },
      { value: "no", label: "No", weight: 0 },
    ],
  },
  {
    id: "supervision",
    question:
      "Can you commit to the supervision cycle — at least one session per month over six to nine months?",
    options: [
      { value: "yes", label: "Yes, I can hold that rhythm", weight: 2 },
      { value: "unsure", label: "I would need to discuss the pace", weight: 1 },
      { value: "no", label: "No", weight: 0 },
    ],
  },
  {
    id: "solidarity",
    question:
      "Do you accept the solidarity clause — an indicative 5 to 10 % of your declared annual time?",
    help: "Spread across supervision, transmission and supervised solidarity sessions. It never reduces your standard remuneration.",
    options: [
      { value: "yes", label: "Yes, I accept the commitment", weight: 2 },
      { value: "discuss", label: "I would like to discuss the scope", weight: 1 },
      { value: "no", label: "No", weight: 0 },
    ],
  },
  {
    id: "ethics",
    question:
      "Do you agree to practise under the integrative charter of ethics, confidentiality and quality?",
    help: "The charter frames ethics and standards — never your therapeutic or coaching method.",
    options: [
      { value: "yes", label: "Yes, I agree", weight: 2 },
      { value: "read_first", label: "I would like to read it in full first", weight: 1 },
      { value: "no", label: "No", weight: 0 },
    ],
  },
];

export function scoreScreening(answers: ScreeningAnswers): {
  outcome: ScreeningOutcome;
  score: number;
  max: number;
} {
  let score = 0;
  let blocking = false;
  for (const q of SCREENING_QUESTIONS) {
    const chosen = q.options.find((o) => o.value === answers[q.id]);
    if (!chosen) continue;
    score += chosen.weight;
    if (chosen.weight === 0) blocking = true;
  }
  const max = SCREENING_QUESTIONS.length * 2;
  const outcome: ScreeningOutcome = blocking
    ? "not_eligible"
    : score === max
      ? "eligible"
      : "conditional";
  return { outcome, score, max };
}

export function AffiliateScreening({
  onComplete,
}: {
  onComplete: (answers: ScreeningAnswers, outcome: ScreeningOutcome) => void;
}) {
  const [answers, setAnswers] = useState<ScreeningAnswers>({});
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<ScreeningOutcome | null>(null);

  const complete = SCREENING_QUESTIONS.every((q) => answers[q.id]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setResult(scoreScreening(answers).outcome);
  }

  if (result === "not_eligible") {
    return (
      <div className="border border-border bg-card p-8">
        <h3 className="font-serif text-2xl text-ink">
          Affiliation is not open to you yet.
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Based on your answers, one or more core conditions — recognised
          qualification, independent practice, insurance, supervision rhythm,
          solidarity clause or the ethics charter — are not met at this stage.
          You are welcome to begin with the supervision path and apply for
          affiliation once those conditions are in place.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setResult(null)}>
          Review my answers
        </Button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="border border-border bg-card p-8">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Screening complete
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink">
          {result === "eligible"
            ? "You meet the affiliation criteria."
            : "You may apply — a few points need discussion."}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {result === "eligible"
            ? "You can now complete the application form. Your screening answers are attached to your file."
            : "Your profile qualifies for review. We will address the points you flagged during the intake interview."}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={() => onComplete(answers, result)}>
            Continue to the application
          </Button>
          <Button variant="outline" onClick={() => setResult(null)}>
            Review my answers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Before registering, please answer six short screening questions. They
        take about two minutes and confirm that affiliation is the right path
        for you.
      </p>

      {SCREENING_QUESTIONS.map((q, i) => (
        <fieldset key={q.id} className="border-t border-border pt-6">
          <legend className="sr-only">{q.question}</legend>
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Question {i + 1} of {SCREENING_QUESTIONS.length}
          </p>
          <p className="mt-2 font-serif text-lg text-ink">{q.question}</p>
          {q.help && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {q.help}
            </p>
          )}
          <RadioGroup
            className="mt-4 space-y-3"
            value={answers[q.id] ?? ""}
            onValueChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
          >
            {q.options.map((o) => (
              <div key={o.value} className="flex items-center gap-3">
                <RadioGroupItem id={`${q.id}-${o.value}`} value={o.value} />
                <Label
                  htmlFor={`${q.id}-${o.value}`}
                  className="text-sm font-normal text-muted-foreground"
                >
                  {o.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      ))}

      {showError && (
        <p className="text-xs text-primary">
          Please answer every question before continuing.
        </p>
      )}

      <Button type="submit" size="lg">
        See my screening result
      </Button>
    </form>
  );
}
