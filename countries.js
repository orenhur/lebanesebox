'use strict';
// Shared browser export. TODO: confirm additional countries, including sanctions and export checks, before adding them.
// Each validated country gets a boxName (a warm local phrase followed by “Box”) and boxMeaning (its English meaning).
// Native speakers must check phrases before use. Do not create boxName for waitlist-only countries.
window.COUNTRIES = Object.freeze([
 {slug:'lebanon',name:'Lebanon',status:'first collection',boxName:'The Min El Alb Box',boxMeaning:'From the heart',shortLine:'Our first collection. We’re sourcing and validating Lebanese products.',pageUrl:'/lebanon/'},
 {slug:'other',name:'Other / suggest a country',status:'waitlist',boxName:'',boxMeaning:'',shortLine:'Tell us where you would like us to look next.',pageUrl:'/#interest'}
]);
