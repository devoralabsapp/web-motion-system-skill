# 063 — Iris transition

Đóng mở khẩu độ

**Category:** Masks · **Kind:** effect

![Iris transition demo](../../assets/gifs/063-iris-transition.gif)

## Implementation recipe

Use rotating polygon blades around a central aperture.

Animate clip/mask layers, not measured scroll-trigger containers or focus outlines.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 6, branch 2. Call `drawDemo(context, 63, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](07-masks.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
