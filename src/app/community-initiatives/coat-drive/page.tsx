import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  title: 'LOOP Community Coat Drive',
  description:
    'Give warmth, share hope, and strengthen community with LOOP and Rockdale County Fire Station #8.',
  alternates: { canonical: '/community-initiatives/coat-drive' },
};
export default function CoatDrivePage() {
  return (
    <>
      <PageIntro
        eyebrow="Community initiatives / Coat drive"
        title="One coat."
        emphasis="A little more warmth."
        description="Keeping Our Community Warm, One Coat at a Time"
      />
      <section className="statement-band">
        <div className="shell py-16">
          <h2>
            Give Warmth. Share Hope.
            <br />
            Strengthen Community.
          </h2>
          <p>
            Liberation of Oppressed People (LOOP) is proud to partner with Rockdale County Fire
            Station #8 for our community coat drive.
          </p>
        </div>
      </section>
      <section className="shell editorial-section">
        <p className="eyebrow">More than warmth</p>
        <div>
          <h2 className="section-title">
            A community
            <br />
            <span className="text-clay">that cares.</span>
          </h2>
          <p>
            As temperatures begin to drop, we are coming together to collect coats, jackets,
            blankets, and other winter essentials for children, individuals, and families in need
            throughout our community.
          </p>
          <p>
            Through this initiative, we hope to provide more than warmth. We want to remind our
            neighbors that they are seen, supported, and surrounded by a community that cares.
          </p>
        </div>
      </section>
      <section id="donate" className="bg-linen">
        <div className="shell grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">How you can help</p>
            <h2 className="section-title">
              A coat you share.
              <br />
              <span className="text-clay">A difference they feel.</span>
            </h2>
            <p className="mt-7 leading-8 text-muted">
              We welcome new and gently used coats, jackets, blankets, and winter essentials in
              clean, wearable condition. Every donation makes a difference.
            </p>
            <ul className="mt-7 space-y-3 border-y border-line py-6">
              <li>Coats and jackets for children and adults</li>
              <li>Blankets and other winter essentials</li>
              <li>Clean items in good, usable condition</li>
            </ul>
            <p className="mt-6 leading-7 text-muted">
              Contact LOOP to confirm collection dates, drop-off arrangements, and current needs
              before bringing donations.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="mailto:info@loopcares.org?subject=LOOP%20Community%20Coat%20Drive">
                Coordinate a donation
              </ButtonLink>
              <ButtonLink href="tel:+13239852116" variant="outline">
                Call (323) 985-2116
              </ButtonLink>
            </div>
          </div>
          <aside className="self-center bg-white p-8 md:p-12">
            <Image
              src="/partners/one-warm-coat.png"
              alt="One Warm Coat — Official Member of Nonprofit Network"
              width={1800}
              height={1200}
            />
            <p className="mt-7 text-center text-sm leading-7 text-muted">
              With support from One Warm Coat and our community partners.
            </p>
            <div className="mt-8 border-t border-line pt-8 text-center">
              <p className="eyebrow mb-3">Community collection partner</p>
              <h3 className="text-2xl">Rockdale County Fire Station #8</h3>
            </div>
          </aside>
        </div>
      </section>
      <section className="shell py-20">
        <p className="max-w-3xl text-2xl leading-relaxed">
          Together with Fire Station #8 and our community supporters, we can help ensure that more
          families have access to the essentials they need this winter.
        </p>
        <ButtonLink href="/volunteer" className="mt-8">
          Help with community outreach
        </ButtonLink>
      </section>
    </>
  );
}
