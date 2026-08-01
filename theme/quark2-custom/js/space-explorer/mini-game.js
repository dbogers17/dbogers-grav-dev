if(document.body.classList.contains('secret-lab-portal-page')){
  const bg=document.createElement('canvas');
  const shipCanvas=document.createElement('canvas');
  bg.id='sl-mini-space-bg';
  shipCanvas.id='sl-mini-space-ship';
  document.body.prepend(bg);
  document.body.append(shipCanvas);

  const ui=document.createElement('div');
  ui.className='sl-mini-actions';
  ui.innerHTML='<button id="sl-mini-control" type="button">Take control</button><a href="/secret-lab/space-explorer">Full game</a>';
  document.body.append(ui);

  const bx=bg.getContext('2d');
  const sx=shipCanvas.getContext('2d');
  const ship={x:innerWidth*.72,y:innerHeight*.42,vx:0,vy:0};
  const pointer={x:ship.x,y:ship.y,inside:true};
  const keys={};
  let control=false;
  let lastInput=performance.now();
  let vw=innerWidth,vh=innerHeight,docH=Math.max(document.documentElement.scrollHeight,innerHeight);
  let bgStars=[];

  function makeStars(){
    const count=Math.min(900,Math.max(220,Math.floor(docH/5)));
    bgStars=Array.from({length:count},(_,i)=>({
      x:(i*193+37)%Math.max(vw,1),
      y:(i*131+83)%Math.max(docH,1),
      z:.2+(i%11)/12,
      t:i%4
    }));
  }

  function drawBackground(){
    const gradient=bx.createLinearGradient(0,0,vw,docH);
    gradient.addColorStop(0,'#020617');
    gradient.addColorStop(.38,'#071b35');
    gradient.addColorStop(.72,'#061326');
    gradient.addColorStop(1,'#08051b');
    bx.fillStyle=gradient;
    bx.fillRect(0,0,vw,docH);

    const nebulaA=bx.createRadialGradient(vw*.16,docH*.18,0,vw*.16,docH*.18,Math.max(vw,docH*.28));
    nebulaA.addColorStop(0,'rgba(37,99,235,.20)');
    nebulaA.addColorStop(.5,'rgba(14,165,233,.055)');
    nebulaA.addColorStop(1,'transparent');
    bx.fillStyle=nebulaA;bx.fillRect(0,0,vw,docH);

    const nebulaB=bx.createRadialGradient(vw*.82,docH*.7,0,vw*.82,docH*.7,Math.max(vw*.65,docH*.24));
    nebulaB.addColorStop(0,'rgba(124,58,237,.14)');
    nebulaB.addColorStop(1,'transparent');
    bx.fillStyle=nebulaB;bx.fillRect(0,0,vw,docH);

    for(const q of bgStars){
      bx.fillStyle=q.t===0?`rgba(125,211,252,${q.z*.8})`:`rgba(226,232,240,${q.z*.55})`;
      bx.beginPath();
      bx.arc(q.x,q.y,Math.max(.4,q.z*1.25),0,Math.PI*2);
      bx.fill();
    }
  }

  function resize(){
    vw=innerWidth;vh=innerHeight;
    docH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,vh);
    const bd=Math.min(devicePixelRatio||1,1.25);
    bg.width=Math.round(vw*bd);bg.height=Math.round(docH*bd);
    bg.style.height=docH+'px';
    bx.setTransform(bd,0,0,bd,0,0);
    const sd=Math.min(devicePixelRatio||1,2);
    shipCanvas.width=Math.round(vw*sd);shipCanvas.height=Math.round(vh*sd);
    sx.setTransform(sd,0,0,sd,0,0);
    makeStars();drawBackground();
    ship.x=Math.min(Math.max(ship.x,24),vw-24);
    ship.y=Math.min(Math.max(ship.y,80),vh-24);
  }

  let resizeTimer;
  function scheduleResize(){clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,120)}
  resize();
  addEventListener('resize',scheduleResize);
  new MutationObserver(scheduleResize).observe(document.body,{childList:true,subtree:true});

  addEventListener('pointermove',e=>{
    pointer.x=e.clientX;pointer.y=e.clientY;pointer.inside=true;lastInput=performance.now();
  });
  document.documentElement.addEventListener('mouseleave',()=>{
    pointer.inside=false;
    ship.vx*=.35;ship.vy*=.35;
  });
  addEventListener('blur',()=>{
    pointer.inside=false;control=false;keys.w=keys.a=keys.s=keys.d=0;
    ship.vx=0;ship.vy=0;
    document.querySelector('#sl-mini-control').textContent='Take control';
  });
  addEventListener('focus',()=>{pointer.inside=true;lastInput=performance.now()});
  addEventListener('keydown',e=>{
    if(!control||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;
    keys[e.key.toLowerCase()]=1;
    if(['w','a','s','d'].includes(e.key.toLowerCase()))e.preventDefault();
    if(e.key==='Escape'){
      control=false;ship.vx*=.5;ship.vy*=.5;
      document.querySelector('#sl-mini-control').textContent='Take control';
    }
  });
  addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
  document.querySelector('#sl-mini-control').onclick=e=>{
    control=!control;pointer.inside=true;lastInput=performance.now();
    e.currentTarget.textContent=control?'Release control':'Take control';
  };

  function clampVelocity(max){
    const speed=Math.hypot(ship.vx,ship.vy);
    if(speed>max){ship.vx=ship.vx/speed*max;ship.vy=ship.vy/speed*max}
  }

  function frame(t){
    sx.clearRect(0,0,vw,vh);
    if(control){
      ship.vx+=((keys.d?1:0)-(keys.a?1:0))*.13;
      ship.vy+=((keys.s?1:0)-(keys.w?1:0))*.13;
    }else if(pointer.inside){
      const idle=t-lastInput>3200;
      const tx=idle?vw*.5+Math.sin(t*.00028)*vw*.28:pointer.x;
      const ty=idle?vh*.5+Math.cos(t*.00022)*vh*.22:pointer.y;
      const distance=Math.hypot(tx-ship.x,ty-ship.y);
      const pull=Math.min(.00042,.00012+distance*.00000045);
      ship.vx+=(tx-ship.x)*pull;
      ship.vy+=(ty-ship.y)*pull;
    }
    ship.vx*=pointer.inside?.965:.88;
    ship.vy*=pointer.inside?.965:.88;
    clampVelocity(control?4.2:2.5);
    ship.x=Math.min(Math.max(ship.x+ship.vx,18),vw-18);
    ship.y=Math.min(Math.max(ship.y+ship.vy,70),vh-18);

    const speed=Math.hypot(ship.vx,ship.vy);
    const angle=speed>.04?Math.atan2(ship.vy,ship.vx)+Math.PI/2:0;
    sx.save();sx.translate(ship.x,ship.y);sx.rotate(angle);
    if(speed>.18){
      const flame=16+Math.min(speed*4,18);
      const fg=sx.createLinearGradient(0,8,0,flame+10);
      fg.addColorStop(0,'rgba(255,255,255,.9)');fg.addColorStop(.35,'rgba(56,189,248,.8)');fg.addColorStop(1,'transparent');
      sx.fillStyle=fg;sx.beginPath();sx.moveTo(-5,8);sx.lineTo(0,flame+10);sx.lineTo(5,8);sx.closePath();sx.fill();
    }
    sx.fillStyle='#e5f7ff';sx.strokeStyle='rgba(56,189,248,.95)';sx.lineWidth=1.4;
    sx.shadowBlur=26;sx.shadowColor='#38bdf8';
    sx.beginPath();sx.moveTo(0,-22);sx.lineTo(13,13);sx.lineTo(4,9);sx.lineTo(0,15);sx.lineTo(-4,9);sx.lineTo(-13,13);sx.closePath();sx.fill();sx.stroke();
    sx.fillStyle='#38bdf8';sx.beginPath();sx.arc(0,-4,3.2,0,Math.PI*2);sx.fill();
    sx.restore();requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
