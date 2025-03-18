import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const header = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "20%",
    paddingHorizontal: 15,
    backgroundColor: colorsTheme.white,
  },
  button: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
