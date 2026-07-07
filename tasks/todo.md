# Website overhaul

## Assumptions

- [x] Zip handoff is source of truth for visual direction.
- [x] Preserve and merge Labs branch work.
- [x] Work in isolated worktree/branch.

## Plan

- [x] Merge Labs branch into overhaul worktree.
- [x] Inspect current routes/components and handoff artifact structure.
- [x] Implement shared visual tokens/layout/nav from handoff.
- [x] Rebuild home to match handoff content and interactions.
- [x] Rework playground to match handoff while preserving useful existing route.
- [x] Map writing to real blog/archive content, not placeholder posts.
- [x] Preserve Labs route and adapt it to the new design language.
- [x] Apply final content decisions: Lab copy uses “Ideas”; nav/route stay “Lab”.
- [x] Make selected work cards clickable where links exist.
- [x] Group writing posts by year.
- [x] Convert “Also Building” to compact cards.
- [x] Fix spring switch knob escaping the track.
- [x] Restore more legacy interaction experiments to Playground.
- [x] Normalize Playground demos to the site visual system.
- [x] Test each Playground interaction in browser.
- [x] Replace weak morphing-card demo with an in-app state panel.
- [x] Split hover-letter demo into two balanced lines.
- [x] Loosen spacing after the `lab` nav item.
- [x] Plan selected work case-study routes.
- [x] Run lint, typecheck, build.
- [x] Verify routes and visual pass; document Playwright blocker.
- [x] Add selected-work case-study routes for primary portfolio items.
- [x] Point homepage selected-work cards to internal case studies.
- [x] Run lint, typecheck, build, and route smoke checks for case studies.
- [x] Replace placeholder favicon assets with real generated images.
- [x] Share more layout grammar between Lab and selected-work details.
- [x] Move Bonne Nuit from selected work to Lab.
- [x] Add Keyhole to selected work with a case study.
- [x] Run lint, typecheck, build, route smoke checks, and visual pass.

## Review

- Merged `origin/maferland/bets` into `maferland/overhaul`.
- Implemented handoff tokens, nav, home, playground, writing, footer, and Lab styling.
- Imported useful legacy playground demos: magnetic buttons, number ticker, and text scramble.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed. The previous Turbopack workspace-root warning is fixed by pinning `turbopack.root`; remaining warning is Next/Turbopack's upstream Node `module.register()` deprecation.
- Dev route checks passed for `/`, `/playground`, `/writing`, `/lab`, `/lab/hearth` on `http://localhost:3004`.
- Safari visual pass completed: desktop home/playground/writing/lab/lab detail checked; mobile-width home and mobile menu checked.
- Added `/work/pinpoint`, `/work/quebec-run`, and `/work/bonne-nuit` case-study pages. Homepage selected-work cards now point to those internal pages; Calm Cycle stays as an external project link.
- Case-study verification passed: `npm run lint`, `npm run typecheck`, `npm run build`, and Node fetch smoke checks for `/`, `/work/pinpoint`, `/work/quebec-run`, `/work/bonne-nuit`.
- Follow-up polish replaced text-placeholder favicon assets with real generated `png`/`ico` files, moved Bonne Nuit to Lab, added Keyhole to selected work with `/work/keyhole`, and shared the same detail layout shell between Lab and selected-work pages.
- Follow-up verification passed: `npm run lint`, `npm run typecheck`, `npm run build`, route smoke checks for `/`, `/work/pinpoint`, `/work/quebec-run`, `/work/keyhole`, `/work/bonne-nuit`, `/lab`, `/lab/bonne-nuit`, plus Safari visual checks for `/work/keyhole` and `/lab/bonne-nuit`.
- App screenshots were evaluated but not added in this pass because the repo does not currently contain real screenshots for Pinpoint, Keyhole, quebec.run, or Bonne Nuit. Avoided placeholder imagery.
- Pinpoint session could not be prepared from fresh screenshots in this environment: macOS `screencapture` failed with `could not create image from display`; Playwright Chromium/WebKit installs reached 100% download then hung during install/extraction.
- `npm install` reported 22 dependency audit vulnerabilities. Not fixed because audit remediation is unrelated dependency churn.
