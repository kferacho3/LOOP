# LOOP — Possibility, within reach.

A complete source project for Liberation of Oppressed People: a warm, editorial nonprofit website built with Next.js App Router, React, strict TypeScript, Tailwind CSS 4, and progressive GSAP motion. The nine core pages and all seven program detail pages are implemented. A separate Sanity Studio supplies non-developer editing.

**Delivery status:** source implementation, original brand assets, configuration, tests, and documentation are included. This is not a deployed website. Twenty dependency-free tests passed; a source-derived static layout inspection covered nine pages at desktop and mobile widths. Dependency installation was blocked in the delivery environment, so **Next.js build, dependency-resolved typecheck, ESLint, live integrations, and actual Next/React browser tests have not been verified**. See `docs/TEST-REPORT.md` before launch. No fabricated lockfile, build success, Lighthouse score, impact number, partner, testimonial, or event is included.

## Run locally

Use Node.js 22.13 or newer. From this directory:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root `.env` already exists with blank credential placeholders; edit it directly. Do not commit it. `.env.example` is the safe template for collaborators.

This first install creates `package-lock.json`. Review and commit that lockfile, then use `npm ci` in CI/Vercel. Direct application dependencies are pinned. The separate Studio uses its own install and lockfile. Dependency resolution and advisories must be reviewed on first install; direct pins are not a substitute for a resolved lockfile.

`next/font/google` downloads the configured Manrope and Instrument Serif faces during a network-connected build and Next self-hosts their output. No font files are distributed in this archive. Initial stock photos are remote, with a bundled illustration fallback. Cache reviewed photos locally before publishing:

```bash
npm run media:download
```

## Configure services

| Capability | Provider / configuration | Behavior before configuration |
|---|---|---|
| Public site | None required for bundled pages | Full pages render |
| Contact / support / volunteer / partnership | Resend + Turnstile + Upstash | Submission disabled; never displays fake success |
| Email updates | Same protected form endpoint; request delivered to staff | Disabled; staff mailing-list workflow is intentionally not invented |
| Donations | Approved hosted donation URL | Clear pending state; no fake checkout |
| Photo selection | Pexels local tooling | Existing remote stock and local fallback work without a key |
| Content editing | Separate Sanity Studio | Bundled brief-based content is the fallback |
| Analytics | Vercel Web Analytics, explicit opt-in | Off |

Follow **`docs/ENVIRONMENT.md`** for every Secret/Config field and **`docs/LAUNCH-CHECKLIST.md`** for production gates. Never paste API secrets into a `NEXT_PUBLIC_` variable.

## Quality commands

```bash
npm test                   # 20 pure TypeScript validation / calendar tests
npm run typecheck          # full dependency-resolved check after install
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e            # builds/starts the real Next app, desktop + mobile
npm run verify:launch      # non-destructive environment audit; no values printed
npm run format             # optional repository formatting after install
```

The Playwright suite includes all nine core pages, additional content pages, seven program URLs, unknown-route handling, support preselection, reduced motion, unavailable-provider states, and axe scans. These tests are supplied, **not claimed to have run here**. The included GitHub Actions workflow runs them on a network-connected runner.

## What is in the project

```
src/app/                  Routes, metadata, server form endpoint, calendar endpoint
src/components/           Shared UI, native navigation dialog, forms, progressive motion
src/content/              Brief-based program data and image catalog / local overrides
src/lib/                  Content validation, typed models, rate limits, form validation
public/brand/             Three original logo directions, wordmarks, transparent PNG/SVG
public/images/            Local community illustration; reviewed photos can be cached here
studio/                   Separate authenticated editorial CMS, schemas and first-use seed
scripts/                  Pexels search, photo caching and launch audit
tests/                   Unit tests and real-runtime Playwright/axe checks
docs/                    Research, environment setup, editorial workflow and test status
```

## Important boundaries

The site does not process payments, offer legal representation, act as a case-management system, or collect sensitive documents. Form requests are sent to a designated inbox, not a public CMS. Newsletter requests require an approved staff mailing workflow; automatic campaigns, double-opt-in email delivery, and list synchronization are not implemented. The CMS intentionally contains **no events, testimonials, impact metrics, active service locations, or partner endorsements** until verified information is supplied.

The black-and-white LOOP marks are provisional original concepts, not the organization's existing approved logo and not a trademark clearance. Stock subjects are not represented as LOOP participants. Provider accounts, a real domain, verified contacts, real photographs, service coverage, publication permissions, and an approved privacy/retention policy still require organizational decisions.

## Guides

Start with `docs/RESEARCH-AND-DESIGN.md` for the full design rationale and repository/reference audit. `docs/CONTENT-EDITOR.md` is written for the person maintaining the website. `docs/ENVIRONMENT.md` contains the Vercel Secret vs Config table. `docs/TEST-REPORT.md` distinguishes completed inspection from outstanding release tests.
