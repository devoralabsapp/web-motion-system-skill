import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const results=[],errors=[];
async function wheel(p,f,y){await p.mouse.move(p.viewportSize().width*.65,p.viewportSize().height*.6);const delta=y-await f.evaluate(()=>scrollY);await p.mouse.wheel(0,delta);await p.waitForTimeout(180)}
try{
for(const width of [1440,390])for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
 const p=await b.newPage({viewport:{width,height:width<700?844:1000}});p.on('pageerror',e=>errors.push(e.message));
 await p.goto(`http://127.0.0.1:4173/?web=2&style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));await f.locator('.hero-word').first().waitFor();
 assert.equal(await p.locator('#website-picker option').count(),6);assert.equal(await p.locator('#creative-picker option').count(),3);
 assert.equal(await p.locator('[data-web="2"]').getAttribute('aria-pressed'),'true');
 await f.waitForFunction(()=>[...document.querySelectorAll('.hero-word')].some(el=>el.getAnimations().some(a=>a.playState==='running')));
 const initial=await f.locator('.hero-word').first().evaluate(el=>({display:getComputedStyle(el).display,transform:getComputedStyle(el).transform}));assert.equal(initial.display,'inline-block');assert.notEqual(initial.transform,'none');await p.waitForTimeout(1550);
 const before=await f.locator('#hero-image').evaluate(el=>el.style.transform);await wheel(p,f,450);const after=await f.locator('#hero-image').evaluate(el=>el.style.transform);assert.notEqual(after,before);await wheel(p,f,0);assert.equal(await f.locator('#hero-image').evaluate(el=>el.style.transform),before);
 const row=f.locator('.project-row').first(),art=row.locator('.project-image');const at=await row.evaluate(el=>el.getBoundingClientRect().top+scrollY);const vh=await f.evaluate(()=>innerHeight);let previous=null;
 for(let cycle=0;cycle<3;cycle++){
  await wheel(p,f,Math.max(0,at-vh-140));await p.waitForTimeout(100);
  await wheel(p,f,at-vh*.5);
  const samples=await art.evaluate(el=>el.getAnimations().filter(a=>a.playState==='running').map(a=>({start:a.startTime,clip:getComputedStyle(el).clipPath,transform:getComputedStyle(el).transform})));
  assert.ok(samples.length,`${theme} ${width} cycle ${cycle}: project animation running`);assert.notEqual(samples.at(-1).start,previous);previous=samples.at(-1).start;await p.waitForTimeout(1150);
 }
 // Keep a real demo edit while leaving and returning to Web 2.
 await f.locator('#tab-shop').click();await f.locator('[data-add="notebook"]').click();
 await p.locator('#website-picker').selectOption('kinetic');assert.equal(await p.locator('[data-web="1"]').getAttribute('aria-pressed'),'true');
 await f.waitForFunction(()=>document.getAnimations().filter(a=>a.playState==='running').length===0);
 await p.locator('[data-web="2"]').click();assert.match(await f.locator('#cart-total').innerText(),/120/);
 const name=await f.locator('[name="name"]').fill('Giữ nội dung');await p.locator('#creative-picker').selectOption(theme==='frame-shift'?'cutout-dept':'frame-shift');await p.waitForTimeout(650);assert.equal(await f.locator('[name="name"]').inputValue(),'Giữ nội dung');
 await p.emulateMedia({reducedMotion:'reduce'});await wheel(p,f,0);await f.locator('[data-select="noi-bo"]').click();assert.equal(await f.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);assert.equal(await f.locator('#hero-image').evaluate(el=>el.style.transform),'');
 results.push({theme,width,dropdowns:'6 + 3',intro:true,scrollReverses:true,projectReplayCycles:3,dataPreserved:true,reducedMotion:true});console.log('MOTION PASS',theme,width);await p.close();
}
assert.deepEqual(errors,[]);await writeFile('../redline-delivery/creative-lab/webs-motion-checks.json',JSON.stringify({results,errors},null,2));
}finally{await b.close()}
