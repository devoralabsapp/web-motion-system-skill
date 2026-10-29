# 147 — Velocity stretch

Kéo dài theo tốc độ

**Category:** Pointer · **Kind:** effect

![Velocity stretch demo](../../assets/gifs/147-velocity-stretch.gif)

## Implementation recipe

Orient an ellipse along smoothed pointer velocity with a scale limit.

Provide touch/keyboard equivalents and avoid moving a hit target away from the pointer.

**Starting timing:** map actual scroll, pointer or drag progress to the visual range; use a short bounded follower only when needed. No fixed autoplay duration is required.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 14, branch 6. Call `drawDemo(context, 147, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](15-pointer.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
