import { View, Text } from "react-native";
import React from "react";
import { general } from "../styles/general";
import DateAndYearPicker from "../components/DatePickerDropdown";

const main = () => {
  return (
    <View style={general.safeArea}>
      <Text>main</Text>
      <DateAndYearPicker />
    </View>
  );
};

export default main;
