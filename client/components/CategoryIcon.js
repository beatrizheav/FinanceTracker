import { View } from "react-native";
import * as Icon from "@expo/vector-icons";
import { categoryIcon } from "../styles/components/category-icon";
import { colorsTheme } from "../styles/colorsTheme";

import React from "react";

export default function CategoryIcon({ type, icon, color }) {
  const iconBackground = color ? `${color}1a` : `${colorsTheme.red}1a`; // takes the property color and adds a default opacity to it

  const renderIcon = ({ icon }) => {
    const iconColor = color ? color : colorsTheme.red;
    const iconSize = type === "small" ? 30 : 50;

    const iconSets = {
      AntDesign: Icon.AntDesign,
      FontAwesome: Icon.FontAwesome,
      MaterialIcons: Icon.MaterialIcons,
      Ionicons: Icon.Ionicons,
    };

    // Si no se proporciona iconName o iconSet, usa el icono predeterminado
    let IconComponent = iconSets["Ionicons"];
    let iconName = "alert-circle-sharp";

    // Si icon.iconSet y icon.iconName están definidos, usa esos valores
    if (icon?.iconSet && icon?.iconName) {
      IconComponent = iconSets[icon.iconSet];
      iconName = icon.iconName;
    }

    if (IconComponent) {
      return (
        <IconComponent
          testID="default-icon"
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      );
    }
  };

  const containerStyle = [
    categoryIcon.container,
    categoryIcon[type],
    { backgroundColor: iconBackground },
  ];

  return (
    <View style={containerStyle}>
      <View>{renderIcon({ icon })}</View>
    </View>
  );
}
