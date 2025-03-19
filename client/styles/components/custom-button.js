import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const customButton = StyleSheet.create({

  container: {
    width: '90%',
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 15,
  },
 
  modal: {
    width: '40%',
  },

  backgroundGreen: {
    backgroundColor: colorsTheme.darkGreen,
  },

  backgroundWhite: {
    backgroundColor: colorsTheme.white,
    borderWidth: 1,
    borderColor: colorsTheme.darkGreen,
  },
  white: {
    color: colorsTheme.white
  },
  green : {
    color: colorsTheme.darkGreen
  }
});