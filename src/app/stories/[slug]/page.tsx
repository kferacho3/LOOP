import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { PageIntro } from '@/components/page-intro';
import { TextLink } from '@/components/ui';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const {stories}=await getSiteContent();return {title:stories.find(s=>s.slug===slug)?.title||'Community story',alternates:{canonical:`/stories/${slug}`}};}
export default async function Story({params}:Props){const {slug}=await params;const {stories}=await getSiteContent();const story=stories.find(s=>s.slug===slug);if(!story)notFound();return <><PageIntro eyebrow="From the community" title={story.title} emphasis="In our own words." description={story.excerpt} image={story.image}/><article className="shell pb-24"><div className="mx-auto max-w-3xl">{story.body.split('\n\n').filter(Boolean).map((p,i)=><p className="mb-7 text-lg leading-9 text-muted" key={i}>{p}</p>)}<TextLink href="/impact" className="mt-10">Return to community impact</TextLink></div></article></>;}
