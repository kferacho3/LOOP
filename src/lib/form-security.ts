import 'server-only';
import { createHmac } from 'node:crypto';
/** Atomic, shared, expiring counter. No raw IP addresses or form contents are stored. */
export async function rateLimit(ip:string):Promise<boolean> {
  const url=process.env.UPSTASH_REDIS_REST_URL, token=process.env.UPSTASH_REDIS_REST_TOKEN, salt=process.env.RATE_LIMIT_SALT;
  if(!url||!token||!salt) return process.env.NODE_ENV!=='production';
  const digest=createHmac('sha256',salt).update(ip).digest('hex');
  const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n";
  const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',script,1,`loop:forms:${digest}`,600]),cache:'no-store',signal:AbortSignal.timeout(4000)});
  if(!response.ok) throw new Error('Rate limiter unavailable');
  const data:unknown=await response.json();
  if(!data||typeof data!=='object'||!('result'in data)||typeof data.result!=='number') throw new Error('Invalid rate limit response');
  return data.result<=6;
}
export async function verifyTurnstile(token:string,hosts:string[]):Promise<boolean> {
  const secret=process.env.TURNSTILE_SECRET_KEY;
  if(!secret) return process.env.NODE_ENV!=='production';
  if(!token) return false;
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,response:token}),cache:'no-store',signal:AbortSignal.timeout(5000)});
  if(!response.ok) return false;
  const data=await response.json() as {success?:boolean;hostname?:string;action?:string};
  return data.success===true&&data.action==='loop_form'&&!!data.hostname&&hosts.includes(data.hostname);
}
export async function readJsonBody(request:Request,maxBytes=16384):Promise<unknown> {
  if(Number(request.headers.get('content-length'))>maxBytes) throw new Error('BODY_TOO_LARGE');
  const reader=request.body?.getReader(); if(!reader) throw new Error('EMPTY_BODY');
  let total=0,body='';const decoder=new TextDecoder();
  try {
    while(true){const {value,done}=await reader.read();if(done)break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();throw new Error('BODY_TOO_LARGE');}body+=decoder.decode(value,{stream:true});}
    body+=decoder.decode();return JSON.parse(body);
  } finally { reader.releaseLock(); }
}
