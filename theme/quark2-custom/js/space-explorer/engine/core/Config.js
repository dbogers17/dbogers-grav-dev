export const VERSION='0.9.1';
export const STATES=Object.freeze({START:'start',FLIGHT:'flight',MENU:'menu',MAP:'map',SETTINGS:'settings',DIALOG:'dialog'});
export const TRANSITIONS={start:['flight','settings'],flight:['menu','map','dialog'],menu:['flight','map','settings'],map:['flight','menu'],settings:['start','menu','flight'],dialog:['flight']};
