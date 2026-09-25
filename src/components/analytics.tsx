'use client';
import { Analytics } from '@vercel/analytics/next';
const sensitive=['/get-help','/contact','/volunteer','/partner','/privacy','/newsletter'];
export function SiteAnalytics(){
  if(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS!=='true')return null;
  return <Analytics beforeSend={event=>{if(event.type!=='pageview')return null;try{const url=new URL(event.url);if(sensitive.some(p=>url.pathname.startsWith(p)))return null;url.search='';url.hash='';return {...event,url:url.toString()};}catch{return null;}}}/>;
}
