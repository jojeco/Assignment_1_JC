import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import React from "react";
import Styles from "../styles/page-styles";
import { Link, router } from "expo-router";

const LIMITS = {
  name: 30,
  adjective: 20,
  event: 40,
};

export default function Page() {

  const [person, onChangeName] = React.useState("");
  const [adjective, onChangeAdjective] = React.useState("");
  const [event, onChangeEvent] = React.useState("");

  const nameRef = React.useRef(null);
  const adjectiveRef = React.useRef(null);
  const eventRef = React.useRef(null);

  const instruct = "Fill in all the boxes below \n and press 'Make my Hall Pass' to get your pass!";

  const isComplete = person.trim() !== "" && adjective.trim() !== "" && event.trim() !== "";

  const trimmedParams = {
    person: person.trim(),
    adjective: adjective.trim(),
    event: event.trim(),
  };

  const missingFields = [
    trimmedParams.person === "" ? "Name" : null,
    trimmedParams.adjective === "" ? "Adjective" : null,
    trimmedParams.event === "" ? "Event" : null,
  ].filter(Boolean);

  const focusFirstEmpty = () => {
    if (trimmedParams.person === "") {
      nameRef.current?.focus();
    } else if (trimmedParams.adjective === "") {
      adjectiveRef.current?.focus();
    } else if (trimmedParams.event === "") {
      eventRef.current?.focus();
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
    nameRef.current?.focus();
  }

  return (
    <KeyboardAvoidingView style={Styles.page} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={Styles.title}>Assignment 1</Text>
      <Text style={Styles.subtitle}>Hall Pass Mad Libs</Text>
      <Text style={Styles.instStyle}>{instruct}</Text>
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
        returnKeyType="done"
        onSubmitEditing={handleEventSubmit}
      />
      <Text style={Styles.charCount}>{event.length}/{LIMITS.event}</Text>
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
