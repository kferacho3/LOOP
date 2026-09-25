/** Cache chosen public photos locally. No dynamic Pexels calls on page requests. */
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=process.cwd();
const catalog=JSON.parse(await readFile(resolve(root,'src/content/media-catalog.json'),'utf8'));
const overridesPath=resolve(root,'src/content/media-overrides.json');
const overrides=JSON.parse(await readFile(overridesPath,'utf8'));
const args=process.argv.slice(2);const keyIndex=args.indexOf('--key');const idIndex=args.indexOf('--id');
const selectedKey=keyIndex>=0?args[keyIndex+1]:undefined;
if(selectedKey&&!Object.hasOwn(catalog,selectedKey)){console.error('Unknown image key. Use '+Object.keys(catalog).join(', '));process.exit(1);}
if(idIndex>=0){
  const id=args[idIndex+1];
  if(!selectedKey||!/^\d+$/.test(id||'')||!process.env.PEXELS_API_KEY){console.error('Usage: npm run media:download -- --key hero --id PHOTO_ID (requires PEXELS_API_KEY).');process.exit(1);}
  const response=await fetch(`https://api.pexels.com/v1/photos/${id}`,{headers:{Authorization:process.env.PEXELS_API_KEY},signal:AbortSignal.timeout(20000)});
  if(!response.ok){console.error(`Pexels metadata request failed (${response.status}).`);process.exit(1);}
  const photo=await response.json();
  catalog[selectedKey]={src:photo.src.large2x,alt:photo.alt||'Illustrative community photograph.',credit:`${photo.photographer} / Pexels`,creditUrl:photo.url,stock:true,position:'50% 50%'};
}
await mkdir(resolve(root,'public/images'),{recursive:true});
let failed=0;
for(const key of selectedKey?[selectedKey]:Object.keys(catalog)){
  try{
    const image=catalog[key];const url=new URL(image.src);
    if(url.protocol!=='https:'||!['images.pexels.com','images.unsplash.com'].includes(url.hostname))throw new Error('Unapproved image source');
    url.searchParams.set('fm','jpg');url.searchParams.set('w',key==='hero'?'1800':'1200');
    const response=await fetch(url,{signal:AbortSignal.timeout(30000),redirect:'error'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const type=(response.headers.get('content-type')||'').split(';')[0];
    const extensions={'image/jpeg':'jpg','image/webp':'webp','image/avif':'avif','image/png':'png'};
    if(!extensions[type])throw new Error('Unsupported image type');
    if(Number(response.headers.get('content-length')||0)>15_000_000)throw new Error('Image too large');
    const buffer=Buffer.from(await response.arrayBuffer());if(buffer.length>15_000_000)throw new Error('Image too large');
    const name=`${key}.${extensions[type]}`;await writeFile(resolve(root,'public/images',name),buffer);
    overrides[key]={...image,src:`/images/${name}`};console.log(`Cached ${key}. Review alt text, crop and image permission before publishing.`);
  }catch(error){failed++;console.error(`${key}: ${error instanceof Error?error.message:'Download failed'}`);}
}
await writeFile(overridesPath+'.tmp',JSON.stringify(overrides,null,2)+'\n');await rename(overridesPath+'.tmp',overridesPath);
if(failed)process.exitCode=1;
