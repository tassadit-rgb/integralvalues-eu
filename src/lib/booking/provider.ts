export type BookingServiceKey =
  | "initial-consultation"
  | "individual-counselling"
  | "individual-coaching"
  | "culture-talk"
  | "corporate-coaching"
  | "group";

export type BookingService = {
  key: BookingServiceKey;
  title: string;
  durationMinutes: number;
  priceEur: number;
  pricePerParticipant?: boolean;
  maxParticipants?: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  {
    key: "initial-consultation",
    title: "Let’s talk!",
    durationMinutes: 15,
    priceEur: 0,
  },
  {
    key: "individual-counselling",
    title: "I Need Help!",
    durationMinutes: 45,
    priceEur: 75,
  },
  {
    key: "individual-coaching",
    title: "CoachMeUp!",
    durationMinutes: 60,
    priceEur: 99,
  },
  {
    key: "culture-talk",
    title: "Culture Talk",
    durationMinutes: 60,
    priceEur: 125,
  },
  {
    key: "corporate-coaching",
    title: "LeadUp (Core)",
    durationMinutes: 60,
    priceEur: 250,
  },
  {
    key: "group",
    title: "Supervision",
    durationMinutes: 90,
    priceEur: 75,
    pricePerParticipant: true,
    maxParticipants: 12,
  },
];

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "initial-consultation": "https://calendly.com/integralvalues/chemistry-call",
  "individual-counselling": "https://calendly.com/integralvalues/ineedhelp",
  "individual-coaching": "https://calendly.com/integralvalues/coachmeup",
  "culture-talk": "https://calendly.com/integralvalues/culture-talk",
  "corporate-coaching": "https://calendly.com/integralvalues/leadup-core",
  group: "https://calendly.com/integralvalues/supervisor-group",
};

/** Calendly controls payment collection; these prices describe the public offer. */
export function getBookingEntryUrl(serviceKey: BookingServiceKey = "initial-consultation") {
  return CALENDLY_URLS[serviceKey];
}
