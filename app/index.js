import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import React from "react";
import Styles from "../styles/page-styles";
import { Link, router } from "expo-router";
import { TEMPLATES, DEFAULT_TEMPLATE_ID, randomTemplateId, requiredFields } from "../lib/madlibs";

const LIMITS = {
  name: 30,
  adjective: 20,
  event: 40,
  noun: 20,
};

const FIELD_LABELS = { person: "Name", adjective: "Adjective", event: "Event", noun: "Noun" };

export default function Page() {

  const [person, onChangeName] = React.useState("");
  const [adjective, onChangeAdjective] = React.useState("");
  const [event, onChangeEvent] = React.useState("");
  const [noun, onChangeNoun] = React.useState("");
  const [templateId, setTemplateId] = React.useState(DEFAULT_TEMPLATE_ID);

  const nameRef = React.useRef(null);
  const adjectiveRef = React.useRef(null);
  const eventRef = React.useRef(null);
  const nounRef = React.useRef(null);

  const instruct = "Fill in all the boxes below \n and press 'Make my Hall Pass' to get your pass!";

  const needed = requiredFields(templateId);
  const needsNoun = needed.includes("noun");

  const values = { person, adjective, event, noun };
  const isComplete = needed.every((field) => values[field].trim() !== "");

  const trimmedParams = {
    person: person.trim(),
    adjective: adjective.trim(),
    event: event.trim(),
    noun: noun.trim(),
    template: templateId,
  };

  const missingFields = needed
    .filter((field) => trimmedParams[field] === "")
    .map((field) => FIELD_LABELS[field]);

  const focusFirstEmpty = () => {
    if (trimmedParams.person === "") {
      nameRef.current?.focus();
    } else if (trimmedParams.adjective === "") {
      adjectiveRef.current?.focus();
    } else if (trimmedParams.event === "") {
      eventRef.current?.focus();
    } else if (needsNoun && trimmedParams.noun === "") {
      nounRef.current?.focus();
    }
  };

  const handleEventSubmit = () => {
    if (isComplete) {
      router.push({ pathname: "/page2", params: trimmedParams });
    } else {
      focusFirstEmpty();
    }
  };

  const clearFields = () => {
    onChangeName("");
    onChangeAdjective("");
    onChangeEvent("");
    onChangeNoun("");
    // templateId is intentionally left alone: clearing the words someone
    // typed shouldn't also throw away the story they picked for them.
    nameRef.current?.focus();
  }

  return (
    <KeyboardAvoidingView style={Styles.page} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={Styles.title}>Assignment 1</Text>
      <Text style={Styles.subtitle}>Hall Pass Mad Libs</Text>
      <Text style={Styles.instStyle}>{instruct}</Text>
      <Text style={Styles.subtitle}>Pick a story:</Text>
      <View style={Styles.chipRow}>
        {TEMPLATES.map((t) => (
          <Pressable
            key={t.id}
            style={[Styles.chip, t.id === templateId && Styles.chipSelected]}
            onPress={() => setTemplateId(t.id)}
            accessibilityLabel={`Story: ${t.title}`}
            accessibilityState={{ selected: t.id === templateId }}
          >
            <Text style={Styles.chipText}>{t.title}</Text>
          </Pressable>
        ))}
        <Pressable
          style={Styles.chip}
          onPress={() => setTemplateId(randomTemplateId(templateId))}
          accessibilityLabel="Story: Surprise me"
        >
          <Text style={Styles.chipText}>Surprise me</Text>
        </Pressable>
      </View>
      <TextInput
        ref={nameRef}
        style={Styles.input}
        onChangeText={onChangeName}
        value={person}
        placeholder="A Name"
        accessibilityLabel="Name"
        maxLength={LIMITS.name}
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => adjectiveRef.current?.focus()}
      />
      <Text style={Styles.charCount}>{person.length}/{LIMITS.name}</Text>
      <TextInput
        ref={adjectiveRef}
        style={Styles.input}
        onChangeText={onChangeAdjective}
        value={adjective}
        placeholder="Adjective"
        accessibilityLabel="Adjective"
        maxLength={LIMITS.adjective}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => eventRef.current?.focus()}
      />
      <Text style={Styles.charCount}>{adjective.length}/{LIMITS.adjective}</Text>
      <TextInput
        ref={eventRef}
        style={Styles.input}
        onChangeText={onChangeEvent}
        value={event}
        placeholder="An Event"
        accessibilityLabel="Event"
        maxLength={LIMITS.event}
        autoCapitalize="words"
        returnKeyType={needsNoun ? "next" : "done"}
        onSubmitEditing={() => (needsNoun ? nounRef.current?.focus() : handleEventSubmit())}
      />
      <Text style={Styles.charCount}>{event.length}/{LIMITS.event}</Text>
      {needsNoun && (
        <>
          <TextInput
            ref={nounRef}
            style={Styles.input}
            onChangeText={onChangeNoun}
            value={noun}
            placeholder="A Noun"
            accessibilityLabel="Noun"
            maxLength={LIMITS.noun}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleEventSubmit}
          />
          <Text style={Styles.charCount}>{noun.length}/{LIMITS.noun}</Text>
        </>
      )}
      {!isComplete && (
        <Text style={Styles.missingHint}>Still needed: {missingFields.join(", ")}</Text>
      )}
      <View style={Styles.container}>
        {isComplete ? (
          <Link
          style={Styles.button}
          href={{
            pathname: "/page2",
            params: trimmedParams,
          }} asChild
          >
            <Pressable accessibilityLabel="Make my Hall Pass">
              <Text>Make my Hall Pass!</Text>
            </Pressable>
          </Link>
        ) : (
          <Pressable
            disabled
            style={[Styles.button, Styles.buttonDisabled]}
            accessibilityLabel="Make my Hall Pass, disabled until all fields are filled"
          >
            <Text>Make my Hall Pass!</Text>
          </Pressable>
        )}
        <Pressable style={Styles.button} onPress={clearFields} accessibilityLabel="Clear all fields">
          <Text>Clear Text</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
