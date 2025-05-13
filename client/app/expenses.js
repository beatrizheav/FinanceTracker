import { View, FlatList, Pressable, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay, isAfter, isBefore, subDays } from "date-fns";
import apiClient from "../api/apiClient";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import ModalExpense from "../components/ModalExpense";
import BSExpense from "../components/BSExpense";
import { general } from "../styles/general";
import { colorsTheme } from "../styles/colorsTheme";
import { expense } from "../styles/screens/expense";
import useAuthGuard from "../hooks/useAuthGuard";

const Expenses = () => {
  const fetchExpenses = async () => {
    try {
      const data = await apiClient.get("/expenses/get");
      // Ordenar los gastos por fecha descendente
      const sortedData = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedData);
    } catch (error) {
      setError("Registro fallido: " + error.message);
      alert("Registro fallido: " + error.message);
    }
  };

  useAuthGuard();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const height =
    Platform.OS === "android" ? expense.containerAnd : expense.containerIos;
  const [isActiveModalExpense, setIsActiveModalExpense] = useState(false);
  const [isActiveBSExpense, setIsActiveBSExpense] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fixedExpenses = data.filter((item) => item.fixed === 1); // gastos fijos
  const today = new Date();
  const twoWeeksAgo = subDays(today, 14);

  const [expandedSections, setExpandedSections] = useState({
    fixed: false,
    today: false,
    last: false,
  });

  const todayExpenses = data.filter((item) =>
    isSameDay(new Date(item.date), today)
  );

  const lastTwoWeeksExpenses = data.filter((item) => {
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

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsActiveModalExpense(false);
    setIsEditing(true);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const isCurrentlyOpen = prev[section];
      if (isCurrentlyOpen) {
        return {
          fixed: false,
          today: false,
          last: false,
        };
      }
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
            />
          </Pressable>
          {expandedSections.fixed && fixedExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto fijo todavía"}
                type={"TextSmall"}
              />
            </View>
          ) : expandedSections.fixed ? (
            <FlatList
              data={fixedExpenses}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
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
            />
          </Pressable>
          {expandedSections.today && todayExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto hoy todavía"}
                type={"TextSmall"}
              />
            </View>
          ) : expandedSections.today ? (
            <FlatList
              data={todayExpenses}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
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
            />
          </Pressable>
          {expandedSections.last && lastTwoWeeksExpenses.length === 0 ? (
            <View style={expense.container_text}>
              <CustomText
                text={"No tienes ningún Gasto en las últimas dos semanas"}
                type={"TextSmall"}
              />
            </View>
          ) : expandedSections.last ? (
            <FlatList
              data={lastTwoWeeksExpenses}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalExpense(item)}
                  screen={"expense"}
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
          onEdit={() => handleEditExpense(selectedExpense)}
          onDelete={fetchExpenses}
        />
      )}

      {(isEditing || isActiveBSExpense) && (
        <BSExpense
          visible={isEditing || isActiveBSExpense}
          setVisible={(val) => {
            setIsActiveBSExpense(val);
            if (!val) {
              setIsEditing(false);
              setSelectedExpense(null);
            }
          }}
          edit={isEditing}
          expense={selectedExpense}
          onSaved={() => {
            fetchExpenses();
            setIsEditing(false);
            setIsActiveBSExpense(false);
            setSelectedExpense(null);
          }}
        />
      )}
    </View>
  );
};

export default Expenses;
