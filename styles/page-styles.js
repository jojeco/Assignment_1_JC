import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    margin: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
   
  },
  subtitle: {
    fontSize: 25,
    color: "#38434D",
    marginBottom: 5,
  },
  instStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    margin: 15,
  },
  button: {
    backgroundColor: 'lightgreen',
    borderRadius: 30,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.6,
  },
  rotatedText: {
    // RN's `rotate` transform only repaints the text — it does NOT reflow the
    // element's original (unrotated) layout box, so this Text still reserves
    // ~320x70 in the row even though it *looks* ~70 wide by ~320 tall.
    // `width` is set above the ~320px the label needs at fontSize 60 so it can
    // never wrap to a second line, and the horizontal margins cancel out the
    // excess: -(360 - 80) / 2 = -140 collapses the reserved box back down to
    // leftContainer's 80px while keeping the label centred on it.
    transform: [{ rotate: '-90deg' }], // Rotates text 90 degrees to the left
    fontSize: 60,
    width: 360,
    textAlign: "center",
    marginHorizontal: -140,
  },
  sentence: {
    fontSize: 35,
    marginBottom: 15,
  },
  leftContainer: {
    // Matches the rotated label's visual width (one ~70px line box) plus slack.
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  signatureBox: {
    borderColor: "#000033",
    borderWidth: 1,
    width: 350,
    height: 250,
    marginBottom: 30,
    marginTop: 15,
    maxHeight: 250,
    maxWidth: 350,
  },
  signaturePreview: {
    width: 350,
    height: 150,
    borderColor: "#000033",
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 15,
  },
  signedText: {
    fontSize: 18,
    color: "#38434D",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 0,
    marginRight: 20,
    padding: 10,
  },
});
export default styles;
