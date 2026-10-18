import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { ButtonLink } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
export const metadata: Metadata = {
  description:
    'Community voices from LOOP: lived experiences and perspectives shared with dignity and permission. Connect with us about sharing your story.',
  title: 'Community Voices',
  alternates: { canonical: '/stories' },
};
export default async function Stories() {
  const { stories } = await getSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="Community voices"
        title="Every voice matters."
        emphasis="Every story belongs."
        description="Experiences, perspectives, and moments of connection from the community at the heart of LOOP."
      />
      <section className="shell pb-24">
        {stories.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((s) => (
              <Link href={`/stories/${s.slug}`} key={s.slug} className="border border-line p-8">
                <h2 className="text-3xl">{s.title}</h2>
                <p className="mt-5 leading-7 text-muted">{s.excerpt}</p>
                <span className="mt-8 block">Read the story ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl bg-linen p-8 md:p-12">
            <h2 className="text-3xl">Stories shared on your terms.</h2>
            <p className="mt-6 leading-8 text-muted">
              Community stories will appear here with the permission of the people sharing them. If
              you’d like to talk about contributing a story or perspective, connect with LOOP to
              learn more.
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Start a conversation
            </ButtonLink>
          </div>
        )}
      </section>
    </>
  );
}
