# Reliability and browser evidence

## Repeated blinking

Diagnose the affected family and actual deployed revision first. A successful deploy status does not prove that the visitor loaded matching HTML, CSS and JavaScript.

Observe computed clip, transform and opacity plus actual animation start times while the page is stationary. In the original process-step failure, four steps restarted 24 times in about 4.5 seconds. That is an application feedback loop, not normal entrance motion.

Common causes and bounded responses:

| Evidence | Response |
| --- | --- |
| An observer target is itself clipped/transformed | Measure a stable parent and animate child layers. For sensitive steps, use scroll geometry plus full-exit hysteresis. |
| New animation instances appear while stationary | Check rearm logic, ResizeObserver feedback, mutation-driven renders and media-query events. Log starts, not only CSS class names. |
| Input focus or demo edits restart the story | Decouple render/measure events from replay. Settle focused controls; preserve app state. |
| Story stays at 100% after the visitor scrolls upward | Inspect actual reverse travel and interaction anchor; do not gate solely on wheel events or a short intent timer. |
| Art is stable but buttons are hard to click | Remove transforms from the hit-area wrapper. Limit depth/scroll drift to decorative children. |
| Running animation object but no visible movement | Look for `!important` static clip/transform overrides, reduced motion and unsupported inline clipping. Check computed intermediate values. |

Use only the animation you need. Do not solve a repeated entrance by disabling the whole website or permanently removing the user's requested motion. Avoid piling on new observers and timeout guards without a clear state model.

## Windows/macOS differences and reduced motion

An OS difference is evidence to investigate, not a diagnosis. Compare the actual browser, viewport, loaded release and effective `matchMedia('(prefers-reduced-motion: reduce)').matches` value.

- Under reduced motion, full text and live controls remain visible and usable. Cancel JS animation and provide final SVG geometry; do not only disable CSS keyframes.
- A voluntary “reduce” setting can further reduce movement. It must not silently pretend to enable full motion when the OS still requests reduction.
- A neutral notice can say: “Animation đang tắt vì thiết bị hoặc trình duyệt đang bật Giảm chuyển động. Website tôn trọng cài đặt này.” Offer an expandable explanation and close button; do not force a modal or automatically change system settings.
- For Windows 11, the path is Settings → Accessibility → Visual effects → Animation effects. For Windows 10, Settings → Ease of Access → Display → Show animations in Windows. For macOS, Accessibility settings contain Reduce motion; its exact section differs by OS version. Verify current labels if giving version-specific instructions.
- Keep notice dismissal for the tab session. Do not clear it on every initial media-query event during reload. A true preference change updates visibility without reloading the app or clearing forms.

Technical reference: [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Consult current official docs when changing browser/API behavior; the source snapshots are implementation examples, not API documentation.

## Cache consistency

Do not assume “try clearing cache” is a complete fix. Compare actual response bodies, response headers, script/style URLs, and release identifiers. Distinguish an already-open page with loaded old modules from an ordinary reload of a fresh entry page.

Prefer the host bundler's existing content hashes. For a buildless app, the example `assets/source/web2/build-site.mjs` demonstrates the dependency order:

1. Hash motion-module content into a new filename.
2. Rewrite the app import to that filename, then hash the app.
3. Hash CSS separately.
4. Rewrite HTML to the new CSS/app filenames.
5. Update the shell's page version and its entry-module version.

Changing a dependency must invalidate its importing app, not only the dependency. Ensure HTML/entry documents are revalidated; keep old immutable asset names available where the deployment strategy requires them. Do not impose cache headers on an unrelated protected website. Avoid timestamp cache-busters on every request or network-only service workers as a substitute for release consistency.

Test fresh browsing and reloads with the browser cache left intact. Demonstrate what was verified: matching asset URLs and executed content, or a simulated old-to-new release if actually tested. Do not claim a warm reload alone proves that all historic cache scenarios are impossible.

## Browser verification

Use the available browser tools; do not install or launch a different automation stack merely to bypass an environment restriction. Static syntax checks and screenshots cannot prove motion quality.

### Shared matrix

- Test chosen styles at 320, 390, 768, 1024, 1440px; inspect long Vietnamese text and masks. Desktop and responsive viewport tests are not proof of physical-device Safari behavior.
- Sample an actual intermediate frame with a nonfinal computed transform/clip and running animation, then final identity/unclipped/visible content. Counters alone can miss a CSS override that suppresses visible movement.
- Stand still for several animation durations: no new starts. Wiggle scroll ±5px at a viewport edge: no replay. Fully exit and return: replay if the design calls for it, then settle.
- Use real wheel input and keyboard scrolling as well as programmatic geometry setups. Resize midway, jump quickly down/up, open/close a dialog with Escape, switch hidden views and return.
- Verify focus returns to its source without page jumps. Native reduced motion must leave no hidden copy or stranded transform; test live preference changes too.
- Save form text and demo state before scrolling, replaying and switching. Compare real rendered counts, cart totals, approvals, filter values and edited brief contents afterward.
- If cache is suspected, test the built/deployed asset graph, not only source files behind a local server. Exclude analytics scripts when selecting the app's module; production pages may inject extra module scripts.

### Web 1 additions

Exercise all six styles if modifying shared motion code; otherwise affected styles plus the unchanged protected surface. For five story-based styles, test three down/up/down cycles; inspect changing SVG path and module transforms. After a demo interaction, reverse-scroll into the story and ensure it unlocks without changing data. Replay the active shop/internal mode, not only orders. Verify render revisions stay unchanged during purely visual replay. Check localization without altering personal input or money/IDs.

### Web 2 additions

Test all three themes if changing shared Web 2 motion. Verify the four process steps visibly animate, settle and remain still; no observer clips their measured container. Verify project index selection, dialog state and the selected demo survive theme changes. Check ordinary reload requests current hashed CSS/app/motion files.

## Handoff limits

Use truthful evidence. Browser recordings show rhythm, not measured render FPS. A passing preview is not a verified production alias. Preserve authorization boundaries for push, merge, deployment, access settings and external messages. Skill use alone grants none of those actions.
