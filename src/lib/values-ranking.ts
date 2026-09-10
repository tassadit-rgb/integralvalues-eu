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

export const CROSS_CULTURAL_VALUE_TENSIONS = [
  "Autonomy ↔ Belonging",
  "Freedom ↔ Security",
  "Authenticity ↔ Tradition",
  "Achievement ↔ Care",
  "Recognition ↔ Service",
  "Personal growth ↔ Family / community responsibility",
] as const;

export const VALUES_RANKING_NOTE =
  "Values Ranking is a reflective prioritisation tool. It is not a diagnostic or standardised psychometric test.";
