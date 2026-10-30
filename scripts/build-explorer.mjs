import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fingerprintAssets} from './fingerprint-assets.mjs';
import {effects} from '../skills/web-motion-system-skill/assets/catalog/registry.mjs';

const repo=fileURLToPath(new URL('../',import.meta.url));
const dist=path.resolve(repo,'dist'),skill=path.join(repo,'skills/web-motion-system-skill');
// This is the sole build output. Validate its absolute boundary before clearing it.
assert.equal(path.dirname(dist),path.resolve(repo));assert.equal(path.basename(dist),'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
await cp(path.join(repo,'web'),dist,{recursive:true});
await mkdir(path.join(dist,'catalog'),{recursive:true});
for(const file of ['registry.mjs','demo-engine.mjs'])await cp(path.join(skill,'assets/catalog',file),path.join(dist,'catalog',file));
await cp(path.join(skill,'assets/stable-reveal.mjs'),path.join(dist,'catalog/stable-reveal.mjs'));
await cp(path.join(skill,'assets/gifs'),path.join(dist,'gifs'),{recursive:true});
await mkdir(path.join(dist,'recipes'),{recursive:true});
for(const e of effects){const md=await readFile(path.join(skill,'references/catalog',e.key+'.md'),'utf8');const timing=md.match(/\*\*Starting timing:\*\* (.+)/)?.[1];assert.ok(timing,e.key);await writeFile(path.join(dist,'recipes',e.key+'.json'),JSON.stringify({id:e.id,timing})+'\n');}
await writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
console.log(`Built Motion Explorer: ${effects.length} live studies, GIFs and recipes → dist/`);

// Build imported demos in their own directory; retain local asset paths and fingerprints.
const portfolio=path.join(repo,'demos/portfolio');
const built=spawnSync(process.execPath,['build-site.mjs'],{cwd:portfolio,encoding:'utf8'});
if(built.status!==0)throw new Error(built.stderr||built.stdout||'Portfolio build failed');
console.log(built.stdout.trim());
const demoOut=path.join(dist,'demos/portfolio');await cp(path.join(portfolio,'dist'),demoOut,{recursive:true});
for(const file of ['explorer-bridge.js','explorer-bridge.css'])await cp(path.join(portfolio,file),path.join(demoOut,file));
for(const page of ['classic.html','one-line.html','creative.html']){const file=path.join(demoOut,page);let html=await readFile(file,'utf8');html=html.replace('</head>','<link rel="stylesheet" href="explorer-bridge.css"><script type="module" src="explorer-bridge.js"></script></head>');await writeFile(file,html);}
console.log('Demo 1 (six styles) + Demo 2 (three directions) built under /demos/portfolio/.');
await fingerprintAssets(dist);
