import React, { useState, useCallback } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "@expo/vector-icons/Entypo";
import { inputs } from "../styles/components/inputs";
import { dropdownSelect } from "../styles/components/dropdown-select";
import { colorsTheme } from "../styles/colorsTheme";
import { fontsTheme } from "../styles/fontsTheme";
import { data } from "../constants/categoryData";

const DropdownSelect = ({ label, value, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderChevronIcon = useCallback(
    () => (
      <Entypo
        name="chevron-thin-right"
        size={17}
        color={colorsTheme.black}
        testID="chevron-icon"
      />
    ),
    []
  );

  const placeholderStyles = [fontsTheme.TextSmall, dropdownSelect.placeholder];

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <Dropdown
        style={[inputs.container]}
        mode="default"
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
        containerStyle={dropdownSelect.dropContainer}
        renderRightIcon={renderChevronIcon}
        testID="dropdown-select"
      />
    </View>
  );
};

export default DropdownSelect;
