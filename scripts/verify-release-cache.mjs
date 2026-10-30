import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=fileURLToPath(new URL('../',import.meta.url)),dist=path.join(root,'dist');
const historical=(revision,file)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'show',revision+':web/'+file],{cwd:root,encoding:'utf8'});
const oldHTML=historical('8c06cde','index.html'),oldApp=historical('8c06cde','app.js'),oldCSS=historical('8c06cde','styles.css'),unversionedHTML=historical('0733d6e','index.html');
let phase=0;const requests={oldApp:0,oldCSS:0};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.jpg':'image/jpeg','.png':'image/png','.json':'application/json'};
const server=createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');if(u.pathname==='/'){res.setHeader('Content-Type',types['.html']);res.setHeader('Cache-Control','no-cache');res.end(phase===0?oldHTML:phase===1?unversionedHTML:await readFile(path.join(dist,'index.html')));return;}
  if(u.pathname==='/app.js'){requests.oldApp++;res.setHeader('Content-Type',types['.js']);res.setHeader('Cache-Control','public, max-age=14400');res.end(oldApp);return;}
  if(u.pathname==='/styles.css'){requests.oldCSS++;res.setHeader('Content-Type',types['.css']);res.setHeader('Cache-Control','public, max-age=14400');res.end(oldCSS);return;}
  const file=path.resolve(dist,'.'+decodeURIComponent(u.pathname));if(path.relative(dist,file).startsWith('..'))throw Error();res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','public, max-age=14400');res.end(await readFile(file));
}catch{res.writeHead(404);res.end('Not found')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.waitForFunction(()=>document.querySelectorAll('.motion-card').length===240);assert.equal(requests.oldApp,1);assert.equal(requests.oldCSS,1);
  phase=1;await page.goto(base+'/?release=unversioned');await page.locator('[data-view=demo1]').click();await page.waitForTimeout(120);
  assert.equal(await page.locator('#demo-one-stage iframe').count(),0,'cached pre-demo app reproduces the missing web');assert.equal(await page.locator('#view-all').isVisible(),true);assert.equal(requests.oldApp,1,'browser really reused cached app.js');
  phase=2;await page.goto(base+'/?release=fingerprinted');await page.waitForFunction(()=>document.querySelectorAll('.motion-card').length===240);
  for(const [view,key] of [['demo1','one-line'],['demo2','demo2']]){await page.locator('[data-view='+view+']').click();await page.waitForFunction(key=>document.getElementById('portfolio-'+key)?.contentDocument?.querySelector('#demo-panel')?.children.length>0,key);assert.equal(await page.locator('#view-'+view).isVisible(),true);const bounds=await page.locator('#portfolio-'+key).boundingBox();assert.ok(bounds.height>350);}
  assert.equal(requests.oldApp,1,'old app remains cached but is no longer used');assert.equal(requests.oldCSS,1,'old CSS remains cached but is no longer used');assert.deepEqual(errors,[]);
  const moduleURL=await page.locator('head script[type=module]').getAttribute('src');assert.match(moduleURL,/app\.[a-f0-9]{12}\.js$/);
  await page.reload();await page.waitForFunction(()=>document.querySelector('#portfolio-demo2')?.contentDocument?.querySelector('#demo-panel')?.children.length>0);assert.equal(await page.locator('head script[type=module]').getAttribute('src'),moduleURL);
  console.log(JSON.stringify({passed:true,realHTTPBrowserCache:true,unversionedFailureReproduced:true,upgradeKeepsOldCache:true,versionedUpgradeShowsBothDemos:true,warmReload:true,requests,consoleErrors:errors},null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
