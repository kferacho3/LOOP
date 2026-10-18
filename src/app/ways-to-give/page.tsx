import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  description:
    'Support LOOP’s nonprofit mission through donations, winter essentials, volunteering, and partnerships that create opportunity for youth and families.',
  title: 'Ways to Give',
  alternates: { canonical: '/ways-to-give' },
};
export default function Give() {
  return (
    <>
      <PageIntro
        eyebrow="Ways to give"
        title="Ways to Give"
        emphasis=""
        description="Time, resources, connections, and financial support all help create pathways forward for youth, families, and justice-impacted communities."
      />
      <section className="shell grid gap-6 pb-24 md:grid-cols-2">
        {[
          [
            'Give warmth',
            'Donate new and gently used coats, jackets, blankets, and winter essentials through the LOOP Community Coat Drive.',
            '/community-initiatives/coat-drive',
            'Join the coat drive',
          ],
          [
            'Support the mission',
            'Help sustain youth programming, transportation, housing support, outreach, and essential community resources.',
            '/donate',
            'Donate with PayPal',
          ],
          [
            'Share your time',
            'Bring your skills and care to youth programs, community outreach, events, resource research, and administrative support.',
            '/volunteer',
            'Become a volunteer',
          ],
          [
            'Build a partnership',
            'Businesses, schools, employers, housing partners, and community organizations can contribute sponsorships, resources, and collaborative opportunities.',
            '/partner',
            'Partner with LOOP',
          ],
        ].map(([t, d, h, c], i) => (
          <article
            key={t}
            className="giving-card flex h-full flex-col border border-line bg-linen p-8 md:p-12"
          >
            <p className="eyebrow mb-8">0{i + 1} / Make a difference</p>
            <h2 className="text-3xl">{t}</h2>
            <p className="mt-5 mb-8 leading-8 text-muted">{d}</p>
            <ButtonLink href={h} className="mt-auto self-start">
              {c}
            </ButtonLink>
          </article>
        ))}
      </section>
    </>
  );
}
