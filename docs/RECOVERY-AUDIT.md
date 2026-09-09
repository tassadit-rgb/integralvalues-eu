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
- [ ] Global V2 brand assets
- [ ] Header / footer
- [ ] Home
- [ ] About + founder portrait + V2 values
- [ ] Our Method + hero video + journey links
- [ ] Works
- [ ] Coaching
- [ ] Care & Therapy
- [ ] Cross-Culture
- [ ] CORE
- [ ] Psyché / WHO-5 / ASRS / Wheel
- [ ] For You memberships
- [ ] Contact
- [ ] Booking / Amelia pilot
- [ ] Affiliate / Apply / Status / Admin
- [ ] Supabase auth/data routes
- [ ] Metadata / legal marks / claims
- [ ] Asset existence audit
- [ ] Lovable dependency removal
- [ ] Build + route smoke test before merge to `main`
