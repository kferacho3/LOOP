import Image from 'next/image';
import Link from 'next/link';
import { Photo } from './photo';
import photos from '@/content/community-media.json';
import { coatDrive } from '@/content/approved-copy';
export function CoatDrive({ hero = false }: { hero?: boolean }) {
  const Heading = hero ? 'h1' : 'h2';
  return (
    <section className="campaign-hero" aria-labelledby={hero ? 'home-title' : 'coat-title'}>
      <div className="campaign-photo">
        <Photo
          image={photos['community-stairs']}
          priority={hero}
          className="h-full min-h-[420px]"
          sizes="(max-width: 900px) 100vw, 55vw"
        />
      </div>
      <div className="campaign-copy">
        <p className="eyebrow">Community Initiatives</p>
        <Heading id={hero ? 'home-title' : 'coat-title'}>{coatDrive.title}</Heading>
        <p className="campaign-subtitle">{coatDrive.subtitle}</p>
        <p className="campaign-description">{coatDrive.introduction}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/community-initiatives/coat-drive#donate" className="brand-button gold">
            Donate winter essentials
          </Link>
          <Link href="/community-initiatives/coat-drive" className="brand-button on-dark">
            Coat drive details
          </Link>
        </div>
        <div className="campaign-partner">
          <Image
            src="/partners/one-warm-coat.png"
            alt="One Warm Coat Official Member of Nonprofit Network"
            width={180}
            height={120}
          />
          <p>
            Community collection partner
            <br />
            <strong>Rockdale County Fire Station #8</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
