import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  AVATAR_SECTION_HEIGHT,
  BUTTON_HEIGHT,
  height,
  SIDE_MENU_WIDTH,
} from "../../constants/sideMenuSizes";
import { colorsTheme } from "../colorsTheme";

const { height: screenHeight } = Dimensions.get("window");

export const sideMenu = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: height,
    alignItems: "flex-end",
    zIndex: 50,
  },
  container: {
    width: SIDE_MENU_WIDTH,
    height: screenHeight,
    backgroundColor: colorsTheme.darkGreen,
    paddingHorizontal: "5%",
    paddingBottom: Platform.OS === "android" ? 40 : 80,
    borderRadius: 5,
    height: height,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 1,
  },
  avatarSection: {
    marginTop: 50,
    height: AVATAR_SECTION_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: colorsTheme.white,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: BUTTON_HEIGHT,
    borderRadius: 5,
    paddingHorizontal: "5%",
  },
  icon: {
    marginRight: 15,
    color: colorsTheme.white,
  },
  logoutSection: {
    backgroundColor: colorsTheme.white,
    opacity: 0.95,
    height: BUTTON_HEIGHT,
    borderRadius: 5,
    justifyContent: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  logoutIcon: {
    marginRight: 15,
    color: colorsTheme.darkGreen,
    position: "absolute",
    left: 15,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
});
