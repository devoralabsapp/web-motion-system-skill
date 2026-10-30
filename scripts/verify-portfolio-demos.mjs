import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:4190',out=new URL('../../redline-delivery/motion-catalog/portfolio/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'}),errors=[],failures=[],results=[];
function watch(page){page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failures.push({url:r.url(),status:r.status()})});}
function frame(page,key){return page.frameLocator('#portfolio-'+key)}
async function ready(page,key){await page.waitForFunction(key=>{const d=document.getElementById('portfolio-'+key)?.contentDocument;return d?.readyState==='complete'&&d.querySelector('#demo-panel')?.children.length>0},key);await frame(page,key).locator('h1').waitFor();}
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});watch(page);await page.goto(base+'/#view=demo1');await ready(page,'one-line');
 assert.deepEqual(await page.locator('.main-nav a').allTextContents(),['All motions','Motion Lab','In practice ↗','Demo 1','Demo 2']);assert.equal(await page.locator('#demo-one-style option').count(),6);assert.equal(await page.locator('#demo-two-style option').count(),3);
 for(const style of ['classic','one-line','kinetic','layers','blueprint','orbit']){
   await page.locator('#demo-one-style').selectOption(style);await ready(page,style);const f=frame(page,style);if(style!=='classic'){await f.locator('a[href="#trai-nghiem"]').first().click();await page.waitForTimeout(950);}
   await f.locator('#tab-shop').click();await f.locator('[data-add=notebook]').click();assert.ok(await f.locator('#demo-panel').innerText());await f.locator('[name=name]').fill('Giữ nguyên / '+style);
   if(style!=='classic')assert.equal(await f.locator('html').getAttribute('data-motion-style'),style);
   results.push({demo:1,style,loaded:true,form:true,shop:true});console.log('Demo 1:',style);
 }
 await page.locator('#demo-one-style').selectOption('one-line');assert.equal(await frame(page,'one-line').locator('[name=name]').inputValue(),'Giữ nguyên / one-line');assert.equal(await frame(page,'one-line').locator('#tab-shop').getAttribute('aria-selected'),'true');
 const oneContent=await frame(page,'one-line').locator('#demo-panel').innerText();
 await page.locator('[data-view=demo2]').click();await ready(page,'demo2');const f=frame(page,'demo2');await f.locator('[name=name]').fill('Demo 2 vẫn giữ dữ liệu');await f.locator('#tab-shop').click();await f.locator('[data-add=notebook]').click();
 const cart=await f.locator('#cart-total').innerText();
 for(const theme of ['frame-shift','cobalt-court','cutout-dept']){await page.locator('#demo-two-style').selectOption(theme);await f.locator(`html[data-theme="${theme}"]`).waitFor();assert.equal(await f.locator('#cart-total').innerText(),cart);assert.equal(await f.locator('[name=name]').inputValue(),'Demo 2 vẫn giữ dữ liệu');results.push({demo:2,theme,loaded:true,statePreserved:true});console.log('Demo 2:',theme);}
 await page.locator('#view-demo2 .demo-language').selectOption('en');await f.locator('html[lang=en]').waitFor();assert.equal(await f.locator('[name=name]').inputValue(),'Demo 2 vẫn giữ dữ liệu');await page.locator('#view-demo2 .demo-language').selectOption('vi');await f.locator('html[lang=vi]').waitFor();
 await page.locator('[data-view=all]').click();await page.waitForFunction(()=>document.querySelectorAll('.motion-card').length===240);await frame(page,'demo2').locator('html[data-explorer-reduced=true]').waitFor({state:'attached'});
 await page.locator('[data-view=demo1]').click();assert.equal(await frame(page,'one-line').locator('[name=name]').inputValue(),'Giữ nguyên / one-line');assert.equal(await frame(page,'one-line').locator('#demo-panel').innerText(),oneContent);await frame(page,'one-line').locator('html[data-explorer-reduced=false]').waitFor({state:'attached'});
 await page.locator('#motion-toggle').click();await frame(page,'one-line').locator('html[data-explorer-reduced=true]').waitFor();await page.locator('#motion-toggle').click();await frame(page,'one-line').locator('html[data-explorer-reduced=false]').waitFor();
 await page.locator('[data-view=demo2]').click();assert.equal(await f.locator('#cart-total').innerText(),cart);assert.equal(await f.locator('[name=name]').inputValue(),'Demo 2 vẫn giữ dữ liệu');await f.locator('html[data-explorer-reduced=false]').waitFor();
 await f.locator('#hero-image').evaluate(el=>el.scrollIntoView());await page.waitForTimeout(500);assert.equal(await f.locator('#hero-image').evaluate(el=>getComputedStyle(el).transform==='none'||getComputedStyle(el).transform.startsWith('matrix')),true);
 await page.screenshot({path:fileURLToPath(new URL('desktop-demo2.png',out))});
 await page.locator('[data-view=demo1]').click();await page.locator('#demo-one-style').selectOption('blueprint');await page.screenshot({path:fileURLToPath(new URL('desktop-demo1.png',out))});
 await page.close();
 for(const width of [320,390,768,1024]){
  const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});watch(p);
  for(const [view,key] of [['demo1','one-line'],['demo2','demo2']]){await p.goto(base+'/#view='+view);await ready(p,key);await frame(p,key).locator('html[data-explorer-reduced=true]').waitFor();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,view+' no parent overflow '+width);assert.equal(await frame(p,key).locator('html').evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,view+' no iframe overflow '+width);const r=await p.locator('#portfolio-'+key).boundingBox();assert.ok(r.height>350);assert.ok(r.y+r.height<=900+5,view+' frame fits screen '+width);await frame(p,key).locator('[name=name]').fill('Mobile demo');}
  if(width===390)await p.screenshot({path:fileURLToPath(new URL('mobile-demo2.png',out))});results.push({width,responsive:true,reducedMotion:true,frameFits:true});await p.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);console.log(JSON.stringify({passed:true,base,results,consoleErrors:errors,failedRequests:failures},null,2));await writeFile(new URL('verification.json',out),JSON.stringify({passed:true,base,results},null,2));
}finally{await browser.close()}
