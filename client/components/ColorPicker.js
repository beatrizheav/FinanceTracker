import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { inputs } from "../styles/components/inputs";
import { colorPicker } from "../styles/components/color-picker";
import { fontsTheme } from "../styles/fontsTheme";
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
          <TouchableOpacity onPress={() => setShow(false)}>
            <Text>Seleccionar color</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ColorPickerComponent = ({ color, setColor }) => {
  const [show, setShow] = useState(false);

  const onColorChange = (color) => {
    setColor(color);
  };

  const background = { backgroundColor: color };

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>Selecciona un color</Text>
      <TouchableOpacity
        style={[inputs.container, inputs.directionRow, inputs.containerSquare]}
        onPress={() => setShow(!show)}
        accessible={true}
        accessibilityLabel="Open Date Picker"
        accessibilityRole="button"
      >
        {color !== "#ffffff" ? (
          <View style={[colorPicker.circleColor, background]} />
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
          color={color}
          onChange={onColorChange}
          setShow={setShow}
        />
      )}
    </View>
  );
};

export default ColorPickerComponent;
