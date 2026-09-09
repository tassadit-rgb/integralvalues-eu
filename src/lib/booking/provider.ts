export type BookingProviderName = "amelia" | "legacy";

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

export const BOOKING_PROVIDER: BookingProviderName =
  import.meta.env.VITE_BOOKING_PROVIDER === "amelia" ? "amelia" : "legacy";

const AMELIA_PUBLIC_BASE_URL = (import.meta.env.VITE_AMELIA_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");

/**
 * Returns a public booking entry URL only.
 *
 * Never place Amelia private API keys, WordPress credentials, Stripe secrets,
 * PayPal secrets or other privileged credentials in VITE_* variables.
 */
export function getAmeliaPublicBookingUrl(serviceKey?: BookingServiceKey) {
  if (!AMELIA_PUBLIC_BASE_URL) return null;

  if (!serviceKey) return AMELIA_PUBLIC_BASE_URL;

  const url = new URL(AMELIA_PUBLIC_BASE_URL);
  url.searchParams.set("service", serviceKey);
  return url.toString();
}

export function getBookingEntryUrl(serviceKey?: BookingServiceKey) {
  if (BOOKING_PROVIDER === "amelia") {
    return getAmeliaPublicBookingUrl(serviceKey);
  }

  return "/contact";
}
