import type { Metadata } from 'next';
import { Photo } from '@/components/photo';
import photos from '@/content/community-media.json';
export const metadata: Metadata = {
  title: 'Community Voices',
  description: 'Community video and photographs shared by LOOP.',
  alternates: { canonical: '/stories' },
};
export default function Stories() {
  return (
    <>
      <section className="shell page-editorial-intro">
        <p className="eyebrow">Community Voices</p>
        <h1>Community voices</h1>
      </section>
      <section className="shell pb-20">
        <figure>
          {/* The supplied recording has no caption track. Do not fabricate a transcript. */}
            <video
            className="media-video"
            controls
            playsInline
            preload="none"
            poster="/media/community-testimony-poster.webp"
            aria-label="Community testimony video supplied by LOOP"
          >
            <source src="/media/community-testimony.mp4" type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href="/media/community-testimony.mp4">Open the video</a>.
          </video>
          <figcaption className="mt-4 text-sm text-muted">
            Community testimony. Video supplied by LOOP.
          </figcaption>
        </figure>
        <div className="community-photo-pair mt-14">
          <Photo image={photos.advocacy} className="h-[540px]" />
          <Photo image={photos.ceremony} className="h-[540px]" />
        </div>
      </section>
    </>
  );
}
