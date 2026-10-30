# 212 — Wireframe-to-interface

Khung thành UI

**Category:** Product · **Kind:** effect

![Wireframe-to-interface demo](../../assets/gifs/212-wireframe-to-interface.gif)

## Implementation recipe

Stage strokes, surfaces and real controls without replacing app identity.

Use real app elements when the design calls for live UI; presentation must never mutate business state.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 21, branch 1. Call `drawDemo(context, 212, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](22-product.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
