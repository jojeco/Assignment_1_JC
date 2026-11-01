// tests/madlibs.test.mjs
//
// Run with: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_TEMPLATE_ID,
  TEMPLATES,
  getTemplate,
  fillTemplate,
  renderSentence,
  nextTemplateId,
  randomTemplateId,
} from "../lib/madlibs.js";

const TOKENS = ["{person}", "{adjective}", "{event}"];
const SAMPLE_VALUES = { person: "Sam", adjective: "chaotic", event: "the pep rally" };
const ORIGINAL_SENTENCE =
  "Sam thought today was way too chaotic, so instead of going to the pep rally they stayed home.";

test("every template has a unique id, non-empty title, and all three tokens", () => {
  const seenIds = new Set();
  for (const template of TEMPLATES) {
    assert.ok(template.id && typeof template.id === "string", "id must be a non-empty string");
    assert.ok(!seenIds.has(template.id), `duplicate template id: ${template.id}`);
    seenIds.add(template.id);

    assert.ok(template.title && template.title.trim().length > 0, "title must be non-empty");

    for (const token of TOKENS) {
      assert.ok(
        template.text.includes(token),
        `template ${template.id} missing token ${token}`
      );
    }
  }
  assert.ok(TEMPLATES.length >= 6 && TEMPLATES.length <= 8, "expected 6-8 templates");
});

test("default template renders byte-identical to the original hard-coded sentence", () => {
  const rendered = renderSentence(DEFAULT_TEMPLATE_ID, SAMPLE_VALUES);
  assert.equal(rendered, ORIGINAL_SENTENCE);
});

test("getTemplate falls back to the default on unknown, empty, and undefined ids", () => {
  assert.equal(getTemplate("not-a-real-id").id, DEFAULT_TEMPLATE_ID);
  assert.equal(getTemplate("").id, DEFAULT_TEMPLATE_ID);
  assert.equal(getTemplate(undefined).id, DEFAULT_TEMPLATE_ID);
});

test("getTemplate reads array params like firstParam does", () => {
  const knownId = TEMPLATES[1].id;
  assert.equal(getTemplate([knownId]).id, knownId);
  assert.equal(getTemplate(["not-a-real-id"]).id, DEFAULT_TEMPLATE_ID);
});

test("blank/whitespace values become the placeholder", () => {
  const segments = fillTemplate(DEFAULT_TEMPLATE_ID, { person: "  ", adjective: "", event: undefined });
  const byField = Object.fromEntries(segments.filter((s) => s.field).map((s) => [s.field, s.text]));
  assert.equal(byField.person, "__________");
  assert.equal(byField.adjective, "__________");
  assert.equal(byField.event, "__________");
});

test("a custom placeholder value is honored", () => {
  const segments = fillTemplate(DEFAULT_TEMPLATE_ID, { placeholder: "???" });
  const byField = Object.fromEntries(segments.filter((s) => s.field).map((s) => [s.field, s.text]));
  assert.equal(byField.person, "???");
  assert.equal(byField.adjective, "???");
  assert.equal(byField.event, "???");
});

test("segment .field tags are correct and no empty literal segments appear", () => {
  const segments = fillTemplate(DEFAULT_TEMPLATE_ID, SAMPLE_VALUES);
  assert.ok(segments.some((s) => s.field === "person" && s.text === "Sam"));
  assert.ok(segments.some((s) => s.field === "adjective" && s.text === "chaotic"));
  assert.ok(segments.some((s) => s.field === "event" && s.text === "the pep rally"));
  for (const segment of segments) {
    assert.notEqual(segment.text, "");
  }
});

test("an unknown token like {foo} survives as literal text", () => {
  const segments = fillTemplate(
    { id: "custom", title: "Custom", text: "{person} saw a {foo} near {event}." },
    { person: "Sam", event: "the gym", adjective: "irrelevant" }
  );
  const rendered = segments.map((s) => s.text).join("");
  assert.equal(rendered, "Sam saw a {foo} near the gym.");
  assert.ok(segments.some((s) => s.text === "{foo}" && s.field === null));
});

test("a value containing literal brace text is not recursively substituted", () => {
  const segments = fillTemplate(DEFAULT_TEMPLATE_ID, {
    person: "{adjective}",
    adjective: "chaotic",
    event: "the dance",
  });
  const personSegment = segments.find((s) => s.field === "person");
  assert.equal(personSegment.text, "{adjective}");
  // Only one segment should be tagged field: "adjective" (the real token),
  // the literal text inside `person`'s value must not be re-tagged.
  const adjectiveSegments = segments.filter((s) => s.field === "adjective");
  assert.equal(adjectiveSegments.length, 1);
  assert.equal(adjectiveSegments[0].text, "chaotic");
});

test("nextTemplateId wraps last to first and handles unknown current ids", () => {
  const firstId = TEMPLATES[0].id;
  const secondId = TEMPLATES[1].id;
  const lastId = TEMPLATES[TEMPLATES.length - 1].id;

  assert.equal(nextTemplateId(firstId), secondId);
  assert.equal(nextTemplateId(lastId), firstId);
  assert.equal(nextTemplateId("not-a-real-id"), firstId);
});

test("randomTemplateId never returns excludeId (stub rng = 0)", () => {
  const excludeId = TEMPLATES[0].id;
  const result = randomTemplateId(excludeId, () => 0);
  assert.notEqual(result, excludeId);
});

test("randomTemplateId never returns excludeId (stub rng near 1)", () => {
  const excludeId = TEMPLATES[0].id;
  const result = randomTemplateId(excludeId, () => 0.9999);
  assert.notEqual(result, excludeId);
});

test("randomTemplateId never returns excludeId across 200 real Math.random draws", () => {
  const excludeId = TEMPLATES[Math.floor(TEMPLATES.length / 2)].id;
  for (let i = 0; i < 200; i += 1) {
    const result = randomTemplateId(excludeId);
    assert.notEqual(result, excludeId);
    assert.ok(TEMPLATES.some((t) => t.id === result), "must always return a real template id");
  }
});
