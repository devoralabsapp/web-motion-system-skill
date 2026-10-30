# 098 — Sliding navigation indicator

Chỉ báo trượt

**Category:** Layout · **Kind:** effect

![Sliding navigation indicator demo](../../assets/gifs/098-sliding-navigation-indicator.gif)

## Implementation recipe

Measure the selected tab and animate one shared indicator.

Measure before/after layout once; animate visual deltas without changing DOM identity or app data.

**Starting timing:** start around 240–500ms for layout changes; measure once, support interruption and preserve element identity.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 9, branch 7. Call `drawDemo(context, 98, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](10-layout.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
