// Component-owned styles are injected into the single production bundle.
export const carouselCSS=String.raw`
@font-face{font-family:'DM Sans';font-style:normal;font-weight:200;font-display:swap;src:url('/assets/dm-sans-latin-200-normal.woff2') format('woff2')}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:800;font-display:swap;src:url('/assets/dm-sans-latin-800-normal.woff2') format('woff2')}
#box-carousel .dsh-trk{position:relative;width:100%}
#box-carousel .dsh-root{position:relative;min-height:560px;width:100%;overflow:hidden;background:var(--bg);color:var(--ink);font:400 16px/1.6 'DM Sans',sans-serif;container-type:inline-size;-webkit-tap-highlight-color:transparent;border:1px solid var(--border);border-radius:4px}
#box-carousel .dsh-root.dsh-pinned{position:sticky;top:0}
#box-carousel .dsh-root *{box-sizing:border-box}
#box-carousel .dsh-root:focus-visible,#box-carousel .dsh-btn:focus-visible,#box-carousel a:focus-visible,#box-carousel [role=tabpanel]:focus-visible{outline:2px solid var(--focus-color);outline-offset:3px}
#box-carousel .dsh-root:focus-visible{outline-offset:-4px}
#box-carousel .dsh-canvas{position:relative;display:grid;grid-template-columns:minmax(180px,.95fr) minmax(200px,1.05fr) minmax(250px,1fr);grid-template-areas:'plates head card' 'acts acts card' 'strip strip card';column-gap:28px;row-gap:20px;align-items:center;padding:40px 28px 28px 52px;min-height:560px}
#box-carousel .dsh-canvas>div{z-index:1;min-width:0}
#box-carousel .dsh-arc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:0}
#box-carousel .dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}
#box-carousel .dsh-pager{position:absolute;left:4px;top:96px;display:flex;flex-direction:column;gap:3px;align-items:center}
#box-carousel .dsh-dot{width:32px;height:28px;display:grid;place-items:center}
#box-carousel .dsh-dot i{display:block;width:4px;height:5px;border-radius:3px;background:var(--ink);opacity:.6;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}
#box-carousel .dsh-dot[aria-current] i{height:23px;opacity:1}
#box-carousel .dsh-plates{grid-area:plates;position:relative;width:100%;max-width:280px;aspect-ratio:1/1;touch-action:pan-y;justify-self:center}
#box-carousel .dsh-plates:before{content:"";position:absolute;inset:8%;border-radius:50%;background:#f4efe6}
#box-carousel .dsh-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}
#box-carousel .dsh-orbit>img{display:block;width:100%;height:100%;object-fit:contain;user-select:none;-webkit-user-drag:none}
#box-carousel .dsh-head{grid-area:head;position:relative;height:194px;width:100%}
#box-carousel .dsh-hd{position:absolute;inset:0;visibility:hidden}
#box-carousel p.dsh-eye{font:500 16px/1.5 'DM Sans',sans-serif!important;margin:0 0 12px!important;color:var(--muted)}
#box-carousel .dsh-head h3{font:inherit!important;margin:0!important;line-height:1.1!important}
#box-carousel .dsh-t1,#box-carousel .dsh-t2{display:block;white-space:nowrap;text-transform:uppercase;line-height:1.12;letter-spacing:-.01em!important;margin:0;color:var(--ink);font-family:'DM Sans',sans-serif}
#box-carousel .dsh-t1{font-weight:200;margin-top:6px}
#box-carousel .dsh-t2{font-weight:800;margin-top:8px}
#box-carousel .dsh-acts{grid-area:acts;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;min-width:0}
#box-carousel .dsh-primary.button.join{border-radius:999px!important;background:var(--action);border-color:var(--action);color:var(--action-text)!important;font-size:16px!important;line-height:1.5!important;min-height:52px;padding:14px 24px}
#box-carousel .dsh-primary:hover{filter:none!important}
#box-carousel .dsh-maker-link{font-size:16px;line-height:1.5;text-decoration:underline;text-underline-offset:5px;padding:12px 0}
#box-carousel .dsh-card{grid-area:card;align-self:center;min-width:0;width:100%;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:24px;box-shadow:0 12px 32px -20px #1d1b1733}
#box-carousel .dsh-tabs{display:flex;gap:20px;margin-bottom:24px;border-bottom:1px solid var(--border)}
#box-carousel .dsh-tab{font-size:16px;font-weight:500;padding:8px 0 12px;color:var(--muted);white-space:nowrap}
#box-carousel .dsh-tab[aria-selected=true]{color:var(--ink);font-weight:800;border-bottom:2px solid currentColor}
#box-carousel .dsh-bodies{display:grid;min-width:0}
#box-carousel .dsh-body{grid-area:1/1;visibility:hidden;min-width:0}
#box-carousel .dsh-category{display:inline-block;max-width:100%;padding:8px 14px;font:800 20px/1.35 'DM Sans',sans-serif;border-radius:4px;margin-bottom:20px}
#box-carousel .dsh-maker p{font-size:16px!important;line-height:1.5!important;margin:0 0 12px!important}
#box-carousel p.dsh-desc{font-size:16px!important;line-height:1.6!important;margin:0!important;max-width:none;color:var(--ink)}
#box-carousel .dsh-ing{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:10px}
#box-carousel .dsh-ing li{font-size:16px;line-height:1.5;padding:6px 10px;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--ink)}
#box-carousel .dsh-strip{grid-area:strip;display:flex;align-items:center;width:100%;gap:8px;min-width:0;justify-self:center;justify-content:center}
#box-carousel .dsh-arrow{display:grid;place-items:center;width:44px;min-width:44px;height:44px;flex:none;border:1px solid var(--border);border-radius:50%;background:var(--surface)}
#box-carousel .dsh-arrow svg{width:12px;height:16px;fill:currentColor;stroke:none}
#box-carousel .dsh-win{position:relative;height:146px;flex:1 1 auto;min-width:0;max-width:472px;overflow:clip}
#box-carousel .dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}
#box-carousel .dsh-th{width:118px;height:146px;display:flex;justify-content:center;padding:4px 0}
#box-carousel .dsh-th .dsh-btn{display:flex;flex-direction:column;align-items:center;gap:8px;width:108px;height:138px;padding:8px 4px;border:1px solid transparent;border-radius:4px}
#box-carousel .dsh-th .dsh-btn[aria-current]{background:var(--surface);border-color:var(--border)}
#box-carousel .dsh-th img{width:64px;height:64px;object-fit:contain;background:#f4efe6;border-radius:50%}
#box-carousel .dsh-th span{font:500 14px/1.3 'DM Sans',sans-serif!important;text-align:center;white-space:pre-line;max-width:100px;color:var(--ink)}
#box-carousel .dsh-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@container(max-width:1000px){#box-carousel .dsh-canvas{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:'plates head' 'acts acts' 'card card' 'strip strip';gap:24px;padding:32px 24px 24px 48px}#box-carousel .dsh-head{height:174px}#box-carousel .dsh-card{max-width:none}#box-carousel .dsh-strip{max-width:580px}}
@container(max-width:590px){#box-carousel .dsh-canvas{grid-template-columns:minmax(0,1fr);grid-template-areas:'plates' 'head' 'acts' 'card' 'strip';padding:24px 16px 24px 40px;gap:22px}#box-carousel .dsh-plates{max-width:220px}#box-carousel .dsh-head{height:160px}#box-carousel .dsh-pager{top:48px;left:4px}#box-carousel .dsh-card{padding:20px 16px}#box-carousel .dsh-acts{flex-direction:column;gap:12px}#box-carousel .dsh-primary.button.join{width:100%;padding:14px 12px}#box-carousel .dsh-tabs{gap:16px}#box-carousel .dsh-strip{gap:4px;width:calc(100% + 48px);margin-left:-36px}#box-carousel .dsh-arrow{width:32px;min-width:32px;height:40px}}
@media(prefers-reduced-motion:reduce){#box-carousel .dsh-track,#box-carousel .dsh-dot i{transition:none!important}}
`;
