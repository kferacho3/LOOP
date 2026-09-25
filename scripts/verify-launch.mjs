/** Non-destructive config audit: never prints secret values or sends test emails. */
const env=process.env;const issues=[];const warnings=[];
const required=['SITE_URL','CONTACT_EMAIL','RESEND_API_KEY','FORM_TO_EMAIL','FORM_FROM_EMAIL','NEXT_PUBLIC_TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','RATE_LIMIT_SALT'];
for(const key of required)if(!env[key])issues.push(`${key} is missing`);
try{const u=new URL(env.SITE_URL||'');if(u.protocol!=='https:'||u.hostname==='localhost')issues.push('SITE_URL must be the canonical public HTTPS origin');}catch{issues.push('SITE_URL is not a valid URL');}
for(const key of ['CONTACT_EMAIL','FORM_TO_EMAIL'])if(env[key]&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env[key]))issues.push(`${key} must contain one email address`);
if((env.RATE_LIMIT_SALT?.length||0)<32)issues.push('RATE_LIMIT_SALT needs at least 32 random characters');
if(env.DONATION_URL){try{if(new URL(env.DONATION_URL).protocol!=='https:')issues.push('DONATION_URL must use HTTPS');}catch{issues.push('DONATION_URL is invalid');}}else warnings.push('Donation checkout remains intentionally unavailable until DONATION_URL is configured');
if(!env.SANITY_PROJECT_ID)warnings.push('CMS is disconnected; bundled content is being used');
if(env.SITE_READY!=='true')warnings.push('SITE_READY=false: indexing is disabled and production forms remain unavailable');
if(env.FORMS_ENABLED!=='true')warnings.push('FORMS_ENABLED=false: requests cannot be submitted');
console.log('LOOP launch configuration audit');
for(const issue of issues)console.error(`REQUIRED: ${issue}`);
for(const warning of warnings)console.warn(`NOTE: ${warning}`);
console.log('Manual gates: approve privacy/retention, verify provider domain and inbox access, test every form, confirm real service areas, clear image rights, run npm run check and browser tests. This audit does not certify security or legal compliance.');
process.exitCode=issues.length?1:0;
