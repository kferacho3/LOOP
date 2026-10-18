import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
export const metadata: Metadata = {
  title: 'Thank You for Supporting LOOP',
  robots: { index: false, follow: false },
};
export default function Thanks() {
  return (
    <>
      <PageIntro
        eyebrow="Thank you for caring"
        title="Your generosity."
        emphasis="Our shared possibility."
        description="Thank you for supporting LOOP’s work with youth, families, and justice-impacted communities."
      />
      <section className="shell pb-24">
        <p className="max-w-2xl leading-8 text-muted">
          Please use your PayPal confirmation or receipt to verify that your donation was completed.
          Returning to this page alone does not confirm payment. If you have questions about your
          gift, contact info@loopcares.org.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/community-initiatives">See community initiatives</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Return home
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
