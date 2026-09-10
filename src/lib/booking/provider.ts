export type BookingProviderName = "amelia" | "calendly" | "legacy";

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

const DEFAULT_AMELIA_PUBLIC_BASE_URL =
  "https://tassaditcherfaoui-oawpe.wpcomstaging.com/booking-integral-values/";

const AMELIA_PUBLIC_BASE_URL = (
  import.meta.env.VITE_AMELIA_PUBLIC_BASE_URL ?? DEFAULT_AMELIA_PUBLIC_BASE_URL
).replace(/\/$/, "");

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "initial-consultation": "https://calendly.com/integralvalues/chemistry-call",
  "individual-coaching": "https://calendly.com/integralvalues/individual-coaching-30-min",
  "corporate-coaching": "https://calendly.com/integralvalues/corporate-coaching-60-min",
  "individual-counselling": "https://calendly.com/integralvalues/individual-counselling-45-min",
  couples: "https://calendly.com/integralvalues/couples-session-60-min",
  group: "https://calendly.com/integralvalues/group-session-90-min",
};

const configuredProvider = import.meta.env.VITE_BOOKING_PROVIDER;

export const BOOKING_PROVIDER: BookingProviderName =
  configuredProvider === "amelia" ||
  configuredProvider === "calendly" ||
  configuredProvider === "legacy"
    ? configuredProvider
    : "calendly";

/**
 * Returns the public Amelia booking entry point.
 *
 * Service-specific Amelia deep links will be added only after the Amelia service
 * IDs are mapped and verified. Until then, Amelia opens the same public booking
 * form for every service.
 *
 * Never place Amelia private API keys, WordPress credentials, Stripe secrets,
 * PayPal secrets or other privileged credentials in VITE_* variables.
 */
export function getAmeliaPublicBookingUrl(_serviceKey?: BookingServiceKey) {
  return AMELIA_PUBLIC_BASE_URL;
}

export function getBookingEntryUrl(serviceKey?: BookingServiceKey) {
  if (BOOKING_PROVIDER === "amelia") {
    return getAmeliaPublicBookingUrl(serviceKey);
  }

  if (BOOKING_PROVIDER === "calendly") {
    return CALENDLY_URLS[serviceKey ?? "initial-consultation"];
  }

  return "/contact";
}
