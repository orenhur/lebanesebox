# Hand to Hand editorial experience

The main site retains its static HTML/CSS/JavaScript architecture. The later box-item integration adds an isolated React/GSAP widget in widgets/box-carousel, compiled to a committed static JS file. No site-wide framework migration, hosted build service, payment service or backend was introduced.

## Shared design system

`experience-foundation.css` provides the lightweight font, reset, existing-interaction, Situation and transition foundation for the two redesigned pages. Their pages no longer download the accumulated legacy stylesheet. Other routes retain `styles.css`.

`experience.css` supplies reusable header, footer, buttons, editorial hero, split layout, feature band, section heading, steps, country cards, concept image, signup and closing CTA primitives. `data-experience="brand"` and `data-experience="lebanon"` select navy/ivory and olive/sage identities. These styles load only on the two redesigned pages; other pages keep their existing styles. Light and dark themes retain the shared toggle and storage behavior.

`experience.js` adds optional image fallback/reveals, a country image, social-title synchronization, mobile-menu focus, and the closing CTA label. Reduced-motion visitors get static images and ordinary navigation. Content is visible before enhancements run.

The exact official logo master files are unchanged. Proportional lossless display derivatives keep header/footer downloads small. Transition symbol layers isolate pixels from that artwork into transparent canvases; the final frame is the original full bitmap. The existing native-navigation transition retains cancellation, skipping, failure bypass, focus management, and reduced-motion behavior.

## Lebanon box showcase

The supplied 21st.dev orbit component now powers `#box-items` with mount point `#box-carousel`. The former `#inside` URL remains an alias, and `#makers` aliases the existing maker section. The widget has its own build-only dependencies and injects its CSS from one committed JS bundle; the rest of the site remains static. Flat SVG example types replace product photos in this section. See widgets/box-carousel/README.md for mode filtering, rebuilding the no-JavaScript fallback, accessibility and optional pinning constraints.

## Truthfulness and existing integrations

Concept scenes are documented in `assets/editorial/README.md` and labelled on both pages. No maker identities, partner claims, testimonials, impact figures, additional country launches or discounts were introduced. General business-model copy describes intent; sourcing and makers remain unconfirmed.

Original form names, field names, honeypots, hidden form-name values, POST method and Netlify attributes are preserved. Local handler tests can verify validation and payloads, but hosted Netlify dashboard delivery must be checked after deployment.

MODE, prices, shipping values, contact configuration, context data, Situation gates and advisor data are unchanged. The site remains in waitlist mode. Existing live-mode pricing and checkout are preserved behind MODE, but payments are not operational because public Stripe TEST links are empty. Confirm operations, prices, terms, shipping, legal review and payment handoff before enabling live mode. The existing .example contact address and sitemap domain also need real values before launch.

## Local verification

Serve the repository root with `python3 -m http.server 3007`. There is no build, TypeScript or lint configuration in this repository. Use `node --check` for browser JavaScript and browser tests for routing, forms, themes, accessibility and layout. Mobile Lighthouse audits can run against the local server. Do not interpret a local form fixture as successful delivery to Netlify, or a live MODE fixture as payment verification.
