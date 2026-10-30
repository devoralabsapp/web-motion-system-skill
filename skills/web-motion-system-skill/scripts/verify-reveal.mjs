import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); }
catch { throw new Error('Provide an existing Playwright module via PLAYWRIGHT_MODULE or normal Node module resolution. No installation was attempted.'); }
const runtime = await readFile(new URL('../assets/stable-reveal.mjs', import.meta.url), 'utf8');
const mathText = await readFile(new URL('../assets/source/web1/story-math.js', import.meta.url), 'utf8');
const math = await import('data:text/javascript;base64,' + Buffer.from(mathText).toString('base64'));
const b = await playwright.chromium.launch({headless: true, ...(process.env.BROWSER_CHANNEL ? {channel: process.env.BROWSER_CHANNEL} : {})});
const fixture = `<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Motion regression fixture</title>
<style>*{box-sizing:border-box}body{margin:0;background:#141515;color:#f4f2eb;font:16px/1.7 Arial,sans-serif}.space{height:1100px}ol{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;padding:24px;list-style:none}li{border-top:1px solid #888;padding-top:20px}li>span{display:inline-block}h3{line-height:1.5}button,input{font:inherit;min-height:44px;max-width:100%}@media(max-width:700px){ol{grid-template-columns:1fr 1fr;gap:15px;padding:15px}}:focus-visible{outline:3px solid #f37668}</style>
<div class="space"></div><label>Tên của bạn <input id="name"></label><ol>${['Hiểu quy trình','Thống nhất hướng đi','Xây & thử cùng nhau','Bàn giao rõ ràng'].map((t,i)=>`<li><span>0${i+1}</span><h3>${t}</h3><p>Nội dung tiếng Việt rõ ràng, ổn định sau chuyển động.</p><button>Chọn bước ${i+1}</button></li>`).join('')}</ol><div class="space"></div>
<script type="module">import {createStableReveal} from '/runtime.mjs';window.motion=createStableReveal({anchors:document.querySelectorAll('li')});</script></html>`;
const server = createServer((req,res) => {
  if (req.url === '/runtime.mjs') { res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8'}); res.end(runtime); }
  else if (req.url === '/') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); res.end(fixture); }
  else { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const results = [];
try {
  // Web 1 geometric invariants, independent of a particular app's markup.
  const path = [0,0,0,0,30,50,100,100];
  assert.equal(math.scrollProgress(-500,1000),.5);
  assert.equal(math.scrollProgress(200,1000),0);
  assert.deepEqual(math.mixPath(path,path,.5),path);
  assert.throws(() => math.mixPath(path,[0,0],.5));
  assert.equal(math.followProgress(1,0,16) <= .14, true);
  assert.deepEqual(math.moduleRect({x:0},{x:20},{x:100,y:0,width:100,height:50,rotation:0},1),{x:100,y:0,width:100,height:50,rotation:0});
  results.push('Web 1 progress, compatible cubic topology, bounded follower, final module geometry');
  for (const width of [1440,390]) {
    const page = await b.newPage({viewport:{width,height:900}, reducedMotion:'no-preference'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(() => {
      window.starts=0;
      const original=Element.prototype.animate;
      Element.prototype.animate=function(...args){if(this.closest('li'))window.starts++;return original.apply(this,args)};
    });
    await page.goto(base);await page.waitForFunction(()=>window.motion);
    await page.locator('#name').fill('Giữ nguyên dữ liệu & dấu tiếng Việt');
    const top=await page.locator('ol').evaluate(el=>el.getBoundingClientRect().top+scrollY);
    // Real wheel input brings the entire two-row mobile fixture into view.
    await page.mouse.move(width*.6,600);await page.mouse.wheel(0,top-140-await page.evaluate(()=>scrollY));
    await page.waitForFunction(()=>[...document.querySelectorAll('li>p')].some(el=>el.getAnimations().some(a=>a.playState==='running')&&!['none','inset(0px)'].includes(getComputedStyle(el).clipPath)));
    assert.ok(await page.locator('li>p').evaluateAll(els=>els.some(el=>el.getAnimations().some(a=>a.playState==='running')&&!['none','inset(0px)'].includes(getComputedStyle(el).clipPath))),'motion must be visible, not just scheduled');
    await page.waitForTimeout(1250);
    const settled=()=>page.locator('li,li>*').evaluateAll(els=>els.every(el=>getComputedStyle(el).clipPath==='none'&&getComputedStyle(el).opacity==='1'&&el.getAnimations().every(a=>a.playState!=='running')));
    assert.ok(await settled());const count=await page.evaluate(()=>starts);assert.ok(count>=16);
    await page.waitForTimeout(1800);assert.equal(await page.evaluate(()=>starts),count,'no stationary loop');
    for(const d of [-5,5,-5,5]){await page.mouse.wheel(0,d);await page.waitForTimeout(80)}
    assert.equal(await page.evaluate(()=>starts),count,'no boundary jitter replay');
    await page.mouse.wheel(0,-3000);await page.waitForTimeout(200);await page.mouse.wheel(0,top-140);await page.waitForTimeout(180);
    assert.ok(await page.evaluate(()=>starts)>count,'full exit and return replays');
    await page.locator('li button').first().focus();assert.equal(await page.locator('li').first().evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0,'focus settles its card');
    await page.evaluate(()=>motion.setVisible(false));assert.ok(await settled());await page.evaluate(()=>motion.setVisible(true));
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.ok(await settled());
    assert.equal(await page.locator('#name').inputValue(),'Giữ nguyên dữ liệu & dấu tiếng Việt');
    await page.emulateMedia({reducedMotion:'no-preference'});await page.evaluate(()=>motion.destroy());const stopped=await page.evaluate(()=>starts);
    await page.mouse.wheel(0,-3000);await page.waitForTimeout(100);await page.mouse.wheel(0,top-140);await page.waitForTimeout(120);assert.equal(await page.evaluate(()=>starts),stopped,'destroy removes listeners');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
    results.push({width,visibleMotion:true,settles:true,replay:true,noLoop:true,focus:true,reducedMotion:true,destroy:true,statePreserved:true});await page.close();
  }
  console.log(JSON.stringify({passed:true,results},null,2));
} finally { await b.close(); await new Promise(resolve=>server.close(resolve)); }
