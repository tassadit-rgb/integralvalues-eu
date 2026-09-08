import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Choose your Integral Values service, complete secure payment when required, then select your appointment time.",
      },
      { property: "og:title", content: "Book a Consultation — Integral Values Psy & Co" },
      {
        property: "og:description",
        content: "A simple path from service selection to secure payment and scheduling.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BookingPage,
});

type BookingOption = {
  title: string;
  duration: string;
  price: string;
  description: string;
  href: string;
  free?: boolean;
};

const OPTIONS: BookingOption[] = [
  {
    title: "Initial Consultation",
    duration: "15 min",
    price: "Free",
    description: "A first conversation to understand your request and identify the most appropriate next step.",
    href: "https://calendly.com/integralvalues/chemistry-call",
    free: true,
  },
  {
    title: "Individual Coaching",
    duration: "30 min",
    price: "€75",
    description: "Focused individual coaching for clarity, transition, performance and personal development.",
    href: "https://book.stripe.com/00w8wJ9U0dzbayU3nZgA800",
  },
  {
    title: "Corporate Coaching",
    duration: "60 min",
    price: "€350",
    description: "Executive and organisational coaching for leadership, decision-making and sustainable performance.",
    href: "https://book.stripe.com/3cI7sF7LS3YBdL6aQrgA801",
  },
  {
    title: "Individual Counselling",
    duration: "45 min",
    price: "€75",
    description: "A confidential space for emotional distress, transitions, trauma-related difficulties and personal support.",
    href: "https://book.stripe.com/00w9AN2ryamZePa6AbgA802",
  },
  {
    title: "Couples Session",
    duration: "60 min",
    price: "€160",
    description: "Support for communication, relational patterns, intimacy, conflict and meaningful reconnection.",
    href: "https://book.stripe.com/14AeV76HO0Mp6iE9MngA803",
  },
  {
    title: "Group Session",
    duration: "90 min",
    price: "€70 / participant",
    description: "A structured group space. Select the number of participants securely during checkout.",
    href: "https://book.stripe.com/aFa28l8PWdzb36s5w7gA804",
  },
];

function BookingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Booking"
        title="Choose the support that fits."
        lead="Select a service below. Paid sessions are completed through secure Stripe checkout, then you are redirected to the matching calendar to choose your appointment time."
        quote="One clear path. One protected space."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((option) => (
            <article key={option.title} className="soft-card flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="eyebrow">{option.duration}</p>
                  <h2 className="mt-3 text-2xl leading-tight text-ink">{option.title}</h2>
                </div>
                <p className="shrink-0 font-serif text-xl text-primary">{option.price}</p>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>

              <a
                href={option.href}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                {option.free ? "Book free call" : "Pay & book"}
              </a>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Paid bookings are confirmed through Stripe before scheduling. Appointment availability is then shown in your local timezone through Calendly.
        </div>
      </Section>
    </SiteLayout>
  );
}
