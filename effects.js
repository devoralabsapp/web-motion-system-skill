export function initMotion(){
 const select=s=>document.querySelector(s);
 const reduced=()=>document.documentElement.dataset.motion==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('.brand-mark').forEach(mark=>{mark.innerHTML='<svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M10 26 26 10M11 10h15v15" stroke="currentColor" stroke-width="2"/></svg>';});
 const labels=['LỌC ĐƠN · THEO DÕI · XỬ LÝ','CHỌN HÀNG · THÊM GIỎ · ĐIỀU CHỈNH','YÊU CẦU · PHÊ DUYỆT · THEO DÕI'];
 document.querySelectorAll('.project-shot').forEach((shot,i)=>{const context=document.createElement('span');context.className='preview-context';context.textContent=labels[i];context.setAttribute('aria-hidden','true');shot.append(context);});
 const activeAnimations=new Set();
 function track(animation,cleanup=()=>{}){activeAnimations.add(animation);const finish=()=>{activeAnimations.delete(animation);cleanup();};animation.finished.then(finish,finish);}
 function cancelAnimations(){for(const animation of activeAnimations)animation.cancel();activeAnimations.clear();}
 document.addEventListener('motion:change',()=>{if(reduced())cancelAnimations();});
 addEventListener('resize',cancelAnimations,{passive:true});
 function pulse(el){if(!el||reduced())return;el.classList.remove('motion-pulse');void el.offsetWidth;el.classList.add('motion-pulse');}
 let requestRects=new Map(),departing=null;
 document.addEventListener('click',e=>{const b=e.target.closest('[data-approve]');if(!b||reduced())return;requestRects=new Map([...document.querySelectorAll('.request')].map(el=>[el.querySelector('.mono')?.textContent,el.getBoundingClientRect()]));const row=b.closest('.request');departing=row?{clone:row.cloneNode(true),rect:row.getBoundingClientRect()}:null;},true);
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.add||b.dataset.qty||b.dataset.remove)pulse(select('.cart-total'));
  if(b.dataset.add)pulse(select(`[data-add="${b.dataset.add}"] span`));
  if(b.dataset.advance){pulse(select('.stats'));const row=select(`[data-order="${b.dataset.advance}"]`);if(row&&!reduced()){row.classList.add('order-updated');row.querySelector('.badge')?.classList.add('status-updated');}}
  if(b.dataset.approve){pulse(select('.stats'));if(reduced())return;
   document.querySelectorAll('.request').forEach(row=>{const old=requestRects.get(row.querySelector('.mono')?.textContent);if(old){const rect=row.getBoundingClientRect();track(row.animate([{transform:`translateY(${old.top-rect.top}px)`},{transform:'none'}],{duration:340,easing:'cubic-bezier(.2,.65,.25,1)'}));}});
   if(departing){const {clone,rect}=departing;clone.classList.add('approval-exit');clone.setAttribute('aria-hidden','true');clone.inert=true;Object.assign(clone.style,{left:rect.x+'px',top:rect.y+'px',width:rect.width+'px',height:rect.height+'px'});const button=clone.querySelector('button');if(button)button.textContent='Đã duyệt ✓';document.body.append(clone);const out=clone.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateX(20px)'}],{duration:300,easing:'ease-out'});track(out,()=>clone.remove());departing=null;}
  }
 });
 document.addEventListener('change',e=>{if(e.target.matches('#order-filter,#request-filter')&&!reduced())select('.filter-bar')?.classList.add('filter-updated');});
 const brief=select('#brief-result');if(brief)new MutationObserver(()=>{if(!brief.hidden)pulse(brief);}).observe(brief,{attributes:true,attributeFilter:['hidden']});
}
