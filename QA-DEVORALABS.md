# DevoraLabs — branding and repeat-scroll verification (1.6)

## Reproduced before the fix

With the One line style at 1440 × 1000, choose “Try the demo”, process DH-1042, then wheel upward 650px and downward 250px. Before the change, raw scroll progress moved from 1 to 0.5774 to 0.7400, while displayed story progress stayed at 1 and `data-interacted` stayed true. The old unlock required progress below 0.2 and an input-intent timer of 1400ms.

## Fix

- Reverse scroll travel of at least 48px unlocks presentation when returning into the story (progress below 0.96). No timer or wheel-only assumption. PageUp/PageDown and scrollbar movement follow the same geometry.
- Explicit replay establishes its own scroll anchor. Replay and chapter controls preserve the selected demo mode. Shop and internal modes animate their existing live modules.
- Section reveals reconcile their current position on scroll and on tab reactivation. Exiting the viewport by 24px rearms the presentation; re-entry starts the CSS animation again. No demo render or form reset is involved.
- Focus navigation shows its target immediately. Reduced-motion preferences continue to show static, readable content.
- DevoraLabs branding and the D + L SVG mark appear in the shared toolbar, both page headers/footers, page titles and favicon. The original style remains selectable.

## Verification

`npm run build`: all 11 unit tests and build checks pass.

`npm run test:browser` with Chrome: real wheel input across three down/up/down cycles for One line and the four additional motion styles; One line also at 390px. Assertions inspect changing SVG paths, live module transforms, demo render revision and actual selected filters/data. PageUp/PageDown is covered on desktop.

Section title re-entry is checked three times using actual running CSS animation instances, their start times, non-identity transforms and their final readable position. This is independent of instrumentation counters.

Cart quantities, request approvals, filters, form inputs and manually edited brief contents survive scrolling, explicit replay, VI/EN changes and style switches. Original-style branding/overflow is checked in VI and EN at 390px. Reduced-motion rendering is checked separately. Browser page errors must be empty.

The browser script supports `BASE_URL` for repeating these checks against production. Screenshots and JSON reports go to the local delivery directory, outside the public `dist/` build.
