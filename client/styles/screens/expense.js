import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const expense = StyleSheet.create({
  containerIos: {
    height: "89%",
    marginTop: 35,
  },
  containerAnd: {
    height: "84%",
    marginTop: 40,
  },
  container_sections: {
    flex: 1,
  },
  section: {
    maxHeight: "93%",
  },
  container_title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon_chev: {
    marginTop: 5,
    marginLeft: 10,
  },
  container_text: {
    marginTop: 10,
    marginBottom: 20,
  },
  black: {
    color: colorsTheme.black,
  },
});
