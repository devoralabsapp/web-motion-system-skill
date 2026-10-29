# 166 — Card fan

Xòe thẻ

**Category:** Paper · **Kind:** effect

![Card fan demo](../../assets/gifs/166-card-fan.gif)

## Implementation recipe

Rotate cards around a common lower pivot with a spread parameter.

Restrict rotations/folds to artwork; real paragraphs, forms and controls remain upright.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 16, branch 5. Call `drawDemo(context, 166, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](17-paper.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
