import fs from'node:fs';
const ui=fs.readFileSync(new URL('../ui/UIManager.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../../../../css/space-explorer/engine-v09.css',import.meta.url),'utf8');
for(const ship of ['patrol.png','hauler.png','maintenance.png'])if(!ui.includes(ship))throw Error(`missing real start ship ${ship}`);
if(ui.includes('<i></i><i></i><i></i>'))throw Error('legacy abstract start traffic remains');
for(const state of ['state-slots','state-create','state-settings'])if(!css.includes(state))throw Error(`missing cinematic shell for ${state}`);
if(!css.includes('white-space:nowrap'))throw Error('title wrap guard missing');
if(!css.includes('start-background.png'))throw Error('shared background asset missing');
console.log('Menu visual contract tests passed');
