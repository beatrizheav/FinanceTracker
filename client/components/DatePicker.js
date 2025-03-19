import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, Platform } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { format, isToday } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { inputs } from "../styles/components/inputs";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";

const DatePickerModal = ({ show, setShow, date, onChange }) => {
  const datePickerProps = {
    value: date,
    mode: "date",
    display: "spinner",
    onChange: onChange,
    themeVariant: "light",
    minimumDate: new Date(),
  };

  return Platform.OS === "ios" ? (
    <Modal visible={show} animationType="fade" transparent>
      <View style={inputs.modalBackground}>
        <View style={inputs.modalContainer}>
          <DateTimePicker {...datePickerProps} testID="date-picker" />
          <TouchableOpacity onPress={() => setShow(false)}>
            <Text>Select Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : (
    show && <DateTimePicker {...datePickerProps} testID="date-picker" />
  );
};

const DatePicker = ({ label, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
  };

  const formattedDate = isToday(date) ? "Today" : format(date, "MMMM dd, yyyy");

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <TouchableOpacity
        style={[inputs.container, inputs.directionRow]}
        onPress={() => setShow((prevState) => !prevState)}
        accessible={true}
        accessibilityLabel="Open Date Picker"
        accessibilityRole="button"
      >
        <Text style={fontsTheme.TextSmall}>{formattedDate}</Text>
        <Entypo name="chevron-thin-right" size={17} color={colorsTheme.black} />
      </TouchableOpacity>
      <DatePickerModal
        show={show}
        setShow={setShow}
        date={date}
        onChange={onChange}
      />
    </View>
  );
};

DatePicker.defaultProps = {
  date: new Date(),
};

export default DatePicker;
