import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const avatarPicker = StyleSheet.create({
  selectContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 121,
    width: 121,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorsTheme.lightestGray,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  avatarModal: {
    width: 70,
    height: 70,
    margin: 10,
  },
});
