import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const incomes = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  container_title: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: 'red',
  },
  icon_chev: {
    marginTop: 5,
    marginLeft: 10,
  },
  container_text: {
    //marginTop: 10,
   // marginBottom: 20,

  },
  black: {
    color: colorsTheme.black
  },
  border: {
        borderWidth: 1,
    borderColor: 'red',
  }
});
