import { Brain, Heart, PersonStanding, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Dimension = {
  icon: LucideIcon;
  label: string;
  text: string;
  tone: string;
};

export const DIMENSIONS: Dimension[] = [
  {
    icon: PersonStanding,
    label: "Body",
    text: "Sensations, breath, posture and the somatic memory that speaks before words do.",
    tone: "text-cyan",
  },
  {
    icon: Brain,
    label: "Brain",
    text: "Cognition, beliefs and the patterns that organise how we read the world.",
    tone: "text-purple",
  },
  {
    icon: Heart,
    label: "Emotion",
    text: "Affect, attachment and the relational life that gives every decision its weight.",
    tone: "text-pink",
  },
  {
    icon: Sun,
    label: "Consciousness",
    text: "Meaning, values and the wider awareness in which a life becomes coherent.",
    tone: "text-navy",
  },
];

export function DimensionIcons({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {DIMENSIONS.map(({ icon: Icon, label, text, tone }) => (
        <div key={label} className="border-t border-border pt-6">
          <Icon
            aria-hidden="true"
            strokeWidth={1}
            size={36}
            className={tone}
          />
          <h3 className="mt-5 font-serif text-xl text-ink">{label}</h3>
          {!compact && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
