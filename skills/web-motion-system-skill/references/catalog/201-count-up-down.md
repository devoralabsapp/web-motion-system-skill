# 201 — Count-up/down

Số đổi giá trị

**Category:** Data · **Kind:** effect

![Count-up/down demo](../../assets/gifs/201-count-up-down.gif)

## Implementation recipe

Interpolate a display value toward the actual new numeric state.

Derive values from actual data. GIF values are labeled demo; provide readable data alternatives in production.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 20, branch 0. Call `drawDemo(context, 201, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](21-data.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
