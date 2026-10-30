# 149 — Particle cursor

Hạt theo con trỏ

**Category:** Pointer · **Kind:** effect

![Particle cursor demo](../../assets/gifs/149-particle-cursor.gif)

## Implementation recipe

Emit a capped set of fading particles from pointer samples.

Provide touch/keyboard equivalents and avoid moving a hit target away from the pointer.

**Starting timing:** map actual scroll, pointer or drag progress to the visual range; use a short bounded follower only when needed. No fixed autoplay duration is required.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 14, branch 8. Call `drawDemo(context, 149, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](15-pointer.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
