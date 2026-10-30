# 188 — Fluid gradient

Màu như chất lỏng

**Category:** Distortion · **Kind:** effect

![Fluid gradient demo](../../assets/gifs/188-fluid-gradient.gif)

## Implementation recipe

Animate smooth gradient centers and blending weights.

These GIFs are Canvas 2D studies. Use shaders, mesh rendering or compositing when actual production fidelity needs them.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

This preview is a Canvas 2D approximation of the visual principle. For true 3D, shaders or physical material behavior, build the appropriate renderer and verify depth, interaction and performance separately.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 18, branch 7. Call `drawDemo(context, 188, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](19-distortion.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
