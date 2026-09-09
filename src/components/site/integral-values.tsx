import { useState } from "react";

const VALUES = [
  { letter: "I", name: "Inclusive", body: "We create belonging and make room for difference." },
  { letter: "N", name: "Nurturing", body: "We cultivate safety, care and human potential." },
  { letter: "T", name: "Thriving", body: "We support vitality, learning and sustainable flourishing." },
  {
    letter: "E",
    name: "Effectiveness",
    body: "We turn intention into purposeful, responsible action.",
  },
  { letter: "G", name: "Go-Getter", body: "We value initiative, perseverance and accountable momentum." },
  {
    letter: "R",
    name: "Resilience",
    body: "We strengthen the capacity to adapt, recover and continue with meaning.",
  },
  {
    letter: "A",
    name: "Assertiveness",
    body: "We encourage clear expression, healthy boundaries and mutual respect.",
  },
  {
    letter: "L",
    name: "Lively",
    body: "We bring curiosity, vitality and engaged presence to life and relationships.",
  },
] as const;

export function IntegralValues() {
  const [active, setActive] = useState(0);
  const current = VALUES[active]!;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {VALUES.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={v.name}
            className={`font-serif text-4xl transition-all duration-500 sm:text-6xl ${
              active === i
                ? "text-ink"
                : "text-ink/25 hover:text-ink/60"
            }`}
          >
            {v.letter}
          </button>
        ))}
      </div>

      <div className="mt-10 max-w-xl border-t border-border pt-8">
        <p className="eyebrow">{`0${active + 1}`.slice(-2)}</p>
        <h3 className="mt-3 font-serif text-3xl text-ink">{current.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {current.body}
        </p>
      </div>
    </div>
  );
}
