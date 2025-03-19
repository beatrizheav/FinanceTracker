import { View, Text } from "react-native";
import React from "react";
import { general } from "../styles/general";
import SideMenu from "../components/SideMenu";

const main = () => {
  return (
    <View style={general.safeArea}>
      <Text>main</Text>
      <SideMenu />
    </View>
  );
};

export default main;
