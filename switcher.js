import {initI18n,refreshLanguage,getLanguage,setLanguage} from './i18n.js';
import {translatePhrase} from './i18n-text.js';
export const styles=[
 {id:'classic',label:'Bản gốc',title:'Portfolio DevoraLabs — Bản gốc',url:'classic.html'},
 {id:'one-line',label:'Một nét, thành hệ thống',title:'Portfolio DevoraLabs — Một nét, thành hệ thống',url:'one-line.html'},
 ...[{id:'kinetic',label:'Chữ động'},{id:'layers',label:'Xếp lớp'},{id:'blueprint',label:'Bản vẽ'},{id:'orbit',label:'Quỹ đạo'}].map(style=>({...style,title:'Portfolio DevoraLabs — '+style.label,url:'one-line.html',variant:style.id}))
];
initI18n();
for(const [i,style] of styles.entries()){
 if(!document.getElementById('style-'+style.id)){const tab=document.createElement('button');tab.id='style-'+style.id;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+style.id);tab.dataset.style=style.id;tab.innerHTML='<span>'+String(i+1).padStart(2,'0')+'</span> '+style.label;document.querySelector('.style-tabs').append(tab);}
 if(!document.getElementById('panel-'+style.id)){const panel=document.createElement('section');panel.className='style-panel is-inactive';panel.id='panel-'+style.id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','style-'+style.id);panel.inert=true;panel.innerHTML='<p class="view-loading" role="status">Đang mở…</p>';document.querySelector('.style-views').append(panel);}
}
const valid=id=>styles.some(style=>style.id===id);
const storageKey='redline-preferred-style-v2';
const frameOrigin=location.protocol==='file:'?'*':location.origin;
let selected=null;
const frames=new Map();
function savedStyle(){try{return localStorage.getItem(storageKey);}catch{return null;}}
function chosenStyle(){const query=new URLSearchParams(location.search).get('style');return valid(query)?query:valid(savedStyle())?savedStyle():'one-line';}
function mount(style,initial){
 if(frames.has(style.id))return;
 const panel=document.getElementById('panel-'+style.id),loading=panel.querySelector('.view-loading');
 const frame=document.createElement('iframe');frame.title=style.title;frame.id='view-'+style.id;
 const url=new URL(style.url,location.href);url.searchParams.set('lang',getLanguage());if(style.variant)url.searchParams.set('variant',style.variant);
 if(initial){const project=new URLSearchParams(location.search).get('project');if(project)url.searchParams.set('project',project);url.hash=location.hash;}
 frame.src=url.href;
 frame.addEventListener('load',()=>{loading.hidden=true;frame.contentWindow.postMessage({type:'redline:visibility',visible:selected===style.id},frameOrigin);frame.contentWindow.postMessage({type:'redline:language',language:getLanguage()},frameOrigin);});
 frames.set(style.id,frame);panel.append(frame);
}
function selectStyle(id,{historyMode='none',focus=false,initial=false}={}){
 if(!valid(id))return;
 const style=styles.find(style=>style.id===id);
 mount(style,initial);
 selected=id;document.documentElement.dataset.style=id;
 for(const [key,frame] of frames)frame.contentWindow.postMessage({type:'redline:visibility',visible:key===id},frameOrigin);
 for(const item of styles){const active=item.id===id;const tab=document.getElementById('style-'+item.id),panel=document.getElementById('panel-'+item.id);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panel.classList.toggle('is-inactive',!active);panel.inert=!active;panel.setAttribute('aria-hidden',String(!active));if(active&&focus)tab.focus();if(active)tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
 document.title=translatePhrase(style.title,getLanguage());
 document.getElementById('style-status').textContent='Đang xem: '+style.label+'.';
 if(historyMode!=='none'){const url=new URL(location.href);url.searchParams.set('style',id);history[historyMode==='push'?'pushState':'replaceState']({style:id},'',url);}
 try{localStorage.setItem(storageKey,id);}catch{}
}
document.querySelector('.style-tabs').addEventListener('click',event=>{const tab=event.target.closest('[data-style]');if(tab&&tab.dataset.style!==selected)selectStyle(tab.dataset.style,{historyMode:'push'});});
document.querySelector('.style-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=styles.findIndex(style=>style.id===selected);const next=event.key==='Home'?0:event.key==='End'?styles.length-1:(current+(event.key==='ArrowRight'?1:styles.length-1))%styles.length;selectStyle(styles[next].id,{historyMode:'push',focus:true});});
function syncLanguage(){document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===getLanguage())));for(const frame of frames.values())frame.contentWindow.postMessage({type:'redline:language',language:getLanguage()},frameOrigin);const style=styles.find(item=>item.id===selected);if(style)document.title=translatePhrase(style.title,getLanguage());}
document.querySelector('.language-picker').addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)setLanguage(button.dataset.language);});
document.addEventListener('language:change',syncLanguage);
addEventListener('popstate',()=>{const lang=new URLSearchParams(location.search).get('lang');if(lang==='en'||lang==='vi')setLanguage(lang);selectStyle(chosenStyle());});
selectStyle(chosenStyle(),{historyMode:'replace',initial:true});

syncLanguage();refreshLanguage();
