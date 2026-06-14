export const BRAND = {
  name: "Integral Value",
  sub: "Psy & Co",
  tagline: "You're Not Alone",
  short: "Un espace bienveillant pour prendre soin de votre santé mentale — thérapie, coaching et conseil juridique réunis.",
} as const;

export const KIND_LABEL: Record<"therapy" | "coaching" | "legal", string> = {
  therapy: "Thérapie",
  coaching: "Coaching",
  legal: "Conseil juridique",
};

export const KIND_DESCRIPTION: Record<"therapy" | "coaching" | "legal", string> = {
  therapy: "Psychologues et psychothérapeutes pour vous accompagner en profondeur.",
  coaching: "Coachs certifiés pour avancer concrètement sur vos objectifs.",
  legal: "Avocats spécialisés pour les situations juridiques sensibles.",
};

export const MOOD_LABELS = ["Très difficile", "Difficile", "Neutre", "Bien", "Très bien"] as const;
export const MOOD_EMOJI = ["🌧️", "☁️", "🌤️", "☀️", "✨"] as const;
