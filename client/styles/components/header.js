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
    marginHorizontal: -16,
  },
  button: {
    padding: 10,
  },
  buttonPlaceholder: {
    width: 30,
  },
  black: {
    color: colorsTheme.black,
  },
  avatarContainer: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
  },
});
