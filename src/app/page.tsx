import type { Metadata } from 'next';
import Link from 'next/link';
import { CoatDrive } from '@/components/coat-drive';
import { Photo } from '@/components/photo';
import { ButtonLink, ClosingCTA, TextLink } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
import photos from '@/content/community-media.json';
import { introduction, mission, campIntro, campDetails } from '@/content/approved-copy';
export const metadata: Metadata = { alternates: { canonical: '/' }, description: introduction };
export default async function Home() {
  const { programs } = await getSiteContent();
  return (
    <>
      <CoatDrive hero />
      <nav className="home-actions shell" aria-label="Get involved with LOOP">
        {[
          ['/get-help', 'Get Support'],
          ['/volunteer', 'Volunteer'],
          ['/partner', 'Partner With LOOP'],
          ['/donate', 'Donate'],
        ].map(([h, t]) => (
          <Link href={h} key={h}>
            {t}
            
          </Link>
        ))}
      </nav>
      <section className="shell home-introduction">
        <div>
          <p className="eyebrow">LIBERATION OF OPPRESSED PEOPLE</p>
          <h2>{introduction}</h2>
        </div>
        <div>
          <p className="eyebrow">Mission</p>
          <p className="body-copy">{mission}</p>
          <TextLink href="/about" className="mt-7">
            About LOOP
          </TextLink>
        </div>
      </section>
      <section className="shell pb-20 md:pb-28">
        <div className="section-header">
          <div>
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="section-title">Our programs</h2>
          </div>
          <TextLink href="/programs">View all programs</TextLink>
        </div>
        <div className="program-editorial">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className={i === 0 ? 'program-lead' : ''}
            >
              {i === 0 && <Photo image={photos.workshop} className="program-lead-photo" />}
              <div className="program-content">
                <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="program-more">
                  Program details 
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="camp-editorial">
        <div className="shell grid items-center gap-12 py-20 lg:grid-cols-2">
          <Photo image={photos.learning} className="h-[360px] md:h-[540px]" />
          <div>
            <p className="eyebrow mb-5">Education and Youth Development</p>
            <h2 className="section-title">LOOP Summer Academic and Entrepreneurship Camp</h2>
            <p className="body-copy mt-7">{campIntro}</p>
            <p className="body-copy mt-5">{campDetails}</p>
            <ButtonLink href="/programs/summer-camp" className="mt-8">
              Program information
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="shell py-20 md:py-28">
        <div className="section-header">
          <div>
            <p className="eyebrow mb-4">Our community</p>
            <h2 className="section-title">Community Initiatives</h2>
          </div>
          <TextLink href="/community-initiatives">Explore our initiatives</TextLink>
        </div>
        <div className="community-photo-pair">
          <Photo image={photos['community-group']} className="h-[330px] md:h-[440px]" />
          <Photo image={photos.ceremony} className="h-[330px] md:h-[440px]" />
        </div>
        <div className="mt-8 flex flex-wrap gap-7">
          <TextLink href="/community-initiatives/coat-drive">LOOP Community Coat Drive</TextLink>
          <TextLink href="/stories">Watch the community video</TextLink>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
