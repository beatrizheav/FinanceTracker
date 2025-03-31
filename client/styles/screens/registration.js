import { StyleSheet } from "react-native";
export const registrationScreen = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    paddingTop: 100,
    paddingBottom: 20,
  },
  namesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  name: { flex: 1 },
});
