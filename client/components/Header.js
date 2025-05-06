import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import { getAvatarById } from "../hooks/getAvatar";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import { header } from "../styles/components/header";
import SideMenu from "./SideMenu";

const Header = ({ title, username }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  // Determine the header mode based on the current route
  const isHome = pathname === "/home"; //Replace with route for HOME
  const hideMenu = pathname === "/registration"; // Replace with route where the menu button is hidden

  return (
    <View style={header.header}>
      {/* Option 2: Show avatar and greeting message on the Home screen */}
      {isHome ? (
        <View style={header.welcomeContainer}>
          <View style={header.avatarContainer}>
            <Image
              source={getAvatarById(user?.avatar)} // Replace with the actual avatar
              style={header.avatar}
            />
          </View>
          <View>
            <CustomText text={"Buenos días!"} type={"TextBig"} />
            <CustomText text={user?.name} type={"TitleSmall"} />
          </View>
        </View>
      ) : (
        <>
          {/* Option 3: Show back button if not on the Home screen */}
          <TouchableOpacity onPress={() => router.back()}>
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
