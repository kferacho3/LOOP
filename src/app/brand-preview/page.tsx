import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { BrandPreview } from '@/components/brand-preview';
export const metadata: Metadata = {
  title: 'Brand Color Preview',
  robots: { index: false, follow: false },
};
export default function Brand() {
  return (
    <>
      <PageIntro
        eyebrow="LOOP brand studio"
        title="Find our colors."
        emphasis="Feel the difference."
        description="Explore four coordinated palettes across the entire website. Choose a direction, then open the homepage to see it in context."
      />
      <BrandPreview />
    </>
  );
}
