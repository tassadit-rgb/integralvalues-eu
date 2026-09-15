export type BookingServiceKey =
  | "initial-consultation"
  | "individual-coaching"
  | "corporate-coaching"
  | "individual-counselling"
  | "couples"
  | "group";

export type BookingService = {
  key: BookingServiceKey;
  title: string;
  durationMinutes: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  { key: "initial-consultation", title: "Initial Consultation", durationMinutes: 15 },
  { key: "individual-coaching", title: "Individual Coaching", durationMinutes: 30 },
  { key: "corporate-coaching", title: "Corporate Coaching", durationMinutes: 60 },
  { key: "individual-counselling", title: "Individual Counselling", durationMinutes: 45 },
  { key: "couples", title: "Couples Session", durationMinutes: 60 },
  { key: "group", title: "Group Session", durationMinutes: 90 },
];

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "initial-consultation": "https://calendly.com/integralvalues/chemistry-call",
  "individual-coaching": "https://calendly.com/integralvalues/individual-coaching-30-min",
  "corporate-coaching": "https://calendly.com/integralvalues/corporate-coaching-60-min",
  "individual-counselling": "https://calendly.com/integralvalues/individual-counselling-45-min",
  couples: "https://calendly.com/integralvalues/couples-session-60-min",
  group: "https://calendly.com/integralvalues/group-session-90-min",
};

/** Public scheduling destinations. Payment settings are managed per event in Calendly. */
export function getBookingEntryUrl(serviceKey: BookingServiceKey = "initial-consultation") {
  return CALENDLY_URLS[serviceKey];
}
