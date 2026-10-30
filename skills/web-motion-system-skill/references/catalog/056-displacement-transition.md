# 056 — Displacement transition

Ảnh chuyển qua biến dạng

**Category:** Images · **Kind:** effect

![Displacement transition demo](../../assets/gifs/056-displacement-transition.gif)

## Implementation recipe

Offset sampled image strips with a displacement field during the blend.

Crop inside an image wrapper. Keep aspect ratios and link hit areas fixed.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 5, branch 5. Call `drawDemo(context, 56, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](06-images.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
