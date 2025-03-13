import { View, Text } from "react-native";
import React from "react";
import { general } from "../styles/general";
import DatePickerDropdown from "../components/DatePickerDropdown";

const main = () => {
  return (
    <View style={general.safeArea}>
      <Text>main</Text>
      <DatePickerDropdown />
    </View>
  );
};

export default main;
