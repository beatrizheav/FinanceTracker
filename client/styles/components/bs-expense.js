import { StyleSheet, Platform } from "react-native";

export const bsExpense = StyleSheet.create({
  scrollview: {
    paddingBottom: Platform.OS === "android" ? 120 : 110,
  },
  loading: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    margin: 10,
  },
});
