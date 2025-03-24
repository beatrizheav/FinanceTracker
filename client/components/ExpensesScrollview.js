import { ScrollView, Dimensions } from "react-native";
import React from "react";
import ExpensesChart from "../components/ExpensesChart";
import CategoryExpense from "../components/CategoryExpense";
import { categories } from "../constants/categories";
import { expensesScrollview } from "../styles/components/expenses-scrollview";

const ExpensesScrollview = () => {
  const windowWidth = Dimensions.get("window").width;
  const initialOffset = (windowWidth - 340) / 2;

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={354}
      snapToAlignment="start"
      style={expensesScrollview.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: initialOffset }}
    >
      <ExpensesChart />
      {categories.map((category, index) => (
        <CategoryExpense
          key={index}
          name={category.name}
          budget={category.budget}
          totalExpenses={category.totalExpenses}
          color={category.color}
          icon={category.icon}
        />
      ))}
    </ScrollView>
  );
};

export default ExpensesScrollview;
