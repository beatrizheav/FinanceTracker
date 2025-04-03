import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useState, useMemo } from "react";
import { incomesData } from "../constants/incomesData";
import { expensesData } from "../constants/expensesData";
import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import CustomText from "../components/CustomText";
import ActivityDisplay from "../components/ActivityDisplay";
import MenuDropdown from "../components/MenuDropdown";
import AddButton from "../components/AddButton";
import BSCategory from "../components/BSCategory";
import BSExpense from "../components/BSExpense";
import BSIncome from "../components/BSIncome";
import ModalExpense from "../components/ModalExpense";
import ModalIncome from "../components/ModalIncome";
import { homeStyles } from "../styles/screens/home";
import { colorsTheme } from "../styles/colorsTheme";
import { general } from "../styles/general";

// Function to combine and sort data
const mergeAndSortData = (incomes, expenses) => {
  return [...incomes, ...expenses]
    .map((item, index) => ({ ...item, id: (index + 1).toString() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
};

export default function HomeScreen() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null); // "Categoria", "Ingreso", "Gasto", "ModalIngreso", "ModalGasto"
  const [activity, setActivity] = useState(null);

  const combinedData = useMemo(
    () => mergeAndSortData(incomesData, expensesData),
    []
  );

  const onPressActivity = (item) => {
    setActivity(item);
    setActiveSheet(item.category ? "ModalGasto" : "ModalIngreso");
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
    setActivity(null);
  };

  return (
    <View style={general.safeArea}>
      <Header title="Home" />
      <DatePickerDropdown onChange={setDate} />
      <BalanceDisplay income={10000} expense={4000} />
      <View style={homeStyles.expensesScrollview}>
        <ExpensesScrollview />
      </View>
      <View style={homeStyles.headerRecentActivity}>
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
            onPress={() => onPressActivity(item)}
          />
        )}
      />

      <AddButton
        onPress={() => setIsMenuActive(!isMenuActive)}
        isActiveAddButton={isMenuActive}
      />

      {isMenuActive && (
        <MenuDropdown
          setIsActiveAddButton={setIsMenuActive}
          setIsActiveMenuDropdown={setIsMenuActive}
          setActiveBS={setActiveSheet}
        />
      )}

      {activeSheet === "Categoria" && (
        <BSCategory visible setVisible={handleCloseSheet} edit={false} />
      )}
      {activeSheet === "Ingreso" && (
        <BSIncome
          visible
          setVisible={handleCloseSheet}
          edit={!!activity}
          income={activity}
        />
      )}
      {activeSheet === "Gasto" && (
        <BSExpense
          visible
          setVisible={handleCloseSheet}
          edit={!!activity}
          expense={activity}
        />
      )}

      {activeSheet === "ModalGasto" && (
        <ModalExpense
          {...activity}
          setIsActiveModalExpense={handleCloseSheet}
          onEdit={() => setActiveSheet("Gasto")}
        />
      )}
      {activeSheet === "ModalIngreso" && (
        <ModalIncome
          {...activity}
          setIsActiveModalIncome={handleCloseSheet}
          onEdit={() => setActiveSheet("Ingreso")}
        />
      )}
    </View>
  );
}
