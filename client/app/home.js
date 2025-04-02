import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { incomesData } from "../constants/incomesData";
import { expensesData } from "../constants/expensesData";
import { category } from "../constants/category";
import { incomeData } from "../constants/incomeData";
import { expenseData } from "../constants/expenseData";
import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import MenuDropdown from "../components/MenuDropdown";
import ActivityDisplay from "../components/ActivityDisplay";
import { colorsTheme } from "../styles/colorsTheme";
import { general } from "../styles/general";
import BSCategory from "../components/BSCategory";
import BSExpense from "../components/BSExpense";
import BSIncome from "../components/BSIncome";

// Function to combine and sort data
const mergeAndSortData = (incomes, expenses) => {
  return [...incomes, ...expenses]
    .map((item, index) => ({ ...item, id: (index + 1).toString() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
};

export default function home() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [addButton, setAddButton] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [activeBS, setActiveBS] = useState(""); // "Categoria", "Ingreso" o "Gasto"

  // Combined data with useMemo to avoid recalculate in every render
  const combinedData = useMemo(
    () => mergeAndSortData(incomesData, expensesData),
    []
  );

  return (
    <View style={general.safeArea}>
      <Header title={"Home"} />
      <View style={{ paddingTop: 50, flex: 1 }}>
        <DatePickerDropdown
          onChange={({ month, year }) =>
            setDate((prev) => ({ ...prev, month, year }))
          }
        />
        <BalanceDisplay income={10000} expense={4000} />
        <View style={{ marginHorizontal: -16, paddingVertical: 10 }}>
          <ExpensesScrollview />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <CustomText text={"Actividad Reciente"} type={"TitleSmall"} />
          <TouchableOpacity>
            <CustomText
              text={"Ver todo"}
              type={"TextSmall"}
              color={colorsTheme.teal}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={combinedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityDisplay
              name={item.name}
              date={item.date}
              quantity={item.quantity}
              screen={item.category ? "expense" : "income"}
              category={item.category}
            />
          )}
        />
      </View>

      {/* Float button tu open menu */}
      <AddButton
        onPress={() => [
          setAddButton(!addButton),
          setMenuDropdown(!menuDropdown),
        ]}
        isActiveAddButton={addButton}
      />

      {menuDropdown && (
        <MenuDropdown
          setIsActiveAddButton={setAddButton}
          setIsActiveMenuDropdown={setMenuDropdown}
          setActiveBS={setActiveBS}
        />
      )}

      {/* Conditional renders of the bottom sheets */}
      {activeBS === "Categoria" && (
        <BSCategory
          visible={true}
          setVisible={() => setActiveBS("")}
          edit={true}
          category={category}
        />
      )}
      {activeBS === "Ingreso" && (
        <BSIncome
          visible={true}
          setVisible={() => setActiveBS("")}
          edit={true}
          income={incomeData}
        />
      )}
      {activeBS === "Gasto" && (
        <BSExpense
          visible={true}
          setVisible={() => setActiveBS("")}
          edit={true}
          expense={expenseData}
        />
      )}
    </View>
  );
}
