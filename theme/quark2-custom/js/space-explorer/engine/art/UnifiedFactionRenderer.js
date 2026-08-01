import{HelixSpriteAtlas,REGIONS}from'./HelixSpriteAtlas.js';
export class UnifiedFactionRenderer{constructor(){this.atlas=new HelixSpriteAtlas();this.fleet=this.atlas.load('fleet','helix-fleet-sheet.png');this.astronauts=this.atlas.load('astronauts','helix-astronaut-sheet.png');this.celestial=this.atlas.load('celestial','helix-celestial-sheet.png');this.interiors=this.atlas.load('interiors','helix-interior-sheet.png')}
 crop(ctx,asset,region,x,y,w,h,angle=0){if(!asset?.ready)return false;const[sx,sy,sw,sh]=region;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(angle);ctx.imageSmoothingEnabled=true;ctx.drawImage(asset.image,sx,sy,sw,sh,-w/2,-h/2,w,h);ctx.restore();return true}
 ship(ctx,role,x,y,angle,size=42){const r=REGIONS.fleet[role]||REGIONS.fleet.patrol,ratio=r[2]/r[3];return this.crop(ctx,this.fleet,r,x,y,size*ratio,size,angle+Math.PI/2)}
 astronaut(ctx,role,x,y,size=70){const r=REGIONS.astronaut[role]||REGIONS.astronaut.explorer;return this.crop(ctx,this.astronauts,r,x,y,size*r[2]/r[3],size,0)}
 planet(ctx,type,x,y,size){const r=REGIONS.celestial[type]||REGIONS.celestial.gas;return this.crop(ctx,this.celestial,r,x,y,size*r[2]/r[3],size,0)}
 dockingBay(ctx,x,y,w,h){return this.crop(ctx,this.interiors,REGIONS.interior.dock,x,y,w,h,0)} }
