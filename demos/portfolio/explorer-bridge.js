// The host controls presentation only. Demo data and selected controls stay mounted.
import {initI18n} from './i18n.js';
initI18n();
let hostReduced=false,hostVisible=true,restoredPreference=false,forced=false;
function motionButton(){return document.querySelector('#reduce-motion,#motion-toggle');}
function sync(){
  const button=motionButton(),block=hostReduced||!hostVisible||document.hidden;
  if(block&&!forced){restoredPreference=button?.getAttribute('aria-pressed')==='true';forced=true;}
  if(button&&(block||forced)){const next=block||restoredPreference;if((button.getAttribute('aria-pressed')==='true')!==next)button.click();}
  document.documentElement.dataset.explorerReduced=String(block);
  if(!block)forced=false;
  if(block)document.getAnimations().forEach(a=>a.cancel());
  // Existing motion controllers already understand the original visibility contract.
  dispatchEvent(new MessageEvent('message',{origin:location.origin,source:parent,data:{type:'redline:visibility',visible:hostVisible&&!document.hidden}}));
}
addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='motion-explorer:host')return;hostVisible=event.data.visible===true;hostReduced=event.data.reduced===true;sync();});
document.addEventListener('visibilitychange',sync);
