# Next Increment Suggestions

- [x] Added `accessibilityLabel` props to all three `TextInput`s and the enabled, disabled, and Clear `Pressable`s in `app/index.js` so screen readers can identify each field and button.
- Migrate the component to TypeScript (`.tsx`) and add basic prop types / interfaces — good practice for a CS portfolio piece.
- Add a `README.md` with setup instructions (`npx expo start`), a brief description of the app, and a screenshot so the repo is presentable on GitHub.
- [x] Add input validation: disable the "Make my Hall Pass!" button when any field is empty, preventing the hall-pass page from rendering with blank values.
- [x] Replaced the `margin: -1000` / eyeballed `left` offset hack on the rotated "HALL PASS" label with a `leftContainer` sized to the label's rotated width and a negative margin derived from the label's own box (`-(360 - 80) / 2`), with a comment explaining the RN rotate/layout-box caveat.
- [x] Wired up the `<Signature>` component in `app/page2.js`: `onOK`/`onEmpty` now capture the signature and timestamp into state instead of discarding them, swapping the canvas for an image preview + "Signed at HH:MM" + a "Re-sign" button once signed. Removed the unreferenced `placeholder` style from `styles/page-styles.js` and added `signaturePreview`/`signedText`.
- Add `KeyboardAvoidingView`/`ScrollView` to the form screen (`app/index.js`) so the keyboard doesn't cover the inputs on smaller devices.
- Delete the unused `App.js` — `package.json`'s `"main"` field points to `expo-router/entry`, so `App.js` is dead code with `expo-router` in use.
