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
