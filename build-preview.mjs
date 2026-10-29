import {readFile,writeFile} from 'node:fs/promises';
const read=file=>readFile(new URL(file,import.meta.url),'utf8');
const js=async file=>(await read(file)).replace(/^export /gm,'').replace(/^import .+;\r?\n/gm,'');
for(const variant of ['classic','one-line']){
 let html=await read(`${variant}.html`);
 const styles=['assets/theme-tokens.css','style.css','components.css','motion.css','effects.css',...(variant==='one-line'?['story.css']:[])];
 for(const file of styles)html=html.replace(`<link rel="stylesheet" href="${file}">`,`<style>\n${await read(file)}\n</style>`);
 const app=variant==='classic'?'classic/app.js':'app.js';
 html=html.replace(`<script type="module" src="${app}"></script>`,'');
 const files=variant==='classic'?['content.js','demo-state.js','classic/effects.js',app]:['content.js','demo-state.js','effects.js','story-math.js','story.js','project-motion.js',app];
 const scripts=await Promise.all(files.map(js));
 html=html.replace('</body>',`<script>\n(()=>{\n${scripts.join('\n')}\n})();\n</script>\n</body>`);
 await writeFile(new URL(`preview-${variant}.html`,import.meta.url),html);
}
let shell=await read('index.html');
shell=shell.replace('<link rel="stylesheet" href="switcher.css">',`<style>\n${await read('switcher.css')}\n</style>`);
shell=shell.replace('<script type="module" src="switcher.js"></script>','');
const controller=(await js('switcher.js')).replaceAll("url:'classic.html'","url:'preview-classic.html'").replaceAll("url:'one-line.html'","url:'preview-one-line.html'");
shell=shell.replace('</body>',`<script>\n(()=>{\n${controller}\n})();\n</script>\n</body>`);
await writeFile(new URL('preview.html',import.meta.url),shell);
console.log('Created offline switcher + two standalone previews. Keep preview-*.html and assets/ beside preview.html.');
