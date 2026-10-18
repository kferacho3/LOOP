import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ClosingCTA, ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  description:
    'Meet the purpose behind LOOP, a community-centered nonprofit built from lived experience. Connect with our team and explore ways to get involved.',
  title: 'People Behind LOOP',
  alternates: { canonical: '/about/people' },
};
export default function People() {
  return (
    <>
      <PageIntro
        eyebrow="People behind LOOP"
        title="Lived experience."
        emphasis="Collective commitment."
        description="LOOP’s work is grounded in a firsthand understanding of the challenges youth, families, and justice-impacted communities face."
      />
      <section className="shell editorial-section pt-0">
        <p className="eyebrow">People make the mission possible</p>
        <div>
          <h2 className="section-title">A shared way forward.</h2>
          <p>
            Community members, volunteers, and partners each have a role in creating access and
            opportunity. Our approach values listening, practical support, and the knowledge people
            bring from their own lives.
          </p>
          <p>
            For team introductions, partnership conversations, or questions about LOOP’s work, reach
            out directly.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Meet us through a conversation
          </ButtonLink>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
