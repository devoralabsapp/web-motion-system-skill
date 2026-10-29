import {mkdir,copyFile,cp,readFile,access} from 'node:fs/promises';
const files=['index.html','app.js','content.js','demo-state.js','effects.js','story.js','story-math.js','project-motion.js','style.css','components.css','motion.css','effects.css','story.css'];
await mkdir('dist',{recursive:true});
for(const file of files)await copyFile(file,`dist/${file}`);
await cp('assets','dist/assets',{recursive:true});
const html=await readFile('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#?:]+\.(?:css|js|svg))"/g))await access(`dist/${match[1]}`);
console.log(`Static build complete: ${files.length} application files + local assets.`);
