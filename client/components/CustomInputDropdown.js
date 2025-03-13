import React, { useState, useCallback } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "@expo/vector-icons/Entypo";
import { customInput } from "../styles/components/custom-input";
import { colorsTheme } from "../styles/colorsTheme";
import { fontsTheme } from "../styles/fontsTheme";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = ({ label, value, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderChevronIcon = useCallback(
    () => (
      <Entypo name="chevron-thin-right" size={17} color={colorsTheme.black} />
    ),
    []
  );

  const placeholderStyles = [fontsTheme.TextSmall, customInput.placeholder];

  return (
    <View style={customInput.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <Dropdown
        style={[customInput.container]}
        mode="modal"
        placeholderStyle={placeholderStyles}
        selectedTextStyle={fontsTheme.TextSmall}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={fontsTheme.TextSmall}
        containerStyle={customInput.dropContainer}
        renderRightIcon={renderChevronIcon}
      />
    </View>
  );
};

export default DropdownComponent;
