# Web 2 — three Creative Lab directions

## Source map

- [creative-motion.js](../assets/source/web2/creative-motion.js): original host controller; intro, masked type, image scroll framing, hover, process steps and visibility.
- [creative.css](../assets/source/web2/creative.css): compositions, line-mask geometry, motion keyframes, responsive/reduced-motion rules. It expects host palette variables; it is not a standalone stylesheet.
- [build-site.mjs](../assets/source/web2/build-site.mjs): host-specific example of content-addressing Web 2's CSS → module → HTML → shell dependency chain. Adapt paths/build tools instead of executing it outside its host.
- [motion-notice.js](../assets/source/web2/motion-notice.js): host-toolbar example for a dismissible, localized reduced-motion explanation. It does not override the user's preference.

Use the latest verified motion behavior rather than an intermediate static fix. The four process steps are intended to animate.

## Frame Shift / Điện ảnh

Near-black canvas, charcoal panels, warm text, light crimson. Example tokens: background `#141515`, surface `#202222`, foreground `#F4F2EB`, accent `#F37668`, accent text `#251614`. The palette is subordinate to existing host branding unless this direction is requested.

- Hero leads into a large framed product preview and a real project index. Selecting an index item changes the chosen project; never autoplay a new project while the visitor is reading.
- Title phrases rise through masks. Framing opens from a bounded crop, usually with mild initial scale, and resolves with a decisive stop.
- In the source, preview scroll moves image Y from 0 toward −38px and scale from 1.085 toward 1; frame scale grows about 0.90→1. Keep these transforms inside the artwork, not on the selector's hit areas.
- Project image entrance opens from `inset(20% 12%)` / scale 0.9 to a full frame / scale 1 over ~1100ms. Reading copy follows in a controlled mask.
- A project preview can expand into its detail using the same FLIP clone method as Web 1. Dialog controls remain usable immediately; do not add fake play buttons, timecodes or editing timelines.

## Cobalt Court / Cobalt

Cobalt `#173CD7`, white text, acid-yellow actions `#F5FF70` with dark-blue text `#152581`. Use strong short italic headings and upright reading copy.

- Hero has an asymmetric headline/product composition. Projects form broad numbered horizontal rows, rather than recolored Frame Shift cards.
- Headline lines travel horizontally through masks with restrained skew. The reference uses about `translateX(-115%) skewX(-9deg)` → identity, ~1050ms, ~110ms line stagger.
- New project art opens in one direction; copy enters from about −45px while the crop reveals. Keep direction consistent across sections and theme transitions.
- Preview scroll shifts an artwork layer from about +28px toward 0 and scale 1.04→1; geometric accents respond to real selection or hover.
- Services can be large expandable rows. Do not shake the open text, rotate inputs or move a button under the pointer.

## Cutout Dept. / Collage

Lime `#D9EF73`, paper `#F8F7EB`, dark-green ink `#1E2218`, dark actions with white labels. Material cues include restrained paper fragments, a cut edge and tape; avoid heavy offset shadows.

- Hero resembles a curated work surface. Projects are upright dossiers with bounded art and separate readable text.
- Art opens from a mild paper fold, for example `perspective(1000px) rotateX(-28deg) translateY(55px)`, passes a small 3°/−5px overshoot, then settles flat over ~1100ms.
- A smaller general paper opening uses a −12° fold and +18px lift, a small overshoot, then identity over ~600–900ms.
- Only decorative paper/tape/art fragments rotate. Ordinary paragraphs, tables and form fields stay upright.
- Preview artwork can shift by up to about 18px with scroll. Decorations have bounded rotation; nothing spins indefinitely.

## Stable process-step integration

The four steps share one calm left-to-right reveal across all three themes. Each stable list item owns its real text; only the child number, heading and paragraph animate. Duration ~850ms, child stagger ~70ms, arrival easing `cubic-bezier(.16,.75,.2,1)`.

Do not clip the measured card. The earlier approach clipped an observer target and could trigger a feedback loop: enter → clip away → exit → rearm → enter, even with no actual scroll. A later static workaround removed the feature and was rejected. Preserve the motion and fix the trigger.

Portable example:

```html
<ol class="work-steps">
  <li data-reveal-anchor>
    <span data-reveal-part>01</span>
    <h3 data-reveal-part>Hiểu quy trình</h3>
    <p data-reveal-part>Cùng xem công việc đang diễn ra thế nào.</p>
  </li>
</ol>
```

```js
import {createStableReveal} from './stable-reveal.mjs';

const controller = createStableReveal({
  anchors: document.querySelectorAll('[data-reveal-anchor]'),
  parts: anchor => [...anchor.querySelectorAll('[data-reveal-part]')],
  isBlocked: () => Boolean(document.querySelector('dialog[open]'))
});

// Connect to the host lifecycle; these calls do not modify app data.
// controller.setVisible(false) when its view is hidden;
// controller.setVisible(true) when shown;
// controller.setReduced(true/false) for the site's own reduce setting;
// controller.refresh() after a layout change;
// controller.destroy() before unmounting.
```

The helper listens to system reduced motion itself. It combines that setting with the site's voluntary reduction. Do not create a second theme provider or replace the host preference store just to use it.

Trigger with stable geometry on actual scroll/resize: play after the wrapper enters the reading zone, then disarm. Rearm only when fully outside the viewport by a margin (reference 96px). Mere IntersectionObserver callbacks or small ±5px jitter must not initiate a replay. Normal reads end with identity transforms, no remaining clip and no running animations.

Keep the native content visible as the base state. Do not use `fill: forwards` to retain a clipped or hidden state. If focus enters a card during a reveal, cancel its owned animation and expose its controls immediately.

## Switching and lifecycle

Use the existing family/theme IDs, persistent choice and validated URL values. Keep project selection, open project, demo tab, order status/filter, cart, approval state and form/edited brief contents. Preserve the reader's current section and offset, with normal browser clamping near the end of a shorter page.

On theme switch, cancel the old controller's animation and apply only a short composition transition (~520–600ms). Do not replay the full intro on every switch. Stop owned work when its host view or browser tab is hidden, and refresh geometry when shown. For iframe messages, validate both origin and source before changing visibility/theme.
