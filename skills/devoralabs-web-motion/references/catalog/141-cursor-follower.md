# 141 — Cursor follower

Lớp theo chuột

**Category:** Pointer · **Kind:** effect

![Cursor follower demo](../../assets/gifs/141-cursor-follower.gif)

## Implementation recipe

Track pointer coordinates with a time-based follower on a decorative layer.

Provide touch/keyboard equivalents and avoid moving a hit target away from the pointer.

**Starting timing:** map actual scroll, pointer or drag progress to the visual range; use a short bounded follower only when needed. No fixed autoplay duration is required.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 14, branch 0. Call `drawDemo(context, 141, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](15-pointer.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
