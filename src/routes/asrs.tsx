import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/asrs")({
  head: () => ({
    meta: [
      { title: "ASRS-v1.1 — Grille d'autoévaluation TDAH adulte | Psyché Lab" },
      {
        name: "description",
        content:
          "Grille d'autoévaluation des symptômes du TDAH chez l'adulte (ASRS-v1.1) : 18 questions, résultat de dépistage de la partie A, à discuter avec un professionnel qualifié.",
      },
      { property: "og:title", content: "ASRS-v1.1 — autoévaluation TDAH adulte" },
      {
        property: "og:description",
        content:
          "18 questions pour repérer des symptômes compatibles avec un TDAH chez l'adulte. Repérage, jamais un diagnostic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AsrsPage,
});

const SCALE = [
  { value: 0, label: "Jamais" },
  { value: 1, label: "Rarement" },
  { value: 2, label: "Parfois" },
  { value: 3, label: "Souvent" },
  { value: 4, label: "Très souvent" },
] as const;

const PART_A: { q: string; threshold: number }[] = [
  {
    q: "À quelle fréquence avez-vous des difficultés à finaliser les derniers détails d'un projet une fois que le plus intéressant a été fait ?",
    threshold: 2,
  },
  {
    q: "À quelle fréquence avez-vous des difficultés à mettre les choses en ordre lorsque vous devez faire un travail qui demande une certaine organisation ?",
    threshold: 2,
  },
  {
    q: "À quelle fréquence avez-vous des difficultés pour vous souvenir de vos rendez-vous ou de vos engagements ?",
    threshold: 2,
  },
  {
    q: "À quelle fréquence avez-vous tendance à éviter ou à remettre à plus tard un travail qui demande beaucoup de réflexion ?",
    threshold: 3,
  },
  {
    q: "À quelle fréquence avez-vous la bougeotte ou agitez-vous vos mains ou vos pieds lorsque vous devez rester assis pendant un long moment ?",
    threshold: 3,
  },
  {
    q: "À quelle fréquence vous sentez-vous trop actif ou obligé de faire des choses, comme si vous étiez actionné par un moteur ?",
    threshold: 3,
  },
];

const PART_B: string[] = [
  "À quelle fréquence faites-vous des erreurs d'étourderie lorsque vous travaillez sur un projet ennuyeux ou difficile ?",
  "À quelle fréquence avez-vous des difficultés à rester attentif lorsque vous faites un travail ennuyeux ou répétitif ?",
  "À quelle fréquence avez-vous des difficultés à vous concentrer sur ce que les gens vous disent, même lorsqu'ils vous parlent directement ?",
  "À quelle fréquence avez-vous tendance à égarer ou du mal à retrouver des choses à la maison ou au travail ?",
  "À quelle fréquence êtes-vous distrait par de l'activité ou du bruit autour de vous ?",
  "À quelle fréquence vous levez-vous pendant des réunions ou d'autres situations dans lesquelles vous êtes censé rester assis ?",
  "À quelle fréquence avez-vous la bougeotte ou vous sentez-vous agité ?",
  "À quelle fréquence avez-vous des difficultés à vous détendre et à vous relaxer pendant votre temps libre ?",
  "À quelle fréquence avez-vous remarqué que vous étiez trop bavard lorsque vous étiez en compagnie d'autres personnes ?",
  "À quelle fréquence vous surprenez-vous terminant les phrases des autres dans une discussion avant qu'ils aient pu le faire eux-mêmes ?",
  "À quelle fréquence avez-vous des difficultés à attendre votre tour dans une file d'attente ?",
  "À quelle fréquence interrompez-vous les autres lorsqu'ils sont occupés ?",
];

const TOTAL = PART_A.length + PART_B.length;

function QuestionCard({
  index,
  label,
  value,
  onChange,
}: {
  index: number;
  label: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <Card className="border-border bg-card p-5 text-ink">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {index}
        </span>
        <p className="text-sm font-medium leading-snug">{label}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {SCALE.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={[
                "rounded-lg border px-3 py-2 text-left text-xs transition",
                active
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-gold hover:bg-accent",
              ].join(" ")}
            >
              <div className="font-semibold">{opt.value}</div>
              <div className="leading-tight opacity-90">{opt.label}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function AsrsPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const set = (i: number, v: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });

  const answered = answers.filter((a) => a !== null).length;
  const complete = answered === TOTAL;

  const result = useMemo(() => {
    const flagsA = PART_A.reduce(
      (n, item, i) => n + ((answers[i] ?? -1) >= item.threshold ? 1 : 0),
      0,
    );
    return { flagsA, positive: flagsA >= 4 };
  }, [answers]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
          Psyché™ Lab · autoévaluation
        </p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Échelle d'autoévaluation du TDAH chez l'adulte (ASRS-v1.1)
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Répondez en pensant à votre fonctionnement <strong>au cours des six derniers mois</strong>.
          Les six premières questions constituent la partie de dépistage ; les douze suivantes
          complètent l'observation clinique. Cette autoévaluation ne pose pas de diagnostic.
        </p>

        {!submitted && (
          <form
            className="mt-10 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (complete) setSubmitted(true);
            }}
          >
            <section className="space-y-4">
              <h2 className="eyebrow">Partie A — dépistage</h2>
              {PART_A.map((item, i) => (
                <QuestionCard
                  key={i}
                  index={i + 1}
                  label={item.q}
                  value={answers[i]}
                  onChange={(v) => set(i, v)}
                />
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="eyebrow">Partie B — symptômes associés</h2>
              {PART_B.map((q, i) => (
                <QuestionCard
                  key={i}
                  index={PART_A.length + i + 1}
                  label={q}
                  value={answers[PART_A.length + i]}
                  onChange={(v) => set(PART_A.length + i, v)}
                />
              ))}
            </section>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                {answered} / {TOTAL} questions répondues
              </p>
              <Button type="submit" disabled={!complete} size="lg">
                Voir mon résultat
              </Button>
            </div>
          </form>
        )}

        {submitted && (
          <Card className="mt-10 border-border bg-card p-6 text-ink">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
              Résultat de dépistage — Partie A
            </p>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-serif text-6xl text-ink">{result.flagsA}</span>
              <span className="pb-2 text-sm text-muted-foreground">/ 6 réponses dans la zone de dépistage</span>
            </div>

            <h2 className="mt-6 font-serif text-2xl text-ink">
              {result.positive ? "Seuil de dépistage atteint" : "Seuil de dépistage non atteint"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {result.positive
                ? "Quatre réponses ou plus dans la zone de dépistage de la partie A justifient d'envisager une évaluation clinique plus complète. Le résultat ne permet pas, à lui seul, de conclure à un TDAH."
                : "Le seuil de dépistage de la partie A n'est pas atteint. Cela n'exclut pas un TDAH ni une autre difficulté attentionnelle ; l'histoire développementale, le retentissement quotidien et le contexte restent essentiels."}
            </p>

            <div className="mt-6 border-l border-gold pl-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Partie B</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Les réponses de la partie B apportent un contexte clinique complémentaire. Aucun score total diagnostique n'est affiché ici afin d'éviter une interprétation excessive de l'outil.
              </p>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              L'ASRS-v1.1 est un outil de repérage. Un diagnostic de TDAH nécessite une évaluation clinique qualifiée, incluant notamment l'histoire développementale, le retentissement fonctionnel et les diagnostics différentiels.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setAnswers(Array(TOTAL).fill(null));
                  setSubmitted(false);
                }}
              >
                Refaire le test
              </Button>
              <Button asChild>
                <Link to="/contact">En parler avec un professionnel</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
