# Integral Values — Amelia integration and Lovable exit plan

## Objective

Keep `integralvalues.eu` independent, premium and fully controlled by Integral Values while using Amelia as the operational booking engine and keeping Lovable only as a temporary visual sandbox/reference.

## Source of truth

Production source of truth:

`GitHub -> Hostinger -> Supabase`

- **GitHub**: canonical application source.
- **Hostinger**: production runtime and deployment.
- **Supabase**: authentication and Integral Values-owned data.
- **Amelia**: booking, practitioners, availability, packages, payments and notifications.
- **WordPress**: Amelia host only; it is not the public frontend.
- **Lovable**: temporary design sandbox/reference only. It must not become the database, booking engine, auth provider or production source of truth.

## Branch policy

- `main`: production/canonical code.
- `lovable-sandbox`: preserved sandbox branch for Lovable experimentation and visual reference.

Any useful visual or UX change created in Lovable must be reviewed and deliberately ported into `main`; production must not depend on Lovable-generated runtime services.

## Target booking architecture

```text
IntegralValues.eu (React / TanStack)
        |
        v
Integral Values booking adapter
        |
        +--> Amelia / WordPress booking backend
        |      - services
        |      - practitioners
        |      - availability
        |      - packages
        |      - Stripe / PayPal
        |      - notifications
        |      - Google Calendar / Meet
        |
        +--> temporary fallback provider during migration

Supabase remains responsible for Integral Values accounts and application-owned data.
```

## Amelia deployment rule

Recommended host:

`booking.integralvalues.eu`

WordPress + Amelia should live there as an operational backend. The customer-facing experience remains on `integralvalues.eu`.

Do not rebuild the public site in WordPress.

## Migration phases

### Phase 1 — Preserve control

- Keep `main` canonical.
- Use `lovable-sandbox` only for controlled experimentation.
- Do not add new business logic that depends on Lovable.
- New integrations are introduced behind Integral Values-owned adapters.

### Phase 2 — Install Amelia backend

Configure in Amelia:

1. Individual Coaching — 30 min
2. Corporate Coaching — 60 min
3. Individual Counselling — 45 min
4. Couples Session — 60 min
5. Group Session — 90 min
6. Initial Consultation — 15 min
7. Integral Development packages / memberships where commercially appropriate
8. Practitioner profiles and availability
9. Google Calendar / Meet
10. Stripe and PayPal
11. Booking notifications

### Phase 3 — Connect React to Amelia

The public React application uses a booking-provider adapter instead of hard-coded provider URLs. Amelia credentials and private keys stay server-side.

The browser may receive public booking URLs or safe public identifiers only.

### Phase 4 — Replace temporary booking stack

After Amelia passes end-to-end testing:

- migrate customer booking entry points to Amelia;
- retire Calendly links;
- retire duplicate Stripe payment links where Amelia handles payment directly;
- keep Stripe as the payment processor behind Amelia;
- enable PayPal through Amelia when validated.

### Phase 5 — Remove Lovable runtime dependencies

Current code still contains Lovable-specific packages/configuration. Before final exit:

- replace `@lovable.dev/vite-tanstack-config` with native Vite/TanStack configuration;
- replace Lovable email/webhook packages if still used;
- verify build, SSR, environment loading and Hostinger deployment without Lovable packages;
- run production smoke tests;
- remove unused Lovable packages only after parity is confirmed.

### Phase 6 — Exit Lovable

Lovable can be considered removable when all of the following are true:

- production builds without Lovable packages;
- all production design/code is present in GitHub;
- booking is handled through Amelia or Integral Values-owned services;
- Supabase auth/data works independently;
- Hostinger deployment works directly from GitHub;
- no production secret, database, webhook or business rule depends on Lovable.

## Non-negotiable principle

Integral Values owns the customer experience, data model and source code. External services remain replaceable components, not the architecture itself.
