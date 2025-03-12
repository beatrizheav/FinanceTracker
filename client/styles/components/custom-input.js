import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const customInput = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: 52,
    backgroundColor: colorsTheme.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
    marginTop: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
  textInputParagraph: {
    textAlignVertical: "top",
    paddingTop: 10,
  },
  directionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  paragraph: {
    height: 80,
  },
});
