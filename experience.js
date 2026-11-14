'use strict';
// Small, optional enhancements. Content, navigation and forms remain native HTML.
(() => {
 const experience=document.body.dataset.experience;
 if(!experience)return;
 document.querySelectorAll('[data-editorial-image]').forEach(image=>{const fallback=()=>{image.removeAttribute('srcset');image.alt='An outline of a parcel on warm paper';image.src='/assets/images/fallback.svg';};image.addEventListener('error',fallback,{once:true});if(image.complete&&!image.naturalWidth)fallback();});
 const card=document.querySelector('.country-card[data-country="lebanon"]');
 if(card){
  card.querySelector('.country-brand-symbol')?.remove();
  const image=document.createElement('img');
  image.className='country-photo';image.src='/assets/editorial/lebanon-collection-800.webp';
  image.srcset='/assets/editorial/lebanon-collection-480.webp 480w, /assets/editorial/lebanon-collection-800.webp 800w, /assets/editorial/lebanon-collection-1200.webp 1200w';
  image.sizes='(max-width:767px) calc(100vw - 40px), 55vw';image.width=1536;image.height=1024;image.loading='lazy';
  image.alt='Concept Lebanese-inspired collection of ceramics, coffee, spices and soap';
  image.addEventListener('error',()=>{image.removeAttribute('srcset');image.alt='An outline of a parcel on warm paper';image.src='/assets/images/fallback.svg';},{once:true});
  const frame=document.createElement('figure');frame.className='country-photo-frame';frame.append(image);card.prepend(frame);
 }
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
 if(menu&&nav){
  const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
  document.addEventListener('click',event=>{if(!event.target.closest('header'))close();});
  nav.addEventListener('keydown',event=>{if(event.key==='Tab'&&menu.getAttribute('aria-expanded')==='true'){
   const links=[...nav.querySelectorAll('a')];if(event.shiftKey&&event.target===links[0]){event.preventDefault();menu.focus();}else if(!event.shiftKey&&event.target===links.at(-1)){close();}
  }});
  window.matchMedia('(min-width:1200px)').addEventListener('change',close);
 }
 const title=document.title;
 document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(meta=>{meta.content=title;});
})();
// Keep native MODE destinations while giving the closing collection CTA its editorial label.
if(document.body.dataset.experience==='lebanon'&&SITE_CONFIG.MODE!=='live'){
 const closing=document.querySelector('.closing-section .collection-buy');
 if(closing)closing.textContent='Join the Waitlist';
}
const experienceMenu=document.querySelector('[data-experience] .menu-toggle');
experienceMenu?.addEventListener('click',()=>{if(experienceMenu.getAttribute('aria-expanded')==='true')document.querySelector('#navigation a')?.focus();});
// Animate only when an already-visible image enters; never hide content before JS runs.
if(document.body.dataset.experience&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.animate?.([{opacity:.65,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:380,easing:'ease-out'});
  observer.unobserve(entry.target);
 }),{threshold:.12});
 document.querySelectorAll('[data-editorial-image][loading=lazy],.country-photo').forEach(image=>observer.observe(image));
}
