export const EXPLORER_OPTIONS=Object.freeze({
 suitType:['Explorer','Engineer','Salvager','Pilot'],
 suitColor:['Azure','White','Orange','Green','Red','Violet','Graphite'],
 helmetStyle:['Standard','Compact','Reinforced','Surveyor'],
 visorColor:['Cyan','Gold','Blue','Violet','Dark'],
 backpack:['Compact','Utility','Repair','Survey'],
 accentColor:['White','Cyan','Orange','Green','Red']
});
export const DEFAULT_EXPLORER=Object.freeze({suitType:'Explorer',suitColor:'Azure',helmetStyle:'Standard',visorColor:'Cyan',backpack:'Utility',accentColor:'White'});
export const COLORS=Object.freeze({Azure:'#2388d1',White:'#dbeafe',Orange:'#ea7b24',Green:'#2fa36b',Red:'#c94452',Violet:'#7c5bd6',Graphite:'#334155',Cyan:'#22d3ee',Gold:'#fbbf24',Blue:'#3b82f6',Dark:'#172033'});
export function normalizeExplorer(value={}){const out={};for(const [key,values] of Object.entries(EXPLORER_OPTIONS))out[key]=values.includes(value[key])?value[key]:DEFAULT_EXPLORER[key];return out}
export function randomExplorer(random=Math.random){const out={};for(const [key,values] of Object.entries(EXPLORER_OPTIONS))out[key]=values[Math.floor(random()*values.length)%values.length];return out}
