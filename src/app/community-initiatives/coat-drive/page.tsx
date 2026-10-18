import type { Metadata } from 'next';
import Image from 'next/image';
import { Photo } from '@/components/photo';
import { ButtonLink } from '@/components/ui';
import photos from '@/content/community-media.json';
import { coatDrive as copy } from '@/content/approved-copy';
export const metadata: Metadata = {
  title: copy.title,
  description: copy.subtitle,
  alternates: { canonical: '/community-initiatives/coat-drive' },
};
export default function CoatDrivePage() {
  return (
    <>
      <section className="shell page-editorial-intro">
        <p className="eyebrow">Community Initiatives</p>
        <h1>{copy.title}</h1>
        <p className="intro-deck">{copy.subtitle}</p>
      </section>
      <section className="shell grid gap-12 pb-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-7 body-copy">
          <p>{copy.introduction}</p>
          <p>{copy.collection}</p>
          <p>{copy.purpose}</p>
          <div id="donate" className="border-t border-line pt-9">
            <h2 className="text-3xl mb-6">How You Can Help</h2>
            <p>{copy.help}</p>
            <p className="mt-7">{copy.impact}</p>
          </div>
          <p className="font-semibold text-clay">{copy.closing}</p>
          <p className="text-sm">
            Contact LOOP for collection dates, hours, and donation drop off arrangements.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="mailto:info@loopcares.org?subject=LOOP%20Community%20Coat%20Drive">
              Coordinate a donation
            </ButtonLink>
            <ButtonLink href="tel:+13239852116" variant="outline">
              Call (323) 985-2116
            </ButtonLink>
          </div>
        </div>
        <aside>
          <Photo image={photos['community-group']} className="h-[340px] md:h-[430px]" />
          <div className="mt-8 border border-line bg-white p-8">
            <Image
              src="/partners/one-warm-coat.png"
              alt="One Warm Coat Official Member of Nonprofit Network"
              width={1800}
              height={1200}
              className="mx-auto w-64"
            />
            <p className="mt-5 text-center">Rockdale County Fire Station #8</p>
          </div>
        </aside>
      </section>
    </>
  );
}
