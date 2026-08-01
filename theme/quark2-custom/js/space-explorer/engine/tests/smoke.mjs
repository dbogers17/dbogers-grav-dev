import assert from 'node:assert/strict';
import {StateMachine} from '../core/StateMachine.js';
import {STATES,TRANSITIONS} from '../core/Config.js';
import {SaveSystem} from '../systems/SaveSystem.js';

globalThis.localStorage={
  data:new Map(),
  getItem(key){return this.data.has(key)?this.data.get(key):null},
  setItem(key,value){this.data.set(key,String(value))},
  removeItem(key){this.data.delete(key)}
};

if(!globalThis.crypto){
  const cryptoModule=await import('node:crypto');
  globalThis.crypto=cryptoModule.webcrypto;
}

const state=new StateMachine(STATES.START,TRANSITIONS);
assert.equal(state.set(STATES.CREATE),true);
assert.equal(state.set(STATES.FLIGHT),true);
assert.equal(state.set(STATES.STATION),true);
assert.equal(state.set(STATES.MAP),false);
assert.equal(state.set(STATES.FLIGHT),true);
assert.equal(state.set(STATES.MAP),true);
assert.equal(state.set(STATES.FLIGHT),true);

const saves=new SaveSystem();
const save=saves.create('Test Pilot');
assert.equal(save.explorerName,'Test Pilot');
assert.ok(save.recoveryCode);
assert.equal(saves.list().length,1);
assert.throws(()=>saves.create('test pilot'));
console.log('Space Explorer smoke tests passed');
