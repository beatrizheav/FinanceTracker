import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "../styles/components/header";

const Header = ({ title }) => {
  return (
    <View style={header.header}>
      <TouchableOpacity style={header.button}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>

      <Text style={header.title}>{title}</Text>

      <TouchableOpacity style={header.button}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
