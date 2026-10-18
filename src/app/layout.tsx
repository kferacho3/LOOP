import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MotionController } from '@/components/motion';
import { SiteAnalytics } from '@/components/analytics';
import { getSiteContent, getSiteUrl, formsReady, isIndexingEnabled } from '@/lib/content';
import { BrandTheme } from '@/components/brand-preview';
import { DEFAULT_PALETTE } from '@/content/brand';
import './brand.css';
const body = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f6f3ec' };
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: 'LOOP | Youth, Family & Reentry Support Nonprofit', template: '%s | LOOP' },
  description:
    'LOOP is a nonprofit empowering youth, families, and justice-impacted communities through education, reentry support, housing resources, and community care.',
  robots: isIndexingEnabled() ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: 'website', siteName: 'LOOP', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/favicon.svg', apple: '/brand/apple-touch-icon.png' },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getSiteContent();
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${getSiteUrl()}/#organization`,
    name: 'Liberation of Oppressed People',
    alternateName: 'LOOP',
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/brand/loop-wordmark-black.png`,
    email: settings.contactEmail,
    telephone: settings.contactPhone,
    description: metadata.description,
  };
  return (
    <html lang="en" data-palette={DEFAULT_PALETTE} className={body.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
        />
        <Header announcement={settings.announcement} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer settings={settings} ready={formsReady()} />
        <BrandTheme />
        <MotionController />
        <SiteAnalytics />
      </body>
    </html>
  );
}
