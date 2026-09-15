import { describe, expect, it } from "vitest";

import { BOOKING_SERVICES, createBookingProvider, type BookingServiceKey } from "./provider";

describe("createBookingProvider", () => {
  it("uses Calendly as the launch-safe default", () => {
    const booking = createBookingProvider({});
    expect(booking.provider).toBe("calendly");
  });

  it("falls back safely when the configured provider is invalid", () => {
    expect(createBookingProvider({ VITE_BOOKING_PROVIDER: "unknown" }).provider).toBe("calendly");
  });

  it("does not activate Amelia without an explicit public URL", () => {
    const booking = createBookingProvider({ VITE_BOOKING_PROVIDER: "amelia" });
    expect(booking.provider).toBe("calendly");
    expect(booking.getAmeliaPublicBookingUrl()).toBeNull();
  });

  it("routes legacy mode to contact", () => {
    const booking = createBookingProvider({ VITE_BOOKING_PROVIDER: "legacy" });
    for (const service of BOOKING_SERVICES) {
      expect(booking.getBookingEntryUrl(service.key)).toBe("/contact");
    }
  });

  it("uses one explicitly configured public Amelia URL without guessed parameters", () => {
    const booking = createBookingProvider({
      VITE_BOOKING_PROVIDER: "amelia",
      VITE_AMELIA_PUBLIC_BASE_URL: "https://booking.example.test/path/",
    });

    for (const service of BOOKING_SERVICES) {
      expect(booking.getBookingEntryUrl(service.key)).toBe("https://booking.example.test/path");
    }
  });

  it("keeps a distinct Calendly URL for every service", () => {
    const booking = createBookingProvider({
      VITE_BOOKING_PROVIDER: "calendly",
    });
    const urls = BOOKING_SERVICES.map((service) => booking.getBookingEntryUrl(service.key));

    expect(new Set(urls).size).toBe(BOOKING_SERVICES.length);
    for (const url of urls) expect(url).toMatch(/^https:\/\/calendly\.com\//);
  });

  it("uses the initial consultation when no service is provided", () => {
    const booking = createBookingProvider({
      VITE_BOOKING_PROVIDER: "calendly",
    });
    expect(booking.getBookingEntryUrl()).toContain("chemistry-call");
  });

  it("defines the six agreed service keys and durations", () => {
    const expected: Record<BookingServiceKey, number> = {
      "initial-consultation": 15,
      "individual-coaching": 30,
      "corporate-coaching": 60,
      "individual-counselling": 45,
      couples: 60,
      group: 90,
    };
    expect(
      Object.fromEntries(
        BOOKING_SERVICES.map(({ key, durationMinutes }) => [key, durationMinutes]),
      ),
    ).toEqual(expected);
  });
});
