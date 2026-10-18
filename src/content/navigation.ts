export const navigation = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Story & Mission', href: '/about' },
      { label: 'People Behind LOOP', href: '/about/people' },
      { label: 'Community Voices', href: '/stories' },
      { label: 'Our Approach & Values', href: '/about#approach' },
    ],
  },
  {
    label: 'What We Do',
    href: '/programs',
    children: [
      { label: 'Explore All Programs', href: '/programs' },
      {
        label: 'Youth Education & Entrepreneurship',
        href: '/programs/youth-entrepreneurship-education',
      },
      { label: 'Court & Family Support', href: '/programs/court-community-support' },
      { label: 'Visitation Transportation', href: '/programs/visitation-transportation' },
      { label: 'Reentry Support', href: '/programs/reentry-support' },
      { label: 'Housing & Stability', href: '/programs/housing-support-stability' },
      { label: 'Summer Camp', href: '/programs/summer-camp' },
    ],
  },
  { label: 'Community Initiatives', href: '/community-initiatives' },
  { label: 'Ways to Give', href: '/ways-to-give' },
  { label: 'Careers', href: '/careers' },
];
