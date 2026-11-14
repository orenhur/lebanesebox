# Editorial redesign verification

Tested against the repository served locally with Python's static HTTP server, using Chromium and the environment's Playwright tools. No application dependencies were added.

## Mobile Lighthouse

| Page | Performance | Accessibility | SEO |
| --- | ---: | ---: | ---: |
| Homepage | 100 | 100 | 100 |
| Lebanon | 92 | 100 | 100 |

The final audited pages use the lightweight editorial foundation and responsive lossless logo display derivatives. These are local audit results, not measurements of the deployed Netlify site. Server caching and real network conditions may differ.

## Checks actually run

- Both pages at 360, 390, 768, 1280 and 1440px, light and dark: no horizontal overflow, intersecting visible text blocks, or viewport-clipped text. Representative full-page screenshots were visually reviewed after loading all images.
- Computed text contrast across both themes and all five widths, using 4.5:1 for normal text and 3:1 for large text.
- All main-page links resolve to local routes and existing fragment IDs. Sticky-header offsets tested at mobile, tablet and desktop widths.
- Mobile menu opening, first-link focus, Escape close/focus restoration, theme toggle and persistence.
- Lebanon transition: six bitmap stages, exact full-resolution final frame, cancellation, approximately 1.9-second navigation, reduced-motion bypass, browser back/forward, no lingering inert header.
- Waitlist remains the actual configured mode. A temporary in-memory live MODE fixture verified hidden waitlist, visible pricing, offering link destinations and preserved checkout route; config.js was not edited.
- Both existing interest forms: required-field and email validation, focus on the first invalid field, Other-country selection, native POST payloads, form-name/honeypot metadata and thanks.html. Submissions used a local production-like handler fixture, not Netlify or real customer details.
- Native FAQ expansion and Peek inside open/close; static LebanonProductShowcase boundary present without a slider.
- Real scrolling loads every lazy image. A deliberately failed hero-image request successfully loads the SVG fallback with matching alt text.
- No-JavaScript headings, forms, country navigation fallback and mobile layout.
- No browser runtime JavaScript errors in the functional flow.
- JavaScript syntax checks for every root JS file and existing scripts/*.cjs. git diff --check passed.
- Unique HTML IDs, one H1 per redesigned page, preserved form settings, and byte-for-byte unchanged config, country data, context data, Situation data, advisors data and official logo masters.

There is no build, TypeScript or lint configuration in the existing static repository, so no such checks are claimed. Safari/Firefox, a real Netlify submission, payment processing and public deployment were not tested in this environment. The new optional image reveal never hides content before JavaScript executes and is bypassed for reduced motion.

## Remaining launch work

See REDESIGN.md and TODO.md. Supply the future 21st.dev source; confirm actual products, partners, pricing, shipping and terms before enabling sales; configure and verify payment links and real contact details; verify Netlify delivery; set social-preview URLs to the confirmed public domain. Concept imagery is explicitly disclosed and is not confirmed inventory.

## Box-item carousel follow-up

The supplied orbit animation is now integrated only into the Lebanon box-item section. The previous general redesign checks above describe the earlier checkpoint; its former Peek inside packaging UI was replaced inside this section by the requested carousel.

- Local mobile Lighthouse for `/lebanon/`: Performance **91**, Accessibility **100**, SEO **100**. The previous redesign audit measured 92/100/100, so the observed Performance score is one point lower. These local scores can vary between runs.
- A separate audit with the carousel mounted at `#box-items` measured Accessibility **100** and SEO **100**.
- The bundle is not requested in the initial viewport; IntersectionObserver loads it near the section. Production build checks enforce one minified JS chunk, no separate CSS, no source map and no ScrollTrigger module in the default file.
- Six items checked at 360, 768, 1280 and 1600px, in light and dark. No horizontal page overflow or clipped titles. Every item type switches through arrows, pager, thumbnails, keyboard and product-image swipe; looping and About/Made with tabs work. Text and category-badge contrast met AA across all six items in both themes.
- Normal-motion GSAP rotation was observed. Reduced-motion tests switched instantly without swing or wipe. Source comparison confirmed that the supplied swap timeline is unchanged apart from comments/data naming; SWING and arc geometry are retained.
- Examples suppress maker data even when deliberately injected into an example during a browser test. Actual production data contains exactly six generic types, no maker names and no photos.
- Real mode with no eligible items and hidden mode remove the section and its page links. Three temporary in-memory real entries with existing local image assets displayed maker fields and Meet the maker; entries with missing names/images were excluded. All fixtures remained outside production data.
- Static fallback generation was tested in an isolated temporary directory: examples (six), real with zero qualifying items (hidden), hidden, real with three qualifying entries, and real with only two (hidden). Actual no-JavaScript and failed-bundle browser tests both displayed the six-item fallback.
- Existing live MODE still chooses Choose your box/#pricing, while the actual waitlist MODE chooses Join the waitlist/#waitlist. Neither MODE logic nor existing config values changed.
- Protected section copy, forms/Netlify markup, homepage, branding transition, logo masters, shared styles, context, Situation and advisors remain unchanged. Only BOX_ITEMS_MODE is added to configuration, alongside the required section/anchor hooks.
- TypeScript checking, Vite production build, browser runtime checks and git diff --check passed. Rebuilding after config/data changes refreshes the HTML fallback needed by JavaScript-disabled visitors.

- Final widget artifact: 231,985 bytes minified; 79,613 bytes gzip. An actual emulated mobile touch gesture also advanced the item and produced the requested live announcement.

## Mission-first messaging update

Updated the homepage, Lebanon hero/story/product/waitlist messaging, five mission/status FAQs, footer descriptions, supporting-page introductions, CTA labels and metadata. The product carousel, illustration data, images, official logo, CSS, forms and underlying MODE gates are retained. The existing story and carousel sections carry the requested Every Box Holds a Story and Made to Taste/Made to Keep headings; no sections or pages were added.

- Main routes checked at 360, 768, 1280 and 1600px in light and dark: no clipped or overlapping text or horizontal scrolling. Representative screenshots reviewed.
- Supporting pages checked at 360 and 1280px in light and dark; all expanded FAQ questions/answers also fit all four widths.
- Support Lebanon uses the existing six-stage automatic transition without Skip/Cancel controls. Reduced-motion navigation is preserved.
- Native FAQ toggles, carousel navigation, generic-example disclaimer, mobile menu, theme toggle, form validation/focus, all revised route/fragment targets and both MODE destinations tested. Live checkout visibility tested with an in-memory config fixture only.
- Form fields/settings, original image files, SVG artwork, style files, config values, sourced context, consent/visibility gates and the carousel/transition animation cores remain unchanged. Hero CTA label rendering preserves the existing arrow artwork.
- Em dashes were removed from revised HTML/metadata and generated text. The homepage hero has no eyebrow or extra decorative slogan.
- Local mobile Lighthouse: homepage **91/100/100** and Lebanon **100/100/100** for Performance/Accessibility/SEO. The shorter homepage headline brought its photo into the LCP area; an additional 672px delivery variant of that same original image restores the performance target without changing composition, displayed dimensions or layout. Original image files were not edited. A trial preload was removed after it did not improve the audit.
- TypeScript/widget production build, JavaScript syntax and git diff checks passed. The build regenerates the revised static product-section copy, so a later widget rebuild will retain the messaging.

Supplier/product confirmation, pricing/shipping/launch/policy details and real contact/payment setup still require owner verification. The new copy does not claim measured business impact or guaranteed growth. Hosted Netlify submission delivery and production deployment were not independently tested here.
