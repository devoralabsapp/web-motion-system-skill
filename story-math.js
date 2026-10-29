export const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
export const range=(n,start,end)=>clamp((n-start)/(end-start));
export const ease=n=>n*n*(3-2*n);
export function scrollProgress(top,travel){return travel>0?clamp(-top/travel):1;}
export function mixRect(a,b,t){return Object.fromEntries(['x','y','width','height','rotation'].map(k=>[k,(a[k]||0)+((b[k]||0)-(a[k]||0))*t]));}
export function moduleRect(start,aligned,end,p){
 if(p<.16)return {...start,y:start.y-Math.sin(range(p,0,.16)*Math.PI)*5};
 if(p<.43)return mixRect(start,aligned,ease(range(p,.16,.43)));
 return mixRect(aligned,{...end,rotation:0},ease(range(p,.43,.88)));
}
export function mixPath(a,b,t){if(a.length!==b.length||(a.length-2)%6)throw new Error('Incompatible cubic paths');return a.map((n,i)=>n+(b[i]-n)*clamp(t));}
export function cubicPath(points){return `M${points.slice(0,2).map(n=>n.toFixed(2)).join(' ')} C${points.slice(2).map(n=>n.toFixed(2)).join(' ')}`;}

