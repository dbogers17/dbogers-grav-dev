const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
export class PlayerShip{
 constructor(save){Object.assign(this,{x:save.x,y:save.y,vx:0,vy:0,angle:-Math.PI/2,radius:22,normalMaxSpeed:500,boostMaxSpeed:780,reverseSpeed:130,thrust:285,boostThrust:760,reverseThrust:220,strafeThrust:250,turnSpeed:3.5,drag:.32,lateralDamping:2.15,boostCoastDeceleration:42,color:save.shipColor,shield:save.shield,maxShield:save.maxShield,hull:save.hull,maxHull:save.maxHull,boost:save.boost,maxBoost:save.maxBoost,boosting:false,boostCoasting:false,coastLimit:500,wasBoosting:false,invulnerable:0,lastDamageAt:-999})}
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
 draw(ctx,camera,w,h){const p=camera.worldToScreen(this.x,this.y,w,h,1),speed=Math.hypot(this.vx,this.vy);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(this.angle+Math.PI/2);
  if(speed>15){const flame=18+Math.min(58,speed*.075),g=ctx.createLinearGradient(0,12,0,flame+14);g.addColorStop(0,'#fff');g.addColorStop(.18,this.boosting?'#ddd6fe':'#bae6fd');g.addColorStop(.48,this.boosting?'rgba(124,58,237,.95)':'rgba(14,165,233,.7)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.shadowBlur=this.boosting?24:12;ctx.shadowColor=this.boosting?'#8b5cf6':'#38bdf8';for(const x of [-7,7]){ctx.beginPath();ctx.moveTo(x-3,11);ctx.lineTo(x,flame+12);ctx.lineTo(x+3,11);ctx.closePath();ctx.fill()}ctx.shadowBlur=0}
  if(this.shield>0){const sg=ctx.createRadialGradient(0,0,18,0,0,32);sg.addColorStop(0,'transparent');sg.addColorStop(.72,'rgba(34,211,238,.02)');sg.addColorStop(1,'rgba(103,232,249,.32)');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(0,0,32,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(103,232,249,.48)';ctx.stroke()}
  ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(4,8,20,28,0,0,Math.PI*2);ctx.fill();
  const hull=ctx.createLinearGradient(-16,-22,16,18);hull.addColorStop(0,'#dff8ff');hull.addColorStop(.22,this.invulnerable>0?'#fff':'#61b9e8');hull.addColorStop(.55,'#24628f');hull.addColorStop(1,'#091728');ctx.fillStyle=hull;ctx.strokeStyle='#d9f4ff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-29);ctx.lineTo(11,-12);ctx.lineTo(18,15);ctx.lineTo(8,11);ctx.lineTo(4,22);ctx.lineTo(-4,22);ctx.lineTo(-8,11);ctx.lineTo(-18,15);ctx.lineTo(-11,-12);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#10273d';ctx.strokeStyle='#4fa7d1';for(const x of [-14,14]){ctx.beginPath();ctx.moveTo(x,-7);ctx.lineTo(x+(x<0?-8:8),12);ctx.lineTo(x+(x<0?2:-2),9);ctx.closePath();ctx.fill();ctx.stroke()}
  const glass=ctx.createRadialGradient(-2,-12,1,0,-10,9);glass.addColorStop(0,'#f0fdff');glass.addColorStop(.35,'#38bdf8');glass.addColorStop(1,'#082f49');ctx.fillStyle=glass;ctx.beginPath();ctx.ellipse(0,-11,6,10,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#a5f3fc';ctx.stroke();
  ctx.fillStyle='#fbbf24';ctx.shadowBlur=7;ctx.shadowColor='#fbbf24';ctx.fillRect(-13,8,3,3);ctx.fillRect(10,8,3,3);ctx.shadowBlur=0;ctx.restore()}
}
