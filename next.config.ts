import type { NextConfig } from 'next';
const csp = [
  "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'", "font-src 'self' data:",
  "img-src 'self' data: blob: https://images.pexels.com https://images.unsplash.com https://cdn.sanity.io",
  "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com https://*.sanity.io",
  "frame-src https://challenges.cloudflare.com", "form-action 'self'", "upgrade-insecure-requests"
].join('; ');
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/photos/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-*' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      {key: 'X-Content-Type-Options', value: 'nosniff'},
      {key: 'X-Frame-Options', value: 'DENY'},
      {key: 'Referrer-Policy', value: 'no-referrer'},
      {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
      ...(process.env.NODE_ENV === 'production' ? [{key:'Content-Security-Policy', value:csp}] : [])
    ]}];
  }
};
export default config;
