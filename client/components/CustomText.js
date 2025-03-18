import { View, Text } from "react-native";
import React from "react";
import { fontsTheme } from "../styles/fontsTheme";

const CustomText = ({ text, type, numberOfLines = 1 }) => {
  const textStyle = type ? type : "TextBig";
  return (
    <View>
      <Text
        style={[fontsTheme[textStyle]]}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomText;
