import { Platform, StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const sheets = StyleSheet.create({
  background: {
    backgroundColor: colorsTheme.darkGreenWithOpacity,
  },
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  header: {
    paddingBottom: 15,
  },
});
