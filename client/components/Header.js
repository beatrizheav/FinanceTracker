import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "../styles/components/header";
import CustomTitle from "./CustomTitle";
import { colorsTheme } from "../styles/colorsTheme";

const Header = ({ title }) => {
  return (
    <View style={header.header}>
      <TouchableOpacity style={header.button}>
        <Ionicons name="chevron-back" size={30} color={colorsTheme.black} />
      </TouchableOpacity>

      <CustomTitle title={title} type={'TitleMedium'} color={header.black}/>

      <TouchableOpacity style={header.button}>
        <Ionicons name="menu" size={30} color={colorsTheme.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
