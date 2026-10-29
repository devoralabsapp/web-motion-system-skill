import {test} from 'node:test';import assert from 'node:assert/strict';
import {scrollProgress,moduleRect,mixPath,cubicPath,followProgress,pointAlongCubic} from '../story-math.js';
test('Scroll progress clamps and reverses deterministically',()=>{assert.equal(scrollProgress(100,1000),0);assert.equal(scrollProgress(-1500,1000),1);assert.equal(scrollProgress(-400,1000),.4);assert.equal(scrollProgress(-800,2000),.4);});
test('A real module reaches the final slot continuously',()=>{const a={x:800,y:100,width:250,height:100,rotation:-5},b={x:700,y:60,width:350,height:98,rotation:0},c={x:22,y:400,width:1200,height:50,rotation:0};assert.deepEqual(moduleRect(a,b,c,1),c);assert.deepEqual(moduleRect(a,b,c,.43),b);for(const t of [.16,.43,.88]){const before=moduleRect(a,b,c,t-.000001),after=moduleRect(a,b,c,t+.000001);for(const k of Object.keys(c))assert.ok(Math.abs(before[k]-after[k])<.01);}});
test('Connected line preserves cubic topology',()=>{const a=Array(26).fill(0),b=Array(26).fill(100);assert.equal(mixPath(a,b,.5).length,26);assert.ok(mixPath(a,b,.5).every(n=>n===50));assert.match(cubicPath(b),/^M[\d.]+ [\d.]+ C[\d. ]+$/);assert.throws(()=>mixPath([0,0],[0,0,1],.5));});
test('Scroll follower is time based, bounded and settles after reversal',()=>{
 let a=.45,b=.45;for(let i=0;i<6;i++)a=followProgress(a,.5,16);for(let i=0;i<12;i++)b=followProgress(b,.5,8);assert.ok(Math.abs(a-b)<1e-10);
 assert.ok(followProgress(0,1,16)>.86);for(let i=0;i<40;i++)a=followProgress(a,.1,16);assert.equal(a,.1);
});
test('Pure path sampling reaches endpoints and follows a straight cubic',()=>{const points=[0,0,0,0,100,0,100,0];assert.equal(pointAlongCubic(points,0).x,0);assert.equal(pointAlongCubic(points,1).x,100);assert.ok(Math.abs(pointAlongCubic(points,.5).x-50)<.01);assert.equal(pointAlongCubic(points,.5).y,0);});
