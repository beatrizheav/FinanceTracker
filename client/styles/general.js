import { StyleSheet, Platform } from "react-native";
import { colorsTheme } from "./colorsTheme";

export const general = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 55,
    paddingBottom: Platform.OS === "android" ? 0 : 20,
    paddingHorizontal: 16,
    backgroundColor: colorsTheme.white,
  },
});
