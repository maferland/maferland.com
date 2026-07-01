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
- [x] Loosen spacing after the `lab` nav item.
- [x] Plan selected work case-study routes.
- [x] Run lint, typecheck, build.
- [x] Verify routes and visual pass; document Playwright blocker.

## Review

- Merged `origin/maferland/bets` into `maferland/overhaul`.
- Implemented handoff tokens, nav, home, playground, writing, footer, and Lab styling.
- Imported useful legacy playground demos: magnetic buttons, number ticker, and text scramble.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed. The previous Turbopack workspace-root warning is fixed by pinning `turbopack.root`; remaining warning is Next/Turbopack's upstream Node `module.register()` deprecation.
- Dev route checks passed for `/`, `/playground`, `/writing`, `/lab`, `/lab/hearth` on `http://localhost:3004`.
- Safari visual pass completed: desktop home/playground/writing/lab/lab detail checked; mobile-width home and mobile menu checked.
- Pinpoint session could not be prepared from fresh screenshots in this environment: macOS `screencapture` failed with `could not create image from display`; Playwright Chromium/WebKit installs reached 100% download then hung during install/extraction.
- `npm install` reported 22 dependency audit vulnerabilities. Not fixed because audit remediation is unrelated dependency churn.
