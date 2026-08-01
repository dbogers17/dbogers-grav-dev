export const VERSION='0.10.2';
export const STATES=Object.freeze({START:'start',SLOTS:'slots',CREATE:'create',FLIGHT:'flight',MENU:'menu',MAP:'map',SETTINGS:'settings',DIALOG:'dialog',DOCKED:'docked'});
export const TRANSITIONS={start:['slots','create','settings'],slots:['start','create','flight'],create:['start','slots','flight'],flight:['menu','map','dialog','docked'],menu:['flight','map','settings','slots'],map:['flight','menu'],settings:['start','menu','flight'],dialog:['flight'],docked:['flight','menu']};
export const SPAWN=Object.freeze({x:245,y:30});
