import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const inputs = StyleSheet.create({
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
  containerSquare: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  directionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputIcon: {
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  placeholderColor: {
    color: colorsTheme.blackWithOpacity,
  },
  inputParagraph: {
    height: 80,
  },
  textInputParagraphNumber: {
    flex: 1,
    textAlignVertical: "top",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorsTheme.darkGreenWithOpacity,
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: colorsTheme.white,
    padding: 20,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
  },
});
