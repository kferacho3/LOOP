# LOOP — Research, design direction and implementation rationale

## 1. The direction: a shared way forward

The creative direction is **warm editorial clarity**: the compositional ambition of an immersive creative product, translated into a place where asking for help feels straightforward. The proposed hero is “Possibility, within reach.” A warm paper background, dark green structure, clay-colored editorial type, human-scale photographs, open circular forms and quiet movement establish a distinct identity without making the visitor decode a visual experiment.

This is a design proposal, not a claim that audience research has proved a conversion lift. No interviews, usability study, production analytics or A/B test were conducted during this build. The audience and program requirements come from the supplied *LOOP Website Brief*, not an inferred service directory. The code was also informed by a scoped review of the requested product repositories and all twenty supplied animation archives. Official technical documentation informed the implementation choices. Those three sources—brief, code inspection and external documentation—are kept distinct below.

The brief describes a nonprofit serving youth, families and justice-impacted individuals through housing, reentry, education, transportation, employment, family support and community resources. It prioritizes an established, trustworthy, community-centered appearance, obvious ways to receive help, and clear routes to volunteering, partnership and donations. It specifically rejects an overly corporate or generic charity-template treatment. “Beyond Fortune 500” is therefore translated into exceptional craft and coherent interactions, **not** financial-dashboard styling or an invented impression of organizational size. Source: brief, pages 1–2 and 4–5.

## 2. What stays faithful to the brief

The nine required pages are Home, About LOOP, Programs, Get Help / Request Support, Volunteer, Partner With Us, Events, Donate and Contact. All are implemented. The seven program descriptions retain the brief's boundaries: Court & Community Support; Visitation Transportation; Housing Support & Stability; Reentry Support; Youth Entrepreneurship & Education; Family Support; Community Outreach & Events. Each program has a dedicated route as well as an index section. Source: brief, pages 1–3.

The support form preserves all nine requested categories, including the separate Employment and Housing/resource referrals options. Volunteer interest retains all nine specified areas. The partnership form asks about the organization's type and proposed collaboration. The donation page describes the funding categories supplied in the brief but connects only to an approved external donation destination when provided. It never fabricates a checkout, payment success, tax deduction or dollar-to-outcome equivalence. Source: brief, pages 3–4.

The values remain Community, Access and Empowerment. The homepage has a clear hero, all four primary actions, mission, program cards, a support starting point, event space and impact space. Growth is represented through editable location, event, story and impact models, not fake geographic coverage. The non-developer editing requirement is addressed with a separate authenticated Sanity Studio, rather than asking staff to edit TypeScript for every update. Source: brief, pages 2 and 5.

Neither the brief nor the repository review supplies LOOP's actual street address, service area, response commitment, official donation provider, organization-specific privacy policy, live event dates, partner endorsements or measured outcomes. Those are deliberately absent or visibly pending. The earlier generated concept board is not evidence: its apparent statistics, organizations and dates are not copied into this project.

## 3. Translating kferacho3's product language

This was a **scoped source-level design audit**, not a complete audit of every repository file and not a live visual evaluation of the deployed products. The following inspected sources were the relevant authorities for the transferred design patterns.

### Muzeum: editorial staging and a coherent motion language

`kferacho3/Muzeum/src/app/styles/landing-v4.css` uses an obsidian/ivory foundation, controlled chapter accents, fine rules, a generous content shell, strong grotesk typography and selective serif roles. `src/components/landing/v4/motion/motion-tokens.ts` defines a single easing vocabulary, multiple duration bands, bounded pointer movement and explicit quality tiers. Its emphasized curve is `(0.16, 1, 0.3, 1)`; the micro and standard timings are materially different from cinematic transformations.

LOOP takes that distinction seriously. Large image shapes and editorial typography establish atmosphere, while click feedback stays quick. Chapter-like section progression is retained, but the dark exhibition becomes daylight, paper, green and clay. There is no opening curtain, compulsory introduction or signature animation that delays the support button. Source: [Muzeum foundation](https://github.com/kferacho3/Muzeum/blob/main/src/app/styles/landing-v4.css) and [motion tokens](https://github.com/kferacho3/Muzeum/blob/main/src/components/landing/v4/motion/motion-tokens.ts).

### Zom: small interactions deserve the same care as the hero

`Zom-Technologies/zom-ai/frontend/src/lib/motion-classes.ts` explicitly separates control feedback, card feedback, panel arrival and view transitions. It includes short control timings, press feedback and reduced-motion alternatives. This is the most useful Zom influence for LOOP: every actionable surface needs a clear purpose and a predictable response, not merely attractive static styling.

LOOP implements consistent button and link feedback, visible focus, immediate navigation, retained form data after errors, distinct pending/success/failure states, and no success state before provider acceptance. Zom's finance-specific visual grammar and proprietary font assets are not reused. Its landing README identifies a commercial font licensing consideration; no font binaries from any repository are redistributed. Sources: [Zom interaction tokens](https://github.com/Zom-Technologies/zom-ai/blob/main/frontend/src/lib/motion-classes.ts), [landing README](https://github.com/Zom-Technologies/zom-ai/blob/main/landing/README.md).

### Monitorium: context without losing the way out

`kferacho3/monitorium/monitorium/ui/IntroOverlay.tsx` provides explicit navigation states, visible return controls, keyboard interaction, minimum-sized controls and a restrained panel-arrival curve. Its physical 3D rig is not appropriate for a support website, but its care around orientation and returning to the main context is useful.

LOOP uses a native modal navigation dialog on small screens, clear close and return behavior, persistent Get support access, readable labels rather than icon-only navigation, and layouts that do not require hover or dragging. There is no WebGL scene, “enter the experience” gate, automatic sound or inspection mode. Source: [Monitorium overlay](https://github.com/kferacho3/monitorium/blob/main/monitorium/ui/IntroOverlay.tsx).

### Prism: shared systems rather than isolated effects

`kferacho3/Prism/packages/motion/src/index.ts` defines a small family of durations, easing curves and stagger intervals, alongside an explicit reduced-motion preference. Its README describes shared packages across independently deployable applications. The transferable lesson is consistency: reusable design primitives should govern the website instead of accumulating one-off animation scripts.

LOOP therefore has one motion controller, shared typography/actions, typed content models and a CMS isolated from the public app. It does not import procedural worlds, physics, Three.js or an engine dependency. Sources: [Prism motion](https://github.com/kferacho3/Prism/blob/main/packages/motion/src/index.ts), [Prism architecture](https://github.com/kferacho3/Prism/blob/main/README.md).

## 4. The visual system

The black-and-white identity requested in the brief stays functional in every logo variant. The surrounding interface supplies warmth rather than recoloring the mark indiscriminately. The base palette is Paper `#F6F3EC`, Linen `#EDE9DF`, Ink `#18251F`, Forest `#243F34`, Moss `#B9C4A0`, Clay `#9B4D35` and Peach `#EFCBB7`. Muted text uses a deliberately darker green-gray rather than faint fashion-editorial gray.

Manrope is the proposed UI/body family; Instrument Serif is the expressive editorial accent. The serif is used for short human phrases, not form labels, dense instructions or navigation. The site loads these through Next's font integration, not third-party font stylesheets on every visit. No font files are included in the ZIP. Changing typography later should happen through the two font declarations and the shared CSS tokens, not per-page overrides.

Layouts alternate wide breathing room and denser actionable areas. A rounded architectural image aperture forms the hero; a small floating community card creates shallow depth; selected photographs move gently inside clipped frames. The dark green program chapter creates contrast without turning the entire experience into a dark dashboard. The terracotta/peach closing chapter returns to invitation rather than urgency. These are proposed art-direction decisions, not claims from the brief.

The original logo kit explores three ideas: Common Ground (two open loops connected), Open Embrace (an open enclosing gesture), and Forward Path (a shared architectural passage). Each includes black, white and ink SVG/transparent PNG versions. The wordmark is provided as vector outlines; favicons are simplified rather than shrinking a detailed lockup. The concepts are provisional and require organizational approval before replacing an existing mark.

## 5. Page-by-page visitor experience

**Home** answers who LOOP is and what the visitor can do, without waiting for motion. Get support appears in the persistent header; the hero's starting-point action is followed by support, volunteer, partner and donate tiles. Program cards lead to actual detail pages. A simple support selector links to a preselected request form rather than claiming to diagnose eligibility. Upcoming content appears only when confirmed records exist. Impact remains an honest invitation to future verified reporting.

**About** explains the supplied mission and values in a spacious editorial layout. It describes the aspiration to grow without presenting expansion as an already operating network. **Programs** gives each of the seven areas meaningful content and a next step, preserving differences between court accompaniment, reentry, visitation transportation, housing navigation, youth education, family support and outreach.

**Get Help** is intentionally calmer than Home. No parallax is mounted on the form route. The visitor can select multiple categories, use the name they go by, select a safe contact method and provide only a broad explanation. Email is not required when phone is chosen. City and state are optional. The interface explicitly discourages Social Security numbers, case files, medical details and private information about children. There is no upload field for sensitive documents.

**Volunteer** and **Partner** are separate flows rather than generic contact forms with misleading labels. Interest areas and organization types become structured data in the staff email. **Contact** shows only actual supplied details. **Donate** uses an approved provider link and does not pretend that entering an amount into a decorative widget charges a card.

**Events** lists confirmed upcoming events, with detail routes and standards-based calendar downloads. Unknown events return not found. **Impact**, **Stories** and **Locations** support the brief's growth direction without requiring fabricated content at launch. **Privacy**, **Accessibility** and **Credits** make operational boundaries and imagery provenance visible. These extra routes are implementation additions, not pages expressly named as core pages in the brief.

## 6. What was taken from the twenty animation references

All twenty archives were inspected for source patterns; their presence does not imply every effect belongs on the site. The delivered code is a new, small implementation, not twenty demos concatenated together. Demo image sets and their uncertain publication rights are not redistributed.

| Supplied archive | Relevant pattern | LOOP decision |
|---|---|---|
| 3DCarousel | Perspective and staged cards | Use depth in composition, not a mandatory 3D carousel. |
| animated-continuous-sections-with-gsap-observer | Wheel/gesture interception | Reject scroll takeover for core navigation. |
| animation-custom-ease | Shared custom timing | Retain a consistent fast-settle vocabulary, not exaggerated bouncing. |
| codrops-cinematic-scroll-animations | Editorial chapter pacing | Borrow pacing; remove introduction/loading gates. |
| codrops-sticky-grid-scroll | Scrubbed layered image geometry | Reinterpret as bounded image-frame parallax. |
| ContentLayoutTransition | Continuity between layouts | Use consistent visual hierarchy; no Observer-controlled navigation. |
| CrossroadsSlideshow | Distinctive angled compositions | Reference composition only; do not import the legacy animation runtime. |
| delphi | Shader-backed image plane | Exclude WebGL dependency from this nonprofit site. |
| ElasticGridScroll | Differential column movement | Borrow varied travel; never stretch or distort people's faces. |
| gooey-hover-codrops | Image distortion on hover | Omit: wrong tone and unnecessary rendering cost. |
| grid-layout-transition | FLIP layout reflow | Keep as a future optional gallery idea, not an initial dependency. |
| GridFlowEffect | Flowing thumbnail transitions | Omit the loader and complex flow from v1. |
| GridLayoutSlideshow | Full-screen image choreography | Borrow generous image framing, not forced slides. |
| gsap-draggable-image-gallery | Drag/inertia exploration | Do not make dragging necessary to access any content. |
| Physics-slideshow-threejs-cannonjs | Physics-driven media | Omit simulation and associated GPU/runtime cost. |
| ReflectionScroll | Mirrored scroll composition | Omit reflected people and duplicate moving imagery. |
| RepeatingImageTransition | Repeated image stepping | Omit repetition that competes with human content. |
| RotatingOnScrollAnimations | Rotation and scroll velocity | Restrict rotation to a decorative composition; no velocity blur on faces. |
| scrolltrigger-gsap-horizontal-clip-path | Horizontal clip progression | Omit horizontal scroll dependency and ghost sections. |
| scrubbed-bento-gallery | Scroll-linked image grouping | Borrow the arrangement, not prolonged pinning. |

The architectural rule is simple: an effect earns its place only when it supports meaning and survives keyboard, mobile, reduced-motion and failure testing. This deliberately rejects some impressive reference effects rather than pretending more effects automatically mean higher quality.

## 7. Motion, accessibility and speed

The normal document uses native scrolling. Images can travel gently inside their frames on larger screens; a decorative composition can rotate by a few degrees; below-fold content can settle into place. Nothing needs a smooth-scroll replacement. No wheel event is prevented to force a narrative. Form routes do not mount the editorial animation controller. The same pages remain understandable with effects absent.

A visible desktop motion control supplements the operating-system preference, and system reduced motion cannot be overridden by an “enable” action. GSAP is dynamically imported only where appropriate, with matchMedia scoping and cleanup on route changes. Its documented matchMedia mechanism supports responsive and reduced-motion arrangements. [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/).

W3C's Animation from Interactions criterion describes disabling nonessential interaction-triggered movement; it is a **Level AAA** criterion, not a reason to claim the entire site is WCAG AAA. The implementation adopts that motion principle while targeting accessible labels, focus, semantics, touch targets, error recovery and contrast throughout. A passed automated scan would still not be full accessibility certification. [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

Release performance targets are p75 LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. These are the standard “good” Core Web Vitals thresholds, **not measured results for this project**. Further implementation budgets are proposals: one prioritized hero image, no initial video or WebGL, sensible image dimensions, and no animation chunk on support forms. Test these on representative mobile hardware and a real network after installation. [Core Web Vitals](https://web.dev/articles/vitals).

The initial image catalog contains remote sources because network downloads were unavailable in the delivery environment. A local illustration is bundled as the error fallback. Before production, use the supplied media script to cache approved images, inspect crops and verify attribution/rights. Do not count a static screenshot using that illustration as a completed photography audit or a measured image-loading benchmark.

## 8. Content and operations are part of the experience

The brief explicitly requires updates without a developer. Sanity Studio supplies structured editorial screens for site settings, programs, events, stories, impact and service areas. Public documents are queried with published-only filtering and additional confirmation flags. Stories require permission approval; impact requires approval, a period and source; locations must be active; events must be confirmed. No support request is written into these documents. [Sanity Studio documentation](https://www.sanity.io/docs/studio/installation).

The protected server form endpoint validates field content, request size and origin, uses a shared expiring rate limit, verifies Turnstile server-side, and waits for the email provider response. Tokens remain server-side. The staff email includes the chosen contact method and distinguishes a specific inquiry from newsletter consent. This is a guarded intake channel, not a complete CRM, case-management workflow, guaranteed response service or fraud-proof system. [Cloudflare server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Resend Next.js guide](https://resend.com/docs/send-with-nextjs).

The Pexels integration is editorial tooling, not a live photo search for visitors. The local search script returns candidates for human approval; the download script preserves source/credit data and writes stable image overrides. This avoids requiring a photo API call for every page view. The license does not make an identifiable stock subject a participant or endorser. Stock suitability, sensitive context and the chosen use must be reviewed. [Pexels API](https://www.pexels.com/api/documentation/), [Pexels license](https://www.pexels.com/license/).

Analytics is disabled by default. The optional Vercel integration filters sensitive inquiry routes and removes query strings/fragments before sending page views. It sends no custom form events. The privacy notice remains an owner-review draft until a real policy is supplied. Publishing a polished site should not disguise unfinished provider governance, retention policy, consent practice or operational ownership. [Vercel beforeSend](https://vercel.com/docs/analytics/package#beforesend).

## 9. Honest release status

The deliverable contains the complete authored source, connected route/component structure, standalone CMS schemas, original vector/raster brand assets, placeholder environment files, tests and deployment instructions. Twenty pure validation/calendar tests passed. TypeScript 5.8.3 transpilation reported no syntax diagnostics in the inspected source set. A static source-derived rendering, compiled with the locally available Tailwind 4.1.10, was inspected at desktop and mobile widths using fallback images and system fonts; it is not a React hydration or production Next build.

Dependency installation was not possible in the delivery environment. A production Next build, dependency-resolved typecheck, ESLint, real Next runtime browser tests, provider delivery tests, CMS authentication/publication tests, actual stock-photo loading, and field performance results remain unverified. The project deliberately includes no fabricated package lock, no fake CI badge and no unsupported performance percentage. `TEST-REPORT.md` and the launch checklist specify the remaining gates.

That distinction matters: the source project is ready to install and continue validating, while an organization's public service channel is ready only after its real content, operational settings, provider accounts, privacy practice and end-to-end behavior are approved.
