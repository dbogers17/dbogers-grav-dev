import{HelixV2Assets}from'../art/HelixV2Assets.js';
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
export class PlayerShip{
 constructor(save){this.art=new HelixV2Assets();Object.assign(this,{x:save.x,y:save.y,vx:0,vy:0,angle:-Math.PI/2,radius:22,normalMaxSpeed:500,boostMaxSpeed:780,reverseSpeed:130,thrust:285,boostThrust:760,reverseThrust:220,strafeThrust:250,turnSpeed:3.5,drag:.32,lateralDamping:2.15,boostCoastDeceleration:42,color:save.shipColor,shield:save.shield,maxShield:save.maxShield,hull:save.hull,maxHull:save.maxHull,boost:save.boost,maxBoost:save.maxBoost,boosting:false,boostCoasting:false,coastLimit:500,wasBoosting:false,invulnerable:0,lastDamageAt:-999})}
 update(dt,input,pointer,w,h,camera,time=performance.now()/1000){
  const axis=input.axis(),screen=camera.worldToScreen(this.x,this.y,w,h,1),target=Math.atan2(pointer.y-screen.y,pointer.x-screen.x),distance=Math.hypot(pointer.x-screen.x,pointer.y-screen.y),initialSpeed=Math.hypot(this.vx,this.vy),speedRatio=Math.min(1,initialSpeed/this.boostMaxSpeed),turnPenalty=.34+.66*(1-speedRatio);
  if(distance>45){const delta=wrap(target-this.angle);this.angle+=Math.max(-this.turnSpeed*turnPenalty*dt,Math.min(this.turnSpeed*turnPenalty*dt,delta))}
  const fx=Math.cos(this.angle),fy=Math.sin(this.angle),rx=-fy,ry=fx;
  let forward=this.vx*fx+this.vy*fy,lateral=this.vx*rx+this.vy*ry;
  const wantsBoost=input.keys.has('shift')&&axis.y<0&&this.boost>0;
  if(wantsBoost&&!this.wasBoosting)this.coastLimit=Math.max(this.normalMaxSpeed,initialSpeed);
  if(!wantsBoost&&this.wasBoosting)this.coastLimit=Math.max(this.normalMaxSpeed,initialSpeed);
  this.boosting=wantsBoost;this.wasBoosting=wantsBoost;
  if(axis.y<0)forward+=(wantsBoost?this.boostThrust:this.thrust)*dt;
  if(axis.y>0){if(forward>25)forward*=Math.exp(-3.4*dt);else forward-=this.reverseThrust*dt}
  lateral+=axis.x*this.strafeThrust*dt;
  forward*=Math.exp(-this.drag*dt);lateral*=Math.exp(-this.lateralDamping*dt);
  forward=Math.max(-this.reverseSpeed,forward);this.vx=fx*forward+rx*lateral;this.vy=fy*forward+ry*lateral;
  let speed=Math.hypot(this.vx,this.vy);
  if(wantsBoost){this.coastLimit=this.boostMaxSpeed;if(speed>this.boostMaxSpeed){const k=this.boostMaxSpeed/speed;this.vx*=k;this.vy*=k;speed=this.boostMaxSpeed}}
  else{
    if(this.coastLimit>this.normalMaxSpeed)this.coastLimit=Math.max(this.normalMaxSpeed,this.coastLimit-this.boostCoastDeceleration*dt);
    const allowed=this.coastLimit;
    if(speed>allowed){const k=allowed/speed;this.vx*=k;this.vy*=k;speed=allowed}
  }
  this.boostCoasting=!wantsBoost&&this.coastLimit>this.normalMaxSpeed+.5;
  this.x+=this.vx*dt;this.y+=this.vy*dt;
  this.boost=Math.max(0,Math.min(this.maxBoost,this.boost+(wantsBoost?-34:12)*dt));
  if(time-this.lastDamageAt>6&&this.shield<this.maxShield)this.shield=Math.min(this.maxShield,this.shield+7*dt);
  this.invulnerable=Math.max(0,this.invulnerable-dt)
 }
 damage(amount,{bypassShield=false,time=performance.now()/1000}={}){if(this.invulnerable>0)return;this.lastDamageAt=time;if(!bypassShield&&this.shield>0){const used=Math.min(this.shield,amount);this.shield-=used;amount-=used}if(amount>0)this.hull=Math.max(0,this.hull-amount);this.invulnerable=.35}
 repair(){this.hull=this.maxHull;this.shield=this.maxShield;this.boost=this.maxBoost}
 draw(ctx,camera,w,h){const p=camera.worldToScreen(this.x,this.y,w,h,1),z=camera.zoom,speed=Math.hypot(this.vx,this.vy),size=72*z;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(this.angle+Math.PI/2);if(speed>15){const flame=(18+Math.min(58,speed*.075))*z,g=ctx.createLinearGradient(0,size*.3,0,size*.3+flame);g.addColorStop(0,'#fff');g.addColorStop(.35,this.boosting?'#9b7cff':'#67d8ff');g.addColorStop(1,'transparent');ctx.fillStyle=g;for(const x of[-size*.13,size*.13]){ctx.beginPath();ctx.moveTo(x-3*z,size*.28);ctx.lineTo(x,size*.28+flame);ctx.lineTo(x+3*z,size*.28);ctx.fill()}}ctx.restore();this.art.draw(ctx,'ships/player-scout.png',p.x,p.y,size*.69,size,this.angle+Math.PI/2);if(this.shield>0){ctx.strokeStyle='rgba(103,232,249,.45)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p.x,p.y,size*.46,0,Math.PI*2);ctx.stroke()}}
}
