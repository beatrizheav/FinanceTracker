import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { datepickerDropdown } from "../styles/components/date-picker-dropdown";

const DateAndYearPicker = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
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

  // Estados y datos para los meses y los años
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dropdownVisible, setDropdownVisible] = useState(null); // null cuando no se muestra ningún menú

  const years = Array.from({ length: 9 }, (_, i) => currentYear + i);

  const toggleDropdown = (menu) => {
    // Si se hace clic en el mismo menú, se cierra; si se hace clic en otro, se abre ese
    setDropdownVisible(dropdownVisible === menu ? null : menu);
  };

  return (
    <View style={datepickerDropdown.container}>
      <View style={datepickerDropdown.dateButtonsContainer}>
        {/* Botón de selección de mes */}
        <TouchableOpacity
          onPress={() => toggleDropdown("month")}
          style={datepickerDropdown.dropdownButton}
        >
          <Text style={datepickerDropdown.dropdownButtonText}>
            {selectedMonth} ▼
          </Text>
        </TouchableOpacity>

        {/* Botón de selección de año */}
        <TouchableOpacity
          onPress={() => toggleDropdown("year")}
          style={datepickerDropdown.dropdownButton}
        >
          <Text style={datepickerDropdown.dropdownButtonText}>
            {selectedYear} ▼
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menú desplegable para los meses */}
      {dropdownVisible === "month" && (
        <View style={datepickerDropdown.dropDownContainer}>
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
                  setDropdownVisible(null); // Cerrar el menú después de seleccionar
                }}
              >
                <Text style={datepickerDropdown.monthText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={datepickerDropdown.dropdownList}
          />
        </View>
      )}

      {/* Menú desplegable para los años */}
      {dropdownVisible === "year" && (
        <View style={datepickerDropdown.dropDownContainer}>
          <FlatList
            data={years}
            keyExtractor={(item) => item.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  datepickerDropdown.monthItem,
                  selectedYear === item && datepickerDropdown.selectedMonth,
                ]}
                onPress={() => {
                  setSelectedYear(item);
                  setDropdownVisible(null); // Cerrar el menú después de seleccionar
                }}
              >
                <Text style={datepickerDropdown.monthText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={datepickerDropdown.dropdownList}
          />
        </View>
      )}
      {/* <Text>{selectedMonth + " " + selectedYear}</Text> */}
    </View>
  );
};

export default DateAndYearPicker;
