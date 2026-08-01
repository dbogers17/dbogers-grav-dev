export class Camera{
 constructor(){this.x=0;this.y=0;this.smoothing=7;this.zoom=1;this.targetZoom=1;this.minZoom=.7;this.maxZoom=1.6}
 follow(target,dt){const k=1-Math.exp(-this.smoothing*dt);this.x+=(target.x-this.x)*k;this.y+=(target.y-this.y)*k;this.zoom+=(this.targetZoom-this.zoom)*(1-Math.exp(-8*dt))}
 setZoom(value){this.targetZoom=Math.max(this.minZoom,Math.min(this.maxZoom,value))}
 adjustZoom(delta){this.setZoom(this.targetZoom+delta)}
 resetZoom(){this.targetZoom=1}
 worldToScreen(x,y,w,h,zoom=1){const z=this.zoom*zoom;return{x:(x-this.x)*z+w/2,y:(y-this.y)*z+h/2}}
 screenToWorld(x,y,w,h){return{x:(x-w/2)/this.zoom+this.x,y:(y-h/2)/this.zoom+this.y}}
}
