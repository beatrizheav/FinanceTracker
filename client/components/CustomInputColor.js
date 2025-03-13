import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import Entypo from "@expo/vector-icons/Entypo";
import { customInput } from "../styles/components/custom-input";
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
      <View style={customInput.modalBackground}>
        <View style={[customInput.modalContainer]}>
          <View style={customInput.colorPickerContainer}>
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

const CustomInputColor = ({ label, placeholder, color, setColor }) => {
  const [show, setShow] = useState(false);

  const onColorChange = (color) => {
    setColor(color);
  };

  const background = { backgroundColor: color };

  return (
    <View style={customInput.wrapper}>
      <Text style={fontsTheme.TitleSmall}>{label}</Text>
      <TouchableOpacity
        style={[customInput.container, customInput.directionRow]}
        onPress={() => setShow(!show)}
        accessible={true}
        accessibilityLabel="Open Date Picker"
        accessibilityRole="button"
      >
        {color !== "#ffffff" ? (
          <View style={[customInput.barColor, background]} />
        ) : (
          <Text style={fontsTheme.TextSmall}>{placeholder}</Text>
        )}

        <Entypo name="chevron-thin-right" size={17} color={colorsTheme.black} />
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

export default CustomInputColor;
