import { Pressable, Text, TextInput, View } from "react-native";
import React from "react";
import Styles from "../styles/page-styles";
import { Link } from "expo-router";

export default function Page() {

  const [person, onChangeName] = React.useState("");
  const [adjective, onChangeAdjective] = React.useState("");
  const [event, onChangeEvent] = React.useState("");

  const instruct = "Fill in all the boxes below \n and press 'Make my Hall Pass' to get your pass!";

  const clearFields = () => {
    onChangeName("");
    onChangeAdjective("");
    onChangeEvent("");
  }

  return (
    <View style={Styles.page}>
      <Text style={Styles.title}>Assignment 1</Text>
      <Text style={Styles.subtitle}>Hall Pass Mad Libs</Text>
      <Text style={Styles.instStyle}>{instruct}</Text>
      <TextInput
        style={Styles.input}
        onChangeText={onChangeName}
        value={person}
        placeholder="A Name"
      />
      <TextInput
        style={Styles.input}
        onChangeText={onChangeAdjective}
        value={adjective}
        placeholder="Adjective"
      />
      <TextInput
        style={Styles.input}
        onChangeText={onChangeEvent}
        value={event}
        placeholder="An Event"
      />
      <View style={Styles.container}>
        <Link
        style={Styles.button}
        href={{
          pathname: "/page2",
          params: { person, adjective, event },
        }} asChild
        >
          <Pressable>
            <Text>Make my Hall Pass!</Text>
          </Pressable>
        </Link>
        <Pressable style={Styles.button} onPress={clearFields}>
          <Text>Clear Text</Text>
        </Pressable>
      </View>
    </View>
  );
}
