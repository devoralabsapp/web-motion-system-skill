# 092 — Animated grid reflow

Lưới chuyển vị trí

**Category:** Layout · **Kind:** effect

![Animated grid reflow demo](../../assets/gifs/092-animated-grid-reflow.gif)

## Implementation recipe

Keep keyed card identities and animate measured grid placement changes.

Measure before/after layout once; animate visual deltas without changing DOM identity or app data.

**Starting timing:** start around 240–500ms for layout changes; measure once, support interruption and preserve element identity.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 9, branch 1. Call `drawDemo(context, 92, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](10-layout.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
