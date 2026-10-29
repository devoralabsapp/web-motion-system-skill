# 216 — Interactive before/after

So sánh trước sau

**Category:** Product · **Kind:** effect

![Interactive before/after demo](../../assets/gifs/216-interactive-before-after.gif)

## Implementation recipe

Bind a clipped comparison surface to a real range control or drag handle.

Use real app elements when the design calls for live UI; presentation must never mutate business state.

**Starting timing:** map actual scroll, pointer or drag progress to the visual range; use a short bounded follower only when needed. No fixed autoplay duration is required.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 21, branch 5. Call `drawDemo(context, 216, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](22-product.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
