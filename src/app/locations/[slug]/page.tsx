import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const {locations}=await getSiteContent();return {title:locations.find(l=>l.slug===slug)?.name||'Our community',alternates:{canonical:`/locations/${slug}`}};}
export default async function Location({params}:Props){const {slug}=await params;const {locations}=await getSiteContent();const location=locations.find(l=>l.slug===slug);if(!location)notFound();return <><PageIntro eyebrow="A LOOP community" title={location.name} emphasis="A shared way forward." description={location.description}/><section className="shell pb-24"><h2 className="text-2xl">Confirmed service area</h2><p className="mt-6 max-w-3xl text-base leading-8 text-muted">{location.serviceArea}</p><ButtonLink href="/get-help" className="mt-8">Ask about support</ButtonLink></section></>;}
