# 001 — Fade

Đổi độ trong suốt

**Category:** Foundations · **Kind:** effect

![Fade demo](../../assets/gifs/001-fade.gif)

## Implementation recipe

Interpolate opacity between 0 and 1 without changing layout.

Transform, opacity, filter or color interpolation. Keep a stable wrapper and animate a child.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 0, branch 0. Call `drawDemo(context, 1, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](01-foundations.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
