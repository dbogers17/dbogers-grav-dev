/* Isolated autopilot correction for v0.8.0. Coordinates are page based. */
const IDLE_MS=30000;
let lastPointer=performance.now(),outside=false;
addEventListener('pointermove',()=>{lastPointer=performance.now();outside=false},{passive:true});
document.documentElement.addEventListener('mouseleave',()=>{outside=true});
document.documentElement.addEventListener('mouseenter',()=>{outside=false;lastPointer=performance.now()});
window.SpacePortalAutopilot={idleMs:IDLE_MS,get active(){return outside||performance.now()-lastPointer>=IDLE_MS},get outside(){return outside},touch(){lastPointer=performance.now();outside=false}};
