import { Eyebrow } from './ui';
import { Photo } from './photo';
import type { ImageAsset } from '@/lib/types';
export function PageIntro({eyebrow,title,emphasis,description,image}:{eyebrow:string;title:string;emphasis:string;description:string;image?:ImageAsset}) {return <section className="shell py-16 md:py-24"><div className={`grid items-center gap-10 ${image?'lg:grid-cols-[1.15fr_1fr]':''}`}><div><Eyebrow>{eyebrow}</Eyebrow><h1 className="display max-w-5xl">{title}<br/><span className="font-serif text-[1.16em] italic text-clay">{emphasis}</span></h1><p className="mt-8 max-w-xl text-base leading-8 text-muted">{description}</p></div>{image&&<Photo image={image} priority caption parallax className="h-[300px] rounded-[28px] md:h-[430px] lg:rounded-t-[180px]"/>}</div></section>;}
