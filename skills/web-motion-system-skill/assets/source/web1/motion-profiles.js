export const motionProfiles={
 'one-line':{label:'Một nét, thành hệ thống',technique:'Scrollytelling / morphing'},
 kinetic:{label:'Chữ chuyển động',technique:'Expressive typography'},
 layers:{label:'Chiều sâu nhiều lớp',technique:'Faux 3D / isometric depth'},
 blueprint:{label:'Nét vẽ kiến trúc',technique:'Line art / self-drawing'},
 orbit:{label:'Quỹ đạo khám phá',technique:'Motion paths / radial reveals'}
};
export function initMotionProfile(){
 const requested=new URLSearchParams(location.search).get('variant');const id=Object.hasOwn(motionProfiles,requested)?requested:'one-line';
 document.documentElement.dataset.motionStyle=id;if(id==='one-line')return;
 const art=document.createElementNS('http://www.w3.org/2000/svg','svg');art.classList.add('profile-art');art.setAttribute('viewBox','0 0 1000 650');art.setAttribute('preserveAspectRatio','none');art.setAttribute('aria-hidden','true');
 const graphics={
  kinetic:'<text x="565" y="245" font-size="137" font-weight="600" letter-spacing="-12">Aa</text><path d="M550 288H940M550 302H805M550 317H685"/><rect x="900" y="370" width="40" height="40"/>',
  layers:'<path d="M560 180 770 85 960 200 750 300Z M560 255 770 160 960 275 750 375Z M560 330 770 235 960 350 750 450Z"/><path d="M560 180V330M960 200V350M750 300V450"/>',
  blueprint:'<path d="M535 65H950V565H535Z M545 115H940 M620 115V550 M535 65 950 565 M535 565 950 65"/><path class="profile-route" pathLength="1" d="M535 65H950V565H535V65 M620 115V550 M535 115H950"/><circle cx="742" cy="315" r="168"/>',
  orbit:'<ellipse cx="755" cy="295" rx="205" ry="150" transform="rotate(-28 755 295)"/><ellipse cx="755" cy="295" rx="205" ry="150" transform="rotate(32 755 295)"/><circle class="orbit-core" cx="755" cy="295" r="65"/><path d="M545 295H965M755 85V505"/>'
 };
 art.innerHTML=graphics[id];document.querySelector('.story-stage').prepend(art);
 const label=document.querySelector('.story-heading .eyebrow');label.textContent='';const square=document.createElement('span');square.className='red-square';label.append(square,document.createTextNode(motionProfiles[id].label));
}
