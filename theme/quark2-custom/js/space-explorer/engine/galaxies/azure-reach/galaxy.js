function rng(seed){let a=seed>>>0;return()=>((a=Math.imul(a^a>>>15,1|a),a^=a+Math.imul(a^a>>>7,61|a),((a^a>>>14)>>>0)/4294967296))}
const random=rng(120022),asteroids=[],background=[];const clusters=[[-1550,850,950,54],[-2650,-700,780,38],[1850,1450,720,32],[2850,-1650,650,26]];let n=0;for(const[cx,cy,spread,count]of clusters)for(let i=0;i<count;i++){const a=random()*Math.PI*2,d=Math.sqrt(random())*spread;asteroids.push({id:`rock-${n++}`,x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d,r:8+random()*34,depth:.8+random()*.4})}for(let i=0;i<90;i++)background.push({x:(random()-.5)*8200,y:(random()-.5)*8200,r:2+random()*12,depth:.08+random()*.18});
export const AZURE_REACH={id:'azure-reach',name:'Azure Reach',size:8200,planet:{id:'neris',name:'Neris',x:-1050,y:-620,r:330,type:'planet'},asteroids,background,locations:[
 {id:'helix',name:'Helix Station',x:0,y:0,type:'station',radius:190,dockRadius:340,threat:'Safe'},
 {id:'relay',name:'Azure Relay',x:720,y:-330,type:'outpost',radius:55,threat:'Safe'},
 {id:'mining',name:'Cobalt Mining Post',x:-1420,y:760,type:'outpost',radius:70,threat:'Low'},
 {id:'beacon',name:'Broken Beacon',x:1650,y:-1040,type:'quest',radius:24,threat:'Low'},
 {id:'cobalt',name:'Cobalt Field',x:-1550,y:850,type:'field',radius:850,threat:'Moderate'},
 {id:'gate',name:'North Gate',x:2450,y:-1850,type:'gate',radius:75,threat:'Unknown'}],traffic:[
 {id:'hauler-1',role:'hauler',color:'#94a3b8',route:[[540,-220],[720,-330],[450,-80],[260,80]],speed:72,size:28},
 {id:'hauler-2',role:'hauler',color:'#64748b',route:[[-110,280],[-1420,760],[-500,420],[250,160]],speed:64,size:30},
 {id:'patrol-1',role:'patrol',color:'#3b82f6',route:[[360,0],[100,-360],[-330,-120],[-160,290]],speed:110,size:20},
 {id:'miner-1',role:'miner',color:'#d97706',route:[[-300,180],[-1510,840],[-1720,620],[-480,260]],speed:54,size:26},
 {id:'vendor-1',role:'vendor',color:'#10b981',route:[[240,-160],[720,-330],[110,250],[-120,90]],speed:58,size:24},
 {id:'maintenance-1',role:'maintenance',color:'#f97316',route:[[120,0],[0,-150],[-130,20],[0,160]],speed:45,size:12}
]};
