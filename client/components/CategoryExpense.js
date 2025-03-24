import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import CustomTitle from "./CustomTitle";
import CustomText from "./CustomText";
import CategoryIcon from "./CategoryIcon";
import { categoryExpense } from "../styles/components/category-expense";
import { colorsTheme } from "../styles/colorsTheme";

export default function CategoryExpense({
  name,
  icon,
  budget,
  totalExpenses,
  color,
}) {
  const progress = totalExpenses / budget; // Calcula el porcentaje de progreso

  return (
    <View style={categoryExpense.container}>
      <CategoryIcon icon={icon} type={"big"} color={color} />
      <CustomTitle title={name} type={"TitleMedium"} />
      <View>
        <CustomText text={"$" + totalExpenses + " de $" + budget} />
        <View style={categoryExpense.progressBarContainer}>
          <Progress.Bar
            testID="progress-bar"
            progress={progress}
            width={null}
            color={color}
            borderColor={colorsTheme.lightGray}
            height={8}
          />
        </View>
      </View>
    </View>
  );
}
