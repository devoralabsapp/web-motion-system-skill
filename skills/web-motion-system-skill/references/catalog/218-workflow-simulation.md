# 218 — Workflow simulation

Mô phỏng quy trình

**Category:** Product · **Kind:** effect

![Workflow simulation demo](../../assets/gifs/218-workflow-simulation.gif)

## Implementation recipe

Advance explicitly labeled demo records through valid process states.

Use real app elements when the design calls for live UI; presentation must never mutate business state.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 21, branch 7. Call `drawDemo(context, 218, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](22-product.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
