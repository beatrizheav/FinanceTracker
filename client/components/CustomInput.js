import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { inputs } from "../styles/components/inputs";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";
import CustomText from "./CustomText";

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

  const handleValue = () => {
    if (type === "number" && value !== undefined && value !== null) {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return value;
  };

  const handleOnChange = (inputValue) => {
    if (type === "number") {
      // Permitir números y el punto decimal
      const cleaned = inputValue.replace(/[^0-9.]/g, "");

      // Evitar múltiples puntos decimales
      const dotCount = (cleaned.match(/\./g) || []).length;
      if (dotCount > 1) return;

      // Permitir valores como "0.", "123." temporalmente
      if (cleaned === "" || cleaned === "." || cleaned.endsWith(".")) {
        onChange(cleaned);
        return;
      }

      const numericValue = parseFloat(cleaned);

      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
      return;
    }

    onChange(inputValue);
  };

  return (
    <View style={inputs.wrapper} testID="input-wrapper">
      <CustomText text={label} type={"TitleSmall"} testID={"input-label"} />
      <View style={inputContainer} testID="input-container">
        {type === "number" && (
          <View style={inputs.inputIcon} testID="input-icon">
            <FontAwesome6 name="dollar" size={12} color={colorsTheme.black} />
          </View>
        )}
        <TextInput
          value={handleValue()}
          onChangeText={handleOnChange}
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
