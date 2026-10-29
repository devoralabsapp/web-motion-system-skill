# 034 — Typewriter

Gõ chữ

**Category:** Typography · **Kind:** effect

![Typewriter demo](../../assets/gifs/034-typewriter.gif)

## Implementation recipe

Reveal grapheme clusters at a timed rate with an optional decorative caret.

Preserve semantic text, grapheme clusters, Vietnamese accents and accessible reading order.

**Starting timing:** start around 850ms for a discrete transition; ongoing indicators follow real activity and stop when it ends. The 3-second teaching GIF is not a required production duration.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

Preserve focus, selected items and form/demo state. Respect reduced motion and stop work in hidden views.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 3, branch 3. Call `drawDemo(context, 34, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](04-typography.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
