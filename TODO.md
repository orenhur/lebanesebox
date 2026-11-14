# Before launch

- The parent name is Hand to Hand, pending domain, social handle and trademark checks. PARENT_NAME in config.js is the single source for the name. Replace the reserved example domain in sitemap.xml and add the real sitemap URL to robots.txt once confirmed.
- Confirm countries beyond Lebanon, with sanctions, export, customs and local compliance checks before adding entries to countries.js. Other entries must stay waitlist-only.
- Sign makers and validate products before claiming partnerships or opening sales. Lebanon is the first sourcing collection; there are no confirmed makers or products yet.
- Supply original photos in assets/images: hero-box.jpg, maker-1.jpg, maker-2.jpg, maker-3.jpg, team.jpg, product-snacks.jpg, product-sweets.jpg, product-crafts.jpg, product-skincare.jpg, product-ceramics.jpg. Missing files use the original SVG fallback.
- Add only verified customer reviews; hidden review templates are empty.
- Confirm PRICES, OFFER_TEXT and SHIPS_TO in config.js. Current numbers and destinations are unconfirmed. MODE must remain waitlist until operations and payment are ready.
- Confirm shipping destinations, charges, delivery times, taxes, duties and export requirements for each collection.
- Validate food and skincare ingredients, customs restrictions, labeling, allergens, certifications and country-specific import rules.
- Confirm guarantee terms, the 14-day contact period, cancellation terms and an actual support process before enabling live mode.
- Obtain legal review of terms.html, privacy.html, shipping.html and contact.html, including Netlify Forms data retention and consent handling.
- Create real Stripe TEST Payment Links for the monthly and one-time products, including correct introductory subscription pricing, shipping/tax handling and required address collection. Add the two public test links to STRIPE_TEST_LINKS in config.js. No Stripe credentials, SDK or working payment integration existed in the original project. Live-mode form validation is implemented, but a real Stripe handoff remains unverified until valid test links are supplied. Never use live links or put Stripe secret keys in browser files. A later backend integration will need server-only Stripe keys, verified webhooks, order fulfillment and subscription management.
- Deploy to Netlify with Forms detection enabled; verify interest, lebanon-interest and makers submissions in the Netlify dashboard. Local POST payload tests do not verify hosted delivery. Publish privacy and unsubscribe workflows before collecting real signups.
- Configure a real EMAIL mailbox in config.js; the reserved .example address cannot receive mail.
- Supply social links, a regional advisor to review context copy, and verified context facts and primary sources supplied by the project owner. context.js deliberately contains no facts, statistics, dates, blame or named parties.
- Add 3-4 owner-supplied context facts with sourceName, sourceUrl, asOf and text. Do not fill gaps from memory. Confirm the regional context with a qualified advisor.
- Confirm the support response time before adding a reply-within promise to the first-box guarantee. No response-time value is currently configured.

## Founder note

- Supply [FOUNDER NAME] and [ONE TRUE DETAIL ABOUT WHY LEBANON] in founderNote.name and founderNote.detail in config.js. Use an approved first-person statement. The note remains hidden until both real values are supplied. No founder identity or motive has been invented.

## Situation content

- Gather verified facts with primary sources and as-of dates before filling situation.js.
- Obtain licensed or permissioned photos with credits and captions; check consent for identifiable people and mark sensitive images explicitly.
- Have a Lebanese reviewer approve the copy and get legal review for statements about how purchases help.
- Add reviewer and lastReviewed values. Set enabled:true only after these checks are complete.
- Only fully sourced sections render. How-it-helps statements must live verbatim in sourced items; free-standing prose cannot add an unsourced impact claim or number.

## Advisor consent checklist

- Obtain written permission for each person's name, photo, title, organization, bio and links.
- Confirm the exact title and organization wording they want shown, and confirm removal on request.
- Keep written consent records outside this repository; publish only the approved consent metadata.
- Check whether the person's employer requires approval for an outside role. Do not list government officials or employees of UN agencies, NGOs, banks, news outlets or other organizations without confirming they are permitted to participate.
- For Lebanon and other sensitive regions, confirm comfort with being publicly named and consider displayMode:limited. Browser data files are public: omit any information that is not approved for publication even when the UI hides it.
- Set visible:false and redeploy to remove an advisor immediately. Re-run node scripts/update-sitemap.cjs after changing advisor data and before deployment. The static sitemap cannot evaluate browser-side JavaScript.
- Set ADVISORS_SETTINGS.enabled:true only after at least one approved advisor has complete consent and biography fields.
