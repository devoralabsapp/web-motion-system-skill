import {mkdir,copyFile,cp,readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
const files=['index.html','classic.html','one-line.html','switcher.js','switcher.css','translations.js','i18n-text.js','i18n.js','motion-profiles.js','motion-profiles.css','classic/app.js','classic/effects.js','app.js','content.js','demo-state.js','effects.js','story.js','story-math.js','project-motion.js','page-motion.js','page-motion.css','style.css','components.css','motion.css','effects.css','story.css'];
await mkdir('dist',{recursive:true});
for(const file of files){await mkdir(`dist/${file.split('/').slice(0,-1).join('/')}`,{recursive:true});await copyFile(file,`dist/${file}`);}
for(const file of ['creative.html','creative.js','creative.css','creative-motion.js','motion-notice.js'])await copyFile(file,`dist/${file}`);
await cp('assets','dist/assets',{recursive:true});
// Content-address Web 2 assets, so warm browser caches cannot mix releases.
const fingerprint=async(name,source)=>{const hash=createHash('sha256').update(source).digest('hex').slice(0,12);const file=name.replace(/\.(js|css)$/,`.${hash}.$1`);await writeFile(`dist/${file}`,source);return file;};
const motionFile=await fingerprint('creative-motion.js',await readFile('creative-motion.js','utf8'));
const appSource=(await readFile('creative.js','utf8')).replace(/\.\/creative-motion\.js(?:\?[^']*)?/,`./${motionFile}`);
const appFile=await fingerprint('creative.js',appSource);
const cssFile=await fingerprint('creative.css',await readFile('creative.css','utf8'));
const creativeHTML=(await readFile('creative.html','utf8')).replace(/href="creative\.css(?:\?[^"\s]*)?"/,`href="${cssFile}"`).replace(/src="creative\.js(?:\?[^"\s]*)?"/,`src="${appFile}"`);
await writeFile('dist/creative.html',creativeHTML);
const release=createHash('sha256').update(creativeHTML).digest('hex').slice(0,12);
const shellSource=(await readFile('switcher.js','utf8')).replace(/url:'creative\.html(?:\?[^']*)?'/,`url:'creative.html?v=${release}'`);
await writeFile('dist/switcher.js',shellSource);
const shellHash=createHash('sha256').update(shellSource).digest('hex').slice(0,12);
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replace('src="switcher.js"',`src="switcher.js?v=${shellHash}"`));
for(const page of ['index.html','classic.html','one-line.html']){
 const html=await readFile(`dist/${page}`,'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"#?:]+\.(?:css|js|svg|html))"/g))await access(`dist/${match[1]}`);
}
console.log(`Static build complete: ${files.length} application files + local assets.`);
