# Web 1 — six styles

## Reading map

These are original host-dependent sources. The paths resolve relative to this file.

| Purpose | Source |
| --- | --- |
| Original diagram and original-style reveals | [classic/effects.js](../assets/source/web1/classic/effects.js), [effects.css](../assets/source/web1/effects.css) |
| Live-UI story, measurements, interaction lock and replay | [story.js](../assets/source/web1/story.js), [story.css](../assets/source/web1/story.css) |
| Deterministic geometry and smoothing | [story-math.js](../assets/source/web1/story-math.js) |
| Four variations on the one-line story | [motion-profiles.js](../assets/source/web1/motion-profiles.js), [motion-profiles.css](../assets/source/web1/motion-profiles.css) |
| Whole-page sections, process route, reading rail | [page-motion.js](../assets/source/web1/page-motion.js), [page-motion.css](../assets/source/web1/page-motion.css) |
| Preview-to-detail FLIP | [project-motion.js](../assets/source/web1/project-motion.js) |
| Demo feedback animation and shared static fallback | [effects.js](../assets/source/web1/effects.js), [motion.css](../assets/source/web1/motion.css) |

The reference imports host `i18n.js` / `i18n-text.js` and expects the host DOM. Port its behavior through adapters rather than importing it into an unrelated page unchanged.

## Classic / Bản gốc

Warm paper, near-black ink and restrained red gesture. The hero diagram transitions through three real states: disconnected tasks → connected workflow → application frame. Scene buttons choose a real state; replay animates geometry only. The drawing is decorative SVG, not fake product telemetry.

- Equal-topology cubic paths morph over about 650ms; the full three-scene story lasts about 1050ms.
- A tracer follows the current curve. Normalize dash length with `pathLength="1"` when drawing the line.
- Headline and section entrances can replay after a full viewport exit. Keep form and service reading surfaces upright.
- Original process route grows with scroll. On reduced motion, show the chosen diagram state and readable page immediately.

## One line / Một nét, thành hệ thống

The signature is **real HTML task modules becoming the live demo**. Do not replace it with a screenshot or a second copy of the application.

| Progress | Visual event |
| --- | --- |
| 0–0.16 | Three task fragments are loosely placed; a small lift is optional. |
| 0.16–0.43 | Fragments align into a coherent workflow. |
| 0.43–0.88 | Fragments FLIP into their measured final UI positions; SVG line morphs into the interface frame. |
| ~0.64–0.92 | Question labels yield to actual UI content. Controls become usable around 0.70 and finish in a flat plane. |
| 0.96–1.00 | Final app is stable and ready for normal operation. |

The reference desktop travel is clamped to roughly 1100–1800px. Mobile instead uses a short natural-flow distance, around `min(0.72 × viewportHeight, 560px)`, rather than reproducing the long sticky desktop scene.

Measure final positions before transforming. For each module, interpolate start → aligned → final rectangle and use inverse transforms relative to the real final position. Keep the original DOM nodes and identity of live controls.

The three demo modes animate their own live modules:

- Orders: an order row, the aggregate summary, and the status filter.
- Shop: product modules and the actual cart.
- Internal requests: a real request, aggregate summary, and request filter.

SVG morph endpoints must have equal cubic topology: `M(x,y)` plus complete control-point/end-point groups. Validate lengths before interpolation. Sample a cubic in JavaScript for its tracer instead of calling SVG geometry APIs every frame.

### Interaction lock and reverse replay

The first real demo interaction snaps presentation progress to 1, records the scroll anchor, and leaves the selected mode/data alone. It does not reset the cart or switch to orders.

Unlock presentation after **actual reverse travel**, rather than only a wheel event or an expiring input-intent timer. In the source, upward travel of at least 48px plus raw progress below 0.96 unlocks the story. Maintain the maximum visited scroll position while locked. Keyboard scrolling and scrollbar drags must behave the same as wheel/touch.

Explicit replay animates progress 0→1 over about 1800ms, records a new anchor, then returns to the stable plane. Real scrolling cancels this temporary override. Replay must not emit business mutations or recreate demo data. Resetting demo data is a separate control.

Use the bounded time follower from `story-math.js` for desktop smoothing: approximately 58–72ms time constant and a maximum progress lag of 0.14. Stop scheduling when current equals target. Resizing, fonts loading or a legitimate demo render remeasure geometry without initiating a replay.

## Kinetic / Chữ động

Retain the one-line mechanism but give it an editorial rhythm:

- Short headline lines enter horizontally from about `-110%`, with a mild `skewX(-7deg)` and outline emphasis on a short word.
- Section titles use directional horizontal masks; image fields wipe horizontally instead of only fading up.
- Start modules from straight, alternating horizontal positions. Use large typographic hierarchy and flat editorial blocks.
- Preserve Vietnamese text and sufficient line height; do not apply condensed/outline styling to long prose or inputs.

## Layers / Xếp lớp

- Start modules at shallow varied angles, then align them into the same final live app.
- Use restrained paper depth and perspective on artwork. Project artwork unfolds from approximately `rotateY(18deg) rotateZ(-3deg) translateY(30px)` to a flat plane.
- Service content may enter from a shallow negative Z plane with staggered timing.
- Measured wrappers and button hit boxes remain fixed; the interactive end state is flat. Do not rotate readable tables during interaction.

## Blueprint / Bản vẽ

- A technical grid and monospace display treatment organize the scene. Construction lines stay behind reading content.
- Module starting positions share a straight technical column; rotations are zero.
- `stroke-dashoffset` follows progress for a normalized route. Project art/title use a left-to-right scan (`inset(0 100% 0 0)` → `inset(0)`).
- Finish every route and reveal when reduced motion is active. Do not create decorative controls that imply real measurement or editing capabilities.

## Orbit / Quỹ đạo

- Decorative orbital geometry rotates by a bounded angle (about 24° across story progress). It is not a continuously spinning loader.
- Start modules at alternating positions around the visual center, then settle into final UI geometry.
- Project imagery reveals through a circular window (`circle(0 at 50% 50%)` → a circle large enough to expose the entire image), with a subtle initial rotation.
- Title reveal has a small angular component and resolves to a stable readable line. Keep large artwork bounded; remove unnecessary parallax on mobile.

## Whole-page rhythm and detail transitions

Reuse the selected profile through the whole page, not only the hero: masked section headings; ruled chapter boundaries; modest project drift (about ±10px on desktop); sequential process route; contact field groups; and footer marks. Form fields settle when focused. Hide unnecessary reading rails on mobile.

Reference timing: section titles ~850ms with ~75ms line stagger; project art ~1000ms; copy ~720–780ms; service columns ~80/180/280ms offsets. Treat these as a rhythm, not requirements for unrelated products.

For shared-element detail transitions, measure the source preview, open the accessible dialog, measure the target, and animate an inert image clone with translate/scale over ~650ms. Remove it and restore target opacity on finish, cancel, dialog scroll, resize, preference change or Escape. Restore focus to the original project without jumping the page.
