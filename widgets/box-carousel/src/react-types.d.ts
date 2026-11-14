// Minimal React 18 hook/JSX declarations; no extra @types dependency is installed.
declare module 'react' {
 export type SetStateAction<T> = T | ((previous:T)=>T);
 export function useState<T>(initial:T|(()=>T)):[T,(value:SetStateAction<T>)=>void];
 export function useRef<T>(initial:T):{current:T};
 export function useEffect(effect:()=>void|(()=>void),dependencies?:readonly unknown[]):void;
 export function useLayoutEffect(effect:()=>void|(()=>void),dependencies?:readonly unknown[]):void;
 export interface KeyboardEvent<T=HTMLElement>{key:string;currentTarget:T;target:EventTarget;preventDefault():void;stopPropagation():void}
 export interface PointerEvent<T=HTMLElement>{clientX:number;clientY:number;pointerId:number;currentTarget:T;preventDefault():void}
}
declare module 'react-dom/client' {export function createRoot(node:Element):{render(element:unknown):void;unmount():void}}
declare module 'react/jsx-runtime' {export const jsx:unknown;export const jsxs:unknown;export const Fragment:unknown}
declare namespace JSX {interface IntrinsicElements{[name:string]:any}}
declare const __BOX_PIN_SCROLL__:boolean;
