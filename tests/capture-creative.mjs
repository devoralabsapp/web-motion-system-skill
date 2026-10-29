import {createRequire} from 'node:module';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/'),{chromium}=require('playwright');
const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
try{for(const width of [1440,390])for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
const p=await b.newPage({viewport:{width,height:width<700?844:1000}});await p.goto(`http://127.0.0.1:4173/?web=2&style=creative-lab&theme=${theme}`);await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));await f.locator('.hero-word').first().waitFor();await f.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);await p.screenshot({path:`../redline-delivery/creative-lab/${theme}-${width}.png`});await p.close();
}}finally{await b.close()}
