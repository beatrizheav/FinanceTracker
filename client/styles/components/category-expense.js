import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const categoryExpense = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
    width: 340,
    height: 260,
    marginRight: 14,
  },
  progressBarContainer: {
    paddingTop: 5,
  },
});
