# 042 — Text fill reveal

Màu lấp vào chữ

**Category:** Advanced type · **Kind:** effect

![Text fill reveal demo](../../assets/gifs/042-text-fill-reveal.gif)

## Implementation recipe

Clip a moving color plane inside a static text mask.

Treat decorative duplicates as aria-hidden. Provide a static readable label beneath the visual treatment.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 4, branch 1. Call `drawDemo(context, 42, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](05-advanced-type.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
