export const VALUES_RANKING_GROUPS = [
  {
    label: "Self & agency",
    values: ["Autonomy", "Freedom", "Authenticity", "Growth"],
  },
  {
    label: "Relationships",
    values: ["Love", "Trust", "Loyalty", "Care"],
  },
  {
    label: "Culture & belonging",
    values: ["Family", "Belonging", "Community", "Tradition"],
  },
  {
    label: "Responsibility & security",
    values: ["Achievement", "Responsibility", "Justice", "Security"],
  },
  {
    label: "Expression & meaning",
    values: ["Creativity", "Recognition", "Service", "Meaning"],
  },
] as const;

export const VALUES_LEVELS = [
  {
    level: "Level 1",
    label: "Core Values",
    description:
      "Identity-defining values experienced as central and least negotiable at this point in life.",
    values: [
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
    ],
  },
  {
    level: "Level 2",
    label: "Anchor Values",
    description:
      "Relational, social and cultural values that organise belonging, responsibility and everyday choices.",
    values: [
      "Loyalty",
      "Belonging",
      "Respect",
      "Responsibility",
      "Solidarity",
      "Autonomy",
      "Achievement",
      "Tradition",
      "Equality",
      "Trust",
      "Recognition",
      "Care",
    ],
  },
  {
    level: "Level 3",
    label: "Context Values",
    description:
      "Context-sensitive preferences that shape how values are expressed in families, cultures and organisations.",
    values: [
      "Hierarchy",
      "Time orientation",
      "Directness",
      "Formality",
      "Risk tolerance",
      "Consensus",
      "Competition",
      "Privacy",
      "Emotional expression",
      "Rules",
      "Flexibility",
      "Work-life balance",
    ],
  },
] as const;

export const CROSS_CULTURAL_VALUE_TENSIONS = [
  "Autonomy ↔ Belonging",
  "Freedom ↔ Security",
  "Authenticity ↔ Tradition",
  "Achievement ↔ Care",
  "Recognition ↔ Service",
  "Personal growth ↔ Family / community responsibility",
] as const;

export const HOFSTEDE_LENSES = [
  {
    dimension: "Power Distance",
    tension: "Equality / Justice ↔ Authority / Status / Hierarchy",
  },
  {
    dimension: "Individualism",
    tension: "Freedom / Autonomy ↔ Family / Loyalty / Belonging",
  },
  {
    dimension: "Masculinity",
    tension: "Achievement / Competition ↔ Care / Cooperation / Quality of life",
  },
  {
    dimension: "Uncertainty Avoidance",
    tension: "Security / Rules ↔ Flexibility / Exploration / Ambiguity",
  },
  {
    dimension: "Long-Term Orientation",
    tension: "Adaptation / Future ↔ Tradition / Continuity",
  },
  {
    dimension: "Indulgence",
    tension: "Expression / Enjoyment ↔ Restraint / Duty / Social control",
  },
] as const;

export const SCIENTIFIC_FOUNDATIONS = [
  {
    name: "Schwartz",
    role: "Basic Human Values",
    body: "A research-based lens for individual values and recurring patterns of compatibility and tension between values.",
  },
  {
    name: "Hofstede",
    role: "Cultural Dimensions",
    body: "A group-level lens for cultural tendencies. It is used as context, never as an individual diagnosis or stereotype.",
  },
  {
    name: "Berry",
    role: "Acculturation",
    body: "A framework for thinking about integration, assimilation, separation and marginalisation in intercultural adaptation.",
  },
  {
    name: "Porter",
    role: "Communication Attitudes",
    body: "A communication lens for noticing evaluation, interpretation, support, investigation, solution and understanding in dialogue.",
  },
  {
    name: "AQAL / Wilber",
    role: "Integral Reading",
    body: "An integrative lens connecting the person, relationships, culture and systems rather than reducing experience to one level.",
  },
] as const;

export const ZONE_OF_BALANCE = {
  title: "Zone of Balance",
  principle:
    "Adapt without self-erasure. Understand difference without losing identity.",
  conditions: [
    "Core values remain visible",
    "Cultural differences are understood",
    "Contextual behaviour can adapt",
    "Communication stays reciprocal",
  ],
} as const;

export const VALUES_RANKING_NOTE =
  "Values Ranking is a reflective prioritisation tool. The example levels are not universal categories: the person’s own ranking determines which values are Core, Anchor or Context. It is not a diagnostic or standardised psychometric test.";

export const SCIENTIFIC_FOUNDATIONS_NOTE =
  "Integral Values is scientifically informed by established research and theoretical frameworks. The Integral Values synthesis itself has not yet been independently psychometrically validated and is not a diagnostic instrument.";
