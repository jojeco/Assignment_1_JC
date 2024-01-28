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
  rotatedText: {
    transform: [{ rotate: '-90deg' }], // Rotates text 90 degrees to the left
    fontSize: 60,
    margin: -1000,
    left: -50,
  },
  sentence: {
    fontSize: 35,
    marginBottom: 15,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    left: -60,
  },
  signatureBox: {
    borderColor: "#000033",
    borderWidth: 1,
    width: 350,
    height: -100,
    marginBottom: 30,
    marginTop: 15,
    maxHeight: 250,
    maxWidth: 350,
  },
  placeholder: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1, 
    color: 'grey',
    fontSize: 20,
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
