import 'server-only';
import { cache } from 'react';
import { programs } from '@/content/programs';
import { media } from '@/content/media';
import { safeHttpsUrl } from './utils';
import type { SiteContent, SiteSettings, Program, ImageAsset, CommunityEvent, Story, Impact, Location } from './types';

type Row = Record<string, unknown>;
const record = (v: unknown): Row => v !== null && typeof v === 'object' && !Array.isArray(v) ? v as Row : {};
const text = (r: Row, k: string, fallback = ''): string => typeof r[k] === 'string' ? (r[k] as string).slice(0, 30000) : fallback;
const rows = (v: unknown): Row[] => Array.isArray(v) ? v.slice(0, 200).map(record) : [];
const validSlug = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length <= 96;
const validDate = (s: string) => Number.isFinite(Date.parse(s));
const validZone=(s:string)=>{try{new Intl.DateTimeFormat('en-US',{timeZone:s}).format();return s;}catch{return 'America/New_York';}};
function image(v: unknown, fallback: ImageAsset): ImageAsset {
  const r = record(v); const src = text(r, 'src');
  const local = /^\/images\/[a-z0-9_./-]+\.(?:webp|avif|png|jpe?g|svg)$/i.test(src) && !src.includes('..');
  let remote = false;
  try { remote = ['images.pexels.com','images.unsplash.com','cdn.sanity.io'].includes(new URL(src).hostname) && new URL(src).protocol === 'https:'; } catch { /* local */ }
  if (!local && !remote) return fallback;
  return { src, alt:text(r, 'alt', fallback.alt), stock:r.stock !== false, credit:text(r,'credit'), creditUrl:safeHttpsUrl(r.creditUrl), position:/^\d{1,3}% \d{1,3}%$/.test(text(r,'position')) ? text(r,'position') : '50% 50%' };
}
function defaults(): SiteContent {
  return {
    settings: {
      heroTitle:'Possibility,', heroEmphasis:'within reach.',
      heroBody:'LOOP helps youth, families, and justice-impacted people take their next step through housing support, reentry, education, and community resources.',
      heroImage:media.hero,
      aboutBody:'LOOP — Liberation of Oppressed People — helps youth, families, and justice-impacted individuals overcome barriers through housing, reentry, education, transportation, employment, family support, and community resources.',
      serviceNote:'Program availability and service areas are confirmed individually. Sending a request does not guarantee services or reserve a place.',
      contactEmail:process.env.CONTACT_EMAIL || '', contactPhone:process.env.CONTACT_PHONE || '',
      donationUrl:safeHttpsUrl(process.env.DONATION_URL),
      instagram:safeHttpsUrl(process.env.INSTAGRAM_URL), facebook:safeHttpsUrl(process.env.FACEBOOK_URL), linkedin:safeHttpsUrl(process.env.LINKEDIN_URL)
    }, programs, events:[], stories:[], impact:[], locations:[]
  };
}
/** Published public content only. Sensitive requests are NEVER written to this CMS. */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const fallback = defaults();
  const project = process.env.SANITY_PROJECT_ID, dataset = process.env.SANITY_DATASET || 'production';
  if (!project || !/^[a-z0-9-]+$/.test(project) || !/^[a-z0-9_-]+$/.test(dataset)) return fallback;
  const published = '!(_id in path("drafts.**"))';
  const img = '{"src":asset->url,alt,credit,creditUrl,stock,position}';
  const query = `{
    "settings": *[_type == "siteSettings" && ${published}][0]{...,"heroImage":heroImage${img}},
    "programs": *[_type == "program" && ${published}] | order(order asc){...,"slug":slug.current,"image":image${img}},
    "events": *[_type == "event" && confirmed == true && ${published}] | order(startsAt asc){...,"slug":slug.current,"image":image${img}},
    "stories": *[_type == "story" && consentApproved == true && ${published}] | order(publishedAt desc){...,"slug":slug.current,"image":image${img}},
    "impact": *[_type == "impact" && approved == true && ${published}]{label,value,period,source},
    "locations": *[_type == "location" && active == true && ${published}]{...,"slug":slug.current}
  }`;
  try {
    const version = /^\d{4}-\d{2}-\d{2}$/.test(process.env.SANITY_API_VERSION || '') ? process.env.SANITY_API_VERSION! : '2025-02-19';
    const url = `https://${project}.api.sanity.io/v${version}/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {next:{revalidate:60}, headers: process.env.SANITY_API_READ_TOKEN ? {Authorization:`Bearer ${process.env.SANITY_API_READ_TOKEN}`} : {}, signal:AbortSignal.timeout(4000)});
    if (!response.ok) return fallback;
    const data = record(record(await response.json()).result); const s = record(data.settings);
    const settings: SiteSettings = {...fallback.settings,
      heroTitle:text(s,'heroTitle',fallback.settings.heroTitle), heroEmphasis:text(s,'heroEmphasis',fallback.settings.heroEmphasis),
      heroBody:text(s,'heroBody',fallback.settings.heroBody), heroImage:image(s.heroImage,media.hero),
      aboutBody:text(s,'aboutBody',fallback.settings.aboutBody), serviceNote:text(s,'serviceNote',fallback.settings.serviceNote),
      contactEmail:process.env.CONTACT_EMAIL || text(s,'contactEmail'), contactPhone:process.env.CONTACT_PHONE || text(s,'contactPhone'),
      donationUrl:safeHttpsUrl(process.env.DONATION_URL || s.donationUrl), announcement:text(s,'announcement'), privacyNotice:text(s,'privacyNotice'),
      instagram:safeHttpsUrl(process.env.INSTAGRAM_URL || s.instagram), facebook:safeHttpsUrl(process.env.FACEBOOK_URL || s.facebook), linkedin:safeHttpsUrl(process.env.LINKEDIN_URL || s.linkedin)
    };
    const cmsPrograms: Program[] = rows(data.programs).filter(r => validSlug(text(r,'slug')) && text(r,'title')).map((r,i) => {
      const original = programs.find(p=>p.slug===r.slug) || programs[0];
      return {slug:text(r,'slug'), title:text(r,'title'), shortTitle:text(r,'shortTitle',text(r,'title')), category:text(r,'category','Community support'), summary:text(r,'summary'), body:text(r,'body'), includes:Array.isArray(r.includes) ? r.includes.filter((x):x is string=>typeof x==='string').slice(0,12) : [], image:image(r.image,original.image), supportType:text(r,'supportType','Other'), order:typeof r.order==='number'?r.order:i};
    });
    // Editing one program never silently removes the other six brief programs.
    const merged = [...programs.map(p=>cmsPrograms.find(c=>c.slug===p.slug)||p), ...cmsPrograms.filter(c=>!programs.some(p=>p.slug===c.slug))].sort((a,b)=>a.order-b.order);
    const events: CommunityEvent[] = rows(data.events).filter(r=>validSlug(text(r,'slug')) && text(r,'title') && validDate(text(r,'startsAt'))).map(r=>({slug:text(r,'slug'), title:text(r,'title'), description:text(r,'description'), startsAt:text(r,'startsAt'), endsAt:validDate(text(r,'endsAt'))&&Date.parse(text(r,'endsAt'))>Date.parse(text(r,'startsAt'))?text(r,'endsAt'):undefined, timeZone:validZone(text(r,'timeZone','America/New_York')), location:text(r,'location','Location to be confirmed'), category:text(r,'category','Community'), registrationUrl:safeHttpsUrl(r.registrationUrl), image:image(r.image,media.community)}));
    const stories: Story[] = rows(data.stories).filter(r=>validSlug(text(r,'slug'))&&text(r,'title')).map(r=>({slug:text(r,'slug'),title:text(r,'title'),excerpt:text(r,'excerpt'),body:text(r,'body'),image:image(r.image,media.community),publishedAt:text(r,'publishedAt')}));
    const impact: Impact[] = rows(data.impact).filter(r=>typeof r.value==='number'&&Number.isFinite(r.value)&&r.value>=0&&text(r,'source')&&text(r,'period')).map(r=>({label:text(r,'label'),value:r.value as number,source:text(r,'source'),period:text(r,'period')}));
    const locations: Location[] = rows(data.locations).filter(r=>validSlug(text(r,'slug'))&&text(r,'name')).map(r=>({slug:text(r,'slug'),name:text(r,'name'),description:text(r,'description'),serviceArea:text(r,'serviceArea'),contactEmail:text(r,'contactEmail')}));
    return {settings,programs:merged,events,stories,impact,locations};
  } catch { return fallback; } // Do not leak tokens, request content, or provider errors.
});
export function getSiteUrl(): string {
  try { const u = new URL(process.env.SITE_URL || 'http://localhost:3000'); return ['https:','http:'].includes(u.protocol) ? u.origin : 'http://localhost:3000'; }
  catch { return 'http://localhost:3000'; }
}
export function formsReady(): boolean {
  const base = process.env.FORMS_ENABLED==='true' && !!process.env.RESEND_API_KEY && !!process.env.FORM_TO_EMAIL && !!process.env.FORM_FROM_EMAIL;
  if (process.env.NODE_ENV!=='production') return base;
  return base && !!process.env.TURNSTILE_SECRET_KEY && !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN && (process.env.RATE_LIMIT_SALT?.length || 0)>=32 && process.env.SITE_READY==='true';
}

/** Operational readiness is distinct from whether a preview may be indexed. */
export function isIndexingEnabled(): boolean {
  return process.env.SITE_READY==='true' && !['preview','development'].includes(process.env.VERCEL_ENV || '');
}
