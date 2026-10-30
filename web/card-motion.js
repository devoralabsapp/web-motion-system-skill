// One finite card choreography per catalog category. Measure only the stable article.
export const cardProfiles = [
  {name:'Fade up',source:11,hover:'translateY(-7px)'},
  {name:'Slide from left',source:13,hover:'translateX(8px)'},
  {name:'Slide from right',source:14,hover:'translateX(-8px)'},
  {name:'Word stagger',source:32,hover:'rotate(-1deg) scale(1.025)'},
  {name:'Fill reveal',source:42,hover:'scale(1.045)'},
  {name:'Pan & zoom',source:53,hover:'scale(1.11) translateX(-5px)'},
  {name:'Iris reveal',source:62,hover:'rotate(1.5deg) scale(1.06)'},
  {name:'Outline draw',source:71,hover:'none'},
  {name:'Layered parallax',source:83,hover:'translateY(-10px) scale(1.035)'},
  {name:'Grow from origin',source:16,hover:'scale(1.045)'},
  {name:'Diagonal wipe',source:110,hover:'skewX(-3deg) scale(1.055)'},
  {name:'Press & release',source:111,hover:'scale(.965)'},
  {name:'Shimmer sweep',source:123,hover:'none'},
  {name:'Spring return',source:133,hover:'translateY(-8px)'},
  {name:'Pointer tilt',source:144,hover:'perspective(600px) rotateX(3deg) rotateY(-5deg) scale(1.03)'},
  {name:'Perspective flip',source:152,hover:'perspective(550px) rotateY(-8deg) rotateX(3deg) scale(1.03)'},
  {name:'Paper unfold',source:162,hover:'rotate(-2deg) translateY(-5px) scale(1.025)'},
  {name:'Particle reveal',source:171,hover:'translateY(-3px) scale(1.02)'},
  {name:'Elastic distortion',source:181,hover:'skewX(3deg) skewY(-1deg) scale(1.045)'},
  {name:'Cinematic framing',source:191,hover:'scale(1.08)'},
  {name:'Progress accent',source:202,hover:'translateX(3px)'},
  {name:'UI assembly',source:219,hover:'translateX(5px)'},
  {name:'Focus spotlight',source:120,hover:'none'},
  {name:'Sequenced reveal',source:240,hover:'scale(1.025) rotate(.6deg)'}
];

export function createCardMotion({isReduced}) {
  const states=new Map(),globalEvents=new AbortController();
  let cardEvents=new AbortController(),frame=0,visible=false,destroyed=false;
  const ease='cubic-bezier(.16,.75,.2,1)';
  function animate(state,node,keyframes,options={}) {
    if(!node||isReduced()||!visible||document.hidden)return;
    const animation=node.animate(keyframes,{duration:760,easing:ease,fill:'none',...options});
    state.animations.add(animation);
    animation.finished.then(()=>state.animations.delete(animation),()=>state.animations.delete(animation));
    return animation;
  }
  function settle(state) {
    for(const animation of state.animations)animation.cancel();
    state.animations.clear();
    state.canvas.style.transform='';
    state.spotlight.style.opacity='';
  }
  function accent(state,delay=0) {
    animate(state,state.line,[{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(.65)',offset:.6},{opacity:0,transform:'scaleX(1)'}],{duration:900,delay});
  }
  function outline(state,delay=0) {
    animate(state,state.frame,[{opacity:0},{opacity:1,offset:.15},{opacity:1,offset:.75},{opacity:0}],{duration:960,delay});
    animate(state,state.frame.querySelector('rect'),[{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{duration:900,delay});
  }
  function shimmer(state,delay=0) {
    animate(state,state.sweep,[{opacity:0,transform:'translateX(-120%) skewX(-18deg)'},{opacity:.6,offset:.3},{opacity:0,transform:'translateX(145%) skewX(-18deg)'}],{duration:900,delay,easing:'ease-in-out'});
  }
  function particles(state,delay=0) {
    [...state.particles.children].forEach((dot,index)=>{
      const angle=index*Math.PI/4,dx=Math.cos(angle)*74,dy=Math.sin(angle)*48;
      animate(state,dot,[{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.3)`},{opacity:.9,offset:.3},{opacity:0,transform:'translate(0,0) scale(.7)'}],{duration:800,delay:index*22+delay});
    });
  }
  function framing(state,delay=0) {
    for(const bar of state.bars)animate(state,bar,[{opacity:1,transform:'scaleY(1)'},{opacity:1,transform:'scaleY(0)'}],{duration:850,delay,easing:'cubic-bezier(.4,0,.2,1)'});
  }
  function enter(state) {
    state.armed=false;
    const delay=(state.index%3)*55,options={delay};
    const fade=[{opacity:0},{opacity:1}];
    const from=(transform)=>[{opacity:0,transform},{opacity:1,transform:'none'}];
    const card=state.surface,canvas=state.canvas,copy=state.copy;
    switch(state.group) {
      case 1:animate(state,card,from('translateY(28px)'),options);break;
      case 2:animate(state,card,from('translateX(-34px)'),options);break;
      case 3:animate(state,card,from('translateX(34px)'),options);break;
      case 4:
        animate(state,card,fade,options);
        [...card.querySelectorAll('.card-word')].forEach((word,i)=>animate(state,word,from('translateY(16px)'),{duration:570,delay:delay+45+i*65}));
        animate(state,copy.querySelector('p'),from('translateY(9px)'),{delay:delay+170,duration:580});break;
      case 5:animate(state,card,[{clipPath:'inset(100% 0 0 0 round 12px)'},{clipPath:'inset(0% 0 0 0 round 12px)'}],options);break;
      case 6:
        animate(state,card,fade,options);
        animate(state,canvas,[{transform:'scale(1.2) translateX(-14px)'},{transform:'none'}],{delay,duration:1000});break;
      case 7:animate(state,card,[{clipPath:'circle(0% at 50% 42%)'},{clipPath:'circle(85% at 50% 42%)'}],{duration:900,delay,easing:'cubic-bezier(.4,0,.2,1)'});break;
      case 8:animate(state,card,fade,options);outline(state,delay);break;
      case 9:
        animate(state,card,fade,options);
        animate(state,canvas,[{transform:'translateY(24px) scale(1.08)'},{transform:'none'}],{duration:920,delay});
        animate(state,copy,from('translateY(10px)'),{duration:650,delay:delay+90});break;
      case 10:animate(state,card,[{opacity:0,transform:'scale(.82)',transformOrigin:'0% 100%'},{opacity:1,transform:'none',transformOrigin:'0% 100%'}],options);break;
      case 11:animate(state,card,[{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'},{clipPath:'polygon(0 0,65% 0,25% 100%,0 100%)',offset:.45},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],{duration:850,delay});break;
      case 12:animate(state,card,[{opacity:0,transform:'scale(.95)'},{opacity:1,transform:'scale(.975,1.025)',offset:.5},{opacity:1,transform:'none'}],{...options,duration:620});break;
      case 13:animate(state,card,fade,options);shimmer(state,delay);break;
      case 14:animate(state,card,[{opacity:0,transform:'translateY(30px)'},{opacity:1,transform:'translateY(-7px)',offset:.5},{transform:'translateY(3px)',offset:.72},{transform:'none'}],{duration:880,delay,easing:'ease-out'});break;
      case 15:animate(state,card,fade,options);animate(state,canvas,[{transform:'perspective(600px) rotateX(12deg) rotateY(-10deg) scale(.95)'},{transform:'none'}],{duration:940,delay});break;
      case 16:animate(state,card,from('perspective(800px) rotateY(-38deg)'),{duration:940,delay});break;
      case 17:animate(state,card,[{opacity:0,transform:'perspective(800px) rotateX(-32deg) rotate(-2deg) scaleY(.9)',transformOrigin:'50% 0%'},{opacity:1,transform:'none',transformOrigin:'50% 0%'}],{duration:940,delay,easing:'cubic-bezier(.4,0,.2,1)'});break;
      case 18:animate(state,card,[{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],options);particles(state,delay);break;
      case 19:animate(state,card,fade,options);animate(state,canvas,[{transform:'skewX(-7deg) scale(1.1)'},{transform:'skewX(3deg) scale(1.04)',offset:.55},{transform:'none'}],{duration:920,delay});break;
      case 20:animate(state,card,fade,options);framing(state,delay);animate(state,canvas,[{transform:'scale(1.12)'},{transform:'none'}],{duration:1000,delay});break;
      case 21:animate(state,card,from('translateY(10px)'),options);accent(state,delay);break;
      case 22:animate(state,card,fade,options);animate(state,canvas,from('translateX(-35px)'),options);animate(state,copy,from('translateX(25px)'),{duration:720,delay:delay+100});break;
      case 23:animate(state,card,fade,options);animate(state,state.spotlight,[{opacity:0},{opacity:.75,offset:.4},{opacity:0}],{duration:900,delay});break;
      case 24:
        animate(state,card,[{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:480,delay});
        animate(state,canvas,from('translateY(18px)'),{duration:550,delay:delay+100});
        animate(state,copy.querySelector('.card-title-row'),from('translateY(12px)'),{duration:500,delay:delay+240});
        animate(state,copy.querySelector('p'),fade,{duration:400,delay:delay+400});accent(state,delay+180);break;
    }
  }
  function refresh() {
    if(destroyed||frame||!visible||isReduced()||document.hidden)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      if(!visible||isReduced()||document.hidden)return;
      const measured=[...states.values()].map(state=>({state,rect:state.anchor.getBoundingClientRect()}));
      for(const {state,rect} of measured) {
        if(rect.bottom < -96||rect.top > innerHeight+96){if(!state.armed){settle(state);state.armed=true;}continue;}
        if(state.anchor.contains(document.activeElement)){settle(state);state.armed=false;continue;}
        if(state.armed&&rect.top < innerHeight*.94&&rect.bottom>0)enter(state);
      }
    });
  }
  function settleAll() {cancelAnimationFrame(frame);frame=0;for(const state of states.values())settle(state);}
  function hover(state) {
    settle(state);state.armed=false;
    if(isReduced()||!visible)return;
    state.bounds=state.anchor.getBoundingClientRect();
    state.canvas.style.transform=cardProfiles[state.group-1].hover;
    if(state.group===8)outline(state);
    if(state.group===13)shimmer(state);
    if(state.group===18)particles(state);
    if(state.group===21||state.group===24)accent(state);
    if(state.group===23)state.spotlight.style.opacity='.65';
  }
  for(const event of ['scroll','resize'])addEventListener(event,refresh,{passive:true,signal:globalEvents.signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)settleAll();else refresh()},{signal:globalEvents.signal});
  return {
    register(anchor,e,index) {
      const state={anchor,index,group:e.group,armed:true,animations:new Set(),surface:anchor.querySelector('.card-surface'),canvas:anchor.querySelector('canvas'),copy:anchor.querySelector('.card-copy'),line:anchor.querySelector('.card-accent'),frame:anchor.querySelector('.card-outline'),sweep:anchor.querySelector('.card-sweep'),particles:anchor.querySelector('.card-particles'),bars:anchor.querySelectorAll('.card-frame-bar'),spotlight:anchor.querySelector('.card-spotlight')};
      states.set(anchor,state);const options={signal:cardEvents.signal};
      anchor.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')hover(state)},options);
      anchor.addEventListener('pointerleave',()=>settle(state),options);
      anchor.addEventListener('focusin',()=>{settle(state);state.armed=false;},options);
      anchor.addEventListener('pointerdown',()=>settle(state),options);
      anchor.addEventListener('pointermove',event=>{
        if(isReduced()||!visible||event.pointerType==='touch'||![15,23].includes(state.group)||!state.bounds)return;
        const x=(event.clientX-state.bounds.left)/state.bounds.width,y=(event.clientY-state.bounds.top)/state.bounds.height;
        if(state.group===15)state.canvas.style.transform=`perspective(600px) rotateX(${(y-.5)*-12}deg) rotateY(${(x-.5)*15}deg) scale(1.04)`;
        else {state.spotlight.style.setProperty('--spot-x',x*100+'%');state.spotlight.style.setProperty('--spot-y',y*100+'%');}
      },options);
    },
    refresh,
    clear(){settleAll();states.clear();cardEvents.abort();cardEvents=new AbortController();},
    setVisible(next){visible=Boolean(next);if(!visible)settleAll();else refresh();},
    preferenceChanged(){settleAll();if(!isReduced())refresh();},
    destroy(){destroyed=true;settleAll();states.clear();cardEvents.abort();globalEvents.abort();}
  };
}

export function cardDecoration() {
  const layer=document.createElement('div');layer.className='card-decoration';layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<svg class="card-outline" viewBox="0 0 100 100" preserveAspectRatio="none"><rect x=".7" y=".7" width="98.6" height="98.6" rx="3" pathLength="1"/></svg><span class="card-sweep"></span><span class="card-frame-bar top"></span><span class="card-frame-bar bottom"></span><span class="card-accent"></span><span class="card-spotlight"></span><span class="card-particles">'+Array.from({length:8},(_,i)=>`<i style="--dot-color:${['#bd2034','#537dff','#b5c970'][i%3]}"></i>`).join('')+'</span>';
  return layer;
}
