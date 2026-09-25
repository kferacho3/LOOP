'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect,useRef } from 'react';
import { Menu,X,ArrowUpRight } from 'lucide-react';
import { Logo } from './logo';
import { cx } from '@/lib/utils';
const links=[['/about','About LOOP'],['/programs','Our programs'],['/events','Events'],['/volunteer','Volunteer'],['/partner','Partner with us'],['/contact','Contact']] as const;
export function Header({announcement}:{announcement?:string}) {
  const pathname=usePathname(),dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
  function close(){dialog.current?.close();document.body.style.overflow='';trigger.current?.focus();}
  useEffect(()=>()=>{document.body.style.overflow='';},[]);
  return <>
    <a href="#main" className="fixed top-2 left-4 z-[100] -translate-y-24 rounded-full bg-ink px-6 py-4 text-paper focus:translate-y-0">Skip to content</a>
    {announcement&&<div className="bg-forest px-6 py-2.5 text-center text-xs leading-5 text-paper">{announcement}</div>}
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-xl">
      <div className="shell flex h-[84px] items-center justify-between gap-5">
        <Link href="/" aria-label="LOOP — home"><Logo/></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:flex">{links.slice(0,3).map(([href,label])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} className={cx('liquid min-h-11 content-center text-xs font-semibold hover:text-clay',pathname===href&&'text-clay')}>{label}</Link>)}<details className="group relative" onKeyDown={event=>{if(event.key==='Escape'){event.currentTarget.removeAttribute('open');event.currentTarget.querySelector('summary')?.focus();}}}><summary className="flex min-h-11 list-none items-center gap-2 text-xs font-semibold">Get involved <span aria-hidden>+</span></summary><div className="absolute top-full -left-5 w-52 rounded-2xl border border-line bg-paper p-3 shadow-xl shadow-ink/10">{links.slice(3).map(([href,label])=><Link key={href} href={href} onClick={e=>e.currentTarget.closest('details')?.removeAttribute('open')} className="liquid block rounded-lg px-3 py-3 text-sm hover:bg-linen">{label}</Link>)}</div></details></nav>
        <div className="flex items-center gap-5"><Link href="/donate" className="hidden min-h-11 items-center gap-1 text-xs font-semibold sm:flex">Donate <ArrowUpRight size={15} aria-hidden/></Link><Link href="/get-help" className="liquid inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-xs font-semibold text-paper hover:bg-forest">Get support</Link><button ref={trigger} type="button" aria-label="Open navigation" aria-haspopup="dialog" onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}} className="flex size-11 items-center justify-center xl:hidden"><Menu size={22} aria-hidden/></button></div>
      </div>
    </header>
    <dialog ref={dialog} onClose={()=>{document.body.style.overflow='';}} onCancel={()=>{document.body.style.overflow='';}} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-paper p-6 text-ink backdrop:bg-ink/50" aria-label="Navigation">
      <div className="flex items-center justify-between"><Logo/><button type="button" onClick={close} className="flex size-12 items-center justify-center" aria-label="Close navigation"><X aria-hidden/></button></div><nav aria-label="Mobile navigation" className="mt-10 flex flex-col">{links.map(([href,label],i)=><Link href={href} onClick={close} key={href} aria-current={pathname===href?'page':undefined} className="flex min-h-15 items-center justify-between border-b border-line py-3 text-2xl tracking-[-.035em]"><span><span className="mr-4 text-xs text-muted">0{i+1}</span>{label}</span><ArrowUpRight size={20} aria-hidden/></Link>)}</nav><div className="mt-8 grid grid-cols-2 gap-3"><Link href="/get-help" onClick={close} className="rounded-full bg-ink p-4 text-center text-sm font-semibold text-paper">Get support</Link><Link href="/donate" onClick={close} className="rounded-full border border-ink p-4 text-center text-sm font-semibold">Donate</Link></div><p className="mt-9 text-xs text-muted">Community. Access. Empowerment.</p>
    </dialog>
  </>;
}
