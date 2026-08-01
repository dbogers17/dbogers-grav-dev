const VERSION='0.7.0';
const app=document.querySelector('#sl-space-app');
if(app){
  document.body.dataset.spaceVersion=VERSION;
  const hud=document.querySelector('.sl-space-hud');
  const panel=document.querySelector('#sl-space-panel');
  const dialog=document.querySelector('#sl-space-dialog');
  const dock=document.createElement('section');
  dock.id='sl-flight-dock';
  dock.innerHTML=`<div class="sl-flight-brand"><span class="sl-flight-pulse"></span><div><small>EARLY ACCESS</small><strong>SPACE EXPLORER</strong></div></div><div class="sl-flight-readouts"><span><small>VERSION</small><b>v${VERSION}</b></span><span><small>THRUST</small><b id="sl-thrust">IDLE</b></span><span><small>NAV</small><b id="sl-nav-state">FREE FLIGHT</b></span></div><button id="sl-help" type="button">Controls</button>`;
  document.body.append(dock);

  const toast=document.createElement('div');toast.id='sl-toast';toast.hidden=true;document.body.append(toast);
  let toastTimer;
  function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,2400)}
  function closePanels(){if(panel)panel.hidden=true;if(dialog)dialog.hidden=true}
  document.addEventListener('click',e=>{
    const close=e.target.closest('[data-close],#sl-close-panel,#sl-resume');
    if(close){e.preventDefault();closePanels()}
  });
  document.querySelector('#sl-help')?.addEventListener('click',()=>{
    if(!panel)return;panel.hidden=false;panel.innerHTML='<div class="sl-panel-head"><div><small>FLIGHT COMPUTER</small><h2>Controls</h2></div><button type="button" data-close aria-label="Close">×</button></div><div class="sl-control-grid"><kbd>WASD</kbd><span>Fly through the current sector</span><kbd>M</kbd><span>Open galaxy map</span><kbd>ESC</kbd><span>Close menu or dialog</span><kbd>Mouse</kbd><span>Aim the ship</span></div>';
  });
  addEventListener('keydown',e=>{
    if(e.key.toLowerCase()==='m'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){e.preventDefault();document.querySelector('#sl-space-map')?.click()}
  });
  const mapButton=document.querySelector('#sl-space-map'),menuButton=document.querySelector('#sl-space-menu');
  mapButton?.setAttribute('title','Galaxy map (M)');menuButton?.setAttribute('title','Flight menu');
  showToast(`First Flight v${VERSION} ready`);

  let lastX=0,lastY=0,lastT=performance.now();
  function telemetry(t){
    const coord=document.querySelector('#sl-space-coordinates')?.textContent||'0, 0';
    const parts=coord.split(',').map(v=>Number(v.trim())||0);const dt=Math.max(16,t-lastT);const speed=Math.hypot(parts[0]-lastX,parts[1]-lastY)/(dt/16.67);
    const thrust=document.querySelector('#sl-thrust');if(thrust)thrust.textContent=speed>.1?`${Math.min(999,Math.round(speed*10))}%`:'IDLE';
    lastX=parts[0];lastY=parts[1];lastT=t;requestAnimationFrame(telemetry)
  }requestAnimationFrame(telemetry);
}
