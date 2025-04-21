import { View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import { customCheckbox } from "../styles/components/custom-checkbox";

export default function CustomCheckbox({ text, fixed, onChange }) {
  return (
    <View style={customCheckbox.container}>
      <View style={customCheckbox.checkbox}>
        <Checkbox
          value={fixed}
          onValueChange={onChange}
          color={fixed ? colorsTheme.darkGreen : undefined}
        />
      </View>
      <CustomText text={text} type={"TextBig"} />
    </View>
  );
}
