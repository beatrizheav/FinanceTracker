import { StyleSheet, Platform } from "react-native";
import { colorsTheme } from "./colorsTheme";

export const general = StyleSheet.create({
  safeArea: {
    display: "flex",
    paddingTop: Platform.OS === "android" ? 0 : 45,
    paddingBottom: Platform.OS === "android" ? 0 : 20,
    backgroundColor: colorsTheme.white,
    widthidth: "100%",
    height: "100%",
  },
});
