'use strict';
// The native destination keeps history intact. This short curtain prevents a flash between documents.
try {
 const key='handtohand:enter-lebanon';
 const saved=JSON.parse(sessionStorage.getItem(key)||'null');
 sessionStorage.removeItem(key);
 const normalise=path=>path.replace(/\/index\.html$/,'/').replace(/\/$/,'');
 const back=performance.getEntriesByType('navigation')[0]?.type==='back_forward';
 if(saved&&!back&&Date.now()-saved.at<5000&&normalise(location.pathname)===normalise(saved.path)&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('brand-arrival-pending');
} catch {}
