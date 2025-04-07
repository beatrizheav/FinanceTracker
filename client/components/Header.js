import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { header } from "../styles/components/header";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import SideMenu from "./SideMenu";

const Header = ({ title, username }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine the header mode based on the current route
  const isHome = pathname === "/home"; //Replace with route for HOME
  const hideMenu = pathname === "/testNoMenu"; // Replace with route where the menu button is hidden
  const testUsername = "Sophie!";

  return (
    <View style={header.header}>
      {/* Option 2: Show avatar and greeting message on the Home screen */}
      {isHome ? (
        <View style={header.avatarContainer}>
          <Image
            source={require("../assets/avatars/3.png")} // Replace with the actual avatar
            style={header.avatar}
          />
          <View>
            <CustomText text={"Buenos días!"} type={"TextBig"} />
            <CustomText text={testUsername} type={"TitleSmall"} />
          </View>
        </View>
      ) : (
        <>
          {/* Option 3: Show back button if not on the Home screen */}
          <TouchableOpacity style={header.button} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={30} color={colorsTheme.black} />
          </TouchableOpacity>

          {/* Option 1 & 3: Show title */}
          <CustomText
            text={title}
            type={"TitleMedium"}
            color={colorsTheme.black}
          />
        </>
      )}

      {/* Option 1: Show menu if not on the hidden menu route */}
      {!hideMenu ? (
        <TouchableOpacity
          style={header.button}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={30} color={colorsTheme.black} />
        </TouchableOpacity>
      ) : (
        <View style={header.buttonPlaceholder}></View> // Empty View to preserve space
      )}

      <SideMenu visible={menuVisible} setMenuVisible={setMenuVisible} />
    </View>
  );
};

export default Header;
