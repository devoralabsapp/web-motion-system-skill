# 137 — Pointer repulsion

Vật tránh con trỏ

**Category:** Physics · **Kind:** effect

![Pointer repulsion demo](../../assets/gifs/137-pointer-repulsion.gif)

## Implementation recipe

Apply distance-weighted repulsion and restore each rest position afterward.

Keep physics bounded and deterministic enough to settle; preserve keyboard alternatives.

**Starting timing:** derive motion from input velocity or the spring model; settle and stop below an explicit displacement/velocity threshold.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 13, branch 6. Call `drawDemo(context, 137, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](14-physics.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
