import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'chrome'}),base=process.env.BASE_URL||'http://127.0.0.1:4173';
const results=[],errors=[],out='../redline-delivery/process-stability';await mkdir(out,{recursive:true});
try{for(const width of [1536,390])for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
 const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.processRuns=[];const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.matches('.process li,.process li>*'))window.processRuns.push({time:performance.now(),tag:this.tagName});return original.apply(this,args)}});
 await p.goto(`${base}/?style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));
 await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(1250);
 const count=await f.evaluate(()=>processRuns.length);assert.ok(count>0,'process still has an entrance animation');
 const state=()=>f.evaluate(()=>[...document.querySelectorAll('.process li')].map(el=>({clip:getComputedStyle(el).clipPath,animationCount:el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length,text:el.innerText})));
 const settled=await state();assert.ok(settled.every(s=>s.clip==='none'&&s.animationCount===0),'all four steps settle');
 await p.waitForTimeout(2500);assert.equal(await f.evaluate(()=>processRuns.length),count,'standing still does not restart animations');assert.deepEqual(await state(),settled);
 // Leaving and returning should still replay once, then settle again.
 await f.evaluate(()=>window.scrollTo({top:document.querySelector('#process').offsetTop-innerHeight-300,behavior:'instant'}));await p.waitForTimeout(220);await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(1250);
 const replayCount=await f.evaluate(()=>processRuns.length);assert.ok(replayCount>count,'intentional re-entry still replays');await p.waitForTimeout(1200);assert.equal(await f.evaluate(()=>processRuns.length),replayCount,'replayed steps do not loop');
 assert.equal(await f.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(width===1536&&theme==='frame-shift')await p.screenshot({path:`${out}/process-fixed.png`});
 await p.emulateMedia({reducedMotion:'reduce'});assert.ok((await state()).every(s=>s.animationCount===0));
 results.push({width,theme,stable:true,replaysOnReturn:true,reducedMotion:true});console.log('PASS',width,theme);await p.close();
}assert.deepEqual(errors,[]);await writeFile(`${out}/results.json`,JSON.stringify({base,results,errors},null,2));}finally{await browser.close()}
