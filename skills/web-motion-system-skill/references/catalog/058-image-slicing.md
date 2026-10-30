# 058 — Image slicing

Ảnh chia thành dải

**Category:** Images · **Kind:** effect

![Image slicing demo](../../assets/gifs/058-image-slicing.gif)

## Implementation recipe

Stagger translated image strips while preserving final registration.

Crop inside an image wrapper. Keep aspect ratios and link hit areas fixed.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 5, branch 7. Call `drawDemo(context, 58, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](06-images.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
