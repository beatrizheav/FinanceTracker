import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const expensesScrollview = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: Dimensions.get("window").width,
  },
});
