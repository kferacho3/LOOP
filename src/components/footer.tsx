import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { InquiryForm } from './forms';
import { Eyebrow } from './ui';
import type { SiteSettings } from '@/lib/types';
export function Footer({settings,ready}:{settings:SiteSettings;ready:boolean}) {
  const socials=[['Instagram',settings.instagram],['Facebook',settings.facebook],['LinkedIn',settings.linkedin]].filter((v):v is [string,string]=>!!v[1]);
  return <footer className="overflow-hidden border-t border-line bg-paper pt-20">
    <div className="shell grid gap-14 pb-16 lg:grid-cols-[1.1fr_1fr]">
      <div><Eyebrow>Stay in the LOOP</Eyebrow><h2 className="text-4xl tracking-[-.055em]">Good things are<br/><span className="font-serif text-[1.25em] italic text-clay">better shared.</span></h2><p className="mt-5 mb-7 max-w-sm text-sm leading-6 text-muted">Hear about community events, ways to help, and what’s happening at LOOP.</p><InquiryForm kind="newsletter" compact ready={ready}/></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3"><div><p className="eyebrow mb-5 text-muted">Explore</p>{[['/about','About LOOP'],['/programs','Our programs'],['/events','Events'],['/impact','Our impact']].map(([h,t])=><Link key={h} href={h} className="block py-2.5 text-sm hover:text-clay">{t}</Link>)}</div><div><p className="eyebrow mb-5 text-muted">Take part</p>{[['/get-help','Get support'],['/volunteer','Volunteer'],['/partner','Partner with us'],['/donate','Donate']].map(([h,t])=><Link key={h} href={h} className="block py-2.5 text-sm hover:text-clay">{t}</Link>)}</div><div><p className="eyebrow mb-5 text-muted">Connect</p><Link href="/contact" className="block py-2.5 text-sm hover:text-clay">Contact LOOP</Link>{socials.map(([label,url])=><a href={url} key={label} rel="noopener noreferrer" target="_blank" className="flex items-center gap-2 py-2.5 text-sm hover:text-clay">{label}<ArrowUpRight size={14} aria-hidden/><span className="sr-only"> (opens in a new tab)</span></a>)}</div><p className="col-span-2 mt-5 max-w-md text-sm leading-7 text-muted sm:col-span-3">Liberation of Oppressed People.<br/>Practical support. A shared way forward.</p></div>
    </div>
    <div className="shell border-t border-line pt-8"><div aria-hidden className="footer-wordmark flex justify-between font-bold"><span>L</span><span className="font-serif font-normal italic">OO</span><span>P</span></div></div>
    <div className="shell mt-8 flex flex-col justify-between gap-5 border-t border-line py-7 text-[11px] text-muted sm:flex-row"><p>© {new Date().getFullYear()} Liberation of Oppressed People</p><div className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/credits">Photography & credits</Link></div><span>People first. Always.</span></div>
  </footer>;
}
