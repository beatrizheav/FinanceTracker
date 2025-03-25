import { StyleSheet } from "react-native";

export const sheets = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  sheetStyles: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  header: {
    paddingBottom: 15,
  },
});
