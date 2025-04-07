import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const loginScreen = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 10,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  labelsContainer: {
    flexDirection: "row",
  },
  registerLink: {
    color: colorsTheme.teal,
  },
});
