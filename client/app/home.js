import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import RecentActivity from "../components/RecentActivity";
import MenuDropdown from "../components/MenuDropdown";
import AddButton from "../components/AddButton";
import BSCategory from "../components/BSCategory";
import BSExpense from "../components/BSExpense";
import BSIncome from "../components/BSIncome";
import ModalExpense from "../components/ModalExpense";
import ModalIncome from "../components/ModalIncome";
import { homeStyles } from "../styles/screens/home";
import { general } from "../styles/general";
import apiClient from "../api/apiClient";

export default function HomeScreen() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null); // "Categoria", "Ingreso", "Gasto", "ModalIngreso", "ModalGasto"
  const [activity, setActivity] = useState(null); // "Ingreso", "Gasto"
  const [balance, setBalance] = useState({ totalIncome: 0, totalExpenses: 0 });

  const onPressActivity = (item) => {
    setActivity(item);
    setActiveSheet(item.category ? "ModalGasto" : "ModalIngreso");
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
    setActivity(null);
  };

  const fetchBalance = async () => {
    try {
      const response = await apiClient.get("/incomes/balance");
      setBalance(response);
    } catch (error) {
      console.error("❌ Error al obtener el balance:", error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View style={general.safeArea}>
      <Header title="Home" />

      <DatePickerDropdown onChange={setDate} />
      <BalanceDisplay
        income={balance.totalIncome}
        expense={balance.totalExpenses}
      />
      <View style={homeStyles.expensesScrollview}>
        <ExpensesScrollview />
      </View>
      <RecentActivity onPress={(item) => onPressActivity(item)} />
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
