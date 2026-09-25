/** Local editorial tooling only. Never expose the Pexels API key to a browser. */
import { mkdir, writeFile } from 'node:fs/promises';
const apiKey=process.env.PEXELS_API_KEY;
if(!apiKey){console.error('Set PEXELS_API_KEY in the root .env file.');process.exit(1);}
const query=process.argv.slice(2).join(' ')||'community volunteers together natural light';
const url=new URL('https://api.pexels.com/v1/search');
url.search=new URLSearchParams({query,per_page:'24',orientation:'landscape'}).toString();
try{
  const response=await fetch(url,{headers:{Authorization:apiKey},signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error(`Pexels returned ${response.status}; check the key and account quota.`);
  const result=await response.json();
  const choices=(result.photos||[]).map(p=>({id:p.id,photographer:p.photographer,creditUrl:p.url,alt:p.alt,preview:p.src?.medium,download:p.src?.large2x}));
  await mkdir('media-review',{recursive:true});
  await writeFile('media-review/pexels-results.json',JSON.stringify({query,reviewRequired:true,photos:choices},null,2)+'\n');
  console.log(`Saved ${choices.length} candidate records to media-review/pexels-results.json. Review imagery and rights before selecting. No website images were changed.`);
}catch(error){console.error(error instanceof Error?error.message:'Search failed.');process.exitCode=1;}
