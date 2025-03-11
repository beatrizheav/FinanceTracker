import { StyleSheet, Platform } from "react-native";
import { colorsTheme } from "./colorsTheme";

export const general = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : 45,
    marginBottom: Platform.OS === "android" ? 0 : 20,
    marginHorizontal: 16,
    backgroundColor: colorsTheme.white,
  },
});
