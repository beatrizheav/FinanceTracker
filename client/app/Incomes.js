import { View, FlatList, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay, isAfter, isBefore, subDays, parseISO } from "date-fns";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import BSIncome from "../components/BSIncome";
import ModalIncome from "../components/ModalIncome";
import apiClient from "../api/apiClient";
import { general } from "../styles/general";
import { colorsTheme } from "../styles/colorsTheme";
import { incomes } from "../styles/screens/incomes";

const Incomes = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadIncomes = async () => {
    try {
      const data = await apiClient.get("/incomes/user");
      setIncomeList(data);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadIncomes();
  }, []);

  const height =
    Platform.OS === "android" ? incomes.containerAnd : incomes.containerIos;
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isActiveModalIncome, setIsActiveModalIncome] = useState(false);
  const [isActiveBSIncome, setIsActiveBSIncome] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fixedIncomes = incomeList.filter(
    (item) => item.fixed === true || item.fixed === 1 || item.fixed === "true"
  );
  const today = new Date();
  const twoWeeksAgo = subDays(today, 14);
  const [expandedSections, setExpandedSections] = useState({
    fixed: false,
    today: false,
    last: false,
  });

  //incomeList of today
  const todayIncomes = incomeList.filter((item) =>
    isSameDay(parseISO(item.date), today)
  );

  //incomes of last two weeks
  const lastTwoWeeksIncomes = incomeList.filter((item) => {
    const incomeDate = parseISO(item.date);
    return (
      isAfter(incomeDate, twoWeeksAgo) &&
      (isBefore(incomeDate, today) || isSameDay(incomeDate, today))
    );
  });

  const showModalIncome = (income) => {
    setSelectedIncome(income);
    setIsActiveModalIncome(true);
  };

  const showBottom = () => {
     setSelectedIncome(null);
     setEditMode(false);
     setIsActiveBSIncome(true);
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
    <>
      {loading ? (
        <CustomText text="Cargando ingresos..." type="TextMedium" />
      ) : error ? (
        <CustomText text={`Error: ${error}`} type="TextMedium" />
      ) : (
        <View style={general.safeArea}>
          <Header title={"Ingresos"} />
          <View style={height}>
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("fixed")}
                style={incomes.container_title}
              >
                <CustomText text={"Ingresos fijos"} type={"TitleMedium"} />
                <Ionicons
                  onPress={() => toggleSection("fixed")}
                  name={getIcon("fixed")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
                  testID="chevron-down-outline"
                />
              </Pressable>
              {expandedSections.fixed && fixedIncomes.length === 0 ? (
                <View style={incomes.container_text}>
                  <CustomText
                    text={"No tienes ningún Ingreso fijo todavía"}
                    type={"TextSmall"}
                    numberOfLines={0}
                  />
                </View>
              ) : expandedSections.fixed ? (
                <FlatList
                  data={fixedIncomes}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
                      testID="mock-income-item"
                    />
                  )}
                />
              ) : null}
            </View>
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("today")}
                style={incomes.container_title}
              >
                <CustomText text={"Hoy"} type={"TitleMedium"} />
                <Ionicons
                  onPress={() => toggleSection("today")}
                  name={getIcon("today")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
                  testID="chevron-down-outline"
                />
              </Pressable>
              {expandedSections.today && todayIncomes.length === 0 ? (
                <View style={incomes.container_text}>
                  <CustomText
                    text={"No tienes ningún Ingreso hoy todavía"}
                    type={"TextSmall"}
                    numberOfLines={0}
                  />
                </View>
              ) : expandedSections.today ? (
                <FlatList
                  data={todayIncomes}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
                      testID="mock-income-item"
                    />
                  )}
                />
              ) : null}
            </View>
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("last")}
                style={incomes.container_title}
              >
                <CustomText text={"Últimas dos semanas"} type={"TitleMedium"} />
                <Ionicons
                  onPress={() => toggleSection("last")}
                  name={getIcon("last")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
                  testID="chevron-down-outline"
                />
              </Pressable>
              {expandedSections.last && lastTwoWeeksIncomes.length === 0 ? (
                <View style={incomes.container_text}>
                  <CustomText
                    text={"No tienes ningún Ingreso en las últimas dos semanas"}
                    type={"TextSmall"}
                    numberOfLines={0}
                  />
                </View>
              ) : expandedSections.last ? (
                <FlatList
                  data={lastTwoWeeksIncomes}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
                      testID="mock-income-item"
                    />
                  )}
                />
              ) : null}
            </View>
          </View>
          <AddButton onPress={showBottom} />
          {isActiveModalIncome && selectedIncome && (
            <ModalIncome
              {...selectedIncome}
              setIsActiveModalIncome={setIsActiveModalIncome}
              onEdit={() => {
                setEditMode(true);
                setIsActiveModalIncome(false);
                setIsActiveBSIncome(true);
              }}
            />
          )}
          {isActiveBSIncome && (<BSIncome
            visible={isActiveBSIncome}
            setVisible={setIsActiveBSIncome}
            edit={editMode}
            income={selectedIncome}
            onSave={loadIncomes}
          />)}
        </View>
      )}
    </>
  );
};

export default Incomes;
