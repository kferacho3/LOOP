import type { Metadata } from 'next';
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description:
    'LOOP empowers youth, families, and justice-impacted communities. Support our community coat drive, explore programs, volunteer, or donate.',
};
import Link from 'next/link';
import { CoatDrive } from '@/components/coat-drive';
import { Photo } from '@/components/photo';
import { ButtonLink, ClosingCTA, TextLink } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
import { media } from '@/content/media';
export default async function Home() {
  const { programs } = await getSiteContent();
  return (
    <>
      <CoatDrive hero />
      <section className="action-strip shell" aria-label="Connect with LOOP">
        {[
          ['/get-help', 'Find support', 'A place to start'],
          ['/volunteer', 'Give your time', 'Show up for community'],
          ['/partner', 'Become a partner', 'Create opportunity together'],
          ['/ways-to-give', 'Make a difference', 'Help move our mission forward'],
        ].map(([href, title, sub]) => (
          <Link href={href} key={href}>
            <span>{sub}</span>
            <strong>{title} ↗</strong>
          </Link>
        ))}
      </section>
      <section className="shell mission-block">
        <p className="eyebrow">LIBERATION OF OPPRESSED PEOPLE</p>
        <div>
          <h2 className="section-title">
            Opportunity opens doors.
            <br />
            <span className="text-clay">Community keeps them open.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
            LOOP is a nonprofit empowering youth, families, and justice-impacted communities through
            education, pathways to stable housing, essential resources, and opportunities to build
            independent, thriving lives.
          </p>
          <TextLink href="/about" className="mt-8">
            Our story. Our purpose.
          </TextLink>
        </div>
      </section>
      <section className="community-banner">
        <Photo image={media.community} caption className="h-[360px] md:h-[520px]" sizes="100vw" />
        <div className="shell">
          <p>
            Built from lived experience.
            <br />
            <span>Rooted in community.</span>
          </p>
        </div>
      </section>
      <section className="shell py-20 md:py-28">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">What we do</p>
            <h2 className="section-title">
              Real support.
              <br />
              <span className="text-clay">Lasting possibility.</span>
            </h2>
          </div>
          <TextLink href="/programs">Explore our programs</TextLink>
        </div>
        <div className="program-grid mt-14">
          {programs.map((p, i) => (
            <Link href={`/programs/${p.slug}`} key={p.slug}>
              <span className="eyebrow">
                0{i + 1} / {p.category}
              </span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <span className="program-arrow" aria-hidden>
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="camp-band">
        <div className="shell grid items-center gap-12 py-20 lg:grid-cols-2">
          <Photo image={media.youth} caption className="h-[320px] md:h-[460px]" />
          <div>
            <p className="eyebrow mb-6">LOOP Summer Academic & Entrepreneurship Camp</p>
            <h2 className="section-title">
              Big ideas.
              <br />
              Bright futures.
            </h2>
            <p className="mt-7 text-lg leading-8">
              Six weeks. Twenty young people. A free program that turns curiosity into
              confidence—and business ideas into real-world experience.
            </p>
            <p className="mt-5 leading-7">
              Academic enrichment, financial literacy, hands-on learning, and a chance to launch at
              the LOOP Youth Business Expo.
            </p>
            <ButtonLink href="/programs/summer-camp" className="mt-8">
              Discover the camp
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="shell grid gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow mb-6">Community initiatives</p>
          <h2 className="section-title">
            Care becomes
            <br />
            <span className="text-clay">action.</span>
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted">
            From collecting winter essentials to opening doors for young entrepreneurs, our work
            begins with what our neighbors need—and grows with people willing to help.
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <ButtonLink href="/community-initiatives">See what’s happening</ButtonLink>
            <TextLink href="/contact">Connect with LOOP</TextLink>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
