import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const iconPicker = StyleSheet.create({
  modalIconPickerContainer: {
    height: 500,
    alignItems: "stretch",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: colorsTheme.lightGray,
  },
});
