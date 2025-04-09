import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { currentMonth, currentYear, months } from "../constants/getDate";
import CustomText from "./CustomText";
import { datepickerDropdown } from "../styles/components/date-picker-dropdown";
import { colorsTheme } from "../styles/colorsTheme";

const DatePickerDropdown = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const years = Array.from({ length: 12 }, (_, i) => currentYear + i);

  const toggleDropdown = (menu) => {
    setDropdownVisible(dropdownVisible === menu ? null : menu);
  };

  const handleMonthSelect = (item) => {
    setSelectedMonth(item);
    setDropdownVisible(null);
    onChange && onChange({ month: item, year: selectedYear });
  };

  const handleYearSelect = (item) => {
    setSelectedYear(item);
    setDropdownVisible(null);
    onChange && onChange({ month: selectedMonth, year: item });
  };

  useEffect(() => {
    onChange && onChange({ month: selectedMonth, year: selectedYear });
  }, []);

  return (
    <View style={datepickerDropdown.container}>
      <View style={datepickerDropdown.dateButtonsContainer}>
        <TouchableOpacity
          onPress={() => toggleDropdown("month")}
          style={datepickerDropdown.dropdownButton}
        >
          <CustomText text={selectedMonth + " ▾"} type={"TitleMedium"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleDropdown("year")}
          style={datepickerDropdown.dropdownButton}
        >
          <CustomText text={selectedYear + " ▾"} type={"TitleMedium"} />
        </TouchableOpacity>
      </View>

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
                onPress={() => handleMonthSelect(item)}
              >
                <CustomText
                  text={item}
                  type={"TitleSmall"}
                  color={selectedMonth === item && colorsTheme.white}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={datepickerDropdown.dropdownList}
          />
        </View>
      )}

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
                onPress={() => handleYearSelect(item)}
              >
                <CustomText
                  text={item}
                  type={"TitleSmall"}
                  color={selectedYear === item && colorsTheme.white}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={datepickerDropdown.dropdownList}
          />
        </View>
      )}
    </View>
  );
};

export default DatePickerDropdown;
