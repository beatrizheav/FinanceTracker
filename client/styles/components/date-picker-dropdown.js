import { StyleSheet } from "react-native";

export const datepickerDropdown = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdownButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "50%",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dateButtonsContainer: {
    flexDirection: "row",
  },
  dropdownList: {
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropDownContainer: {
    position: "absolute",
    top: "50",
    width: "100%",
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
