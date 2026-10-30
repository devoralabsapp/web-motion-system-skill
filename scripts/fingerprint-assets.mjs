import {readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';

// Fingerprint dependencies before their importer, so an inner module change also
// changes the entry URL. HTML remains the revalidated release entry point.
export async function fingerprintAssets(root) {
  const cache=new Map(),visiting=new Set();
  const hash=text=>createHash('sha256').update(text).digest('hex').slice(0,12);
  const isLocal=value=>value.startsWith('./')||value.startsWith('../')||value.startsWith('/');
  function resolve(file,specifier){const pathname=specifier.split(/[?#]/)[0];const resolved=path.posix.normalize(pathname.startsWith('/')?pathname.slice(1):path.posix.join(path.posix.dirname(file),pathname));if(resolved.startsWith('../')||resolved==='..')throw Error('Asset outside output: '+specifier);return resolved;}
  function link(file,target,original){if(original.startsWith('/'))return '/'+target;const relative=path.posix.relative(path.posix.dirname(file),target);return relative.startsWith('.')?relative:'./'+relative;}
  async function fingerprint(file){
    if(cache.has(file))return cache.get(file);
    if(visiting.has(file))throw Error('Cyclic build module: '+file);
    visiting.add(file);let source=await readFile(path.join(root,file),'utf8');
    if(/\.(mjs|js)$/.test(file)){
      const matches=[...source.matchAll(/\b(?:from\s*|import\s*\(\s*|import\s+)(['"])([^'"]+)\1/g)].filter(m=>isLocal(m[2])&&/\.(?:mjs|js)(?:[?#]|$)/.test(m[2]));
      for(const match of matches.reverse()){
        const dependency=await fingerprint(resolve(file,match[2]));
        const offset=match.index+match[0].indexOf(match[1])+1;
        source=source.slice(0,offset)+link(file,dependency,match[2])+source.slice(offset+match[2].length);
      }
    }
    const extension=path.posix.extname(file),stem=file.slice(0,-extension.length).replace(/\.[a-f0-9]{12}$/,'');
    const output=stem+'.'+hash(source)+extension;
    await writeFile(path.join(root,output),source);cache.set(file,output);visiting.delete(file);return output;
  }
  async function htmlFiles(dir=''){
    const files=[];for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){const file=path.posix.join(dir,entry.name);if(entry.isDirectory())files.push(...await htmlFiles(file));else if(file.endsWith('.html'))files.push(file);}return files;
  }
  for(const file of await htmlFiles()){
    let html=await readFile(path.join(root,file),'utf8');
    const references=[...html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)=(['"])([^'"]+\.(?:js|mjs|css)(?:\?[^'"]*)?)\1[^>]*>/g)];
    for(const match of references.reverse()){
      const specifier=match[2];if(!isLocal(specifier)&&/^[a-z]+:/i.test(specifier))continue;
      const output=await fingerprint(resolve(file,specifier));
      const token=match[1]+specifier+match[1],offset=match.index+match[0].indexOf(token)+1;
      html=html.slice(0,offset)+link(file,output,specifier)+html.slice(offset+specifier.length);
    }
    const release=hash(html);html=html.replace(/<html\b/,'<html data-release="'+release+'"');
    await writeFile(path.join(root,file),html);
  }
  // Compatibility for diagnostics and links to original module names. The new
  // HTML never depends on these aliases, which an older browser may still cache.
  for(const [file,output] of cache)if(file!==output&&/\.(?:js|mjs)$/.test(file))await writeFile(path.join(root,file),`export * from ${JSON.stringify(link(file,output,'./'))};\n`);
  await writeFile(path.join(root,'asset-manifest.json'),JSON.stringify(Object.fromEntries(cache),null,2)+'\n');
  console.log(`Fingerprinted ${cache.size} runtime assets including embedded demos.`);
  return cache;
}
