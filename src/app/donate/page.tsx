import type { Metadata } from 'next';
import { Heart, ArrowUpRight } from 'lucide-react';
import { getSiteContent } from '@/lib/content';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink, Eyebrow, TextLink } from '@/components/ui';
export const metadata: Metadata = {
  description:
    'Donate to LOOP through PayPal and support youth education, reentry, housing resources, family connection, and nonprofit community programs.',
  title: 'Support LOOP',
  alternates: { canonical: '/donate' },
};
export default async function Donate() {
  const { settings } = await getSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="Support our nonprofit"
        title="Donate to LOOP"
        emphasis=""
        description="Your support can help LOOP reduce practical barriers and bring people closer to resources, opportunities, and one another."
      />
      <section className="shell grid items-start gap-12 pb-24 lg:grid-cols-2">
        <div>
          <Eyebrow>What donations help support</Eyebrow>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {[
              'Transportation',
              'Housing support',
              'Youth programming',
              'Community events',
              'Emergency support',
              'Program supplies',
              'Meals',
              'Community outreach',
            ].map((t, i) => (
              <div key={t} className="flex items-center gap-4 border-t border-line py-6">
                <span className="text-xs text-clay">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-sm font-bold">{t}</h2>
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-muted">
            Every gift helps strengthen community-centered support. Contact LOOP with questions
            about giving, program priorities, or donation documentation.
          </p>
          <TextLink href="/partner" className="mt-7">
            Explore an organizational partnership
          </TextLink>
        </div>
        <div
          className="relative overflow-hidden rounded-[32px] bg-forest p-8 text-paper md:p-12"
          data-dark
        >
          
          <h2 className="text-4xl leading-[1.05] tracking-[-.03em]">
            Make a donation
          </h2>
          {settings.donationUrl ? (
            <>
              <p className="mt-7 text-sm leading-7 text-paper/80">
                Choose your donation amount and complete your gift securely on PayPal. You can make
                a one-time donation using the payment options PayPal makes available to you.
              </p>
              <ButtonLink href={settings.donationUrl} variant="light" className="mt-9 w-full">
                Donate securely with PayPal
              </ButtonLink>
              <p className="mt-4 text-center text-[11px] text-paper/75">
                PayPal handles payment processing and confirmation.
              </p>
            </>
          ) : (
            <>
              <p className="mt-7 text-sm leading-7 text-paper/80">
                Online giving will open once LOOP’s official donation platform is connected. No
                payments are currently accepted on this site.
              </p>
              <ButtonLink href="/contact" variant="light" className="mt-9 w-full">
                Ask about supporting LOOP
              </ButtonLink>
            </>
          )}
          <div className="mt-10 flex items-center gap-3 border-t border-paper/20 pt-6 text-xs text-paper/75">
            <Heart size={16} aria-hidden />
            Thank you for believing in people.
            <ArrowUpRight size={16} className="ml-auto" aria-hidden />
          </div>
        </div>
      </section>
    </>
  );
}
