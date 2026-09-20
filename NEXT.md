# Next Increment Suggestions

- [x] Added `accessibilityLabel` props to all three `TextInput`s and the enabled, disabled, and Clear `Pressable`s in `app/index.js` so screen readers can identify each field and button.
- Migrate the component to TypeScript (`.tsx`) and add basic prop types / interfaces — good practice for a CS portfolio piece.
- Add a `README.md` with setup instructions (`npx expo start`), a brief description of the app, and a screenshot so the repo is presentable on GitHub.
- [x] Add input validation: disable the "Make my Hall Pass!" button when any field is empty, preventing the hall-pass page from rendering with blank values.
- [x] Replaced the `margin: -1000` / eyeballed `left` offset hack on the rotated "HALL PASS" label with a `leftContainer` sized to the label's rotated width and a negative margin derived from the label's own box (`-(360 - 80) / 2`), with a comment explaining the RN rotate/layout-box caveat.
