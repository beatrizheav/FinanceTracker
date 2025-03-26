import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const modalCategory = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorsTheme.darkGreenWithOpacity,
  },
  container: {
    justifyContent: 'flex-start',
    borderRadius: 20,
    width: '76%',
    backgroundColor: colorsTheme.white,
  },
  container_closeIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  container_icon: {
    alignItems: 'center', 
  },
  container_details: {
    marginTop: 35,
    paddingHorizontal: 6,
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '14%',
  },
  teal: {
    color: colorsTheme.teal
  },
  red: {
    color: colorsTheme.red
  },
});