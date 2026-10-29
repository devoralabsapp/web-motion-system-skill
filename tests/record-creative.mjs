import {createRequire} from 'node:module';
import {rename} from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:'../redline-delivery/creative-lab',size:{width:1440,height:1000}}});
const p=await context.newPage();await p.goto('http://127.0.0.1:4173/?style=creative-lab&theme=frame-shift');await p.locator('#view-creative-lab').waitFor();const f=p.frames().find(f=>f.url().includes('creative.html'));await f.locator('#hero-image').waitFor();await f.evaluate(()=>document.fonts.ready);
for(const theme of ['frame-shift','cobalt-court','cutout-dept']){
await f.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.locator("#creative-picker").selectOption(theme);await p.waitForTimeout(1200);
await f.locator('[data-select="ban-hang"]').click();await p.waitForTimeout(850);await f.locator('#hero-shot').click();await p.waitForTimeout(1100);await p.keyboard.press('Escape');
await f.locator('#projects').scrollIntoViewIfNeeded();await p.waitForTimeout(1300);await p.mouse.wheel(0,400);await p.waitForTimeout(1200);await p.mouse.wheel(0,-650);await p.waitForTimeout(1000);
await f.locator('#tab-shop').click();await f.locator('[data-add="notebook"]').click();await p.waitForTimeout(850);await p.mouse.wheel(0,-750);await p.waitForTimeout(650);await p.mouse.wheel(0,700);await p.waitForTimeout(650);
}
const video=p.video();await context.close();await rename(await video.path(),'../redline-delivery/creative-lab/creative-motion-v2.webm');await browser.close();
