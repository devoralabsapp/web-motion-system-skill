import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'chrome'}),base=process.env.BASE_URL||'http://127.0.0.1:4173';
const results=[],errors=[],out='../redline-delivery/process-stability';await mkdir(out,{recursive:true});
try{for(const width of [1536,390])for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
 const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.processRuns=[];window.otherMotionRuns=0;const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.closest('#process>ol'))window.processRuns.push({time:performance.now(),tag:this.tagName});else window.otherMotionRuns++;return original.apply(this,args)}});
 await p.goto(`${base}/?style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));
 await f.locator('.process ol').scrollIntoViewIfNeeded();
 const state=()=>f.evaluate(()=>[...document.querySelectorAll('#process>ol>li,#process>ol>li *')].map(el=>({clip:getComputedStyle(el).clipPath,transform:getComputedStyle(el).transform,opacity:getComputedStyle(el).opacity,running:el.getAnimations().filter(a=>a.playState==='running').length})));
 const visible=await state();assert.ok(visible.every(s=>s.clip==='none'&&s.transform==='none'&&s.opacity==='1'&&s.running===0));
 await p.waitForTimeout(4000);assert.deepEqual(await state(),visible,'four steps remain stable while stationary');
 assert.equal(await f.locator('.process li').count(),4);
 for(const offset of [-5,5,-5,5]){await f.evaluate(y=>scrollBy({top:y,behavior:'instant'}),offset);await p.waitForTimeout(100)}
 await f.evaluate(()=>window.scrollTo({top:document.querySelector('#process').offsetTop-innerHeight-300,behavior:'instant'}));await p.waitForTimeout(150);await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(1000);
 assert.equal(await f.evaluate(()=>processRuns.length),0,'no reveal restarts on process cards');assert.ok(await f.evaluate(()=>otherMotionRuns>0),'other Web 2 animation remains active');assert.deepEqual(await state(),visible);
 await f.evaluate(()=>scrollTo({top:document.querySelector('.process li').getBoundingClientRect().top+scrollY-innerHeight+8,behavior:'instant'}));await p.waitForTimeout(1000);assert.equal(await f.evaluate(()=>processRuns.length),0);
 assert.equal(await f.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(width===1536&&theme==='frame-shift'){await f.locator('.process ol').scrollIntoViewIfNeeded();await p.screenshot({path:`${out}/web2-process-static.png`})}
 results.push({width,theme,stationary:true,viewportEdges:true,noProcessAnimations:true,otherMotionPreserved:true});console.log('PASS',width,theme);await p.close();
}assert.deepEqual(errors,[]);await writeFile(`${out}/results-static.json`,JSON.stringify({base,results,errors},null,2));}finally{await browser.close()}
