# 169 — Sticker peel/lift

Nhấc nhãn dán

**Category:** Paper · **Kind:** effect

![Sticker peel/lift demo](../../assets/gifs/169-sticker-peel-lift.gif)

## Implementation recipe

Bend or lift a decorative corner with a restrained underside cue.

Restrict rotations/folds to artwork; real paragraphs, forms and controls remain upright.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 16, branch 8. Call `drawDemo(context, 169, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](17-paper.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
