# Snip landing page

## Plan

- [x] Undo previous Snip implementation and restore production alias.
- [x] Fetch and inspect `maferland/snip@handoff` `snip.zip`.
- [x] Port the handoff design into `/snip`.
- [x] Verify with Vercel remote build.
- [x] Deploy after verification.

## Notes

- Handoff ZIP commit: `164346e5d8a3128239f77e5161e5cb76fd8ffbfe`.
- Source file: `design_handoff_snip_landing/snip landing page.dc.html`.
- Production URL: `https://www.maferland.com/snip`.
- Verification: `npm run typecheck`, `npm run lint`, Vercel preview build, Vercel production build, public HTTP 200.

## Review fixes

- [x] Restore visible header mark on mobile.
- [x] Fix primary CTA text color.
- [x] Let mobile URL demo wrap so stripped params are visible.
- [x] Verify with typecheck, lint, Vercel preview build, and mobile Safari screenshot.
- [x] Humanize Snip landing copy.
- [x] Port updated handoff steps layout from `65e41743108b7c06900d51347f7138d916491546`.
- [x] Replace placeholder header mark with handoff `snip-mark.svg`.

## Review result

- Review app: `https://maferland-d0s6499nc-mafer.vercel.app/snip`.
- `npm run typecheck` passed.
- `npm run lint` passed with existing `WaveText.tsx` unused `useRef` warning.
