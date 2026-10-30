import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const out='../redline-delivery/creative-lab';await mkdir(out,{recursive:true});
const errors=[],results=[],base='http://127.0.0.1:4173',themes=['frame-shift','cobalt-court','cutout-dept'];
try{
for(const theme of themes)for(const width of [320,390,768,1024,1440]){
 const p=await browser.newPage({viewport:{width,height:width<700?844:1000}});p.on('pageerror',e=>errors.push(e.message));
 await p.goto(`${base}/?style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));await f.locator('#project-list .project-row').first().waitFor();await f.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
 assert.equal(await f.locator('html').getAttribute('data-theme'),theme);
 for(const section of ['intro','projects','demo','services','process','about','contact']){
  await f.locator('#'+section).scrollIntoViewIfNeeded();assert.equal(await f.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${theme} ${width} ${section} overflow`);
 }
 await f.locator('#intro').scrollIntoViewIfNeeded();await f.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(1400);
 if([390,1440].includes(width))await p.screenshot({path:`${out}/${theme}-${width}.png`});
 await f.locator('[data-select="ban-hang"]').click();assert.match(await f.locator('#hero-image').getAttribute('src'),/shop/);
 await f.locator('[data-open="ban-hang"]').first().click();assert.ok(await f.locator('#project-dialog').evaluate(e=>e.open));await p.keyboard.press('Escape');assert.equal(await f.locator('#project-dialog').evaluate(e=>e.open),false);
 await f.locator('#tab-orders').click();await f.locator('[data-advance="DH-1042"]').click();await f.locator('#order-filter').selectOption('processing');
 for(const t of themes){await p.locator("#creative-picker").selectOption(t);assert.equal(await f.locator('#order-filter').inputValue(),'processing');assert.match(await f.locator('#demo-panel').innerText(),/DH-1042/)}
 await f.locator('#tab-shop').click();await f.locator('[data-add="notebook"]').click();await f.locator('[data-qty="notebook"][data-delta="1"]').click();
 for(const t of themes){await p.locator("#creative-picker").selectOption(t);assert.match(await f.locator('#cart-total').innerText(),/240/)}
 await f.locator('#tab-internal').click();await f.locator('[data-approve="YC-028"]').click();assert.match(await f.locator('.demo-heading').innerText(),/1 đang chờ/);
 for(const t of themes){await p.locator("#creative-picker").selectOption(t);assert.match(await f.locator('.demo-heading').innerText(),/1 đang chờ/)}
 await f.locator('[name="name"]').fill('Nguyễn <QA>');await f.locator('[name="contact"]').fill('qa@example.test');await f.locator('[name="problem"]').fill('Quản lý đơn & phê duyệt');await f.locator('button[type="submit"]').click();const brief=await f.locator('#brief-output').inputValue();
 for(const t of themes){await p.locator("#creative-picker").selectOption(t);assert.equal(await f.locator('#brief-output').inputValue(),brief);assert.equal(await f.locator('[name="name"]').inputValue(),'Nguyễn <QA>')}
 await f.locator('[data-open="don-hang"]').first().click();for(const t of themes){await f.locator(`.detail-themes [data-theme-choice="${t}"]`).click();assert.ok(await f.locator('#project-dialog').evaluate(e=>e.open));assert.match(await f.locator('#detail-title').innerText(),/đơn hàng/)}await p.keyboard.press('Escape');
 await p.locator('#website-picker').selectOption('classic');await p.locator('#view-classic').waitFor();await p.locator('[data-web="2"]').click();assert.equal(await f.locator('#brief-output').inputValue(),brief);
 await f.locator('#tab-shop').click();assert.match(await f.locator('#cart-total').innerText(),/240/);await f.locator('#reset-demo').click();assert.match(await f.locator('#cart-total').innerText(),/^0/);
 await f.locator('#tab-orders').click();await p.keyboard.press('ArrowRight');assert.equal(await f.locator('#tab-shop').getAttribute('aria-selected'),'true');
 await p.emulateMedia({reducedMotion:'reduce'});await f.locator('[data-select="noi-bo"]').click();assert.equal(await f.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);
 results.push({theme,width,pass:true});console.log('PASS',theme,width);await p.close();
}
assert.deepEqual(errors,[]);const p=await browser.newPage();
for(const style of ['classic','one-line','kinetic','layers','blueprint','orbit']){await p.goto(`${base}/?style=${style}`);await p.locator('#view-'+style).waitFor();const f=p.frames().find(f=>/classic.html|one-line.html/.test(f.url()));await f.locator('#demo-panel').waitFor();assert.equal(await p.locator('#website-picker').inputValue(),style);results.push({legacy:style,pass:true})}await p.close();
await writeFile(`${out}/results.json`,JSON.stringify({results,errors},null,2));
}finally{await browser.close()}
