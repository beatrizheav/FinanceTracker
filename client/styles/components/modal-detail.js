import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const modalDetail = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorsTheme.lightGray
  },
});