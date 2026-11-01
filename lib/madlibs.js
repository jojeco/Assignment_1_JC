// lib/madlibs.js
//
// Plain ESM, no JSX/react-native imports, so `node --test tests/*.test.mjs` can run it
// directly. A "template" is `{ id, title, text }`, where `text` mixes in
// `{person}`/`{adjective}`/`{event}` tokens that `fillTemplate` splits into
// ordered segments for app/page2.js to render as nested <Text> elements.

export const DEFAULT_TEMPLATE_ID = "stayed-home";

const TOKEN_FIELDS = ["person", "adjective", "event"];
const DEFAULT_PLACEHOLDER = "__________";

// Every template below uses all three tokens at least once. Template #1
// reproduces today's one-and-only hard-coded sentence byte-for-byte so a
// fresh load (nothing picked yet) renders identically to the old app.
export const TEMPLATES = Object.freeze([
  {
    id: "stayed-home",
    title: "Stayed Home",
    text: "{person} thought today was way too {adjective}, so instead of going to {event} they stayed home.",
  },
  {
    id: "principals-office",
    title: "Principal's Office",
    text: "{person} felt extremely {adjective} during class, so they skipped {event} and ended up in the principal's office instead.",
  },
  {
    id: "locker-mixup",
    title: "Locker Mix-Up",
    text: "{person} opened the wrong locker while feeling {adjective}, spilling everything meant for {event} across the hallway.",
  },
  {
    id: "cafeteria-chaos",
    title: "Cafeteria Chaos",
    text: "{person} was acting {adjective} in the cafeteria and missed {event} because of the commotion.",
  },
  {
    id: "bus-breakdown",
    title: "Bus Breakdown",
    text: "{person} got stuck on a {adjective} bus that broke down on the way to {event}.",
  },
  {
    id: "library-escape",
    title: "Library Escape",
    text: "{person} hid in the library because today felt too {adjective}, missing {event} entirely.",
  },
]);

// Matches the existing `firstParam` convention in app/page2.js: an array
// param reads its first element, undefined/null/unknown ids fall back to
// the default template.
export function getTemplate(id) {
  const resolvedId = Array.isArray(id) ? id[0] : id;
  const found = TEMPLATES.find((template) => template.id === resolvedId);
  return found || TEMPLATES.find((template) => template.id === DEFAULT_TEMPLATE_ID);
}

function resolveTemplate(templateOrId) {
  if (templateOrId && typeof templateOrId === "object" && typeof templateOrId.text === "string") {
    return templateOrId;
  }
  return getTemplate(templateOrId);
}

// Splits template.text on {person}/{adjective}/{event} tokens into ordered
// segments. Unknown tokens like {foo} are left as literal text. Because we
// scan the *original* template text once and only ever write form values
// into segment.text (never back into the string being scanned), a value
// like "{adjective}" is inserted as plain text and never re-processed.
export function fillTemplate(templateOrId, values = {}) {
  const template = resolveTemplate(templateOrId);
  const safeValues = values || {};
  const placeholder = safeValues.placeholder || DEFAULT_PLACEHOLDER;
  const text = template.text;
  const tokenPattern = /\{([a-zA-Z]+)\}/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), field: null });
    }

    const tokenName = match[1];
    if (TOKEN_FIELDS.includes(tokenName)) {
      const raw = safeValues[tokenName];
      const isBlank = raw === undefined || raw === null || String(raw).trim() === "";
      segments.push({ text: isBlank ? placeholder : String(raw), field: tokenName });
    } else {
      // Unknown token: keep the literal "{foo}" text, not substituted.
      segments.push({ text: match[0], field: null });
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), field: null });
  }

  // Defensive: never hand back an empty-string literal segment.
  return segments.filter((segment) => segment.text !== "");
}

export function renderSentence(templateOrId, values) {
  return fillTemplate(templateOrId, values)
    .map((segment) => segment.text)
    .join("");
}

export function nextTemplateId(currentId) {
  const index = TEMPLATES.findIndex((template) => template.id === currentId);
  if (index === -1) {
    return TEMPLATES[0].id;
  }
  const nextIndex = (index + 1) % TEMPLATES.length;
  return TEMPLATES[nextIndex].id;
}

// rng is injectable so tests can use a deterministic stub instead of
// Math.random. Computed directly from the exclude-filtered candidate list
// rather than a reroll loop, so this can never infinite-loop.
export function randomTemplateId(excludeId, rng = Math.random) {
  if (TEMPLATES.length < 2) {
    return TEMPLATES[0].id;
  }
  const candidates = TEMPLATES.filter((template) => template.id !== excludeId);
  if (candidates.length === 0) {
    return TEMPLATES[0].id;
  }
  const index = Math.min(Math.floor(rng() * candidates.length), candidates.length - 1);
  return candidates[index].id;
}
