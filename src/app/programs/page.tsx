import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { Photo } from '@/components/photo';
import { ButtonLink, TextLink, ClosingCTA } from '@/components/ui';
import { partnership } from '@/content/approved-copy';
import { getSiteContent } from '@/lib/content';
export const metadata: Metadata = {
  description:
    'Explore LOOP’s nonprofit programs for youth entrepreneurship, court and family support, visitation transportation, reentry, housing stability, and community care.',
  title: 'Our programs',
  alternates: { canonical: '/programs' },
};
export default async function Programs() {
  const { programs, settings } = await getSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="Our programs"
        title="Our Programs"
        emphasis=""
        description="Creating opportunities through education, access, and community centered support."
      />
      <div className="shell pb-8">
        <ButtonLink href="/programs/summer-camp">Explore our free summer camp</ButtonLink>
      </div>
      <nav className="shell flex flex-wrap gap-2 pb-14" aria-label="Jump to a program">
        {programs.map((p, i) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            className="liquid rounded-full border border-line px-4 py-3 text-xs hover:bg-linen"
          >
            {String(i + 1).padStart(2, '0')} · {p.title}
          </a>
        ))}
      </nav>
      <div className="border-t border-line">
        {programs.map((p, i) => (
          <section
            id={p.slug}
            key={p.slug}
            className={`py-16 md:py-20 ${i % 2 ? 'bg-linen/50' : ''}`}
          >
            <div className="shell grid items-center gap-10 lg:grid-cols-2">
              <Photo
                image={p.image}
                caption
                parallax
                className={`h-[300px] rounded-3xl md:h-[410px] ${i % 2 ? 'lg:order-2' : ''}`}
              />
              <div className={i % 2 ? 'lg:pr-12' : 'lg:pl-12'}>
                <p className="eyebrow mb-6 text-clay">
                  {String(i + 1).padStart(2, '0')} / {p.category}
                </p>
                <h2 className="text-4xl leading-[1.1] tracking-[-.03em] md:text-5xl">{p.title}</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-muted">{p.body}</p>
                {p.summary !== p.body && <p className="mt-4 max-w-xl text-base leading-8 text-muted">{p.summary}</p>}
                <div className="mt-8 flex flex-wrap items-center gap-7">
                  <ButtonLink href={`/get-help?need=${encodeURIComponent(p.supportType)}`}>
                    Ask about support
                  </ButtonLink>
                  <TextLink href={`/programs/${p.slug}`}>Explore this program</TextLink>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <p className="shell py-8 text-xs leading-6 text-muted">{settings.serviceNote}</p>
      <section className="shell pb-20">
        <h2 className="section-title">Partner with LOOP</h2>
        <p className="body-copy mt-7 max-w-3xl">{partnership}</p>
        <ButtonLink href="/partner" className="mt-7">
          Partner with LOOP
        </ButtonLink>
      </section>
      <ClosingCTA />
    </>
  );
}
