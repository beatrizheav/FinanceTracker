import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomTitle from "./CustomTitle";
import { inputs } from "../styles/components/inputs";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";

export default function CustomInput({
  type,
  label,
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const keyboardType =
    {
      text: "default",
      password: "default",
      email: "email-address",
      paragraph: "default",
      number: "number-pad",
    }[type] || "default";

  const inputContainer = [
    inputs.container,
    (type === "password" || type === "number") && inputs.directionRow,
    type === "paragraph" && inputs.inputParagraph,
  ];

  const textInputStyle = [
    (type === "paragraph" || type === "number") &&
      inputs.textInputParagraphNumber,
    inputs.textInput,
  ];

  const inputEditable = onChange ? true : false;

  return (
    <View style={inputs.wrapper} testID="input-wrapper">
      <CustomTitle title={label} type={"TitleSmall"} testID={"input-label"} />
      <View style={inputContainer} testID="input-container">
        {type === "number" && (
          <View style={inputs.inputIcon} testID="input-icon">
            <FontAwesome6 name="dollar" size={12} color={colorsTheme.black} />
          </View>
        )}
        <TextInput
          value={value}
          onChangeText={(newText) => onChange(newText)}
          placeholder={placeholder}
          placeholderTextColor={colorsTheme.blackWithOpacity}
          style={[fontsTheme.TextSmall, textInputStyle]}
          secureTextEntry={
            type === "password" && !showPassword && type !== "paragraph"
          }
          keyboardType={keyboardType}
          autoCapitalize="none"
          multiline={type === "paragraph"}
          testID="input-field"
          editable={inputEditable}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={inputs.inputIcon}
            testID="eye-icon"
          >
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={20}
              color={colorsTheme.black}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
