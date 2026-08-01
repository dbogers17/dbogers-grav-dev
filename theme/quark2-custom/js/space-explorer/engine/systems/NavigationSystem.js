export class NavigationSystem{
 constructor(save={}){this.destination=save.destination||null}
 set(target){this.destination=target?{id:target.id,name:target.name,x:target.x,y:target.y,threat:target.threat||'Low'}:null}
 clear(){this.destination=null}
 info(ship){if(!this.destination)return null;const dx=this.destination.x-ship.x,dy=this.destination.y-ship.y,distance=Math.hypot(dx,dy),bearing=(Math.atan2(dy,dx)*180/Math.PI+90+360)%360,speed=Math.max(1,Math.hypot(ship.vx,ship.vy));return{...this.destination,distance,bearing,eta:distance/speed,dx,dy}}
 serialize(){return{destination:this.destination}}
}
