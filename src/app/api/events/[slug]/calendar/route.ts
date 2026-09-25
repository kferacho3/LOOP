import { getSiteContent,getSiteUrl } from '@/lib/content';
import { createCalendarEvent } from '@/lib/calendar';
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {events}=await getSiteContent();const event=events.find(e=>e.slug===slug);if(!event)return new Response('Event not found',{status:404});return new Response(createCalendarEvent(event,getSiteUrl()),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':`attachment; filename="loop-${event.slug}.ics"`,'Cache-Control':'public, max-age=60'}});}
