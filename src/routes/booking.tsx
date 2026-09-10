import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";
import {
  BOOKING_PROVIDER,
  BOOKING_SERVICES,
  getBookingEntryUrl,
} from "@/lib/booking/provider";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Choose the Integral Values service that fits your request and continue to secure scheduling.",
      },
      { property: "og:title", content: "Book a Consultation — Integral Values" },
      {
        property: "og:description",
        content: "A calm, guided path from service selection to scheduling.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BookingPage,
});

const COPY: Record<(typeof BOOKING_SERVICES)[number]["key"], string> = {
  "initial-consultation":
    "A first conversation to understand your request and identify the most appropriate next step.",
  "individual-coaching":
    "Focused one-to-one coaching for clarity, transition, leadership, performance and personal development.",
  "corporate-coaching":
    "Executive and organisational coaching for leadership, decision-making and sustainable performance.",
  "individual-counselling":
    "A confidential space for emotional distress, transitions, trauma-related difficulties and personal support.",
  couples:
    "Support for communication, relational patterns, intimacy, conflict and meaningful reconnection.",
  group:
    "A structured group format for shared development, facilitated reflection and collective learning.",
};

function BookingPage() {
  const providerMessage =
    BOOKING_PROVIDER === "amelia"
      ? "Scheduling is currently handled through our Amelia booking environment."
      : BOOKING_PROVIDER === "calendly"
        ? "Scheduling is currently handled through our secure Calendly booking pages while Amelia completes final production validation."
        : "Booking is currently handled through the Integral Values contact pathway.";

  const buttonLabel =
    BOOKING_PROVIDER === "legacy" ? "Contact us" : "Continue to booking";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Booking"
        title="Choose the support that fits."
        lead="Select a service below and continue to our scheduling environment. Session prices remain private on the public website."
        quote="One clear path. One protected space."
      />

      <Section>
        <div className="mx-auto mb-10 max-w-2xl rounded-[1.5rem] border border-[#75E8D5]/45 bg-[#75E8D5]/10 px-5 py-4 text-center text-xs leading-relaxed text-muted-foreground">
          {providerMessage}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BOOKING_SERVICES.map((service) => (
            <article
              key={service.key}
              className="soft-card flex h-full flex-col p-7 sm:p-8"
            >
              <p className="eyebrow">{service.durationMinutes} min</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink">{service.title}</h2>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {COPY[service.key]}
              </p>
              <a
                href={getBookingEntryUrl(service.key)}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                {buttonLabel}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          The durations shown here are the intended Integral Values session formats. Scheduling availability is confirmed in the booking environment.
        </p>
      </Section>
    </SiteLayout>
  );
}
