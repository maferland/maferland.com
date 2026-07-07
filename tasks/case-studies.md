# Selected work case studies

## Weak point

The selected work cards are doing portfolio work, but they only link out. That makes the site feel thinner than the work deserves: visitors can leave, but they cannot understand the problem, constraints, decisions, and outcome in Marc-Antoine's own framing.

## Scope

- Add first-party case-study routes for selected work.
- Keep external links as secondary actions inside each case study.
- Start with Pinpoint, quebec.run, and Keyhole as the strongest public case studies.
- Move Bonne Nuit to Lab until it has enough public detail.
- Keep Calm Cycle as an external selected-work link for now.

## Route shape

- `/work/pinpoint`
- `/work/quebec-run`
- `/work/keyhole`

## Content model

Each case study should answer:

- What it is
- Who it is for
- The problem
- Constraints
- What I built
- Key product/design decisions
- Technical notes
- Outcome or current status
- Links

## Implementation plan

- Create `src/content/work/*.mdx` with frontmatter for title, subtitle, status, platform, links, and order.
- Add `src/lib/work.ts` to read public case studies.
- Update selected work cards to link to `/work/[slug]` instead of external URLs.
- Add external project links inside each case-study page.
- Add `src/app/work/[slug]/page.tsx`.
- Add a compact `/work` index only if navigation needs it; otherwise keep selected work on the homepage as the entry.
- Write Pinpoint first because the value prop and technical story are clearest.
