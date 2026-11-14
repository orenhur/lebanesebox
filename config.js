'use strict';
// TODO: confirm parent brand, prices, offer and ship-to countries before launch.
window.SITE_CONFIG = Object.freeze({
 MODE: 'waitlist',
 PARENT_NAME: 'Hand to Hand',
 TAGLINE: 'Authentic products from small businesses, rebuilding.',
 PRICES: { monthly: 39, firstMonth: 31.2, oneTime: 45, currency: 'USD' },
 OFFER_TEXT: '20% off your first box',
 SHIPS_TO: ['United States','Canada','United Kingdom','Australia'],
 EMAIL: 'hello@minelalb.example',
 // TODO: supply Stripe-hosted TEST payment links; never use live links or private keys here.
 STRIPE_TEST_LINKS: { monthly: '', once: '' }
});
if (/\/checkout\.html$/.test(location.pathname) && window.SITE_CONFIG.MODE !== 'live') {
 location.replace('/lebanon/#waitlist');
}
