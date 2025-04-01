import { View, Text } from "react-native";
import React from "react";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";

const CustomText = ({ text, type, numberOfLines = 1, color = colorsTheme.black }) => {
  const textStyle = type ? type : "TextBig";
  return (
    <View>
      <Text
        style={[fontsTheme[textStyle], {color: color} ]}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomText;
