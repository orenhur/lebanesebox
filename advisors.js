'use strict';
// Shared browser exports. No person is listed until permission and exact wording are confirmed.
// id: stable internal identifier; name: the person's approved public name.
// role: approved role; title and organization: their exact chosen wording, without logos.
// region: "Global", "Lebanon", or a country slug from countries.js.
// expertise: short approved description; bio: approved 2–4 sentence biography.
// photo: { src, alt, credit }; use only a supplied, permissioned image; absence uses initials.
// links: [{ label, url }]; supplied public HTTPS URLs and their approved labels.
// consent: { given:false, date:'', method:'' }; date/method record permission metadata only.
// Keep the actual written consent records outside this repository.
// displayMode: "full" by default; "limited" exposes first name, role and region only.
// visible:false by default. To remove someone immediately, set visible:false and redeploy.
window.ADVISORS = [];
window.ADVISORS_SETTINGS = { enabled: false, heading: 'Our advisors', intro: '' };
// Shared predicate for browser rendering and the dependency-free sitemap helper.
window.visibleAdvisors = function(entries){return (Array.isArray(entries)?entries:[]).filter(a=>a&&a.visible===true&&a.consent&&a.consent.given===true&&[a.name,a.bio,a.consent.date].every(v=>typeof v==='string'&&v.trim())&&[a.title,a.organization].some(v=>typeof v==='string'&&v.trim()));};
