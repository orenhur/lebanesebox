'use strict';
// Run after changing advisors.js and before deploying. No packages or service is required.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function update(root,output){const sandbox={window:{}};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(root,'advisors.js'),'utf8'),sandbox);const visible=sandbox.window.ADVISORS_SETTINGS?.enabled===true&&sandbox.window.visibleAdvisors(sandbox.window.ADVISORS).length>0;const file=path.join(root,'sitemap.xml');let xml=fs.readFileSync(file,'utf8');const match=xml.match(/<loc>(https?:\/\/[^<]+)<\/loc>/);if(!match)throw Error('The sitemap needs an absolute site URL.');const origin=new URL(match[1]).origin;xml=xml.replace(/\s*<url>\s*<loc>[^<]*\/advisors\/?<\/loc>\s*<\/url>/g,'');if(visible)xml=xml.replace('</urlset>',`  <url><loc>${origin}/advisors/</loc></url>\n</urlset>`);fs.writeFileSync(output||file,xml);return visible;}
if(require.main===module){const root=path.resolve(__dirname,'..');const visible=update(root);process.stdout.write('Advisor sitemap entry '+(visible?'included':'absent')+'.\n');}
module.exports={update};
