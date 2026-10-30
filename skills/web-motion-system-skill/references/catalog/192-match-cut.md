# 192 — Match cut

Nối cảnh tương ứng

**Category:** Cinematic · **Kind:** effect

![Match cut demo](../../assets/gifs/192-match-cut.gif)

## Implementation recipe

Align a shared shape across two scene compositions during the cut.

Let framing, focus or lighting serve a concrete transition. Avoid invented playback controls and telemetry.

**Starting timing:** start around 900ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 19, branch 1. Call `drawDemo(context, 192, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](20-cinematic.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
