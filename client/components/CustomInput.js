import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";

import React, { useState } from "react";
import { customInput } from "../styles/components/custom-input";
import { fontsTheme } from "../styles/fontsTheme";
import { colorsTheme } from "../styles/colorsTheme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

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
      <View style={customInput.modalBackground}>
        <View style={customInput.modalContainer}>
          <DateTimePicker {...datePickerProps} />
          <TouchableOpacity onPress={() => setShow(false)}>
            <Text>Select Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : (
    show && <DateTimePicker {...datePickerProps} />
  );
};

export default function CustomInput({ type, label, placeholder }) {
  const [text, SetText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const isEditable = [
    "text",
    "password",
    "email",
    "paragraph",
    "number",
  ].includes(type);

  const keyboardType =
    {
      text: "default",
      password: "default",
      email: "email-address",
      paragraph: "text",
    }[type] || "number-pad";

  const inputContainer = [
    customInput.container,
    (type === "password" || type === "number" || !isEditable) &&
      customInput.directionRow,
    type === "paragraph" && customInput.paragraph,
  ];

  const textInputStyle = [
    customInput.textInput,
    type === "paragraph" && customInput.textInputParagraph,
  ];

  //Modal functions
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === "android") {
      setShow(false);
      console.log("ANDROID");
    }
  };

  const isToday = (dateToCheck) => {
    const today = new Date();
    return (
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear()
    );
  };

  const formattedDate = isToday(date) ? "Today" : format(date, "MMMM dd, yyyy");

  return (
    <View style={customInput.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <TouchableOpacity
        style={inputContainer}
        onPress={() => setShow((prevState) => !prevState)}
      >
        {type === "number" && (
          <View style={customInput.icon}>
            <FontAwesome6 name="dollar" size={12} color={colorsTheme.black} />
          </View>
        )}
        <TextInput
          value={type === "date" ? formattedDate : text}
          onChangeText={(newText) => SetText(newText)}
          placeholder={placeholder}
          style={[fontsTheme.TextSmall, textInputStyle]}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          multiline={type === "paragraph"}
          editable={isEditable}
          pointerEvents={isEditable ? "auto" : "none"}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={customInput.icon}
          >
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={20}
              color={colorsTheme.black}
            />
          </TouchableOpacity>
        )}
        {!isEditable && (
          <View style={customInput.icon}>
            <Entypo
              name="chevron-thin-right"
              size={17}
              color={colorsTheme.black}
            />
          </View>
        )}
      </TouchableOpacity>
      <DatePickerModal
        show={show}
        setShow={setShow}
        date={date}
        setDate={setDate}
        onChange={onChange}
      />
    </View>
  );
}
