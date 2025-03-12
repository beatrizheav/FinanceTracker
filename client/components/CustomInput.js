import { View, Text, TextInput, TouchableOpacity } from "react-native";

import React, { useState } from "react";
import { customInput } from "../styles/components/custom-input";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function CustomInput({ type, label, placeholder }) {
  const [text, SetText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const isEditable = [
    "text",
    "password",
    "email",
    "paragraph",
    "number",
  ].includes(type);

  const keyboardType =
    {
      text: "default",
      password: "default",
      email: "email-address",
      paragraph: "text",
    }[type] || "number-pad";

  const inputContainer = [
    customInput.container,
    (type === "password" || type === "number" || !isEditable) &&
      customInput.directionRow,
    type === "paragraph" && customInput.paragraph,
  ];

  const textInputStyle = [
    customInput.textInput,
    type === "paragraph" && customInput.textInputParagraph,
  ];

  return (
    <View style={customInput.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <TouchableOpacity
        style={inputContainer}
        onPress={() => console.log("PRESIONADO")}
      >
        {type === "number" && (
          <View style={customInput.icon}>
            <FontAwesome6 name="dollar" size={12} color={colorsTheme.black} />
          </View>
        )}
        <TextInput
          value={text}
          onChangeText={(newText) => SetText(newText)}
          placeholder={placeholder}
          style={[fontsTheme.TextSmall, textInputStyle]}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          multiline={type === "paragraph"}
          editable={isEditable}
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
        {!isEditable && (
          <View style={customInput.icon}>
            <Entypo
              name="chevron-thin-right"
              size={17}
              color={colorsTheme.black}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
