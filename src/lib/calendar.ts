export function escapeCalendarText(value:string):string{return value.replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
export function utcCalendarDate(value:string):string{return new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
/** RFC 5545 line folding uses UTF-8 octets, not JS code units. */
export function foldCalendarLine(line:string):string{
  const encoder=new TextEncoder();let result='',current='',bytes=0;
  for(const char of line){const size=encoder.encode(char).length;if(bytes+size>75){result+=current+'\r\n';current=' ';bytes=1;}current+=char;bytes+=size;}
  return result+current;
}
export function createCalendarEvent(event:{slug:string;title:string;description:string;startsAt:string;endsAt?:string;location:string},siteUrl:string,now=new Date()):string{
  const host=new URL(siteUrl).hostname;
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//LOOP//Community Events//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${event.slug}@${host}`,`DTSTAMP:${utcCalendarDate(now.toISOString())}`,`DTSTART:${utcCalendarDate(event.startsAt)}`,...(event.endsAt?[`DTEND:${utcCalendarDate(event.endsAt)}`]:[]),`SUMMARY:${escapeCalendarText(event.title)}`,`DESCRIPTION:${escapeCalendarText(event.description)}`,`LOCATION:${escapeCalendarText(event.location)}`,`URL:${siteUrl}/events/${event.slug}`,'END:VEVENT','END:VCALENDAR'];
  return lines.map(foldCalendarLine).join('\r\n')+'\r\n';
}
