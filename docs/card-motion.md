# 24 card motion families

The explorer applies one card choreography to each of its 24 categories: ten cards per family, 240 cards total. The study **inside** a card still renders its own catalog effect. Card entrances and hover responses are a separate presentation layer.

| Category | Card motion | Catalog starting point |
| --- | --- | --- |
| Foundations | Fade up | 011 |
| Entrances | Slide from left | 013 |
| Exits | Slide from right | 014 |
| Typography | Word stagger | 032 |
| Advanced type | Fill reveal | 042 |
| Images | Pan & zoom | 053 |
| Masks | Iris reveal | 062 |
| SVG paths | Outline draw | 071 |
| Scroll | Layered parallax | 083 |
| Layout | Grow from origin | 016 |
| Navigation | Diagonal wipe | 110 |
| Controls | Press & release | 111 |
| Feedback | Shimmer sweep | 123 |
| Physics | Spring return | 133 |
| Pointer | Pointer tilt | 144 |
| Depth | Perspective flip | 152 |
| Paper | Paper unfold | 162 |
| Particles | Particle reveal | 171 |
| Distortion | Elastic distortion | 181 |
| Cinematic | Cinematic framing | 191 |
| Data | Progress accent | 202 |
| Product | UI assembly | 219 |
| Triggers | Focus spotlight | 120 |
| Timing | Sequenced reveal | 240 |

These are adaptations for a card surface, not claims that the full catalog renderer is imported into each card. The progress accent and particles are decorative, not business metrics or simulated loading.

## Structure and lifecycle

`web/card-motion.js` owns profiles and finite Web Animations. It measures the untransformed `.motion-card` article and animates its child `.card-surface`, artwork, text or decorative layers. Hover transforms only the canvas; save buttons and navigation hit areas stay fixed. Focus and pointer activation settle an entrance immediately. No card DOM or canvas is cloned, and animation progress never modifies saved items or demo state.

An entrance begins when the stable anchor reaches 94% of the viewport height. A full exit beyond a 96px margin rearms it. Small scroll changes near the entry threshold do not rearm it. Finite animations use roughly 0.5–1 second with short column delays, then release all animated properties to their natural, visible layout. No entrance loops while stationary.

Switching views, hiding the document, filtering cards or enabling reduced motion cancels owned work. Filtering aborts old card listeners before registering the new nodes. The controller has `refresh`, `clear`, `setVisible`, `preferenceChanged` and `destroy`. Scroll/resize measurement runs on demand in a coalesced RAF, with geometry reads batched before writes.

The operating system preference and the site's Pause motion action disable these card treatments together. Manual playback of an individual inner demo remains available, as it did before this layer was added.

## Verification

With the local explorer serving:

```sh
npm run cards:verify
npm run explorer:verify
```

`cards:verify` checks all 24 rendered mid-animation and settled states, exact 10-card assignments, stationary stability, boundary jitter, full-exit replay, focus settlement, stable hover hit areas and reduced-motion layouts at 320/390/768/1024/1440px. It writes frame captures and a JSON report outside the repo. `explorer:verify` covers all 240 inner studies and the existing application interactions.
