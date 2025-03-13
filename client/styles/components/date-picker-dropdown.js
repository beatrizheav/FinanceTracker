import { StyleSheet } from "react-native";

export const datepickerDropdown = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdownButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  monthItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  selectedMonth: {
    backgroundColor: "#4F6F52",
  },
  monthText: {
    fontSize: 16,
  },
});
