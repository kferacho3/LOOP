'use client';
import Script from 'next/script';
import { useEffect,useRef,useState } from 'react';
type TurnstileAPI={render:(el:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void};
declare global {interface Window{turnstile?:TurnstileAPI}}
export function Turnstile({onToken,resetKey}:{onToken:(token:string)=>void;resetKey:number}) {
  const ref=useRef<HTMLDivElement>(null);const [loaded,setLoaded]=useState(false);const callback=useRef(onToken);
  useEffect(()=>{callback.current=onToken;},[onToken]);
  const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(()=>{
    if(!loaded||!siteKey||!ref.current||!window.turnstile)return;
    const api=window.turnstile;
    const id=api.render(ref.current,{sitekey:siteKey,theme:'light',size:'flexible',action:'loop_form',callback:(token:string)=>callback.current(token),'expired-callback':()=>callback.current(''),'error-callback':()=>callback.current('')});
    return()=>{api.remove(id);callback.current('');};
  },[loaded,siteKey,resetKey]);
  if(!siteKey)return null;
  return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setLoaded(true)}/><div ref={ref} className="my-4 min-h-[70px]"/></>;
}
