import { View } from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import useCategories from "../hooks/useCategories";
import { months } from "../constants/getDate";
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
import useAuthGuard from "../hooks/useAuthGuard";

export default function HomeScreen() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null); // "Categoria", "Ingreso", "Gasto", "ModalIngreso", "ModalGasto"
  const [activity, setActivity] = useState(null); // "Ingreso", "Gasto"
  const [balance, setBalance] = useState({ totalIncome: 0, totalExpenses: 0 });
  const { categories, loading, getCategories } = useCategories();

  useAuthGuard();

  const onPressActivity = (item) => {
    setActivity(item);
    setActiveSheet(item.category ? "ModalGasto" : "ModalIngreso");
  };

  const fetchBalance = async () => {
    try {
      const numericMonth = (months.indexOf(date.month) + 1)
        .toString()
        .padStart(2, "0");
      const response = await apiClient.get(
        `/incomes/balance?month=${numericMonth}&year=${date.year}`
      );
      setBalance(response);
    } catch (error) {
      console.error("❌ Error al obtener el balance:", error.message);
    }
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
    setActivity(null);
    fetchBalance();
    getCategories();
  };

  useEffect(() => {
    if (date.month && date.year) {
      fetchBalance();
    }
  }, [date]);

  return (
    <View style={general.safeArea}>
      <Header title="Home" />

      <DatePickerDropdown onChange={setDate} />
      <BalanceDisplay
        income={balance.totalIncome}
        expense={balance.totalExpenses}
      />
      <View style={homeStyles.expensesScrollview}>
        <ExpensesScrollview categories={categories} loading={loading} />
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
