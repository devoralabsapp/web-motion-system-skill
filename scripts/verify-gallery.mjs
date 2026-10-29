import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=spawn(process.execPath,[new URL('./preview-catalog.mjs',import.meta.url).pathname.replace(/^\/([A-Z]:)/i,'$1')],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe'],windowsHide:true});
let browser;
try{
 const [chunk]=await Promise.race([once(server.stdout,'data'),once(server,'exit').then(()=>{throw new Error('Preview server did not start')})]);
 const base=String(chunk).match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];assert.ok(base);
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 const results=[];
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.waitForFunction(()=>document.querySelectorAll('article').length===240);
  assert.equal(await page.locator('article img').evaluateAll(els=>els.every(el=>el.src.endsWith('.png'))),true,'static posters by default, including reduced motion');
  await page.locator('#search').fill('073');assert.equal(await page.locator('article').count(),1);
  assert.match(await page.locator('article h2').textContent(),/Path tracer/);
  const play=page.getByRole('button',{name:'Phát GIF'});
  const response=page.waitForResponse(r=>r.url().endsWith('073-path-tracer.gif'));
  await play.click();assert.equal((await response).status(),200);
  assert.equal(await page.getByRole('button',{name:'Dừng'}).getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:'Dừng'}).click();assert.ok((await page.locator('article img').getAttribute('src')).endsWith('.png'));
  await page.getByRole('button',{name:'Chép prompt'}).click();await page.getByRole('button',{name:'Đã chép'}).waitFor();
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/073 \/ Path tracer/);
  assert.equal((await page.request.get(new URL(await page.locator('.actions a').getAttribute('href'),page.url()).href)).status(),200);
  await page.locator('#search').fill('');await page.locator('#group').selectOption('24');assert.equal(await page.locator('article').count(),10);
  await page.locator('#group').selectOption('');await page.locator('#kind').selectOption('trigger');assert.equal(await page.locator('article').count(),10);
  await page.locator('#search').fill('no-match-for-this');assert.equal(await page.locator('#empty').isVisible(),true);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
  results.push({width,staticDefault:true,idSearch:true,filters:true,playStop:true,copyPrompt:true,recipeLink:true,noOverflow:true});
  await context.close();
 }
 console.log(JSON.stringify({passed:true,results},null,2));
}finally{await browser?.close();server.kill();}
