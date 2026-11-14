'use strict';
// Shared browser export. All content must be verified before enabling a country.
// enabled: publish only after sourcing, consent, local review and legal review.
// intro: a short, reviewed introduction; leave empty until approved.
// sections: { heading, body, sourceIds: [] }; each sourceId must resolve to a complete source below.
// photos: { src, alt, caption, creditName, creditUrl, license, takenAt, consent, sensitive }.
// src/alt describe the supplied image; caption/creditName/license document permission and context.
// creditUrl links to the rights holder; takenAt is the supplied capture date, never inferred.
// consent is "yes" or "not applicable"; sensitive:true requires explicit reveal, hidden initially.
// howItHelps: { text, items: [{ text, sourceIds: [] }] }; only fully sourced statements may be shown.
// sources: [{ id, name, url, asOf }]; use primary sources and explicit as-of dates.
// lastReviewed/reviewer: the approved review date and the responsible reviewer's name.
window.SITUATION = Object.freeze({
 lebanon: { enabled: false, intro: '', sections: [], photos: [], howItHelps: { text: '', items: [] }, sources: [], lastReviewed: '', reviewer: '' }
});
