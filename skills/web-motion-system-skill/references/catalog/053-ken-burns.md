# 053 — Ken Burns

Pan zoom chậm

**Category:** Images · **Kind:** effect

![Ken Burns demo](../../assets/gifs/053-ken-burns.gif)

## Implementation recipe

Animate scale and translation within a fixed photo crop.

Crop inside an image wrapper. Keep aspect ratios and link hit areas fixed.

**Starting timing:** start around 8–16 seconds for a slow photo pan/zoom, with pause/visibility and reduced-motion handling.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 5, branch 2. Call `drawDemo(context, 53, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](06-images.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
