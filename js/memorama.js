/* Memorama */
const pairs=A.flatMap((a,i)=>[{k:i,t:a.name,n:a.h==='dia'?'☀':'☾',name:1},{k:i,t:a.clue,n:a.h==='dia'?'☀':'☾'}]);
let deck,open=[],found=0,moves=0,lock=false;
const grid=document.getElementById('grid'),msg=document.getElementById('msg');
function deal(){deck=pairs.map(c=>({...c})).sort(()=>Math.random()-.5);open=[];found=0;moves=0;lock=false;mv.textContent=0;pr.textContent=0;msg.textContent='';grid.innerHTML='';
 deck.forEach((c,i)=>{const b=document.createElement('button');b.className='card';b.setAttribute('aria-label','Carta '+(i+1));
 b.innerHTML='<span class="in"><span class="face back">✿</span><span class="face front">'+(c.name?'<b>'+c.t+'</b>':'<span>'+c.t+'</span>')+'<span aria-hidden="true">'+c.n+'</span></span></span>';
 b.onclick=()=>flip(i,b);grid.appendChild(b)})}
function flip(i,b){if(lock||b.classList.contains('on'))return;b.classList.add('on');open.push([i,b]);
 if(open.length<2)return;moves++;mv.textContent=moves;const[[i1,b1],[i2,b2]]=open;
 if(deck[i1].k===deck[i2].k){[b1,b2].forEach(x=>x.classList.add('ok'));open=[];pr.textContent=++found;
  if(found===4)msg.textContent='¡Lo lograste en '+moves+' movimientos! Recuerda: de día y de noche, los polinizadores sostienen los ecosistemas.'}
 else{lock=true;setTimeout(()=>{b1.classList.remove('on');b2.classList.remove('on');open=[];lock=false},950)}}
reset.onclick=deal;deal();

try{new QRCode(document.getElementById('qr'),{text:location.href,width:112,height:112})}catch(e){}
