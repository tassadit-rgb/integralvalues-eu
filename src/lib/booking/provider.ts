export type BookingProviderName = "calendly";

export type BookingServiceKey =
  "lets-talk" | "i-need-help" | "coach-me-up" | "culture-talk" | "leadup-core" | "supervision";

export type BookingService = {
  key: BookingServiceKey;
  title: string;
  durationMinutes: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  { key: "lets-talk", title: "Let's Talk", durationMinutes: 15 },
  { key: "i-need-help", title: "I Need Help", durationMinutes: 45 },
  { key: "coach-me-up", title: "CoachMeUp", durationMinutes: 60 },
  { key: "culture-talk", title: "Culture Talk", durationMinutes: 60 },
  { key: "leadup-core", title: "LeadUp — Core", durationMinutes: 60 },
  { key: "supervision", title: "Group Supervision", durationMinutes: 90 },
];

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "lets-talk": "https://calendly.com/integralvalues/chemistry-call",
  "i-need-help": "https://calendly.com/integralvalues/ineedhelp",
  "coach-me-up": "https://calendly.com/integralvalues/coachmeup",
  "culture-talk": "https://calendly.com/integralvalues/culture-talk",
  "leadup-core": "https://calendly.com/integralvalues/leadup-core",
  supervision: "https://calendly.com/integralvalues/supervisor-group",
};

// Calendly is the only production booking provider.
// Payment processing remains on the booking provider side; no card data is handled by this site.
export const BOOKING_PROVIDER: BookingProviderName = "calendly";

export function getBookingEntryUrl(serviceKey?: BookingServiceKey) {
  return CALENDLY_URLS[serviceKey ?? "lets-talk"];
}
