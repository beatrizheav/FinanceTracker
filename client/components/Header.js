import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "../styles/components/header";
import CustomTitle from "./CustomTitle";
import { colorsTheme } from "../styles/colorsTheme";
import SideMenu from "./SideMenu";

const Header = ({ title }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={header.header}>
      <TouchableOpacity style={header.button} >
        <Ionicons name="chevron-back" size={30} color={colorsTheme.black} />
      </TouchableOpacity>

      <CustomTitle title={title} type={'TitleMedium'} color={header.black}/>

      <TouchableOpacity style={header.button} onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={30} color={colorsTheme.black} />
      </TouchableOpacity>
      <SideMenu visible={menuVisible} setMenuVisible={setMenuVisible} />
    </View>
  );
};

export default Header;
