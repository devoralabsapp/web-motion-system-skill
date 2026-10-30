import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:4190';
const out=new URL('../../redline-delivery/motion-catalog/cards/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const errors=[],results=[];const selected=process.argv.find(x=>x.startsWith('--groups='))?.slice(9).split(',').map(Number)||Array.from({length:24},(_,i)=>i+1);
function watch(page){page.on('pageerror',e=>errors.push(e.message));}
async function waitCards(page,count=10){await page.waitForFunction(n=>document.querySelectorAll('.motion-card').length===n,count)}
async function settled(page){return page.locator('.motion-card').evaluateAll(cards=>cards.every(card=>{const s=getComputedStyle(card.querySelector('.card-surface'));return s.opacity==='1'&&s.clipPath==='none'&&s.transform==='none'&&card.getAnimations({subtree:true}).every(a=>a.playState!=='running')}))}
try{
  const page=await browser.newPage({viewport:{width:1440,height:1050},reducedMotion:'no-preference'});watch(page);
  await page.addInitScript(()=>{window.cardStarts={};const original=Element.prototype.animate;Element.prototype.animate=function(...args){const card=this.closest('.motion-card');if(card)window.cardStarts[card.dataset.motionId]=(window.cardStarts[card.dataset.motionId]||0)+1;return original.apply(this,args)}});
  await page.goto(base);await waitCards(page,240);
  assert.equal(await page.locator('.motion-card').evaluateAll(cards=>new Set(cards.map(c=>c.dataset.cardMotionName)).size),24);
  assert.equal(await page.locator('.motion-card').evaluateAll(cards=>Array.from({length:24},(_,i)=>cards.filter(c=>Number(c.dataset.cardMotion)===i+1).length).every(n=>n===10)),true);
  await page.mouse.move(5,5);
  // Regression: hovering a partially revealed card must not snap it to the end.
  await page.locator('#category').selectOption('1');await waitCards(page);await page.waitForTimeout(160);
  const first=page.locator('.motion-card').first();
  const initial=await first.evaluate(el=>{window.heldEntrance=el.getAnimations({subtree:true}).filter(a=>!a.transitionProperty);for(const a of heldEntrance){a.pause();a.currentTime=Number(a.effect.getTiming().delay)+Number(a.effect.getTiming().duration)*.4;}return {opacity:getComputedStyle(el.querySelector('.card-surface')).opacity,transform:getComputedStyle(el.querySelector('.card-surface')).transform};});
  const firstBox=await first.boundingBox();await page.mouse.move(firstBox.x+firstBox.width*.75,firstBox.y+90);await page.waitForTimeout(140);
  assert.equal(await page.evaluate(()=>heldEntrance.every(a=>a.playState==='paused')),true,'hover does not cancel or finish entrance');
  assert.deepEqual(await first.evaluate(el=>({opacity:getComputedStyle(el.querySelector('.card-surface')).opacity,transform:getComputedStyle(el.querySelector('.card-surface')).transform})),initial,'hover preserves the current entrance frame');
  await page.mouse.move(5,5);assert.equal(await page.evaluate(()=>heldEntrance.every(a=>a.playState==='paused')),true,'pointerleave does not cancel entrance');
  const delayed=await page.locator('.motion-card').nth(1).evaluate(el=>{const a=el.querySelector('.card-surface').getAnimations().find(a=>!a.transitionProperty);if(!a)return null;a.pause();a.currentTime=0;const sample={fill:a.effect.getTiming().fill,opacity:getComputedStyle(el.querySelector('.card-surface')).opacity};a.play();return sample});
  if(delayed){assert.equal(delayed.fill,'backwards');assert.equal(delayed.opacity,'0','stagger delay retains the entrance frame instead of flashing');}
  await page.evaluate(()=>heldEntrance.forEach(a=>a.play()));await page.waitForTimeout(1100);await page.locator('#category').selectOption('');await waitCards(page,240);
  for(const group of selected){
    await page.locator('#category').selectOption(String(group));await waitCards(page);await page.waitForTimeout(160);
    const card=page.locator('.motion-card').first();
    const middle=await card.evaluate(el=>{const animations=el.getAnimations({subtree:true}).filter(a=>a.playState==='running');const nodes=[el.querySelector('.card-surface'),...el.querySelectorAll('.card-copy,.card-word,canvas,.card-artwork,.card-outline,.card-outline rect,.card-sweep,.card-frame-bar,.card-particles i,.card-accent,.card-spotlight')];return {running:animations.length,styles:nodes.map(n=>{const s=getComputedStyle(n);return [s.opacity,s.transform,s.clipPath,s.strokeDashoffset]})}});
    assert.ok(middle.running>0,`group ${group} runs an entrance`);
    await card.evaluate(el=>{for(const a of el.getAnimations({subtree:true})){a.pause();const t=a.effect.getTiming();a.currentTime=Number(t.delay)+Number(t.duration)*.4;}});
    await card.screenshot({path:fileURLToPath(new URL(`group-${String(group).padStart(2,'0')}.png`,out))});
    await card.evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>a.play()));
    await page.waitForTimeout(1250);
    assert.ok(await settled(page),`group ${group} settles to an unclipped, interactive card`);
    const final=await card.evaluate(el=>[el.querySelector('.card-surface'),...el.querySelectorAll('.card-copy,.card-word,canvas,.card-outline,.card-outline rect,.card-sweep,.card-frame-bar,.card-particles i,.card-accent,.card-spotlight')].map(n=>{const s=getComputedStyle(n);return [s.opacity,s.transform,s.clipPath,s.strokeDashoffset]}));
    assert.notDeepEqual(middle.styles,final,`group ${group} visibly differs mid-animation`);
    results.push({group,name:await card.getAttribute('data-card-motion-name'),visibleIntermediate:true,settles:true});
    if(group%6===0)console.log(`Verified ${group}/24 card choreographies`);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  }
  await page.locator('#category').selectOption('1');await waitCards(page);await page.waitForTimeout(1200);
  const count=await page.evaluate(()=>cardStarts['1']);await page.waitForTimeout(1200);assert.equal(await page.evaluate(()=>cardStarts['1']),count,'no stationary restart');
  const edge=await page.locator('.motion-card').first().evaluate(el=>el.getBoundingClientRect().top+scrollY-innerHeight*.94);
  for(const delta of [-5,5,-5,5]){await page.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),edge+delta);await page.waitForTimeout(40)}
  assert.equal(await page.evaluate(()=>cardStarts['1']),count,'no boundary jitter replay');
  await page.mouse.wheel(0,2000);await page.waitForTimeout(150);await page.mouse.wheel(0,-3000);await page.waitForTimeout(160);assert.ok(await page.evaluate(()=>cardStarts['1'])>count,'full exit and return replays');
  await page.locator('.save-button').first().focus();assert.ok(await page.locator('.motion-card').first().evaluate(el=>{const s=getComputedStyle(el.querySelector('.card-surface'));return s.opacity==='1'&&s.clipPath==='none'&&s.transform==='none'&&el.getAnimations({subtree:true}).filter(a=>!a.transitionProperty?.startsWith('border-')).every(a=>a.playState!=='running')}),'focus settles its moving card surface');
  await page.locator('#category').selectOption('15');await waitCards(page);await page.waitForTimeout(1250);
  const card=page.locator('.motion-card').first();const stable=await card.boundingBox(),save=await card.locator('.save-button').boundingBox();await page.mouse.move(stable.x+stable.width*.7,stable.y+70);await page.waitForTimeout(320);
  assert.deepEqual(await card.boundingBox(),stable,'pointer tilt never moves the trigger wrapper');assert.deepEqual(await card.locator('.save-button').boundingBox(),save,'pointer tilt keeps controls in place');assert.notEqual(await card.locator('.card-artwork').evaluate(el=>getComputedStyle(el).transform),'none');
  await page.mouse.move(5,5);await page.locator('#category').selectOption('16');await waitCards(page);await page.waitForTimeout(100);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.reduced==='true');assert.ok(await settled(page),'live OS reduction cancels all entrances');
  assert.equal(await page.locator('#motion-notice').isVisible(),true);
  await page.close();
  for(const width of [320,390,768,1024]){
    const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});watch(p);await p.goto(base+'/#view=all&category=24');await waitCards(p);await p.waitForTimeout(100);assert.ok(await settled(p));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`no overflow at ${width}`);
    await p.locator('.save-button').first().click();assert.equal(await p.locator('#saved-count').textContent(),'1');await p.locator('.card-title-row a').first().click();await p.waitForFunction(()=>!document.querySelector('#view-lab').hidden);await p.locator('[data-view="all"]').click();assert.equal(await p.locator('#saved-count').textContent(),'1');await p.close();
  }
  assert.deepEqual(errors,[]);const report={passed:true,base,groups:results,stationaryStable:true,jitterStable:true,replays:true,focus:true,stableHitAreas:true,hoverKeepsEntranceFrame:true,noStaggerFlash:true,reducedMotion:true,widths:[320,390,768,1024,1440],consoleErrors:errors};await writeFile(new URL('verification.json',out),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close()}
