# Integral Values — WordPress theme

A classic WordPress theme that reproduces the master site's look and feel
(Cormorant Garamond + Inter, midnight blue / purple / fuchsia / turquoise,
rounded cards, editorial rows, sticky header, midnight footer).

## Install

1. Zip the `integral-values` folder (a build is already produced at
   `/mnt/documents/integral-values-theme.zip`).
2. WordPress admin → Appearance → Themes → Add New → Upload Theme → Activate.
3. Appearance → Menus: create a "Primary menu" and a "Footer menu", assign them
   to the theme locations.
4. Appearance → Customize → Integral Values:
   - Booking URL (point it to the Amelia page once Amelia is installed)
   - Homepage hero video (upload the lavender MP4 to Media, paste its URL)
   - Homepage hero image, founder portrait, and the four pillar images
5. Settings → Reading: set the homepage to a static page (the theme's
   `front-page.php` renders the designed homepage regardless of that page's content).

## What the theme covers vs what the connector covers

- Theme (this folder): layout, typography, colours, homepage composition,
  header/footer, page hero, cards, buttons.
- Connector push: page text only (title, lead/excerpt, body HTML) as drafts.
- Not covered: the interactive app features (WHO-5, Wheel of Life, the Apply
  flow and the affiliate admin dashboard). Those stay on the Lovable app or need
  dedicated WordPress plugins.
- Booking/payments remain Amelia's responsibility once it is installed.
