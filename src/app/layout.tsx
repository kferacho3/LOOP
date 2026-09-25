import type { Metadata,Viewport } from 'next';
import { Manrope,Instrument_Serif } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MotionController } from '@/components/motion';
import { SiteAnalytics } from '@/components/analytics';
import { getSiteContent,getSiteUrl,formsReady,isIndexingEnabled } from '@/lib/content';
import './globals.css';
const body=Manrope({subsets:['latin'],display:'swap',variable:'--font-body'});
const editorial=Instrument_Serif({weight:'400',style:['normal','italic'],subsets:['latin'],display:'swap',variable:'--font-editorial'});
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f6f3ec'};
export const metadata:Metadata={metadataBase:new URL(getSiteUrl()),title:{default:'LOOP — Possibility, within reach.',template:'%s | LOOP'},description:'Liberation of Oppressed People. Support for youth, families, and justice-impacted individuals through housing, reentry, education, transportation, and community resources.',robots:isIndexingEnabled()?{index:true,follow:true}:{index:false,follow:false},openGraph:{type:'website',siteName:'LOOP',locale:'en_US'},twitter:{card:'summary_large_image'},icons:{icon:'/brand/favicon.svg',apple:'/brand/apple-touch-icon.png'}};
export default async function RootLayout({children}:{children:React.ReactNode}) {
  const {settings}=await getSiteContent();
  const structured={ '@context':'https://schema.org','@type':'Organization',name:'Liberation of Oppressed People',alternateName:'LOOP',url:getSiteUrl(),description:metadata.description};
  return <html lang="en" className={`${body.variable} ${editorial.variable}`}><body className="font-sans"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><Header announcement={settings.announcement}/><main id="main" tabIndex={-1}>{children}</main><Footer settings={settings} ready={formsReady()}/><MotionController/><SiteAnalytics/></body></html>;
}
