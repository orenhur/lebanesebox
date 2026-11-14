// Adapted from 21st.dev dish-orbit-carousel. Original embedded Outfit: SIL Open Font License 1.1; font data omitted.
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import type {KeyboardEvent,PointerEvent} from 'react';
import {gsap} from 'gsap';
import type {ScrollTrigger as ScrollTriggerInstance} from 'gsap/ScrollTrigger';
import {carouselCSS} from './styles';
export type BoxItem={id:string;titleLight:string;titleBold:string;category:string;label:string;about:string;madeWith:string[];example:boolean;maker:{name:string;business:string;town:string};image:{src:string;alt:string};accent:string;displaySrc:string};
export type BoxOrbitCarouselProps={items:BoxItem[];loop?:boolean;fontSrc?:string|null;pinScroll?:boolean;height?:string;actionText:string;actionHref:string;onChange?:(index:number)=>void};
// #region carousel
export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0
  return ((Math.round(i) % n) + n) % n
}

/** Which way to swing when jumping from one item to another: the shorter way round. */
export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1
  const fwd = (((to - from) % n) + n) % n
  return fwd <= n - fwd ? 1 : -1
}

/** Scroll stretches in the section: one per item change, plus one back round to the first when looping. */
export function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1)
}

/** The scroll stretch for item `i` nearest the current one (when looping, item 0 is also the last stretch). */
export function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i
}

/** First thumbnail shown in the strip window, keeping the current one in view. */
export function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0
  if (visible === 1) return index
  return Math.max(0, Math.min(index - 1, n - visible))
}

/** Title font size so a line of `chars` characters fits `width` px at `em` average glyph width. */
export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em))
}
/**
 * The pastel band: a thick stroke along the plates' orbit circle, tapering at
 * both ends. Angles in degrees, screen space (0 = right, 90 = straight down).
 */
export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = []
  const inner: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45)
    const c = Math.cos(a)
    const s = Math.sin(a)
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1))
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1))
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z"
}

/** Where the band rests for each item, as [start, end] angles along the orbit. Measured off the reference. */
export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]]
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length]
}

/** The band mid-swap: it stretches to trail between the outgoing and incoming plate. */
export const ARC_SWEEP = [38, 146]
// #endregion

const ORBIT_X=299,ORBIT_Y=-450,ORBIT_R=650;
const SCROLL_PER_DISH=.7;
const SWING=50;
const ITEM=118,VISIBLE=4;
const HIDE_1='inset(0% 0% 0% 100%)',HIDE_2='inset(0% 100% 0% 0%)',SHOW='inset(0% 0% 0% 0%)';
export function BoxOrbitCarousel({items,loop=true,fontSrc=null,pinScroll=false,height='100svh',actionText,actionHref,onChange}:BoxOrbitCarouselProps){
 const n=items.length;
 const [index,setIndex]=useState(0),[tab,setTab]=useState('about');
 const [titleWidth,setTitleWidth]=useState(330),[visible,setVisible]=useState(VISIBLE),[canPin,setCanPin]=useState(false);
 const trackRef=useRef<HTMLDivElement|null>(null),rootRef=useRef<HTMLDivElement|null>(null),headRef=useRef<HTMLDivElement|null>(null),winRef=useRef<HTMLDivElement|null>(null),stripRef=useRef<HTMLDivElement|null>(null);
 const stRef=useRef<ScrollTriggerInstance|null>(null),segRef=useRef(0),indexRef=useRef(0),onChangeRef=useRef(onChange);
 onChangeRef.current=onChange;
 const orbits=useRef<(HTMLDivElement|null)[]>([]),heads=useRef<(HTMLDivElement|null)[]>([]),bodies=useRef<(HTMLDivElement|null)[]>([]);
 const arcRef=useRef<SVGPathElement|null>(null),arc=useRef({a0:0,a1:0}),shown=useRef(-1),dirRef=useRef<1|-1>(1),tlRef=useRef<gsap.core.Timeline|null>(null);
 const reducedRef=useRef(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 const swipe=useRef<{x:number;y:number}|null>(null);
 useLayoutEffect(()=>{const fit=()=>{if(headRef.current)setTitleWidth(headRef.current.clientWidth);if(stripRef.current){const strip=stripRef.current,arrow=strip.querySelector('button'),gap=parseFloat(getComputedStyle(strip).columnGap)||0;setVisible(Math.min(VISIBLE,Math.max(1,Math.floor((strip.clientWidth-2*(arrow?.getBoundingClientRect().width||44)-2*gap)/ITEM))));}};fit();const observer=new ResizeObserver(fit);if(headRef.current)observer.observe(headRef.current);if(stripRef.current)observer.observe(stripRef.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)'),wide=matchMedia('(min-width: 768px)');const update=()=>{reducedRef.current=mq.matches;if(mq.matches&&tlRef.current)tlRef.current.progress(1).kill();setCanPin(Boolean(pinScroll&&__BOX_PIN_SCROLL__&&wide.matches&&!mq.matches));};update();mq.addEventListener('change',update);wide.addEventListener('change',update);return()=>{mq.removeEventListener('change',update);wide.removeEventListener('change',update);};},[pinScroll]);
  // The swap. Every item is in the DOM; GSAP only moves the outgoing and incoming ones.
  useLayoutEffect(() => {
    if(!n)return
    const from = shown.current
    const to = index
    const parts = (i: number) => {
      const head = heads.current[i]
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        body: bodies.current[i],
      }
    }
    // Writes the band's path only; no layout is read.
    const drawArc = () => arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118))
    const rest = arcRest(to)
    const tint = items[to] ? items[to].accent : "transparent"
    if (tlRef.current) tlRef.current.progress(1).kill()
    const b = parts(to)
    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++) if (i !== to) {
        const p = parts(i)
        gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 })
      }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 })
      gsap.set(b.t1, { clipPath: SHOW })
      gsap.set(b.t2, { clipPath: SHOW })
      arc.current.a0 = rest[0]
      arc.current.a1 = rest[1]
      drawArc()
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint })
      shown.current = to
      return
    }
    const a = parts(from)
    const d = dirRef.current
    const tl = gsap.timeline({ onComplete: () => { tlRef.current = null } })
    tlRef.current = tl
    // plate: out over the top on the orbit, the next one swings in from the far side
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3)
    // title: thin line clips away to the right, heavy line to the left, then the next wipes in
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62)
    // card: cross-fade, the incoming rows rise in turn
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power1.in" }, 0.05)
      .set(b.body, { autoAlpha: 1, y: 0 }, 0.4)
    if (b.body) tl.fromTo(b.body.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.4)
    // the band stretches along the orbit with the plates, then settles into the next item's span, morphing colour
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc }, 0)
      .to(arc.current, { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc }, 0.6)
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1)
    shown.current = to
  }, [index, n, items])

  useEffect(() => () => { tlRef.current?.kill() }, [])


 const select=(next:number,dir:1|-1)=>{if(next===indexRef.current)return;dirRef.current=dir;indexRef.current=next;setIndex(next);onChangeRef.current?.(next);};
 const steps=scrollSteps(n,loop);
 // The optional original pinned behavior is excluded from the default production bundle.
 useEffect(()=>{
  if(!__BOX_PIN_SCROLL__||!canPin||steps<1)return;
  let cancelled=false,dispose=()=>{};
  void import('gsap/ScrollTrigger').then(({ScrollTrigger})=>{
   if(cancelled)return;gsap.registerPlugin(ScrollTrigger);const track=trackRef.current;if(!track)return;
   const trigger=ScrollTrigger.create({trigger:track,start:'top top',end:'bottom bottom',snap:{snapTo:1/steps,duration:{min:.3,max:.8},delay:.08,ease:'power2.inOut'},onUpdate:self=>{
    if(loop&&self.progress>=1&&self.direction>0){segRef.current=0;self.scroll(self.start+1);select(0,1);return;}
    const seg=Math.round(self.progress*steps);if(seg===segRef.current)return;const dir=seg>segRef.current?1:-1;segRef.current=seg;select(wrapIndex(seg,n),dir);
   }});
   let raf=0;const onWheel=(event:WheelEvent)=>{const y=trigger.scroll();if(!loop||event.deltaY>=0||y<trigger.start-1||y>trigger.start+1)return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{segRef.current=n-1;trigger.scroll(trigger.start+((trigger.end-trigger.start)*(n-1))/steps);select(n-1,-1);});};
   window.addEventListener('wheel',onWheel,{passive:true});stRef.current=trigger;
   dispose=()=>{cancelAnimationFrame(raf);window.removeEventListener('wheel',onWheel);trigger.kill();stRef.current=null;};
  });return()=>{cancelled=true;dispose();};
 },[canPin,steps,loop,n]);
  // Buttons, keys and swipes jump to a item and move the scroll to its stretch, so the two stay in step.
  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return
    const next = wrapIndex(to, n)
    if (next === index) return
    const st = stRef.current
    const y = st ? st.scroll() : 0
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop)
      segRef.current = seg
      st.scroll(st.start + ((st.end - st.start) * seg) / steps)
    }
    select(next, dir ?? stepDirection(index, next, n))
  }
  const step = (d: 1 | -1) => go(index + d, d)


 const onKeyDown=(event:KeyboardEvent)=>{if((event.target as HTMLElement).closest('[role=tablist]'))return;if(event.key==='ArrowRight'){event.preventDefault();step(1);}else if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}};
 const onPointerDown=(event:PointerEvent<HTMLDivElement>)=>{swipe.current={x:event.clientX,y:event.clientY};event.currentTarget.setPointerCapture?.(event.pointerId);};
 const onPointerUp=(event:PointerEvent<HTMLDivElement>)=>{const previous=swipe.current;swipe.current=null;if(!previous)return;const dx=event.clientX-previous.x;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(event.clientY-previous.y)*1.4)step(dx<0?1:-1);};
 const onTabKey=(event:KeyboardEvent<HTMLDivElement>)=>{if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;event.preventDefault();event.stopPropagation();const next=tab==='about'?'made-with':'about';setTab(next);event.currentTarget.querySelector<HTMLButtonElement>('[data-tab="'+next+'"]')?.focus();};
 const start=stripStart(index,n,visible),item=items[index];
 if(!n)return null;
 return <div ref={trackRef} className="dsh-trk" style={{height:canPin?'calc('+height+' * '+(1+steps*SCROLL_PER_DISH)+')':'auto'}}>
  <div ref={rootRef} className={'dsh-root'+(canPin?' dsh-pinned':'')} style={{height:canPin?height:'auto'}} role="region" aria-roledescription="carousel" aria-label="Box items" tabIndex={0} onKeyDown={onKeyDown}>
   <style>{(fontSrc?'@font-face{font-family:box-optional-face;src:url('+fontSrc+')}':'')+carouselCSS}</style>
   <div className="dsh-canvas">
    <svg className="dsh-arc" viewBox="0 0 960 520" preserveAspectRatio="none" aria-hidden="true"><path ref={arcRef} style={{opacity:.22}}/></svg>
    <div className="dsh-pager" role="group" aria-label="Choose an item">{items.map((entry,i)=><button key={entry.id} type="button" className="dsh-btn dsh-dot" aria-current={i===index?'true':undefined} aria-label={'Item '+(i+1)+': '+entry.titleLight+' '+entry.titleBold} tabIndex={i===index?0:-1} onClick={()=>go(i)}><i/></button>)}</div>
    <div className="dsh-plates" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={()=>{swipe.current=null;}}>{items.map((entry,i)=><div key={entry.id} ref={(el)=>{orbits.current[i]=el;}} className="dsh-orbit" aria-hidden={i!==index}><img src={entry.displaySrc} alt={entry.image.alt} width={300} height={300} draggable={false}/></div>)}</div>
    <div className="dsh-head" ref={headRef}>{items.map((entry,i)=><div key={entry.id} ref={(el)=>{heads.current[i]=el;}} className="dsh-hd" aria-hidden={i!==index}><p className="dsh-eye">Item {i+1} of {n}</p><h3><span className="dsh-t1" style={{fontSize:fitSize(entry.titleLight.length,52,titleWidth,.59)}}>{entry.titleLight}</span><span className="dsh-t2" style={{fontSize:fitSize(entry.titleBold.length,58,titleWidth,.68)}}>{entry.titleBold}</span></h3></div>)}</div>
    <div className="dsh-acts">{item&&!item.example&&item.maker.name.trim()?<a className="dsh-maker-link" href="#makers">Meet the maker</a>:null}<a className="button join dsh-primary" href={actionHref}>{actionText}</a></div>
    <div className="dsh-card"><div className="dsh-tabs" role="tablist" aria-label="Item details" onKeyDown={onTabKey}>{['about','made-with'].map(value=><button key={value} id={'box-tab-'+value} data-tab={value} type="button" role="tab" className="dsh-btn dsh-tab" aria-selected={tab===value} aria-controls={'box-panel-'+item.id} tabIndex={tab===value?0:-1} onClick={()=>setTab(value)}>{value==='about'?'About':'Made with'}</button>)}</div>
     <div className="dsh-bodies">{items.map((entry,i)=><div key={entry.id} ref={(el)=>{bodies.current[i]=el;}} className="dsh-body" aria-hidden={i!==index} inert={i!==index?'':undefined}>
      <div className="dsh-category" style={{background:entry.accent,color:['#8fb4c9','#f0c869'].includes(entry.accent)?'#1d1b17':'#f4efe6'}}>{entry.category}</div>
      {!entry.example&&(entry.maker.name||entry.maker.business||entry.maker.town)?<div className="dsh-maker">{entry.maker.name.trim()?<p>{entry.maker.name.trim()}</p>:null}{[entry.maker.business,entry.maker.town].some(value=>value.trim())?<p>{[entry.maker.business,entry.maker.town].map(value=>value.trim()).filter(Boolean).join(', ')}</p>:null}</div>:null}
      <div id={'box-panel-'+entry.id} role="tabpanel" aria-labelledby={'box-tab-'+tab} tabIndex={i===index?0:-1}>{tab==='about'?<p className="dsh-desc">{entry.about}</p>:<ul className="dsh-ing">{entry.madeWith.map((material,j)=><li key={j}>{material}</li>)}</ul>}</div>
     </div>)}</div>
    </div>
    <div className="dsh-strip" ref={stripRef}><button type="button" className="dsh-btn dsh-arrow" aria-label="Previous item" onClick={()=>step(-1)}><svg viewBox="0 0 12 16" aria-hidden="true"><path d="M11 0v16L0 8z"/></svg></button><div className="dsh-win" ref={winRef} style={{width:visible*ITEM,flex:'0 0 auto'}}><div className="dsh-track" style={{transform:'translateX('+(-start*ITEM)+'px)'}}>{items.map((entry,i)=><div key={entry.id} className="dsh-th"><button type="button" className="dsh-btn" aria-label={'Choose '+entry.titleLight+' '+entry.titleBold} aria-current={i===index?'true':undefined} tabIndex={i===index?0:-1} onClick={()=>go(i)}><img src={entry.displaySrc} alt="" width={64} height={64} draggable={false}/><span>{entry.label}</span></button></div>)}</div></div><button type="button" className="dsh-btn dsh-arrow" aria-label="Next item" onClick={()=>step(1)}><svg viewBox="0 0 12 16" aria-hidden="true"><path d="M1 0v16l11-8z"/></svg></button></div>
   </div><p className="dsh-sr" aria-live="polite" aria-atomic="true">{item?'Item '+(index+1)+' of '+n+': '+item.label.replace(/\s+/g,' '):''}</p>
  </div>
 </div>;
}
export default BoxOrbitCarousel;
