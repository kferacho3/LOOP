# LOOP community brand refresh

## Editing the brand
Open `/brand-preview` (also linked in the footer). Four coordinated palettes apply to all pages, persist in this browser, and can be shared with `?theme=plum|forest|indigo|earth`. Reset restores the published default. Update `DEFAULT_PALETTE` in `src/content/brand.ts` to publish a new default; semantic color values live in `src/app/globals.css`.

## Content
Homepage: coat drive first, short nonprofit mission, programs, summer camp, involvement.
About: full mission, lived-experience story, approach, Community / Access / Empowerment.
Community Initiatives: coat drive plus the existing published CMS event listing. Existing `/events` redirects permanently; event detail URLs remain intact.
New pages: People Behind LOOP, Community Voices (uses consent-approved CMS stories), Ways to Give, Careers, Summer Camp. No invented staff, vacancies, testimonials, schedules, addresses, impact totals, or tax claims.
One Warm Coat seal is the user-supplied original in `public/partners/one-warm-coat.png`.

## Donations
PayPal hosted donation page was created in the signed-in Liberation Of Oppressed People account on October 18, 2026. Public ID: `YA7K68U65KJGQ`. `DONATION_URL` must be `https://www.paypal.com/donate/?hosted_button_id=YA7K68U65KJGQ`.
One-time, donor-selected USD amount; fee-offset upsell disabled. Cancel returns to `/donate`; completion returns to `/donate/thank-you`. The return page does not assert a verified payment: the PayPal receipt and merchant activity are authoritative. No card information or PayPal credentials are handled by the site. A real $10 donation is reserved for the owner to perform; it has not been charged by this work.

## Email and SEO
Public contact: `info@loopcares.org`; phone `(323) 985-2116`. Set `CONTACT_EMAIL` and `FORM_TO_EMAIL` accordingly. GoDaddy mailbox was already provisioning at inspection; provider activation and a real send/receive check must complete before declaring it operational. Form delivery requires the existing Resend, Turnstile, Redis and readiness configuration; changing a recipient alone does not activate it.
Production canonical URL: `https://www.loopcares.org`. Production `SITE_INDEXING_ENABLED=true` enables robots and sitemap independently of form readiness. Preview/development remain noindex. Unique page descriptions, canonical URLs, NGO structured data, descriptive headings and alt text are included. Do not assert tax-exempt status or a registration number without documentation.

## Outstanding editorial information
Coat collection dates, hours and confirmed drop-off instructions; camp dates/location and enrollment; team biographies; approved community stories; any current job listings. Visitors can contact LOOP while these details are finalized.
