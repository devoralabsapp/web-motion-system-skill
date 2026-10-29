import {mkdir,writeFile} from 'node:fs/promises';
import {effects,groupNames} from '../skills/devoralabs-web-motion/assets/catalog/registry.mjs';
function timingNote(e){
 if(e.kind!=='effect')return 'compose this controller with a selected visual property; it does not determine the visual design by itself.';
 if(e.group===9||e.group===15||e.id===216)return 'map actual scroll, pointer or drag progress to the visual range; use a short bounded follower only when needed. No fixed autoplay duration is required.';
 if(e.group===12)return 'start around 120–240ms for interaction feedback; the action and focus response must work immediately.';
 if(e.group===14)return 'derive motion from input velocity or the spring model; settle and stop below an explicit displacement/velocity threshold.';
 if(e.id===53||e.id===54)return 'start around 8–16 seconds for a slow photo pan/zoom, with pause/visibility and reduced-motion handling.';
 if(e.group===10)return 'start around 240–500ms for layout changes; measure once, support interruption and preserve element identity.';
 if(e.group===18)return 'use a bounded simulation loop while visible, with a finite end or explicit pause policy; do not run decorative particle work in hidden views.';
 return 'start around '+e.durationMs+'ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.';
}
const root=new URL('../skills/devoralabs-web-motion/',import.meta.url);
await mkdir(new URL('references/catalog/',root),{recursive:true});
const index=['# Motion catalog — 240 entries','','220 visual effects/patterns + 10 input triggers + 10 timing modes. IDs follow the original requested list. Variants can overlap; these are not 240 mutually exclusive industry standards.','','Each GIF is a deterministic Canvas study, not a recording of a production website. The interactive input, shader and 3D limits are labeled per group. A looping GIF shows repetition for teaching; production replay follows the user task and reduced-motion preference.','','[Open the searchable gallery](../assets/catalog/gallery.html) through a local HTTP server. On GitHub, open a group below to view its ten GIFs.',''];
for(let g=0;g<24;g++){
 const groupKey=String(g+1).padStart(2,'0')+'-'+groupNames[g][0].toLowerCase().replace(/[^a-z0-9]+/g,'-');
 const members=effects.filter(e=>e.group===g+1);
 index.push(`## ${g+1}. ${groupNames[g][0]} / ${groupNames[g][1]}`,'',`[View all 10 GIF demos](catalog/${groupKey}.md)`,'','| ID | Effect / pattern | Kind | Detail |','| --- | --- | --- | --- |');
 const group=[`# ${groupNames[g][0]} / ${groupNames[g][1]}`,'',groupNames[g][2],'','The GIFs are compact teaching studies. Keep the host application state separate from their visual timelines.','','[All 240 entries](../catalog.md)','','| ID / effect | GIF |','| --- | --- |'];
 for(const e of members){
  index.push(`| ${String(e.id).padStart(3,'0')} | ${e.name} — ${e.vi} | ${e.kind} | [Recipe](catalog/${e.key}.md) |`);
  group.push(`| [${String(e.id).padStart(3,'0')} · ${e.name}](${e.key}.md)<br>${e.vi} | ![${e.name} motion study](../../assets/gifs/${e.gif}) |`);
  const doc=[`# ${String(e.id).padStart(3,'0')} — ${e.name}`,'',e.vi,'',`**Category:** ${groupNames[g][0]} · **Kind:** ${e.kind}`,'',`![${e.name} demo](../../assets/gifs/${e.gif})`,'','## Implementation recipe','',e.recipe,'',groupNames[g][2],'',`**Starting timing:** ${timingNote(e)}`,'','## Adaptation checks','',e.group===3?'Keep the outgoing content until its transition completes, restore focus safely, then remove it.':'End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.','',e.group===23?'The GIF cursor, viewport or input trace is simulated. Wire the real event and cancellation/focus behavior in the host application.':e.group===24?'Apply this timing to a real property or timeline. Match endpoints and settlement; do not trigger business events on repeated timeline ticks.':e.group===16||e.group===19?'This preview is a Canvas 2D approximation of the visual principle. For true 3D, shaders or physical material behavior, build the appropriate renderer and verify depth, interaction and performance separately.':'Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.','','Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.','','## Demo source','',`[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group ${g}, branch ${e.id%10===0?9:e.id%10-1}. Call \`drawDemo(context, ${e.id}, normalizedTime)\` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.`,'',`[Group GIFs](${groupKey}.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)`,''];
  await writeFile(new URL(`references/catalog/${e.key}.md`,root),doc.join('\n'));
 }
 index.push('');await writeFile(new URL(`references/catalog/${groupKey}.md`,root),group.join('\n')+'\n');
}
await writeFile(new URL('references/catalog.md',root),index.join('\n'));
await writeFile(new URL('assets/catalog/catalog.json',root),JSON.stringify({version:2,entries:effects,groups:groupNames.map(([name,vi,guidance],i)=>({id:i+1,name,vi,guidance}))},null,2)+'\n');
console.log('Generated 240 individual recipes, 24 group galleries and a stable catalog index.');
