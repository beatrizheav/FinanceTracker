import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { customInput } from "../styles/components/custom-input";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";

export default function CustomInputText({
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
    customInput.container,
    (type === "password" || type === "number") && customInput.directionRow,
    type === "paragraph" && customInput.paragraph,
  ];

  const textInputStyle = [
    customInput.textInput,
    type === "paragraph" && customInput.textInputParagraph,
  ];

  return (
    <View style={customInput.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <View style={inputContainer}>
        {type === "number" && (
          <View style={customInput.icon}>
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
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={customInput.icon}
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
