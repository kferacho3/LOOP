import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { CoatDrive } from '@/components/coat-drive';
import { EventsList } from '@/components/events-list';
import { getSiteContent } from '@/lib/content';
import { ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  description:
    'Join LOOP’s community initiatives, including our coat drive with Rockdale County Fire Station #8. Give warmth, volunteer, and strengthen community.',
  title: 'Community Initiatives',
  alternates: { canonical: '/community-initiatives' },
};
export default async function Initiatives() {
  const { events } = await getSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="Community initiatives"
        title="Neighbors showing up."
        emphasis="Change taking shape."
        description="Explore the drives, programs, and gatherings that turn collective care into practical support."
      />
      <CoatDrive />
      <section className="shell py-20">
        <h2 className="section-title">More ways to connect.</h2>
        <p className="mt-6 mb-10 max-w-xl leading-7 text-muted">
          Explore upcoming gatherings and opportunities to get involved. Confirmed event details
          appear here as they become available.
        </p>
        <EventsList events={events} />
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/programs/summer-camp">Explore our summer camp</ButtonLink>
          <ButtonLink href="/volunteer" variant="outline">
            Volunteer with LOOP
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
