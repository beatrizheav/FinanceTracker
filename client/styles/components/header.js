import { Platform, StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const header = StyleSheet.create({
  header: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colorsTheme.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    padding: 10,
  },
  black: {
    color: colorsTheme.black,
  },
});
