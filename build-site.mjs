import {mkdir,copyFile,cp,readFile,access} from 'node:fs/promises';
const files=['index.html','classic.html','one-line.html','switcher.js','switcher.css','classic/app.js','classic/effects.js','app.js','content.js','demo-state.js','effects.js','story.js','story-math.js','project-motion.js','style.css','components.css','motion.css','effects.css','story.css'];
await mkdir('dist',{recursive:true});
for(const file of files){await mkdir(`dist/${file.split('/').slice(0,-1).join('/')}`,{recursive:true});await copyFile(file,`dist/${file}`);}
await cp('assets','dist/assets',{recursive:true});
for(const page of ['index.html','classic.html','one-line.html']){
 const html=await readFile(`dist/${page}`,'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"#?:]+\.(?:css|js|svg|html))"/g))await access(`dist/${match[1]}`);
}
console.log(`Static build complete: ${files.length} application files + local assets.`);
