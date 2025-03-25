import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const expensesScrollview = StyleSheet.create({
  container: {
    position: "absolute",
    top: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width,
  },
});
