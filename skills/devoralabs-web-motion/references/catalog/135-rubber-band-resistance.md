# 135 — Rubber-band resistance

Kéo vượt có lực cản

**Category:** Physics · **Kind:** effect

![Rubber-band resistance demo](../../assets/gifs/135-rubber-band-resistance.gif)

## Implementation recipe

Compress displacement beyond a limit with a nonlinear resistance curve.

Keep physics bounded and deterministic enough to settle; preserve keyboard alternatives.

**Starting timing:** derive motion from input velocity or the spring model; settle and stop below an explicit displacement/velocity threshold.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 13, branch 4. Call `drawDemo(context, 135, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](14-physics.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
