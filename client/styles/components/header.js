import { StyleSheet } from "react-native";
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
    paddingHorizontal: 16,
    marginHorizontal: -16,
  },
  buttonPlaceholder: {
    width: 30,
  },
  avatarContainer: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
