# 050 — Reading highlight

Nhấn theo đoạn đọc

**Category:** Advanced type · **Kind:** effect

![Reading highlight demo](../../assets/gifs/050-reading-highlight.gif)

## Implementation recipe

Move a highlight behind text according to actual reading progress.

Treat decorative duplicates as aria-hidden. Provide a static readable label beneath the visual treatment.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 4, branch 9. Call `drawDemo(context, 50, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](05-advanced-type.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
