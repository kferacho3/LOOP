export function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}
/** External editor-provided links are never rendered without validation. */
export function safeHttpsUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return undefined;
    return url.href;
  } catch { return undefined; }
}
export function slugify(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function eventDate(date: string, timeZone: string): string {
  try { return new Intl.DateTimeFormat('en-US', { month:'long', day:'numeric', year:'numeric', timeZone }).format(new Date(date)); }
  catch { return 'Date to be confirmed'; }
}
