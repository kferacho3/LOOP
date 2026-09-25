import type { MetadataRoute } from 'next';
import { getSiteUrl,isIndexingEnabled } from '@/lib/content';
export default function robots():MetadataRoute.Robots{return isIndexingEnabled()?{rules:{userAgent:'*',allow:'/',disallow:['/api/','/get-help','/privacy']},sitemap:`${getSiteUrl()}/sitemap.xml`}:{rules:{userAgent:'*',disallow:'/'}};}
