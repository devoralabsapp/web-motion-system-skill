# 069 — Cursor-follow mask

Mask theo con trỏ

**Category:** Masks · **Kind:** effect

![Cursor-follow mask demo](../../assets/gifs/069-cursor-follow-mask.gif)

## Implementation recipe

Track pointer position with a bounded circular reveal mask.

Animate clip/mask layers, not measured scroll-trigger containers or focus outlines.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 6, branch 8. Call `drawDemo(context, 69, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](07-masks.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
