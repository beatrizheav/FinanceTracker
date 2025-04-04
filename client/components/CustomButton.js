import { TouchableOpacity } from "react-native";
import React from "react";
import { customButton } from "../styles/components/custom-button";
import CustomText from "./CustomText";

const CustomButton = ({ onPress, title, background, type }) => {
  const backgroundStyle =
    background === "green"
      ? customButton.backgroundGreen
      : customButton.backgroundWhite;

  const typeStyle = type === "modal" ? customButton.modal : null;

  const typeTitle = type === "modal" ? "ButtonSmall" : "ButtonBig";

  const textColor =
    background === "white" || background === undefined
      ? customButton.green.color
      : customButton.white.color;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[customButton.container, backgroundStyle, typeStyle]}
    >
      <CustomText text={title} type={typeTitle} color={textColor} />
    </TouchableOpacity>
  );
};

export default CustomButton;