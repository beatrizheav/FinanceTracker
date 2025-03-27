import { View, Text } from "react-native";
import React from "react";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";

const CustomText = ({ text, type, numberOfLines = 1, color }) => {
  const textStyle = type ? type : "TextBig";
  const textColor = color ? color : colorsTheme.black;
  return (
    <View>
      <Text
        style={[fontsTheme[textStyle], { color: textColor }]}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomText;
