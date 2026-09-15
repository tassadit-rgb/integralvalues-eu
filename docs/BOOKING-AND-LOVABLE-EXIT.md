# Booking and platform independence

## Booking decision

Calendly is the sole scheduling and payment entry point. Stripe and PayPal remain payment processors connected in the Calendly account. The application uses public Calendly URLs only; it needs no booking API credentials or payment secrets.

`src/lib/booking/provider.ts` maps each site service to its public event URL. Booking provider environment switches are no longer read, so stale deployment values cannot redirect clients to a retired backend. The WordPress theme uses a new Calendly-only Customizer setting and ignores the old booking destination setting.

## Account verification on 15 September 2026

All six event URLs currently used by the site exist and are active. They report `is_paid: false`:

- chemistry-call (15 minutes)
- individual-coaching-30-min (30 minutes)
- corporate-coaching-60-min (60 minutes)
- individual-counselling-45-min (45 minutes)
- couples-session-60-min (60 minutes)
- group-session-90-min (90 minutes)

Two other active events report `is_paid: true`: coachmeup (60 minutes) and consultation-psy (45 minutes). These are distinct event types. Do not silently replace a 30-minute offering with a 60-minute event. Confirm the intended service mapping and prices with the owner before changing destinations. The connected API reports payment flags but does not expose a payment configuration mutation.

## Before production sign-off

1. Confirm the intended event for each service and its duration.
2. Set the amount, currency and payment requirement in Calendly for paid services. Preserve deliberately free events.
3. Verify the chosen time, checkout, booking confirmation and calendar entry as one journey. Do not claim that connected processors alone prove successful payment collection.
4. Deploy the reviewed source to the existing host and verify the actual public buttons. This branch is not a deployment.

## Platform independence

GitHub remains the canonical source. Hostinger is the intended production host. Account and application data services remain unchanged by this booking cleanup. Lovable runtime removal is a separate workstream: preserve existing work, replace its build and email dependencies deliberately, and verify build, server rendering and deployment before removal. Do not introduce another booking backend as part of that work.

## Operational cleanup

Remove unused booking-provider environment variables in the deployment settings after rollout. Review any old WordPress scheduling pages and replace them with the relevant Calendly link. Do not delete customer records, historical transactions, unrelated WordPress content or payment accounts as part of source cleanup.
