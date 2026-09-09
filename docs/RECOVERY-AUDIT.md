# Integral Values — Recovery Audit

Branch: `recovery-validated-work`

Purpose: reconstruct the last validated Integral Values website state after Lovable reintroduced older files into `main`.

## Rules
- `main` stays production until recovery is validated.
- Restore only from previously validated commits or explicit current decisions.
- Keep Supabase, Booking/Amelia, Psyché and recent functional work.
- Do not reintroduce old pyramid/hierarchical visuals.
- Public session pricing stays hidden.
- V2 brand system is authoritative.
- Remove runtime dependence on Lovable progressively; do not break the build during recovery.

## Recovery checklist
- [x] Global V2 brand assets — key validated assets restored from Git history
- [x] Header / footer — V2 icon restored, booking CTA points to `/booking`, unverified ® removed
- [x] Home — validated hero video restored, founder image moved to recovered public asset, Lovable asset dependency removed from this page
- [x] About + founder portrait + V2 values — pyramid removed; exact INTEGRAL labels restored
- [x] Our Method + hero video + journey links — `Hero-Our-method-web.mp4` restored; journey cards linked
- [x] Works — metadata cleaned and V2 routes preserved
- [x] Coaching — public session pricing removed and membership summaries aligned with For You
- [x] Care & Therapy — public session pricing removed; public claims reduced to safer wording
- [x] Cross-Culture — reframed internationally around migration, identity, belonging and organisations; unsupported reach metrics removed
- [x] CORE — unsupported satisfaction/reach/certification claims removed; B2B positioning clarified
- [ ] Psyché / WHO-5 / ASRS / Wheel — routes present; clinical wording and scoring still require evidence review
- [~] For You memberships — Jade/Turquoise/Rubi/Diamant/Amethyst configuration reviewed; CTA and package logic still to test
- [x] Contact — working server submission preserved while public pricing was removed
- [~] Booking / Amelia pilot — route and provider adapter present; end-to-end test still required
- [ ] Affiliate / Apply / Status / Admin
- [ ] Supabase auth/data routes
- [~] Metadata / legal marks / claims — major public ®/unsupported marketing claims cleaned; full route audit remains
- [~] Asset existence audit — homepage/method/founder/V2 logo assets restored; full public asset inventory remains
- [ ] Lovable dependency removal
- [ ] Build + route smoke test before merge to `main`

## Key restored assets
- `public/Hero-You’re not Alone;.mp4`
- `public/Hero-Our-method-web.mp4`
- `public/About-founder.jpeg`
- `public/Logo-icon.png`
- `public/logo-horizontal-dark.png`
- `public/logo-horizontal-light.png`
- `public/logo-stacked-dark.png`
- `public/logo-stacked-light.png`

## Production rule
Do not merge this branch into `main` until the remaining functional and build checks pass.
