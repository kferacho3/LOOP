'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { Waves, Pause } from 'lucide-react';
/** One lazy GSAP owner, native scroll, bounded transforms, complete route cleanup.
 * No animation gates readable content, a click, or a support request.
 */
function subscribe(callback:()=>void) {
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change',callback);
  window.addEventListener('storage',callback);
  window.addEventListener('loop-motion-change',callback);
  return()=>{preference.removeEventListener('change',callback);window.removeEventListener('storage',callback);window.removeEventListener('loop-motion-change',callback);};
}
function snapshot(): 'system'|'calm'|'full' {
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return 'system';
  try{return localStorage.getItem('loop-motion')==='calm'?'calm':'full';}catch{return 'full';}
}
export function MotionController() {
  const pathname=usePathname();
  const preference=useSyncExternalStore(subscribe,snapshot,()=> 'full' as const);
  const calm=preference!=='full';
  useEffect(()=>{document.documentElement.dataset.motion=calm?'calm':'full';},[calm]);
  useEffect(()=>{
    let disposed=false; let teardown:(()=>void)|undefined;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
    if(calm||reduced||connection?.saveData) return;
    // Only editorial pages get scroll motion. Forms remain completely stable.
    if(['/get-help','/contact','/volunteer','/partner','/privacy'].includes(pathname)) return;
    void Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
      if(disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm=gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el=>{
          gsap.fromTo(el,{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:.6}});
        });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
          // Never hide an already visible element when the animation chunk arrives.
          if(el.getBoundingClientRect().top<window.innerHeight*.88) return;
          gsap.from(el,{y:24,opacity:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'all'});
        });
        gsap.utils.toArray<HTMLElement>('[data-orbit]').forEach(el=>{
          gsap.fromTo(el,{rotation:-8},{rotation:7,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:1}});
        });
      });
      teardown=()=>mm.revert();
    }).catch(()=>{ /* Static document is the full experience, not an error state. */ });
    return()=>{disposed=true;teardown?.();};
  },[pathname,calm]);
  function toggle(){try{localStorage.setItem('loop-motion',calm?'full':'calm');window.dispatchEvent(new Event('loop-motion-change'));}catch{/* OS preference still applies if storage is blocked. */}}
  return <button data-motion-control disabled={preference==='system'} onClick={toggle} type="button" aria-pressed={calm} aria-label={preference==='system'?'Motion reduced by your device preference':calm?'Enable optional page motion':'Reduce page motion'} className="liquid fixed right-4 bottom-4 z-40 hidden min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-paper/95 px-4 text-[11px] font-semibold text-ink shadow-sm backdrop-blur-md md:flex">{calm?<Pause size={13} aria-hidden/>:<Waves size={15} aria-hidden/>}{preference==='system'?'Device motion preference':calm?'Motion reduced':'Calm the motion'}</button>;
}
