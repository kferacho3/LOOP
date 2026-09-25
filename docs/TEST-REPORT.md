# Verification report

## Completed in the delivery environment

| Check | Result | Scope |
|---|---|---|
| Node unit suite | **20 passed, 0 failed** | Validation for all five form kinds, brief categories, contact preferences, consent, unknown fields, bounds, URL validation, calendar escaping/folding/UTC generation. |
| TypeScript transpilation | **No syntax diagnostics in 57 TS/TSX files** | Local TypeScript 5.8.3 `transpileModule`; local import targets also resolved. **Not** dependency-resolved type checking. See `syntax-check.json`. |
| Static layout inspection | **18 layouts checked** | Nine required pages at 1440×1000 and 390×844. One H1 per page, no document horizontal overflow, no missing local fallback images. See `static-layout-check.json`. |
| Visual inspection | Desktop hero and mobile hero reviewed | Source-derived static markup, locally available Tailwind 4.1.10, system fonts and bundled fallback illustration. Not a live Next page. |
| Brand asset generation | SVG, transparent PNG and ICO files created | Three directions; black/white/ink versions; outlined wordmark variants; 16/32/48/180/192/512 icon sizes. |

## Not completed or not verified

External dependency installation was unavailable in this environment. The installed toolset did not include Next.js or React. Therefore a Next.js production build, real dependency-resolved typecheck, ESLint run, React hydration, animation behavior in the actual bundle, and the supplied Playwright/axe suite **could not be verified here**. No claim that these passed is made.

The static inspection harness transpiled application components into inspectable HTML with controlled replacements for runtime-only dependencies. It is useful for layout review but does not establish React correctness, Next caching behavior, server/client boundaries, accessibility conformance, real asset optimization, or GSAP runtime performance. Screenshot images deliberately show local illustrations instead of remote photography and substitute system fonts. They should not be mistaken for screenshots of a deployed site.

No provider credentials were supplied. Real Resend delivery, Turnstile verification, Upstash behavior, Sanity authentication/publication and hosted donation checkout are consequently untested. Remote stock URLs/crops/photographer metadata require editorial verification; only the hero reference was visually reviewed via external browsing. No images from the twenty demo archives were incorporated.

There are no measured Lighthouse scores, field Web Vitals, uptime results, deployment URLs or production accessibility certification. The thresholds in the research document are targets.

## Reproduce before release

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run verify:launch
```

The first successful installation should generate and commit the genuine `package-lock.json`. Use `npm ci` after that. Studio has a separate dependency graph and requires `npm --prefix studio install` and `npm run studio:build` after its project identifiers are configured.

Then test service providers in a protected Preview using test inboxes and separate credentials. Read `LAUNCH-CHECKLIST.md` for organizational approval gates that code cannot verify.
