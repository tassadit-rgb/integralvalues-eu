import { useState } from "react";

const DIMENSIONS = [
  {
    key: "Body",
    words: "Vitality • Presence • Embodiment",
    body: "The body holds what words have not yet reached. We listen to breath, tension, sleep and energy as reliable information about your life.",
    color: "var(--cyan)",
    pos: "left-1/2 top-0 -translate-x-1/2",
  },
  {
    key: "Brain",
    words: "Clarity • Knowledge • Intelligence",
    body: "Thought, attention and meaning-making. We work with beliefs, patterns and decision-making so clarity becomes a stable resource.",
    color: "var(--purple)",
    pos: "right-0 top-1/2 -translate-y-1/2",
  },
  {
    key: "Emotion",
    words: "Feeling • Relationships • Connection",
    body: "Emotion is a compass, not an obstacle. We restore the capacity to feel, to bond, and to remain yourself inside relationships.",
    color: "var(--pink)",
    pos: "bottom-0 left-1/2 -translate-x-1/2",
  },
  {
    key: "Consciousness",
    words: "Purpose • Values • Meaning",
    body: "The integrating dimension: what you serve, what you stand for, and how you choose to lead your life once you can see it whole.",
    color: "var(--navy)",
    pos: "left-0 top-1/2 -translate-y-1/2",
  },
] as const;

export function FourCFramework() {
  const [active, setActive] = useState(0);
  const current = DIMENSIONS[active]!;

  return (
    <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div aria-hidden className="halo absolute inset-6" />
        <div
          aria-hidden
          className="absolute inset-10 rounded-full border border-border"
        />
        <div
          aria-hidden
          className="absolute inset-24 rounded-full border border-border/60"
        />
        {DIMENSIONS.map((d, i) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`absolute ${d.pos} flex h-24 w-24 flex-col items-center justify-center rounded-full border bg-background/90 text-center transition-all duration-500 sm:h-28 sm:w-28 ${
              active === i
                ? "border-transparent shadow-[0_16px_40px_-20px_rgba(11,16,58,0.45)]"
                : "border-border hover:border-transparent"
            }`}
            style={active === i ? { boxShadow: `0 0 0 1.5px ${d.color}` } : undefined}
          >
            <span
              className="text-[0.62rem] uppercase tracking-[0.2em]"
              style={{ color: d.color }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 font-serif text-base text-ink">{d.key}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[13rem]">
        <p className="eyebrow" style={{ color: current.color }}>
          {current.words}
        </p>
        <h3 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
          {current.key}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          {current.body}
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Select a circle to read each dimension
        </p>
      </div>
    </div>
  );
}
