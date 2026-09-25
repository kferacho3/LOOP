# Environment and Vercel deployment

## 1. Local development

The project ZIP includes a root `.env` with empty credential slots. Open it in your editor, paste values after `=`, save, and restart `npm run dev`. Do not commit it. Share `.env.example`, never the filled file. Wrap a sender with a display name in quotes, for example:

```dotenv
FORM_FROM_EMAIL="LOOP Website <website@YOUR_VERIFIED_DOMAIN>"
```

That is syntax guidance, not an approved LOOP address. Use the real domain and inbox. `SITE_URL` must be the public canonical HTTPS origin in production, without a path.

## 2. Where to set variables in Vercel

Import your repository as a **Next.js** project. Root Directory is the root of this project, not `studio/`. Use Node 22, the normal `next build` command (`npm run build`), and the framework's default output settings. Do not set an arbitrary output directory.

Open the project, then **Environment Variables** (or Settings → Environment Variables, depending on the dashboard layout). For each key choose its **Type: Config or Secret** and the intended Production, Preview, or Development environments. A Secret is write-only after saving; Config remains readable by authorized members. Vercel's current documentation explicitly allows Secrets in Development, reversing the older Sensitive-variable restriction. Do not follow old instructions saying Development cannot use secrets.

A variable's Vercel Type does not determine browser exposure: `NEXT_PUBLIC_` variables are public client configuration and must contain no credentials. Next.js inlines them at build time. Redeploy after changing configuration, especially public variables, readiness flags, CMS configuration, or anything used in statically generated content. Source: [Vercel Config and Secret documentation](https://vercel.com/docs/environment-variables/sensitive-environment-variables), updated August 28, 2026, and [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).

## 3. Exact variable map

| Variable | Vercel type | Purpose and required value |
|---|---|---|
| `SITE_URL` | Config | Canonical HTTPS origin. Local default is `http://localhost:3000`. |
| `SITE_READY` | Config | `false` initially. Set `true` only after operational/content/privacy approval. Required for production-mode form delivery. |
| `FORMS_ENABLED` | Config | `false` initially; `true` after staff inbox and anti-abuse providers are tested. |
| `CONTACT_EMAIL` | Config | Approved public contact email. May instead be set in Sanity. |
| `CONTACT_PHONE` | Config | Optional approved public phone. May instead be set in Sanity. |
| `DONATION_URL` | Config | Approved hosted HTTPS donation page; blank keeps payments unavailable. May instead be set in Sanity. |
| `INSTAGRAM_URL` | Config | Optional official HTTPS profile, otherwise no icon is shown. |
| `FACEBOOK_URL` | Config | Optional official HTTPS profile. |
| `LINKEDIN_URL` | Config | Optional official HTTPS profile. |
| `RESEND_API_KEY` | **Secret** | Resend credential with permission to send from the verified domain. |
| `FORM_TO_EMAIL` | Config | One monitored recipient inbox. Use a test inbox in Preview. |
| `FORM_FROM_EMAIL` | Config | Sender approved in Resend, optionally `LOOP Website <sender@domain>`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Config | Public widget site key. Allow the actual deployed hostnames in Cloudflare. |
| `TURNSTILE_SECRET_KEY` | **Secret** | Server-side Turnstile verification secret. |
| `UPSTASH_REDIS_REST_URL` | Config | HTTPS REST endpoint for a dedicated shared rate-limit database. |
| `UPSTASH_REDIS_REST_TOKEN` | **Secret** | Token permitted to run the bounded INCR/EXPIRE Lua command. |
| `RATE_LIMIT_SALT` | **Secret** | Random secret at least 32 characters long, never a person's name or a shared password. |
| `PEXELS_API_KEY` | **Secret**, when used in Vercel | Normally **local only**, because editorial scripts fetch/copy images before deployment. Not required by the public site. |
| `SANITY_PROJECT_ID` | Config | Optional Sanity project identifier for published public content. |
| `SANITY_DATASET` | Config | Usually `production`; use a separate dataset for preview experiments. |
| `SANITY_API_VERSION` | Config | Pinned Content Lake API date, default `2025-02-19`. |
| `SANITY_API_READ_TOKEN` | **Secret** | Only needed for a private dataset. Read-only; never give the public frontend a write token. |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Config | `false` initially. Set `true` only after approval and enable Web Analytics on the Vercel project. |

Sanity Studio has its **own** `studio/.env`, copied from `studio/.env.example`. `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` are public configuration identifiers. Do not put a write token in the Studio browser bundle. Staff sign in through Sanity's own authenticated access controls.

Generate a strong salt locally without revealing it in a shared log:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Paste the output into the Secret field and your private local `.env`.

## 4. Safe activation order

First deploy with `SITE_READY=false` and `FORMS_ENABLED=false`. The complete public UI renders, forms are visibly unavailable, indexing is disabled, and donations remain unavailable unless an approved URL exists.

Create the verified Resend sender and monitored inbox. Configure Turnstile for exact hosts and a dedicated Upstash database. Set all required variables. Test in a protected Preview with test-only inbox/credentials and `SITE_READY=true`, `FORMS_ENABLED=true`. Preview deployments remain `noindex` through `VERCEL_ENV`, independently of readiness. Never direct development form tests to a real support queue.

Confirm real delivery, preferred-contact labels, timeout/error preservation, rate limiting, anti-bot failures, mobile completion, and mailbox access. Then repeat with Production credentials, approve the public policy/content, set readiness flags, and redeploy. Run `npm run verify:launch`; its success checks configuration shape only and does not replace end-to-end tests or policy review.

Use distinct production credentials rather than granting all environments the same provider account access. Vercel can also enforce separate production values through its team policy. Sources: [Vercel documentation](https://vercel.com/docs/environment-variables/sensitive-environment-variables), [Cloudflare server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Resend Next.js guide](https://resend.com/docs/send-with-nextjs).

## 5. How the credentials are used

A support request travels from the browser to `/api/forms`, passes JSON/size/origin/schema checks, passes a shared rate limit and server-side Turnstile verification, and is sent through Resend. Only then does the browser show success. Resend failure is not replaced with a pretend confirmation. The request is not stored in the public CMS or browser local storage.

The code uses a ten-minute salted-IP counter, six attempts per window, across all forms. Test accessibility for shared households and shared public connections before changing this policy. It is a starting anti-abuse policy, not a universal fraud solution. Cloudflare and infrastructure providers can have their own logs; do not claim there is no IP processing anywhere.

The Pexels key is only for local photo curation. No API key is needed to display reviewed, locally stored photographs. A donation platform URL is configuration, not a Secret; this application has no Stripe, PayPal, or donor card credentials because it does not process payments.
