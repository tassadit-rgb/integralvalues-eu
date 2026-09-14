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

const CALENDLY_URLS: Record<BookingServiceKey, string> = {
  "initial-consultation": "https://calendly.com/integralvalues/chemistry-call",
  "individual-coaching": "https://calendly.com/integralvalues/individual-coaching-30-min",
  "corporate-coaching": "https://calendly.com/integralvalues/corporate-coaching-60-min",
  "individual-counselling": "https://calendly.com/integralvalues/individual-counselling-45-min",
  couples: "https://calendly.com/integralvalues/couples-session-60-min",
  group: "https://calendly.com/integralvalues/group-session-90-min",
};

export type BookingEnvironment = {
  VITE_BOOKING_PROVIDER?: string;
  VITE_AMELIA_PUBLIC_BASE_URL?: string;
};

export function createBookingProvider(environment: BookingEnvironment) {
  const configuredProvider = environment.VITE_BOOKING_PROVIDER;
  const provider: BookingProviderName =
    configuredProvider === "amelia" ||
    configuredProvider === "calendly" ||
    configuredProvider === "legacy"
      ? configuredProvider
      : "calendly";

  const configuredAmeliaUrl = environment.VITE_AMELIA_PUBLIC_BASE_URL?.trim();
  const ameliaPublicBaseUrl = (
    configuredAmeliaUrl || DEFAULT_AMELIA_PUBLIC_BASE_URL
  ).replace(/\/$/, "");

  function getAmeliaPublicBookingUrl(_serviceKey?: BookingServiceKey) {
    return ameliaPublicBaseUrl;
  }

  function getBookingEntryUrl(serviceKey?: BookingServiceKey) {
    if (provider === "amelia") return getAmeliaPublicBookingUrl(serviceKey);
    if (provider === "calendly") {
      return CALENDLY_URLS[serviceKey ?? "initial-consultation"];
    }
    return "/contact";
  }

  return { provider, getAmeliaPublicBookingUrl, getBookingEntryUrl };
}

const booking = createBookingProvider(import.meta.env);

export const BOOKING_PROVIDER = booking.provider;
export const getAmeliaPublicBookingUrl = booking.getAmeliaPublicBookingUrl;
export const getBookingEntryUrl = booking.getBookingEntryUrl;
