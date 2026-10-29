# 122 — Determinate progress

Tiến trình có dữ liệu

**Category:** Feedback · **Kind:** effect

![Determinate progress demo](../../assets/gifs/122-determinate-progress.gif)

## Implementation recipe

Use true completion data to set a linear progress bar.

Only show actual loading/progress or an explicitly labeled illustration; never fake success.

**Starting timing:** start around 1200ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 12, branch 1. Call `drawDemo(context, 122, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](13-feedback.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
