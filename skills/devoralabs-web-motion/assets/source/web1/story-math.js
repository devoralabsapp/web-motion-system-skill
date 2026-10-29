export const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
export const range=(n,start,end)=>clamp((n-start)/(end-start));
export const ease=n=>n*n*(3-2*n);
export function followProgress(current,target,deltaMs,tau=72){
 const bounded=target+clamp(current-target,-.14,.14);
 const next=bounded+(target-bounded)*(1-Math.exp(-Math.max(0,deltaMs)/tau));
 return Math.abs(target-next)<.0004?target:next;
}
export function pointAlongCubic(points,progress){
 const samples=[{x:points[0],y:points[1],length:0}];let length=0;
 for(let i=2;i<points.length;i+=6){const x=points[i-2],y=points[i-1];for(let step=1;step<=16;step++){
  const t=step/16,u=1-t,next={x:u*u*u*x+3*u*u*t*points[i]+3*u*t*t*points[i+2]+t*t*t*points[i+4],y:u*u*u*y+3*u*u*t*points[i+1]+3*u*t*t*points[i+3]+t*t*t*points[i+5]};
  const prev=samples.at(-1);length+=Math.hypot(next.x-prev.x,next.y-prev.y);samples.push({...next,length});
 }}
 const at=clamp(progress)*length;
 for(let i=1;i<samples.length;i++){const b=samples[i],a=samples[i-1];if(b.length>=at){const t=(at-a.length)/(b.length-a.length||1);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}}
 return samples.at(-1);
}
export function scrollProgress(top,travel){return travel>0?clamp(-top/travel):1;}
export function mixRect(a,b,t){return Object.fromEntries(['x','y','width','height','rotation'].map(k=>[k,(a[k]||0)+((b[k]||0)-(a[k]||0))*t]));}
export function moduleRect(start,aligned,end,p){
 if(p<.16)return {...start,y:start.y-Math.sin(range(p,0,.16)*Math.PI)*5};
 if(p<.43)return mixRect(start,aligned,ease(range(p,.16,.43)));
 return mixRect(aligned,{...end,rotation:0},ease(range(p,.43,.88)));
}
export function mixPath(a,b,t){if(a.length!==b.length||(a.length-2)%6)throw new Error('Incompatible cubic paths');return a.map((n,i)=>n+(b[i]-n)*clamp(t));}
export function cubicPath(points){return `M${points.slice(0,2).map(n=>n.toFixed(2)).join(' ')} C${points.slice(2).map(n=>n.toFixed(2)).join(' ')}`;}
