(function(){
 'use strict';
 var section=document.getElementById('box-items');if(!section)return;
 var mode=window.SITE_CONFIG&&window.SITE_CONFIG.BOX_ITEMS_MODE,tools=window.BOX_ITEM_TOOLS,items=window.BOX_ITEMS;
 var links=Array.from(document.querySelectorAll('a[href]')).filter(function(a){try{var u=new URL(a.href,location.href);return u.origin===location.origin&&/\/lebanon\/(?:index\.html)?$/.test(u.pathname)&&['#inside','#box-items'].includes(u.hash);}catch{return false;}});
 function hide(){links.forEach(function(a){a.remove();});section.remove();}
 if(mode==='hidden'){hide();return;}if(!tools||!Array.isArray(items))return;
 function prepare(item,src){return Object.assign({},item,{displaySrc:src});}
 function render(list,real){
  if(!list.length){hide();return;}section.hidden=false;links.forEach(function(a){a.hidden=false;});
  section.querySelector('[data-box-description]').textContent=real?tools.realLine:tools.exampleLine;
  var fallback=document.getElementById('box-items-fallback');fallback.replaceChildren();
  list.forEach(function(item){var li=document.createElement('li'),img=document.createElement('img'),copy=document.createElement('div'),title=document.createElement('h3'),about=document.createElement('p');img.src=item.displaySrc;img.alt=item.image.alt;img.width=120;img.height=120;img.loading='lazy';title.textContent=item.titleLight+' '+item.titleBold;about.textContent=item.about;copy.append(title,about);li.append(img,copy);fallback.append(li);});
  window.__BOX_CAROUSEL_ITEMS=list;
  var started=false;function load(){if(started)return;started=true;var script=document.createElement('script');script.src='/assets/js/box-carousel.js';script.defer=true;script.onerror=function(){started=false;};document.head.append(script);}
  if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){if(entries.some(function(e){return e.isIntersecting;})){observer.disconnect();load();}},{rootMargin:'300px 0px'});observer.observe(section);}else load();
 }
 if(mode==='examples'){render(items.filter(function(item){return item.example===true;}).map(function(item){return prepare(item,tools.shape(item));}),false);return;}
 if(mode!=='real'){hide();return;}section.hidden=true;links.forEach(function(a){a.hidden=true;});
 var candidates=items.filter(function(item){return item.example===false&&item.maker&&typeof item.maker.name==='string'&&item.maker.name.trim()&&item.image&&typeof item.image.src==='string'&&item.image.src.startsWith('/assets/')&&!item.image.src.includes('..');});
 if(candidates.length<3){hide();return;}
 Promise.all(candidates.map(function(item){return new Promise(function(resolve){var image=new Image(),done=false,timer=setTimeout(function(){finish(false);},12000);function finish(valid){if(done)return;done=true;clearTimeout(timer);resolve(valid?prepare(item,item.image.src):null);}image.onload=function(){finish(image.naturalWidth>0);};image.onerror=function(){finish(false);};image.src=item.image.src;});})).then(function(results){var valid=results.filter(Boolean);if(valid.length<3)hide();else render(valid,true);});
})();
