import React, { useCallback } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "@expo/vector-icons/Entypo";
import { inputs } from "../styles/components/inputs";
import { dropdownCategory } from "../styles/components/dropdown-category";
import { colorsTheme } from "../styles/colorsTheme";
import { fontsTheme } from "../styles/fontsTheme";
import { data } from "../constants/categoryData";
import CustomText from "./CustomText";

const DropdownCategory = ({ value, setValue, show, setShow }) => {
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

  const placeholderStyles = [
    fontsTheme.TextSmall,
    dropdownCategory.placeholder,
  ];

  return (
    <View style={inputs.wrapper}>
      <CustomText
        text={"Categoría"}
        type={"TitleSmall"}
        testID={"input-label"}
      />
      <Dropdown
        style={[inputs.container]}
        mode="modal"
        placeholderStyle={placeholderStyles}
        selectedTextStyle={fontsTheme.TextSmall}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!show ? "Select item" : "..."}
        value={value}
        onFocus={() => setShow(true)}
        onChange={(item) => {
          setValue(item.value);
          setShow(false);
        }}
        itemTextStyle={fontsTheme.TextSmall}
        containerStyle={dropdownCategory.dropContainer}
        renderRightIcon={renderChevronIcon}
        testID="dropdown-select"
      />
    </View>
  );
};

export default DropdownCategory;
