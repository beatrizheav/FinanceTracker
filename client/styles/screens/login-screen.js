import { StyleSheet, Platform } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const loginScreen = StyleSheet.create({
  screenContainer: {
    display: "flex",
    width: "100%",
    height: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  itemsContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "space-evenly",
  },
  titleContainer: {
    width: "100%",
    marginBottom: 10,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelsContainer: {
    flexDirection: "row",
  },
  registerLink: {
    color: colorsTheme.teal,
  },
});
