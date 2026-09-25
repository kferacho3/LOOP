import { NextResponse } from 'next/server';
import { validateSubmission } from '@/lib/validation';
import { formsReady, getSiteUrl } from '@/lib/content';
import { rateLimit,readJsonBody,verifyTurnstile } from '@/lib/form-security';
export const runtime='nodejs';
export const maxDuration=25;
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request) {
  const requestOrigin=new URL(request.url).origin;
  const allowedOrigins=[getSiteUrl(),requestOrigin];
  if(!request.headers.get('origin')||!allowedOrigins.includes(request.headers.get('origin')!)) return reply({message:'This request could not be verified.'},403);
  if(!request.headers.get('content-type')?.includes('application/json')) return reply({message:'Please use the website form.'},415);
  let raw:unknown;
  try{raw=await readJsonBody(request);}catch(error){return reply({message:error instanceof Error&&error.message==='BODY_TOO_LARGE'?'This request is too large.':'Please review your request.'},error instanceof Error&&error.message==='BODY_TOO_LARGE'?413:400);}
  const result=validateSubmission(raw);
  if(!result.ok) return reply({message:'Please check the highlighted fields.',errors:result.errors},400);
  if(!formsReady()) return reply({message:'Online requests are not yet available. Nothing has been submitted. Please use an approved contact option on the Contact page.'},503);
  const data=result.data;
  try {
    const ip=request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'local';
    if(!await rateLimit(ip)) return reply({message:'Please wait a few minutes before trying again.'},429);
    const hosts=allowedOrigins.map(origin=>new URL(origin).hostname);
    if(process.env.VERCEL_URL) hosts.push(process.env.VERCEL_URL);
    if(!await verifyTurnstile(data.turnstileToken,hosts)) return reply({message:'Please complete the security check again.'},403);
    const labels={support:'Support request',volunteer:'Volunteer interest',partner:'Partnership inquiry',contact:'Contact message',newsletter:'Email updates request'};
    const text=[`LOOP • ${labels[data.kind]}`,`Reference: ${data.requestId}`,`Name: ${data.name||'Not provided'}`,`Preferred contact: ${data.contactMethod}`,`Email: ${data.email||'Not provided'}`,`Phone: ${data.phone||'Not provided'}`,`City / state: ${[data.city,data.state].filter(Boolean).join(', ')||'Not provided'}`,`Interests: ${data.selections.join(', ')||'Not applicable'}`,`Organization: ${data.organization||'Not applicable'}`,`Organization type: ${data.organizationType||'Not applicable'}`,'',data.message||'No additional message.','',data.kind==='newsletter'?'Explicit consent: requests email updates. Add to the approved mailing workflow; retain consent and honor unsubscribe requests.':'Explicit consent: contact only about this request. This is not newsletter consent.','Do not reply via another channel without permission. Do not forward to external partners without separate permission.'].join('\n');
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`loop-${data.requestId}`},body:JSON.stringify({from:process.env.FORM_FROM_EMAIL,to:[process.env.FORM_TO_EMAIL],subject:`LOOP | ${labels[data.kind]}`,text,...(data.email?{reply_to:data.email}:{})}),cache:'no-store',signal:AbortSignal.timeout(10000)});
    if(!response.ok) return reply({message:'We could not deliver your request. Your information is still in the form; please try again later.'},502);
    return reply({message:data.kind==='newsletter'?'Your request for email updates has been accepted for sending to LOOP.':'Your request has been accepted for sending to LOOP. Your chosen contact method is included. This does not confirm a service or an appointment.',reference:data.requestId});
  }catch{return reply({message:'We could not confirm delivery. Please try again later using this same form.'},503);}
}
