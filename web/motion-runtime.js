import {drawDemo} from '/catalog/demo-engine.mjs';

// One owner and one RAF queue for every preview. Off-screen studies do no work.
export function createMotionRuntime({isReduced,onLabFrame}){
  const scratch=document.createElement('canvas');scratch.width=800;scratch.height=520;
  let renderScale=2;const native=scratch.getContext('2d');
  // Keep the teaching renderer's logical coordinates, but draw vector-sharp pixels.
  const ctx=new Proxy(native,{get(target,key){if(key==='setTransform')return (a,b,c,d,e,f)=>target.setTransform(a*renderScale,b*renderScale,c*renderScale,d*renderScale,e*renderScale,f*renderScale);const value=target[key];return typeof value==='function'?value.bind(target):value;},set(target,key,value){target[key]=key==='filter'&&typeof value==='string'?value.replace(/([\d.]+)px/g,(_,n)=>Number(n)*renderScale+'px'):value;return true;}}),players=new Map();let raf=0,lastFrame=0,view='all';
  const lab={id:73,canvas:null,playing:false,progress:0,speed:1,last:0};
  function paint(canvas,id,progress){const scale=canvas.width/366;if(scale!==renderScale){renderScale=scale;scratch.width=Math.round(400*scale);scratch.height=Math.round(260*scale);}drawDemo(ctx,id,progress);const out=canvas.getContext('2d');out.clearRect(0,0,canvas.width,canvas.height);out.drawImage(scratch,17*renderScale,64*renderScale,366*renderScale,165*renderScale,0,0,canvas.width,canvas.height);}
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){const p=players.get(entry.target);if(!p)continue;p.visible=entry.isIntersecting;if(p.visible)paint(p.canvas,p.id,p.progress);else if(p.manual){p.manual=false;p.button?.setAttribute('aria-pressed','false');p.button.textContent='▷';p.button.setAttribute('aria-label','Play '+p.name+' preview');}}schedule()},{rootMargin:'0px',threshold:.05});
  function candidates(){const visible=[...players.values()].filter(p=>p.visible);const manual=visible.filter(p=>p.manual);return [...manual,...(isReduced()?[]:visible.filter(p=>!p.manual&&!p.paused))].slice(0,6);}
  function running(){return !document.hidden&&((view==='all'&&candidates().length>0)||(view==='lab'&&lab.playing));}
  function schedule(){if(!raf&&running())raf=requestAnimationFrame(tick);}
  function tick(now){raf=0;if(!running())return;if(now-lastFrame>=1000/24){const delta=Math.min(100,now-(lastFrame||now));lastFrame=now;if(view==='all'){for(const p of candidates()){p.progress=(p.progress+delta/3000)%1;paint(p.canvas,p.id,p.progress);}}if(view==='lab'&&lab.playing){lab.progress=(lab.progress+delta*lab.speed/3000)%1;paint(lab.canvas,lab.id,lab.progress);onLabFrame(lab.progress);}}schedule();}
  document.addEventListener('visibilitychange',()=>{lastFrame=0;schedule()});
  return {
    register(canvas,e,button){const p={canvas,id:e.id,name:e.name,button,visible:false,manual:false,paused:false,progress:e.group===3||e.id===190?.28:.66};players.set(canvas,p);observer.observe(canvas);button.onclick=()=>{const active=p.manual||(!isReduced()&&!p.paused);p.paused=active;p.manual=!active;if(p.manual){for(const other of players.values())if(other!==p){other.manual=false;other.button.setAttribute('aria-pressed','false');other.button.textContent=other.paused||isReduced()?'▷':'Ⅱ';}p.progress=0;}button.setAttribute('aria-pressed',String(!active));button.textContent=active?'▷':'Ⅱ';button.setAttribute('aria-label',(active?'Play ':'Pause ')+e.name+' preview');schedule();};button.textContent=isReduced()?'▷':'Ⅱ';button.setAttribute('aria-pressed',String(!isReduced()));button.setAttribute('aria-label',(isReduced()?'Play ':'Pause ')+e.name+' preview');},
    clear(){observer.disconnect();players.clear();},
    setView(value){view=value;lastFrame=0;schedule();},
    preferenceChanged(){for(const p of players.values()){p.manual=false;p.button.textContent=isReduced()||p.paused?'▷':'Ⅱ';p.button.setAttribute('aria-pressed',String(!isReduced()&&!p.paused));p.button.setAttribute('aria-label',(isReduced()||p.paused?'Play ':'Pause ')+p.name+' preview');}if(isReduced())lab.playing=false;lastFrame=0;schedule();},
    setLab(canvas,id){Object.assign(lab,{canvas,id,progress:isReduced()?.66:0,playing:!isReduced()});paint(canvas,id,lab.progress);onLabFrame(lab.progress);lastFrame=0;schedule();},
    playLab(value){lab.playing=value;lastFrame=0;schedule();},
    replayLab(){lab.progress=0;lab.playing=true;paint(lab.canvas,lab.id,0);onLabFrame(0);lastFrame=0;schedule();},
    scrub(value){lab.playing=false;lab.progress=value;paint(lab.canvas,lab.id,value);onLabFrame(value);},
    setSpeed(value){lab.speed=value;},
    get labPlaying(){return lab.playing;},
    diagnostics(){return {registered:players.size,visible:[...players.values()].filter(p=>p.visible).length,active:view==='all'?candidates().length:view==='lab'&&lab.playing?1:0,raf:!!raf,view};}
  };
}
