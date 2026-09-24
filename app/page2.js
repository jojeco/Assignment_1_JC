// page2.js
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useRef, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import Styles from "../styles/page-styles";
import Signature from "react-native-signature-canvas";

export default function Page() {
  const params = useLocalSearchParams();
  const person = params.person || "__________";
  const adjective = params.adjective || "__________";
  const event = params.event || "__________";

  const [signature, setSignature] = useState(null);
  const [signedAt, setSignedAt] = useState(null);
  const signatureRef = useRef(null);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleResign = () => {
    // The <Signature> canvas unmounts while a signature is set (see the
    // ternary below), so it always remounts fresh — no need to call
    // signatureRef.current.clearSignature() here.
    setSignature(null);
    setSignedAt(null);
  };

  const currentDate = new Date();
  const day = currentDate.getDate(); // Day of the month
  const month = currentDate.getMonth() + 1; // Month (0-11, so add 1)
  const year = currentDate.getFullYear(); // Year

  const sentence = `${person} thought today was way too ${adjective}, so instead of going to ${event} they stayed home.`;

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
          <Text style={Styles.sentence}>{sentence}</Text>
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
          ref={signatureRef}
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
