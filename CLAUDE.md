# Technical Documentation - maferland.com

## Project Overview
Professional portfolio website for Marc-Antoine Ferland, featuring blog content, project showcase, and personal branding.

## Technical Stack Decisions

### Framework: Next.js 15 (App Router)
**Decision**: Fresh Next.js 15 project with App Router and Turbopack
**Rationale**: 
- Latest performance optimizations with Turbopack
- Better SEO with built-in metadata API
- Enhanced performance with React Server Components
- Modern routing patterns
- Excellent developer experience

### Content Management: File-based MDX (when needed)
**Decision**: Use MDX with front matter for blog posts when we implement blog functionality
**Rationale**:
- No external dependencies or CMS complexity
- Version controlled content
- Rich markdown with React component integration
- Easy code snippet highlighting
- Fast builds and deployment

### Styling: Modern Custom Design System
**Decision**: Build custom design system with TailwindCSS 4
**Rationale**:
- Complete control over design aesthetics
- Professional, unique look and feel
- Better performance without component library overhead
- Easier to maintain long-term

**Design System Components**:
- TailwindCSS 4 with new `@theme` syntax
- Built-in CSS variables with Tailwind's design tokens
- Framer Motion for smooth animations
- Lucide React for consistent iconography

**Important: TailwindCSS 4 Best Practices**:
- Use `@theme inline` syntax for custom design tokens
- Leverage built-in CSS variables (--color-background, --color-foreground)
- Avoid external CSS imports - keep everything in Tailwind's system
- Use Tailwind's font system instead of Google Fonts imports
- Utilize automatic dark mode with `prefers-color-scheme`

### Component Design System Guidelines

**Component Architecture**:
- Build reusable UI components with proper TypeScript interfaces
- Use variant maps with `keyof typeof variants` for type-safe component APIs
- Extract base styles as constants to keep components clean and readable
- Implement proper class merging with `tailwind-merge` (twMerge + twJoin)

**Code Style Standards**:
- Create `/src/components/ui/` directory for base UI components
- Use `/src/lib/utils.ts` for shared utilities like class merging
- Follow the pattern: `base styles` + `variant styles` + `className override`
- Prefer explicit variant maps over inline conditional objects

**Storybook Integration**:
- Setup Storybook to showcase component system and demonstrate craft
- Host on Chromatic for public component library documentation
- Link to Storybook from main site to showcase systems thinking and DX focus
- Document all component variants, states, and usage examples

**Storybook Story Guidelines**:
- Create one story per variant for better isolated testing
- Use descriptive story names that match variant names
- Include comprehensive argTypes with descriptions
- Tag stories with 'autodocs' for automatic documentation generation

**Chromatic Setup**:
- Install Chromatic CLI: `npm install --save-dev chromatic`
- Add script: `"chromatic": "chromatic --exit-zero-on-changes"`
- Create account at https://chromatic.com with GitHub
- Get project token and set as `CHROMATIC_PROJECT_TOKEN` environment variable
- Run `npm run chromatic` to publish stories for visual regression testing
- Link to published Storybook from main website to showcase component system

**GitHub Actions Integration**:
- Created `.github/workflows/chromatic.yml` for automatic deployments
- Runs on pushes to main branch and pull requests
- Uses `chromaui/action@latest` for optimized builds
- Auto-accepts changes on main branch (`autoAcceptChanges: main`)
- Only tests changed stories for faster builds (`onlyChanged: true`)
- Requires `CHROMATIC_PROJECT_TOKEN` secret in GitHub repository settings

### Visual Design Direction
**Style**: Minimalist, typography-focused, professional
**Colors**: Neutral slate palette with built-in Tailwind variables
**Typography**: System fonts with Tailwind's font stack
**Layout**: Grid-based, content-focused, responsive-first
**Interactions**: Subtle animations, smooth micro-interactions

### Performance Optimizations
**Decisions**:
- Static generation for blog posts (when implemented)
- Dynamic imports for heavy components
- Next.js Image optimization
- Code splitting by route
- Automatic light/dark mode support

### Dependencies Philosophy
**Decision**: Minimal dependencies, add only when needed
**Current essentials**:
- Next.js 15 with App Router & Turbopack
- TailwindCSS 4
- TypeScript
- Framer Motion (for animations)
- Lucide React (for icons)
- @tailwindcss/typography (for blog content)

## Development Commands
- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build with Turbopack
- `npm run start` - Production server
- `npm run lint` - Code linting

## Implementation Plan
1. ✅ Setup fresh Next.js 15 project with App Router
2. ✅ Create minimal, professional homepage
3. 🔄 Enhance design system with proper Tailwind 4 patterns
4. Setup navigation structure
5. Create additional pages (About, Projects, Blog)
6. Configure MDX when blog functionality is needed
7. Migrate legacy blog posts from v2.maferland.com
8. SEO and performance optimizations

## Future Considerations
- Add search functionality for blog posts
- Implement newsletter subscription
- Add contact form
- Consider adding tests as site scales
- Analytics and performance monitoring