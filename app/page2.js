// page2.js
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import Styles from "../styles/page-styles";
import Signature from "react-native-signature-canvas";
import { fillTemplate, getTemplate, nextTemplateId } from "../lib/madlibs";

const BLANK_PLACEHOLDER = "__________";

const firstParam = (v) => {
  const value = Array.isArray(v) ? v[0] : v;
  if (value === undefined || value === null) {
    return "";
  }
  return String(value).trim();
};

export default function Page() {
  const params = useLocalSearchParams();
  const person = firstParam(params.person) || BLANK_PLACEHOLDER;
  const adjective = firstParam(params.adjective) || BLANK_PLACEHOLDER;
  const event = firstParam(params.event) || BLANK_PLACEHOLDER;

  const [templateId, setTemplateId] = useState(() => getTemplate(firstParam(params.template)).id);
  const [signature, setSignature] = useState(null);
  const [signedAt, setSignedAt] = useState(null);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleResign = () => {
    // <Signature> unmounts while a signature is set, so it remounts blank.
    setSignature(null);
    setSignedAt(null);
  };

  const currentDate = new Date();
  const day = currentDate.getDate(); // Day of the month
  const month = currentDate.getMonth() + 1; // Month (0-11, so add 1)
  const year = currentDate.getFullYear(); // Year

  const storyTitle = getTemplate(templateId).title;
  const sentenceSegments = fillTemplate(templateId, { person, adjective, event, placeholder: BLANK_PLACEHOLDER });

  const handleNewStory = () => {
    // Only swaps templateId; signature/signedAt state is untouched above,
    // so re-rolling the story never clears an already-captured signature.
    setTemplateId(nextTemplateId(templateId));
  };

  return (
    <View style={Styles.page}>
      <View style={Styles.header}>
        <Link style={Styles.button} href="/">&#171; Back</Link>
        <Text style={Styles.title}>Mad Libs</Text>
      </View>
      <View style={Styles.container}>
        <View style={Styles.leftContainer}>
          <Text style={Styles.rotatedText}>HALL PASS</Text>
        </View>
        <View style={Styles.rightContainer}>
          <Text style={Styles.subtitle}>Date: {day}/{month}/{year}</Text>
          <Text style={Styles.storyTitle}>{storyTitle}</Text>
          <Text style={Styles.sentence}>
            {sentenceSegments.map((seg, i) => (
              <Text key={i} style={seg.field ? Styles.filledWord : null}>{seg.text}</Text>
            ))}
          </Text>
          <Pressable
            style={Styles.smallButton}
            onPress={handleNewStory}
            accessibilityLabel="Show a different story"
          >
            <Text>New story</Text>
          </Pressable>
        </View>
      </View>
      <Text style={Styles.subtitle}>
        Sign Here
      </Text>
      {signature ? (
        <>
          <Image
            source={{ uri: signature }}
            style={Styles.signaturePreview}
            resizeMode="contain"
          />
          <Text style={Styles.signedText}>Signed at {formatTime(signedAt)}</Text>
          <Pressable
            style={Styles.button}
            onPress={handleResign}
            accessibilityLabel="Re-sign"
          >
            <Text>Re-sign</Text>
          </Pressable>
        </>
      ) : (
        <Signature
          style={Styles.signatureBox}
          descriptionText=""
          webStyle={`.m-signature-pad {border: 1px solid black;}`}
          onOK={(img) => {
            setSignature(img);
            setSignedAt(new Date());
          }}
          onEmpty={() => Alert.alert("Please sign before confirming")}
          clearText="Clear"
          confirmText="Sign Pass"
        />
      )}
    </View>
  );
}
