'use client';
import Image from 'next/image';
import { useState } from 'react';
import { cx } from '@/lib/utils';
import type { ImageAsset } from '@/lib/types';
export function Photo({image,className='',priority=false,sizes='(max-width: 768px) 100vw, 50vw',parallax=false,caption=false}:{image:ImageAsset;className?:string;priority?:boolean;sizes?:string;parallax?:boolean;caption?:boolean}) {
  const [failed,setFailed]=useState(false);
  return <div className={cx('photo-fallback relative isolate overflow-hidden',className)}>
    <div className={cx('absolute inset-0',parallax&&'md:-inset-y-[8%]')} {...(parallax?{'data-parallax':'image'}:{})}>
      <Image src={failed?'/images/community-placeholder.svg':image.src} alt={failed?'Illustration of people coming together.':image.alt} fill sizes={sizes} priority={priority} className="balanced-photo object-cover" style={{objectPosition:image.position||'50% 50%'}} onError={()=>setFailed(true)}/>
    </div>
    {caption&&<span className="absolute right-3 bottom-3 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] text-white">{failed?'Community illustration':image.stock?'Illustrative stock photography':image.credit||'LOOP community'}</span>}
  </div>;
}
