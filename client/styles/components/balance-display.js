import { StyleSheet } from "react-native";

export const balanceDisplay = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 15,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    alignItems: "center",
  },
});
