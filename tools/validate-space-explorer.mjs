import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {spawnSync} from 'node:child_process';

const repo=process.cwd();
const engine=path.join(repo,'theme/quark2-custom/js/space-explorer/engine');
const versionFile=path.join(repo,'theme/quark2-custom/data/space-explorer/version.json');
const baseTemplate=path.join(repo,'theme/quark2-custom/templates/partials/base.html.twig');
const failures=[];
const checked=[];

function fail(message){failures.push(message)}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])}

if(!fs.existsSync(engine))fail(`Missing engine directory: ${engine}`);
const files=fs.existsSync(engine)?walk(engine).filter(f=>f.endsWith('.js')||f.endsWith('.mjs')):[];
if(!files.length)fail('No engine JavaScript modules found');

for(const file of files){
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  if(result.status!==0)fail(`Syntax error in ${path.relative(repo,file)}\n${result.stderr.trim()}`);
  else checked.push(path.relative(repo,file));
}

const importPattern=/\b(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g;
for(const file of files){
  const source=fs.readFileSync(file,'utf8');
  for(const match of source.matchAll(importPattern)){
    const spec=match[1];
    if(!spec.startsWith('.'))continue;
    const target=path.resolve(path.dirname(file),spec);
    if(!fs.existsSync(target))fail(`Broken import in ${path.relative(repo,file)}: ${spec}`);
  }
}

let version;
try{version=JSON.parse(fs.readFileSync(versionFile,'utf8'))}catch(error){fail(`Invalid version.json: ${error.message}`)}
if(version){
  if(!/^\d+\.\d+\.\d+$/.test(version.version||''))fail(`Invalid semantic version: ${version.version}`);
  const config=fs.readFileSync(path.join(engine,'core/Config.js'),'utf8');
  if(!config.includes(`VERSION='${version.version}'`))fail(`Version mismatch: version.json=${version.version}, Config.js differs`);
  for(const portal of ['mini-game.js','portal-info.js']){
    const file=path.join(repo,'theme/quark2-custom/js/space-explorer',portal);
    if(fs.existsSync(file)&&!fs.readFileSync(file,'utf8').includes(`VERSION='${version.version}'`))fail(`Version mismatch in ${portal}`);
  }
}

if(fs.existsSync(baseTemplate)){
  const twig=fs.readFileSync(baseTemplate,'utf8');
  if(!twig.includes('space-explorer/engine/main.js'))fail('Engine entrypoint missing from base.html.twig');
  for(const legacy of ['full-game.js','ui-controller.js','early-access-ui.js','living-sector.js','release-ui.js']){
    if(twig.includes(`space-explorer/${legacy}`))fail(`Legacy runtime is still registered: ${legacy}`);
  }
}else fail('base.html.twig is missing');

const required=[
 'main.js','core/Config.js','core/GameLoop.js','core/StateMachine.js','core/InputManager.js',
 'entities/PlayerShip.js','systems/SaveSystem.js','systems/RenderSystem.js','systems/CollisionSystem.js',
 'scenes/FlightScene.js','scenes/StationScene.js','ui/UIManager.js','world/AzureReach.js'
];
for(const relative of required)if(!fs.existsSync(path.join(engine,relative)))fail(`Required module missing: ${relative}`);

if(failures.length){
  console.error('\nSPACE EXPLORER VALIDATION FAILED\n');
  failures.forEach((failure,index)=>console.error(`${index+1}. ${failure}\n`));
  process.exit(1);
}
console.log(`Node ${process.versions.node}. Space Explorer validation passed: ${checked.length} JavaScript modules, imports, versions and runtime registration checked.`);
