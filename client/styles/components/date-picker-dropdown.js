import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const datepickerDropdown = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdownButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    alignItems: "center",
  },
  dateButtonsContainer: {
    flexDirection: "row",
  },
  dropdownList: {
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: colorsTheme.white,
    borderWidth: 1,
    borderColor: colorsTheme.darkGreen,
  },
  dropDownContainer: {
    position: "absolute",
    top: "50",
    width: "100%",
    zIndex: 10,
  },
  monthItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  selectedMonth: {
    backgroundColor: colorsTheme.darkGreen,
  },
});
