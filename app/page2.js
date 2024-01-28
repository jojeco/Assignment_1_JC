// page2.js
import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Styles from "../styles/page-styles";
import Signature from "react-native-signature-canvas";

export default function Page() {
  const params = useLocalSearchParams();
  const person = params.person || "__________";
  const adjective = params.adjective || "__________";
  const event = params.event || "__________";

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
      <Signature
        style={Styles.signatureBox}
        descriptionText=""
        webStyle={`.m-signature-pad {border: 1px solid black;}`}
      />
    </View>
  );
}
