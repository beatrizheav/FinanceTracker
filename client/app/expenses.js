import { View, FlatList, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay, isAfter, isBefore, subDays } from "date-fns";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import ModalExpense from "../components/ModalExpense";
import BSExpense from "../components/BSExpense";
import { expensesData } from "../constants/expensesData";
import { general } from "../styles/general";
import { colorsTheme } from "../styles/colorsTheme";
import { expense } from "../styles/screens/expense";

const expenses = ({ data = expensesData }) => {
  const height =
    Platform.OS === "android" ? expense.containerAnd : expense.containerIos;
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isActiveModalExpense, setIsActiveModalExpense] = useState(false);
  const [isActiveBSExpense, setIsActiveBSExpense] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fixedExpenses = data.filter((item) => item.fixed === true); //expenses fixed
  const today = new Date();
  const twoWeeksAgo = subDays(today, 14);
  const [expandedSections, setExpandedSections] = useState({
    fixed: false,
    today: false,
    last: false,
  });

  const todayExpenses = data.filter(
    (
      item //expenses of today
    ) => isSameDay(new Date(item.date), today)
  );

  const lastTwoWeeksExpenses = data.filter((item) => {
    //expenses of last two weeks
    const expenseDate = new Date(item.date);
    return isAfter(expenseDate, twoWeeksAgo) && isBefore(expenseDate, today);
  });

  const showModalExpense = (expense) => {
    setSelectedExpense(expense);
    setIsActiveModalExpense(true);
  };

  const showBottom = () => {
    setSelectedExpense(null);
    setEditMode(false);
    setIsActiveBSExpense(true);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const isCurrentlyOpen = prev[section];
      // Si ya está abierta, solo ciérrala (permitiendo que ninguna esté abierta)
      if (isCurrentlyOpen) {
        return {
          fixed: false,
          today: false,
          last: false,
        };
      }
      // Si está cerrada, ábrela y cierra las demás
      return {
        fixed: false,
        today: false,
        last: false,
        [section]: true,
      };
    });
  };

  const getIcon = (section) =>
    expandedSections[section] ? "chevron-up-outline" : "chevron-down-outline";

  return (
    <View style={general.safeArea}>
      <Header title={"Gastos"} />
      <View style={height}>
        <View style={expense.section}>
          <Pressable
            onPress={() => toggleSection("fixed")}
            style={expense.container_title}
          >
            <CustomText text={"Gastos fijos"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("fixed")}
              name={getIcon("fixed")}
              size={27}
              color={colorsTheme.black}
              style={expense.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.fixed && fixedExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto fijo todavía"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.fixed ? (
            <FlatList
              data={fixedExpenses}
              keyExtractor={(item) => item.expenseId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
                  testID="mock-expense-item"
                />
              )}
            />
          ) : null}
        </View>
        <View style={expense.section}>
          <Pressable
            onPress={() => toggleSection("today")}
            style={expense.container_title}
          >
            <CustomText text={"Hoy"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("today")}
              name={getIcon("today")}
              size={27}
              color={colorsTheme.black}
              style={expense.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.today && todayExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto hoy todavía"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.today ? (
            <FlatList
              data={todayExpenses}
              keyExtractor={(item) => item.expenseId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
                  testID="mock-expense-item"
                />
              )}
            />
          ) : null}
        </View>
        <View style={expense.section}>
          <Pressable
            onPress={() => toggleSection("last")}
            style={expense.container_title}
          >
            <CustomText text={"Últimas dos semanas"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("last")}
              name={getIcon("last")}
              size={27}
              color={colorsTheme.black}
              style={expense.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.last && lastTwoWeeksExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto en las últimas dos semanas"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.last ? (
            <FlatList
              data={lastTwoWeeksExpenses}
              keyExtractor={(item) => item.expenseId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
                  testID="mock-expense-item"
                />
              )}
            />
          ) : null}
        </View>
      </View>

      <AddButton onPress={showBottom} />
      {isActiveModalExpense && selectedExpense && (
        <ModalExpense
          {...selectedExpense}
          setIsActiveModalExpense={setIsActiveModalExpense}
          onEdit={() => {
            setEditMode(true);
            setIsActiveModalExpense(false);
            setIsActiveBSExpense(true);
          }}
        />
      )}
      {isActiveBSExpense && (
        <BSExpense
          visible={isActiveBSExpense}
          setVisible={setIsActiveBSExpense}
          edit={editMode}
          expense={selectedExpense}
        />
      )}
    </View>
  );
};

export default expenses;
