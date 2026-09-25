# Updating LOOP without a developer

## First-time CMS setup (technical owner)

Create a Sanity project owned by LOOP, choose a dataset, and grant editorial access only to authorized staff. The `studio/` directory is a separate application: it does not add the CMS editor to the public website JavaScript bundle.

```bash
cd studio
cp .env.example .env
# Fill SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET.
npm install
npm run dev
```

Run `npm run seed` **once against a new, empty production dataset** to import the brief-based seven programs and initial website copy. The included `seed.ndjson` contains no statistics, events, testimonials, active locations, partner logos or private requests. It does not import images; the website's reviewed image catalog remains the fallback. Do not rerun seed against an edited dataset without exporting a backup and reviewing ID conflicts. For another dataset, run `npx sanity dataset import seed.ndjson YOUR_DATASET` rather than the production seed command.

Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and the optional private-dataset read token on the public Next.js project. Add the local/hosted Studio origins to the Sanity project's CORS settings as required. Deploy Studio with `npm run deploy` from `studio/`, following Sanity's authenticated CLI flow. Record the resulting Studio address for staff. Host permissions and dataset visibility must be reviewed before launch. Source: [Sanity Studio installation](https://www.sanity.io/docs/studio/installation).

## Everyday editing

Sign in to the hosted Studio. Open the relevant document, make the change, and use **Publish** when approved. The website reads published content with a sixty-second revalidation interval; allow at least one subsequent page request and a cache refresh before expecting every visitor to see a change. A failed CMS request falls back to bundled content rather than leaving a blank homepage. This is not a realtime visual page builder.

**Website settings** controls the two hero headline lines, supporting copy, image, mission copy, availability note, announcement, public contact details, donation link, social links, and owner-approved privacy notice. Environment values take precedence over CMS contact, donation and social fields; remove an override from Vercel when editorial control should return to the CMS.

**Programs** controls descriptions, card labels, images, order, included support areas and the request category preselected by the program button. All seven brief programs remain in the site when you edit only one. Add a new program document for future expansion. The seven original slugs should remain stable; changing them creates a new URL and does not remove the original fallback program. A developer should add redirects for intentional URL migrations.

**Events** requires a real date, real timezone, venue details, and the confirmation switch. Unconfirmed or draft events never appear. The site automatically lists upcoming events, offers detail pages and generates calendar files. Use an approved external registration URL when available. Do not create plausible example events in the production dataset.

**Verified impact** requires a numeric value, reporting period, source/methodology note, and approval. The source is displayed publicly: never insert case notes, private spreadsheet links, names, or confidential material. Empty impact is an intentional state until verified records exist.

**Community stories** requires confirmed publication permission. Approve the copy and photos, avoid unnecessary information about someone's circumstances, and verify guardian permission when applicable. Store private release documents elsewhere, not in this public-content dataset. Stock photography does not substitute for a participant release or real testimonial.

**Service locations** requires an actual operating area and the Active switch. A plan to expand does not make a location active. Use this model as LOOP grows; do not present the current brief's aspiration as an existing multi-state operation.

## Images and accessibility

Upload a permission-cleared image, write a concise factual alt description, fill the photographer/credit link, and indicate whether it is illustrative stock. The current website uses the explicit focal-position field such as `50% 30%`; the Sanity hotspot interface is available, but its coordinate is not separately transformed by this implementation. Check both desktop and mobile crops after publication.

The site uses all photographs naturally inside sections; it does not require a separate giant gallery. Avoid humiliating, sensational, savior-framed, or institutional imagery. Do not place an identifiable stock subject next to copy that implies the person was incarcerated, homeless, received help from LOOP, or endorses LOOP. Review Pexels' terms for each intended context. [Pexels license](https://www.pexels.com/license/).

## Support and email updates are not CMS content

Staff receive active form requests in the approved inbox. The website CMS is not a support queue, legal case record, or CRM. Limit inbox access, review provider retention, and establish follow-up responsibility before activation. Do not publish a guaranteed response time unless LOOP can meet it.

Newsletter submissions are **requests delivered to the staff inbox**, not automatic campaign subscriptions. Staff must use LOOP's approved email platform, preserve consent, provide unsubscribe handling, and establish any required confirmation process. Automated list synchronization is intentionally not invented without a selected platform.
