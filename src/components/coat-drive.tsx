import Image from 'next/image';
import Link from 'next/link';
export function CoatDrive({ hero = false }: { hero?: boolean }) {
  return (
    <section
      className={hero ? 'coat-hero' : 'coat-feature'}
      aria-labelledby={hero ? 'home-title' : 'coat-title'}
    >
      <div className="shell coat-layout">
        <div className="coat-copy">
          <p className="eyebrow">LOOP Community Coat Drive</p>
          {hero ? (
            <h1 id="home-title">
              Give warmth.
              <br />
              <span>Share hope.</span>
            </h1>
          ) : (
            <h2 id="coat-title" className="section-title">
              Keeping our
              <br />
              community warm.
            </h2>
          )}
          <p className="coat-deck">
            Keeping our community warm,
            <br />
            one coat at a time.
          </p>
          <p className="coat-description">
            A coat is more than a winter essential. It’s a reminder that someone cares. Join LOOP
            and Rockdale County Fire Station #8 in supporting children, individuals, and families
            this winter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/community-initiatives/coat-drive#donate" className="brand-button gold">
              Give a coat ↗
            </Link>
            <Link href="/community-initiatives/coat-drive" className="brand-button on-dark">
              Explore the initiative
            </Link>
          </div>
          <p className="mt-8 text-xs tracking-wide">NEW & GENTLY USED COATS · JACKETS · BLANKETS</p>
        </div>
        <div className="coat-art">
          <div className="warmth-circle" aria-hidden>
            <svg viewBox="0 0 300 350" fill="none">
              <path
                d="M108 48 76 67 24 166 65 192 93 142 85 297Q150 320 215 297L207 142 235 192 276 166 224 67 192 48"
                fill="currentColor"
              />
              <path d="m108 48 42 49 42-49-20-26h-44z" fill="var(--brand-gold)" />
              <path
                d="M150 98v207M99 153h29v43H99m102-43h-29v43h29M90 236h44m32 0h44"
                stroke="var(--brand-primary)"
                strokeWidth="5"
              />
              <path
                d="M129 111c-11-13-32 4-8 22l8 7 8-7c24-18 3-35-8-22"
                fill="var(--brand-gold)"
              />
            </svg>
          </div>
          <p className="warmth-note">
            A warmer winter.
            <br />A stronger community.
          </p>
          <div className="sponsor-seal">
            <Image
              src="/partners/one-warm-coat.png"
              alt="One Warm Coat — Official Member of Nonprofit Network"
              width={1800}
              height={1200}
              className="h-auto w-full"
              priority={hero}
            />
          </div>
        </div>
      </div>
      <div className="coat-bottom shell">
        <span>IN COMMUNITY WITH</span>
        <strong>Rockdale County Fire Station #8</strong>
        <span>Give Warmth. Share Hope. Strengthen Community.</span>
      </div>
    </section>
  );
}
