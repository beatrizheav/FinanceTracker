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
  placeholderColor: {
    color: colorsTheme.blackWithOpacity,
  },
  textInputParagraph: {
    textAlignVertical: "top",
    paddingTop: 10,
  },
  directionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  paragraph: {
    height: 80,
  },
  //Date
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorsTheme.darkGreenWithOpacity,
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  //Dropdown
  dropContainer: {
    borderRadius: 10,
  },
  placeholder: {
    color: colorsTheme.blackWithOpacity,
  },
  //Color
  colorPickerContainer: {
    width: 300,
    height: 370,
    paddingBottom: 15,
  },
  barColor: {
    width: "80%",
    height: 20,
    borderRadius: 10,
  },
});
