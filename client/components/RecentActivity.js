import { View, TouchableOpacity, FlatList } from "react-native";
import React, { useMemo } from "react";
import { incomesData } from "../constants/incomesData";
import { expensesData } from "../constants/expensesData";
import CustomText from "./CustomText";
import ActivityDisplay from "./ActivityDisplay";
import { recentActivity } from "../styles/components/recent-activity";
import { colorsTheme } from "../styles/colorsTheme";

// Function to combine and sort data
const mergeAndSortData = (incomes, expenses) => {
  return [...incomes, ...expenses]
    .map((item, index) => ({ ...item, id: (index + 1).toString() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
};

export default function RecentActivity({ onPress }) {
  const combinedData = useMemo(
    () => mergeAndSortData(incomesData, expensesData),
    []
  );

  return (
    <View>
      <View style={recentActivity.header}>
        <CustomText text="Actividad Reciente" type="TitleSmall" />
        <TouchableOpacity>
          <CustomText
            text="Ver todo"
            type="TextSmall"
            color={colorsTheme.teal}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={combinedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityDisplay
            {...item}
            screen={item.category ? "expense" : "income"}
            onPress={() => onPress(item)}
          />
        )}
      />
    </View>
  );
}
