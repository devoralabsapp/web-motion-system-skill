import {clamp,range,ease,scrollProgress,moduleRect,mixPath,cubicPath,followProgress,pointAlongCubic} from './story-math.js';

export function initStory(){
 const root=document.querySelector('#one-line-story');
 if(!root)return;
 const canvas=root.querySelector('.story-canvas'),stage=root.querySelector('.story-stage'),plane=root.querySelector('.story-plane');
 const copy=root.querySelector('.story-copy'),wire=root.querySelector('.story-thread'),tracer=root.querySelector('.story-tracer');
 const progressbar=root.querySelector('[role=progressbar]'),caption=root.querySelector('.story-caption');
 const questions=['Có đơn mới.','Kho còn bao nhiêu?','Ai đang xử lý?'];
 const captions=['Công việc còn rời rạc.','Nối công việc thành quy trình.','Một giao diện. Cùng một nguồn dữ liệu.','Sản phẩm thành hình. Mời bạn thao tác.'];
 const media=matchMedia('(max-width: 680px)');
 const reduced=()=>document.documentElement.dataset.motion==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 let modules=[],paperHeight=700,travel=1400,canvasHeight=850,frame=0,playFrame=0,override=null,interacted=false,measuring=false;
 let displayed=null,lastTime=0,stageWidth=0,copyHeight=0,active=true,lastPainted=null,lastInteracted=null;
 const wiring=root.querySelector('.story-wiring'),steps=[...root.querySelectorAll('.story-step')];
 wire.setAttribute('pathLength','1');
 let finalFrame={x:0,y:120,width:1200,height:550},divisions=[];
 const gridLines=Array.from({length:3},()=>{const line=document.createElementNS('http://www.w3.org/2000/svg','path');line.classList.add('story-division');root.querySelector('.story-wiring').insertBefore(line,wire);return line;});
 const getBox=(el,base)=>{const r=el.getBoundingClientRect();return {x:r.x-base.x,y:r.y-base.y,width:r.width,height:r.height,rotation:0};};
 function prepareModules(){
  modules=[];
  const elements=[stage.querySelector('.order-table tbody tr'),stage.querySelector('.stats'),stage.querySelector('.filter-bar')];
  elements.forEach((element,i)=>{if(!element)return;element.dataset.storyPiece=String(i);element.dataset.question=questions[i];modules.push({element,index:i});});
 }
 function currentProgress(){if(reduced()||interacted)return 1;if(override!==null)return override;
  if(media.matches)return range(innerHeight*.82-stage.getBoundingClientRect().top,0,Math.min(innerHeight*.72,560));
  return scrollProgress(root.getBoundingClientRect().top,travel);
 }
 function measure(){
  if(measuring)return;measuring=true;
  root.classList.add('story-measuring');
  const base=stage.getBoundingClientRect();
  stageWidth=base.width;copyHeight=copy.offsetHeight;
  const circle=root.querySelector('.story-construction circle'),grid=root.querySelector('.story-construction path');
  circle.setAttribute('cx',base.width*(media.matches?.5:.77));circle.setAttribute('cy',media.matches?230:280);circle.setAttribute('r',Math.min(210,base.width*(media.matches?.44:.21)));
  if(media.matches)grid.setAttribute('d',`M10 20H${base.width-10}M10 490H${base.width-10}M18 10V510M${base.width-18} 10V510`);
  else grid.setAttribute('d',`M${base.width*.5} 40H${base.width-20}M${base.width*.5} 630H${base.width-20}M${base.width*.53} 20V650M${base.width-30} 20V650`);
  modules.forEach(m=>m.end=getBox(m.element,base));
  const app=stage.querySelector('.app-frame');if(app)finalFrame=getBox(app,base);
  const f=finalFrame,table=stage.querySelector('.order-table'),stats=stage.querySelector('.stats');
  const tableBox=table?getBox(table,base):{x:f.x+22,y:f.y+180,width:f.width-44,height:230};
  const statsBox=stats?getBox(stats,base):{x:f.x+22,y:f.y+100,width:f.width-44,height:90};
  const dividerX=tableBox.x+(media.matches?0:tableBox.width*.16),statX=statsBox.x+statsBox.width/(media.matches?2:3);
  const line=(x1,y1,x2,y2)=>[x1,y1,x1,y1,x2,y2,x2,y2];
  divisions=[line(f.x,f.y+43,f.x+f.width,f.y+43),line(dividerX,tableBox.y,dividerX,tableBox.y+tableBox.height),line(statX,statsBox.y,statX,statsBox.y+(media.matches?(stats?.querySelector('.stat')?.offsetHeight||60):statsBox.height))];
  paperHeight=plane.offsetHeight;
  canvasHeight=Math.max(paperHeight+146,copy.offsetHeight+165,Math.min(innerHeight,920));
  travel=Math.max(1100,Math.min(1800,innerHeight*1.65));
  root.style.setProperty('--paper-height',paperHeight+'px');
  root.style.setProperty('--canvas-height',canvasHeight+'px');
  root.style.setProperty('--story-travel',travel+'px');
  root.classList.remove('story-measuring');
  measuring=false;paint(performance.now(),true);
 }
 function sceneRects(m,width){
  if(media.matches){const cardWidth=Math.min(width-24,340),x=(width-cardWidth)/2;
   return [{x:x+(m.index===1?7:-3),y:24+m.index*137,width:cardWidth-10,height:96,rotation:[-3,2,-1][m.index]},
    {x:12,y:40+m.index*118,width:width-24,height:88,rotation:0}];}
  const slots=[{x:width*.535,y:102,width:Math.min(252,width*.26),height:98,rotation:-5},{x:width*.735,y:264,width:Math.min(232,width*.24),height:102,rotation:4},{x:width*.585,y:432,width:Math.min(250,width*.26),height:96,rotation:-2}];
  return [slots[m.index],{x:width*.63,y:60+m.index*132,width:Math.min(350,width*.34),height:98,rotation:0}];
 }
 function drawThread(rects,p){
  const f=finalFrame,l=f.x,t=f.y,r=l+f.width,bottom=t+f.height;
  const structured=[l,t,l,t,r,t,r,t,r,t,r,bottom,r,bottom,r,bottom,l,bottom,l,bottom,l,bottom,l,t,l,t];
  if(!rects[0]||!rects[1]||!rects[2]){wire.setAttribute('d',cubicPath(structured));wire.style.strokeDasharray='none';wire.style.strokeDashoffset='0';tracer.style.opacity='0';return;}
  const [a,b,c]=rects,ax=a.x-14,ay=a.y+a.height/2,bx=b.x-14,by=b.y+b.height/2,cx=c.x-14,cy=c.y+c.height/2;
  const loose=[ax,ay,ax-45,ay,bx-45,by,bx,by,bx-45,by,cx-45,cy,cx,cy,cx-14,c.y+c.height+30,c.x+c.width+20,c.y+c.height+30,c.x+c.width+20,cy,c.x+c.width+20,c.y-30,a.x+a.width+20,a.y-30,a.x+a.width+20,ay];
  const points=mixPath(loose,structured,ease(range(p,.48,.91))),draw=.045+.955*range(p,0,.35);
  wire.setAttribute('d',cubicPath(points));wire.style.strokeDasharray='1';wire.style.strokeDashoffset=String(1-draw);
  if(p<.9){const point=pointAlongCubic(points,draw);tracer.setAttribute('cx',point.x);tracer.setAttribute('cy',point.y);}
  tracer.style.opacity=String(1-range(p,.82,.9));
 }
 function paint(now=performance.now(),immediate=false){
  if(frame)cancelAnimationFrame(frame);frame=0;
  const target=currentProgress(),delta=Math.min(48,now-lastTime||16);lastTime=now;
  const snap=immediate||displayed===null||reduced()||interacted||override!==null||!active||document.hidden;
  displayed=snap?target:followProgress(displayed,target,delta,media.matches?58:72);
  const p=displayed,width=stageWidth;
  if(!immediate&&p===lastPainted&&interacted===lastInteracted)return;
  lastPainted=p;lastInteracted=interacted;
  const index=p<.2?0:p<.62?1:p<.96?2:3;
  root.dataset.scene=String(index);root.dataset.interacted=String(interacted);
  root.style.setProperty('--story-progress',p);
  root.style.setProperty('--frame-reveal',range(p,.45,.83));
  root.style.setProperty('--ui-reveal',range(p,.66,.92));
  root.style.setProperty('--piece-content',range(p,.64,.9));
  root.style.setProperty('--question-reveal',1-range(p,.56,.76));
  root.style.setProperty('--construction',1-range(p,.4,.75));
  root.style.setProperty('--copy-y',media.matches?'0px':(-ease(range(p,.1,.3))*(copyHeight+220))+'px');
  root.style.setProperty('--chapter-reveal',range(p,.31,.39)*(1-range(p,.53,.62)));
  root.style.setProperty('--plane-x',reduced()?'0deg':((1-range(p,.32,.9))*5)+'deg');
  root.style.setProperty('--plane-y',reduced()?'0deg':((1-range(p,.32,.9))*-5)+'deg');
  const rects=[];
  modules.forEach(m=>{if(!m.end||!m.end.width)return;const question=p>=.9?'':questions[m.index];if(m.element.dataset.question!==question)m.element.dataset.question=question;const [start,aligned]=sceneRects(m,width),rect=moduleRect(start,aligned,m.end,p);rects[m.index]=rect;
   const sx=rect.width/m.end.width,sy=rect.height/m.end.height;
   m.element.style.transform=`translate3d(${rect.x-m.end.x}px,${rect.y-m.end.y}px,0) rotate(${rect.rotation}deg) scale(${sx},${sy})`;
   m.element.style.setProperty('--inverse-x',1/sx);m.element.style.setProperty('--inverse-y',1/sy);
  });
  wiring.setAttribute('viewBox',`0 0 ${width} ${Math.max(paperHeight,650)}`);
  drawThread(rects,p);
  const starts=[[width*.53,30,width*.53,30,width*.96,30,width*.96,30],[width*.56,10,width*.56,10,width*.56,630,width*.56,630],[width*.6,140,width*.6,140,width*.95,550,width*.95,550]];
  gridLines.forEach((line,i)=>{line.setAttribute('d',cubicPath(mixPath(starts[i],divisions[i],ease(range(p,.62,.94)))));line.style.opacity=String(.65-range(p,.65,.95)*.37);});
  if(stage.inert!==(p<.7))stage.inert=p<.7;
  stage.style.pointerEvents=p<.7?'none':'auto';
  if(caption.dataset.scene!==String(index)){caption.dataset.scene=String(index);caption.textContent=captions[index];}
  progressbar.setAttribute('aria-valuenow',String(Math.round(p*100)));
  steps.forEach((s,i)=>s.classList.toggle('is-active',i===index));
  root.dataset.settled=String(p===target&&(p===0||p===1));
  if(displayed!==target&&active&&!document.hidden&&!reduced())frame=requestAnimationFrame(paint);
 }
 function schedule(){if(!frame&&active&&!document.hidden)frame=requestAnimationFrame(paint);}
 function lock(){if(interacted)return;interacted=true;override=null;cancelAnimationFrame(playFrame);paint();}
 stage.addEventListener('click',e=>{if(e.target.closest('button,select,input,a')&&!e.target.closest('#replay'))lock();},true);
 stage.addEventListener('keydown',e=>{if(e.target.matches('button,select,input,a')&&!e.target.closest('#replay'))lock();},true);
 stage.addEventListener('change',lock,true);
 function goToDemo(e){if(e)e.preventDefault();lock();
  const top=media.matches?stage.getBoundingClientRect().top+scrollY-20:root.getBoundingClientRect().top+scrollY+travel;
  scrollTo({top,behavior:reduced()?'instant':'smooth'});
 }
 document.querySelectorAll('a[href="#trai-nghiem"]').forEach(a=>a.addEventListener('click',goToDemo));
 document.addEventListener('click',e=>{if(e.target.closest('[data-try]'))goToDemo();});
 root.querySelectorAll('[data-story-jump]').forEach(button=>button.addEventListener('click',()=>{const p=Number(button.dataset.storyJump);cancelAnimationFrame(playFrame);override=null;
  interacted=false;
  if(p<.96&&root.querySelector('[aria-selected=true]')?.dataset.mode!=='orders')document.dispatchEvent(new Event('story:orders'));
  const top=media.matches?stage.getBoundingClientRect().top+scrollY-innerHeight*.82+p*Math.min(innerHeight*.72,560):root.getBoundingClientRect().top+scrollY+travel*p;
  scrollTo({top,behavior:reduced()?'instant':'smooth'});schedule();
 }));
 document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',()=>{interacted=false;override=null;cancelAnimationFrame(playFrame);if(root.querySelector('[aria-selected=true]')?.dataset.mode!=='orders')document.dispatchEvent(new Event('story:orders'));schedule();}));
 document.querySelector('#replay').addEventListener('click',()=>{cancelAnimationFrame(playFrame);interacted=false;
  document.dispatchEvent(new Event('story:orders'));
  root.classList.remove('intro-replay');void root.offsetWidth;root.classList.add('intro-replay');
  if(reduced()){paint();return;}let start;override=0;
  function tick(now){start??=now;override=clamp((now-start)/1800);paint();if(override<1)playFrame=requestAnimationFrame(tick);else{interacted=true;override=null;paint();}}
  playFrame=requestAnimationFrame(tick);
 });
 addEventListener('scroll',()=>{if(override!==null){cancelAnimationFrame(playFrame);override=null;}schedule();},{passive:true});
 addEventListener('resize',()=>{cancelAnimationFrame(playFrame);override=null;requestAnimationFrame(measure);},{passive:true});
 document.addEventListener('demo:render',()=>{prepareModules();measure();});
 document.addEventListener('motion:change',()=>{cancelAnimationFrame(playFrame);override=null;measure();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(playFrame);override=null;paint();}});
 document.addEventListener('view:change',e=>{active=e.detail.active;if(!active){cancelAnimationFrame(playFrame);override=null;paint(performance.now(),true);}else{lastTime=0;measure();}});
 new ResizeObserver(()=>{if(!measuring)requestAnimationFrame(measure);}).observe(plane);
 prepareModules();measure();document.fonts.ready.then(measure);
}
