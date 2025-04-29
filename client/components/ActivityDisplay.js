import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import apiClient from "../api/apiClient";
import { activityDisplay } from "../styles/components/activity-display";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import CategoryIcon from "./CategoryIcon";

const ActivityDisplay = ({
  name,
  date,
  quantity = 0,
  color,
  onPress,
  category,
  screen,
}) => {
  const formatName = name ? name : "nombre no encontrado"; //Validates if there is data in the title, if not, sets a default title
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it

  const [categoryData, setCategoryData] = useState(null);

  const fetchCategory = async () => {
    const body = { id: category };
    try {
      const data = await apiClient.post("/categories/info", body);
      setCategoryData(data[0]);
    } catch (error) {
      setError("Registro fallido: " + error.message);
      alert("Registro fallido: " + error.message);
    }
  };

  useEffect(() => {
    if (screen === "expense") {
      fetchCategory();
    }
  }, []);

  const icon =
    screen === "income"
      ? { iconName: "attach-money", iconSet: "MaterialIcons" }
      : screen === "category"
      ? category
      : screen === "expense"
      ? categoryData?.icon
      : category?.icon;

  const colorIcon =
    screen === "income"
      ? activityDisplay.green.color
      : screen === "category"
      ? color
      : categoryData?.color;

  const quantityColor =
    screen === "income" //changes the text color depending on the screen
      ? activityDisplay.green.color
      : screen === "expense"
      ? activityDisplay.red.color
      : activityDisplay.teal.color;

  const validQuantity = Number(quantity) || 0; //Validates if the quantity is a number and if not, adds 0 by default.

  const quantityText = quantity
    ? `${screen === "expense" ? "-" : ""} $ ${validQuantity.toLocaleString(
        "en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`
    : "$ 0.00"; //Validates if there is data in the quantity, if not, sets a default quantity
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[activityDisplay.container, activityDisplay.format]}
    >
      <View style={activityDisplay.format}>
        <CategoryIcon icon={icon} type={"small"} color={colorIcon} />
        <View style={activityDisplay.description}>
          <CustomText text={formatName} type={"TextBig"} />
          {screen === "category" ? null : (
            <CustomText
              text={formatDate}
              type={"TextSmall"}
              color={activityDisplay.darkGray.color}
            />
          )}
        </View>
      </View>
      <View style={activityDisplay.format}>
        <CustomText
          text={quantityText}
          type={"TextBig"}
          color={quantityColor}
        />
        <Ionicons
          testID="chevron-forward"
          name={"chevron-forward"}
          size={22}
          color={colorsTheme.dark}
          style={activityDisplay.iconForward}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActivityDisplay;
