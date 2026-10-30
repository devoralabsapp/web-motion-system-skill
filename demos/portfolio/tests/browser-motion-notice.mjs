import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'chrome'}),base=process.env.BASE_URL||'http://127.0.0.1:4173';
const out='../redline-delivery/motion-notice';await mkdir(out,{recursive:true});const results=[],errors=[];
try{
for(const width of [320,390,768,1440])for(const style of ['one-line','creative-lab']){
 const p=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
 await p.goto(`${base}/?style=${style}&lang=vi`);const notice=p.locator('.motion-notice');await notice.waitFor();
 assert.match(await notice.innerText(),/Giảm chuyển động/);await notice.locator('summary').click();assert.match(await notice.innerText(),/Animation effects/);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.ok(await p.locator('#view-'+style).evaluate(el=>el.getBoundingClientRect().height)>200);
 const f=p.frames().find(f=>f.url().includes(style==='creative-lab'?'creative.html':'one-line.html'));await f.locator('#demo-panel').waitFor();
 assert.equal(await f.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
 if(width===390&&style==='creative-lab')await p.screenshot({path:`${out}/windows-reduced-390.png`});
 await notice.locator('button').click();assert.equal(await notice.isVisible(),false);assert.match(await p.evaluate(()=>document.activeElement.className),/web-activate/);
 await p.reload();await p.locator('#website-picker').waitFor();assert.equal(await notice.isVisible(),false);
 await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForFunction(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await notice.isVisible(),false);
 // A fresh notice session still follows live preference changes.
 await p.evaluate(()=>sessionStorage.removeItem('devoralabs-motion-notice-dismissed-v1'));await p.reload();await notice.waitFor();
 // Media changes must not reload or clear an embedded app.
 const current=p.frames().find(f=>f.url().includes(style==='creative-lab'?'creative.html':'one-line.html'));
 const name=style==='creative-lab'?'[name="name"]':'#client-name';await current.locator(name).fill('Giữ nội dung');
 await p.emulateMedia({reducedMotion:'no-preference'});await notice.waitFor({state:'hidden'});assert.equal(await current.locator(name).inputValue(),'Giữ nội dung');
 await p.emulateMedia({reducedMotion:'reduce'});await notice.waitFor();assert.equal(await current.locator(name).inputValue(),'Giữ nội dung');
 if(style==='one-line'){await p.locator('[data-language="en"]').click();assert.match(await notice.innerText(),/Animations are off/);await notice.locator('summary').click();assert.match(await notice.innerText(),/How to enable animations/)}
 results.push({width,style,notice:true,dismissal:true,livePreference:true,statePreserved:true,noOverflow:true});await p.close();
}
const p=await browser.newPage({reducedMotion:'no-preference'});await p.goto(base+'/?style=creative-lab');await p.locator('#creative-picker').waitFor();assert.equal(await p.locator('.motion-notice').isVisible(),false);await p.close();
assert.deepEqual(errors,[]);await writeFile(`${out}/results.json`,JSON.stringify({results,errors,normalMotionNoticeHidden:true},null,2));console.log(JSON.stringify({results,errors,normalMotionNoticeHidden:true},null,2));
}finally{await browser.close()}
