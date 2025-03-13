import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { datepickerDropdown } from "../styles/components/date-picker-dropdown";

const DatePickerDropdown = () => {
  const [selectedMonth, setSelectedMonth] = useState("Junio");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <View style={datepickerDropdown.container}>
      {/* Botón de selección del mes */}
      <TouchableOpacity
        onPress={() => setDropdownVisible(!dropdownVisible)}
        style={datepickerDropdown.dropdownButton}
      >
        <Text style={datepickerDropdown.dropdownButtonText}>
          {selectedMonth} ▼
        </Text>
      </TouchableOpacity>

      {/* Dropdown de selección del mes */}
      {dropdownVisible && (
        <FlatList
          data={months}
          keyExtractor={(item) => item}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                datepickerDropdown.monthItem,
                selectedMonth === item && datepickerDropdown.selectedMonth,
              ]}
              onPress={() => {
                setSelectedMonth(item);
                setDropdownVisible(false);
              }}
            >
              <Text style={datepickerDropdown.monthText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={datepickerDropdown.dropdownList}
        />
      )}
    </View>
  );
};

export default DatePickerDropdown;
