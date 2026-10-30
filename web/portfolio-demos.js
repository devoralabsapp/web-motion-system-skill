export const demoOneStyles=[['classic','Bản gốc'],['one-line','Một nét, thành hệ thống'],['kinetic','Chữ động'],['layers','Xếp lớp'],['blueprint','Bản vẽ'],['orbit','Quỹ đạo']];
export const demoTwoStyles=[['frame-shift','Điện ảnh · Frame Shift'],['cobalt-court','Cobalt · Cobalt Court'],['cutout-dept','Collage · Cutout Dept.']];

export function initPortfolioDemos({isReduced,onChange}) {
  const frames=new Map();let currentView='',language='vi',style='one-line',theme='frame-shift';
  const one=document.querySelector('#demo-one-style'),two=document.querySelector('#demo-two-style');
  for(const [id,name] of demoOneStyles)one.add(new Option(name,id));
  for(const [id,name] of demoTwoStyles)two.add(new Option(name,id));
  one.onchange=()=>onChange({demoStyle:one.value});two.onchange=()=>onChange({demoTheme:two.value});
  for(const select of document.querySelectorAll('.demo-language'))select.onchange=()=>onChange({demoLang:select.value});
  function source(key){return key==='demo2'?`creative.html?theme=${theme}`:key==='classic'?'classic.html':'one-line.html'+(key==='one-line'?'':`?variant=${key}`);}
  function activeKey(){return currentView==='demo1'?style:currentView==='demo2'?'demo2':null;}
  function syncFrame(key,frame){const data={type:'motion-explorer:host',visible:key===activeKey()&&!document.hidden,reduced:isReduced()};frame.contentWindow?.postMessage(data,location.origin);frame.contentWindow?.postMessage({type:'redline:language',language},location.origin);if(key==='demo2')frame.contentWindow?.postMessage({type:'devoralabs:set-theme',theme},location.origin);}
  function sync(){for(const [key,frame] of frames){frame.hidden=key!==activeKey();frame.inert=key!==activeKey();syncFrame(key,frame);}}
  function mount(key){if(frames.has(key))return;const frame=document.createElement('iframe');frame.title=key==='demo2'?'Demo 2 — Creative Lab':`Demo 1 — ${demoOneStyles.find(s=>s[0]===key)[1]}`;frame.dataset.demoKey=key;frame.id='portfolio-'+key;const url=new URL('/demos/portfolio/'+source(key),location.origin);url.searchParams.set('lang',language);frame.src=url.href;frame.addEventListener('load',()=>{syncFrame(key,frame);const status=document.querySelector(key==='demo2'?'#demo-two-loading':'#demo-one-loading');status.hidden=true;});frames.set(key,frame);document.querySelector(key==='demo2'?'#demo-two-stage':'#demo-one-stage').append(frame);}
  addEventListener('message',event=>{const frame=frames.get('demo2');if(event.origin!==location.origin||event.source!==frame?.contentWindow)return;if(event.data?.type==='devoralabs:theme'&&demoTwoStyles.some(s=>s[0]===event.data.theme)&&event.data.theme!==theme){theme=event.data.theme;onChange({demoTheme:theme},true);}});
  document.addEventListener('visibilitychange',sync);
  return {
    render(route){currentView=route.view;style=route.demoStyle;theme=route.demoTheme;language=route.demoLang;one.value=style;two.value=theme;for(const select of document.querySelectorAll('.demo-language'))select.value=language;if(activeKey())mount(activeKey());document.querySelector('#demo-one-open').href=new URL('/demos/portfolio/'+source(style),location.origin).href;const direct=new URL(document.querySelector('#demo-one-open').href);direct.searchParams.set('lang',language);document.querySelector('#demo-one-open').href=direct.href;document.querySelector('#demo-two-open').href='/demos/portfolio/creative.html?theme='+theme+'&lang='+language;sync();},
    preferenceChanged:sync
  };
}
