import type { Program } from '@/lib/types';
import { media } from './media';
/** Program scope comes from LOOP Website Brief, pages 2 3. Descriptions reproduce the supplied program PDFs and website brief. */
export const programs: Program[] = [
  {
    slug: 'court-community-support',
    title: 'Court & Family Support',
    shortTitle: 'Court & Community Support',
    category: 'Guidance & connection',
    summary:
      'Providing court accompaniment, courthouse outreach, resource navigation, community outreach, and support for individuals and families navigating the justice system.',
    body: 'LOOP supports individuals and families navigating the justice system by providing court support, access to resources, and community based assistance throughout challenging legal processes.',
    includes: [
      'Court accompaniment',
      'Courthouse and community outreach',
      'Resource navigation',
      'Connections for individuals and families',
    ],
    image: media.connection,
    supportType: 'Court support',
    order: 1,
  },
  {
    slug: 'visitation-transportation',
    title: 'Visitation Transportation',
    shortTitle: 'Visitation Transportation',
    category: 'Family & connection',
    summary:
      'Helping reduce transportation barriers for families visiting incarcerated loved ones at prisons and county jails.',
    body: 'LOOP provides transportation to prisons and county jails, helping families overcome travel barriers and stay connected with their incarcerated loved ones through in person visits.',
    includes: [
      'Transportation resource navigation',
      'Support planning a family visit',
      'Connections to available trip options',
      'Information about next steps',
    ],
    image: media.journey,
    supportType: 'Transportation',
    order: 2,
  },
  {
    slug: 'housing-support-stability',
    title: 'Housing Support & Stability',
    shortTitle: 'Housing Support & Stability',
    category: 'Housing & stability',
    summary:
      'Helping individuals and families overcome housing barriers through resource navigation, transitional housing support, housing referrals, and connections to safe and stable housing opportunities.',
    body: 'LOOP is working to expand access to safe and stable housing for individuals and families facing housing barriers, with supportive services designed to promote long term stability and independence.',
    includes: [
      'Housing resource navigation',
      'Transitional housing support',
      'Housing referrals',
      'Connections to safe and stable opportunities',
    ],
    image: media.home,
    supportType: 'Housing support',
    order: 3,
  },
  {
    slug: 'reentry-support',
    title: 'Reentry Support',
    shortTitle: 'Reentry Support',
    category: 'Housing & stability',
    summary:
      'Connecting justice-impacted individuals with employment, transportation, resources, referrals, and other services needed to rebuild stability.',
    body: 'LOOP supports individuals returning home after incarceration by connecting them with resources, services and opportunities that promote stability, independence, and successful reintegration into the community.',
    includes: [
      'Employment resource connections',
      'Transportation resources',
      'Community referrals',
      'Practical support for rebuilding stability',
    ],
    image: media.connection,
    supportType: 'Reentry services',
    order: 4,
  },
  {
    slug: 'youth-entrepreneurship-education',
    title: 'Youth Entrepreneurship & Education',
    shortTitle: 'Youth Entrepreneurship & Education',
    category: 'Youth & opportunity',
    summary:
      'Hands-on programs that introduce middle and high school students to entrepreneurship, financial literacy, business development, leadership, teamwork, and career possibilities.',
    body: 'LOOP empowers middle and high school youth with entrepreneurial education, financial literacy, and hands on experience. Through our programs and camps, youth learn how to turn ideas into real businesses and build brighter futures.',
    includes: [
      'Academic enrichment and mentorship',
      'Entrepreneurship and business development',
      'Financial literacy and budgeting',
      'Leadership and teamwork',
      'Free six-week Summer Academic and Entrepreneurship Camp for 20 youth',
      'Business launch at the LOOP Youth Business Expo',
    ],
    image: media.youth,
    supportType: 'Youth programs',
    order: 5,
  },
  {
    slug: 'family-support',
    title: 'Family Support',
    shortTitle: 'Family Support',
    category: 'Family & connection',
    summary:
      'Supporting families impacted by incarceration and the justice system through resources, referrals, events, transportation, and community-based support.',
    body: 'Supporting families impacted by incarceration and the justice system through resources, referrals, events, transportation, and community-based support.',
    includes: [
      'Family resource connections',
      'Referrals and navigation',
      'Transportation connections',
      'Community-based events and support',
    ],
    image: media.family,
    supportType: 'Family support',
    order: 6,
  },
  {
    slug: 'community-outreach-events',
    title: 'Community Outreach & Events',
    shortTitle: 'Community Outreach & Events',
    category: 'Guidance & connection',
    summary:
      'Community resource events, care markets, youth forums, outreach campaigns, volunteer projects, and other grassroots initiatives.',
    body: 'Community resource events, care markets, youth forums, outreach campaigns, volunteer projects, and other grassroots initiatives.',
    includes: [
      'Community resource events and care markets',
      'Youth forums',
      'Outreach campaigns',
      'Volunteer projects and grassroots initiatives',
    ],
    image: media.community,
    supportType: 'Other',
    order: 7,
  },
];
