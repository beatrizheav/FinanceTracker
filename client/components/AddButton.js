import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colorsTheme } from "../styles/colorsTheme";
import { addButton } from "../styles/components/add-button";

const AddButton = ({ onPress, isActiveAddButton }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={addButton.position}
      testID="add-button"
    >
      <View style={addButton.background}></View>
      <Ionicons
        name={isActiveAddButton ? "close-circle" : "add-circle"}
        size={80}
        color={colorsTheme.yellow}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
