# 240 — Sequenced choreography

Nối nhiều chuyển động

**Category:** Timing · **Kind:** timing

![Sequenced choreography demo](../../assets/gifs/240-sequenced-choreography.gif)

## Implementation recipe

Use a timeline with explicit phase boundaries and cancellation semantics.

This changes how another effect plays. Compose it with a visible property rather than calling it a separate visual effect.

**Starting timing:** compose this controller with a selected visual property; it does not determine the visual design by itself.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Apply this timing to a real property or timeline. Match endpoints and settlement; do not trigger business events on repeated timeline ticks.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 23, branch 9. Call `drawDemo(context, 240, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](24-timing.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
