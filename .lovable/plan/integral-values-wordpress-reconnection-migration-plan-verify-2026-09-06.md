# Integral Values — WordPress reconnection & migration plan (verify-only turn)

## 1. Connector access: NOT yet working

The WordPress connection "Lovable Master" exists in the workspace and is available, but it is **not linked to this project**, and a read test through it failed:

```
HTTP 401 — "Le mot de passe fourni n'est pas un mot de passe d'application valide."
```

So the stored username/application password for integralvalues.eu is invalid or expired. Nothing can be read or written through the connector until that is fixed.

Public (unauthenticated) reads of the site do work, which is how the inventory below was gathered.

## 2. Current WordPress inventory (36 pages, read publicly)

Structure exists, content is almost entirely empty:

- **Home sections** (block/section pages): home-hero (~300 chars), home-intro, home-journey, home-works, home-dimensions, home-values, home-testimonials, home-faq, home-cta, home-founder, home-trust, site-cta — most are 0–80 characters, i.e. titles only.
- **Main pages, all empty (0 chars):** about, our-method, works, psyche, for-you, contact, booking-info, plus duplicates works-2, psyche-2, contact-2.
- **Works children:** coaching, care-therapy, cross-culture, core — each ~90 chars (a tagline only).
- **Legal, all empty:** privacy-notice, terms, ethics-confidentiality.
- **Social stubs:** linkedin, instagram, youtube (empty).
- **WooCommerce present:** shop, cart, checkout, my-account.
- **Missing entirely vs MASTER:** WHO-5, Wheel of Life, Affiliate, Affiliate status, Apply.

Amelia's presence/config cannot be confirmed without authenticated access.

## 3. MASTER route inventory (source of truth)

Public: `/` (home), `/about`, `/method`, `/works`, `/coaching`, `/counselling`, `/cross-culture`, `/core`, `/psyche`, `/for-you`, `/contact`, `/who5`, `/wheel`, `/affiliate`, `/affiliate/status`, `/apply`.
Internal: `/admin/applications`, email routes under `/lovable/email/...`.

## 4. What can and cannot be synchronized — the honest technical line

**Can be pushed through the connector (once auth works):**
- Page titles, slugs, hierarchy, status, menus order via page parents.
- Text content: headings, paragraphs, lists, quotes, FAQ text, testimonials — as Gutenberg blocks or classic HTML.
- Media: images/video uploaded to the WordPress media library and referenced in content.
- SEO fields (titles/descriptions) if an SEO plugin exposes REST fields.

**Cannot be pushed through the connector — requires real theme/template work:**
- The MASTER look and feel itself. The React design does **not** become a WordPress theme automatically. Layout, typography scale, the lavender video hero, the four-dimension circle, the animated I.N.T.E.G.R.A.L. values, reveal animations, the sticky mobile CTA and the footer shell all have to be rebuilt as a block theme / page-builder templates or as a custom child theme.
- Interactive app features: WHO-5 scoring, Wheel of Life chart + saved history, the multi-step /apply flow with email confirmation, referral tracking, and the admin applications dashboard. These are application logic backed by the current database — in WordPress they would need either custom plugin development or to stay hosted by this project and be embedded/linked from WordPress.
- Auth-gated areas and the current email templates.

**Amelia** remains the future source of truth for appointments, availability and payments; nothing in this plan writes to or replaces booking data. Booking CTAs would eventually point at the Amelia page on WordPress.

## 5. Exact safest next step (single step, no writes)

Fix connector authentication, then re-verify with a read:

1. In WordPress admin for integralvalues.eu, create a **new Application Password** for an Administrator user (Users → Profile → Application Passwords).
2. Update the "Lovable Master" WordPress connection in workspace connector settings with that username + new application password.
3. I then link the connection to this project and run one read-only call (`GET /users/me` and `GET /pages`) to confirm authenticated access, plus `GET /wp-json` to list installed namespaces (confirms WooCommerce/Amelia).

Nothing else happens until that read succeeds. No WordPress writes, no DNS, no deployment, no changes to integralvalue.co.

## 6. Proposed sequence after verification (for approval later, not now)

1. **Full backup snapshot** of the WordPress site on Hostinger (files + database) before any write.
2. **Content-only dry run:** export MASTER page copy into a structured file for review; nothing published.
3. **Draft-first push:** create/update WordPress pages as **drafts** only, never overwriting a page that already has content, and never deleting existing pages. Duplicates (works-2, psyche-2, contact-2) reviewed manually, not auto-removed.
4. **Theme/template decision:** choose between a custom child theme built to match MASTER, or a block-theme/page-builder rebuild. This is the real design work and is separate from content sync.
5. **App features decision:** for WHO-5, Wheel, Affiliate and Apply — either keep them on this project under a subdomain and link from WordPress, or commission plugin development.
6. **Booking:** wire all booking CTAs to Amelia.
7. **Cutover:** only after the WordPress site visually and functionally matches, review DNS as a separate approved step.
