import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { IconPicker } from "@grassper/react-native-icon-picker";
import * as Icon from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTitle from "./CustomTitle";
import { colorsTheme } from "../styles/colorsTheme";
import { inputs } from "../styles/components/inputs";
import { iconPicker } from "../styles/components/icon-picker";
import CustomText from "./CustomText";

const IconPickerModal = ({ handleSubmit, show }) => {
  return (
    <Modal visible={show} animationType="fade" transparent>
      <View style={inputs.modalBackground}>
        <View
          style={[inputs.modalContainer, iconPicker.modalIconPickerContainer]}
        >
          <IconPicker
            searchTitle={"Name"}
            iconsTitle="Icons"
            numColumns={5}
            iconSize={20}
            iconColor="#000"
            placeholderText="Search Food, shopping .."
            placeholderTextColor={colorsTheme.lightGray}
            onClick={handleSubmit}
            iconContainerStyle={iconPicker.iconContainer}
            textInputStyle={{ color: colorsTheme.lightGray }}
            textStyle={{ color: colorsTheme.black }}
          />
        </View>
      </View>
    </Modal>
  );
};

const renderIcon = ({ icon }) => {
  const iconSets = {
    AntDesign: Icon.AntDesign,
    FontAwesome: Icon.FontAwesome,
    MaterialIcons: Icon.MaterialIcons,
    Ionicons: Icon.Ionicons,
  };

  const IconComponent = iconSets[icon.iconSet];

  if (IconComponent) {
    return (
      <IconComponent name={icon.iconName} size={30} color={colorsTheme.black} />
    );
  } else {
    return (
      <View>
        <CustomText type={"TextSmall"} text={"Icon not found"} />
      </View>
    );
  }
};

const IconPickerComponent = ({ icon, setIcon }) => {
  const [show, setShow] = useState(false);

  const handleSubmit = (...params) => {
    const [, , iconName, iconSet] = params;
    setIcon({ iconName, iconSet });

    setShow(false);
  };

  return (
    <View style={inputs.wrapper}>
      <CustomTitle
        title={"Selecciona un icono"}
        type={"TitleSmall"}
        testID={"input-label"}
      />
      <TouchableOpacity
        style={[inputs.container, inputs.directionRow, inputs.containerSquare]}
        onPress={() => setShow(!show)}
        accessible={true}
      >
        {icon ? (
          <View>{renderIcon({ icon })}</View>
        ) : (
          <AntDesign
            name="pluscircleo"
            size={40}
            color={colorsTheme.mediumGray}
          />
        )}
      </TouchableOpacity>
      {show && <IconPickerModal handleSubmit={handleSubmit} show={show} />}
    </View>
  );
};

export default IconPickerComponent;
