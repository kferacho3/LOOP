import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ClosingCTA, TextLink } from '@/components/ui';
import { media } from '@/content/media';
export const metadata: Metadata = {
  description:
    'Discover LOOP’s nonprofit mission, lived-experience roots, and values of community, access, and empowerment for youth, families, and justice-impacted people.',
  title: 'Our Story & Mission',
  alternates: { canonical: '/about' },
};
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About LOOP"
        title="Built from experience."
        emphasis="Moving forward, together."
        description="Rooted in community. Committed to creating pathways forward for youth, families, and justice-impacted people."
        image={media.hero}
      />
      <section id="mission" className="statement-band">
        <div className="shell py-20">
          <p className="eyebrow mb-6">Our mission</p>
          <h2>To turn barriers into pathways—and possibility into lasting progress.</h2>
          <p>
            LOOP equips youth, families, and justice-impacted communities with education, pathways
            to stable housing, essential resources, and meaningful opportunities. By bringing
            practical support and community connection together, we help people build independence,
            strengthen their families, and shape their own futures.
          </p>
        </div>
      </section>
      <section className="shell editorial-section">
        <p className="eyebrow">Our story</p>
        <div>
          <h2 className="section-title">
            Lived experience.
            <br />
            <span className="text-clay">A shared purpose.</span>
          </h2>
          <p>
            LOOP was created from lived experience and a firsthand understanding of the barriers
            people face when navigating complex systems. We know that a challenge rarely arrives
            alone: housing, education, transportation, and family connection are deeply intertwined.
          </p>
          <p>
            That understanding shaped a vision for an organization that meets people with dignity,
            responds to real needs, and creates meaningful opportunities. Our work turns community
            needs into action—and action into pathways forward.
          </p>
          <TextLink href="/about/people" className="mt-6">
            People behind the purpose
          </TextLink>
        </div>
      </section>
      <section id="approach" className="bg-linen">
        <div className="shell editorial-section">
          <p className="eyebrow">Our approach</p>
          <div>
            <h2 className="section-title">
              Listen first.
              <br />
              <span className="text-clay">Build together.</span>
            </h2>
            <p>
              Lasting change begins by listening to the people closest to the challenges. LOOP
              centers dignity, connection, and opportunity, working alongside individuals, families,
              and community partners to create practical solutions.
            </p>
            <p>
              We connect immediate needs with longer-term possibilities: a resource that brings
              stability, a relationship that offers encouragement, or an opportunity that opens a
              new direction. People remain the authors of their own futures.
            </p>
          </div>
        </div>
      </section>
      <section id="values" className="shell py-20 md:py-28">
        <p className="eyebrow mb-6">Our values</p>
        <div className="values-grid">
          {[
            [
              'Community',
              'We build through connection, collaboration, and collective care. Strong communities grow when people show up for one another.',
            ],
            [
              'Access',
              'We work to reduce barriers so education, essential resources, and meaningful opportunities are within reach.',
            ],
            [
              'Empowerment',
              'We equip people with the tools, knowledge, and support to make their own choices and shape their own futures.',
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{t}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
