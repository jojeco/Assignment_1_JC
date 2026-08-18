# Next up

A few small, contained follow-ups for a future pass on this project:

- `App.js` at the repo root looks unused now that routing lives under `app/` (expo-router). Confirm nothing still references it, then remove it in its own commit — worth a pause-and-ask before deleting since it's a whole-file removal.
- The Signature pad on `app/page2.js` renders but doesn't do anything yet — wire up its `onOK`/`onEmpty` handlers so a signature is actually captured/validated before the pass is considered complete.
- `styles/page-styles.js` still has a couple of layout hacks (`rotatedText`'s huge negative `margin`/`left`, and `rightContainer`'s negative `left`) that happen to look right by accident. Worth revisiting with proper flex/layout instead of magic offsets.
- No README yet, and no lint/CI config — either would help future contributors (or future-you) get oriented and catch regressions early. Consider a minimal ESLint setup plus a short README before doing much more feature work.
