import React from "react";
import { View, ActivityIndicator, TouchableOpacity, Modal } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import { inputs } from "../styles/components/inputs";
import { colorPicker } from "../styles/components/color-picker";
import { colorsTheme } from "../styles/colorsTheme";

const ColorPickerModal = ({
  show,
  setShow,
  color,
  onChange,
  onColorChangeComplete,
}) => {
  return (
    <Modal visible={show} animationType="fade" transparent>
      <View style={inputs.modalBackground}>
        <View
          style={[inputs.modalContainer, colorPicker.colorPickerModalContainer]}
        >
          <View style={inputs.colorPickerContainer}>
            <ColorPicker
              color={color}
              onColorChange={onChange}
              onColorChangeComplete={onColorChangeComplete}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              swatchesLast={false}
              swatches={true}
              discrete={false}
              wheelLodingIndicator={<ActivityIndicator size={40} />}
              sliderLodingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
              useNativeLayout={false}
              style={colorPicker.colorPicker}
            />
          </View>
          <CustomButton
            title={"Seleccionar color"}
            onPress={() => setShow(false)}
            background={"green"}
          />
        </View>
      </View>
    </Modal>
  );
};

const ColorPickerComponent = ({ color, setColor, show, setShow }) => {
  const onColorChange = (color) => {
    setColor(color);
  };

  const background = { backgroundColor: color };

  const colorShowed = color ? color : "#ffffff";

  return (
    <View style={inputs.wrapper}>
      <CustomText type={"TitleSmall"} text={"Selecciona un color"} />
      <TouchableOpacity
        style={[inputs.container, inputs.directionRow, inputs.containerSquare]}
        onPress={() => setShow(!show)}
        accessible={true}
        accessibilityLabel="Open Color Picker"
        accessibilityRole="button"
      >
        {color ? (
          <View
            style={[colorPicker.circleColor, background]}
            testID="color-circle"
          />
        ) : (
          <AntDesign
            name="pluscircleo"
            size={40}
            color={colorsTheme.mediumGray}
          />
        )}
      </TouchableOpacity>
      {show && (
        <ColorPickerModal
          color={colorShowed}
          onChange={onColorChange}
          setShow={setShow}
        />
      )}
    </View>
  );
};

export default ColorPickerComponent;
