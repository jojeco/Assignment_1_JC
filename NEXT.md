# Next Increment Suggestions

- [x] Added `accessibilityLabel` props to all three `TextInput`s and the enabled, disabled, and Clear `Pressable`s in `app/index.js` so screen readers can identify each field and button.
- Migrate the component to TypeScript (`.tsx`) and add basic prop types / interfaces — good practice for a CS portfolio piece.
- [x] Added a `README.md` with setup instructions (`npx expo start`), a feature overview, project structure, and tech stack.
- Add a screenshot of both screens to `README.md` so the repo is more presentable on GitHub.
- [x] Add input validation: disable the "Make my Hall Pass!" button when any field is empty, preventing the hall-pass page from rendering with blank values.
- [x] Replaced the `margin: -1000` / eyeballed `left` offset hack on the rotated "HALL PASS" label with a `leftContainer` sized to the label's rotated width and a negative margin derived from the label's own box (`-(360 - 80) / 2`), with a comment explaining the RN rotate/layout-box caveat.
- [x] Wired up the `<Signature>` component in `app/page2.js`: `onOK`/`onEmpty` now capture the signature and timestamp into state instead of discarding them, swapping the canvas for an image preview + "Signed at HH:MM" + a "Re-sign" button once signed. Removed the unreferenced `placeholder` style from `styles/page-styles.js` and added `signaturePreview`/`signedText`.
- [x] Added `KeyboardAvoidingView` to the form screen (`app/index.js`), replacing the root `View` so the keyboard no longer covers the inputs/buttons on smaller devices.
- Delete the unused `App.js` — `package.json`'s `"main"` field points to `expo-router/entry`, so `App.js` is dead code with `expo-router` in use.
- [x] Made the form screen keyboard-navigable and fixed a validation/params mismatch: refs + `returnKeyType`/`onSubmitEditing` move focus Name→Adjective→Event and submit to `/page2` on Done; Name/Adjective/Event values are now trimmed through one shared `trimmedParams` object used by both the `Link` href and the `router.push` fallback so they can't drift; added `maxLength` (30/20/40) with a live "count/max" counter per field, `autoCapitalize` per field, a "Still needed: ..." helper line while incomplete, and refocusing Name on Clear. `app/page2.js` gained a `firstParam()` helper so array/whitespace-only/undefined params still fall back to the blank-line placeholder.
