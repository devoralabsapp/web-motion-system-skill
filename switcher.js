export const styles=[
 {id:'classic',label:'Bản gốc',title:'Portfolio Redline Atelier — Bản gốc',url:'classic.html'},
 {id:'one-line',label:'Một nét, thành hệ thống',title:'Portfolio Redline Atelier — Một nét, thành hệ thống',url:'one-line.html'}
];
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
 const url=new URL(style.url,location.href);
 if(initial){const project=new URLSearchParams(location.search).get('project');if(project)url.searchParams.set('project',project);url.hash=location.hash;}
 frame.src=url.href;
 frame.addEventListener('load',()=>{loading.hidden=true;frame.contentWindow.postMessage({type:'redline:visibility',visible:selected===style.id},frameOrigin);});
 frames.set(style.id,frame);panel.append(frame);
}
function selectStyle(id,{historyMode='none',focus=false,initial=false}={}){
 if(!valid(id))return;
 const style=styles.find(style=>style.id===id);
 mount(style,initial);
 selected=id;document.documentElement.dataset.style=id;
 for(const [key,frame] of frames)frame.contentWindow.postMessage({type:'redline:visibility',visible:key===id},frameOrigin);
 for(const item of styles){const active=item.id===id;const tab=document.getElementById('style-'+item.id),panel=document.getElementById('panel-'+item.id);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panel.classList.toggle('is-inactive',!active);panel.inert=!active;panel.setAttribute('aria-hidden',String(!active));if(active&&focus)tab.focus();}
 document.title=style.title;
 document.getElementById('style-status').textContent='Đang xem: '+style.label+'.';
 if(historyMode!=='none'){const url=new URL(location.href);url.searchParams.set('style',id);history[historyMode==='push'?'pushState':'replaceState']({style:id},'',url);}
 try{localStorage.setItem(storageKey,id);}catch{}
}
document.querySelector('.style-tabs').addEventListener('click',event=>{const tab=event.target.closest('[data-style]');if(tab&&tab.dataset.style!==selected)selectStyle(tab.dataset.style,{historyMode:'push'});});
document.querySelector('.style-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=styles.findIndex(style=>style.id===selected);const next=event.key==='Home'?0:event.key==='End'?styles.length-1:(current+(event.key==='ArrowRight'?1:styles.length-1))%styles.length;selectStyle(styles[next].id,{historyMode:'push',focus:true});});
addEventListener('popstate',()=>selectStyle(chosenStyle()));
selectStyle(chosenStyle(),{historyMode:'replace',initial:true});
