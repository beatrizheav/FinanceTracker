import { StyleSheet } from "react-native";
export const registrationScreen = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  title: {
    paddingBottom: 20,
  },
  namesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  name: { flex: 1 },
});
