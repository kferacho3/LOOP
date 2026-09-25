'use client';
import Link from 'next/link';
import { useId,useRef,useState } from 'react';
import { ArrowRight,Check,LoaderCircle,ShieldCheck } from 'lucide-react';
import { Turnstile } from './turnstile';
import { supportTypes,volunteerAreas,partnerTypes,validateSubmission,type FormKind } from '@/lib/validation';
import { cx } from '@/lib/utils';
export function InquiryForm({kind,ready=false,initialSelection='',compact=false}:{kind:FormKind;ready?:boolean;initialSelection?:string;compact?:boolean}) {
  const id=useId(),formRef=useRef<HTMLFormElement>(null),summaryRef=useRef<HTMLDivElement>(null);
  const [selections,setSelections]=useState<string[]>(initialSelection?[initialSelection]:[]);
  const [method,setMethod]=useState('email');const [errors,setErrors]=useState<Record<string,string>>({});
  const [pending,setPending]=useState(false),[success,setSuccess]=useState(''),[notice,setNotice]=useState('');
  const [token,setToken]=useState(''),[resetKey,setResetKey]=useState(0);const requestId=useRef('');
  const newsletter=kind==='newsletter';
  const options=kind==='support'?supportTypes:kind==='volunteer'?volunteerAreas:[];
  const labels={support:'Send support request',volunteer:'Send volunteer interest',partner:'Send partnership inquiry',contact:'Send message',newsletter:'Request email updates'};
  const error=(name:string)=>errors[name]?<p id={`${id}-${name}-error`} className="mt-2 text-sm text-clay">{errors[name]}</p>:null;
  const fieldProps=(name:string)=>({id:`${id}-${name}`,name,'aria-invalid':!!errors[name],'aria-describedby':errors[name]?`${id}-${name}-error`:undefined});
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();if(pending)return;
    const values=Object.fromEntries(new FormData(event.currentTarget));
    if(!requestId.current)requestId.current=crypto.randomUUID();
    const body={...values,kind,contactMethod:newsletter?'email':method,selections,consent:values.consent==='on',turnstileToken:token,requestId:requestId.current};
    const validated=validateSubmission(body);
    if(!validated.ok){setErrors(validated.errors);setNotice('Please check the highlighted fields.');requestAnimationFrame(()=>summaryRef.current?.focus());return;}
    setErrors({});setNotice('');setPending(true);
    try{
      const response=await fetch('/api/forms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
      const result=await response.json() as {message?:string;errors?:Record<string,string>};
      if(!response.ok){setErrors(result.errors||{});setNotice(result.message||'We could not confirm delivery. Please try again.');}
      else{setSuccess(result.message||'Your request was accepted for sending.');formRef.current?.reset();setSelections([]);requestId.current='';}
    }catch{setNotice('We could not confirm delivery. Please check your connection and try again. Your information is still in this form.');}
    finally{setPending(false);setResetKey(k=>k+1);requestAnimationFrame(()=>summaryRef.current?.focus());}
  }
  if(success)return <div ref={summaryRef} tabIndex={-1} role="status" className="rounded-2xl border border-moss bg-moss/20 p-7"><Check className="mb-4" size={28} aria-hidden/><h3 className="text-xl font-bold">Thank you for reaching out.</h3><p className="mt-3 text-sm leading-6">{success}</p><button type="button" onClick={()=>setSuccess('')} className="mt-5 min-h-11 text-sm underline underline-offset-4">Send another request</button></div>;
  return <form ref={formRef} onSubmit={submit} noValidate className={cx('space-y-6',compact&&'max-w-lg')} aria-label={labels[kind]}>
    <noscript><p className="rounded-xl border border-line p-4 text-sm">JavaScript is needed to verify and send this online form. Please use the direct contact options on the contact page instead.</p></noscript>
    {notice&&<div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-clay/30 bg-peach/30 p-4 text-sm leading-6">{notice}{Object.keys(errors).length>0&&<ul className="mt-2 list-inside list-disc">{Object.entries(errors).filter(([key])=>key!=='form').map(([key,value])=><li key={key}><a className="underline" href={`#${id}-${key}`}>{value}</a></li>)}</ul>}</div>}
    {options.length>0&&<fieldset id={`${id}-selections`} aria-describedby={errors.selections?`${id}-selections-error`:undefined}><legend className="mb-4 text-base font-semibold">{kind==='support'?'What support are you looking for?':'Where would you like to get involved?'} <span className="font-normal text-muted">Select any.</span></legend><div className="grid gap-2 sm:grid-cols-2">{options.map(option=><label key={option} className={cx('liquid flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm hover:border-forest',selections.includes(option)?'border-forest bg-moss/25':'border-line bg-white/60')}><input type="checkbox" checked={selections.includes(option)} onChange={()=>setSelections(current=>current.includes(option)?current.filter(v=>v!==option):[...current,option])} className="size-4 shrink-0 accent-forest"/>{option}</label>)}</div>{error('selections')}</fieldset>}
    {!newsletter&&<div><label className="form-label" htmlFor={`${id}-name`}>Name <span className="font-normal text-muted">(required; the name you use)</span></label><input {...fieldProps('name')} autoComplete="name" maxLength={80} className="field" required/>{error('name')}</div>}
    {kind==='partner'&&<div className="grid gap-5 sm:grid-cols-2"><div><label className="form-label" htmlFor={`${id}-organization`}>Organization (required)</label><input {...fieldProps('organization')} autoComplete="organization" maxLength={120} required className="field"/>{error('organization')}</div><div><label className="form-label" htmlFor={`${id}-organizationType`}>Organization type (required)</label><select {...fieldProps('organizationType')} defaultValue="" className="field" required><option value="">Please select</option>{partnerTypes.map(o=><option key={o}>{o}</option>)}</select>{error('organizationType')}</div></div>}
    {!newsletter&&<fieldset><legend className="form-label">How is it safe to contact you? (required)</legend><div className="flex gap-6">{['email','phone'].map(m=><label className="flex min-h-11 items-center gap-2 text-sm capitalize" key={m}><input type="radio" name="contactMethod" value={m} checked={method===m} onChange={()=>setMethod(m)} className="accent-forest"/>{m}</label>)}</div><p className="mt-1 text-xs leading-5 text-muted">We’ll use this method for this request. Please do not share someone else’s contact details without permission.</p></fieldset>}
    <div className={cx('grid gap-5',!newsletter&&'sm:grid-cols-2')}>
      <div><label className="form-label" htmlFor={`${id}-email`}>Email address {newsletter||method==='email'?'(required)':'(optional)'}</label><input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} required={newsletter||method==='email'} className="field" placeholder={newsletter?'you@example.com':undefined}/>{error('email')}</div>
      {!newsletter&&<div><label className="form-label" htmlFor={`${id}-phone`}>Phone number {method==='phone'?'(required)':'(optional)'}</label><input {...fieldProps('phone')} type="tel" autoComplete="tel" maxLength={32} required={method==='phone'} className="field"/>{error('phone')}</div>}
    </div>
    {kind==='support'&&<div className="grid grid-cols-2 gap-5"><div><label className="form-label" htmlFor={`${id}-city`}>City (optional)</label><input {...fieldProps('city')} autoComplete="address-level2" maxLength={80} className="field"/>{error('city')}</div><div><label className="form-label" htmlFor={`${id}-state`}>State (optional)</label><input {...fieldProps('state')} autoComplete="address-level1" maxLength={60} className="field"/>{error('state')}</div></div>}
    {!newsletter&&<div><label className="form-label" htmlFor={`${id}-message`}>{kind==='partner'?'How would you like to collaborate?':kind==='volunteer'?'Anything you would like us to know?':'A little about what you need'} {kind==='contact'?'(required)':'(optional)'}</label><textarea {...fieldProps('message')} rows={4} maxLength={1000} required={kind==='contact'} className="field resize-y"/>{error('message')}<p className="mt-2 text-xs leading-5 text-muted">A broad description is enough. Do not include Social Security numbers, case numbers, legal documents, medical details, or private information about a child. Maximum 1,000 characters.</p></div>}
    <div className="absolute left-[-9999px] size-px overflow-hidden" aria-hidden><label htmlFor={`${id}-website`}>Leave this field empty</label><input name="website" id={`${id}-website`} tabIndex={-1} autoComplete="off"/></div>
    <div><label className="flex cursor-pointer items-start gap-3 text-xs leading-6"><input {...fieldProps('consent')} type="checkbox" className="mt-1.5 size-4 shrink-0 accent-forest" required/><span>{newsletter?'I would like to receive LOOP email updates. I understand I can ask to unsubscribe.':'LOOP may contact me about this request using my chosen contact method. This does not sign me up for marketing.'} I have read the <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.</span></label>{error('consent')}</div>
    {ready&&<Turnstile onToken={setToken} resetKey={resetKey}/>}
    {!ready&&<p className="rounded-xl border border-line bg-linen/60 px-4 py-3 text-xs leading-6">Online {newsletter?'email signup':'requests'} will open once LOOP’s contact service is connected. This form is not currently monitored and cannot submit. <Link href="/contact" className="font-semibold underline">View contact options.</Link></p>}
    <button type="submit" disabled={!ready||pending} className="liquid inline-flex min-h-13 w-full items-center justify-between gap-4 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper hover:bg-forest disabled:opacity-50">{pending?'Sending…':labels[kind]}{pending?<LoaderCircle className="animate-spin" size={18} aria-hidden/>:<ArrowRight size={18} aria-hidden/>}</button>
    {!newsletter&&<p className="flex gap-2 text-xs leading-5 text-muted"><ShieldCheck className="mt-0.5 shrink-0" size={15} aria-hidden/>Your request is not a guarantee of services. This form is not an emergency service. Contact local emergency services when there is immediate danger.</p>}
  </form>;
}
