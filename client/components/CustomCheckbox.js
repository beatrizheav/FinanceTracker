import { View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import { customCheckbox } from "../styles/components/custom-checkbox";

export default function CustomCheckbox({ text }) {
  const [selected, setSelected] = useState(false);
  return (
    <View style={customCheckbox.container}>
      <View style={customCheckbox.checkbox}>
        <Checkbox
          value={selected}
          onValueChange={setSelected}
          color={selected ? colorsTheme.darkGreen : undefined}
        />
      </View>
      <CustomText text={text} type={"TextBig"} />
    </View>
  );
}
