import {createRoot} from 'react-dom/client';
import {BoxOrbitCarousel} from './BoxOrbitCarousel';
import type {BoxItem} from './BoxOrbitCarousel';
declare global {interface Window{__BOX_CAROUSEL_ITEMS?:BoxItem[];SITE_CONFIG:{MODE:string;BOX_ITEMS_MODE:string};__BOX_CAROUSEL_MOUNTED?:boolean}}
const mount=document.getElementById('box-carousel'),items=window.__BOX_CAROUSEL_ITEMS||[];
if(mount&&items.length&&!window.__BOX_CAROUSEL_MOUNTED){
 try{
  const root=createRoot(mount),live=window.SITE_CONFIG.MODE==='live';
  root.render(<BoxOrbitCarousel items={items} loop={true} fontSrc={null} pinScroll={false} actionText={live?'Choose Your Box':'Add to Wishlist'} actionHref={live?'#pricing':'#waitlist'}/>);
  // The fallback stays available until the carousel has actually painted.
  let attempts=0;const ready=()=>{if(mount.querySelector('.dsh-root')){window.__BOX_CAROUSEL_MOUNTED=true;document.getElementById('box-items-fallback')?.setAttribute('hidden','');}else if(++attempts<60)requestAnimationFrame(ready);};requestAnimationFrame(ready);
 }catch{mount.replaceChildren();}
}
