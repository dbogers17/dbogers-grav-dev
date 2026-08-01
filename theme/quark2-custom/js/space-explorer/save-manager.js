const KEY='secretLabSpaceSaveV1';
const defaults={version:1,pilotName:'Pilot',galaxy:'azure-reach',ship:'kestrel',x:0,y:0,shield:100,hull:100,credits:0,discovered:['azure-reach'],quests:{main:'broken-signal',side:[]},settings:{graphics:'auto',master:.8,effects:.8,music:.6}};
export function loadSave(){try{return{...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return structuredClone(defaults)}}
export function saveGame(data){localStorage.setItem(KEY,JSON.stringify({...data,savedAt:Date.now()}));document.cookie='sl_save=1;path=/;max-age=31536000;SameSite=Lax'}
export function deleteSave(){localStorage.removeItem(KEY)}
