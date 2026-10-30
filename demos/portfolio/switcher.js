import {initI18n,refreshLanguage,getLanguage,setLanguage} from './i18n.js';
import {translatePhrase} from './i18n-text.js';
import {initMotionNotice} from './motion-notice.js';
export const styles=[
 {id:'classic',label:'Bản gốc',title:'Portfolio DevoraLabs — Bản gốc',url:'classic.html'},
 {id:'one-line',label:'Một nét, thành hệ thống',title:'Portfolio DevoraLabs — Một nét, thành hệ thống',url:'one-line.html'},
 ...[{id:'kinetic',label:'Chữ động'},{id:'layers',label:'Xếp lớp'},{id:'blueprint',label:'Bản vẽ'},{id:'orbit',label:'Quỹ đạo'}].map(style=>({...style,title:'Portfolio DevoraLabs — '+style.label,url:'one-line.html',variant:style.id}))
 ,{id:'creative-lab',label:'Creative Lab · Demo 2',title:'DevoraLabs — Creative Lab',url:'creative.html?v=process-motion-3'}
];
initI18n();
const picker=document.createElement('select');picker.id='website-picker';picker.setAttribute('aria-label','Chọn kiểu Demo 1');
picker.innerHTML=styles.slice(0,6).map(s=>`<option value="${s.id}">${s.label}</option>`).join('');
const groups=document.createElement('div');groups.className='website-groups';
groups.innerHTML='<div class="website-group" data-web-group="1"><button class="web-activate" data-web="1" aria-pressed="false">Demo 1 <small>6 kiểu cũ</small></button></div><div class="website-group" data-web-group="2"><button class="web-activate" data-web="2" aria-pressed="false">Demo 2 <small>3 kiểu mới</small></button><select id="creative-picker" aria-label="Chọn kiểu Demo 2"><option value="frame-shift">Điện ảnh · Frame Shift</option><option value="cobalt-court">Cobalt · Cobalt Court</option><option value="cutout-dept">Collage · Cutout Dept.</option></select></div>';
groups.querySelector('[data-web-group="1"]').append(picker);
document.querySelector('.style-picker').append(groups);document.querySelector('.style-tabs').hidden=true;
document.getElementById('style-label').hidden=true;
const creativePicker=document.getElementById('creative-picker');
let creativeTheme=['frame-shift','cobalt-court','cutout-dept'].includes(new URLSearchParams(location.search).get('theme'))?new URLSearchParams(location.search).get('theme'):null;
try{creativeTheme ||= localStorage.getItem('devoralabs-creative-theme')}catch{}
if(!['frame-shift','cobalt-court','cutout-dept'].includes(creativeTheme))creativeTheme='frame-shift';
creativePicker.value=creativeTheme;
let oldStyle='one-line';
picker.value=oldStyle;
groups.addEventListener('click',event=>{const b=event.target.closest('[data-web]');if(b)selectStyle(b.dataset.web==='1'?oldStyle:'creative-lab',{historyMode:'push'});});
creativePicker.addEventListener('change',()=>{creativeTheme=creativePicker.value;selectStyle('creative-lab',{historyMode:'push'});frames.get('creative-lab')?.contentWindow.postMessage({type:'devoralabs:set-theme',theme:creativeTheme},frameOrigin);});
picker.addEventListener('change',()=>selectStyle(picker.value,{historyMode:'push'}));
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
function chosenStyle(){const q=new URLSearchParams(location.search),query=q.get('style');if(q.get('web')==='1'&&!valid(query))return oldStyle;if(q.get('web')==='2')return 'creative-lab';return valid(query)?query:valid(savedStyle())?savedStyle():'creative-lab';}
function mount(style,initial){
 if(frames.has(style.id))return;
 const panel=document.getElementById('panel-'+style.id),loading=panel.querySelector('.view-loading');
 const frame=document.createElement('iframe');frame.title=style.title;frame.id='view-'+style.id;
 const url=new URL(style.url,location.href);url.searchParams.set('lang',getLanguage());if(style.variant)url.searchParams.set('variant',style.variant);
 if(style.id==='creative-lab')url.searchParams.set('theme',creativeTheme);
 if(initial){const project=new URLSearchParams(location.search).get('project');if(project)url.searchParams.set('project',project);url.hash=location.hash;}
 frame.src=url.href;
 frame.addEventListener('load',()=>{loading.hidden=true;if(style.id==='creative-lab')frame.contentWindow.postMessage({type:'devoralabs:set-theme',theme:creativeTheme},frameOrigin);frame.contentWindow.postMessage({type:'redline:visibility',visible:selected===style.id},frameOrigin);frame.contentWindow.postMessage({type:'redline:language',language:getLanguage()},frameOrigin);});
 frames.set(style.id,frame);panel.append(frame);
}
function selectStyle(id,{historyMode='none',focus=false,initial=false}={}){
 if(!valid(id))return;
 const style=styles.find(style=>style.id===id);
 mount(style,initial);
 selected=id;document.documentElement.dataset.style=id;
 const web=id==='creative-lab'?'2':'1';
 if(web==='1'){picker.value=id;oldStyle=id;}
 groups.querySelectorAll('[data-web]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.web===web)));
 groups.querySelectorAll('[data-web-group]').forEach(g=>g.classList.toggle('is-current',g.dataset.webGroup===web));
 creativePicker.value=creativeTheme;
 for(const [key,frame] of frames)frame.contentWindow.postMessage({type:'redline:visibility',visible:key===id},frameOrigin);
 for(const item of styles){const active=item.id===id;const tab=document.getElementById('style-'+item.id),panel=document.getElementById('panel-'+item.id);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panel.classList.toggle('is-inactive',!active);panel.inert=!active;panel.setAttribute('aria-hidden',String(!active));if(active&&focus)tab.focus();if(active)tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
 document.title=translatePhrase(style.title,getLanguage());
 document.getElementById('style-status').textContent='Đang xem: '+style.label+'.';
 if(historyMode!=='none'){const url=new URL(location.href);url.searchParams.set('style',id);url.searchParams.set('web',web);if(web==='2')url.searchParams.set('theme',creativeTheme);history[historyMode==='push'?'pushState':'replaceState']({style:id},'',url);}
 try{localStorage.setItem(storageKey,id);}catch{}
}
document.querySelector('.style-tabs').addEventListener('click',event=>{const tab=event.target.closest('[data-style]');if(tab&&tab.dataset.style!==selected)selectStyle(tab.dataset.style,{historyMode:'push'});});
document.querySelector('.style-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=styles.findIndex(style=>style.id===selected);const next=event.key==='Home'?0:event.key==='End'?styles.length-1:(current+(event.key==='ArrowRight'?1:styles.length-1))%styles.length;selectStyle(styles[next].id,{historyMode:'push',focus:true});});
function syncLanguage(){document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===getLanguage())));for(const frame of frames.values())frame.contentWindow.postMessage({type:'redline:language',language:getLanguage()},frameOrigin);const style=styles.find(item=>item.id===selected);if(style)document.title=translatePhrase(style.title,getLanguage());}
document.querySelector('.language-picker').addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)setLanguage(button.dataset.language);});
document.addEventListener('language:change',syncLanguage);
addEventListener('popstate',()=>{const q=new URLSearchParams(location.search),lang=q.get('lang');if(lang==='en'||lang==='vi')setLanguage(lang);if(['frame-shift','cobalt-court','cutout-dept'].includes(q.get('theme')))creativeTheme=q.get('theme');selectStyle(chosenStyle());if(selected==='creative-lab')frames.get(selected)?.contentWindow.postMessage({type:'devoralabs:set-theme',theme:creativeTheme},frameOrigin);});
addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==frames.get('creative-lab')?.contentWindow)return;if(event.data?.type==='devoralabs:theme'&&['frame-shift','cobalt-court','cutout-dept'].includes(event.data.theme)){creativeTheme=event.data.theme;creativePicker.value=creativeTheme;const url=new URL(location.href);url.searchParams.set('theme',creativeTheme);history.replaceState(history.state,'',url);}});
selectStyle(chosenStyle(),{historyMode:'replace',initial:true});

syncLanguage();refreshLanguage();
initMotionNotice();
