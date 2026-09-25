import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { EventsList } from '@/components/events-list';
import { ClosingCTA } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
export const metadata:Metadata={title:'Community events',alternates:{canonical:'/events'}};
export const revalidate=60;
export default async function Events(){const {events}=await getSiteContent();const upcoming=events.filter(e=>Date.parse(e.endsAt||e.startsAt)>=Date.now());return <><PageIntro eyebrow="Make a connection" title="Come as you are." emphasis="Leave more connected." description="Find opportunities to learn, volunteer, share resources, and be part of the community. Confirmed events appear here with dates, locations, and ways to take part."/><section className="shell pb-24"><EventsList events={upcoming}/></section><ClosingCTA/></>;}
