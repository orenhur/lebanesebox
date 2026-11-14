import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
const pinning=process.env.BOX_PIN_SCROLL==='true';
export default defineConfig({
 plugins:[react(),{name:'box-single-file-guard',generateBundle(_options,bundle){
  const output=Object.values(bundle),chunks=output.filter(file=>file.type==='chunk');
  if(chunks.length!==1||output.some(file=>file.fileName.endsWith('.css')||file.fileName.endsWith('.map')))this.error('The widget must produce one JS file without CSS chunks or source maps.');
  if(!pinning&&chunks.some(chunk=>Object.keys(chunk.modules).some(id=>id.includes('ScrollTrigger'))))this.error('ScrollTrigger must not ship in the default bundle.');
 }}],
 define:{'process.env.NODE_ENV':JSON.stringify('production'),__BOX_PIN_SCROLL__:JSON.stringify(pinning)},
 build:{target:'es2020',minify:'esbuild',sourcemap:false,outDir:'../../assets/js',emptyOutDir:false,lib:{entry:'src/main.tsx',name:'HandToHandBoxCarousel',formats:['iife'],fileName:()=> 'box-carousel.js'},rollupOptions:{output:{inlineDynamicImports:true}}}
});
