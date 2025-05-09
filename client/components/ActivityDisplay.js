import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { activityDisplay } from "../styles/components/activity-display";
import CustomText from "./CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import CategoryIcon from "./CategoryIcon";

const ActivityDisplay = ({
  name,
  date,
  amount = 0,
  color,
  onPress,
  category = {},
  screen,
}) => {
  const formatName = name ? name : "nombre no encontrado"; //Validates if there is data in the title, if not, sets a default title
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it

  const icon =
    screen === "income"
      ? { iconName: "attach-money", iconSet: "MaterialIcons" }
      : screen === "category"
      ? category
      : category?.icon;

  const colorIcon =
    screen === "income"
      ? activityDisplay.green.color
      : screen === "category"
      ? color
      : category.color;

  const amountColor =
    screen === "income" //changes the text color depending on the screen
      ? activityDisplay.green.color
      : screen === "expense"
      ? activityDisplay.red.color
      : activityDisplay.teal.color;

  const validAmount = Number(amount) || 0; //Validates if the amount is a number and if not, adds 0 by default.

  const amountText = amount
    ? `${screen === "expense" ? "-" : ""} $ ${validAmount.toLocaleString(
        "en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`
    : "$ 0.00"; //Validates if there is data in the amount, if not, sets a default amount

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={formatName === "Sin categoría"}
      style={[activityDisplay.container, activityDisplay.format]}
      disabled={formatName === "Sin categoría" ? true : false}
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
        <CustomText text={amountText} type={"TextBig"} color={amountColor} />
        {formatName === "Sin categoría" ? null : (
          <Ionicons
            testID="chevron-forward"
            name={"chevron-forward"}
            size={22}
            color={colorsTheme.dark}
            style={activityDisplay.iconForward}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ActivityDisplay;
