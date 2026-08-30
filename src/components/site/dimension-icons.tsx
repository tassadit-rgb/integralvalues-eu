import { useState } from "react";
import { Brain, Heart, PersonStanding, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Dimension = {
  icon: LucideIcon;
  label: string;
  text: string;
  tone: string;
  lead: string;
  detail: string[];
  practice: string;
};

export const DIMENSIONS: Dimension[] = [
  {
    icon: PersonStanding,
    label: "Body",
    text: "Sensations, breath, posture and the somatic memory that speaks before words do.",
    tone: "text-cyan",
    lead: "The first witness.",
    detail: [
      "The body registers stress, grief and overload long before language does. Breath, sleep, posture, digestion and chronic tension are read as clinical information, not as side effects.",
      "In psycho-somato-analysis, we work with sensation directly: slowing down, grounding, and letting the nervous system return to a range where thinking becomes possible again.",
    ],
    practice:
      "Typical work: breathing and grounding practice, somatic tracking, burnout and fatigue mapping, sleep and recovery rhythms.",
  },
  {
    icon: Brain,
    label: "Brain",
    text: "Cognition, beliefs and the patterns that organise how we read the world.",
    tone: "text-purple",
    lead: "The organiser.",
    detail: [
      "Beliefs, inner rules and learned strategies decide how a situation is interpreted — often faster than conscious thought and usually from an older context.",
      "We make those patterns visible and testable, so they can be chosen deliberately rather than replayed. Psychometric and cognitive assessment support this reading when useful.",
    ],
    practice:
      "Typical work: cognitive assessment, pattern and belief mapping, decision-making, attention and ADHD, high-potential profiles.",
  },
  {
    icon: Heart,
    label: "Emotion",
    text: "Affect, attachment and the relational life that gives every decision its weight.",
    tone: "text-pink",
    lead: "The compass.",
    detail: [
      "Emotion is information about what matters and what is threatened. Attachment history shapes how closeness, conflict and authority are experienced today.",
      "We welcome emotion rather than manage it away — naming it, allowing it, and using it to orient action in couples, families, teams and leadership.",
    ],
    practice:
      "Typical work: emotional regulation, grief and transition, couple and family dynamics, relational patterns at work.",
  },
  {
    icon: Sun,
    label: "Consciousness",
    text: "Meaning, values and the wider awareness in which a life becomes coherent.",
    tone: "text-navy",
    lead: "The apex.",
    detail: [
      "Above body, brain and emotion sits the question of direction: values, meaning, culture and the wider systems a person belongs to.",
      "This is where change stops being a technique and becomes a direction — integrating the three other dimensions into a life or a leadership that holds together.",
    ],
    practice:
      "Typical work: values clarification, purpose and vocation, intercultural identity, leadership ethics and legacy.",
  },
];

export function DimensionIcons({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<Dimension | null>(null);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {DIMENSIONS.map((d) => {
          const Icon = d.icon;
          return (
            <button
              key={d.label}
              type="button"
              onClick={() => setActive(d)}
              className="group border-t border-border pt-6 text-left transition-colors hover:border-primary focus:outline-none focus-visible:border-primary"
              aria-label={`Learn more about ${d.label}`}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1}
                size={36}
                className={d.tone}
              />
              <h3 className="mt-5 font-serif text-xl text-ink">{d.label}</h3>
              {!compact && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.text}
                </p>
              )}
              <span className="mt-3 inline-block text-[0.68rem] uppercase tracking-[0.18em] text-primary opacity-70 transition-opacity group-hover:opacity-100">
                Learn more
              </span>
            </button>
          );
        })}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <active.icon
                  aria-hidden="true"
                  strokeWidth={1}
                  size={36}
                  className={active.tone}
                />
                <DialogTitle className="pt-3 font-serif text-2xl text-ink">
                  {active.label}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {active.lead}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {active.detail.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                <p className="border-t border-border pt-4 text-xs uppercase tracking-[0.14em] text-ink">
                  {active.practice}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
