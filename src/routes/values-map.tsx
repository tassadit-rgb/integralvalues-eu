import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";
import {
  HOFSTEDE_LENSES,
  SCIENTIFIC_FOUNDATIONS_NOTE,
  VALUES_LEVELS,
  VALUES_RANKING_NOTE,
  ZONE_OF_BALANCE,
} from "@/lib/values-ranking";

export const Route = createFileRoute("/values-map")({
  head: () => ({
    meta: [
      { title: "Integral Values Cross-Cultural Map™ — Psyché™" },
      {
        name: "description",
        content:
          "A reflective Integral Values tool to rank Core, Anchor and Context values and explore them across cultural frames of reference.",
      },
      { property: "og:title", content: "Integral Values Cross-Cultural Map™" },
      {
        property: "og:description",
        content:
          "Map what you protect, what keeps you in relationship and what you can adapt across contexts.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ValuesMapPage,
});

const VALUE_POOL = [
  "Freedom",
  "Love",
  "Justice",
  "Dignity",
  "Integrity",
  "Security",
  "Family",
  "Truth",
  "Compassion",
  "Meaning",
  "Faith / Spirituality",
  "Autonomy",
  "Loyalty",
  "Belonging",
  "Respect",
  "Responsibility",
  "Solidarity",
  "Achievement",
  "Tradition",
  "Equality",
  "Trust",
  "Recognition",
  "Care",
  "Growth",
  "Authenticity",
  "Community",
  "Creativity",
  "Service",
] as const;

const CONTEXT_POOL = VALUES_LEVELS[2].values;
const FRAMES = [
  "Self",
  "Family of origin",
  "Culture of origin",
  "Host culture",
  "Professional environment",
  "Organisation",
  "Partner / family",
  "Community",
] as const;

const PORTER_ATTITUDES = [
  "Evaluation",
  "Interpretation",
  "Support",
  "Investigation",
  "Solution",
  "Understanding",
] as const;

type ValueName = (typeof VALUE_POOL)[number];
type ContextName = (typeof CONTEXT_POOL)[number];
type FrameName = (typeof FRAMES)[number];

const HOFSTEDE_MATCHES: Record<string, string[]> = {
  "Power Distance": ["Justice", "Equality", "Dignity", "Respect", "Hierarchy"],
  Individualism: ["Freedom", "Autonomy", "Family", "Loyalty", "Belonging", "Community"],
  Masculinity: ["Achievement", "Recognition", "Care", "Solidarity", "Competition"],
  "Uncertainty Avoidance": ["Security", "Trust", "Rules", "Flexibility", "Risk tolerance"],
  "Long-Term Orientation": ["Tradition", "Growth", "Responsibility", "Time orientation"],
  Indulgence: ["Freedom", "Authenticity", "Emotional expression", "Work-life balance"],
};

function toggleRanked<T extends string>(current: T[], value: T, max = 5) {
  if (current.includes(value)) return current.filter((item) => item !== value);
  if (current.length >= max) return current;
  return [...current, value];
}

function RankedPicker<T extends string>({
  title,
  intro,
  values,
  selected,
  onChange,
  accent,
}: {
  title: string;
  intro: string;
  values: readonly T[];
  selected: T[];
  onChange: (values: T[]) => void;
  accent: string;
}) {
  return (
    <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-ink">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {selected.length}/5 selected
        </span>
      </div>

      {selected.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selected.map((value, index) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange(selected.filter((item) => item !== value))}
              className="rounded-full border px-4 py-2 text-xs font-medium"
              style={{ borderColor: `${accent}55`, backgroundColor: `${accent}10`, color: accent }}
              aria-label={`Remove ${value}`}
            >
              {index + 1}. {value} ×
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2.5">
        {values.map((value) => {
          const active = selected.includes(value);
          const disabled = !active && selected.length >= 5;
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(toggleRanked(selected, value))}
              className="rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-35"
              style={
                active
                  ? { borderColor: accent, backgroundColor: accent, color: "white" }
                  : { borderColor: `${accent}35`, color: "inherit" }
              }
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ValuesMapPage() {
  const [core, setCore] = useState<ValueName[]>([]);
  const [anchor, setAnchor] = useState<ValueName[]>([]);
  const [context, setContext] = useState<ContextName[]>([]);
  const [frames, setFrames] = useState<FrameName[]>([]);
  const [showResults, setShowResults] = useState(false);

  const availableForAnchor = useMemo(
    () => VALUE_POOL.filter((value) => !core.includes(value)),
    [core],
  );

  const relevantHofstede = useMemo(() => {
    const selected = new Set<string>([...core, ...anchor, ...context]);
    const matched = HOFSTEDE_LENSES.filter((lens) =>
      (HOFSTEDE_MATCHES[lens.dimension] || []).some((value) => selected.has(value)),
    );
    return matched.length ? matched : HOFSTEDE_LENSES.slice(0, 3);
  }, [core, anchor, context]);

  const ready = core.length === 5 && anchor.length === 5 && context.length === 5 && frames.length === 2;

  const reset = () => {
    setCore([]);
    setAnchor([]);
    setContext([]);
    setFrames([]);
    setShowResults(false);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Psyché™ · Values Ranking"
        title="Integral Values Cross-Cultural Map™"
        lead="Map what you protect, what keeps you in relationship and what you can adapt — then read those priorities across two frames of reference."
        quote="A reflective prototype for self-understanding and intercultural dialogue."
      />

      <Section eyebrow="01 · Protect" title="Choose your Core Values">
        <RankedPicker
          title="Core Values"
          intro="Choose five values that feel most identity-defining and least negotiable right now. Your order of selection becomes your ranking."
          values={VALUE_POOL}
          selected={core}
          onChange={(next) => {
            setCore(next);
            setAnchor((current) => current.filter((value) => !next.includes(value)));
            setShowResults(false);
          }}
          accent="#E5279A"
        />
      </Section>

      <Section muted eyebrow="02 · Relate" title="Choose your Anchor Values">
        <RankedPicker
          title="Anchor Values"
          intro="Choose five values that help you build trust, belonging, responsibility and workable relationships. A value can be central here even if another person would place it in Core."
          values={availableForAnchor}
          selected={anchor}
          onChange={(next) => {
            setAnchor(next);
            setShowResults(false);
          }}
          accent="#9C78D5"
        />
      </Section>

      <Section eyebrow="03 · Adapt" title="Choose your Context Values">
        <RankedPicker
          title="Context Values"
          intro="Choose five contextual preferences that most shape how you behave in families, cultures or organisations. These are the elements most available for conscious adaptation."
          values={CONTEXT_POOL}
          selected={context}
          onChange={(next) => {
            setContext(next);
            setShowResults(false);
          }}
          accent="#00AFC4"
        />
      </Section>

      <Section muted eyebrow="04 · Compare" title="Choose two frames of reference">
        <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Select the two contexts you want to place in dialogue. We compare frames; we do not rank cultures or infer personality from nationality.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {FRAMES.map((frame) => {
              const active = frames.includes(frame);
              const disabled = !active && frames.length >= 2;
              return (
                <button
                  key={frame}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setFrames(toggleRanked(frames, frame, 2));
                    setShowResults(false);
                  }}
                  className="rounded-full border px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-35"
                  style={
                    active
                      ? { borderColor: "#100850", backgroundColor: "#100850", color: "white" }
                      : { borderColor: "rgba(16,8,80,0.2)" }
                  }
                >
                  {frame}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!ready}
            onClick={() => setShowResults(true)}
            className="rounded-full bg-[#100850] px-7 py-3 text-xs uppercase tracking-[0.18em] text-white transition disabled:cursor-not-allowed disabled:opacity-35"
          >
            Generate my map
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border px-7 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            Reset
          </button>
          {!ready && (
            <p className="self-center text-xs text-muted-foreground">
              Select 5 Core, 5 Anchor, 5 Context values and 2 frames to generate the map.
            </p>
          )}
        </div>
      </Section>

      {showResults && ready && (
        <Section eyebrow="Your map" title="Protect · Relate · Adapt">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[1.7rem] border border-[#E5279A]/25 bg-[#E5279A]/[0.045] p-6">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#E5279A]">Protect · Core</p>
              <ol className="mt-5 space-y-2 font-serif text-xl text-ink">
                {core.map((value, index) => <li key={value}>{index + 1}. {value}</li>)}
              </ol>
            </div>
            <div className="rounded-[1.7rem] border border-[#9C78D5]/30 bg-[#9C78D5]/[0.055] p-6">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#A5199B]">Relate · Anchor</p>
              <ol className="mt-5 space-y-2 font-serif text-xl text-ink">
                {anchor.map((value, index) => <li key={value}>{index + 1}. {value}</li>)}
              </ol>
            </div>
            <div className="rounded-[1.7rem] border border-[#00CEE5]/30 bg-[#75E8D5]/[0.08] p-6">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#008FA0]">Adapt · Context</p>
              <ol className="mt-5 space-y-2 font-serif text-xl text-ink">
                {context.map((value, index) => <li key={value}>{index + 1}. {value}</li>)}
              </ol>
            </div>
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-[#75E8D5]/45 bg-[#75E8D5]/10 p-7 sm:p-9">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#008FA0]">{ZONE_OF_BALANCE.title}</p>
            <h3 className="mt-4 font-serif text-3xl text-ink">{frames[0]} ↔ {frames[1]}</h3>
            <p className="mt-4 max-w-3xl font-serif text-2xl italic leading-snug text-ink/80">
              {ZONE_OF_BALANCE.principle}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Protect <strong className="font-medium text-ink">{core[0]} and {core[1]}</strong>. Build the relationship through <strong className="font-medium text-ink">{anchor[0]} and {anchor[1]}</strong>. Keep <strong className="font-medium text-ink">{context[0]}</strong> available for conscious adaptation when the two frames do not read the situation in the same way.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.7rem] border border-border bg-card p-7">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#A5199B]">Hofstede-informed questions</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                These are contextual prompts, not country scores or individual labels.
              </p>
              <div className="mt-5 space-y-4">
                {relevantHofstede.map((lens) => (
                  <div key={lens.dimension} className="border-l-2 border-[#9C78D5]/35 pl-4">
                    <p className="text-sm font-medium text-ink">{lens.dimension}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{lens.tension}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-border bg-card p-7">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#A5199B]">Porter-informed communication check</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                When tension appears, notice the stance you are taking before trying to solve the difference.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {PORTER_ATTITUDES.map((attitude) => (
                  <span key={attitude} className="rounded-full border border-border bg-background px-3 py-2 text-xs text-ink/75">
                    {attitude}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A useful question for the Zone of Balance: <em>Which value am I protecting, and which value might the other frame be protecting?</em>
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.7rem] border border-[#100850]/12 bg-[#100850]/[0.025] p-7 sm:p-8">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#100850]">AQAL · Integral reading</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["I · Interior", "Meaning, identity and the values you experience from within."],
                ["It · Behaviour", "Choices, boundaries and communication that make values visible."],
                ["We · Culture", "Belonging, relationships, shared meanings and inherited narratives."],
                ["Its · Systems", "Roles, institutions, rules and organisational structures around the situation."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[1.2rem] border border-border bg-card p-5">
                  <p className="font-serif text-xl text-ink">{title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-[#100850] px-7 py-3 text-xs uppercase tracking-[0.18em] text-white"
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={() => setShowResults(false)}
              className="rounded-full border border-border px-7 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              Edit my map
            </button>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground">{VALUES_RANKING_NOTE}</p>
            <p className="mt-2 max-w-4xl text-xs leading-relaxed text-muted-foreground">{SCIENTIFIC_FOUNDATIONS_NOTE}</p>
          </div>
        </Section>
      )}
    </SiteLayout>
  );
}
