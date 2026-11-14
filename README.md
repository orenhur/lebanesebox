# Country collections / Min El Alb

Plain HTML, CSS and vanilla JavaScript; no build step or project dependencies.

## Run

```sh
cd /workspace/lebanesebox
python3 -m http.server 3002 --bind 0.0.0.0
```

On that computer, open http://localhost:3002. The global page is /; the Lebanon collection is /lebanon/. Root-relative links require serving the folder, rather than opening files directly.

## Configuration

config.js exports window.SITE_CONFIG: MODE applies only to Lebanon and checkout. It defaults to waitlist. Shared prices, offer, ship-to countries, email, parent name and Stripe TEST links live here. countries.js exports window.COUNTRIES and context.js exports window.CONTEXT for all pages. These classic-script browser exports preserve simple static hosting.

Waitlist mode hides all Lebanon prices, offers, comparison, guarantee and purchase links; checkout redirects to /lebanon/#waitlist. Live mode enables those blocks. A valid Stripe-hosted test link is required to leave checkout; the code accepts only https://buy.stripe.com/test_... URLs and never collects cards.

## Deploy

Upload the complete project directory to Netlify Drop, or connect this repository to Netlify with an empty build command and publish directory `.`. Netlify must detect the three static forms: interest, lebanon-interest and makers. Verify real submissions and spam handling in the Netlify dashboard. Successful native form posts go to /thanks.html. Locally, forms validate but do not claim data was sent.

For CLI deployment (requires your own Netlify sign-in; these commands were not run):

```sh
cd /workspace/lebanesebox
npx --yes netlify-cli login
npx --yes netlify-cli deploy --dir .
# After verifying forms, legal pages and configuration on the draft URL:
npx --yes netlify-cli deploy --dir . --prod
```

Vercel can host the static pages with Framework Other, no build command and output directory `.`; Netlify Forms will not process submissions there. A form backend must be configured before using Vercel for real signups.

Update the real domain in sitemap.xml and robots.txt before publishing to search engines. Keep MODE waitlist until the requirements in TODO.md are complete. No deployment, live signup delivery or Stripe transaction has been performed by setup.

The theme and offer dismissal tolerate unavailable storage. All fonts and fallback artwork are local; font licenses are in assets/.
