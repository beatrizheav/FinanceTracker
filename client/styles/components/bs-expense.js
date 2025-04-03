import { StyleSheet, Platform } from "react-native";

export const bsExpense = StyleSheet.create({
  scrollview: {
    paddingBottom: Platform.OS === "android" ? 120 : 110,
  },
});
