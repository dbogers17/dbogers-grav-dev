export const ITEMS=Object.freeze({
 scrap:{name:'Scrap',sell:8,buy:14,unit:1},iron:{name:'Iron Ore',sell:12,buy:19,unit:1},cobalt:{name:'Cobalt Ore',sell:28,buy:42,unit:1},electronics:{name:'Electronics',sell:46,buy:68,unit:1},fuel:{name:'Fuel Cells',sell:18,buy:28,unit:1},components:{name:'Salvaged Components',sell:75,buy:110,unit:2}
});
export const UPGRADES=Object.freeze({engine1:{name:'Helix Vector Thrusters',price:650,description:'+8% acceleration'},cargo1:{name:'Expanded Cargo Rack',price:500,description:'+12 cargo capacity'},shield1:{name:'Shield Relay Mk I',price:800,description:'+15 maximum shield'}});
export const MISSIONS=Object.freeze({
 brokenSignal:{id:'brokenSignal',title:'The Broken Signal',type:'story',steps:['Talk to Mission Control','Set Broken Beacon as destination','Reach the beacon','Scan the signal','Recover the data core','Return to Helix Station'],reward:1200},
 cobaltRun:{id:'cobaltRun',title:'Cobalt Run',type:'contract',steps:['Collect 6 Cobalt Ore','Return to Helix Station'],reward:420},
 salvageSweep:{id:'salvageSweep',title:'Salvage Sweep',type:'contract',steps:['Recover 4 Scrap','Return to Helix Station'],reward:260}
});
