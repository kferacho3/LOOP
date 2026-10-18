import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
import { media } from '@/content/media';
export const metadata: Metadata = {
  description:
    'Explore LOOP’s free six-week academic and entrepreneurship camp for 20 youth, with financial literacy, business planning, and a Youth Business Expo.',
  title: 'Summer Academic & Entrepreneurship Camp',
  alternates: { canonical: '/programs/summer-camp' },
};
export default function Camp() {
  return (
    <>
      <PageIntro
        eyebrow="Youth education & entrepreneurship"
        title="Ideas today."
        emphasis="Entrepreneurs tomorrow."
        description="LOOP Summer Academic and Entrepreneurship Camp: a free six-week program for 20 youth, bringing academic enrichment, financial literacy, and real-world business experience together."
        image={media.youth}
      />
      <div className="statement-band">
        <div className="shell grid grid-cols-3 gap-6 py-12">
          {[
            ['6', 'weeks of learning'],
            ['20', 'young people'],
            ['Free', 'program participation'],
          ].map(([n, t]) => (
            <div key={n}>
              <p className="text-4xl font-bold md:text-6xl">{n}</p>
              <p className="mt-3 text-sm">{t}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="shell editorial-section">
        <p className="eyebrow">From idea to launch</p>
        <div>
          <h2 className="section-title">
            Learn it.
            <br />
            <span className="text-clay">Build it. Make it yours.</span>
          </h2>
          <p>
            Students strengthen academic skills while exploring what it takes to start and run a
            business. Hands-on projects, educational field trips, and real-world business exposure
            connect classroom learning to possibilities beyond it.
          </p>
          <ol className="camp-steps">
            {[
              ['Imagine', 'Develop a business idea and discover the people it could serve.'],
              [
                'Plan',
                'Create a business plan and budget, practice financial literacy, and build a brand.',
              ],
              [
                'Explore',
                'Participate in educational field trips, learn from real businesses, and source materials.',
              ],
              ['Pitch', 'Present ideas, receive startup support, and prepare to launch.'],
              [
                'Launch',
                'Bring businesses to life and sell products at the LOOP Youth Business Expo.',
              ],
            ].map(([t, d], i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p>
            Contact LOOP for the next camp’s dates, location, eligibility, and enrollment details.
            An inquiry does not reserve a place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/get-help?need=Youth%20programs">Ask about the camp</ButtonLink>
            <ButtonLink href="/partner" variant="outline">
              Support young entrepreneurs
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
