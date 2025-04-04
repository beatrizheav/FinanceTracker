import { View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { colorsTheme } from "../styles/colorsTheme";
import CustomText from "./CustomText";
import { menuDropdown } from "../styles/components/menu-dropdown";

const MenuDropdown = ({
  setIsActiveAddButton,
  setIsActiveMenuDropdown,
  setActiveBS,
}) => {
  const handleNavigation = (screen) => {
    setIsActiveAddButton(false);
    setIsActiveMenuDropdown(false);
    setActiveBS(screen);
  };
  const closeMenu = () => {
    setIsActiveAddButton(false);
    setIsActiveMenuDropdown(false);
  };
  return (
    <TouchableWithoutFeedback onPress={closeMenu} testID="menu-overlay">
      <View style={menuDropdown.overlay}>
        <View style={menuDropdown.container}>
          <TouchableOpacity
            style={menuDropdown.item}
            onPress={() => handleNavigation("Gasto")}
          >
            <Ionicons
              name={"arrow-down"}
              size={23}
              color={colorsTheme.black}
              style={{ marginRight: 10 }}
            />
            <CustomText text={"Gasto"} type={"TextBig"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={menuDropdown.item}
            onPress={() => handleNavigation("Ingreso")}
          >
            <MaterialIcons
              name={"attach-money"}
              size={23}
              color={colorsTheme.black}
              style={{ marginRight: 10 }}
            />
            <CustomText text={"Ingreso"} type={"TextBig"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={menuDropdown.item}
            onPress={() => handleNavigation("Categoria")}
          >
            <SimpleLineIcons
              name={"layers"}
              size={19}
              color={colorsTheme.black}
              style={{ marginRight: 10 }}
            />
            <CustomText text={"Categoria"} type={"TextBig"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MenuDropdown;
