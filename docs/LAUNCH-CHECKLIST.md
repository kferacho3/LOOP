# Launch checklist

The source implementation is complete enough to install and validate; the organization and its live service connections are not supplied by a ZIP. Do not turn on public support requests until the following gates are closed.

## Build and runtime

- [ ] Install root dependencies on a network-connected Node 22 machine. Review the resolved dependency graph and advisories; commit the generated lockfile.
- [ ] Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. Fix any installation, version-specific API, lint or type errors before deployment.
- [ ] Run the supplied Playwright suite against the actual Next production build, including axe checks. Test Safari/iOS and Android manually; Chromium screenshots alone are insufficient.
- [ ] Verify direct deep links, browser Back, route change cleanup, native mobile dialog, keyboard focus restoration, reduced motion and browser zoom to 200%.
- [ ] Test slow network, broken photo URL, unavailable CMS, empty events, no donation provider, repeated submit and provider errors.
- [ ] Measure real LCP, INP and CLS. Targets are not passed results. Inspect JavaScript/image sizes and long tasks on an ordinary mobile device.

## Organization and content

- [ ] Approve the new visual identity and provisional logo; replace with LOOP's existing approved mark when provided.
- [ ] Confirm public organization name, domain, contacts, real services and actual service areas. The brief's growth aspiration is not existing multi-state coverage.
- [ ] Approve every program description. Do not imply legal representation, guaranteed housing, reserved transportation or emergency response.
- [ ] Obtain permission-cleared LOOP photographs or manually approve stock suitability, image IDs, photographer credits, crops and alt text. Cache production images using `media:download` or upload them through Sanity.
- [ ] Publish only confirmed events; verify timezone, venue and registration link. Test calendar downloads in a real calendar app.
- [ ] Publish only sourced impact, permission-cleared stories and operating locations. No fabricated statistics or testimonials.
- [ ] Supply an owner-approved privacy policy, privacy contact, retention/deletion process, consent practice, inbox access rules and policies for inquiries involving minors. The bundled policy is a review draft, not legal advice or a finished organizational policy.
- [ ] Define who monitors each form and follows up. Do not promise a response time without operational approval.

## Provider activation

- [ ] Verify Resend sender domain and test inbox receipt, reply-to and chosen-contact labels.
- [ ] Configure Turnstile for exact allowed hosts and test server-side rejection as well as successful verification.
- [ ] Verify the Upstash atomic rate limiter and expiration; failure must reject submission rather than silently bypass protection.
- [ ] Use separate Preview/Development credentials and a test inbox. Never run end-to-end tests into a real support queue.
- [ ] Select an approved mailing platform/workflow. The current email-updates form emails staff; it is not an automated campaign/list integration.
- [ ] Add the verified HTTPS donation provider URL. Test both one-time and recurring donation options on that provider, when offered. The LOOP site itself accepts no card details.
- [ ] Configure CMS project, dataset, staff permissions and published-content read access. Keep private intake and release documents out of the CMS.
- [ ] Keep analytics off until approved. When enabled, verify excluded paths and stripped URL parameters in browser network tools.

## Deployment and governance

- [ ] Set the canonical HTTPS `SITE_URL`, actual contacts, Secret/Config values and provider settings in Vercel; redeploy after changes.
- [ ] Enable `SITE_READY` and `FORMS_ENABLED` only after testing. Preview is kept non-indexable independently of readiness through `VERCEL_ENV`.
- [ ] Confirm HTTPS, security headers, third-party challenge loading and error handling on the real domain. The shipped static-compatible CSP permits inline scripts; it is not a nonce-based strict CSP.
- [ ] Restrict staff/provider accounts, enable MFA and document incident, deletion, key-rotation and rollback ownership.
- [ ] Review robots/sitemap, social preview, favicon at 16/32 px, search metadata, actual contact/donation links and missing-page responses.
- [ ] Connect Search Console to the real owner-controlled domain; submit the generated sitemap only when indexing is enabled.

## Deliberately not included

No CRM/case database, private document upload, login for service recipients, eligibility engine, payment processing, automatic newsletter campaigns, multilingual translations, or guaranteed organizational response SLA is invented. Add these only with clear requirements and provider/operational approval, rather than disguising a placeholder as an integration.
