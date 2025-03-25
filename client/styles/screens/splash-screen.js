import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const splashScreen = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: colorsTheme.darkGreenWithOpacity,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "35%",
    height: "25%",
  },
  titleContainer: {
    flexDirection: "row",
  },
  title1: {
    fontSize: 40,
    fontWeight: 500,
    color: colorsTheme.white,
  },
  title2: {
    fontSize: 40,
    fontWeight: 400,
    color: colorsTheme.darkGreen,
  },
});
