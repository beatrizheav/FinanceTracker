import {
  View,
  FlatList,
} from "react-native";
import React, { useMemo } from "react";
import useExpensesAndIncomes from "../hooks/useExpenseAndIncomes";
import CustomText from "./CustomText";
import ActivityDisplay from "./ActivityDisplay";
import { recentActivity } from "../styles/components/recent-activity";
import { homeStyles } from "../styles/screens/home";

//Function to combine and sort data
const mergeAndSortData = (incomes, expenses) => {
  return [...incomes, ...expenses]
    .map((item, index) => ({ ...item, id: (index + 1).toString() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
};

export default function RecentActivity({ onPress }) {
  const {expenses, incomes, loading} = useExpensesAndIncomes();
  const combinedData = useMemo(
    () => mergeAndSortData(incomes, expenses),
    []
  );

  return (
    <View style={recentActivity.container}>
      <View style={recentActivity.header}>
        <CustomText text="Actividad Reciente" type="TitleSmall" />
      </View>
      {loading 
        ? (
          <View style={homeStyles.recentActivityContainer}>
            <CustomText 
            text={"Cargando..."} 
            type={"TextSmall"}
            />
          </View>
        ): (
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
        )}
    </View>
  );
}
