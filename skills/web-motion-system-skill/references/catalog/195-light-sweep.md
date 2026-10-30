# 195 — Light sweep

Vệt sáng quét

**Category:** Cinematic · **Kind:** effect

![Light sweep demo](../../assets/gifs/195-light-sweep.gif)

## Implementation recipe

Move a clipped specular gradient across a material surface.

Let framing, focus or lighting serve a concrete transition. Avoid invented playback controls and telemetry.

**Starting timing:** start around 900ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 19, branch 4. Call `drawDemo(context, 195, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](20-cinematic.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
