/* Escena 3D, selector de polinizadores y animación. */
const body=document.body,stage=document.getElementById('stage');
const R=new THREE.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));stage.appendChild(R.domElement);
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(40,1,.1,60);
const amb=new THREE.AmbientLight(0xffffff,.75),dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(3,5,4);S.add(amb,dl);
function size(){const w=stage.clientWidth,h=stage.clientHeight;R.setSize(w,h);C.aspect=w/h;C.updateProjectionMatrix()}
addEventListener('resize',size);size();

let cur=-1,model,wings=[],yaw=.6,drag=false,lx=0;
const btns=[];
A.forEach((a,i)=>{const b=document.createElement('button');b.className='pick';b.textContent=a.name;b.setAttribute('aria-pressed','false');b.onclick=()=>pick(i);document.getElementById(a.h==='dia'?'gd':'gn').appendChild(b);btns.push(b)});
function pick(i){
 const a=A[i];cur=i;if(model)S.remove(model);wings=[];model=a.build(wings);S.add(model);
 C.position.set(0,1.6,a.z);C.lookAt(0,0,0);
 body.dataset.theme=a.h;const n=a.h==='noche';amb.color.set(n?0x8a98ff:0xffffff);amb.intensity=n?.6:.75;dl.color.set(n?0xb5c0ff:0xffffff);
 btns.forEach((b,j)=>b.setAttribute('aria-pressed',j===i));
 hab.textContent=n?'':'';nom.textContent=a.name;sci.textContent=a.sci;desc.textContent=a.desc;vis.textContent=a.vis;fact.textContent=a.fact;
}
stage.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;stage.setPointerCapture(e.pointerId);stage.style.cursor='grabbing'});
stage.addEventListener('pointermove',e=>{if(drag){yaw+=(e.clientX-lx)*.01;lx=e.clientX}});
['pointerup','pointercancel'].forEach(t=>stage.addEventListener(t,()=>{drag=false;stage.style.cursor='grab'}));
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function loop(t){requestAnimationFrame(loop);if(!model)return;const a=A[cur];if(!drag&&!rm)yaw+=.004;model.rotation.y=yaw;model.rotation.x=.18;
 const f=rm?0:Math.sin(t/1000*a.sp);model.position.y=rm?0:Math.sin(t/700)*.12;
 wings.forEach(w=>w.g.rotation.z=w.s*(a.base+a.amp*f));R.render(S,C)})(0);
pick(0);
