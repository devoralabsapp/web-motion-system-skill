import {clamp,range,followProgress} from './story-math.js';

export function initPageMotion(){
 const html=document.documentElement;
 const reduced=()=>html.dataset.motion==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const sections=[...document.querySelectorAll('main > .section')];
 const units=[],visible=new Set(),moving=new Set();let frame=0,lastTime=0,active=true,hostVisible=true,pageProgress=0,currentChapter=0;
 const register=(element,kind)=>{if(!element)return;element.classList.add('motion-unit');element.dataset.motionKind=kind;units.push(element);};
 // Split at real line breaks while keeping nested emphasis and Vietnamese intact.
 function splitChildren(parent){let groups=[[]];for(const node of parent.childNodes){
  let parts;if(node.nodeType===3)parts=[[node.cloneNode(true)]];
  else if(node.nodeName==='BR')parts=[[],[]];
  else if(node.nodeType===1)parts=splitChildren(node).map(children=>{const copy=node.cloneNode(false);copy.append(...children);return [copy];});
  else continue;
  groups.at(-1).push(...parts[0]);for(const part of parts.slice(1))groups.push(part);
 }return groups;}
 sections.forEach((section,i)=>{
  section.classList.add('motion-section');section.dataset.chapter=String(i+2);
  section.querySelectorAll('h2').forEach(title=>{const lines=splitChildren(title);title.replaceChildren();lines.forEach((nodes,index)=>{const mask=document.createElement('span'),line=document.createElement('span');mask.className='page-title-mask';line.className='page-title-line';line.style.setProperty('--line-index',index);line.append(...nodes);mask.append(line);title.append(mask);});register(title,'title');});
  section.querySelectorAll('.eyebrow,.section-heading > p,.process-intro,.process-layout > div > .text-link,.about-layout p,.contact-copy > p:not(.eyebrow),.contact-notice').forEach(el=>register(el,'copy'));
 });
 document.querySelectorAll('.project-record').forEach((record,i)=>{
  register(record,'project');record.style.setProperty('--record-index',i);
  const image=record.querySelector('.project-shot img'),plane=document.createElement('span'),reveal=document.createElement('span');plane.className='project-image-plane';reveal.className='project-image-reveal';image.before(reveal);reveal.append(plane);plane.append(image);
 });
 document.querySelectorAll('.problem-list > div').forEach(el=>register(el,'problem'));
 document.querySelectorAll('.service-row').forEach(el=>register(el,'service'));
 document.querySelectorAll('.process-list li').forEach(el=>register(el,'step'));
 document.querySelectorAll('#brief-form .field,#brief-form .app-types,#brief-form .form-submit').forEach(el=>register(el,'field'));
 register(document.querySelector('.site-footer'),'footer');
 const diagram=document.querySelector('.process-drawing');register(diagram,'diagram');
 const processPath=diagram?.querySelector('path[stroke="var(--accent)"]');processPath?.setAttribute('pathLength','1');
 const rail=document.createElement('nav');rail.className='page-rail';rail.setAttribute('aria-label','Đi tới phần nội dung');
 const chapters=[['#','Mở đầu'],...sections.map(section=>['#'+section.id,({ 'san-pham':'Dự án','van-de':'Bài toán','giai-phap':'Giải pháp','cach-lam':'Quy trình','ve-minh':'Giới thiệu','lien-he':'Liên hệ'})[section.id]])];
 rail.innerHTML='<span class="page-rail-track" aria-hidden="true"><i></i></span>'+chapters.map(([href,label],i)=>`<a href="${href}" aria-label="${label}" title="${label}" data-chapter="${i+1}">${String(i+1).padStart(2,'0')}</a>`).join('');document.querySelector('main').before(rail);
 rail.querySelector('a').addEventListener('click',event=>{event.preventDefault();document.querySelector('.site-header .brand').click();});
 const topLine=document.createElement('div');topLine.className='page-reading-line';topLine.setAttribute('aria-hidden','true');document.body.append(topLine);
 const railStops=[...rail.querySelectorAll('a')],process=document.querySelector('.process-list'),processSteps=[...process.children],projectCards=[...document.querySelectorAll('.project-record')];
 function reveal(unit){if(!active)return;if(!unit.classList.contains('motion-shown')){unit.dataset.motionRuns=String(Number(unit.dataset.motionRuns||0)+1);unit.classList.add('motion-shown');}}
 function rearm(unit,rect=unit.getBoundingClientRect()){
  if(!active||reduced()||unit.querySelector('input:focus,textarea:focus,select:focus'))return;
  if(rect.bottom<-100||rect.top>innerHeight+100)unit.classList.remove('motion-shown','motion-settled');
 }
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)reveal(entry.target);},{threshold:.06,rootMargin:'0px 0px -28px'});
 const resetObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(!entry.isIntersecting)rearm(entry.target,entry.boundingClientRect);},{threshold:0,rootMargin:'110px 0px'});
 const sectionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}schedule();},{rootMargin:'120px'});
 sections.forEach(section=>sectionObserver.observe(section));
 const showEverything=()=>{units.forEach(unit=>unit.classList.add('motion-shown','motion-settled'));};
 if(reduced())showEverything();units.forEach(unit=>{observer.observe(unit);resetObserver.observe(unit);});
 html.classList.add('page-motion');
 document.addEventListener('focusin',event=>{const unit=event.target.closest('.motion-unit');if(unit)unit.classList.add('motion-shown','motion-settled');});
 document.addEventListener('focusout',event=>{const unit=event.target.closest('.motion-unit');if(unit)queueMicrotask(()=>rearm(unit));});
 // All geometry reads precede writes; rAF runs only while scrolling or settling.
 function update(now){frame=0;if(!active||document.hidden)return;
  const delta=Math.min(48,now-lastTime||16);lastTime=now;const staticMode=reduced(),vh=innerHeight;
  const maxScroll=Math.max(1,document.documentElement.scrollHeight-vh),target=clamp(scrollY/maxScroll);
  pageProgress=staticMode?target:followProgress(pageProgress,target,delta,55);
  const measurements=sections.map(section=>({section,rect:section.getBoundingClientRect()}));
  const processBox=process.getBoundingClientRect(),steps=processSteps.map(el=>({el,top:el.getBoundingClientRect().top}));
  const cards=projectCards.filter(el=>visible.has(el.closest('.motion-section'))).map(el=>({el,rect:el.getBoundingClientRect()}));
  rail.style.setProperty('--reading-progress',pageProgress);topLine.style.setProperty('--reading-progress',pageProgress);let chapter=1;
  for(const {section,rect} of measurements){if(rect.top<vh*.48)chapter=Number(section.dataset.chapter);
   if(visible.has(section)||staticMode){const draw=String(staticMode?1:range(vh-rect.top,0,vh*.8));if(section.style.getPropertyValue('--chapter-draw')!==draw)section.style.setProperty('--chapter-draw',draw);}
  }
  if(chapter!==currentChapter){currentChapter=chapter;railStops.forEach(link=>{if(Number(link.dataset.chapter)===chapter)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  const processProgress=staticMode?1:range(vh*.78-processBox.top,0,processBox.height*.93);
  process.style.setProperty('--process-progress',processProgress);diagram?.style.setProperty('--route-progress',processProgress);
  steps.forEach(({el,top})=>el.classList.toggle('step-reached',staticMode||top<vh*.72));
  let needsFrame=pageProgress!==target;
  for(const {el,rect} of cards){const goal=staticMode||innerWidth<800?0:(.5-clamp((vh-rect.top)/(vh+rect.height)))*20;
   const before=Number(el.dataset.drift||0),next=staticMode?0:before+(goal-before)*(1-Math.exp(-delta/85));
   el.dataset.drift=String(Math.abs(next-goal)<.03?goal:next);el.style.setProperty('--preview-drift',el.dataset.drift+'px');if(Math.abs(next-goal)>=.03)needsFrame=true;
  }
  if(needsFrame&&!staticMode)schedule();
 }
 function schedule(){if(!frame&&active&&!document.hidden)frame=requestAnimationFrame(update);}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 new ResizeObserver(schedule).observe(document.querySelector('main'));
 document.addEventListener('motion:change',()=>{if(reduced()){showEverything();document.querySelectorAll('.project-record').forEach(el=>{el.dataset.drift='0';el.style.setProperty('--preview-drift','0px');});}else units.forEach(unit=>{if(!unit.querySelector('input:focus,textarea:focus,select:focus'))unit.classList.remove('motion-settled');rearm(unit);});schedule();});
 function setActive(next){active=next;html.dataset.viewActive=String(next);
  if(!next){for(const animation of document.getAnimations())if(animation.playState==='running'){animation.pause();moving.add(animation);}}
  else{for(const animation of moving)if(animation.playState==='paused')animation.play();moving.clear();}
  if(!next){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;schedule();}
  document.dispatchEvent(new CustomEvent('view:change',{detail:{active:next}}));
 }
 addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='redline:visibility'||typeof event.data.visible!=='boolean')return;hostVisible=event.data.visible;setActive(hostVisible&&!document.hidden);});
 document.addEventListener('visibilitychange',()=>setActive(hostVisible&&!document.hidden));
 schedule();
}
