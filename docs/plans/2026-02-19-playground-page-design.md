# Playground Page Design

## Purpose

A `/playground` page showcasing interaction design sensibility through live, self-contained demos. Targets design engineering roles — each demo is polished and technically interesting.

## Page Structure

- **Route**: `/playground`
- **Hero**: Full-width interactive typography canvas
- **Intro**: One-liner — _"Exploring interaction, motion, and the space between design and code."_
- **Grid**: 2-col desktop, 1-col mobile. Each cell is a live demo card with title + description.

## Dependencies

None new. Uses Framer Motion (existing) + raw Canvas API.

## Hero: Interactive Typography

Canvas-based. Name rendered as particles sampled from hidden text. Cursor repels particles within a radius (force falloff). Particles spring back with damping on cursor leave. Pure `<canvas>` + `requestAnimationFrame`.

## Grid Demos

### 1. Spring Drag-to-Reorder

- **Technique**: Framer Motion `Reorder`
- 5-6 draggable list items. Others animate with spring physics to fill gaps.
- Shows: gesture handling, layout animation

### 2. Magnetic Buttons

- **Technique**: Framer Motion + `useMotionValue` + pointer tracking
- 3-4 buttons warp toward cursor within ~100px. Label shifts independently (parallax depth).
- Shows: micro-interaction polish, motion math

### 3. Morphing Card Expand

- **Technique**: Framer Motion `layoutId` + `AnimatePresence`
- 2x2 mini card grid. Click to morph into full overlay detail view. Click backdrop to collapse.
- Shows: shared layout animation, exit animation attention

### 4. Elastic Number Ticker

- **Technique**: Framer Motion spring
- Counter with +/- buttons. Digits roll mechanically (odometer) with spring overshoot.
- Shows: motion curve precision, timing

### 5. Particle Field

- **Technique**: Canvas + requestAnimationFrame
- Dot field with subtle drift. Cursor creates repulsion zone. Nearby dots connect with lines (constellation effect).
- Shows: canvas comfort, ambient interaction

### 6. Magnetic Mesh

- **Technique**: Canvas + spring math
- Evenly spaced dot grid. Cursor pulls grid toward itself. Release causes spring wobble back.
- Shows: physics simulation, tactile feel

### 7. Fluid Gradient

- **Technique**: CSS `filter: blur()` + `mix-blend-mode` (or canvas)
- 3-4 colored blurred circles orbiting slowly, drifting toward cursor.
- Shows: aesthetic sense, subtlety

## Component Structure

```
src/app/playground/page.tsx          # Page layout + grid
src/components/playground/
  InteractiveTypography.tsx          # Hero canvas
  DemoCard.tsx                       # Wrapper card for each demo
  SpringReorder.tsx                  # Demo 1
  MagneticButtons.tsx                # Demo 2
  MorphingCards.tsx                  # Demo 3
  NumberTicker.tsx                   # Demo 4
  ParticleField.tsx                  # Demo 5
  MagneticMesh.tsx                   # Demo 6
  FluidGradient.tsx                  # Demo 7
```

## Implementation Order

1. Page route + `DemoCard` wrapper
2. Hero (Interactive Typography) — highest impact, sets the tone
3. Grid demos in order 1-7 (Framer Motion ones first since no new APIs, canvas ones after)
4. Polish: responsive behavior, dark mode, performance
5. Nav link + metadata
