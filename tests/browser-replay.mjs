import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const moduleUrl=process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright';
const {chromium}=await import(moduleUrl);
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{channel:'chrome'})});
const base=process.env.BASE_URL||'http://127.0.0.1:4173';
const out=process.env.QA_OUTPUT||'../redline-delivery/devoralabs';await mkdir(out,{recursive:true});
const results=[],errors=[];
async function wheelTo(page,frame,target){
 await page.mouse.move(Math.min(1000,page.viewportSize().width-35),Math.round(page.viewportSize().height*.5));
 for(let i=0;i<8;i++){const y=await frame.evaluate(()=>scrollY),delta=target-y;if(Math.abs(delta)<8)return;await page.mouse.wheel(0,delta);await page.waitForTimeout(140);}
 assert.ok(Math.abs(await frame.evaluate(()=>scrollY)-target)<8,'real wheel reached target');
}
async function open(style='one-line',lang='vi',width=1440){
 const page=await browser.newPage({viewport:{width,height:width<700?844:1000}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/?style=${style}&lang=${lang}`);await page.waitForSelector(`#view-${style}`);
 const frame=page.frames().find(f=>f.url().includes(style==='classic'?'classic.html':'one-line.html'));
 await frame.locator('.site-footer .brand-mark svg').waitFor();await frame.evaluate(()=>document.fonts.ready);
 assert.match(await page.title(),/DevoraLabs/);assert.match(await frame.title(),/DevoraLabs/);
 assert.equal((await frame.locator('[data-profile-name]').innerText()).split('\n')[0],'DevoraLabs');
 assert.ok(await frame.locator('.brand-mark path').count()>=2);
 return {page,frame};
}
async function sample(frame){return frame.locator('#one-line-story').evaluate(el=>({y:scrollY,p:Number(el.style.getPropertyValue('--story-progress')),locked:el.dataset.interacted,mode:el.querySelector('[aria-selected=true]').dataset.mode,revision:el.querySelector('#demo-panel').dataset.renderRevision,path:el.querySelector('.story-thread').getAttribute('d'),piece:el.querySelector('[data-story-piece]')?.style.transform}));}
async function heroReplay(style,lang,width){
 const {page,frame}=await open(style,lang,width);
 await frame.locator('a[href="#trai-nghiem"]').first().click();await page.waitForTimeout(850);
 await frame.locator('[data-advance="DH-1042"]').click();
 await frame.locator('#order-filter').selectOption('processing');
 const before=await sample(frame),data=await frame.locator('#demo-panel').innerText();
 const targets=await frame.locator('#one-line-story').evaluate(el=>{const mobile=innerWidth<=680,stage=el.querySelector('.story-stage');const origin=mobile?stage.getBoundingClientRect().top+scrollY-innerHeight*.82:el.getBoundingClientRect().top+scrollY;const travel=mobile?Math.min(innerHeight*.72,560):parseFloat(el.style.getPropertyValue('--story-travel'));return {up:Math.max(0,origin+travel*.45),down:Math.max(0,origin+travel*.78)};});
 for(let cycle=1;cycle<=3;cycle++){
  await wheelTo(page,frame,targets.up);await page.waitForTimeout(230);const up=await sample(frame);
  assert.equal(up.locked,'false',`unlock ${style} ${cycle}`);assert.ok(up.p<.6,`reverse ${style} ${cycle}`);
  await wheelTo(page,frame,targets.down);await page.waitForTimeout(230);const down=await sample(frame);
  assert.ok(down.p>up.p+.2,'progress follows downward wheel');assert.notEqual(down.path,up.path,'real line geometry changes');assert.notEqual(down.piece,up.piece,'real module transform changes');
  assert.equal(down.revision,before.revision,'scroll never rerenders demo');assert.equal(await frame.locator('#order-filter').inputValue(),'processing');assert.equal(await frame.locator('#demo-panel').innerText(),data,'order state survives replay');
 }
 if(width>700){
  // PageUp/PageDown uses actual keyboard input while the iframe owns focus.
  await page.keyboard.press('PageUp');await page.waitForTimeout(500);const up=await sample(frame);
  await page.keyboard.press('PageDown');await page.waitForTimeout(500);const down=await sample(frame);assert.ok(down.p>up.p,'keyboard replays as well');
 }
 await page.screenshot({path:`${out}/${style}-${lang}-${width}.png`});
 results.push({test:'hero real wheel x3, line and module geometry, keyboard, no rerender',style,lang,width,pass:true});await page.close();
}
try{
 for(const style of ['one-line','kinetic','layers','blueprint','orbit'])await heroReplay(style,style==='one-line'?'vi':'en',1440);
 await heroReplay('one-line','vi',390);
 const {page,frame}=await open();
 // Capture actual CSS animation time/transform, not a class or instrumentation counter.
 const title=frame.locator('#san-pham h2'),line=title.locator('.page-title-line').first();
 const titleY=await title.evaluate(el=>el.getBoundingClientRect().top+scrollY);
 let lastAnimationStart=null;
 for(let cycle=0;cycle<3;cycle++){
  const vh=await frame.evaluate(()=>innerHeight);
  await wheelTo(page,frame,titleY-vh-70);await page.waitForTimeout(100);
  assert.equal(await title.evaluate(el=>el.classList.contains('motion-shown')),false,'offscreen title rearmed');
  await wheelTo(page,frame,titleY-vh+140);
  const current=await line.evaluate(el=>({transform:getComputedStyle(el).transform,animations:el.getAnimations().map(a=>({start:a.startTime,time:a.currentTime,state:a.playState}))}));
  assert.ok(current.animations.some(a=>a.state==='running'),'real CSS animation running');
  const start=current.animations[0].start;assert.notEqual(start,lastAnimationStart,'new animation instance on re-entry');lastAnimationStart=start;
  assert.notEqual(current.transform,'none','line actually moving');
  await page.waitForTimeout(1100);
  assert.equal(await line.evaluate(el=>getComputedStyle(el).transform),'matrix(1, 0, 0, 1, 0, 0)','line reaches its readable final position');
 }
 results.push({test:'section CSS animation re-entry x3 with real timing and transform',pass:true});
 // Keep edited data through scroll replay, explicit replay, locale and style switches.
 await frame.locator('a[href="#trai-nghiem"]').first().click();await page.waitForTimeout(850);
 await frame.locator('[data-mode="shop"]').click();await frame.locator('[data-add="notebook"]').click();await frame.locator('[data-add="notebook"]').click();
 const shop=await frame.locator('.cart').innerText();assert.equal(await frame.locator('[data-story-piece]').count(),3,'shop uses its own live modules');
 await frame.locator('#replay').click();await page.waitForTimeout(2200);assert.equal((await sample(frame)).mode,'shop');assert.equal(await frame.locator('.cart').innerText(),shop);
 const replayEnd=await sample(frame);await wheelTo(page,frame,replayEnd.y-650);await page.waitForTimeout(250);assert.equal((await sample(frame)).locked,'false','first upward wheel after explicit replay unlocks');
 await wheelTo(page,frame,replayEnd.y);await page.waitForTimeout(250);
 await frame.locator('[data-mode="internal"]').click();await frame.locator('[data-approve="YC-028"]').click();await frame.locator('#request-filter').selectOption('all');
 const internal=await frame.locator('#demo-panel').innerText();const revision=(await sample(frame)).revision;
 await page.mouse.move(1050,500);await page.mouse.wheel(0,-700);await page.waitForTimeout(400);await page.mouse.wheel(0,700);await page.waitForTimeout(400);
 assert.equal((await sample(frame)).mode,'internal');assert.equal((await sample(frame)).revision,revision);assert.equal(await frame.locator('#demo-panel').innerText(),internal);
 await frame.locator('#client-name').fill('QA Devora');await frame.locator('#client-contact').fill('qa@example.test');await frame.locator('#client-problem').fill('Giữ nguyên nội dung đang viết khi cuộn lên xuống.');
 await frame.locator('#brief-form button[type=submit]').click();await frame.locator('#brief-output').fill('Edited locally — giữ nguyên bản này');
 await frame.locator('.site-header .brand').click();await page.waitForTimeout(900);
 await page.locator('#website-picker').selectOption('orbit');await page.waitForTimeout(250);await page.locator('[data-language="en"]').click();await page.waitForTimeout(250);await page.locator('#website-picker').selectOption('one-line');await page.waitForTimeout(300);
 assert.equal(await frame.locator('#client-name').inputValue(),'QA Devora');assert.equal(await frame.locator('#brief-output').inputValue(),'Edited locally — giữ nguyên bản này');assert.equal((await sample(frame)).mode,'internal');assert.equal(await frame.locator('#request-filter').inputValue(),'all');
 await frame.locator('a[href="#trai-nghiem"]').first().click();await page.waitForTimeout(850);await frame.locator('[data-mode="shop"]').click();assert.equal(await frame.locator('.quantity output').textContent(),'2');
 results.push({test:'cart, approvals, filters, form and edited brief survive replay, locale and style switching',pass:true});
 await page.close();
 for(const lang of ['vi','en']){const classic=await open('classic',lang,390);assert.equal(await classic.frame.locator('html').getAttribute('lang'),lang);assert.equal(await classic.frame.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await classic.page.close();}
 results.push({test:'original style branding and mobile overflow in VI and EN',pass:true});
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(`${base}/?style=one-line&lang=en`);await reduced.waitForSelector('#view-one-line');const rf=reduced.frames().find(f=>f.url().includes('one-line.html'));await rf.locator('html.page-motion').waitFor();assert.equal((await sample(rf)).p,1);assert.equal(await rf.locator('#san-pham .page-title-line').first().evaluate(el=>getComputedStyle(el).transform),'none');await reduced.close();
 results.push({test:'reduced motion keeps all content visible',pass:true});assert.deepEqual(errors,[]);
 await writeFile(`${out}/browser-regression.json`,JSON.stringify({base,results,errors},null,2));console.log(JSON.stringify({base,results,errors},null,2));
}finally{await browser.close();}
