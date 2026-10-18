import type { Metadata } from 'next';
import { Photo } from '@/components/photo';
import { ClosingCTA, TextLink } from '@/components/ui';
import photos from '@/content/community-media.json';
import { mission, story, approach, values, focusAreas } from '@/content/approved-copy';
export const metadata: Metadata = {
  title: 'About LOOP',
  description: mission,
  alternates: { canonical: '/about' },
};
export default function About() {
  return (
    <>
      <section className="shell page-editorial-intro">
        <p className="eyebrow">ABOUT LOOP</p>
        <h1>
          Built from lived experience. Rooted in community. Committed to creating pathways forward.
        </h1>
      </section>
      <div className="shell">
        <Photo image={photos.gathering} priority className="h-[340px] md:h-[600px]" sizes="100vw" />
      </div>
      <section id="mission" className="shell editorial-section">
        <h2 className="section-title">Mission</h2>
        <p>{mission}</p>
      </section>
      <section className="shell editorial-section border-t border-line">
        <h2 className="section-title">Our story</h2>
        <div>
          <p>{story}</p>
          <p>LOOP turns community needs into action and pathways forward.</p>
        </div>
      </section>
      <section id="approach" className="bg-linen">
        <div className="shell grid items-center gap-12 py-20 lg:grid-cols-2">
          <Photo image={photos.conversation} className="h-[400px] md:h-[500px]" />
          <div>
            <h2 className="section-title">Our approach</h2>
            <p className="body-copy mt-7">{approach}</p>
          </div>
        </div>
      </section>
      <section id="values" className="shell py-20">
        <p className="eyebrow mb-8">Our values</p>
        <div className="values-grid">
          {values.map(([t, d]) => (
            <article key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="shell pb-20">
        <h2 className="section-title mb-10">What we do</h2>
        <div className="focus-list">
          {focusAreas.map(([t, d]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <TextLink href="/about/organization-documents" className="mt-10">
          Organization documents
        </TextLink>
      </section>
      <ClosingCTA />
    </>
  );
}
