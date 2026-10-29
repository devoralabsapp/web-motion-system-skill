# 230 — Audio/data-driven

Theo tín hiệu đầu vào

**Category:** Triggers · **Kind:** trigger

![Audio/data-driven demo](../../assets/gifs/230-audio-data-driven.gif)

## Implementation recipe

Map measured input to bounded visual parameters; GIF input is synthetic.

The GIF simulates an input event; it cannot receive hover, focus or scroll. Implement the actual event in the host app.

**Starting timing:** compose this controller with a selected visual property; it does not determine the visual design by itself.

## Adaptation checks

End in the intended readable, interactive state. Do not retain a clipped, distorted or transparent final control.

The GIF cursor, viewport or input trace is simulated. Wire the real event and cancellation/focus behavior in the host application.

Verify a real intermediate frame and the settled state; do not infer visible movement from a class or animation object alone.

## Demo source

[Deterministic renderer](../../assets/catalog/demo-engine.mjs): zero-based group 22, branch 9. Call `drawDemo(context, 230, normalizedTime)` on a 400 × 260 Canvas. The full source is study material; port only the selected mechanism into production.

[Group GIFs](23-triggers.md) · [Catalog index](../catalog.md) · [Reliability](../reliability.md)
