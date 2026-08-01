import{ITEMS,MISSIONS,UPGRADES}from'../data/Content.js';
export class ProgressionSystem{
 constructor(save={}){this.credits=Number(save.credits)||500;this.capacity=Number(save.cargoCapacity)||24;this.inventory={scrap:0,iron:0,cobalt:0,electronics:0,fuel:2,components:0,...save.inventory};this.mission={id:'brokenSignal',stage:0,status:'available',...save.mission};this.upgrades={...save.upgrades}}
 used(){return Object.entries(this.inventory).reduce((sum,[id,count])=>sum+(ITEMS[id]?.unit||1)*count,0)}
 add(id,count=1){if(!ITEMS[id]||count<1||this.used()+ITEMS[id].unit*count>this.capacity)return false;this.inventory[id]=(this.inventory[id]||0)+count;return true}
 remove(id,count=1){if((this.inventory[id]||0)<count)return false;this.inventory[id]-=count;return true}
 sell(id,count=1){if(!this.remove(id,count))return false;this.credits+=ITEMS[id].sell*count;return true}
 sellAll(){for(const[id,count]of Object.entries(this.inventory))if(count>0&&id!=='fuel')this.sell(id,count)}
 buy(id,count=1){const cost=(ITEMS[id]?.buy||Infinity)*count;if(this.credits<cost||!this.add(id,count))return false;this.credits-=cost;return true}
 buyUpgrade(id){const u=UPGRADES[id];if(!u||this.upgrades[id]||this.credits<u.price)return false;this.credits-=u.price;this.upgrades[id]=true;if(id==='cargo1')this.capacity+=12;return true}
 acceptMission(id='brokenSignal'){if(!MISSIONS[id])return false;this.mission={id,stage:0,status:'active'};return true}
 advance(){const m=MISSIONS[this.mission.id];if(!m||this.mission.status!=='active')return false;this.mission.stage++;if(this.mission.stage>=m.steps.length){this.mission.status='complete';this.credits+=m.reward}return true}
 currentObjective(){const m=MISSIONS[this.mission.id];return m?.steps[Math.min(this.mission.stage,m.steps.length-1)]||'No active objective'}
 serialize(){return{credits:this.credits,cargoCapacity:this.capacity,inventory:this.inventory,mission:this.mission,upgrades:this.upgrades}}
}
