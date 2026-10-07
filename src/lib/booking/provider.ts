export type BookingProviderName = "calendly";

export type BookingServiceKey =
  | "lets-talk"
  | "i-need-help"
  | "coachmeup"
  | "culture-talk"
  | "leadup-core"
  | "supervisor-group";

export type BookingService = {
  key: BookingServiceKey;
  title: string;
  durationMinutes: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  { key: "lets-talk", title: "Let's talk!", durationMinutes: 15 },
  { key: "i-need-help", title: "I need Help!", durationMinutes: 45 },
  { key: "coachmeup", title: "CoachmeUp!", durationMinutes: 60 },
  { key: "culture-talk", title: "Culture Talk!", durationMinutes: 60 },
  { key: "leadup-core", title: "LeadUp/Core", durationMinutes: 60 },
  { key: "supervisor-group", title: "Supervisor Group", durationMinutes: 90 },
];

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "lets-talk": "https://calendly.com/integralvalues/chemistry-call",
  "i-need-help": "https://calendly.com/integralvalues/ineedhelp",
  coachmeup: "https://calendly.com/integralvalues/coachmeup",
  "culture-talk": "https://calendly.com/integralvalues/culture-talk",
  "leadup-core": "https://calendly.com/integralvalues/leadup-core",
  "supervisor-group": "https://calendly.com/integralvalues/supervisor-group",
};

// Calendly is the production booking provider for Integral Values.
export const BOOKING_PROVIDER: BookingProviderName = "calendly";

export function getBookingEntryUrl(serviceKey?: BookingServiceKey) {
  return CALENDLY_URLS[serviceKey ?? "lets-talk"];
}
