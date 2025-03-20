import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Platform } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { format, isToday } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTitle from "./CustomTitle";
import CustomText from "./CustomText";
import { inputs } from "../styles/components/inputs";
import { colorsTheme } from "../styles/colorsTheme";
import CustomButton from "./CustomButton";

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
          <CustomButton
            onPress={() => setShow(false)}
            title={"Select date"}
            background={"green"}
          />
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
      <CustomTitle title={label} type={"TitleSmall"} />
      <TouchableOpacity
        style={[inputs.container, inputs.directionRow]}
        onPress={() => setShow((prevState) => !prevState)}
        accessible={true}
        accessibilityLabel="Open Date Picker"
        accessibilityRole="button"
      >
        <CustomText text={formattedDate} type={"TextSmall"} />
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
