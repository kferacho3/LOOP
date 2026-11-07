import type { StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';
import type { SiteSettings } from '@/lib/types';
import arenaScoreboard from './hero-photos/arena-scoreboard.webp';
import arenaSeats from './hero-photos/arena-seats.webp';
import blueConcourse from './hero-photos/blue-concourse.webp';
import blueSteps from './hero-photos/blue-steps.webp';
import illuminatedSteps from './hero-photos/illuminated-steps.webp';
import intuitDome from './hero-photos/intuit-dome.webp';
import limeStands from './hero-photos/lime-stands.webp';
import magentaStands from './hero-photos/magenta-stands.webp';

export type HeroSlide = {
  label: string;
  title: string;
  emphasis: string;
  body: string;
  link: { href: string; text: string };
  photo: StaticImageData;
  alt: string;
  // Frame each photograph without changing the supplied original.
  crop?: Pick<CSSProperties, 'transform' | 'transformOrigin' | 'filter'>;
};

export function getHomeHeroSlides(settings: SiteSettings): HeroSlide[] {
  return [
    {
      label: 'Liberation of Oppressed People',
      title: settings.heroTitle,
      emphasis: settings.heroEmphasis,
      body: settings.heroBody,
      link: { href: '/get-help', text: 'Find your next step' },
      photo: intuitDome,
      alt: 'A group poses outside the Intuit Dome beneath the illuminated arena sign.',
      crop: { transform: 'rotate(-3.2deg) scale(1.08)', filter: 'brightness(1.12)' },
    },
    {
      label: 'Community outings',
      title: 'Showing up',
      emphasis: 'together.',
      body: 'Shared outings give young people and families time to connect, have fun, and make memories together.',
      link: { href: '/community-initiatives', text: 'Explore initiatives' },
      photo: blueSteps,
      alt: 'A group in LOOP shirts poses on the arena steps as they light up blue.',
      crop: { transform: 'rotate(1deg) scale(1.027)', filter: 'brightness(1.12) contrast(0.96)' },
    },
    {
      label: 'Community initiatives',
      title: 'A place',
      emphasis: 'to belong.',
      body: 'From outings to local resource drives, LOOP brings neighbors together. See how the coat drive puts that care into practice.',
      link: { href: '/community-initiatives/coat-drive', text: 'See the coat drive' },
      photo: magentaStands,
      alt: 'Friends smile from their arena seats under magenta lights.',
      crop: { transform: 'scale(1.05)', transformOrigin: '66% 66%' },
    },
    {
      label: 'Youth education',
      title: 'Room to',
      emphasis: 'dream bigger.',
      body: 'Through education, mentorship, and entrepreneurship, young people can build skills and put their ideas into practice.',
      link: { href: '/programs/youth-entrepreneurship-education', text: 'Youth programs' },
      photo: arenaSeats,
      alt: 'Young people in LOOP shirts and sweatshirts sit together in the arena stands.',
      crop: { transform: 'scale(1.035)', transformOrigin: '55% 62%' },
    },
    {
      label: 'Summer camp',
      title: 'Ideas into',
      emphasis: 'action.',
      body: 'At LOOP’s summer camp, young people learn how to turn their own ideas into businesses.',
      link: { href: '/programs/summer-camp', text: 'Explore summer camp' },
      photo: blueConcourse,
      alt: 'Young people give peace signs and a thumbs up under blue lanterns.',
      crop: { transform: 'scale(1.04)', transformOrigin: '45% 56%', filter: 'brightness(1.1)' },
    },
    {
      label: 'Support and resources',
      title: 'Support',
      emphasis: 'starts here.',
      body: 'If you’re looking for housing, family, or reentry support, LOOP can help you explore what’s available and where to begin.',
      link: { href: '/get-help', text: 'Explore support' },
      photo: limeStands,
      alt: 'A group in the stands watches the game as green light washes over the seats.',
      crop: { transform: 'scale(1.055)', transformOrigin: '66% 65%' },
    },
    {
      label: 'Community partnerships',
      title: 'More than',
      emphasis: 'a game.',
      body: 'Local partnerships help make outings and community programs possible. See how your organization can get involved.',
      link: { href: '/partner', text: 'Partner with LOOP' },
      photo: arenaScoreboard,
      alt: 'Fans cheer on the arena scoreboard above the basketball court.',
      crop: { transform: 'rotate(0.55deg) scale(1.02)' },
    },
    {
      label: 'Volunteer with LOOP',
      title: 'Make more',
      emphasis: 'possible.',
      body: 'Give your time, share a skill, or help with a community event. There’s a place for you to pitch in.',
      link: { href: '/volunteer', text: 'Volunteer with LOOP' },
      photo: illuminatedSteps,
      alt: 'A group wearing LOOP shirts sits together on steps lit in red and blue.',
      crop: { transform: 'rotate(-2.4deg) scale(1.06)', filter: 'brightness(1.08)' },
    },
  ];
}
