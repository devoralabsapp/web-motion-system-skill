// Presentation only: never re-render demos, forms, project data or navigation.
export function createCreativeMotion({getTheme,isReduced,isDialogOpen}){
 const hero=document.querySelector('.hero'),studio=document.querySelector('.hero-studio'),visual=document.querySelector('.hero-visual'),image=document.querySelector('#hero-image');
 const scenes=[...document.querySelectorAll('.hero-copy h1,.section-heading h2,.project-row,.about h2')];
 const active=new Set(),seen=new WeakSet();let raf=0,visible=true,progress=0,target=0,lastTheme=getTheme(),introPlayed=false;
 const shot=document.querySelector('#hero-shot');
 const hint=document.createElement('a');hint.className='motion-hint';hint.href='#projects';hint.innerHTML='<span aria-hidden="true">↓</span> Cuộn để khám phá sản phẩm';hero.querySelector('.hero-copy').append(hint);
 const rail=document.createElement('span');rail.className='scene-frame';rail.setAttribute('aria-hidden','true');shot.append(rail);
 document.querySelectorAll('.hero-copy h1>*,.section-heading h2,.about h2').forEach(el=>{
  if(el.matches('h2')){const parts=el.innerHTML.split(/<br\s*\/?\s*>/i);el.innerHTML=parts.map(p=>`<span class="motion-line"><span>${p}</span></span>`).join('')}
  else{const span=document.createElement('span');span.className='hero-word';span.innerHTML=el.innerHTML;el.replaceChildren(span)}
 });
 function animate(el,frames,options={}){
  if(isReduced()||!visible)return;
  const a=el.animate(frames,{duration:950,easing:'cubic-bezier(.16,.75,.2,1)',...options});active.add(a);a.onfinish=()=>active.delete(a);a.oncancel=()=>active.delete(a);return a;
 }
 function reveal(el,{short=false}={}){
  if(isReduced()||!visible)return;const theme=getTheme();
  const row=el.classList.contains('project-row'),parts=[...el.querySelectorAll('.motion-line>span,.hero-word')];
  if(parts.length){parts.forEach((part,i)=>animate(part,theme==='cobalt-court'?[{transform:'translateX(-115%) skewX(-9deg)',clipPath:'inset(0 100% 0 0)'},{transform:'translateX(0) skewX(0)',clipPath:'inset(0)'}]:theme==='cutout-dept'?[{transform:'translateY(110%)',clipPath:'inset(0 0 100%)'},{transform:'translateY(0)',clipPath:'inset(0)'}]:[{transform:'translateY(105%)',clipPath:'inset(100% 0 0)'},{transform:'translateY(0)',clipPath:'inset(0)'}],{delay:i*110,duration:short?520:1050}));}
  else if(row){const art=el.querySelector('.project-image'),copy=el.querySelector('.project-copy');
   animate(art,theme==='cobalt-court'?[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}]:theme==='cutout-dept'?[{transform:'perspective(1000px) rotateX(-28deg) translateY(55px)',clipPath:'inset(0 0 15%)'},{transform:'perspective(1000px) rotateX(3deg) translateY(-5px)',offset:.75,clipPath:'inset(0)'},{transform:'none',clipPath:'inset(0)'}]:[{clipPath:'inset(20% 12%)',transform:'scale(.9)'},{clipPath:'inset(0)',transform:'scale(1)'}],{duration:1100});
   animate(copy,theme==='cobalt-court'?[{clipPath:'inset(0 100% 0 0)',transform:'translateX(-45px)'},{clipPath:'inset(0)',transform:'translateX(0)'}]:[{clipPath:'inset(0 0 100%)'},{clipPath:'inset(0)'}],{delay:160,duration:900});
  }
 }
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting&&!seen.has(e.target)&&visible&&!isReduced()){seen.add(e.target);reveal(e.target)}else if(!e.isIntersecting)seen.delete(e.target)}},{threshold:.18});
 scenes.forEach(el=>observer.observe(el));
 function clearScroll(){studio.style.setProperty('--scene-progress','0');image.style.removeProperty('transform');rail.style.removeProperty('transform');}
 function tick(){raf=0;if(!visible||isReduced()||isDialogOpen())return;
  progress=target;
  const t=Math.max(0,Math.min(1,progress)),theme=getTheme();studio.style.setProperty('--scene-progress',t.toFixed(4));
  if(theme==='frame-shift'){image.style.transform=`translateY(${-t*38}px) scale(${1.085-t*.085})`;rail.style.transform=`scale(${.9+t*.1})`}
  else if(theme==='cobalt-court'){image.style.transform=`translateX(${(1-t)*28}px) scale(${1.04-t*.04})`;rail.style.transform=`scaleX(${.8+t*.2})`}
  else{image.style.transform=`translateY(${(1-t)*18}px) scale(${1.04-t*.04})`;rail.style.transform='none'}
 }
 function scroll(){if(!visible||isReduced()||isDialogOpen())return;const r=hero.getBoundingClientRect();target=Math.max(0,Math.min(1,-r.top/Math.max(320,r.height*.72)));if(!raf)raf=requestAnimationFrame(tick)}
 function stop(){cancelAnimationFrame(raf);raf=0;for(const a of active)a.cancel();active.clear();clearScroll()}
 function refresh({intro=false,transition=false}={}){
  stop();if(!visible||isReduced())return;
  const changed=lastTheme!==getTheme();lastTheme=getTheme();
  if((intro||!introPlayed)&&scrollY<180){introPlayed=true;reveal(document.querySelector('.hero-copy h1'));animate(visual,getTheme()==='cutout-dept'?[{clipPath:'inset(0 0 100%)',transform:'perspective(1000px) rotateX(-15deg) translateY(35px)'},{clipPath:'inset(0)',transform:'none'}]:[{clipPath:'inset(14% 8%)'},{clipPath:'inset(0)'}],{duration:1300,delay:160});}
  else if(transition||changed){const art=isDialogOpen()?document.querySelector('#project-detail img'):visual;if(art)animate(art,[{clipPath:getTheme()==='cobalt-court'?'inset(0 100% 0 0)':'inset(10% 6%)'},{clipPath:'inset(0)'}],{duration:600});}
  scroll();
 }
 function setVisible(next){const previous=visible;visible=next;if(!next)stop();else if(!previous)refresh({intro:scrollY<180})}
 addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else refresh()});
 document.addEventListener('pointerover',e=>{const art=e.target.closest('.project-image');if(!art||(e.relatedTarget instanceof Node&&art.contains(e.relatedTarget))||isReduced())return;animate(art,getTheme()==='cutout-dept'?[{transform:'translateY(0) rotate(0)'},{transform:'translateY(-8px) rotate(-1deg)'},{transform:'translateY(0) rotate(0)'}]:getTheme()==='cobalt-court'?[{clipPath:'inset(0)'},{clipPath:'inset(0 0 0 5%)'},{clipPath:'inset(0)'}]:[{clipPath:'inset(0)'},{clipPath:'inset(3% 2%)'},{clipPath:'inset(0)'}],{duration:550})});
 return {stop,refresh,setVisible};
}
