/**
 * Portable reading-card reveal, derived from Web 2's corrected process steps.
 * Keep each anchor untransformed/unclipped. Animate only its child parts.
 * Base CSS must show final readable content. No fill mode retains hidden state.
 * Caller owns app state and should call refresh() after blocked layouts settle.
 */
export function createStableReveal({
  anchors,
  parts = el => [...el.children],
  duration = 850,
  stagger = 70,
  enterRatio = 0.88,
  exitMargin = 96,
  isBlocked = () => false,
  keyframes = [{clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0)'}]
}) {
  const states = [...anchors].map(el => ({el, armed: true, animations: new Set()}));
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  let frame = 0, hostVisible = true, userReduced = false, destroyed = false;
  const reduced = () => media.matches || userReduced;
  const available = () => !destroyed && hostVisible && !document.hidden && !reduced() && !isBlocked();

  function cancel(state) {
    for (const animation of state.animations) animation.cancel();
    state.animations.clear();
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    states.forEach(cancel);
  }
  function update() {
    frame = 0;
    if (!available()) return;
    // Complete layout reads before animation writes.
    const measured = states.map(state => ({state, rect: state.el.getBoundingClientRect()}));
    for (const {state, rect} of measured) {
      if (rect.bottom < -exitMargin || rect.top > innerHeight + exitMargin) {
        if (!state.armed) { cancel(state); state.armed = true; }
        continue;
      }
      if (state.el.contains(document.activeElement)) {
        cancel(state);
        state.armed = false;
        continue;
      }
      if (!state.armed || rect.top >= innerHeight * enterRatio || rect.bottom <= 0) continue;
      state.armed = false; // Disarm before any animated style can change.
      [...parts(state.el)].forEach((part, index) => {
        const animation = part.animate(keyframes, {
          duration, delay: index * stagger,
          easing: 'cubic-bezier(.16,.75,.2,1)', fill: 'none'
        });
        state.animations.add(animation);
        const clear = () => state.animations.delete(animation);
        animation.finished.then(clear, clear);
      });
    }
  }
  function refresh() {
    if (available() && !frame) frame = requestAnimationFrame(update);
  }
  function setVisible(next) {
    hostVisible = Boolean(next);
    if (!hostVisible) stop(); else refresh();
  }
  function setReduced(next) {
    userReduced = Boolean(next);
    if (reduced()) stop(); else refresh();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    stop();
    listeners.abort();
  }
  const options = {signal: listeners.signal, passive: true};
  addEventListener('scroll', refresh, options);
  addEventListener('resize', refresh, options);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else refresh();
  }, {signal: listeners.signal});
  document.addEventListener('focusin', event => {
    for (const state of states) if (state.el.contains(event.target)) {
      state.armed = false;
      cancel(state);
    }
  }, {signal: listeners.signal});
  media.addEventListener('change', () => {
    if (reduced()) stop(); else refresh();
  }, {signal: listeners.signal});
  refresh();
  return {refresh, stop, setVisible, setReduced, destroy};
}
