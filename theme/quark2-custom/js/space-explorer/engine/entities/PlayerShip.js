const wrap=(a)=>Math.atan2(Math.sin(a),Math.cos(a));
export class PlayerShip{
 constructor(save){Object.assign(this,{x:save.x,y:save.y,vx:0,vy:0,angle:-Math.PI/2,maxSpeed:520,reverseSpeed:150,thrust:560,reverseThrust:260,turnSpeed:3.8,drag:.72,lateralDamping:3.4,color:save.shipColor})}
 update(dt,input,pointer,w,h,camera){
  const axis=input.axis();
  const screen=camera.worldToScreen(this.x,this.y,w,h,1);
  const mouseAngle=Math.atan2(pointer.y-screen.y,pointer.x-screen.x);
  const mouseDistance=Math.hypot(pointer.x-screen.x,pointer.y-screen.y);
  if(mouseDistance>45){const delta=wrap(mouseAngle-this.angle);this.angle+=Math.max(-this.turnSpeed*dt,Math.min(this.turnSpeed*dt,delta));}
  if(axis.x){this.angle+=axis.x*this.turnSpeed*.72*dt;}
  const fx=Math.cos(this.angle),fy=Math.sin(this.angle),rx=-fy,ry=fx;
  const forward=this.vx*fx+this.vy*fy,lateral=this.vx*rx+this.vy*ry;
  let nextForward=forward;
  if(axis.y<0)nextForward+=this.thrust*dt;
  if(axis.y>0){if(nextForward>30)nextForward*=Math.exp(-4.8*dt);else nextForward-=this.reverseThrust*dt;}
  nextForward*=Math.exp(-this.drag*dt);
  const nextLateral=lateral*Math.exp(-this.lateralDamping*dt);
  nextForward=Math.max(-this.reverseSpeed,Math.min(this.maxSpeed,nextForward));
  this.vx=fx*nextForward+rx*nextLateral;this.vy=fy*nextForward+ry*nextLateral;
  this.x+=this.vx*dt;this.y+=this.vy*dt;
 }
 draw(ctx,camera,w,h){
  const p=camera.worldToScreen(this.x,this.y,w,h,1),speed=Math.hypot(this.vx,this.vy);
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(this.angle+Math.PI/2);
  if(speed>20){const flame=18+Math.min(28,speed*.07),g=ctx.createLinearGradient(0,10,0,flame+12);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.28,'rgba(56,189,248,.85)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-5,11);ctx.lineTo(0,flame+12);ctx.lineTo(5,11);ctx.closePath();ctx.fill();}
  ctx.shadowBlur=20;ctx.shadowColor=this.color;ctx.fillStyle=this.color;ctx.strokeStyle='#eefaff';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,-25);ctx.lineTo(14,13);ctx.lineTo(6,9);ctx.lineTo(0,18);ctx.lineTo(-6,9);ctx.lineTo(-14,13);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#e2f7ff';ctx.beginPath();ctx.ellipse(0,-7,4,7,0,0,Math.PI*2);ctx.fill();ctx.restore();
 }
}
