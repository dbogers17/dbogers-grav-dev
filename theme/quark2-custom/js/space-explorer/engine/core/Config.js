export const VERSION='0.9.2';
export const STATES=Object.freeze({START:'start',SLOTS:'slots',CREATE:'create',FLIGHT:'flight',MENU:'menu',MAP:'map',SETTINGS:'settings',DIALOG:'dialog'});
export const TRANSITIONS={start:['slots','settings'],slots:['start','create','flight'],create:['slots','flight'],flight:['menu','map','dialog'],menu:['flight','map','settings','slots'],map:['flight','menu'],settings:['start','menu','flight'],dialog:['flight']};
