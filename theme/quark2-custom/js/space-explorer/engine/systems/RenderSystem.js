import{UnifiedFactionRenderer}from'../art/UnifiedFactionRenderer.js';
import{CalmInfiniteSpaceRenderer}from'../art/CalmInfiniteSpaceRenderer.js';
import{AssetManager}from'../art/AssetManager.js';
import{StableHelixRenderer}from'../art/StableHelixRenderer.js';
import{HelixV2Assets}from'../art/HelixV2Assets.js';
export class RenderSystem{
 constructor(ctx,world){this.ctx=ctx;this.world=world;this.unified=new UnifiedFactionRenderer();this.space=new CalmInfiniteSpaceRenderer();this.assets=new AssetManager();this.v2=new HelixV2Assets();this.station=new StableHelixRenderer(this.assets);this.traffic=[];this.rocks=world.asteroids.map((r,i)=>({...r,a:i*.8}))}
 setTraffic(ships){this.traffic=ships||[]}
 drawBackground(camera,w,h,time){this.space.draw(this.ctx,camera,w,h,time)}
 drawAsteroid(c,r,q){c.save();c.translate(Math.round(q.x),Math.round(q.y));c.rotate(r.a);const g=c.createRadialGradient(-r.r*.4,-r.r*.45,1,0,0,r.r*1.1);g.addColorStop(0,'#b9aa96');g.addColorStop(.3,'#746a5d');g.addColorStop(.67,'#39342e');g.addColorStop(1,'#0b0a09');c.fillStyle=g;c.strokeStyle='#81786b';c.beginPath();for(let i=0;i<12;i++){const a=i/12*Math.PI*2,rr=r.r*(.72+((i*17+r.id.length*13)%9)/18);i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}c.closePath();c.fill();c.stroke();for(let i=0;i<3;i++){c.fillStyle='rgba(26,23,20,.72)';c.beginPath();c.arc((-0.3+i*.3)*r.r,(-.18+i*.16)*r.r,r.r*(.09+i*.018),0,Math.PI*2);c.fill()}c.restore()}
 drawWorld(camera,w,h,time=performance.now()){const c=this.ctx,planet=this.world.planet,p=camera.worldToScreen(planet.x,planet.y,w,h,.34),radius=planet.r*.38*camera.zoom;c.save();c.fillStyle='#010103';c.beginPath();c.arc(p.x,p.y,radius*1.78,0,Math.PI*2);c.fill();c.restore();
  c.save();c.strokeStyle='rgba(210,225,235,.42)';c.lineWidth=3;c.beginPath();c.ellipse(p.x,p.y,radius*1.52,radius*.29,-.2,Math.PI,Math.PI*2);c.stroke();c.restore();this.v2.draw(c,'planets/neris.png',p.x,p.y,radius*2.6,radius*1.78);c.save();c.strokeStyle='rgba(225,235,242,.62)';c.lineWidth=3;c.beginPath();c.ellipse(p.x,p.y,radius*1.52,radius*.29,-.2,0,Math.PI);c.stroke();c.restore();
  for(const r of this.rocks){const q=camera.worldToScreen(r.x,r.y,w,h,1);if(q.x<-60||q.x>w+60||q.y<-60||q.y>h+60)continue;c.save();c.scale(camera.zoom,camera.zoom);this.drawAsteroid(c,r,{x:q.x/camera.zoom,y:q.y/camera.zoom});c.restore()}
  for(const t of this.traffic){const q=camera.worldToScreen(t.x,t.y,w,h,1),a=Math.atan2(t.vy||0,t.vx||1);if(q.x>-100&&q.x<w+100&&q.y>-100&&q.y<h+100)this.v2.draw(c,`ships/${t.role}.png`,q.x,q.y,Math.max(28,(t.size||20)*1.8)*camera.zoom,Math.max(42,(t.size||20)*2.5)*camera.zoom,a+Math.PI/2)}
  for(const loc of this.world.locations){const q=camera.worldToScreen(loc.x,loc.y,w,h,1);if(q.x<-300||q.x>w+300||q.y<-300||q.y>h+300)continue;if(loc.type==='station'){this.station.draw(c,q.x,q.y,time,camera.zoom);continue}c.strokeStyle=loc.type==='quest'?'#fbbf24':'#60a5fa';c.lineWidth=2;c.beginPath();c.arc(q.x,q.y,13,0,Math.PI*2);c.stroke();c.fillStyle='#dbeafe';c.font='12px sans-serif';c.textAlign='center';c.fillText(loc.name,q.x,q.y+38)}}
}
