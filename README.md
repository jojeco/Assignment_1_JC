# Hall Pass Mad Libs

An [Expo Router](https://expo.github.io/router/) app built as a React Native class assignment. Fill in a **Name**, **Adjective**, and **Event** to generate a mad-libs style "Hall Pass" complete with today's date and a signature pad.

## Features

- **Form validation** — the "Make my Hall Pass!" button stays disabled until Name, Adjective, and Event are all filled in, with a "Still needed: ..." hint listing the missing fields.
- **Trimmed, length-limited inputs** — each field is trimmed and capped (Name 30, Adjective 20, Event 40 characters) with a live `count/max` counter under each input.
- **Keyboard-friendly navigation** — pressing next on the keyboard moves focus Name → Adjective → Event, and Done on the Event field submits the form (or jumps to the first empty field if anything is missing).
- **Keyboard-avoiding layout** — the form screen uses `KeyboardAvoidingView` so the keyboard doesn't cover the inputs or buttons.
- **Accessibility labels** — every input and button (including the disabled submit state) has an `accessibilityLabel` for screen readers.
- **Signature capture** — the Hall Pass screen includes a signature pad; once signed, it shows a preview image, a "Signed at HH:MM" timestamp, and a "Re-sign" button to clear and sign again.
- **Clear Text** — resets all three fields and refocuses the Name input.
- **Story templates** — a row of chips (plus "Surprise me") on the form screen lets you pick which mad-libs story gets built from your Name/Adjective/Event, and a "New story" button on the Hall Pass screen cycles to the next one without disturbing a signature you've already captured.

## Setup

```bash
npm install
npx expo start
```

Platform-specific shortcuts are also available via npm scripts:

```bash
npm run android
npm run ios
npm run web
```

## Project Structure

```
app/
  index.js            # Form screen — Name / Adjective / Event inputs, story picker
  page2.js            # Hall Pass screen — generated sentence, date, and signature pad
lib/
  madlibs.js          # Story templates + pure helpers (fillTemplate, getTemplate, ...)
styles/
  page-styles.js      # Shared styles for both screens
tests/
  madlibs.test.mjs    # node:test coverage for lib/madlibs.js
```

The app's entry point is `expo-router/entry` (see `"main"` in `package.json`), which drives file-based routing from the `app/` directory.

## Running tests

`lib/madlibs.js` is plain ESM with no React Native imports, so it can be tested directly with Node's built-in test runner — no Expo/Metro, no extra dependencies. Requires Node 22+ (for `node:test`'s ES module syntax detection, since `package.json` has no `"type": "module"`):

```bash
node --test tests/*.test.mjs
```

## Tech Stack

- [Expo](https://expo.dev/)
- [expo-router](https://expo.github.io/router/) — file-based navigation
- [react-native-signature-canvas](https://github.com/YanYuanFE/react-native-signature-canvas) — signature capture on the Hall Pass screen
