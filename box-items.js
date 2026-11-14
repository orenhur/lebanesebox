'use strict';
// Shared browser data. Example entries describe product TYPES, never confirmed inventory.
window.BOX_ITEMS = Object.freeze([
 {id:'zaatar',titleLight:"Za'atar",titleBold:'Blend',category:'Pantry',label:"Za'atar\nblend",about:'A herb and sesame blend used on bread, eggs and labneh. The mix varies by recipe.',madeWith:['Dried herbs','Sesame seeds','Sumac','Salt'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/zaatar.png',alt:"Outline of a jar of za'atar blend"},accent:'#5b6330'},
 {id:'olive-oil-soap',titleLight:'Olive oil',titleBold:'Soap',category:'Skincare',label:'Olive oil\nsoap',about:'A solid soap made using olive oil. Shapes, textures and formulations vary.',madeWith:['Olive oil','Water','Lye'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/olive-oil-soap.png',alt:'Outline of an olive oil soap bar'},accent:'#b5532f'},
 {id:'pistachio-sweets',titleLight:'Pistachio',titleBold:'Sweets',category:'Sweets',label:'Pistachio\nsweets',about:'Pistachio sweets come in many forms, including filled pastries and small confections.',madeWith:['Pistachios','Sugar','Flour','Butter'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/pistachio-sweets.png',alt:'Outline of pistachio sweets on a small plate'},accent:'#f0c869'},
 {id:'ceramic-dish',titleLight:'Hand-painted',titleBold:'Ceramic dish',category:'Home',label:'Hand-painted\nceramic dish',about:'A ceramic dish decorated with painted patterns. Forms, finishes and decorative techniques vary.',madeWith:['Clay','Glaze','Ceramic pigments'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/ceramic-dish.png',alt:'Outline of a patterned ceramic dish'},accent:'#8fb4c9'},
 {id:'sumac',titleLight:'Sumac',titleBold:'Spice blend',category:'Pantry',label:'Sumac\nspice blend',about:'A tangy spice blend based on ground sumac, used as a seasoning or finishing touch.',madeWith:['Ground sumac','Salt or other spices, depending on the blend'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/sumac.png',alt:'Outline of a bowl of sumac spice blend'},accent:'#7a1f2b'},
 {id:'beaded-bracelet',titleLight:'Beaded',titleBold:'Bracelet',category:'Accessories',label:'Beaded\nbracelet',about:'An accessory made by arranging beads along a thread or cord. Bead shapes, patterns and materials vary.',madeWith:['Beads','Thread or cord'],example:true,maker:{name:'',business:'',town:''},image:{src:'/assets/images/box/beaded-bracelet.png',alt:'Outline of a beaded bracelet'},accent:'#5b6330'}
]);
window.BOX_ITEM_TOOLS = Object.freeze({
 exampleLine:'Examples of the kinds of products makers in Lebanon create. Your box will be different.',
 realLine:'Products from Lebanese makers, with the story of who made each one.',
 shape(item){
  const palette=['#b5532f','#5b6330','#7a1f2b','#8fb4c9','#f0c869'];
  const color=palette.includes(item.accent)?item.accent:'#5b6330';
  const shapes={
   zaatar:'<path d="M106 55h88v35h-88zM98 90h104l12 22v118q0 18-18 18h-92q-18 0-18-18V112z"/><path d="M108 150q42-30 84 0M108 180q42-24 84 0M124 126l8 8m30-6-6 10m24-16 6 8"/>',
   'olive-oil-soap':'<path d="m62 112 118-35 65 38-4 99-119 34-65-37zM62 112l64 38 119-35M126 150l-4 98"/><path d="M143 112q-2-29 20-37-1 26-20 37Z"/>',
   'pistachio-sweets':'<ellipse cx="150" cy="204" rx="112" ry="39"/><path d="m71 166 44-26 39 25-43 28zM115 140v-32l39 25v32M71 166v-32l44-26M156 161l43-26 38 23-43 28zM199 135v-31l38 23v31M156 161v-31l43-26"/><path d="m99 132 10-6m21 22 8-5m48-18 9-5m16 23 8-4"/>',
   'ceramic-dish':'<circle cx="150" cy="150" r="110"/><circle cx="150" cy="150" r="86"/><path d="M150 89q-38 27 0 61-38 34 0 61 38-27 0-61 38-34 0-61ZM89 150q27-38 61 0 34-38 61 0-27 38-61 0-34 38-61 0Z"/>',
   sumac:'<path d="M48 153h204q-15 91-102 91T48 153Z"/><ellipse cx="150" cy="153" rx="102" ry="30"/><path d="M78 147q70-71 144 0M110 137l7-7m28-2 8 5m20-1 7 4"/>',
   'beaded-bracelet':'<circle cx="150" cy="150" r="83" fill="none"/><circle cx="150" cy="67" r="18"/><circle cx="199" cy="83" r="18"/><circle cx="229" cy="124" r="18"/><circle cx="229" cy="176" r="18"/><circle cx="199" cy="217" r="18"/><circle cx="150" cy="233" r="18"/><circle cx="101" cy="217" r="18"/><circle cx="71" cy="176" r="18"/><circle cx="71" cy="124" r="18"/><circle cx="101" cy="83" r="18"/>'
  };
  const paths=shapes[item.id]||shapes['ceramic-dish'];
  return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><g fill="'+color+'" fill-opacity=".14" stroke="'+color+'" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">'+paths+'</g></svg>');
 }
});
