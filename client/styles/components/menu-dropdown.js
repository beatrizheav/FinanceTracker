import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const menuDropdown = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorsTheme.darkSmooth,
  },
  container: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
    borderRadius: 15,
    width: '40%',
    right: 30,
    bottom: 120,
    backgroundColor: colorsTheme.white,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 7,
  },
});