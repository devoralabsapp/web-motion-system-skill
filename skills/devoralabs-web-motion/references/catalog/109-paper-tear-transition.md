# 109 — Paper-tear transition

Xé giấy lộ trang

**Category:** Navigation · **Kind:** effect

![Paper-tear transition demo](../../assets/gifs/109-paper-tear-transition.gif)

## Implementation recipe

Move an irregular paper boundary across the next scene.

Preserve navigation semantics and focus; clean up overlays and handle interrupted navigation.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 10, branch 8. Call `drawDemo(context, 109, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](11-navigation.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
