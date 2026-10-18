import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  description:
    'Explore ways to contribute your skills to LOOP’s nonprofit mission. Contact us about career opportunities or find a volunteer role.',
  title: 'Careers & Opportunities',
  alternates: { canonical: '/careers' },
};
export default function Careers() {
  return (
    <>
      <PageIntro
        eyebrow="Careers & opportunities"
        title="Bring your purpose."
        emphasis="Help build what’s next."
        description="Connect your skills with work rooted in dignity, access, and community."
      />
      <section className="shell grid gap-12 pb-24 md:grid-cols-2">
        <div>
          <h2 className="text-3xl">Working with LOOP</h2>
          <p className="mt-6 leading-8 text-muted">
            Our work brings people together around education, family connection, housing stability,
            and opportunities for justice-impacted communities. Contact LOOP to ask about current
            career opportunities and how your experience could contribute.
          </p>
          <ButtonLink href="mailto:info@loopcares.org?subject=Careers%20at%20LOOP" className="mt-8">
            Ask about opportunities
          </ButtonLink>
        </div>
        <aside className="bg-linen p-8">
          <h2 className="text-3xl">Make an impact now.</h2>
          <p className="mt-6 leading-8 text-muted">
            Volunteering offers another way to contribute your time and talent to community-centered
            work.
          </p>
          <ButtonLink href="/volunteer" className="mt-8">
            Explore volunteering
          </ButtonLink>
        </aside>
      </section>
    </>
  );
}
