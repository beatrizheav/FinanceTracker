import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "@expo/vector-icons/Entypo";
import { inputs } from "../styles/components/inputs";
import { dropdownCategory } from "../styles/components/dropdown-category";
import { colorsTheme } from "../styles/colorsTheme";
import { fontsTheme } from "../styles/fontsTheme";
import CustomText from "./CustomText";
import apiClient from "../api/apiClient";

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

  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiClient.get("/categories/get"); // Get user categories
        setDropdownData(data);
      } catch (error) {
        alert("Fetch categories fallido: " + error.message);
      }
    };

    fetchCategories();
  }, []);

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
        data={dropdownData}
        labelField="name"
        valueField="id"
        placeholder={!show ? "Select item" : "..."}
        value={value}
        onFocus={() => setShow(true)}
        onChange={(item) => {
          setValue(item.id);
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
