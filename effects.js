// Original geometry. Inspired by animation techniques, not copied example artwork.
export const diagramScenes=[
 [70,319,110,319,105,139,183,139,240,139,310,139,340,139,420,139,435,230,366,260,300,288,172,207,210,120,237,58,339,63,383,121,410,150,440,180,463,207],
 [70,319,70,319,70,319,70,319,140,319,183,319,183,240,183,200,183,139,260,139,300,139,340,139,340,200,340,240,340,260,410,260,435,260,450,230,463,207],
 [80,350,80,350,80,118,80,118,80,118,460,118,460,118,460,118,460,350,460,350,460,350,80,350,80,350,80,350,80,350,80,350,80,350,80,350,80,350]
];
export function interpolateDiagram(from,to,progress){
 if(from.length!==to.length||(from.length-2)%6)throw new Error('Diagram paths need matching cubic topology.');
 const t=Math.max(0,Math.min(1,progress));
 return from.map((value,i)=>value+(to[i]-value)*t);
}
export function diagramPath(points){return `M${points.slice(0,2).map(n=>n.toFixed(2)).join(' ')} C${points.slice(2).map(n=>n.toFixed(2)).join(' ')}`;}

export function initMotion(){
 const select=s=>document.querySelector(s);
 const reduced=()=>document.documentElement.dataset.motion==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const drawing=select('.drawing');
 const descriptions=[
  '01 / Công việc còn nằm ở nhiều nơi.',
  '02 / Kết nối các bước thành một quy trình.',
  '03 / Thiết kế thành giao diện có thể sử dụng.'
 ];
 drawing.innerHTML=`<svg class="morph-study" viewBox="0 0 540 480" fill="none" aria-hidden="true"><g class="construction" stroke="var(--border)" stroke-width="1"><path d="M35 50H505M35 430H505M70 20V460M470 20V460"/><circle cx="270" cy="240" r="177"/><path d="M93 240H447M270 63V417M145 115L395 365M145 365L395 115M63 63h14m-7-7v14M463 417h14m-7-7v14"/></g><g class="app-wire" stroke="var(--ink)" stroke-width="1"><path d="M80 162H460M173 162V350M196 196H430M196 229H356M196 262H430M196 295H400M99 195H148M99 219H137M99 243H148"/><rect x="101" y="137" width="43" height="4" fill="var(--accent)" stroke="none"/><path d="M405 140h34M428 131l11 9-11 9" stroke="var(--accent)"/></g><path class="diagram-path" d="${diagramPath(diagramScenes[0])}" stroke="var(--accent)" stroke-width="3"/><circle class="diagram-tracer" r="5" fill="var(--accent)" cx="70" cy="319"/><g stroke="var(--accent)"><path d="M67 319h6m-3-3v6M467 207h6m-3-3v6"/></g></svg><div class="scene-controls" role="group" aria-label="Xem ba bước từ quy trình đến sản phẩm">${['Rời rạc','Kết nối','Web app'].map((label,i)=>`<button type="button" data-scene="${i}" aria-label="Bước ${i+1}: ${['Công việc rời rạc','Kết nối quy trình','Giao diện web app'][i]}" aria-pressed="${i===0}"><span class="mono">0${i+1}</span>${label}</button>`).join('')}<button type="button" class="scene-replay" aria-label="Phát lại sơ đồ từ quy trình đến sản phẩm">↻</button></div><p class="scene-caption" role="status" aria-live="polite">${descriptions[0]}</p>`;
 const path=drawing.querySelector('.diagram-path'),tracer=drawing.querySelector('.diagram-tracer');
 const controls=drawing.querySelector('.scene-controls'),caption=drawing.querySelector('.scene-caption');
 drawing.after(controls,caption);
 let points=[...diagramScenes[0]],frame=0,target=2;
 function paint(next,flow=1){points=next;path.setAttribute('d',diagramPath(points));const pt=path.getPointAtLength(path.getTotalLength()*flow);tracer.setAttribute('cx',pt.x);tracer.setAttribute('cy',pt.y);}
 function setScene(scene){target=scene;drawing.dataset.scene=String(scene);controls.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.scene)===scene)));caption.textContent=descriptions[scene];}
 const ease=t=>1-(1-t)**3;
 function showScene(scene){cancelAnimationFrame(frame);const from=[...points];setScene(scene);if(reduced()){paint(diagramScenes[scene]);return;}let start;
  function step(now){start??=now;const progress=Math.min(1,(now-start)/650);paint(interpolateDiagram(from,diagramScenes[scene],ease(progress)),progress);if(progress<1)frame=requestAnimationFrame(step);}
  frame=requestAnimationFrame(step);
 }
 function story(){cancelAnimationFrame(frame);if(reduced()){setScene(2);paint(diagramScenes[2]);return;}paint(diagramScenes[0],0);setScene(0);let start;
  function step(now){start??=now;const t=Math.min(1,(now-start)/1050),second=t>=.5;const from=second?diagramScenes[1]:diagramScenes[0],to=second?diagramScenes[2]:diagramScenes[1];const stage=second?2:1;if(target!==stage)setScene(stage);paint(interpolateDiagram(from,to,ease(second?(t-.5)*2:t*2)),t);if(t<1)frame=requestAnimationFrame(step);}
  frame=requestAnimationFrame(step);
 }
 controls.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.hasAttribute('data-scene'))showScene(Number(button.dataset.scene));else story();});
 document.querySelectorAll('.brand-mark').forEach(mark=>{mark.innerHTML='<svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M10 26 26 10M11 10h15v15" stroke="currentColor" stroke-width="2"/></svg>';});
 select('h1').classList.add('kinetic-heading');
 const vietnameseLabels=['LỌC ĐƠN · THEO DÕI · XỬ LÝ','CHỌN HÀNG · THÊM GIỎ · ĐIỀU CHỈNH','YÊU CẦU · PHÊ DUYỆT · THEO DÕI'];
 document.querySelectorAll('.project-shot').forEach((shot,i)=>{const context=document.createElement('span');context.className='preview-context';context.textContent=vietnameseLabels[i];context.setAttribute('aria-hidden','true');shot.append(context);});
 const reveal=new IntersectionObserver((entries,observer)=>{for(const entry of entries){if(entry.isIntersecting){if(!reduced())entry.target.classList.add('motion-enter');observer.unobserve(entry.target);}}},{threshold:.15});
 document.querySelectorAll('.section-heading,.about-lead,.service-row').forEach(el=>reveal.observe(el));
 const process=select('.process-list');let processVisible=false,scrollFrame=0;
 function updateProcess(){scrollFrame=0;const rect=process.getBoundingClientRect();const progress=reduced()?1:Math.max(0,Math.min(1,(innerHeight*.7-rect.top)/(rect.height*.9)));process.style.setProperty('--process-progress',progress);process.querySelectorAll('li').forEach(li=>li.classList.toggle('step-reached',reduced()||li.getBoundingClientRect().top<innerHeight*.7));}
 new IntersectionObserver(entries=>{processVisible=entries[0].isIntersecting;if(processVisible)updateProcess();},{rootMargin:'50px'}).observe(process);
 addEventListener('scroll',()=>{if(processVisible&&!scrollFrame)scrollFrame=requestAnimationFrame(updateProcess);},{passive:true});
 addEventListener('resize',()=>{if(processVisible&&!scrollFrame)scrollFrame=requestAnimationFrame(updateProcess);},{passive:true});
 function pulse(element){if(!element||reduced())return;element.classList.remove('motion-pulse');void element.offsetWidth;element.classList.add('motion-pulse');}
 document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.add||button.dataset.qty||button.dataset.remove)pulse(select('.cart-total'));if(button.dataset.add){const fresh=select(`[data-add="${button.dataset.add}"]`);pulse(fresh?.querySelector('span'));}if(button.dataset.advance||button.dataset.approve)pulse(select('.stats'));});
 new MutationObserver(()=>{if(!select('#brief-result').hidden)pulse(select('#brief-result'));}).observe(select('#brief-result'),{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('motion:change',()=>{if(reduced()){cancelAnimationFrame(frame);setScene(target);paint(diagramScenes[target]);}updateProcess();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);setScene(target);paint(diagramScenes[target]);}});
 story();
}
