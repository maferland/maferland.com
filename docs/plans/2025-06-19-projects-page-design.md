# Projects Page Design

## Overview

Add a dedicated `/projects` page to showcase personal projects with a clean, minimal UI.

## Projects

1. **quebec.run** - Quebec City running hub (TypeScript, Next.js)
2. **CleanCopy** - Strips tracking params from clipboard (Swift, macOS)

## Decisions

| Decision | Choice |
|----------|--------|
| Location | `/projects` page |
| Navigation | Add "Projects" link between Home and Blog |
| Card style | Full-width hero cards, stacked vertically |
| Order | quebec.run first, CleanCopy second |
| Visuals | Icons + tech badges, no screenshots |
| Colors | Uniform slate palette |
| Animations | Existing framer-motion patterns |
| Links per card | Live site + GitHub repo |

## Page Structure

```
┌─────────────────────────────────────┐
│  Navigation (with Projects link)    │
├─────────────────────────────────────┤
│  Page Header: "Projects"            │
│  Brief intro (1 line)               │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  quebec.run Card            │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  CleanCopy Card             │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

## Card Component Structure

```
┌────────────────────────────────────────────────────┐
│  [Icon]  Project Name                              │
│                                                    │
│  One-liner description                             │
│                                                    │
│  Longer description (2-3 sentences)                │
│                                                    │
│  ┌──────────┐ ┌────────────┐                       │
│  │TypeScript│ │ Next.js    │  (tech badges)        │
│  └──────────┘ └────────────┘                       │
│                                                    │
│  [View Project →]  [GitHub →]                      │
└────────────────────────────────────────────────────┘
```

## Styling

- Slate border with subtle gradient background
- Generous padding (~p-8)
- Hover: lift (-translate-y-1) + shadow
- Icon in rounded container
- Tech badges: small muted pills
- Two CTAs: live site + GitHub

## Implementation Files

1. `src/components/Navigation.tsx` - Add Projects link
2. `src/app/projects/page.tsx` - New page
3. `src/components/projects/ProjectHeroCard.tsx` - New card component
