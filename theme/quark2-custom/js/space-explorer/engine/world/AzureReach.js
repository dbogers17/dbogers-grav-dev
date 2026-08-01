function seeded(seed){let v=seed>>>0;return()=>((v=Math.imul(v^v>>>15,1|v),v^=v+Math.imul(v^v>>>7,61|v),((v^v>>>14)>>>0)/4294967296))}
function asteroidField(){const rnd=seeded(41721),out=[];const clusters=[[-1500,850,900,52],[-2550,-650,720,35],[1750,1350,650,28],[2750,-1550,540,20]];let id=0;for(const[cx,cy,spread,count]of clusters)for(let i=0;i<count;i++){const a=rnd()*Math.PI*2,d=Math.sqrt(rnd())*spread;out.push({id:`a${id++}`,x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d,r:7+rnd()*30,integrity:35+rnd()*85,depth:.75+rnd()*.5})}return out}
const traffic=[
 {role:'transport',cx:0,cy:0,radius:430,angle:.2,speed:.8,phase:.1,color:'#60a5fa'},
 {role:'transport',cx:0,cy:0,radius:520,angle:2.1,speed:.55,phase:.45,color:'#94a3b8'},
 {role:'patrol',cx:0,cy:0,radius:360,angle:4.2,speed:1.1,phase:.7,color:'#38bdf8'},
 {role:'miner',cx:-1500,cy:850,radius:310,angle:1.5,speed:.45,phase:.2,color:'#fbbf24'},
 {role:'vendor',cx:430,cy:-180,radius:290,angle:3.2,speed:.35,phase:.85,color:'#34d399'}
];
export const AzureReach={id:'azure-reach',name:'Azure Reach',subtitle:'The calm frontier',size:7200,background:['#01030b','#062651','#0a3c73'],planet:{x:-900,y:-500,r:310,name:'Neris'},asteroids:asteroidField(),traffic,locations:[{id:'helix',name:'Helix Station',x:0,y:0,type:'station',radius:150,dockRadius:300,shield:500,maxShield:500,hull:1000,maxHull:1000},{id:'relay',name:'Azure Relay',x:640,y:-260,type:'outpost'},{id:'mining',name:'Cobalt Mining Post',x:-1410,y:720,type:'outpost'},{id:'beacon',name:'Broken Beacon',x:1550,y:-980,type:'quest'},{id:'cobalt',name:'Cobalt Field',x:-1500,y:850,type:'field'},{id:'gate',name:'North Gate',x:2350,y:-1750,type:'gate'}]};
