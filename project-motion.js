let activeFlight=null;
const prefersStatic=()=>document.documentElement.dataset.motion==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches;
export function prepareProjectMotion(image){
 if(!image||prefersStatic())return null;
 const r=image.getBoundingClientRect();
 if(r.bottom<0||r.top>innerHeight||!r.width)return null;
 return {src:image.currentSrc||image.src,rect:{x:r.x,y:r.y,width:r.width,height:r.height}};
}
export function cancelProjectMotion(){activeFlight?.();activeFlight=null;}
export function runProjectMotion(dialog,source,target){
 cancelProjectMotion();if(!source||!target||prefersStatic())return;
 dialog.classList.add('shared-opening');dialog.dataset.transition='shared';
 const to=target.getBoundingClientRect(),from=source.rect;
 const flying=document.createElement('img');flying.className='project-flight';flying.src=source.src;flying.alt='';flying.setAttribute('aria-hidden','true');
 Object.assign(flying.style,{left:to.x+'px',top:to.y+'px',width:to.width+'px',height:to.height+'px'});
 dialog.append(flying);target.style.opacity='0';
 let animation;
 const finish=()=>{animation?.cancel();flying.remove();target.style.opacity='';dialog.classList.remove('shared-opening');dialog.dataset.transition='idle';dialog.removeEventListener('scroll',cancelProjectMotion);activeFlight=null;};
 activeFlight=finish;
 animation=flying.animate([{transform:`translate(${from.x-to.x}px,${from.y-to.y}px) scale(${from.width/to.width},${from.height/to.height})`},{transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
 animation.finished.then(()=>{if(activeFlight===finish)finish();}).catch(()=>{});
 dialog.addEventListener('scroll',cancelProjectMotion,{once:true});
}
addEventListener('resize',cancelProjectMotion,{passive:true});
document.addEventListener('motion:change',()=>{if(prefersStatic())cancelProjectMotion();});
