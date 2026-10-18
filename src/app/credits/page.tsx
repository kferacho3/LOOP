import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Photography & credits',
  robots: { index: false, follow: true },
};
export default function Credits() {
  return (
    <section className="shell page-editorial-intro pb-24">
      <p className="eyebrow">Photography & credits</p>
      <h1>Media and identity</h1>
      <div className="body-copy mt-10 max-w-3xl space-y-6">
        <p>
          The photographs and community video on this website were supplied by LOOP. Images are
          presented without identifying individuals or assigning them a role, service history, or
          personal story.
        </p>
        <p>The chain symbol and One Warm Coat seal were supplied for use on the LOOP website.</p>
        <p>Typography uses Manrope. Interface icons are from Lucide.</p>
      </div>
    </section>
  );
}
