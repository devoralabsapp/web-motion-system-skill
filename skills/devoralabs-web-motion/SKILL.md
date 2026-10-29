---
name: devoralabs-web-motion
description: Implement or adapt 240 numbered motion studies with individual GIF demos and recipes, plus DevoraLabs Web 1's six and Web 2's three motion styles. Use for typography, SVG, scroll, layout, UI, physics, particles, cinematic, product motion, triggers and easing; debug replay, flicker and cache while preserving app state and reduced motion.
---

# DevoraLabs Web Motion

Build selected motion from the **240-item GIF catalog** or the visual language of **Web 1 and Web 2**, adapted to the host. This is not authorization to rebuild content, add every effect, publish, or change another website in the project.

## Choose a catalog effect

Read [the catalog index](references/catalog.md) to select an ID, then only its individual recipe and related reliability guidance. The index routes to 24 group galleries and **240 individual pages, each with its own GIF**. The machine-readable registry is `assets/catalog/catalog.json`.

- IDs **001–220**: visual effects, variants and product patterns; some intentionally overlap.
- IDs **221–230**: event/input triggers, not standalone visual effects.
- IDs **231–240**: timing/easing/orchestration modes that compose with a visual property.

Each recipe points to its deterministic branch in `assets/catalog/demo-engine.mjs`; GIFs are under `assets/gifs/`. These are compact teaching studies, not production recordings. Shader/3D examples are explicitly Canvas 2D approximations; synthetic audio/data and simulated input are labeled. Do not present them as real sensors, true 3D rendering, an interactive GIF or benchmark evidence.

Port the selected mechanism into the host's real CSS/SVG/DOM/canvas/WebGL stack. Do not import or autoplay all 240 studies in a production page. Use the existing Web 1/Web 2 references when the user requests a whole motion direction rather than one catalog item.

## Choose the requested family

| Family | IDs | Read |
| --- | --- | --- |
| Web 1 | `classic`, `one-line`, `kinetic`, `layers`, `blueprint`, `orbit` | [Web 1 choreography](references/web1.md) |
| Web 2 | `frame-shift`, `cobalt-court`, `cutout-dept` | [Web 2 choreography](references/web2.md) |
| Either family: blinking, platform differences, cache, lifecycle or regression work | Only affected styles | [Reliability and verification](references/reliability.md) |

Infer the family from the visible section or existing selector when possible. For all styles, cover six plus three, rather than only Creative Lab. Keep a bounded bug fix within the selected family.

Source snapshots in `assets/source/` document the implementation at commit `fde1ebe1d09ed2e5cf29cfa6574713133dbcfb30`. They are **host-dependent study material**, not a standalone app or universal provider. Only read the files listed in the relevant family reference. Adapt app-specific localization imports, selectors and events. Use an existing animation library when appropriate; adding one is not required.

## Integration contract

1. Inspect the existing theme registry, URL/bootstrap behavior, motion preference, app state and animation owners. Keep the selected site, routes and protected surfaces intact. A Web 2 fix does not authorize editing Web 1.
2. Define a compact storyboard: what the visitor sees, what scroll position changes, when controls become stable, and what replay means. Appearance, timing and composition change together; a palette swap is insufficient.
3. Separate **presentation progress** from **application state**. Scroll, replay and theme changes must not remount demos, translate user input, reset filters/carts, approve requests, submit forms or replace the selected demo tab.
4. Keep trigger geometry and hit areas stable. Use an untransformed wrapper for measurement and animate its children. A reveal must not interpret its own clipping as viewport exit/re-entry.
5. Implement one complete section and inspect real intermediate frames before extending. Hover and fade support the signature: framing, SVG morphing, typography, depth or material response.
6. Test normal/reduced motion, reverse scrolling, focus, dialog dismissal, hidden views and ordinary reload. For production bugs, verify deployed asset contents and commit, not just a successful build.

## Shared motion decisions

- Keep native scrolling. Coalesce scroll/resize work into a single pending `requestAnimationFrame`; stop when settled. A bounded time-based follower suits Web 1's story, not an infinite loop for every reveal.
- Batch geometry reads before writes. Put frequently updated CSS variables on the affected scene, not the document root.
- Keep CTAs usable immediately. Before a table, cart or form receives interaction, settle its presentation into the final usable plane. If unfinished visual modules are inert, provide an immediately usable “Try demo” action to reach the finished state.
- Preserve Vietnamese diacritics and emphasis. Mask intentional lines/phrases; do not split UTF-16 code units or clip accents.
- Combine OS/browser reduced motion with the site's voluntary reduce setting. Do not claim a toggle overrides the OS while CSS/JS still enforce it. Explain reduction in a dismissible notice, with full content and functionality retained.
- Newly integrated controllers need animation ownership, `stop`, `refresh`, visibility handling and `destroy`. Cancel only owned animation, dispose listeners/observers, remove clones and restore final styles. Theme changes and Escape must not leave stuck clips or overlays.
- Replay on a full viewport exit and return, real reverse scrolling, or an explicit action. Boundary jitter, a filter change or a form update is not a replay request.

## Portable reveal helper

`assets/stable-reveal.mjs` implements reading-card entrances such as Web 2's four process steps. It measures stable wrappers, enters near `0.88 × viewport height`, and rearms only after a `96px` full exit. Tune those starting values to the host. Read the [integration example](references/web2.md#stable-process-step-integration).

This helper does not replace Web 1's reversible story controller. Do not solve an intended motion feature by leaving it permanently static unless the user requests that result.

## Verification and handoff

Use [the verification matrix](references/reliability.md#browser-verification) for affected modes. Inspect actual computed styles during and after motion; a class, counter or animation object alone does not prove visible movement. Test cold and warm caches when suspected. Do not conclude “Windows bug” or “stale cache” from a platform difference alone.

When using or editing the portable helper, run:

```text
node scripts/verify-reveal.mjs
```

The script uses Playwright already available in the environment; optional `PLAYWRIGHT_MODULE` chooses an installed module path and `BROWSER_CHANNEL=chrome` selects installed Chrome. It serves an isolated local fixture without accessing production. It does not install dependencies or deploy.

Deliver the selected styles, behavior changes, state preserved, tested environments and verification limits. Include a preview or recording when supported; browser recording is not an FPS measurement. Follow explicit Git/deploy instructions; invoking this skill alone does not authorize publishing.
