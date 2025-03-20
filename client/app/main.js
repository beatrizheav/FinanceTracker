import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import SideMenu from "../components/SideMenu";

const main = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={general.safeArea}>
      <Text>main</Text>
      <Button title="Abrir menú" onPress={() => setMenuVisible(true)} />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
};

export default main;
