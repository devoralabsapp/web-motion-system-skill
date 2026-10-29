import {createRequire} from 'node:module';import assert from 'node:assert/strict';import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require('playwright');const channel=process.env.BROWSER_CHANNEL||'chrome';
const browser=await chromium.launch({headless:true,channel}),base=process.env.BASE_URL||'http://127.0.0.1:4173/dist';
const results=[],errors=[],out='../redline-delivery/process-stability';await mkdir(out,{recursive:true});
try{for(const width of [1536,390])for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
 const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.processRuns=[];const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.closest('#process>ol'))window.processRuns.push({time:performance.now(),tag:this.tagName});return original.apply(this,args)}});
 await p.goto(`${base}/index.html?style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();let f=p.frames().find(f=>f.url().includes('creative.html'));
 const app=await f.locator('head script[type=module][src^="creative."]').getAttribute('src'),css=await f.locator('link[rel=stylesheet]').last().getAttribute('href');assert.match(app,/creative\.[a-f0-9]{12}\.js$/);assert.match(css,/creative\.[a-f0-9]{12}\.css$/);
 assert.match(await (await p.request.get(new URL(app,f.url()).href)).text(),/creative-motion\.[a-f0-9]{12}\.js/);
 await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(180);
 assert.ok(await f.evaluate(()=>[...document.querySelectorAll('.process li>*')].some(el=>el.getAnimations().some(a=>a.playState==='running')&&getComputedStyle(el).clipPath!=='none'&&getComputedStyle(el).clipPath!=='inset(0px)')),'step content visibly clips during the running animation');
 await p.waitForTimeout(1100);const count=await f.evaluate(()=>processRuns.length);assert.ok(count>=12,'four steps animate their contents');
 const snapshot=()=>f.evaluate(()=>[...document.querySelectorAll('#process>ol>li,#process>ol>li *')].map(el=>({clip:getComputedStyle(el).clipPath,opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform,running:el.getAnimations().filter(a=>a.playState==='running').length})));
 const settled=await snapshot();assert.ok(settled.every(x=>x.clip==='none'&&x.opacity==='1'&&x.transform==='none'&&x.running===0));await p.waitForTimeout(3000);assert.equal(await f.evaluate(()=>processRuns.length),count);assert.deepEqual(await snapshot(),settled);
 for(const delta of [-5,5,-5,5]){await f.evaluate(y=>scrollBy({top:y,behavior:'instant'}),delta);await p.waitForTimeout(75)}assert.equal(await f.evaluate(()=>processRuns.length),count,'small scroll movements never restart');
 // Full exit re-arms; barely peeking over the viewport edge does not play.
 await f.evaluate(()=>scrollTo({top:document.querySelector('.process ol').getBoundingClientRect().top+scrollY-innerHeight-180,behavior:'instant'}));await p.waitForTimeout(150);
 await f.evaluate(()=>scrollTo({top:document.querySelector('.process li').getBoundingClientRect().top+scrollY-innerHeight+8,behavior:'instant'}));await p.waitForTimeout(1000);assert.equal(await f.evaluate(()=>processRuns.length),count,'edge remains stable');
 await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(1150);const replay=await f.evaluate(()=>processRuns.length);assert.ok(replay>count,'full return replays');await p.waitForTimeout(1200);assert.equal(await f.evaluate(()=>processRuns.length),replay);
 // Reload without clearing the browser cache and require the same current release assets.
 await p.reload();await p.locator('#view-creative-lab').waitFor();f=p.frames().find(f=>f.url().includes('creative.html'));await f.locator('.process ol').waitFor();assert.equal(await f.locator('head script[type=module][src^="creative."]').getAttribute('src'),app);assert.equal(await f.locator('link[rel=stylesheet]').last().getAttribute('href'),css);
 await p.emulateMedia({reducedMotion:'reduce'});await f.locator('.process ol').scrollIntoViewIfNeeded();await p.waitForTimeout(200);assert.ok((await snapshot()).every(x=>x.running===0));assert.equal(await f.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 results.push({channel,width,theme,entrance:true,settles:true,edgeStable:true,replay:true,warmCache:true,reduced:true,app,css});console.log('PASS',channel,width,theme);await p.close();
}assert.deepEqual(errors,[]);await writeFile(`${out}/results-motion-${channel}.json`,JSON.stringify({base,results,errors},null,2));}finally{await browser.close()}
