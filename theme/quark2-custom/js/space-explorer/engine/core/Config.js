export const VERSION='0.11.5';
export const STATES=Object.freeze({START:'start',SLOTS:'slots',CREATE:'create',FLIGHT:'flight',MENU:'menu',MAP:'map',SETTINGS:'settings',DIALOG:'dialog',STATION:'station'});
export const TRANSITIONS={start:['slots','create','settings'],slots:['start','create','flight'],create:['start','slots','flight'],flight:['menu','map','dialog','station'],menu:['flight','map','settings','slots'],map:['flight','menu'],settings:['start','menu','flight'],dialog:['flight','station'],station:['flight','dialog','menu']};
export const SPAWN=Object.freeze({x:245,y:30});
