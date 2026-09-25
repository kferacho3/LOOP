export type ImageAsset = { src: string; alt: string; position?: string; credit?: string; creditUrl?: string; stock?: boolean };
export type Program = { slug: string; title: string; shortTitle: string; category: string; summary: string; body: string; includes: string[]; image: ImageAsset; supportType: string; order: number };
export type CommunityEvent = { slug: string; title: string; description: string; startsAt: string; endsAt?: string; timeZone: string; location: string; category: string; registrationUrl?: string; image?: ImageAsset };
export type Story = { slug: string; title: string; excerpt: string; body: string; image: ImageAsset; publishedAt: string };
export type Impact = { label: string; value: number; period: string; source: string };
export type Location = { slug: string; name: string; description: string; serviceArea: string; contactEmail?: string };
export type SiteSettings = { heroTitle: string; heroEmphasis: string; heroBody: string; heroImage: ImageAsset; aboutBody: string; serviceNote: string; contactEmail: string; contactPhone: string; donationUrl?: string; announcement?: string; instagram?: string; facebook?: string; linkedin?: string; privacyNotice?: string };
export type SiteContent = { settings: SiteSettings; programs: Program[]; events: CommunityEvent[]; stories: Story[]; impact: Impact[]; locations: Location[] };
