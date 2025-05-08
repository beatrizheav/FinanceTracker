import { ScrollView, Dimensions } from "react-native";
import React from "react";
import ExpensesChart from "../components/ExpensesChart";
import CategoryExpense from "../components/CategoryExpense";
import { expensesScrollview } from "../styles/components/expenses-scrollview";

const ExpensesScrollview = ({ categories, loading }) => {
  const windowWidth = Dimensions.get("window").width;
  const initialOffset = (windowWidth - 340) / 2;

  return (
    <ScrollView
      testID="expenses-scrollview"
      horizontal={true}
      decelerationRate={0}
      snapToInterval={354}
      snapToAlignment="start"
      style={expensesScrollview.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: initialOffset }}
    >
      {!loading && categories.length > 0 && (
        <ExpensesChart categories={categories} />
      )}
      {categories.map((category, index) => (
        <CategoryExpense
          testID="category-expense"
          key={index}
          name={category.name}
          budget={category.budget}
          totalExpenses={category.expense}
          color={category.color}
          icon={category.icon}
        />
      ))}
    </ScrollView>
  );
};

export default ExpensesScrollview;
